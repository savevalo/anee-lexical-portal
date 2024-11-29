#!/bin/bash
set -e
set -x

# Configuration
GEXF_BASE_DIR=$(realpath $(pwd))

if [ "$#" -ge 2 ]; then
    GEXF_BASE_DIR=$(realpath $2)
fi

PACKAGEPATH=$(realpath $1)
ORIG_DIR=$(pwd)

cd $PACKAGEPATH
ln -sf $GEXF_BASE_DIR/config.js ./
ln -sf $GEXF_BASE_DIR/img ./
ln -sf $GEXF_BASE_DIR/index.html ./
ln -sf $GEXF_BASE_DIR/js ./
ln -sf $GEXF_BASE_DIR/styles ./

rm -f index.gexf
rm -f index.json
ln -sf $(find . -maxdepth 1 -name "*.gexf") index.gexf
ln -sf $(find . -maxdepth 1 -name "*.json") index.json

cd $ORIG_DIR
