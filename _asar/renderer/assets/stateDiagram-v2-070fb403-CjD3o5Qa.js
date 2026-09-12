import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { B as utils, C as init_mermaid_59c9be08, Dt as require_dist, E as log$1, J as init_src, Ot as require_dayjs_min, St as select_default, _ as getConfig, l as configureSvgSize, s as common$1 } from "./mermaid-59c9be08-DUdjYWP7.js";
import { t as init_purify_es } from "./purify.es-CUVKlOTh.js";
import { n as Graph, t as init_graphlib } from "./graphlib-B3HAtIYg.js";
import { t as init_dagre } from "./dagre-BMNYqNJA.js";
import { n as render, r as init_json, t as init_index_bf99f535 } from "./index-bf99f535-DIfOF9D-.js";
import { a as db, c as styles, i as STMT_STATE, o as init_styles_0c0f8aee, r as STMT_RELATION, s as parser$1, t as DEFAULT_STATE_TYPE } from "./styles-0c0f8aee-B1UBU209.js";
//#region ../../node_modules/mermaid/dist/stateDiagram-v2-070fb403.js
function getClassesFromDbInfo(dbInfoItem) {
	if (dbInfoItem === void 0 || dbInfoItem === null) return "";
	else if (dbInfoItem.classes) return dbInfoItem.classes.join(" ");
	else return "";
}
function stateDomId(itemId = "", counter = 0, type = "", typeSpacer = DOMID_TYPE_SPACER) {
	return `${DOMID_STATE}-${itemId}${type !== null && type.length > 0 ? `${typeSpacer}${type}` : ""}-${counter}`;
}
var SHAPE_STATE, SHAPE_STATE_WITH_DESC, SHAPE_START, SHAPE_END, SHAPE_DIVIDER, SHAPE_GROUP, SHAPE_NOTE, SHAPE_NOTEGROUP, CSS_DIAGRAM, CSS_DIAGRAM_STATE, CSS_EDGE, CSS_NOTE, CSS_EDGE_NOTE_EDGE, CSS_DIAGRAM_NOTE, CSS_DIAGRAM_CLUSTER, CSS_DIAGRAM_CLUSTER_ALT, PARENT, NOTE, DOMID_STATE, DOMID_TYPE_SPACER, NOTE_ID, PARENT_ID, G_EDGE_STYLE, G_EDGE_ARROWHEADSTYLE, G_EDGE_LABELPOS, G_EDGE_LABELTYPE, G_EDGE_THICKNESS, nodeDb, graphItemCount, setConf, getClasses, setupNode, setupDoc, getDir, draw, diagram;
//#endregion
__esmMin((() => {
	init_styles_0c0f8aee();
	init_graphlib();
	init_src();
	init_mermaid_59c9be08();
	init_index_bf99f535();
	require_dayjs_min();
	require_dist();
	init_purify_es();
	init_dagre();
	init_json();
	SHAPE_STATE = "rect";
	SHAPE_STATE_WITH_DESC = "rectWithTitle";
	SHAPE_START = "start";
	SHAPE_END = "end";
	SHAPE_DIVIDER = "divider";
	SHAPE_GROUP = "roundedWithTitle";
	SHAPE_NOTE = "note";
	SHAPE_NOTEGROUP = "noteGroup";
	CSS_DIAGRAM = "statediagram";
	CSS_DIAGRAM_STATE = `${CSS_DIAGRAM}-state`;
	CSS_EDGE = "transition";
	CSS_NOTE = "note";
	CSS_EDGE_NOTE_EDGE = `${CSS_EDGE} note-edge`;
	CSS_DIAGRAM_NOTE = `${CSS_DIAGRAM}-${CSS_NOTE}`;
	CSS_DIAGRAM_CLUSTER = `${CSS_DIAGRAM}-cluster`;
	CSS_DIAGRAM_CLUSTER_ALT = `${CSS_DIAGRAM}-cluster-alt`;
	PARENT = "parent";
	NOTE = "note";
	DOMID_STATE = "state";
	DOMID_TYPE_SPACER = "----";
	NOTE_ID = `${DOMID_TYPE_SPACER}${NOTE}`;
	PARENT_ID = `${DOMID_TYPE_SPACER}${PARENT}`;
	G_EDGE_STYLE = "fill:none";
	G_EDGE_ARROWHEADSTYLE = "fill: #333";
	G_EDGE_LABELPOS = "c";
	G_EDGE_LABELTYPE = "text";
	G_EDGE_THICKNESS = "normal";
	nodeDb = {};
	graphItemCount = 0;
	setConf = function(cnf) {
		const keys = Object.keys(cnf);
		for (const key of keys) cnf[key];
	};
	getClasses = function(text, diagramObj) {
		diagramObj.db.extract(diagramObj.db.getRootDocV2());
		return diagramObj.db.getClasses();
	};
	setupNode = (g, parent, parsedItem, diagramStates, diagramDb, altFlag) => {
		const itemId = parsedItem.id;
		const classStr = getClassesFromDbInfo(diagramStates[itemId]);
		if (itemId !== "root") {
			let shape = SHAPE_STATE;
			if (parsedItem.start === true) shape = SHAPE_START;
			if (parsedItem.start === false) shape = SHAPE_END;
			if (parsedItem.type !== "default") shape = parsedItem.type;
			if (!nodeDb[itemId]) nodeDb[itemId] = {
				id: itemId,
				shape,
				description: common$1.sanitizeText(itemId, getConfig()),
				classes: `${classStr} ${CSS_DIAGRAM_STATE}`
			};
			const newNode = nodeDb[itemId];
			if (parsedItem.description) {
				if (Array.isArray(newNode.description)) {
					newNode.shape = SHAPE_STATE_WITH_DESC;
					newNode.description.push(parsedItem.description);
				} else if (newNode.description.length > 0) {
					newNode.shape = SHAPE_STATE_WITH_DESC;
					if (newNode.description === itemId) newNode.description = [parsedItem.description];
					else newNode.description = [newNode.description, parsedItem.description];
				} else {
					newNode.shape = SHAPE_STATE;
					newNode.description = parsedItem.description;
				}
				newNode.description = common$1.sanitizeTextOrArray(newNode.description, getConfig());
			}
			if (newNode.description.length === 1 && newNode.shape === SHAPE_STATE_WITH_DESC) newNode.shape = SHAPE_STATE;
			if (!newNode.type && parsedItem.doc) {
				log$1.info("Setting cluster for ", itemId, getDir(parsedItem));
				newNode.type = "group";
				newNode.dir = getDir(parsedItem);
				newNode.shape = parsedItem.type === "divider" ? SHAPE_DIVIDER : SHAPE_GROUP;
				newNode.classes = newNode.classes + " " + CSS_DIAGRAM_CLUSTER + " " + (altFlag ? CSS_DIAGRAM_CLUSTER_ALT : "");
			}
			const nodeData = {
				labelStyle: "",
				shape: newNode.shape,
				labelText: newNode.description,
				classes: newNode.classes,
				style: "",
				id: itemId,
				dir: newNode.dir,
				domId: stateDomId(itemId, graphItemCount),
				type: newNode.type,
				padding: 15
			};
			nodeData.centerLabel = true;
			if (parsedItem.note) {
				const noteData = {
					labelStyle: "",
					shape: SHAPE_NOTE,
					labelText: parsedItem.note.text,
					classes: CSS_DIAGRAM_NOTE,
					style: "",
					id: itemId + NOTE_ID + "-" + graphItemCount,
					domId: stateDomId(itemId, graphItemCount, NOTE),
					type: newNode.type,
					padding: 15
				};
				const groupData = {
					labelStyle: "",
					shape: SHAPE_NOTEGROUP,
					labelText: parsedItem.note.text,
					classes: newNode.classes,
					style: "",
					id: itemId + PARENT_ID,
					domId: stateDomId(itemId, graphItemCount, PARENT),
					type: "group",
					padding: 0
				};
				graphItemCount++;
				const parentNodeId = itemId + PARENT_ID;
				g.setNode(parentNodeId, groupData);
				g.setNode(noteData.id, noteData);
				g.setNode(itemId, nodeData);
				g.setParent(itemId, parentNodeId);
				g.setParent(noteData.id, parentNodeId);
				let from = itemId;
				let to = noteData.id;
				if (parsedItem.note.position === "left of") {
					from = noteData.id;
					to = itemId;
				}
				g.setEdge(from, to, {
					arrowhead: "none",
					arrowType: "",
					style: G_EDGE_STYLE,
					labelStyle: "",
					classes: CSS_EDGE_NOTE_EDGE,
					arrowheadStyle: G_EDGE_ARROWHEADSTYLE,
					labelpos: G_EDGE_LABELPOS,
					labelType: G_EDGE_LABELTYPE,
					thickness: G_EDGE_THICKNESS
				});
			} else g.setNode(itemId, nodeData);
		}
		if (parent && parent.id !== "root") {
			log$1.trace("Setting node ", itemId, " to be child of its parent ", parent.id);
			g.setParent(itemId, parent.id);
		}
		if (parsedItem.doc) {
			log$1.trace("Adding nodes children ");
			setupDoc(g, parsedItem, parsedItem.doc, diagramStates, diagramDb, !altFlag);
		}
	};
	setupDoc = (g, parentParsedItem, doc, diagramStates, diagramDb, altFlag) => {
		log$1.trace("items", doc);
		doc.forEach((item) => {
			switch (item.stmt) {
				case STMT_STATE:
					setupNode(g, parentParsedItem, item, diagramStates, diagramDb, altFlag);
					break;
				case DEFAULT_STATE_TYPE:
					setupNode(g, parentParsedItem, item, diagramStates, diagramDb, altFlag);
					break;
				case STMT_RELATION:
					{
						setupNode(g, parentParsedItem, item.state1, diagramStates, diagramDb, altFlag);
						setupNode(g, parentParsedItem, item.state2, diagramStates, diagramDb, altFlag);
						const edgeData = {
							id: "edge" + graphItemCount,
							arrowhead: "normal",
							arrowTypeEnd: "arrow_barb",
							style: G_EDGE_STYLE,
							labelStyle: "",
							label: common$1.sanitizeText(item.description, getConfig()),
							arrowheadStyle: G_EDGE_ARROWHEADSTYLE,
							labelpos: G_EDGE_LABELPOS,
							labelType: G_EDGE_LABELTYPE,
							thickness: G_EDGE_THICKNESS,
							classes: CSS_EDGE
						};
						g.setEdge(item.state1.id, item.state2.id, edgeData, graphItemCount);
						graphItemCount++;
					}
					break;
			}
		});
	};
	getDir = (parsedItem, defaultDir = "TB") => {
		let dir = defaultDir;
		if (parsedItem.doc) for (let i = 0; i < parsedItem.doc.length; i++) {
			const parsedItemDoc = parsedItem.doc[i];
			if (parsedItemDoc.stmt === "dir") dir = parsedItemDoc.value;
		}
		return dir;
	};
	draw = async function(text, id, _version, diag) {
		log$1.info("Drawing state diagram (v2)", id);
		nodeDb = {};
		diag.db.getDirection();
		const { securityLevel, state: conf } = getConfig();
		const nodeSpacing = conf.nodeSpacing || 50;
		const rankSpacing = conf.rankSpacing || 50;
		log$1.info(diag.db.getRootDocV2());
		diag.db.extract(diag.db.getRootDocV2());
		log$1.info(diag.db.getRootDocV2());
		const diagramStates = diag.db.getStates();
		const g = new Graph({
			multigraph: true,
			compound: true
		}).setGraph({
			rankdir: getDir(diag.db.getRootDocV2()),
			nodesep: nodeSpacing,
			ranksep: rankSpacing,
			marginx: 8,
			marginy: 8
		}).setDefaultEdgeLabel(function() {
			return {};
		});
		setupNode(g, void 0, diag.db.getRootDocV2(), diagramStates, diag.db, true);
		let sandboxElement;
		if (securityLevel === "sandbox") sandboxElement = select_default("#i" + id);
		const root = securityLevel === "sandbox" ? select_default(sandboxElement.nodes()[0].contentDocument.body) : select_default("body");
		const svg = root.select(`[id="${id}"]`);
		await render(root.select("#" + id + " g"), g, ["barb"], CSS_DIAGRAM, id);
		const padding = 8;
		utils.insertTitle(svg, "statediagramTitleText", conf.titleTopMargin, diag.db.getDiagramTitle());
		const bounds = svg.node().getBBox();
		const width = bounds.width + padding * 2;
		const height = bounds.height + padding * 2;
		svg.attr("class", CSS_DIAGRAM);
		const svgBounds = svg.node().getBBox();
		configureSvgSize(svg, height, width, conf.useMaxWidth);
		const vBox = `${svgBounds.x - padding} ${svgBounds.y - padding} ${width} ${height}`;
		log$1.debug(`viewBox ${vBox}`);
		svg.attr("viewBox", vBox);
		const labels = document.querySelectorAll("[id=\"" + id + "\"] .edgeLabel .label");
		for (const label of labels) {
			const dim = label.getBBox();
			const rect = document.createElementNS("http://www.w3.org/2000/svg", SHAPE_STATE);
			rect.setAttribute("rx", 0);
			rect.setAttribute("ry", 0);
			rect.setAttribute("width", dim.width);
			rect.setAttribute("height", dim.height);
			label.insertBefore(rect, label.firstChild);
		}
	};
	diagram = {
		parser: parser$1,
		db,
		renderer: {
			setConf,
			getClasses,
			draw
		},
		styles,
		init: (cnf) => {
			if (!cnf.state) cnf.state = {};
			cnf.state.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
			db.clear();
		}
	};
}))();
export { diagram };
