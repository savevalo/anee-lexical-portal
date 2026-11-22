# ANEE lexical portals building \& maintenance

This document is intended to aid in the technical steps needed to update and keep running the portals described at eg. https://urn.fi/urn:nbn:fi:lb-2024121101. Some steps are left incomplete because I either don't expect them to ever need to be redone (if they do, it can be written up then) or because they're too complicated to describe thoroughly (like making a new graph from scratch), they will still need major work from me.

## Maintaining the site \& OpenShift

The site runs on OpenShift, the technology behind [Rahti](https://rahti.csc.fi/). If you're not familiar, a good starting point is https://docs.csc.fi/cloud/rahti/.

Many things can be accomplished by clicking around in the [Rahti web console](https://console.rahti.csc.fi/dashboards). In fact, if the site becomes unresponsive, the first thing to try is to log in, navigate to the right project, go to "deployments" (eg. https://console.rahti.csc.fi/k8s/ns/anee-lexical-networks/deployments/nginx-anee) and downscale the pod count from 1 to 0, and back from 0 to 1, by clicking the arrows.

The downside about making changes in the console is that they will not be preserved in a version-controlled repository. To see how the site was originally set up, see the repos under [Building the site](#Building-the-site).

## Building the data packages

The essential tools used to build new graphs are in https://github.com/traubert/nlp-tools, under `gexf/`. The Java stuff there is no longer used, it's just `gexf.py` as a library for representing graphs, some scripts and libraries using it to compute the layout and clustering, and `insert\_attribs.py` to write metadata. And another script to generate the json version.

Really, it's not easy enough to use to hand off at this point.

## Uploading

Currently, the data for each portal comprises a `.gexf` file and a `.json` file generated from it. All metadata needed is included in those files. They are packaged into `.tar.gz` files with informative names like `anee-portal-neo-babylonian-proper-2025-04.tar.gz`. The `.gexf` and `.json` can be named similarly, but it doesn't really matter, as long as there is exactly one each per package.

The packages need to be uploaded to Allas in the `anee\_portal\_packages` bucket.

**Uploading a new package is how you add more portals to the service.** In addition, the name of the new package has to be added to `anee\_packages.txt` mentioned in [Configurations and scripts](#Configurations-and-scripts).

## Building the site

There are two repositories involved:

* https://github.com/Traubert/anee-portals contains configurations and scripts to build and configure the site
* https://github.com/Traubert/anee-lexical-portal contains the code the site itself runs.

So if you want to eg. increase the amount of memory available, edit the former, if you want to change where a link points to or how the portal operates, change the latter.

### Site code

Really the only relevant part of the code repo is `gexf-js-base/`. There, `index.html` is each graph's HTML, `js/gexfjs.js` is the application, `config.js` has some static configuration, and `img/` and `styles/` are site visuals and CSS respectively. With some caution, **editing `index.html` or `gexfjs.js`, committing your changes, and redoing the build in the next section is how you change site appearance or behaviour**.

### Configurations and scripts

Once you have the OpenShift Command Line Interface [oc](https://console.rahti.csc.fi/command-line-tools) installed and have [logged in](https://oauth-openshift.apps.2.rahti.csc.fi/oauth/token/request), you can type `oc get all` to see the state of the project. The main template that's been used to set up the project is `openshift/templates/nginx\_simple.yaml`. It configures a Service, a Route, and a Deployment. Towards the end of the template is the `parameters` section where configuration values live. If you edit it, the template can be rerun and applied with `oc process -f openshift/templates/nginx\_simple.yaml | oc apply -f -`.

The container that runs the site is built using the contents of `docker/`. `Dockerfile` specifies the process, `fetch-and-install.sh` is used by it to download and set up the data packages, and `anee\_packages.txt` is a list of packages to set up. Those are the important ones.

Currently, building and redeploying after a build is a manual process. The project already has it configured, but if you have to set it up again, run `oc apply -f openshift/templates/anee-data-build-config.yaml`. Once that has been done, you can do `oc start-build anee-data-build --from-dir=docker` to make a new build. If you want to see everything it does, add `--follow` to the end of that command. After the build completes, you have to delete the existing pod, which will trigger deploying a new one with a little downtime. Really, it should be made to rollover instead - but it hasn't. Deleting can be done by checking `oc get pods`, and using the name of the relevant pod, starting with "nginx-anee-", as an argument to `oc delete`, eg. `oc delete pod/nginx-anee-d6fs-....`.

