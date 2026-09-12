import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { $ as init_inlayHintsContribution, A as init_wordOperations, At as init_bracketMatching, B as init_documentSemanticTokens, C as init_inspectTokens, Ct as init_codeActionContributions, D as init_contribution$1, Dt as init_inlineProgress, E as init_floatingMenu_contribution, Et as init_clipboard, F as init_tokenization, G as init_multicursor, H as init_rename, I as init_suggestInlineCompletions, J as init_links, K as init_middleScroll_contribution, L as init_stickyScrollContribution, M as init_unusualLineTerminators, Mt as init_diffEditor_contribution, N as init_unicodeHighlighter, Nt as init_codeEditorWidget, O as init_contribution, Ot as init_transpose, P as init_toggleTabFocusMode, Pt as init_coreCommands, Q as init_inPlaceReplace, R as init_smartSelect, S as init_standaloneHelpQuickAccess, St as init_codelensController, T as init_standaloneStrings, Tt as init_codicon, U as init_placeholderText_contribution, V as init_sectionHeaders, W as init_parameterHints, X as init_lineSelection, Y as init_linkedEditing, Z as init_insertFinalNewLine, _ as init_toggleHighContrast, _t as init_contextmenu, at as init_suggestController, b as init_standaloneGotoSymbolQuickAccess, bt as init_gotoError, ct as init_documentSymbols, dt as init_folding, et as init_indentation, ft as init_findController, g as languages, gt as init_cursorUndo, h as init_editor_api2, ht as init_dnd, it as init_inlineCompletions_contribution, j as init_wordHighlighter, jt as init_anchorSelect, k as init_wordPartOperations, kt as init_caretOperations, lt as init_formatActions, mt as init_copyPasteContribution, nt as init_gpuActions, ot as init_snippetController2, pt as init_dropIntoEditorContribution, q as init_longLinesHelper, rt as init_goToDefinitionAtPosition, st as init_linesOperations, tt as init_hoverContribution, ut as init_fontZoom, v as init_standaloneReferenceSearch, vt as init_comment, w as init_iPadShowKeyboard, wt as init_codicon_modifiers, x as init_standaloneGotoLineQuickAccess, xt as init_goToCommands, y as init_standaloneCommandsQuickAccess, yt as init_colorPickerContribution, z as init_viewportSemanticTokens } from "./editor.api2-Bx-U9mA4.js";
import { n as init_workers, t as createWebWorker } from "./workers-HxoQY2uq.js";
import { _ as init_lspLanguageFeatures, a as DocumentFormattingEditProvider, c as DocumentRangeFormattingEditProvider, d as HoverAdapter, f as ReferenceAdapter, g as fromRange, h as fromPosition, i as DocumentColorAdapter, l as DocumentSymbolAdapter, m as SelectionRangeAdapter, n as DefinitionAdapter, o as DocumentHighlightAdapter, p as RenameAdapter, r as DiagnosticsAdapter, s as DocumentLinkAdapter, t as CompletionAdapter, u as FoldingRangeAdapter, v as toRange, y as toTextEdit } from "./lspLanguageFeatures-CuusKqYl.js";
//#region ../../node_modules/monaco-editor/esm/vs/language/html/workerManager.js
var STOP_WHEN_IDLE_FOR, WorkerManager;
var init_workerManager = __esmMin((() => {
	init_workers();
	STOP_WHEN_IDLE_FOR = 120 * 1e3;
	WorkerManager = class {
		constructor(defaults) {
			this._defaults = defaults;
			this._worker = null;
			this._client = null;
			this._idleCheckInterval = window.setInterval(() => this._checkIfIdle(), 30 * 1e3);
			this._lastUsedTime = 0;
			this._configChangeListener = this._defaults.onDidChange(() => this._stopWorker());
		}
		_stopWorker() {
			if (this._worker) {
				this._worker.dispose();
				this._worker = null;
			}
			this._client = null;
		}
		dispose() {
			clearInterval(this._idleCheckInterval);
			this._configChangeListener.dispose();
			this._stopWorker();
		}
		_checkIfIdle() {
			if (!this._worker) return;
			if (Date.now() - this._lastUsedTime > STOP_WHEN_IDLE_FOR) this._stopWorker();
		}
		_getClient() {
			this._lastUsedTime = Date.now();
			if (!this._client) {
				this._worker = createWebWorker({
					moduleId: "vs/language/html/htmlWorker",
					createWorker: () => new Worker(new URL(
						/* @vite-ignore */
						"" + new URL("html.worker-_lakZzds.js", import.meta.url).href,
						"" + import.meta.url
					), { type: "module" }),
					createData: {
						languageSettings: this._defaults.options,
						languageId: this._defaults.languageId
					},
					label: this._defaults.languageId
				});
				this._client = this._worker.getProxy();
			}
			return this._client;
		}
		getLanguageServiceWorker(...resources) {
			let _client;
			return this._getClient().then((client) => {
				_client = client;
			}).then((_) => {
				if (this._worker) return this._worker.withSyncedResources(resources);
			}).then((_) => _client);
		}
	};
}));
//#endregion
//#region ../../node_modules/monaco-editor/esm/vs/language/html/htmlMode.js
function setupMode1(defaults) {
	const client = new WorkerManager(defaults);
	const worker = (...uris) => {
		return client.getLanguageServiceWorker(...uris);
	};
	let languageId = defaults.languageId;
	languages.registerCompletionItemProvider(languageId, new HTMLCompletionAdapter(worker));
	languages.registerHoverProvider(languageId, new HoverAdapter(worker));
	languages.registerDocumentHighlightProvider(languageId, new DocumentHighlightAdapter(worker));
	languages.registerLinkProvider(languageId, new DocumentLinkAdapter(worker));
	languages.registerFoldingRangeProvider(languageId, new FoldingRangeAdapter(worker));
	languages.registerDocumentSymbolProvider(languageId, new DocumentSymbolAdapter(worker));
	languages.registerSelectionRangeProvider(languageId, new SelectionRangeAdapter(worker));
	languages.registerRenameProvider(languageId, new RenameAdapter(worker));
	if (languageId === "html") {
		languages.registerDocumentFormattingEditProvider(languageId, new DocumentFormattingEditProvider(worker));
		languages.registerDocumentRangeFormattingEditProvider(languageId, new DocumentRangeFormattingEditProvider(worker));
	}
}
function setupMode(defaults) {
	const disposables = [];
	const providers = [];
	const client = new WorkerManager(defaults);
	disposables.push(client);
	const worker = (...uris) => {
		return client.getLanguageServiceWorker(...uris);
	};
	function registerProviders() {
		const { languageId, modeConfiguration } = defaults;
		disposeAll(providers);
		if (modeConfiguration.completionItems) providers.push(languages.registerCompletionItemProvider(languageId, new HTMLCompletionAdapter(worker)));
		if (modeConfiguration.hovers) providers.push(languages.registerHoverProvider(languageId, new HoverAdapter(worker)));
		if (modeConfiguration.documentHighlights) providers.push(languages.registerDocumentHighlightProvider(languageId, new DocumentHighlightAdapter(worker)));
		if (modeConfiguration.links) providers.push(languages.registerLinkProvider(languageId, new DocumentLinkAdapter(worker)));
		if (modeConfiguration.documentSymbols) providers.push(languages.registerDocumentSymbolProvider(languageId, new DocumentSymbolAdapter(worker)));
		if (modeConfiguration.rename) providers.push(languages.registerRenameProvider(languageId, new RenameAdapter(worker)));
		if (modeConfiguration.foldingRanges) providers.push(languages.registerFoldingRangeProvider(languageId, new FoldingRangeAdapter(worker)));
		if (modeConfiguration.selectionRanges) providers.push(languages.registerSelectionRangeProvider(languageId, new SelectionRangeAdapter(worker)));
		if (modeConfiguration.documentFormattingEdits) providers.push(languages.registerDocumentFormattingEditProvider(languageId, new DocumentFormattingEditProvider(worker)));
		if (modeConfiguration.documentRangeFormattingEdits) providers.push(languages.registerDocumentRangeFormattingEditProvider(languageId, new DocumentRangeFormattingEditProvider(worker)));
	}
	registerProviders();
	disposables.push(asDisposable(providers));
	return asDisposable(disposables);
}
function asDisposable(disposables) {
	return { dispose: () => disposeAll(disposables) };
}
function disposeAll(disposables) {
	while (disposables.length) disposables.pop().dispose();
}
var HTMLCompletionAdapter;
//#endregion
__esmMin((() => {
	init_workerManager();
	init_lspLanguageFeatures();
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
	HTMLCompletionAdapter = class extends CompletionAdapter {
		constructor(worker) {
			super(worker, [
				".",
				":",
				"<",
				"\"",
				"=",
				"/"
			]);
		}
	};
}))();
export { CompletionAdapter, DefinitionAdapter, DiagnosticsAdapter, DocumentColorAdapter, DocumentFormattingEditProvider, DocumentHighlightAdapter, DocumentLinkAdapter, DocumentRangeFormattingEditProvider, DocumentSymbolAdapter, FoldingRangeAdapter, HoverAdapter, ReferenceAdapter, RenameAdapter, SelectionRangeAdapter, WorkerManager, fromPosition, fromRange, setupMode, setupMode1, toRange, toTextEdit };
