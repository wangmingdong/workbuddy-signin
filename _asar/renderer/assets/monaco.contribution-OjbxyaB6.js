const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./tsMode-D-Po3Lmv.js","./chunk-BRZcfu7K.js","./editor.api2-Bx-U9mA4.js","./dist-DNjXzICC.js","./dist-CSHw4oQX.js","./editor-B6UfNlAV.css","./workers-HxoQY2uq.js"])))=>i.map(i=>d[i]);
import { n as __esmMin, r as __exportAll } from "./chunk-BRZcfu7K.js";
import { n as init_preload_helper, t as __vitePreload } from "./preload-helper-E3UYCQGP.js";
import { $ as init_inlayHintsContribution, A as init_wordOperations, At as init_bracketMatching, B as init_documentSemanticTokens, C as init_inspectTokens, Ct as init_codeActionContributions, D as init_contribution$1, Dt as init_inlineProgress, E as init_floatingMenu_contribution, Et as init_clipboard, F as init_tokenization, G as init_multicursor, H as init_rename, I as init_suggestInlineCompletions, J as init_links, K as init_middleScroll_contribution, L as init_stickyScrollContribution, M as init_unusualLineTerminators, Mt as init_diffEditor_contribution, N as init_unicodeHighlighter, Nt as init_codeEditorWidget, O as init_contribution, Ot as init_transpose, P as init_toggleTabFocusMode, Pt as init_coreCommands, Q as init_inPlaceReplace, R as init_smartSelect, S as init_standaloneHelpQuickAccess, St as init_codelensController, T as init_standaloneStrings, Tt as init_codicon, U as init_placeholderText_contribution, V as init_sectionHeaders, W as init_parameterHints, X as init_lineSelection, Y as init_linkedEditing, Z as init_insertFinalNewLine, _ as init_toggleHighContrast, _t as init_contextmenu, at as init_suggestController, b as init_standaloneGotoSymbolQuickAccess, bt as init_gotoError, ct as init_documentSymbols, dt as init_folding, et as init_indentation, ft as init_findController, g as languages, gt as init_cursorUndo, h as init_editor_api2, ht as init_dnd, it as init_inlineCompletions_contribution, j as init_wordHighlighter, jt as init_anchorSelect, k as init_wordPartOperations, kt as init_caretOperations, lt as init_formatActions, mt as init_copyPasteContribution, n as Emitter, nt as init_gpuActions, ot as init_snippetController2, pt as init_dropIntoEditorContribution, q as init_longLinesHelper, rt as init_goToDefinitionAtPosition, st as init_linesOperations, tt as init_hoverContribution, ut as init_fontZoom, v as init_standaloneReferenceSearch, vt as init_comment, w as init_iPadShowKeyboard, wt as init_codicon_modifiers, x as init_standaloneGotoLineQuickAccess, xt as init_goToCommands, y as init_standaloneCommandsQuickAccess, yt as init_colorPickerContribution, z as init_viewportSemanticTokens } from "./editor.api2-Bx-U9mA4.js";
//#region ../../node_modules/monaco-editor/esm/vs/language/typescript/lib/typescriptServicesMetadata.js
var typescriptVersion$1;
var init_typescriptServicesMetadata = __esmMin((() => {
	typescriptVersion$1 = "5.9.3";
}));
//#endregion
//#region ../../node_modules/monaco-editor/esm/vs/language/typescript/monaco.contribution.js
var monaco_contribution_exports = /* @__PURE__ */ __exportAll({
	JsxEmit: () => JsxEmit,
	ModuleKind: () => ModuleKind,
	ModuleResolutionKind: () => ModuleResolutionKind,
	NewLineKind: () => NewLineKind,
	ScriptTarget: () => ScriptTarget,
	getJavaScriptWorker: () => getJavaScriptWorker,
	getTypeScriptWorker: () => getTypeScriptWorker,
	javascriptDefaults: () => javascriptDefaults,
	typescriptDefaults: () => typescriptDefaults,
	typescriptVersion: () => typescriptVersion
});
function getMode() {
	return __vitePreload(() => import("./tsMode-D-Po3Lmv.js"), __vite__mapDeps([0,1,2,3,4,5,6]), import.meta.url);
}
var ModuleKind, JsxEmit, NewLineKind, ScriptTarget, ModuleResolutionKind, LanguageServiceDefaultsImpl, typescriptVersion, modeConfigurationDefault, typescriptDefaults, javascriptDefaults, getTypeScriptWorker, getJavaScriptWorker;
var init_monaco_contribution = __esmMin((() => {
	init_typescriptServicesMetadata();
	init_coreCommands();
	init_codeEditorWidget();
	init_diffEditor_contribution();
	init_anchorSelect();
	init_bracketMatching();
	init_caretOperations();
	init_transpose();
	init_clipboard();
	init_codeActionContributions();
	init_codelensController();
	init_colorPickerContribution();
	init_comment();
	init_contextmenu();
	init_cursorUndo();
	init_dnd();
	init_copyPasteContribution();
	init_dropIntoEditorContribution();
	init_findController();
	init_folding();
	init_fontZoom();
	init_formatActions();
	init_documentSymbols();
	init_inlineCompletions_contribution();
	init_inlineProgress();
	init_goToCommands();
	init_goToDefinitionAtPosition();
	init_gotoError();
	init_gpuActions();
	init_hoverContribution();
	init_indentation();
	init_inlayHintsContribution();
	init_inPlaceReplace();
	init_insertFinalNewLine();
	init_lineSelection();
	init_linesOperations();
	init_linkedEditing();
	init_links();
	init_longLinesHelper();
	init_middleScroll_contribution();
	init_multicursor();
	init_parameterHints();
	init_placeholderText_contribution();
	init_rename();
	init_sectionHeaders();
	init_documentSemanticTokens();
	init_viewportSemanticTokens();
	init_smartSelect();
	init_snippetController2();
	init_stickyScrollContribution();
	init_suggestController();
	init_suggestInlineCompletions();
	init_tokenization();
	init_toggleTabFocusMode();
	init_unicodeHighlighter();
	init_unusualLineTerminators();
	init_wordHighlighter();
	init_wordOperations();
	init_wordPartOperations();
	init_contribution();
	init_contribution$1();
	init_floatingMenu_contribution();
	init_standaloneStrings();
	init_codicon();
	init_codicon_modifiers();
	init_iPadShowKeyboard();
	init_inspectTokens();
	init_standaloneHelpQuickAccess();
	init_standaloneGotoLineQuickAccess();
	init_standaloneGotoSymbolQuickAccess();
	init_standaloneCommandsQuickAccess();
	init_standaloneReferenceSearch();
	init_toggleHighContrast();
	init_editor_api2();
	init_preload_helper();
	ModuleKind = /* @__PURE__ */ ((ModuleKind2) => {
		ModuleKind2[ModuleKind2["None"] = 0] = "None";
		ModuleKind2[ModuleKind2["CommonJS"] = 1] = "CommonJS";
		ModuleKind2[ModuleKind2["AMD"] = 2] = "AMD";
		ModuleKind2[ModuleKind2["UMD"] = 3] = "UMD";
		ModuleKind2[ModuleKind2["System"] = 4] = "System";
		ModuleKind2[ModuleKind2["ES2015"] = 5] = "ES2015";
		ModuleKind2[ModuleKind2["ESNext"] = 99] = "ESNext";
		return ModuleKind2;
	})(ModuleKind || {});
	JsxEmit = /* @__PURE__ */ ((JsxEmit2) => {
		JsxEmit2[JsxEmit2["None"] = 0] = "None";
		JsxEmit2[JsxEmit2["Preserve"] = 1] = "Preserve";
		JsxEmit2[JsxEmit2["React"] = 2] = "React";
		JsxEmit2[JsxEmit2["ReactNative"] = 3] = "ReactNative";
		JsxEmit2[JsxEmit2["ReactJSX"] = 4] = "ReactJSX";
		JsxEmit2[JsxEmit2["ReactJSXDev"] = 5] = "ReactJSXDev";
		return JsxEmit2;
	})(JsxEmit || {});
	NewLineKind = /* @__PURE__ */ ((NewLineKind2) => {
		NewLineKind2[NewLineKind2["CarriageReturnLineFeed"] = 0] = "CarriageReturnLineFeed";
		NewLineKind2[NewLineKind2["LineFeed"] = 1] = "LineFeed";
		return NewLineKind2;
	})(NewLineKind || {});
	ScriptTarget = /* @__PURE__ */ ((ScriptTarget2) => {
		ScriptTarget2[ScriptTarget2["ES3"] = 0] = "ES3";
		ScriptTarget2[ScriptTarget2["ES5"] = 1] = "ES5";
		ScriptTarget2[ScriptTarget2["ES2015"] = 2] = "ES2015";
		ScriptTarget2[ScriptTarget2["ES2016"] = 3] = "ES2016";
		ScriptTarget2[ScriptTarget2["ES2017"] = 4] = "ES2017";
		ScriptTarget2[ScriptTarget2["ES2018"] = 5] = "ES2018";
		ScriptTarget2[ScriptTarget2["ES2019"] = 6] = "ES2019";
		ScriptTarget2[ScriptTarget2["ES2020"] = 7] = "ES2020";
		ScriptTarget2[ScriptTarget2["ESNext"] = 99] = "ESNext";
		ScriptTarget2[ScriptTarget2["JSON"] = 100] = "JSON";
		ScriptTarget2[ScriptTarget2["Latest"] = 99] = "Latest";
		return ScriptTarget2;
	})(ScriptTarget || {});
	ModuleResolutionKind = /* @__PURE__ */ ((ModuleResolutionKind2) => {
		ModuleResolutionKind2[ModuleResolutionKind2["Classic"] = 1] = "Classic";
		ModuleResolutionKind2[ModuleResolutionKind2["NodeJs"] = 2] = "NodeJs";
		return ModuleResolutionKind2;
	})(ModuleResolutionKind || {});
	LanguageServiceDefaultsImpl = class {
		constructor(compilerOptions, diagnosticsOptions, workerOptions, inlayHintsOptions, modeConfiguration) {
			this._onDidChange = new Emitter();
			this._onDidExtraLibsChange = new Emitter();
			this._extraLibs = /* @__PURE__ */ Object.create(null);
			this._removedExtraLibs = /* @__PURE__ */ Object.create(null);
			this._eagerModelSync = false;
			this.setCompilerOptions(compilerOptions);
			this.setDiagnosticsOptions(diagnosticsOptions);
			this.setWorkerOptions(workerOptions);
			this.setInlayHintsOptions(inlayHintsOptions);
			this.setModeConfiguration(modeConfiguration);
			this._onDidExtraLibsChangeTimeout = -1;
		}
		get onDidChange() {
			return this._onDidChange.event;
		}
		get onDidExtraLibsChange() {
			return this._onDidExtraLibsChange.event;
		}
		get modeConfiguration() {
			return this._modeConfiguration;
		}
		get workerOptions() {
			return this._workerOptions;
		}
		get inlayHintsOptions() {
			return this._inlayHintsOptions;
		}
		getExtraLibs() {
			return this._extraLibs;
		}
		addExtraLib(content, _filePath) {
			let filePath;
			if (typeof _filePath === "undefined") filePath = `ts:extralib-${Math.random().toString(36).substring(2, 15)}`;
			else filePath = _filePath;
			if (this._extraLibs[filePath] && this._extraLibs[filePath].content === content) return { dispose: () => {} };
			let myVersion = 1;
			if (this._removedExtraLibs[filePath]) myVersion = this._removedExtraLibs[filePath] + 1;
			if (this._extraLibs[filePath]) myVersion = this._extraLibs[filePath].version + 1;
			this._extraLibs[filePath] = {
				content,
				version: myVersion
			};
			this._fireOnDidExtraLibsChangeSoon();
			return { dispose: () => {
				let extraLib = this._extraLibs[filePath];
				if (!extraLib) return;
				if (extraLib.version !== myVersion) return;
				delete this._extraLibs[filePath];
				this._removedExtraLibs[filePath] = myVersion;
				this._fireOnDidExtraLibsChangeSoon();
			} };
		}
		setExtraLibs(libs) {
			for (const filePath in this._extraLibs) this._removedExtraLibs[filePath] = this._extraLibs[filePath].version;
			this._extraLibs = /* @__PURE__ */ Object.create(null);
			if (libs && libs.length > 0) for (const lib of libs) {
				const filePath = lib.filePath || `ts:extralib-${Math.random().toString(36).substring(2, 15)}`;
				const content = lib.content;
				let myVersion = 1;
				if (this._removedExtraLibs[filePath]) myVersion = this._removedExtraLibs[filePath] + 1;
				this._extraLibs[filePath] = {
					content,
					version: myVersion
				};
			}
			this._fireOnDidExtraLibsChangeSoon();
		}
		_fireOnDidExtraLibsChangeSoon() {
			if (this._onDidExtraLibsChangeTimeout !== -1) return;
			this._onDidExtraLibsChangeTimeout = window.setTimeout(() => {
				this._onDidExtraLibsChangeTimeout = -1;
				this._onDidExtraLibsChange.fire(void 0);
			}, 0);
		}
		getCompilerOptions() {
			return this._compilerOptions;
		}
		setCompilerOptions(options) {
			this._compilerOptions = options || /* @__PURE__ */ Object.create(null);
			this._onDidChange.fire(void 0);
		}
		getDiagnosticsOptions() {
			return this._diagnosticsOptions;
		}
		setDiagnosticsOptions(options) {
			this._diagnosticsOptions = options || /* @__PURE__ */ Object.create(null);
			this._onDidChange.fire(void 0);
		}
		setWorkerOptions(options) {
			this._workerOptions = options || /* @__PURE__ */ Object.create(null);
			this._onDidChange.fire(void 0);
		}
		setInlayHintsOptions(options) {
			this._inlayHintsOptions = options || /* @__PURE__ */ Object.create(null);
			this._onDidChange.fire(void 0);
		}
		setMaximumWorkerIdleTime(value) {}
		setEagerModelSync(value) {
			this._eagerModelSync = value;
		}
		getEagerModelSync() {
			return this._eagerModelSync;
		}
		setModeConfiguration(modeConfiguration) {
			this._modeConfiguration = modeConfiguration || /* @__PURE__ */ Object.create(null);
			this._onDidChange.fire(void 0);
		}
	};
	typescriptVersion = typescriptVersion$1;
	modeConfigurationDefault = {
		completionItems: true,
		hovers: true,
		documentSymbols: true,
		definitions: true,
		references: true,
		documentHighlights: true,
		rename: true,
		diagnostics: true,
		documentRangeFormattingEdits: true,
		signatureHelp: true,
		onTypeFormattingEdits: true,
		codeActions: true,
		inlayHints: true
	};
	typescriptDefaults = new LanguageServiceDefaultsImpl({
		allowNonTsExtensions: true,
		target: 99
	}, {
		noSemanticValidation: false,
		noSyntaxValidation: false,
		onlyVisible: false
	}, {}, {}, modeConfigurationDefault);
	javascriptDefaults = new LanguageServiceDefaultsImpl({
		allowNonTsExtensions: true,
		allowJs: true,
		target: 99
	}, {
		noSemanticValidation: true,
		noSyntaxValidation: false,
		onlyVisible: false
	}, {}, {}, modeConfigurationDefault);
	getTypeScriptWorker = () => {
		return getMode().then((mode) => mode.getTypeScriptWorker());
	};
	getJavaScriptWorker = () => {
		return getMode().then((mode) => mode.getJavaScriptWorker());
	};
	languages.onLanguage("typescript", () => {
		return getMode().then((mode) => mode.setupTypeScript(typescriptDefaults));
	});
	languages.onLanguage("javascript", () => {
		return getMode().then((mode) => mode.setupJavaScript(javascriptDefaults));
	});
}));
//#endregion
export { monaco_contribution_exports as n, typescriptDefaults as r, init_monaco_contribution as t };
