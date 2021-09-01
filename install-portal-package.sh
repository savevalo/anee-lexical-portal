#!/bin/bash

PACKAGEDIR=$1
TARGET=$2

mkdir -p $TARGET
mv $PACKAGEDIR/*.gexf $TARGET/
mv $PACKAGEDIR/*.json $TARGET/
mv $PACKAGEDIR/egographs $TARGET/
rmdir $PACKAGEDIR

ln -s /var/www/gexf-js-base/config.js $TARGET
ln -s /var/www/gexf-js-base/img $TARGET
ln -s /var/www/gexf-js-base/index.html $TARGET
ln -s /var/www/gexf-js-base/js $TARGET
ln -s /var/www/gexf-js-base/styles $TARGET
ln -s $(find $TARGET -maxdepth 1 -name "*.gexf" -maxdepth 1) $TARGET/index.gexf
ln -s $(find $TARGET -maxdepth 1 -name "*.json" -maxdepth 1) $TARGET/index.json
