import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { B as utils, C as init_mermaid_59c9be08, Dt as require_dist, E as log$1, J as init_src, Ot as require_dayjs_min, Q as linear_default, St as select_default, _ as getConfig, b as getStylesFromArray, s as common$1, w as interpolateToCurve, z as setupGraphViewbox$1 } from "./mermaid-59c9be08-DUdjYWP7.js";
import { t as init_purify_es } from "./purify.es-CUVKlOTh.js";
import { n as Graph, t as init_graphlib } from "./graphlib-B3HAtIYg.js";
import { i as styles, n as init_styles_690bd5e1, r as parser$1, t as db } from "./styles-690bd5e1-Det9bXfm.js";
import { t as init_dagre } from "./dagre-BMNYqNJA.js";
import { n as render, r as init_json, t as init_index_bf99f535 } from "./index-bf99f535-DIfOF9D-.js";
//#region ../../node_modules/mermaid/dist/classDiagram-v2-2f5103db.js
function getArrowMarker(type) {
	let marker;
	switch (type) {
		case 0:
			marker = "aggregation";
			break;
		case 1:
			marker = "extension";
			break;
		case 2:
			marker = "composition";
			break;
		case 3:
			marker = "dependency";
			break;
		case 4:
			marker = "lollipop";
			break;
		default: marker = "none";
	}
	return marker;
}
var sanitizeText, conf, addNamespaces, addClasses, addNotes, addRelations, setConf, draw, diagram;
//#endregion
__esmMin((() => {
	init_styles_690bd5e1();
	init_src();
	init_graphlib();
	init_mermaid_59c9be08();
	init_index_bf99f535();
	require_dayjs_min();
	require_dist();
	init_purify_es();
	init_dagre();
	init_json();
	sanitizeText = (txt) => common$1.sanitizeText(txt, getConfig());
	conf = {
		dividerMargin: 10,
		padding: 5,
		textHeight: 10,
		curve: void 0
	};
	addNamespaces = function(namespaces, g, _id, diagObj) {
		const keys = Object.keys(namespaces);
		log$1.info("keys:", keys);
		log$1.info(namespaces);
		keys.forEach(function(id) {
			var _a, _b;
			const vertex = namespaces[id];
			const node = {
				shape: "rect",
				id: vertex.id,
				domId: vertex.domId,
				labelText: sanitizeText(vertex.id),
				labelStyle: "",
				style: "fill: none; stroke: black",
				padding: ((_a = getConfig().flowchart) == null ? void 0 : _a.padding) ?? ((_b = getConfig().class) == null ? void 0 : _b.padding)
			};
			g.setNode(vertex.id, node);
			addClasses(vertex.classes, g, _id, diagObj, vertex.id);
			log$1.info("setNode", node);
		});
	};
	addClasses = function(classes, g, _id, diagObj, parent) {
		const keys = Object.keys(classes);
		log$1.info("keys:", keys);
		log$1.info(classes);
		keys.filter((id) => classes[id].parent == parent).forEach(function(id) {
			var _a, _b;
			const vertex = classes[id];
			const cssClassStr = vertex.cssClasses.join(" ");
			const styles2 = getStylesFromArray(vertex.styles);
			const vertexText = vertex.label ?? vertex.id;
			const radius = 0;
			const node = {
				labelStyle: styles2.labelStyle,
				shape: "class_box",
				labelText: sanitizeText(vertexText),
				classData: vertex,
				rx: radius,
				ry: radius,
				class: cssClassStr,
				style: styles2.style,
				id: vertex.id,
				domId: vertex.domId,
				tooltip: diagObj.db.getTooltip(vertex.id, parent) || "",
				haveCallback: vertex.haveCallback,
				link: vertex.link,
				width: vertex.type === "group" ? 500 : void 0,
				type: vertex.type,
				padding: ((_a = getConfig().flowchart) == null ? void 0 : _a.padding) ?? ((_b = getConfig().class) == null ? void 0 : _b.padding)
			};
			g.setNode(vertex.id, node);
			if (parent) g.setParent(vertex.id, parent);
			log$1.info("setNode", node);
		});
	};
	addNotes = function(notes, g, startEdgeId, classes) {
		log$1.info(notes);
		notes.forEach(function(note, i) {
			var _a, _b;
			const vertex = note;
			const cssNoteStr = "";
			const styles2 = {
				labelStyle: "",
				style: ""
			};
			const vertexText = vertex.text;
			const radius = 0;
			const node = {
				labelStyle: styles2.labelStyle,
				shape: "note",
				labelText: sanitizeText(vertexText),
				noteData: vertex,
				rx: radius,
				ry: radius,
				class: cssNoteStr,
				style: styles2.style,
				id: vertex.id,
				domId: vertex.id,
				tooltip: "",
				type: "note",
				padding: ((_a = getConfig().flowchart) == null ? void 0 : _a.padding) ?? ((_b = getConfig().class) == null ? void 0 : _b.padding)
			};
			g.setNode(vertex.id, node);
			log$1.info("setNode", node);
			if (!vertex.class || !(vertex.class in classes)) return;
			const edgeId = startEdgeId + i;
			const edgeData = {
				id: `edgeNote${edgeId}`,
				classes: "relation",
				pattern: "dotted",
				arrowhead: "none",
				startLabelRight: "",
				endLabelLeft: "",
				arrowTypeStart: "none",
				arrowTypeEnd: "none",
				style: "fill:none",
				labelStyle: "",
				curve: interpolateToCurve(conf.curve, linear_default)
			};
			g.setEdge(vertex.id, vertex.class, edgeData, edgeId);
		});
	};
	addRelations = function(relations, g) {
		const conf2 = getConfig().flowchart;
		let cnt = 0;
		relations.forEach(function(edge) {
			var _a;
			cnt++;
			const edgeData = {
				classes: "relation",
				pattern: edge.relation.lineType == 1 ? "dashed" : "solid",
				id: `id_${edge.id1}_${edge.id2}_${cnt}`,
				arrowhead: edge.type === "arrow_open" ? "none" : "normal",
				startLabelRight: edge.relationTitle1 === "none" ? "" : edge.relationTitle1,
				endLabelLeft: edge.relationTitle2 === "none" ? "" : edge.relationTitle2,
				arrowTypeStart: getArrowMarker(edge.relation.type1),
				arrowTypeEnd: getArrowMarker(edge.relation.type2),
				style: "fill:none",
				labelStyle: "",
				curve: interpolateToCurve(conf2 == null ? void 0 : conf2.curve, linear_default)
			};
			log$1.info(edgeData, edge);
			if (edge.style !== void 0) {
				const styles2 = getStylesFromArray(edge.style);
				edgeData.style = styles2.style;
				edgeData.labelStyle = styles2.labelStyle;
			}
			edge.text = edge.title;
			if (edge.text === void 0) {
				if (edge.style !== void 0) edgeData.arrowheadStyle = "fill: #333";
			} else {
				edgeData.arrowheadStyle = "fill: #333";
				edgeData.labelpos = "c";
				if (((_a = getConfig().flowchart) == null ? void 0 : _a.htmlLabels) ?? getConfig().htmlLabels) {
					edgeData.labelType = "html";
					edgeData.label = "<span class=\"edgeLabel\">" + edge.text + "</span>";
				} else {
					edgeData.labelType = "text";
					edgeData.label = edge.text.replace(common$1.lineBreakRegex, "\n");
					if (edge.style === void 0) edgeData.style = edgeData.style || "stroke: #333; stroke-width: 1.5px;fill:none";
					edgeData.labelStyle = edgeData.labelStyle.replace("color:", "fill:");
				}
			}
			g.setEdge(edge.id1, edge.id2, edgeData, cnt);
		});
	};
	setConf = function(cnf) {
		conf = {
			...conf,
			...cnf
		};
	};
	draw = async function(text, id, _version, diagObj) {
		log$1.info("Drawing class - ", id);
		const conf2 = getConfig().flowchart ?? getConfig().class;
		const securityLevel = getConfig().securityLevel;
		log$1.info("config:", conf2);
		const nodeSpacing = (conf2 == null ? void 0 : conf2.nodeSpacing) ?? 50;
		const rankSpacing = (conf2 == null ? void 0 : conf2.rankSpacing) ?? 50;
		const g = new Graph({
			multigraph: true,
			compound: true
		}).setGraph({
			rankdir: diagObj.db.getDirection(),
			nodesep: nodeSpacing,
			ranksep: rankSpacing,
			marginx: 8,
			marginy: 8
		}).setDefaultEdgeLabel(function() {
			return {};
		});
		const namespaces = diagObj.db.getNamespaces();
		const classes = diagObj.db.getClasses();
		const relations = diagObj.db.getRelations();
		const notes = diagObj.db.getNotes();
		log$1.info(relations);
		addNamespaces(namespaces, g, id, diagObj);
		addClasses(classes, g, id, diagObj);
		addRelations(relations, g);
		addNotes(notes, g, relations.length + 1, classes);
		let sandboxElement;
		if (securityLevel === "sandbox") sandboxElement = select_default("#i" + id);
		const root = securityLevel === "sandbox" ? select_default(sandboxElement.nodes()[0].contentDocument.body) : select_default("body");
		const svg = root.select(`[id="${id}"]`);
		await render(root.select("#" + id + " g"), g, [
			"aggregation",
			"extension",
			"composition",
			"dependency",
			"lollipop"
		], "classDiagram", id);
		utils.insertTitle(svg, "classTitleText", (conf2 == null ? void 0 : conf2.titleTopMargin) ?? 5, diagObj.db.getDiagramTitle());
		setupGraphViewbox$1(g, svg, conf2 == null ? void 0 : conf2.diagramPadding, conf2 == null ? void 0 : conf2.useMaxWidth);
		if (!(conf2 == null ? void 0 : conf2.htmlLabels)) {
			const doc = securityLevel === "sandbox" ? sandboxElement.nodes()[0].contentDocument : document;
			const labels = doc.querySelectorAll("[id=\"" + id + "\"] .edgeLabel .label");
			for (const label of labels) {
				const dim = label.getBBox();
				const rect = doc.createElementNS("http://www.w3.org/2000/svg", "rect");
				rect.setAttribute("rx", 0);
				rect.setAttribute("ry", 0);
				rect.setAttribute("width", dim.width);
				rect.setAttribute("height", dim.height);
				label.insertBefore(rect, label.firstChild);
			}
		}
	};
	diagram = {
		parser: parser$1,
		db,
		renderer: {
			setConf,
			draw
		},
		styles,
		init: (cnf) => {
			if (!cnf.class) cnf.class = {};
			cnf.class.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
			db.clear();
		}
	};
}))();
export { diagram };
