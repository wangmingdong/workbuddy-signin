import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { C as init_mermaid_59c9be08, Dt as require_dist, I as setConfig, J as init_src, Ot as require_dayjs_min } from "./mermaid-59c9be08-DUdjYWP7.js";
import { t as init_purify_es } from "./purify.es-CUVKlOTh.js";
import { t as init_graphlib } from "./graphlib-B3HAtIYg.js";
import { t as init_dagre } from "./dagre-BMNYqNJA.js";
import { r as init_json } from "./index-bf99f535-DIfOF9D-.js";
import { i as parser$1, n as flowDb, r as init_flowDb_99855667 } from "./flowDb-99855667-Bcu_Meg6.js";
import { n as flowStyles, r as init_styles_38506eb2, t as flowRendererV2 } from "./styles-38506eb2-H_u9_-V9.js";
//#region ../../node_modules/mermaid/dist/flowDiagram-v2-6bf179d4.js
var diagram;
//#endregion
__esmMin((() => {
	init_flowDb_99855667();
	init_styles_38506eb2();
	init_mermaid_59c9be08();
	init_src();
	init_graphlib();
	init_dagre();
	init_json();
	require_dayjs_min();
	require_dist();
	init_purify_es();
	diagram = {
		parser: parser$1,
		db: flowDb,
		renderer: flowRendererV2,
		styles: flowStyles,
		init: (cnf) => {
			if (!cnf.flowchart) cnf.flowchart = {};
			cnf.flowchart.arrowMarkerAbsolute = cnf.arrowMarkerAbsolute;
			setConfig({ flowchart: { arrowMarkerAbsolute: cnf.arrowMarkerAbsolute } });
			flowRendererV2.setConf(cnf.flowchart);
			flowDb.clear();
			flowDb.setGen("gen-2");
		}
	};
}))();
export { diagram };
