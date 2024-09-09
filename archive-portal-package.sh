#!/bin/bash
set -e

ORIGDIR=$(pwd)
PACKAGEDIR=$1
TARGETDIR=$2

BASENAME=$(basename $PACKAGEDIR)
TMP_TARGET_DIR=$TARGETDIR/$BASENAME
mkdir $TMP_TARGET_DIR
GEXF_PATH=$(find $PACKAGEDIR -maxdepth 1 -type f -name "*.gexf")
JSON_PATH=$(find $PACKAGEDIR -maxdepth 1 -type f -name "*.json")
cp -r $PACKAGEDIR/egographs $TMP_TARGET_DIR
cp $GEXF_PATH $TMP_TARGET_DIR
cp $JSON_PATH $TMP_TARGET_DIR
cd $TARGETDIR
tar -czf $BASENAME.tar.gz $BASENAME
rm -rf $BASENAME

cd $ORIGDIR
