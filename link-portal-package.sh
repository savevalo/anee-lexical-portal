#!/bin/bash
set -e
set -x

# Configuration
GEXF_BASE_DIR=$(pwd)

PACKAGEPATH=$(realpath $1)
ORIG_DIR=$(pwd)

ln -s $GEXF_BASE_DIR/config.js $PACKAGEPATH
ln -s $GEXF_BASE_DIR/img $PACKAGEPATH
ln -s $GEXF_BASE_DIR/index.html $PACKAGEPATH
ln -s $GEXF_BASE_DIR/js $PACKAGEPATH
ln -s $GEXF_BASE_DIR/styles $PACKAGEPATH

cd $PACKAGEPATH
ln -s $(find . -maxdepth 1 -name "*.gexf") index.gexf
ln -s $(find . -maxdepth 1 -name "*.json") index.json

cd $ORIG_DIR
