#!/bin/bash

set -x

function delext() {
     echo "${1%.*}"
}

EGO_DEGREE=1

BINROOT="/home/hardwick/nlp-tools/gexf"
insert_attribs=$BINROOT/insert_attribs.py
lexgraph=$BINROOT/lexgraph.py
gexf2json=$BINROOT/gexf-js/gexf2json.py

maingraph=$(pwd)/$1
dirname=$2
graphname=$3
swappedname=$4
swapped_dirname=${dirname}-swapped
if [ "$#" -gt 4 ]; then
    EGO_DEGREE=$5
    echo "EGO_DEGREE is $EGO_DEGREE"
fi

ORIGDIR=$(pwd)
mkdir -p $dirname/egographs
mkdir -p $swapped_dirname/egographs

cd $dirname
python3 $insert_attribs --write-korp --write-ego --site="index.html" --name "${graphname}" -i $maingraph -o $(basename $maingraph)
python3 $lexgraph $(basename $maingraph) egographs $EGO_DEGREE

python3 $insert_attribs --swap-translation --name "${swappedname}" -i $(basename $maingraph) -o ../${swapped_dirname}/$(delext $(basename $maingraph))-swapped.gexf

python3 $gexf2json $(basename $maingraph)

cd egographs
parallel -j12 python3 $insert_attribs --name \'"$swappedname"\' --swap-translation -o ../../${swapped_dirname}/egographs/{} -i {} ::: *.gexf
parallel -j12 python3 $gexf2json ::: *.gexf

cd ../$swapped_dirname
python3 $gexf2json $(delext $(basename $maingraph))-swapped.gexf
cd egographs
parallel -j12 python3 $gexf2json ::: *.gexf

cd $ORIGDIR
