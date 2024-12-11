/* Lead developer: Raphaël Velt
 * Other developers: Jakko Salonen, Tobias Bora, Jan de Mooij
 *
 * Licensed under the MIT License
 * Translations by:
 *    Vicenzo Cosenza (Italian)
 *    Eduardo Ramos Ibáñez (Spanish)
 *    Jaakko Salonen (Finnish)
 *    Zeynep Akata (Turkish)
 *    Σωτήρης Φραγκίσκος (Greek)
 *    Martin Eckert (German)
 *    Jan de Mooij (Dutch)
 *    Bruna Delazeri (Brazilian Portuguese)
 *    Adil Aliyev (Azerbaijani)
 * */

(function() {
    var GexfJS = {
        lensRadius: 200,
        lensGamma: 0.5,
        graphZone: {
            width: 0,
            height: 0
        },
        oldGraphZone: {},
        params: {
            centreX: 400,
            centreY: 350,
            activeNode: -1,
            currentNode: -1,
            isMoving: false
        },
        oldParams: {},
        minZoom: 1,
        maxZoom: 20,
	showLabels: false,
	proportionOfNodesToDraw: 1.0,
	textFilter: "",
        overviewWidth: 200,
        overviewHeight: 175,
        baseWidth: 800, // 800
        baseHeight: 700, // 700
        overviewScale: .25,
        totalScroll: 0,
        autoCompletePosition: 0,
	nodeHistory: [],
	nodeHistoryPosition: -1,
        i18n: {
            "az": {
                "search": "Təpələri axtar",
                "nodeAttr": "Attributlar",
                "nodes": "Təpə nöqtələri",
                "inLinks": "Daxil olan əlaqələr:",
                "outLinks": "Çıxan əlaqələr:",
                "undirLinks": "İstiqamətsiz əlaqələr:",
                "lensOn": "Linza rejiminə keç",
                "lensOff": "Linza rejimindən çıx",
                "edgeOn": "Tilləri göstər",
                "edgeOff": "Tilləri gizlət",
                "zoomIn": "Yaxınlaşdır",
                "zoomOut": "Uzaqlaşdır",
                "modularity_class": "Modullaşma sinfi",
                "degree": "Dərəcə"
            },
            "de": {
                "search": "Suche Knoten",
                "nodeAttr": "Attribute",
                "nodes": "Knoten",
                "inLinks": "Ankommende Verknüpfung von",
                "outLinks": "Ausgehende Verknüpfung zu",
                "undirLinks": "Ungerichtete Verknüpfung mit",
                "lensOn": "Vergrößerungsmodus an",
                "lensOff": "Vergrößerungsmodus aus",
                "edgeOn": "Kanten anzeigen",
                "edgeOff": "Kanten verstecken",
                "zoomIn": "Vergrößern",
                "zoomOut": "Verkleinern",
            },
            "el": {
                "search": "Αναζήτηση Κόμβων",
                "nodeAttr": "Χαρακτηριστικά",
                "nodes": "Κόμβοι",
                "inLinks": "Εισερχόμενοι δεσμοί από",
                "outLinks": "Εξερχόμενοι δεσμοί προς",
                "undirLinks": "Ακατεύθυντοι δεσμοί με",
                "lensOn": "Ενεργοποίηση φακού",
                "lensOff": "Απενεργοποίηση φακού",
                "edgeOn": "Εμφάνιση ακμών",
                "edgeOff": "Απόκρυψη ακμών",
                "zoomIn": "Μεγέθυνση",
                "zoomOut": "Σμίκρυνση",
            },
            "en": {
                "search": "Search nodes",
                "nodeAttr": "Attributes",
                "nodes": "Nodes",
                "inLinks": "Inbound Links from:",
                "outLinks": "Outbound Links to:",
                "undirLinks": "Undirected links with:",
                "lensOn": "Activate lens mode",
                "lensOff": "Deactivate lens mode",
                "edgeOn": "Show edges",
                "edgeOff": "Hide edges",
                "zoomIn": "Zoom In",
                "zoomOut": "Zoom Out",
            },
            "es": {
                "search": "Buscar un nodo",
                "nodeAttr": "Atributos",
                "nodes": "Nodos",
                "inLinks": "Aristas entrantes desde :",
                "outLinks": "Aristas salientes hacia :",
                "undirLinks": "Aristas no dirigidas con :",
                "lensOn": "Activar el modo lupa",
                "lensOff": "Desactivar el modo lupa",
                "edgeOn": "Mostrar aristas",
                "edgeOff": "Ocultar aristas",
                "zoomIn": "Acercar",
                "zoomOut": "Alejar",
                "modularity_class": "Clase de modularidad",
                "degree": "Grado",
                "indegree": "Grado de entrada",
                "outdegree": "Grado de salida",
                "weighted degree": "Grado ponderado",
                "weighted indegree": "Grado de entrada ponderado",
                "weighted outdegree": "Grado de salida ponderado",
                "closnesscentrality": "Cercanía",
                "betweenesscentrality": "Intermediación",
                "authority": "Puntuación de autoridad (HITS)",
                "hub": "Puntuación de hub (HITS)",
                "pageranks": "Puntuación de PageRank"
            },
            "fi": {
                "search": "Etsi solmuja",
                "nodeAttr": "Attribuutit",
                "nodes": "Solmut",
                "inLinks": "Lähtevät yhteydet :",
                "outLinks": "Tulevat yhteydet :",
                "undirLinks": "Yhteydet :",
                "lensOn": "Ota linssitila käyttöön",
                "lensOff": "Poista linssitila käytöstä",
                "edgeOn": "Näytä kaikki yhteydet",
                "edgeOff": "Näytä vain valitun solmun yhteydet",
                "zoomIn": "Suurenna",
                "zoomOut": "Pienennä",
            },
            "fr": {
                "search": "Rechercher un nœud",
                "nodeAttr": "Attributs",
                "nodes": "Nœuds",
                "inLinks": "Liens entrants depuis :",
                "outLinks": "Liens sortants vers :",
                "undirLinks": "Liens non-dirigés avec :",
                "lensOn": "Activer le mode loupe",
                "lensOff": "Désactiver le mode loupe",
                "edgeOn": "Afficher les sommets",
                "edgeOff": "Cacher les sommets",
                "zoomIn": "S'approcher",
                "zoomOut": "S'éloigner",
                "modularity_class": "Classe de modularité",
                "degree": "Degré",
                "indegree": "Demi-degré intérieur",
                "outdegree": "Demi-degré extérieur",
                "weighted degree": "Degré pondéré",
                "weighted indegree": "Demi-degré intérieur pondéré",
                "weighted outdegree": "Demi-degré extérieur pondéré",
                "closnesscentrality": "Centralité de proximité",
                "betweenesscentrality": "Centralité d’intermédiarité",
                "authority": "Score d’autorité (HITS)",
                "hub": "Score de hub (HITS)",
                "pageranks": "Score de PageRank"
            },
            "it": {
                "search": "Cerca i nodi",
                "nodeAttr": "Attributi",
                "nodes": "Nodi",
                "inLinks": "Link in entrata da :",
                "outLinks": "Link in uscita verso :",
                "undirLinks": "Link non direzionati con :",
                "lensOn": "Attiva la lente d’ingrandimento",
                "lensOff": "Disattiva la lente d’ingrandimento",
                "edgeOn": "Mostra gli spigoli",
                "edgeOff": "Nascondi gli spigoli",
                "zoomIn": "Zoom in avanti",
                "zoomOut": "Zoom indietro",
            },
            "tr": {
                "search": "Düğüm ara",
                "nodeAttr": "Özellikler",
                "nodes": "Düğümler",
                "inLinks": "Gelen bağlantılar",
                "outLinks": "Giden bağlantılar",
                "undirLinks": "Yönsüz bağlantılar",
                "lensOn": "Merceği etkinleştir",
                "lensOff": "Merceği etkisizleştir",
                "edgeOn": "Kenar çizgilerini göster",
                "edgeOff": "Kenar çizgilerini gizle",
                "zoomIn": "Yaklaştır",
                "zoomOut": "Uzaklaştır",
            },
            "nl": {
                "search": "Knooppunten doorzoeken",
                "nodeAttr": "Attributen",
                "nodes": "Knooppunten",
                "inLinks": "Binnenkomende verbindingen van :",
                "outLinks": "Uitgaande verbindingen naar :",
                "undirLinks": "Ongerichtte verbindingen met:",
                "lensOn": "Loepmodus activeren",
                "lensOff": "Loepmodus deactiveren",
                "edgeOn": "Kanten tonen",
                "edgeOff": "Kanten verbergen",
                "zoomIn": "Inzoomen",
                "zoomOut": "Uitzoomen",
            },
            "pt": {
                "search": "Pesquisar nós",
                "nodeAttr": "Atributos",
                "nodes": "Nós",
                "inLinks": "Ligações de entrada",
                "outLinks": "Ligações de saída",
                "undirLinks": "Ligações sem direção",
                "lensOn": "Ativar modo lente",
                "lensOff": "Ativar modo lente",
                "edgeOn": "Mostrar arestas",
                "edgeOff": "Esconder arestas",
                "zoomIn": "Aumentar zoom",
                "zoomOut": "Diminuir zoom",
            }
        },
        lang: "en"
    };

    var timedict = {}
    function measureTime(key) {
        if (timedict[key]) {
            console.log(key + " took " + (Date.now() - timedict[key])/1000 + "s");
            delete timedict[key]
        } else {
            timedict[key] = Date.now()
        }
    }

    var movingTO = null;

    function onStartMoving() {
        window.clearTimeout(movingTO);
        GexfJS.params.isMoving = true;
    }

    function onEndMoving() {
        movingTO = window.setTimeout(function () {
            GexfJS.params.isMoving = false;
        }, 200);
    }

    function strLang(_str) {
        var _l = GexfJS.i18n[GexfJS.lang];
        return (_l[_str] ? _l[_str] : (GexfJS.i18n["en"][_str] ? GexfJS.i18n["en"][_str] : _str.replace("_", " ")));
    }

    function isURL(text) {
	var _urlExp = /(\b(?:https?:\/\/)[-A-Z0-9]+\.[-A-Z0-9.:]+(?:\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*)?)/ig;
	return _urlExp.test(text) || text.startsWith("index.html");
    }
    
    function replaceURLWithHyperlinks(text, linktext) {
        if (GexfJS.params.replaceUrls) {
	    if (linktext == "search url" || linktext == "korp url") {
		linktext = "Search in Korp";
	    }

            var _urlExp = /(\b(?:https?:\/\/)[-A-Z0-9]+\.[-A-Z0-9.:]+(?:\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*)?)/ig,
                _protocolExp = /^https?:\/\//i,
                _res = text.split(_urlExp);
            return _res.map(function (_txt) {
                if (_txt.match(_urlExp)) {
		    if (linktext == null) {
			linktext = _txt.replace(_protocolExp, '');
			_target = "_blank";
		    }
                    return $('<a>').attr({
                        href: (_protocolExp.test(_txt) ? '' : 'http://') + _txt,
                        target: "_blank"
                    }).text(linktext);
                } else if (_txt.startsWith('index.html')) {
		    return $('<a>').attr({
                        href: _txt,
                        target: "_self"
                    }).text(linktext);
		} else {
                    return $('<span>').text(_txt);
                }
            });
        }
        return $("<span>").text(text);
    }

    function toggleColorFilter(color) {
	if (GexfJS.params.colorFilter === color) {
	    GexfJS.params.colorFilter = null;
	} else {
	    GexfJS.params.colorFilter = color;
	}
    }

    function isPersonName(label) {
	return label.endsWith("_P");
    }

    function isProperNoun(label) {
	return label[0] !== label[0].toLowerCase();
    }

    function displayNode(_nodeIndex, _recentre, _setHistory = true) {
	if (_setHistory) {
	    while (GexfJS.nodeHistory.length - 1 > GexfJS.nodeHistoryPosition) { GexfJS.nodeHistory.pop(); }
	    if (GexfJS.nodeHistory.length == 0 || GexfJS.nodeHistory[GexfJS.nodeHistory.length - 1] != _nodeIndex) {
		GexfJS.nodeHistory.push(_nodeIndex);
		GexfJS.nodeHistoryPosition = GexfJS.nodeHistory.length - 1;
	    }
	}

        GexfJS.params.currentNode = _nodeIndex;
	GexfJS.params.activeNode = -1;
        if (_nodeIndex != -1) {
            var _d = GexfJS.graph.nodeList[_nodeIndex],
                _html = $('<div>'),
                _ul = $('<ul>'),
                _cG = $("#leftcolumn");
            _cG.animate({
                "left": "0px"
            }, function () {
                $("#aUnfold").attr("class", "leftarrow");
                $("#zonecentre").css({
                    left: _cG.width() + "px"
                });
            });
	    var _historyarrows = $('<div>').addClass('historyarrows');
	    var _righthistoryarrow = $('<div>').text('→');
	    if (GexfJS.nodeHistory.length > 1 && GexfJS.nodeHistory.length - 1 > GexfJS.nodeHistoryPosition) {
		_righthistoryarrow.addClass('clickablerighthistoryarrow')
		    .click(function () {
			++GexfJS.nodeHistoryPosition;
                        displayNode(GexfJS.nodeHistory[GexfJS.nodeHistoryPosition], true, false);
                        return false;
                    })
	    } else {
		_righthistoryarrow.addClass('righthistoryarrow');
	    }
	    _righthistoryarrow.appendTo(_historyarrows);
	    
	    var _lefthistoryarrow = $('<div>').text('←');
	    if (GexfJS.nodeHistory.length > 0 && GexfJS.nodeHistoryPosition > 0) {
		_lefthistoryarrow.addClass('clickablelefthistoryarrow')
		    .click(function () {
			--GexfJS.nodeHistoryPosition;
                        displayNode(GexfJS.nodeHistory[GexfJS.nodeHistoryPosition], true, false);
                        return false;
                    })
	    } else {
		_lefthistoryarrow.addClass('lefthistoryarrow');
	    }
	    _lefthistoryarrow.appendTo(_historyarrows);
	    
	    _historyarrows.appendTo(_html);

	    var _largepill = $('<a>').attr("href", "#").addClass("tooltip")
		.attr("alt", "Color filter " + (GexfJS.params.colorFilter == null ? "off": "on") )
		.click(function() {$(this).attr("alt", "Color filter " + (GexfJS.params.colorFilter == null ? "off": "on") );})
		.append($('<div>').addClass('largepill').css('background', _d.B).click(function() {toggleColorFilter(_d.B); }));
	
            $('<h3>')
                .append(_largepill)
                .append($('<span>').text(_d.l))
                .appendTo(_html);
	    // $('<h5>').text("Toggle filter on this colour").addClass('control')
	    // 	.attr("id", "FilterControl")
	    // 	.click(function() {toggleColorFilter(_d.B); })
	    // 	.append($("<div>").addClass("smallpill").css("background", _d.B))
	    // 	.appendTo(_html);
	    //.css("color", _d.B)
            $('<h4>').text(strLang("nodeAttr")).appendTo(_html);
            _ul.appendTo(_html);
            if (GexfJS.params.showId) {
                var _li = $("<li>");
                $("<b>").text("id: ").appendTo(_li);
                $("<span>").text(_d.id).appendTo(_li);
                _li.appendTo(_ul);
            }
            for (var i = 0, l = _d.a.length; i < l; i++) {
                var attr = _d.a[i];
		if (attr[1] === "") {continue; }
                var _li = $("<li>");
                var attrkey = GexfJS.graph.attributes[attr[0]];
		if (attrkey != 'image' && strLang(attrkey) != 'freqrank' && GexfJS.params.replaceUrls && isURL(attr[1])) {
		    if (attrkey == 'egourl') { continue; }
		    _b = $("<b>")
		    _b.append(replaceURLWithHyperlinks(attr[1], strLang(attrkey)));
		    _b.appendTo(_li);
		} else {
		    var attrib_name = strLang(attrkey);
		    if (attrib_name == 'freqrank') {
			attrib_name = "Frequency rank";
		    }
		    if (attrib_name == "degree") {
			$('<a>').attr("href", "#").addClass("tooltip").css("color", "black").attr("alt", "Number of connections").append($("<span>").append($("<b>").text(attrib_name + ": "))).appendTo(_li);
		    } else if (attrib_name == "weighted degree") {
			$('<a>').attr("href", "#").addClass("tooltip").css("color", "black").attr("alt", "Sum of connection weights").append($("<span>").append($("<b>").text(attrib_name + ": "))).appendTo(_li);
		    } else {
			$("<b>").text(attrib_name + ": ").appendTo(_li);
		    }
                    if (attrkey === 'image') {
			$('<br>').appendTo(_li);
			$('<img>').attr("src", attr[1]).appendTo(_li).addClass("attrimg");
		    } else if (typeof(attr[1]) === 'string' && attr[1].match(/^-?\d*\.\d+?$/) != null) {
			_li.append(parseFloat(attr[1]).toFixed(2));
		    } else {
			_li.append(replaceURLWithHyperlinks(attr[1]));
                    }
		}
                _li.appendTo(_ul);
            }
            var _str_in = [],
                _str_out = [],
                _str_undir = [],
		_str_undir_proper = [],
		_str_undir_personal = [];
	    
	    var node_weight_id = []
	    
            GexfJS.graph.edgeList.forEach(function (_e) {
                if (_e.t == _nodeIndex) {
                    var _n = GexfJS.graph.nodeList[_e.s];
	    	    node_weight_id.push([_n, parseFloat(_e.w), _e.s]);
                }
                if (_e.s == _nodeIndex) {
                    var _n = GexfJS.graph.nodeList[_e.t];
	    	    node_weight_id.push([_n, parseFloat(_e.w), _e.t]);
	    	}})

	    node_weight_id.sort(function(a, b) {return b[1] - a[1]});

            node_weight_id.forEach(function (n_w) {
                var _li = $("<li>");
                $("<div>").addClass("smallpill").css("background", n_w[0].B).appendTo(_li);
		var _label = n_w[0].l;
		if (isPersonName(_label)) { _label = _label.substring(0, _label.length - 2); }
                $("<a>")
                    .text(_label)
                    .attr("href", "#")
                    .mouseover(function () {
                        GexfJS.params.activeNode = n_w[2];
                    })
                    .click(function () {
                        displayNode(n_w[2], true);
                        return false;
                    })
                    .appendTo(_li);
                if (GexfJS.params.showEdgeWeight) {
                    $('<span>').text(" (" + n_w[1].toFixed(2) + ")").appendTo(_li);
                }
		if (isPersonName(n_w[0].l)) {
		    _str_undir_personal.push(_li)
		} else if (isProperNoun(n_w[0].l)) {
		    _str_undir_proper.push(_li);
		} else {
		    _str_undir.push(_li);
		}

            });

            if (_str_in.length) {
                $('<h4>').text(strLang("inLinks")).appendTo(_html);
                $('<ul>').html(_str_in).appendTo(_html);
            }
            if (_str_out.length) {
                $('<h4>').text(strLang("outLinks")).appendTo(_html);
                $('<ul>').html(_str_out).appendTo(_html);
            }
            if (_str_undir.length) {
                $('<h4>').text("Linked words:").appendTo(_html);
                $('<ul>').html(_str_undir).appendTo(_html);
            }
            if (_str_undir_personal.length) {
                $('<h4>').text("Linked personal names:").appendTo(_html);
                $('<ul>').html(_str_undir_personal).appendTo(_html);
            }
            if (_str_undir_proper.length) {
                $('<h4>').text("Linked non-personal proper nouns:").appendTo(_html);
                $('<ul>').html(_str_undir_proper).appendTo(_html);
            }
            $("#leftcontent").html(_html);
            if (_recentre) {
                GexfJS.params.centreX = _d.x;
                GexfJS.params.centreY = _d.y;
            }
            // $("#searchinput")
            //     .val(_d.l)
            //     .removeClass('grey');
        }
    }

    function updateWorkspaceBounds() {

        var _elZC = $("#zonecentre");
        var _top = {
            top: $("#titlebar").height() + "px"
        };
        _elZC.css(_top);

        $("#leftcolumn").css(_top);
        GexfJS.graphZone.width = _elZC.width();
        GexfJS.graphZone.height = _elZC.height();
        GexfJS.areParamsIdentical = true;

        for (var i in GexfJS.graphZone) {
            GexfJS.areParamsIdentical = GexfJS.areParamsIdentical && (GexfJS.graphZone[i] == GexfJS.oldGraphZone[i]);
        }
        if (!GexfJS.areParamsIdentical) {

            $("#carte")
                .attr({
                    width: GexfJS.graphZone.width,
                    height: GexfJS.graphZone.height
                })
                .css({
                    width: GexfJS.graphZone.width + "px",
                    height: GexfJS.graphZone.height + "px"
                });
            for (var i in GexfJS.graphZone) {
                GexfJS.oldGraphZone[i] = GexfJS.graphZone[i];
            }
        }
    }

    function onTouchStart(evt) {

        var coords = evt.originalEvent.targetTouches[0];
        if (evt.originalEvent.targetTouches.length == 1) {
            GexfJS.lastMouse = {
                x: coords.pageX,
                y: coords.pageY
            }
            GexfJS.dragOn = true;
            GexfJS.mouseHasMoved = false;
        } else {
            GexfJS.lastPinch = getPinchDistance(evt);
            GexfJS.pinchOn = true;
        }
        onStartMoving();

    }

    function startMove(evt) {
        evt.preventDefault();
        GexfJS.dragOn = true;
        GexfJS.lastMouse = {
            x: evt.pageX,
            y: evt.pageY
        };
        GexfJS.mouseHasMoved = false;
        onStartMoving();
    }

    function onTouchEnd(evt) {
        GexfJS.dragOn = false;
        GexfJS.pinchOn = false;
        GexfJS.mouseHasMoved = false;
        onEndMoving();
    }

    function endMove(evt) {
        document.body.style.cursor = "default";
        GexfJS.dragOn = false;
        GexfJS.mouseHasMoved = false;
        onEndMoving();
    }

    function onGraphClick(evt) {
        if (!GexfJS.mouseHasMoved && !GexfJS.pinchOn) {
            displayNode(GexfJS.params.activeNode);
        }
        endMove();
    }

    function changeGraphPosition(evt, echelle) {
        document.body.style.cursor = "move";
        var _coord = {
            x: evt.pageX,
            y: evt.pageY
        };
        GexfJS.params.centreX += (GexfJS.lastMouse.x - _coord.x) / echelle;
        GexfJS.params.centreY += (GexfJS.lastMouse.y - _coord.y) / echelle;
        GexfJS.lastMouse = _coord;
    }

    function onGraphMove(evt) {
        evt.preventDefault();
        if (!GexfJS.graph) {
            return;
        }
        GexfJS.mousePosition = {
            x: evt.pageX - $(this).offset().left,
            y: evt.pageY - $(this).offset().top
        };
        if (GexfJS.dragOn) {
            changeGraphPosition(evt, GexfJS.globalScale);
            GexfJS.mouseHasMoved = true;
        } else {
            GexfJS.params.activeNode = getNodeFromPos(GexfJS.mousePosition);
            document.body.style.cursor = (GexfJS.params.activeNode != -1 ? "pointer" : "default");
        }
    }

    function onGraphDrag(evt) {
        evt.preventDefault();
        if (!GexfJS.graph) {
            return;
        }
        if (evt.originalEvent.targetTouches.length == 1) {
            var coords = evt.originalEvent.targetTouches[0];
            GexfJS.mousePosition = {
                x: coords.pageX - $(this).offset().left,
                y: coords.pageY - $(this).offset().top
            };
            if (GexfJS.dragOn) {
                evt.pageX = coords.pageX;
                evt.pageY = coords.pageY;
                changeGraphPosition(evt, GexfJS.globalScale);
                GexfJS.mouseHasMoved = true;
            } else {
                GexfJS.params.activeNode = getNodeFromPos(GexfJS.mousePosition);
            }
        } else {

            evt.pageX = evt.originalEvent.targetTouches[0].pageX +
                (
                    (
                        evt.originalEvent.targetTouches[1].pageX -
                            evt.originalEvent.targetTouches[0].pageX
                    ) / 2
                );
            evt.pageY = evt.originalEvent.targetTouches[0].pageY +
                (
                    (
                        evt.originalEvent.targetTouches[1].pageY -
                            evt.originalEvent.targetTouches[0].pageY
                    ) / 2
                );

            var currentPinch = getPinchDistance(evt);

            var delta = currentPinch - GexfJS.lastPinch;
            if (Math.abs(delta) >= 20) {
                GexfJS.lastPinch = currentPinch;
                onGraphScroll(evt, delta);
            } else {
                GexfJS.totalScroll = 0;
            }
        }
    }

    function getPinchDistance(evt) {
        return Math.sqrt(
            Math.pow(
                evt.originalEvent.targetTouches[0].pageX -
                    evt.originalEvent.targetTouches[1].pageX, 2) +
		Math.pow(
                    evt.originalEvent.targetTouches[0].pageY -
			evt.originalEvent.targetTouches[1].pageY, 2
		)
        );
    }

    function onOverviewMove(evt) {
        if (GexfJS.dragOn) {
            changeGraphPosition(evt, -GexfJS.overviewScale);
        }
    }

    function onOverviewDrag(evt) {
        var coords = evt.originalEvent.targetTouches[0];
        evt.pageX = coords.pageX;
        evt.pageY = coords.pageY;
        if (GexfJS.dragOn) {
            changeGraphPosition(evt, -GexfJS.overviewScale);
        }
    }

    function onGraphScroll(evt, delta) {
        GexfJS.totalScroll += delta;
        if (Math.abs(GexfJS.totalScroll) >= 1) {
            if (GexfJS.totalScroll < 0) {
                if (GexfJS.params.zoomLevel > GexfJS.minZoom) {
                    GexfJS.params.zoomLevel--;
                    var _el = (typeof ($(this).offset()) == 'object') ? $(this) : $('#carte'),
                        _off = _el.offset(),
                        _deltaX = evt.pageX - _el.width() / 2 - _off.left,
                        _deltaY = evt.pageY - _el.height() / 2 - _off.top;
                    GexfJS.params.centreX -= (Math.SQRT2 - 1) * _deltaX / GexfJS.globalScale;
                    GexfJS.params.centreY -= (Math.SQRT2 - 1) * _deltaY / GexfJS.globalScale;
                    $("#zoomSlider").slider("value", GexfJS.params.zoomLevel);
                }
            } else {
                if (GexfJS.params.zoomLevel < GexfJS.maxZoom) {
                    GexfJS.params.zoomLevel++;
                    GexfJS.globalScale = Math.pow(Math.SQRT2, GexfJS.params.zoomLevel);
                    var _el = (typeof ($(this).offset()) == 'object') ? $(this) : $('#carte'),
                        _off = _el.offset(),
                        _deltaX = evt.pageX - _el.width() / 2 - _off.left,
                        _deltaY = evt.pageY - _el.height() / 2 - _off.top;
                    GexfJS.params.centreX += (Math.SQRT2 - 1) * _deltaX / GexfJS.globalScale;
                    GexfJS.params.centreY += (Math.SQRT2 - 1) * _deltaY / GexfJS.globalScale;
                    $("#zoomSlider").slider("value", GexfJS.params.zoomLevel);
                }
            }
            GexfJS.totalScroll = 0;
            onStartMoving();
            onEndMoving();
        }
    }

    function initializeFilter() {
        $("#filterSlider").slider({
            orientation: "vertical",
            value: GexfJS.proportionOfNodesToDraw,
            min: 0.0,
            max: 1.0,
            range: "min",
            step: 0.01,
            slide: function (event, ui) {
                GexfJS.proportionOfNodesToDraw = ui.value;
		onStartMoving(); onEndMoving();
            },
        });
	$("#filterSliderTooltip").mousemove(function () {
	    $(this).attr("alt", "Showing up to " + parseInt((maxNodesToDraw()/GexfJS.graph.nodeList.length)*100) + "% (" + parseInt(maxNodesToDraw()) + ") of nodes" );
	})
    }

    function initializeMap() {
        clearInterval(GexfJS.timeRefresh);
        GexfJS.oldParams = {};
        GexfJS.ctxGraphe.clearRect(0, 0, GexfJS.graphZone.width, GexfJS.graphZone.height);
        $("#zoomSlider").slider({
            orientation: "vertical",
            value: GexfJS.params.zoomLevel,
            min: GexfJS.minZoom,
            max: GexfJS.maxZoom,
            range: "min",
            step: 1,
            slide: function (event, ui) {
                GexfJS.params.zoomLevel = ui.value;
                onStartMoving();
                onEndMoving();
            }
        });
	
        $("#overviewzone").css({
            width: GexfJS.overviewWidth + "px",
            height: GexfJS.overviewHeight + "px"
        });
        $("#overview").attr({
            width: GexfJS.overviewWidth,
            height: GexfJS.overviewHeight
        });
        GexfJS.timeRefresh = setInterval(traceMap, 60);
        GexfJS.graph = null;
        loadGraph();
    }

    function loadGraph() {

        var url = (document.location.hash.length > 1 ? document.location.hash.substr(1) : GexfJS.params.graphFile);
        var isJson = (function (t) { return t[t.length - 1]; })(url.split('.')) === 'json';

        console.log("Loading " + url + " in " + (isJson ? "json" : "gexf") + " mode");

        $.ajax({
            url: url,
            dataType: (isJson ? "json" : "xml"),
            success: function (data) {
                measureTime("Loading graph from network");
                measureTime("Pre-processing graph");
                if (isJson) {
		    GexfJS.graph = data;
		    initializeFilter();

		    if (!GexfJS.graph.hasOwnProperty("name")) { GexfJS.graph.name = url; }
		    document.getElementsByName("graphname")[0].innerHTML = GexfJS.graph.name;
		    if (GexfJS.graph.name.includes("PMI")) {
			document.getElementById("mainPageLink").setAttribute("href", "http://urn.fi/urn:nbn:fi:lb-2021060102");
		    } else if (GexfJS.graph.name.includes("fastText")) {
			document.getElementById("mainPageLink").setAttribute("href", "http://urn.fi/urn:nbn:fi:lb-2021060104");
		    }
                    GexfJS.graph.indexOfLabels = GexfJS.graph.nodeList.map(function (_d) {
                        return normalizeText.normalizeText(_d.l);
                    });
		    var translation_attr_index = GexfJS.graph.attributes.indexOf("translation");
		    if (translation_attr_index >= 0) {
			console.log("Found translation attribute");
			GexfJS.graph.indexOfTranslations = [];
			GexfJS.graph.nodeList.forEach(function (_n) {
			    _n.translation = _n["a"][translation_attr_index][1].replace(/;+$/g, '');
			    GexfJS.graph.indexOfTranslations.push(normalizeText.normalizeText(_n.translation));
			});
		    }

		    GexfJS.graph.index_by_importance = new Array(GexfJS.graph.nodeList.length);
		    var importance_index = GexfJS.graph.attributes.indexOf("weighted_degree");
		    if (importance_index >= 0) {
			console.log("Found importance attribute");
			for (let i = 0; i < GexfJS.graph.nodeList.length; ++i) {
			    GexfJS.graph.index_by_importance[i] = i;
			}
			GexfJS.graph.index_by_importance.sort((a, b) => 
			    GexfJS.graph.nodeList[b]["a"][importance_index][1] - GexfJS.graph.nodeList[a]["a"][importance_index][1] );
		    }
		    // Center view on most important node
		    GexfJS.params.centreX = GexfJS.graph.nodeList[GexfJS.graph.index_by_importance[0]].x;
                    GexfJS.params.centreY = GexfJS.graph.nodeList[GexfJS.graph.index_by_importance[0]].y;;
		    
		    GexfJS.graph.edge_index_by_importance = new Array(GexfJS.graph.edgeList.length);
		    for (let i = 0; i < GexfJS.graph.edgeList.length; ++i) {
			    GexfJS.graph.edge_index_by_importance[i] = i;
			}
		    GexfJS.graph.edge_index_by_importance.sort((a, b) => GexfJS.graph.edgeList[b].w - GexfJS.graph.edgeList[a].w );
                } else {
                    var _g = $(data).find("graph"),
                        _nodes = _g.children().filter("nodes").children(),
                        _edges = _g.children().filter("edges").children();
                    GexfJS.graph = {
                        directed: (_g.attr("defaultedgetype") == "directed"),
                        nodeList: [],
                        indexOfLabels: [],
                        edgeList: [],
                        attributes: {},
                    };
                    var _xmin = 1e9, _xmax = -1e9, _ymin = 1e9, _ymax = -1e9; _marge = 30;
                    $(_nodes).each(function () {
                        var _n = $(this),
                            _pos = _n.find("viz\\:position,position"),
                            _x = _pos.attr("x"),
                            _y = _pos.attr("y");
                        _xmin = Math.min(_x, _xmin);
                        _xmax = Math.max(_x, _xmax);
                        _ymin = Math.min(_y, _ymin);
                        _ymax = Math.max(_y, _ymax);
                    });

                    var _scale = Math.min((GexfJS.baseWidth - _marge) / (_xmax - _xmin), (GexfJS.baseHeight - _marge) / (_ymax - _ymin));
                    var _deltax = (GexfJS.baseWidth - _scale * (_xmin + _xmax)) / 2;
                    var _deltay = (GexfJS.baseHeight - _scale * (_ymin + _ymax)) / 2;
                    var nodeIndexById = [];

                    $(_nodes).each(function () {
                        var _n = $(this),
                            _id = _n.attr("id"),
                            _label = _n.attr("label") || _id,
                            _pos = _n.find("viz\\:position,position"),
                            _d = {
                                id: _id,
                                l: _label,
                                x: _deltax + _scale * _pos.attr("x"),
                                y: _deltay - _scale * _pos.attr("y"),
                                r: _scale * _n.find("viz\\:size,size").attr("value"),
                            },
                            _col = _n.find("viz\\:color,color"),
                            _r = _col.attr("r"),
                            _g = _col.attr("g"),
                            _b = _col.attr("b"),
                            _attr = _n.find("attvalue");
                        _d.rgb = [_r, _g, _b];
                        _d.B = "rgba(" + _r + "," + _g + "," + _b + ",.7)";
                        _d.G = "rgba(" + Math.floor(84 + .33 * _r) + "," + Math.floor(84 + .33 * _g) + "," + Math.floor(84 + .33 * _b) + ",.5)";
                        _d.a = [];
                        $(_attr).each(function () {
                            var _a = $(this),
                                _for = _a.attr("for");
                            _d.a.push([
                                _for ? _for : 'attribute_' + _a.attr("id"),
                                _a.attr("value")
                            ]);
                            GexfJS.graph.attributes[_for] = _for;
                        });
                        if (GexfJS.params.sortNodeAttributes) {
                            _d.a.sort(function (a, b) {
                                return (a[0] < b[0] ? -1 : (a[0] > b[0] ? 1 : 0));
                            });
                        }
                        GexfJS.graph.nodeList.push(_d);
                        nodeIndexById.push(_d.id);
                        GexfJS.graph.indexOfLabels.push(normalizeText.normalizeText(_d.l));
                    });

                    $(_edges).each(function () {
                        var _e = $(this),
                            _sid = _e.attr("source"),
                            _six = nodeIndexById.indexOf(_sid),
                            _tid = _e.attr("target"),
                            _tix = nodeIndexById.indexOf(_tid),
                            _w = _e.find('attvalue[for="weight"]').attr('value') || _e.attr('weight'),
                            _col = _e.find("viz\\:color,color"),
                            _directed = GexfJS.graph.directed;
                        if (_e.attr("type") == "directed") {
                            _directed = true;
                        }
                        if (_e.attr("type") == "undirected") {
                            _directed = false;
                        }
                        if (_col.length) {
                            var _r = _col.attr("r"),
                                _g = _col.attr("g"),
                                _b = _col.attr("b");
                        } else {
                            var _scol = GexfJS.graph.nodeList[_six].rgb;
                            if (_directed) {
                                var _r = _scol[0],
                                    _g = _scol[1],
                                    _b = _scol[2];
                            } else {
                                var _tcol = GexfJS.graph.nodeList[_tix].rgb,
                                    _r = Math.floor(.5 * _scol[0] + .5 * _tcol[0]),
                                    _g = Math.floor(.5 * _scol[1] + .5 * _tcol[1]),
                                    _b = Math.floor(.5 * _scol[2] + .5 * _tcol[2]);
                            }
                        }
                        GexfJS.graph.edgeList.push({
                            s: _six,
                            t: _tix,
                            W: Math.max(GexfJS.params.minEdgeWidth, Math.min(GexfJS.params.maxEdgeWidth, (_w || 1))) * _scale,
                            w: parseFloat(_w || "1"),
                            C: "rgba(" + _r + "," + _g + "," + _b + ",.7)",
                            l: _e.attr("label") || "",
                            d: _directed
                        });
                    });
                }
                measureTime("Pre-processing graph");

                GexfJS.ctxMini.clearRect(0, 0, GexfJS.overviewWidth, GexfJS.overviewHeight);

                GexfJS.graph.nodeList.forEach(function (_d) {
                    GexfJS.ctxMini.fillStyle = _d.B;
                    GexfJS.ctxMini.beginPath();
                    GexfJS.ctxMini.arc(_d.x * GexfJS.overviewScale, _d.y * GexfJS.overviewScale, _d.r * GexfJS.overviewScale + 1, 0, Math.PI * 2, true);
                    GexfJS.ctxMini.closePath();
                    GexfJS.ctxMini.fill();
                });

                GexfJS.imageMini = GexfJS.ctxMini.getImageData(0, 0, GexfJS.overviewWidth, GexfJS.overviewHeight);

		if ("root_node" in GexfJS.graph) {
		    console.log("displaying root node " + GexfJS.graph.root_node);
		    displayNode(GexfJS.graph.root_node, true);
		}
            }
        });

    }

    function getNodeFromPos(_coords) {
	let node_radius_upper_limit = 80;
        for (var i = GexfJS.graph.nodeList.length - 1; i >= 0; i--) {
            var _d = GexfJS.graph.nodeList[i];
            if (_d.visible && _d.withinFrame && !_d.filtered) {
                var _c = _d.actual_coords;
                _r = Math.sqrt(Math.pow(_c.x - _coords.x, 2) + Math.pow(_c.y - _coords.y, 2));
                if (_r < Math.min(_c.r, node_radius_upper_limit)) {
                    return i;
                }
            }
        }
        return -1;
    }

    function calcCoord(x, y, coord) {
        var _r = Math.sqrt(Math.pow(coord.x - x, 2) + Math.pow(coord.y - y, 2));
        if (_r < GexfJS.lensRadius) {
            var _cos = (coord.x - x) / _r;
            var _sin = (coord.y - y) / _r;
            var _newr = GexfJS.lensRadius * Math.pow(_r / GexfJS.lensRadius, GexfJS.lensGamma);
            var _coeff = (GexfJS.lensGamma * Math.pow((_r + 1) / GexfJS.lensRadius, GexfJS.lensGamma - 1));
            return {
                "x": x + _newr * _cos,
                "y": y + _newr * _sin,
                "r": _coeff * coord.r
            };
        }
        else {
            return coord;
        }
    }

    function findAngle(sx, sy, ex, ey) {
        var tmp = Math.atan((ey - sy) / (ex - sx));
        if (ex - sx >= 0) {
            return tmp
        } else {
            return tmp + Math.PI
        }
    }

    function drawArrowhead(ctx, locx, locy, angle, sizex, sizey) {
        var tmp = ctx.lineWidth;
        var hx = sizex / 2;
        var hy = sizey / 2;
        ctx.translate((locx), (locy));
        ctx.rotate(angle);
        ctx.translate(-hx, -hy);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, 1 * sizey);
        ctx.lineTo(1 * sizex, 1 * hy);
        ctx.closePath();
        ctx.fillStyle = "#424242";
        ctx.fill();
        ctx.stroke();
        ctx.translate(hx, hy);
        ctx.rotate(-angle);
        ctx.translate(-locx, -locy);
        ctx.lineWidth = tmp;
    }

    function maxNodesToDraw() {
	return Math.pow(GexfJS.proportionOfNodesToDraw, (3/4)) * GexfJS.graph.nodeList.length;
    }

    function subarray_of(a, b) {
	if (b.length === 0) { return true; }
	if (b.length > a.length) { return false; }
	for (let i = 0; i <= a.length - b.length; ++i) {
	    for (let j = 0; j < b.length; ++j) {
		if (a[i+j] !== b[j]) { break; }
		if (j === b.length - 1) { return true; }
	    }
	}
	return false;
    }
    
    function traceArc(ctx, source, target, arrow_size, draw_arrow) {
	console.log("Calling traceArc with " + arrow_size + " " + GexfJS.ctxGraphe.lineWidth)
        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        if (GexfJS.params.curvedEdges) {
            var x2, y2, x3, y3, x4, y4, x5, y5;
            x2 = source.x;
            y2 = source.y;
            if ((source.x == target.x) && (source.y == target.y)) {
                x3 = source.x + 2.8 * source.r;
                y3 = source.y - source.r;
                x4 = source.x;
                y4 = source.y + 2.8 * source.r;
                x5 = source.x + 1;
                y5 = source.y;
            } else {
                x3 = .3 * target.y - .3 * source.y + .8 * source.x + .2 * target.x;
                y3 = .8 * source.y + .2 * target.y - .3 * target.x + .3 * source.x;
                x4 = .3 * target.y - .3 * source.y + .2 * source.x + .8 * target.x;
                y4 = .2 * source.y + .8 * target.y - .3 * target.x + .3 * source.x;
                x5 = target.x;
                y5 = target.y;
            }
            ctx.bezierCurveTo(x3, y3, x4, y4, x5, y5);
            ctx.stroke();
            if (draw_arrow) {
                // Find the middle of the bezierCurve
                var tmp = Math.pow(0.5, 3)
                var x_middle = tmp * (x2 + 3 * x3 + 3 * x4 + x5)
                var y_middle = tmp * (y2 + 3 * y3 + 3 * y4 + y5)
                // Find the angle of the bezierCurve at the middle point
                var tmp = Math.pow(0.5, 2)
                var x_prime_middle = 3 * tmp * (- x2 - x3 + x4 + x5)
                var y_prime_middle = 3 * tmp * (- y2 - y3 + y4 + y5)
                drawArrowhead(ctx, x_middle, y_middle, findAngle(0, 0, x_prime_middle, y_prime_middle), arrow_size, arrow_size);
            }
        } else {
            ctx.lineTo(target.x, target.y);
            ctx.stroke();
            if (draw_arrow) {
                drawArrowhead(ctx, (source.x + target.x) / 2, (source.y + target.y) / 2, findAngle(source.x, source.y, target.x, target.y), GexfJS.overviewScale * arrow_size, GexfJS.overviewScale * arrow_size);
                ctx.stroke();
            }
        }
    }

    function traceMap() {
        updateWorkspaceBounds();
        if (!GexfJS.graph) {
            return;
        }
        var _identical = GexfJS.areParamsIdentical;
        GexfJS.params.mousePosition = (GexfJS.params.useLens ? (GexfJS.mousePosition ? (GexfJS.mousePosition.x + "," + GexfJS.mousePosition.y) : "out") : null);
        for (var i in GexfJS.params) {
            _identical = _identical && (GexfJS.params[i] == GexfJS.oldParams[i]);
        }
        if (_identical) {
            return;
        }
        for (var i in GexfJS.params) {
            GexfJS.oldParams[i] = GexfJS.params[i];
        }

        GexfJS.globalScale = Math.pow(Math.SQRT2, GexfJS.params.zoomLevel);
        GexfJS.decalageX = (GexfJS.graphZone.width / 2) - (GexfJS.params.centreX * GexfJS.globalScale);
        GexfJS.decalageY = (GexfJS.graphZone.height / 2) - (GexfJS.params.centreY * GexfJS.globalScale);

        var _sizeFactor = GexfJS.globalScale * Math.pow(GexfJS.globalScale, -.15),
            _edgeSizeFactor = _sizeFactor * GexfJS.params.edgeWidthFactor,
            _nodeSizeFactor = _sizeFactor * GexfJS.params.nodeSizeFactor,
            _textSizeFactor = GexfJS.params.fontSizeFactor || 1;

        GexfJS.ctxGraphe.clearRect(0, 0, GexfJS.graphZone.width, GexfJS.graphZone.height);

        if (GexfJS.params.useLens && GexfJS.mousePosition) {
            GexfJS.ctxGraphe.fillStyle = "rgba(220,220,250,0.4)";
            GexfJS.ctxGraphe.beginPath();
            GexfJS.ctxGraphe.arc(GexfJS.mousePosition.x, GexfJS.mousePosition.y, GexfJS.lensRadius, 0, Math.PI * 2, true);
            GexfJS.ctxGraphe.closePath();
            GexfJS.ctxGraphe.fill();
        }

        var _centralNode = ((GexfJS.params.activeNode != -1) ? GexfJS.params.activeNode : GexfJS.params.currentNode);

	var min_node_radius = 1000.0;
	var nodes_visible = 0;
        for (let i = 0; i < GexfJS.graph.index_by_importance.length; ++i) {
            var _d = GexfJS.graph.nodeList[GexfJS.graph.index_by_importance[i]];
            _d.actual_coords = {
                x: GexfJS.globalScale * _d.x + GexfJS.decalageX,
                y: GexfJS.globalScale * _d.y + GexfJS.decalageY,
                r: _nodeSizeFactor * _d.r
            };
            _d.withinFrame = ((_d.actual_coords.x + _d.actual_coords.r > 0) && (_d.actual_coords.x - _d.actual_coords.r < GexfJS.graphZone.width) && (_d.actual_coords.y + _d.actual_coords.r > 0) && (_d.actual_coords.y - _d.actual_coords.r < GexfJS.graphZone.height));
	    var filtered_by_textfilter = (GexfJS.textFilter !== ""); // Defaultly filtered if there's a filter, but..
	    if (filtered_by_textfilter) {
		let label = normalizeText.normalizeText(_d.l);
		let translation = normalizeText.normalizeText(GexfJS.graph.indexOfTranslations[GexfJS.graph.index_by_importance[i]]);
		if (GexfJS.textFilter.startsWith('"') && GexfJS.textFilter.endsWith('"')) {
		    // Special quoted string filter matches whole words only
		    // let unquoted = GexfJS.textFilter.substring(1, GexfJS.textFilter.length - 1);
		    let unquoted_parts = GexfJS.textFilter.substring(1, GexfJS.textFilter.length - 1).split(" ")
		    let label_parts = label.split(" ")
		    let trans_parts = translation.split(" ")
		    filtered_by_textfilter = (!subarray_of(label_parts, unquoted_parts) && !subarray_of(trans_parts, unquoted_parts))
		} else {
		    filtered_by_textfilter = (!label.includes(GexfJS.textFilter) && !translation.includes(GexfJS.textFilter));
		}
	    }
	    _d.filtered = (GexfJS.params.colorFilter != null && _d.B !== GexfJS.params.colorFilter) || filtered_by_textfilter;
	    if (_d.withinFrame) {
		min_node_radius = Math.min(min_node_radius, _d.actual_coords.r);
		    // No node selected, showing everything
		_d.visible = (GexfJS.params.currentNode == -1 && nodes_visible < maxNodesToDraw()) || i == _centralNode;
		nodes_visible += _d.visible && !_d.filtered ? 1: 0;
	    } else {
		_d.visible = i == _centralNode;
	    }
        }

        var _tagsMisEnValeur = [];

        if (_centralNode != -1) {
            _tagsMisEnValeur = [_centralNode];
        }
	console.log("Trying to enter arc drawing");
        if (!GexfJS.params.isMoving && (GexfJS.params.showEdges || _centralNode != -1)) {
	    console.log("Entered arc drawing, _centralNode is " + _centralNode);
	    var maxLineWidth = 0.001;
            var _showAllEdges = (GexfJS.params.showEdges && GexfJS.params.currentNode == -1);

            for (var i in GexfJS.graph.edgeList) {
                var _d = GexfJS.graph.edgeList[i],
                    _six = _d.s,
                    _tix = _d.t,
                    _ds = GexfJS.graph.nodeList[_six],
                    _dt = GexfJS.graph.nodeList[_tix];
                var _isLinked = false;
                if (_centralNode != -1) {
                    if (_six == _centralNode) {
                        _tagsMisEnValeur.push(_tix);
                        _coulTag = _dt.B;
                        _isLinked = true;
                        _dt.visible = true;
                    }
                    if (_tix == _centralNode) {
                        _tagsMisEnValeur.push(_six);
                        _coulTag = _ds.B;
                        _isLinked = true;
                        _ds.visible = true;
                    }
                }

                if ((_isLinked || _showAllEdges) && (_ds.withinFrame || _dt.withinFrame) && _ds.visible && _dt.visible) {
                    var _coords = ((GexfJS.params.useLens && GexfJS.mousePosition) ? calcCoord(GexfJS.mousePosition.x, GexfJS.mousePosition.y, _ds.actual_coords) : _ds.actual_coords);
                    _coordt = ((GexfJS.params.useLens && GexfJS.mousePosition) ? calcCoord(GexfJS.mousePosition.x, GexfJS.mousePosition.y, _dt.actual_coords) : _dt.actual_coords);
		    var _dist = Math.sqrt(Math.pow(_coords.x - _coordt.x, 2) + Math.pow(_coords.y - _coordt.y, 2));
		    maxLineWidth = Math.max(maxLineWidth, _edgeSizeFactor * _d.W);
                }
            }

            for (let i = 0; i < GexfJS.graph.edge_index_by_importance.length; ++i) {
                var _d = GexfJS.graph.edgeList[GexfJS.graph.edge_index_by_importance[i]],
                    _six = _d.s,
                    _tix = _d.t,
                    _ds = GexfJS.graph.nodeList[_six],
                    _dt = GexfJS.graph.nodeList[_tix];
                var _isLinked = false;
                if (_centralNode != -1) {
                    if (_six == _centralNode) {
                        _tagsMisEnValeur.push(_tix);
                        _coulTag = _dt.B;
                        _isLinked = true;
                        _dt.visible = true;
			console.log("Setting visible " + _six + " " + _tix);
                    }
                    if (_tix == _centralNode) {
                        _tagsMisEnValeur.push(_six);
                        _coulTag = _ds.B;
                        _isLinked = true;
                        _ds.visible = true;
			console.log("Setting visible " + _six + " " + _tix);
                    }
                }
		
                if (_isLinked || (_showAllEdges && (_ds.withinFrame || _dt.withinFrame) && _ds.visible && _dt.visible && (!_ds.filtered && !_dt.filtered))) {
                    var _coords = ((GexfJS.params.useLens && GexfJS.mousePosition) ? calcCoord(GexfJS.mousePosition.x, GexfJS.mousePosition.y, _ds.actual_coords) : _ds.actual_coords);
                    _coordt = ((GexfJS.params.useLens && GexfJS.mousePosition) ? calcCoord(GexfJS.mousePosition.x, GexfJS.mousePosition.y, _dt.actual_coords) : _dt.actual_coords);
		    var _dist = Math.sqrt(Math.pow(_coords.x - _coordt.x, 2) + Math.pow(_coords.y - _coordt.y, 2));
                    GexfJS.ctxGraphe.strokeStyle = (_isLinked ? _d.C : "rgba(100,100,100,0.2)");
		    if (maxLineWidth <= 30.0) {
			console.log("Setting lineWidth, vals are " + maxLineWidth + " " + min_node_radius * .8 + " " + _dist*.5 + " " + _edgeSizeFactor * _d.W);
			GexfJS.ctxGraphe.lineWidth = Math.min(maxLineWidth, min_node_radius*.8, _dist*.5, _edgeSizeFactor * _d.W);
		    } else {
			GexfJS.ctxGraphe.lineWidth = 30*((min_node_radius*.8, _dist*.5, _edgeSizeFactor * _d.W)/maxLineWidth);
		    }
                    traceArc(GexfJS.ctxGraphe, _coords, _coordt, _sizeFactor * 3.5, GexfJS.params.showEdgeArrow && _d.d);
                }
            }
        }

        GexfJS.ctxGraphe.lineWidth = 4;
        GexfJS.ctxGraphe.strokeStyle = "rgba(0,100,0,0.8)";

	if (_centralNode == -1 && typeof GexfJS.graph.root_node !== "undefined") {
	    _centralNode = GexfJS.graph.root_node;
	}
        if (_centralNode != -1) {
	    GexfJS.graph.root_node = i;
            var _dnc = GexfJS.graph.nodeList[_centralNode];
	    if (_dnc) {
		_dnc.real_coords = ((GexfJS.params.useLens && GexfJS.mousePosition) ? calcCoord(GexfJS.mousePosition.x, GexfJS.mousePosition.y, _dnc.actual_coords) : _dnc.actual_coords);
	    }
        }

	let node_radius_upper_limit = 60;
        for (var i in GexfJS.graph.nodeList) {
            var _d = GexfJS.graph.nodeList[i];
            if (_d.visible && _d.withinFrame && !_d.filtered) {
                if (i != _centralNode) {
                    _d.real_coords = ((GexfJS.params.useLens && GexfJS.mousePosition) ? calcCoord(GexfJS.mousePosition.x, GexfJS.mousePosition.y, _d.actual_coords) : _d.actual_coords);
                    _d.isTag = (_tagsMisEnValeur.indexOf(parseInt(i)) != -1);
                    GexfJS.ctxGraphe.beginPath();
                    GexfJS.ctxGraphe.fillStyle = ((_tagsMisEnValeur.length && !_d.isTag) ? _d.G : _d.B);
                    GexfJS.ctxGraphe.arc(_d.real_coords.x, _d.real_coords.y, Math.min(_d.real_coords.r, node_radius_upper_limit), 0, Math.PI * 2, true);
                    GexfJS.ctxGraphe.closePath();
                    GexfJS.ctxGraphe.fill();
                }
            }
        }
	let min_font = 12;
	let max_font = 60;
	if (typeof GexfJS.showLabels === 'undefined' || GexfJS.showLabels) {
        for (var i in GexfJS.graph.nodeList) {
            var _d = GexfJS.graph.nodeList[i];
            if (_d.visible && _d.withinFrame && !_d.filtered) {
                if (i != _centralNode) {
                    var _fs = _d.real_coords.r * _textSizeFactor;
                    if (_d.isTag) {
                        if (_centralNode != -1) {
                            var _dist = Math.sqrt(Math.pow(_d.real_coords.x - _dnc.real_coords.x, 2) + Math.pow(_d.real_coords.y - _dnc.real_coords.y, 2));
                            if (_dist > 80) {
                                _fs = Math.min(Math.max(GexfJS.params.textDisplayThreshold + 2, _fs, min_font), max_font);
                            }
                        } else {
                            _fs = Math.min(Math.max(GexfJS.params.textDisplayThreshold + 2, _fs, min_font), max_font);
                        }
                    }
                    if (_fs > GexfJS.params.textDisplayThreshold) {
                        GexfJS.ctxGraphe.fillStyle = ((i != GexfJS.params.activeNode) && _tagsMisEnValeur.length && ((!_d.isTag) || (_centralNode != -1)) ? "rgba(60,60,60,0.7)" : "rgb(0,0,0)");
                        GexfJS.ctxGraphe.font = Math.floor(Math.min(Math.max(_fs, min_font), max_font)) + "px Arial";
                        GexfJS.ctxGraphe.textAlign = "center";
                        GexfJS.ctxGraphe.textBaseline = "middle";
                        GexfJS.ctxGraphe.fillText(_d.l , _d.real_coords.x, _d.real_coords.y);
                    }
                }
            }
        }
	}

        if (_centralNode != -1 && _dnc) {
            GexfJS.ctxGraphe.fillStyle = _dnc.B;
            GexfJS.ctxGraphe.beginPath();
            GexfJS.ctxGraphe.arc(_dnc.real_coords.x, _dnc.real_coords.y, Math.min(_dnc.real_coords.r, node_radius_upper_limit*1.2), 0, Math.PI * 2, true);
            GexfJS.ctxGraphe.closePath();
            GexfJS.ctxGraphe.fill();
            GexfJS.ctxGraphe.stroke();
            var _fs = Math.max(GexfJS.params.textDisplayThreshold + 2, _dnc.real_coords.r * _textSizeFactor, min_font - 2) + 2
            GexfJS.ctxGraphe.font = "bold " + Math.max(min_font, Math.min(Math.floor(_fs), max_font + 8)) + "px Arial";
            GexfJS.ctxGraphe.textAlign = "center";
            GexfJS.ctxGraphe.textBaseline = "middle";
            GexfJS.ctxGraphe.fillStyle = "rgba(255,255,250,0.8)";
	    var display_text = _dnc.l;
	    if (display_text !== _dnc.translation) {
		display_text += " (" + _dnc.translation + ")";
	    }
            GexfJS.ctxGraphe.fillText(display_text, _dnc.real_coords.x - 2, _dnc.real_coords.y);
            GexfJS.ctxGraphe.fillText(display_text, _dnc.real_coords.x + 2, _dnc.real_coords.y);
            GexfJS.ctxGraphe.fillText(display_text, _dnc.real_coords.x, _dnc.real_coords.y - 2);
            GexfJS.ctxGraphe.fillText(display_text, _dnc.real_coords.x, _dnc.real_coords.y + 2);
            GexfJS.ctxGraphe.fillStyle = "rgb(0,0,0)";
            GexfJS.ctxGraphe.fillText(display_text, _dnc.real_coords.x, _dnc.real_coords.y);
        }

        GexfJS.ctxMini.putImageData(GexfJS.imageMini, 0, 0);
        var _r = GexfJS.overviewScale / GexfJS.globalScale,
            _x = - _r * GexfJS.decalageX,
            _y = - _r * GexfJS.decalageY,
            _w = _r * GexfJS.graphZone.width,
            _h = _r * GexfJS.graphZone.height;

        GexfJS.ctxMini.strokeStyle = "rgb(220,0,0)";
        GexfJS.ctxMini.lineWidth = 3;
        GexfJS.ctxMini.fillStyle = "rgba(120,120,120,0.2)";
        GexfJS.ctxMini.beginPath();
        GexfJS.ctxMini.fillRect(_x, _y, _w, _h);
        GexfJS.ctxMini.strokeRect(_x, _y, _w, _h);
    }

    function hoverAC() {
        $("#autocomplete li").removeClass("hover");
        $("#liac_" + GexfJS.autoCompletePosition).addClass("hover");
        GexfJS.params.activeNode = GexfJS.graph.indexOfLabels.indexOf(normalizeText.normalizeText($("#liac_" + GexfJS.autoCompletePosition).text()));
    }

    function hoverTransAC() {
        $("#autocomplete li").removeClass("hover");
        $("#liac_" + GexfJS.autoCompletePosition).addClass("hover");
        GexfJS.params.activeNode = GexfJS.graph.indexOfTranslations.indexOf(normalizeText.normalizeText($("#liac_" + GexfJS.autoCompletePosition).text()));
    }

    function changePosAC(_n) {
        GexfJS.autoCompletePosition = _n;
        hoverAC();
    }

    function changePosTransAC(_n) {
        GexfJS.autoCompletePosition = _n;
        hoverTransAC();
    }

    function updateAutoComplete(_sender) {
        var _val = normalizeText.normalizeText($(_sender).val());
        var _ac = $("#autocomplete");
        var _acContent = $('<ul>');
        var _acTranslationContent = $('<ul>');
        if (_val != GexfJS.lastAC || _ac.html() == "") {
            GexfJS.lastAC = _val;
            var _n = 0;
	    var ac_content_array = []
	    GexfJS.graph.indexOfLabels.forEach(function (_l, i) {
		var pos = _l.indexOf(_val);
		if (pos != -1) {
		    ac_content_array.push([i, _l.length, pos])
		}
	    })
	    ac_content_array.sort(function(a, b) {
		if (a[1] < b[1]) {
		    return -1; // shortest first
		} else if (a[1] > b[1]) {
		    return 1;
		} else if (a[2] < b[2]) {
		    return -1; // leftmost first
		} else if (a[2] > b[2]) {
		    return 1;
		} else { return 0;}
	    })
	    ac_content_array.slice(0, 20).forEach(function (ac_data) {
		var closure_n = _n;
		$('<li>')
		    .attr("id", "liac_" + _n)
		    .append($('<a>')
			    .mouseover(function () {
				changePosAC(closure_n);
			    })
			    .click(function () {
				displayNode(ac_data[0], true);
				return false;
			    })
			    .text(GexfJS.graph.nodeList[ac_data[0]].l)
			   )
		    .appendTo(_acContent);
		_n++;
	    });
	    if (typeof(GexfJS.graph.indexOfTranslations) != 'undefined') {
		GexfJS.graph.indexOfTranslations.forEach(function (_l, i) {
                    if (_n < 20 && _l.search(_val) != -1) {
			var closure_n = _n;
			$('<li>')
                            .attr("id", "liac_" + _n)
                            .append($('<a>')
				    .mouseover(function () {
					changePosTransAC(closure_n);
				    })
				    .click(function () {
					displayNode(i, true);
					return false;
				    })
				    .text(GexfJS.graph.nodeList[i].l)
				   )
                            .appendTo(_acTranslationContent);
			_n++;
                    }
		});
	    }
            GexfJS.autoCompletePosition = 0;
            _ac.html(
                $('<div>').append(
                    $('<h4>').text(strLang("nodes"))
                ).append(_acContent)
            );
	    if (typeof(GexfJS.graph.indexOfTranslations) != 'undefined') {
		_ac.append($('<div>').append(
                    $('<h4>').text("Translations")
		).append(_acTranslationContent));
	    }
        }
        hoverAC();
        if (typeof(GexfJS.graph.indexOfTranslations) != 'undefined') { hoverTransAC(); }
        _ac.show();
    }

//     function updateButtonStates() {
//         $("#lensButton").attr("class", GexfJS.showLabels ? "" : "off")
// 	    .attr("title", strLang(GexfJS.showLabels ? "lensOff" : "lensOn"));
// //	$("#lensButton").attr("class", GexfJS.params.useLens ? "" : "off")
// //            .attr("title", strLang(GexfJS.params.showEdges ? "lensOff" : "lensOn"));

//         $("#edgesButton").attr("class", GexfJS.params.showEdges ? "" : "off")
//             .attr("title", strLang(GexfJS.params.showEdges ? "edgeOff" : "edgeOn"));
//     }

    GexfJS.setParams = function setParams(paramlist) {
        for (var i in paramlist) {
            GexfJS.params[i] = paramlist[i];
        }
    }

    $(document).ready(function () {

        var lang = (
            typeof GexfJS.params.language != "undefined" && GexfJS.params.language
                ? GexfJS.params.language
                : (
                    navigator.language
                        ? navigator.language.substr(0, 2).toLowerCase()
                        : (
                            navigator.userLanguage
                                ? navigator.userLanguage.substr(0, 2).toLowerCase()
                                : "en"
                        )
                )
        );
        GexfJS.lang = (GexfJS.i18n[lang] ? lang : "en");

        // updateButtonStates();

        GexfJS.ctxGraphe = document.getElementById('carte').getContext('2d');
        GexfJS.ctxMini = document.getElementById('overview').getContext('2d');
        updateWorkspaceBounds();

        initializeMap();

        window.onhashchange = initializeMap;

	$("#filterinput").keyup(function (evt) {
	    GexfJS.textFilter = normalizeText.normalizeText($(this).val());
	    onStartMoving(); onEndMoving();
	});
        $("#searchinput")
            .focus(function () {
                if ($(this).is('.grey')) {
                    $(this).val('').removeClass('grey');
                }
            })
            .keyup(function (evt) {
                updateAutoComplete(this);
            }).keydown(function (evt) {
                var _l = $("#autocomplete li").length;
                switch (evt.keyCode) {
                case 40:
                    if (GexfJS.autoCompletePosition < _l - 1) {
                        GexfJS.autoCompletePosition++;
                    } else {
                        GexfJS.autoCompletePosition = 0;
                    }
                    break;
                case 38:
                    if (GexfJS.autoCompletePosition > 0) {
                        GexfJS.autoCompletePosition--;
                    } else {
                        GexfJS.autoCompletePosition = _l - 1;
                    }
                    break;
                case 27:
                    $("#autocomplete").slideUp();
                    break;
                case 13:
                    if ($("#autocomplete").is(":visible")) {
                        var _liac = $("#liac_" + GexfJS.autoCompletePosition);
                        if (_liac.length) {
                            $(this).val(_liac.text());
                        }
                    }
                    break;
                default:
                    GexfJS.autoCompletePosition = 0;
                    break;
                }
                updateAutoComplete(this);
                if (evt.keyCode == 38 || evt.keyCode == 40) {
                    return false;
                }
            });
        $("#recherche").submit(function () {
            if (GexfJS.graph) {
                displayNode(GexfJS.graph.indexOfLabels.indexOf(normalizeText.normalizeText($("#searchinput").val())), true);
            }
            return false;
        });
        $("#carte")
            .mousemove(onGraphMove)
            .bind('touchmove', onGraphDrag)
            .click(onGraphClick)
            .bind('touchend', onGraphClick)
            .mousedown(startMove)
            .bind('touchstart', onTouchStart)
            .mouseout(function () {
                GexfJS.mousePosition = null;
                endMove();
            })
            .bind('touchend', function () {
                GexfJS.mousePosition = null;
                onTouchEnd();
            })
            .mousewheel(onGraphScroll);
        $("#overview")
            .mousemove(onOverviewMove)
            .bind('touchmove', onOverviewDrag)
            .mousedown(startMove)
            .bind('touchstart', onTouchStart)
            .mouseup(endMove)
            .bind('touchend', onTouchEnd)
            .mouseout(endMove)
            .mousewheel(onGraphScroll);
        $("#zoomMinusButton").click(function () {
            GexfJS.params.zoomLevel = Math.max(GexfJS.minZoom, GexfJS.params.zoomLevel - 1);
            $("#zoomSlider").slider("value", GexfJS.params.zoomLevel);
            return false;
        })
            .attr("title", strLang("zoomOut"));
        $("#zoomPlusButton").click(function () {
            GexfJS.params.zoomLevel = Math.min(GexfJS.maxZoom, GexfJS.params.zoomLevel + 1);
            $("#zoomSlider").slider("value", GexfJS.params.zoomLevel);
            return false;
        })
            .attr("title", strLang("zoomIn"));
	
	$("#filterMinusButton").click(function () {
            GexfJS.proportionOfNodesToDraw = Math.max(0, GexfJS.proportionOfNodesToDraw - 0.01);
            $("#filterSlider").slider("value", GexfJS.proportionOfNodesToDraw);
	    onStartMoving(); onEndMoving();
	    $(this).attr("alt", "Showing up to " + parseInt((maxNodesToDraw()/GexfJS.graph.nodeList.length)*100) + "% (" + parseInt(maxNodesToDraw()) + ") of nodes" );
            return false;
        }).mouseover(function () {
	    $(this).attr("alt", "Showing up to " + parseInt((maxNodesToDraw()/GexfJS.graph.nodeList.length)*100) + "% (" + parseInt(maxNodesToDraw()) + ") of nodes" );
	})
	$("#filterPlusButton").click(function () {
            GexfJS.proportionOfNodesToDraw = Math.min(1.0, GexfJS.proportionOfNodesToDraw + 0.01);
            $("#filterSlider").slider("value", GexfJS.proportionOfNodesToDraw); 
	    onStartMoving(); onEndMoving();
	    $(this).attr("alt", "Showing up to " + parseInt((maxNodesToDraw()/GexfJS.graph.nodeList.length)*100) + "% (" + parseInt(maxNodesToDraw()) + ") of nodes" );
            return false;
        }).mouseover(function () {
	    $(this).attr("alt", "Showing up to " + parseInt((maxNodesToDraw()/GexfJS.graph.nodeList.length)*100) + "% (" + parseInt(maxNodesToDraw()) + ") of nodes" );
	})

        $(document).click(function (evt) {
            $("#autocomplete").slideUp();
        });
        $("#autocomplete").css({
            top: ($("#searchinput").offset().top + $("#searchinput").outerHeight()) + "px",
            left: $("#searchinput").offset().left + "px"
        });
        if (GexfJS.params.useLens === null) {
            $("#lensButton").hide();
        }
        if (GexfJS.params.showEdges === null) {
            $("#edgesButton").hide();
        }
        $("#label_checkbox").click(function () {
            GexfJS.showLabels = !GexfJS.showLabels;
	    $(this).prop("checked", GexfJS.showLabels);
	    onStartMoving(); onEndMoving();
        });
        $("#edge_checkbox").click(function () {
            GexfJS.params.showEdges = !GexfJS.params.showEdges;
	    $(this).prop("checked", GexfJS.params.showEdges);
	    onStartMoving(); onEndMoving();
        });
        $("#aUnfold").click(function () {
            var _cG = $("#leftcolumn");
            if (_cG.offset().left < 0) {
                _cG.animate({
                    "left": "0px"
                }, function () {
                    $("#aUnfold").attr("class", "leftarrow tooltip").attr("alt", "Hide side panel");
                    $("#zonecentre").css({
                        left: _cG.width() + "px"
                    });
                });
            } else {
                _cG.animate({
                    "left": "-" + _cG.width() + "px"
                }, function () {
                    $("#aUnfold").attr("class", "rightarrow tooltip").attr("alt", "Expand side panel");
                    $("#zonecentre").css({
                        left: "0"
                    });
                });
            }
            return false;
        });
    });

    GexfJS.benchmark = function (iteration_count) {
        iteration_count = iteration_count || 10;
        measureTime(iteration_count + " iterations of traceMap()");
        for (var i = 0; i < iteration_count; i++) {
            GexfJS.params.benchmark_iteration = i;
            traceMap();
        }
        measureTime(iteration_count + " iterations of traceMap()");
    }

    console.log("Type 'GexfJS.benchmark()' to test how quickly the graph is drawn!");

    window.GexfJS = GexfJS;

    window.setParams = function (params) {
        console.warn('DEPRECATION WARNING: Please use "GexfJS.setParams" instead of "setParams" in config.js');
        GexfJS.setParams(params);
    }





})();
