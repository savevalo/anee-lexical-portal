#!/bin/bash
set -e
set -x

# Configuration
GEXF_BASE_DIR=$(realpath $(pwd))

PACKAGEPATH=$(realpath $1)
ORIG_DIR=$(pwd)

ln -sf $GEXF_BASE_DIR/config.js $PACKAGEPATH
ln -sf $GEXF_BASE_DIR/img $PACKAGEPATH
ln -sf $GEXF_BASE_DIR/index.html $PACKAGEPATH
ln -sf $GEXF_BASE_DIR/js $PACKAGEPATH
ln -sf $GEXF_BASE_DIR/styles $PACKAGEPATH

cd $PACKAGEPATH
rm index.gexf
rm index.json
ln -sf $(find . -maxdepth 1 -name "*.gexf") index.gexf
ln -sf $(find . -maxdepth 1 -name "*.json") index.json

cd $ORIG_DIR
