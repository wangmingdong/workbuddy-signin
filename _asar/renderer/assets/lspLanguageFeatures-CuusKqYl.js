import { n as __esmMin } from "./chunk-BRZcfu7K.js";
import { $ as init_inlayHintsContribution, A as init_wordOperations, At as init_bracketMatching, B as init_documentSemanticTokens, C as init_inspectTokens, Ct as init_codeActionContributions, D as init_contribution$1, Dt as init_inlineProgress, E as init_floatingMenu_contribution, Et as init_clipboard, F as init_tokenization, G as init_multicursor, H as init_rename, I as init_suggestInlineCompletions, J as init_links, K as init_middleScroll_contribution, L as init_stickyScrollContribution, M as init_unusualLineTerminators, Mt as init_diffEditor_contribution, N as init_unicodeHighlighter, Nt as init_codeEditorWidget, O as init_contribution, Ot as init_transpose, P as init_toggleTabFocusMode, Pt as init_coreCommands, Q as init_inPlaceReplace, R as init_smartSelect, S as init_standaloneHelpQuickAccess, St as init_codelensController, T as init_standaloneStrings, Tt as init_codicon, U as init_placeholderText_contribution, V as init_sectionHeaders, W as init_parameterHints, X as init_lineSelection, Y as init_linkedEditing, Z as init_insertFinalNewLine, _ as init_toggleHighContrast, _t as init_contextmenu, a as MarkerSeverity, at as init_suggestController, b as init_standaloneGotoSymbolQuickAccess, bt as init_gotoError, c as Range$1, ct as init_documentSymbols, dt as init_folding, et as init_indentation, f as Uri, ft as init_findController, g as languages, gt as init_cursorUndo, h as init_editor_api2, ht as init_dnd, it as init_inlineCompletions_contribution, j as init_wordHighlighter, jt as init_anchorSelect, k as init_wordPartOperations, kt as init_caretOperations, lt as init_formatActions, mt as init_copyPasteContribution, nt as init_gpuActions, ot as init_snippetController2, p as editor, pt as init_dropIntoEditorContribution, q as init_longLinesHelper, rt as init_goToDefinitionAtPosition, st as init_linesOperations, tt as init_hoverContribution, ut as init_fontZoom, v as init_standaloneReferenceSearch, vt as init_comment, w as init_iPadShowKeyboard, wt as init_codicon_modifiers, x as init_standaloneGotoLineQuickAccess, xt as init_goToCommands, y as init_standaloneCommandsQuickAccess, yt as init_colorPickerContribution, z as init_viewportSemanticTokens } from "./editor.api2-Bx-U9mA4.js";
//#region ../../node_modules/monaco-editor/esm/external/vscode-languageserver-types/lib/esm/main.js
var DocumentUri, URI, integer, uinteger, Position, Range, Location, LocationLink, Color, ColorInformation, ColorPresentation, FoldingRangeKind, FoldingRange, DiagnosticRelatedInformation, DiagnosticSeverity, DiagnosticTag, CodeDescription, Diagnostic, Command, TextEdit, ChangeAnnotation, ChangeAnnotationIdentifier, AnnotatedTextEdit, TextDocumentEdit, CreateFile, RenameFile, DeleteFile, WorkspaceEdit, TextDocumentIdentifier, VersionedTextDocumentIdentifier, OptionalVersionedTextDocumentIdentifier, TextDocumentItem, MarkupKind, MarkupContent, CompletionItemKind, InsertTextFormat, CompletionItemTag, InsertReplaceEdit, InsertTextMode, CompletionItemLabelDetails, CompletionItem, CompletionList, MarkedString, Hover, ParameterInformation, SignatureInformation, DocumentHighlightKind, DocumentHighlight, SymbolKind, SymbolTag, SymbolInformation, WorkspaceSymbol, DocumentSymbol, CodeActionKind, CodeActionTriggerKind, CodeActionContext, CodeAction, CodeLens, FormattingOptions, DocumentLink, SelectionRange, SemanticTokenTypes, SemanticTokenModifiers, SemanticTokens, InlineValueText, InlineValueVariableLookup, InlineValueEvaluatableExpression, InlineValueContext, InlayHintKind, InlayHintLabelPart, InlayHint, StringValue, InlineCompletionItem, InlineCompletionList, InlineCompletionTriggerKind, SelectedCompletionInfo, InlineCompletionContext, WorkspaceFolder, TextDocument, FullTextDocument, Is;
var init_main = __esmMin((() => {
	(function(DocumentUri) {
		function is(value) {
			return typeof value === "string";
		}
		DocumentUri.is = is;
	})(DocumentUri || (DocumentUri = {}));
	(function(URI) {
		function is(value) {
			return typeof value === "string";
		}
		URI.is = is;
	})(URI || (URI = {}));
	(function(integer) {
		integer.MIN_VALUE = -2147483648;
		integer.MAX_VALUE = 2147483647;
		function is(value) {
			return typeof value === "number" && integer.MIN_VALUE <= value && value <= integer.MAX_VALUE;
		}
		integer.is = is;
	})(integer || (integer = {}));
	(function(uinteger) {
		uinteger.MIN_VALUE = 0;
		uinteger.MAX_VALUE = 2147483647;
		function is(value) {
			return typeof value === "number" && uinteger.MIN_VALUE <= value && value <= uinteger.MAX_VALUE;
		}
		uinteger.is = is;
	})(uinteger || (uinteger = {}));
	(function(Position) {
		/**
		* Creates a new Position literal from the given line and character.
		* @param line The position's line.
		* @param character The position's character.
		*/
		function create(line, character) {
			if (line === Number.MAX_VALUE) line = uinteger.MAX_VALUE;
			if (character === Number.MAX_VALUE) character = uinteger.MAX_VALUE;
			return {
				line,
				character
			};
		}
		Position.create = create;
		/**
		* Checks whether the given literal conforms to the {@link Position} interface.
		*/
		function is(value) {
			let candidate = value;
			return Is.objectLiteral(candidate) && Is.uinteger(candidate.line) && Is.uinteger(candidate.character);
		}
		Position.is = is;
	})(Position || (Position = {}));
	(function(Range) {
		function create(one, two, three, four) {
			if (Is.uinteger(one) && Is.uinteger(two) && Is.uinteger(three) && Is.uinteger(four)) return {
				start: Position.create(one, two),
				end: Position.create(three, four)
			};
			else if (Position.is(one) && Position.is(two)) return {
				start: one,
				end: two
			};
			else throw new Error(`Range#create called with invalid arguments[${one}, ${two}, ${three}, ${four}]`);
		}
		Range.create = create;
		/**
		* Checks whether the given literal conforms to the {@link Range} interface.
		*/
		function is(value) {
			let candidate = value;
			return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
		}
		Range.is = is;
	})(Range || (Range = {}));
	(function(Location) {
		/**
		* Creates a Location literal.
		* @param uri The location's uri.
		* @param range The location's range.
		*/
		function create(uri, range) {
			return {
				uri,
				range
			};
		}
		Location.create = create;
		/**
		* Checks whether the given literal conforms to the {@link Location} interface.
		*/
		function is(value) {
			let candidate = value;
			return Is.objectLiteral(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
		}
		Location.is = is;
	})(Location || (Location = {}));
	(function(LocationLink) {
		/**
		* Creates a LocationLink literal.
		* @param targetUri The definition's uri.
		* @param targetRange The full range of the definition.
		* @param targetSelectionRange The span of the symbol definition at the target.
		* @param originSelectionRange The span of the symbol being defined in the originating source file.
		*/
		function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
			return {
				targetUri,
				targetRange,
				targetSelectionRange,
				originSelectionRange
			};
		}
		LocationLink.create = create;
		/**
		* Checks whether the given literal conforms to the {@link LocationLink} interface.
		*/
		function is(value) {
			let candidate = value;
			return Is.objectLiteral(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri) && Range.is(candidate.targetSelectionRange) && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
		}
		LocationLink.is = is;
	})(LocationLink || (LocationLink = {}));
	(function(Color) {
		/**
		* Creates a new Color literal.
		*/
		function create(red, green, blue, alpha) {
			return {
				red,
				green,
				blue,
				alpha
			};
		}
		Color.create = create;
		/**
		* Checks whether the given literal conforms to the {@link Color} interface.
		*/
		function is(value) {
			const candidate = value;
			return Is.objectLiteral(candidate) && Is.numberRange(candidate.red, 0, 1) && Is.numberRange(candidate.green, 0, 1) && Is.numberRange(candidate.blue, 0, 1) && Is.numberRange(candidate.alpha, 0, 1);
		}
		Color.is = is;
	})(Color || (Color = {}));
	(function(ColorInformation) {
		/**
		* Creates a new ColorInformation literal.
		*/
		function create(range, color) {
			return {
				range,
				color
			};
		}
		ColorInformation.create = create;
		/**
		* Checks whether the given literal conforms to the {@link ColorInformation} interface.
		*/
		function is(value) {
			const candidate = value;
			return Is.objectLiteral(candidate) && Range.is(candidate.range) && Color.is(candidate.color);
		}
		ColorInformation.is = is;
	})(ColorInformation || (ColorInformation = {}));
	(function(ColorPresentation) {
		/**
		* Creates a new ColorInformation literal.
		*/
		function create(label, textEdit, additionalTextEdits) {
			return {
				label,
				textEdit,
				additionalTextEdits
			};
		}
		ColorPresentation.create = create;
		/**
		* Checks whether the given literal conforms to the {@link ColorInformation} interface.
		*/
		function is(value) {
			const candidate = value;
			return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate)) && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
		}
		ColorPresentation.is = is;
	})(ColorPresentation || (ColorPresentation = {}));
	(function(FoldingRangeKind) {
		/**
		* Folding range for a comment
		*/
		FoldingRangeKind.Comment = "comment";
		/**
		* Folding range for an import or include
		*/
		FoldingRangeKind.Imports = "imports";
		/**
		* Folding range for a region (e.g. `#region`)
		*/
		FoldingRangeKind.Region = "region";
	})(FoldingRangeKind || (FoldingRangeKind = {}));
	(function(FoldingRange) {
		/**
		* Creates a new FoldingRange literal.
		*/
		function create(startLine, endLine, startCharacter, endCharacter, kind, collapsedText) {
			const result = {
				startLine,
				endLine
			};
			if (Is.defined(startCharacter)) result.startCharacter = startCharacter;
			if (Is.defined(endCharacter)) result.endCharacter = endCharacter;
			if (Is.defined(kind)) result.kind = kind;
			if (Is.defined(collapsedText)) result.collapsedText = collapsedText;
			return result;
		}
		FoldingRange.create = create;
		/**
		* Checks whether the given literal conforms to the {@link FoldingRange} interface.
		*/
		function is(value) {
			const candidate = value;
			return Is.objectLiteral(candidate) && Is.uinteger(candidate.startLine) && Is.uinteger(candidate.startLine) && (Is.undefined(candidate.startCharacter) || Is.uinteger(candidate.startCharacter)) && (Is.undefined(candidate.endCharacter) || Is.uinteger(candidate.endCharacter)) && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
		}
		FoldingRange.is = is;
	})(FoldingRange || (FoldingRange = {}));
	(function(DiagnosticRelatedInformation) {
		/**
		* Creates a new DiagnosticRelatedInformation literal.
		*/
		function create(location, message) {
			return {
				location,
				message
			};
		}
		DiagnosticRelatedInformation.create = create;
		/**
		* Checks whether the given literal conforms to the {@link DiagnosticRelatedInformation} interface.
		*/
		function is(value) {
			let candidate = value;
			return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
		}
		DiagnosticRelatedInformation.is = is;
	})(DiagnosticRelatedInformation || (DiagnosticRelatedInformation = {}));
	(function(DiagnosticSeverity) {
		/**
		* Reports an error.
		*/
		DiagnosticSeverity.Error = 1;
		/**
		* Reports a warning.
		*/
		DiagnosticSeverity.Warning = 2;
		/**
		* Reports an information.
		*/
		DiagnosticSeverity.Information = 3;
		/**
		* Reports a hint.
		*/
		DiagnosticSeverity.Hint = 4;
	})(DiagnosticSeverity || (DiagnosticSeverity = {}));
	(function(DiagnosticTag) {
		/**
		* Unused or unnecessary code.
		*
		* Clients are allowed to render diagnostics with this tag faded out instead of having
		* an error squiggle.
		*/
		DiagnosticTag.Unnecessary = 1;
		/**
		* Deprecated or obsolete code.
		*
		* Clients are allowed to rendered diagnostics with this tag strike through.
		*/
		DiagnosticTag.Deprecated = 2;
	})(DiagnosticTag || (DiagnosticTag = {}));
	(function(CodeDescription) {
		function is(value) {
			const candidate = value;
			return Is.objectLiteral(candidate) && Is.string(candidate.href);
		}
		CodeDescription.is = is;
	})(CodeDescription || (CodeDescription = {}));
	(function(Diagnostic) {
		/**
		* Creates a new Diagnostic literal.
		*/
		function create(range, message, severity, code, source, relatedInformation) {
			let result = {
				range,
				message
			};
			if (Is.defined(severity)) result.severity = severity;
			if (Is.defined(code)) result.code = code;
			if (Is.defined(source)) result.source = source;
			if (Is.defined(relatedInformation)) result.relatedInformation = relatedInformation;
			return result;
		}
		Diagnostic.create = create;
		/**
		* Checks whether the given literal conforms to the {@link Diagnostic} interface.
		*/
		function is(value) {
			var _a;
			let candidate = value;
			return Is.defined(candidate) && Range.is(candidate.range) && Is.string(candidate.message) && (Is.number(candidate.severity) || Is.undefined(candidate.severity)) && (Is.integer(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code)) && (Is.undefined(candidate.codeDescription) || Is.string((_a = candidate.codeDescription) === null || _a === void 0 ? void 0 : _a.href)) && (Is.string(candidate.source) || Is.undefined(candidate.source)) && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
		}
		Diagnostic.is = is;
	})(Diagnostic || (Diagnostic = {}));
	(function(Command) {
		/**
		* Creates a new Command literal.
		*/
		function create(title, command, ...args) {
			let result = {
				title,
				command
			};
			if (Is.defined(args) && args.length > 0) result.arguments = args;
			return result;
		}
		Command.create = create;
		/**
		* Checks whether the given literal conforms to the {@link Command} interface.
		*/
		function is(value) {
			let candidate = value;
			return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
		}
		Command.is = is;
	})(Command || (Command = {}));
	(function(TextEdit) {
		/**
		* Creates a replace text edit.
		* @param range The range of text to be replaced.
		* @param newText The new text.
		*/
		function replace(range, newText) {
			return {
				range,
				newText
			};
		}
		TextEdit.replace = replace;
		/**
		* Creates an insert text edit.
		* @param position The position to insert the text at.
		* @param newText The text to be inserted.
		*/
		function insert(position, newText) {
			return {
				range: {
					start: position,
					end: position
				},
				newText
			};
		}
		TextEdit.insert = insert;
		/**
		* Creates a delete text edit.
		* @param range The range of text to be deleted.
		*/
		function del(range) {
			return {
				range,
				newText: ""
			};
		}
		TextEdit.del = del;
		function is(value) {
			const candidate = value;
			return Is.objectLiteral(candidate) && Is.string(candidate.newText) && Range.is(candidate.range);
		}
		TextEdit.is = is;
	})(TextEdit || (TextEdit = {}));
	(function(ChangeAnnotation) {
		function create(label, needsConfirmation, description) {
			const result = { label };
			if (needsConfirmation !== void 0) result.needsConfirmation = needsConfirmation;
			if (description !== void 0) result.description = description;
			return result;
		}
		ChangeAnnotation.create = create;
		function is(value) {
			const candidate = value;
			return Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === void 0) && (Is.string(candidate.description) || candidate.description === void 0);
		}
		ChangeAnnotation.is = is;
	})(ChangeAnnotation || (ChangeAnnotation = {}));
	(function(ChangeAnnotationIdentifier) {
		function is(value) {
			const candidate = value;
			return Is.string(candidate);
		}
		ChangeAnnotationIdentifier.is = is;
	})(ChangeAnnotationIdentifier || (ChangeAnnotationIdentifier = {}));
	(function(AnnotatedTextEdit) {
		/**
		* Creates an annotated replace text edit.
		*
		* @param range The range of text to be replaced.
		* @param newText The new text.
		* @param annotation The annotation.
		*/
		function replace(range, newText, annotation) {
			return {
				range,
				newText,
				annotationId: annotation
			};
		}
		AnnotatedTextEdit.replace = replace;
		/**
		* Creates an annotated insert text edit.
		*
		* @param position The position to insert the text at.
		* @param newText The text to be inserted.
		* @param annotation The annotation.
		*/
		function insert(position, newText, annotation) {
			return {
				range: {
					start: position,
					end: position
				},
				newText,
				annotationId: annotation
			};
		}
		AnnotatedTextEdit.insert = insert;
		/**
		* Creates an annotated delete text edit.
		*
		* @param range The range of text to be deleted.
		* @param annotation The annotation.
		*/
		function del(range, annotation) {
			return {
				range,
				newText: "",
				annotationId: annotation
			};
		}
		AnnotatedTextEdit.del = del;
		function is(value) {
			const candidate = value;
			return TextEdit.is(candidate) && (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId));
		}
		AnnotatedTextEdit.is = is;
	})(AnnotatedTextEdit || (AnnotatedTextEdit = {}));
	(function(TextDocumentEdit) {
		/**
		* Creates a new `TextDocumentEdit`
		*/
		function create(textDocument, edits) {
			return {
				textDocument,
				edits
			};
		}
		TextDocumentEdit.create = create;
		function is(value) {
			let candidate = value;
			return Is.defined(candidate) && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument) && Array.isArray(candidate.edits);
		}
		TextDocumentEdit.is = is;
	})(TextDocumentEdit || (TextDocumentEdit = {}));
	(function(CreateFile) {
		function create(uri, options, annotation) {
			let result = {
				kind: "create",
				uri
			};
			if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) result.options = options;
			if (annotation !== void 0) result.annotationId = annotation;
			return result;
		}
		CreateFile.create = create;
		function is(value) {
			let candidate = value;
			return candidate && candidate.kind === "create" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
		}
		CreateFile.is = is;
	})(CreateFile || (CreateFile = {}));
	(function(RenameFile) {
		function create(oldUri, newUri, options, annotation) {
			let result = {
				kind: "rename",
				oldUri,
				newUri
			};
			if (options !== void 0 && (options.overwrite !== void 0 || options.ignoreIfExists !== void 0)) result.options = options;
			if (annotation !== void 0) result.annotationId = annotation;
			return result;
		}
		RenameFile.create = create;
		function is(value) {
			let candidate = value;
			return candidate && candidate.kind === "rename" && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === void 0 || (candidate.options.overwrite === void 0 || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === void 0 || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
		}
		RenameFile.is = is;
	})(RenameFile || (RenameFile = {}));
	(function(DeleteFile) {
		function create(uri, options, annotation) {
			let result = {
				kind: "delete",
				uri
			};
			if (options !== void 0 && (options.recursive !== void 0 || options.ignoreIfNotExists !== void 0)) result.options = options;
			if (annotation !== void 0) result.annotationId = annotation;
			return result;
		}
		DeleteFile.create = create;
		function is(value) {
			let candidate = value;
			return candidate && candidate.kind === "delete" && Is.string(candidate.uri) && (candidate.options === void 0 || (candidate.options.recursive === void 0 || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === void 0 || Is.boolean(candidate.options.ignoreIfNotExists))) && (candidate.annotationId === void 0 || ChangeAnnotationIdentifier.is(candidate.annotationId));
		}
		DeleteFile.is = is;
	})(DeleteFile || (DeleteFile = {}));
	(function(WorkspaceEdit) {
		function is(value) {
			let candidate = value;
			return candidate && (candidate.changes !== void 0 || candidate.documentChanges !== void 0) && (candidate.documentChanges === void 0 || candidate.documentChanges.every((change) => {
				if (Is.string(change.kind)) return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
				else return TextDocumentEdit.is(change);
			}));
		}
		WorkspaceEdit.is = is;
	})(WorkspaceEdit || (WorkspaceEdit = {}));
	(function(TextDocumentIdentifier) {
		/**
		* Creates a new TextDocumentIdentifier literal.
		* @param uri The document's uri.
		*/
		function create(uri) {
			return { uri };
		}
		TextDocumentIdentifier.create = create;
		/**
		* Checks whether the given literal conforms to the {@link TextDocumentIdentifier} interface.
		*/
		function is(value) {
			let candidate = value;
			return Is.defined(candidate) && Is.string(candidate.uri);
		}
		TextDocumentIdentifier.is = is;
	})(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
	(function(VersionedTextDocumentIdentifier) {
		/**
		* Creates a new VersionedTextDocumentIdentifier literal.
		* @param uri The document's uri.
		* @param version The document's version.
		*/
		function create(uri, version) {
			return {
				uri,
				version
			};
		}
		VersionedTextDocumentIdentifier.create = create;
		/**
		* Checks whether the given literal conforms to the {@link VersionedTextDocumentIdentifier} interface.
		*/
		function is(value) {
			let candidate = value;
			return Is.defined(candidate) && Is.string(candidate.uri) && Is.integer(candidate.version);
		}
		VersionedTextDocumentIdentifier.is = is;
	})(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
	(function(OptionalVersionedTextDocumentIdentifier) {
		/**
		* Creates a new OptionalVersionedTextDocumentIdentifier literal.
		* @param uri The document's uri.
		* @param version The document's version.
		*/
		function create(uri, version) {
			return {
				uri,
				version
			};
		}
		OptionalVersionedTextDocumentIdentifier.create = create;
		/**
		* Checks whether the given literal conforms to the {@link OptionalVersionedTextDocumentIdentifier} interface.
		*/
		function is(value) {
			let candidate = value;
			return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.integer(candidate.version));
		}
		OptionalVersionedTextDocumentIdentifier.is = is;
	})(OptionalVersionedTextDocumentIdentifier || (OptionalVersionedTextDocumentIdentifier = {}));
	(function(TextDocumentItem) {
		/**
		* Creates a new TextDocumentItem literal.
		* @param uri The document's uri.
		* @param languageId The document's language identifier.
		* @param version The document's version number.
		* @param text The document's text.
		*/
		function create(uri, languageId, version, text) {
			return {
				uri,
				languageId,
				version,
				text
			};
		}
		TextDocumentItem.create = create;
		/**
		* Checks whether the given literal conforms to the {@link TextDocumentItem} interface.
		*/
		function is(value) {
			let candidate = value;
			return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.integer(candidate.version) && Is.string(candidate.text);
		}
		TextDocumentItem.is = is;
	})(TextDocumentItem || (TextDocumentItem = {}));
	(function(MarkupKind) {
		/**
		* Plain text is supported as a content format
		*/
		MarkupKind.PlainText = "plaintext";
		/**
		* Markdown is supported as a content format
		*/
		MarkupKind.Markdown = "markdown";
		/**
		* Checks whether the given value is a value of the {@link MarkupKind} type.
		*/
		function is(value) {
			const candidate = value;
			return candidate === MarkupKind.PlainText || candidate === MarkupKind.Markdown;
		}
		MarkupKind.is = is;
	})(MarkupKind || (MarkupKind = {}));
	(function(MarkupContent) {
		/**
		* Checks whether the given value conforms to the {@link MarkupContent} interface.
		*/
		function is(value) {
			const candidate = value;
			return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
		}
		MarkupContent.is = is;
	})(MarkupContent || (MarkupContent = {}));
	(function(CompletionItemKind) {
		CompletionItemKind.Text = 1;
		CompletionItemKind.Method = 2;
		CompletionItemKind.Function = 3;
		CompletionItemKind.Constructor = 4;
		CompletionItemKind.Field = 5;
		CompletionItemKind.Variable = 6;
		CompletionItemKind.Class = 7;
		CompletionItemKind.Interface = 8;
		CompletionItemKind.Module = 9;
		CompletionItemKind.Property = 10;
		CompletionItemKind.Unit = 11;
		CompletionItemKind.Value = 12;
		CompletionItemKind.Enum = 13;
		CompletionItemKind.Keyword = 14;
		CompletionItemKind.Snippet = 15;
		CompletionItemKind.Color = 16;
		CompletionItemKind.File = 17;
		CompletionItemKind.Reference = 18;
		CompletionItemKind.Folder = 19;
		CompletionItemKind.EnumMember = 20;
		CompletionItemKind.Constant = 21;
		CompletionItemKind.Struct = 22;
		CompletionItemKind.Event = 23;
		CompletionItemKind.Operator = 24;
		CompletionItemKind.TypeParameter = 25;
	})(CompletionItemKind || (CompletionItemKind = {}));
	(function(InsertTextFormat) {
		/**
		* The primary text to be inserted is treated as a plain string.
		*/
		InsertTextFormat.PlainText = 1;
		/**
		* The primary text to be inserted is treated as a snippet.
		*
		* A snippet can define tab stops and placeholders with `$1`, `$2`
		* and `${3:foo}`. `$0` defines the final tab stop, it defaults to
		* the end of the snippet. Placeholders with equal identifiers are linked,
		* that is typing in one will update others too.
		*
		* See also: https://microsoft.github.io/language-server-protocol/specifications/specification-current/#snippet_syntax
		*/
		InsertTextFormat.Snippet = 2;
	})(InsertTextFormat || (InsertTextFormat = {}));
	(function(CompletionItemTag) {
		/**
		* Render a completion as obsolete, usually using a strike-out.
		*/
		CompletionItemTag.Deprecated = 1;
	})(CompletionItemTag || (CompletionItemTag = {}));
	(function(InsertReplaceEdit) {
		/**
		* Creates a new insert / replace edit
		*/
		function create(newText, insert, replace) {
			return {
				newText,
				insert,
				replace
			};
		}
		InsertReplaceEdit.create = create;
		/**
		* Checks whether the given literal conforms to the {@link InsertReplaceEdit} interface.
		*/
		function is(value) {
			const candidate = value;
			return candidate && Is.string(candidate.newText) && Range.is(candidate.insert) && Range.is(candidate.replace);
		}
		InsertReplaceEdit.is = is;
	})(InsertReplaceEdit || (InsertReplaceEdit = {}));
	(function(InsertTextMode) {
		/**
		* The insertion or replace strings is taken as it is. If the
		* value is multi line the lines below the cursor will be
		* inserted using the indentation defined in the string value.
		* The client will not apply any kind of adjustments to the
		* string.
		*/
		InsertTextMode.asIs = 1;
		/**
		* The editor adjusts leading whitespace of new lines so that
		* they match the indentation up to the cursor of the line for
		* which the item is accepted.
		*
		* Consider a line like this: <2tabs><cursor><3tabs>foo. Accepting a
		* multi line completion item is indented using 2 tabs and all
		* following lines inserted will be indented using 2 tabs as well.
		*/
		InsertTextMode.adjustIndentation = 2;
	})(InsertTextMode || (InsertTextMode = {}));
	(function(CompletionItemLabelDetails) {
		function is(value) {
			const candidate = value;
			return candidate && (Is.string(candidate.detail) || candidate.detail === void 0) && (Is.string(candidate.description) || candidate.description === void 0);
		}
		CompletionItemLabelDetails.is = is;
	})(CompletionItemLabelDetails || (CompletionItemLabelDetails = {}));
	(function(CompletionItem) {
		/**
		* Create a completion item and seed it with a label.
		* @param label The completion item's label
		*/
		function create(label) {
			return { label };
		}
		CompletionItem.create = create;
	})(CompletionItem || (CompletionItem = {}));
	(function(CompletionList) {
		/**
		* Creates a new completion list.
		*
		* @param items The completion items.
		* @param isIncomplete The list is not complete.
		*/
		function create(items, isIncomplete) {
			return {
				items: items ? items : [],
				isIncomplete: !!isIncomplete
			};
		}
		CompletionList.create = create;
	})(CompletionList || (CompletionList = {}));
	(function(MarkedString) {
		/**
		* Creates a marked string from plain text.
		*
		* @param plainText The plain text.
		*/
		function fromPlainText(plainText) {
			return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
		}
		MarkedString.fromPlainText = fromPlainText;
		/**
		* Checks whether the given value conforms to the {@link MarkedString} type.
		*/
		function is(value) {
			const candidate = value;
			return Is.string(candidate) || Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value);
		}
		MarkedString.is = is;
	})(MarkedString || (MarkedString = {}));
	(function(Hover) {
		/**
		* Checks whether the given value conforms to the {@link Hover} interface.
		*/
		function is(value) {
			let candidate = value;
			return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) || MarkedString.is(candidate.contents) || Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === void 0 || Range.is(value.range));
		}
		Hover.is = is;
	})(Hover || (Hover = {}));
	(function(ParameterInformation) {
		/**
		* Creates a new parameter information literal.
		*
		* @param label A label string.
		* @param documentation A doc string.
		*/
		function create(label, documentation) {
			return documentation ? {
				label,
				documentation
			} : { label };
		}
		ParameterInformation.create = create;
	})(ParameterInformation || (ParameterInformation = {}));
	(function(SignatureInformation) {
		function create(label, documentation, ...parameters) {
			let result = { label };
			if (Is.defined(documentation)) result.documentation = documentation;
			if (Is.defined(parameters)) result.parameters = parameters;
			else result.parameters = [];
			return result;
		}
		SignatureInformation.create = create;
	})(SignatureInformation || (SignatureInformation = {}));
	(function(DocumentHighlightKind) {
		/**
		* A textual occurrence.
		*/
		DocumentHighlightKind.Text = 1;
		/**
		* Read-access of a symbol, like reading a variable.
		*/
		DocumentHighlightKind.Read = 2;
		/**
		* Write-access of a symbol, like writing to a variable.
		*/
		DocumentHighlightKind.Write = 3;
	})(DocumentHighlightKind || (DocumentHighlightKind = {}));
	(function(DocumentHighlight) {
		/**
		* Create a DocumentHighlight object.
		* @param range The range the highlight applies to.
		* @param kind The highlight kind
		*/
		function create(range, kind) {
			let result = { range };
			if (Is.number(kind)) result.kind = kind;
			return result;
		}
		DocumentHighlight.create = create;
	})(DocumentHighlight || (DocumentHighlight = {}));
	(function(SymbolKind) {
		SymbolKind.File = 1;
		SymbolKind.Module = 2;
		SymbolKind.Namespace = 3;
		SymbolKind.Package = 4;
		SymbolKind.Class = 5;
		SymbolKind.Method = 6;
		SymbolKind.Property = 7;
		SymbolKind.Field = 8;
		SymbolKind.Constructor = 9;
		SymbolKind.Enum = 10;
		SymbolKind.Interface = 11;
		SymbolKind.Function = 12;
		SymbolKind.Variable = 13;
		SymbolKind.Constant = 14;
		SymbolKind.String = 15;
		SymbolKind.Number = 16;
		SymbolKind.Boolean = 17;
		SymbolKind.Array = 18;
		SymbolKind.Object = 19;
		SymbolKind.Key = 20;
		SymbolKind.Null = 21;
		SymbolKind.EnumMember = 22;
		SymbolKind.Struct = 23;
		SymbolKind.Event = 24;
		SymbolKind.Operator = 25;
		SymbolKind.TypeParameter = 26;
	})(SymbolKind || (SymbolKind = {}));
	(function(SymbolTag) {
		/**
		* Render a symbol as obsolete, usually using a strike-out.
		*/
		SymbolTag.Deprecated = 1;
	})(SymbolTag || (SymbolTag = {}));
	(function(SymbolInformation) {
		/**
		* Creates a new symbol information literal.
		*
		* @param name The name of the symbol.
		* @param kind The kind of the symbol.
		* @param range The range of the location of the symbol.
		* @param uri The resource of the location of symbol.
		* @param containerName The name of the symbol containing the symbol.
		*/
		function create(name, kind, range, uri, containerName) {
			let result = {
				name,
				kind,
				location: {
					uri,
					range
				}
			};
			if (containerName) result.containerName = containerName;
			return result;
		}
		SymbolInformation.create = create;
	})(SymbolInformation || (SymbolInformation = {}));
	(function(WorkspaceSymbol) {
		/**
		* Create a new workspace symbol.
		*
		* @param name The name of the symbol.
		* @param kind The kind of the symbol.
		* @param uri The resource of the location of the symbol.
		* @param range An options range of the location.
		* @returns A WorkspaceSymbol.
		*/
		function create(name, kind, uri, range) {
			return range !== void 0 ? {
				name,
				kind,
				location: {
					uri,
					range
				}
			} : {
				name,
				kind,
				location: { uri }
			};
		}
		WorkspaceSymbol.create = create;
	})(WorkspaceSymbol || (WorkspaceSymbol = {}));
	(function(DocumentSymbol) {
		/**
		* Creates a new symbol information literal.
		*
		* @param name The name of the symbol.
		* @param detail The detail of the symbol.
		* @param kind The kind of the symbol.
		* @param range The range of the symbol.
		* @param selectionRange The selectionRange of the symbol.
		* @param children Children of the symbol.
		*/
		function create(name, detail, kind, range, selectionRange, children) {
			let result = {
				name,
				detail,
				kind,
				range,
				selectionRange
			};
			if (children !== void 0) result.children = children;
			return result;
		}
		DocumentSymbol.create = create;
		/**
		* Checks whether the given literal conforms to the {@link DocumentSymbol} interface.
		*/
		function is(value) {
			let candidate = value;
			return candidate && Is.string(candidate.name) && Is.number(candidate.kind) && Range.is(candidate.range) && Range.is(candidate.selectionRange) && (candidate.detail === void 0 || Is.string(candidate.detail)) && (candidate.deprecated === void 0 || Is.boolean(candidate.deprecated)) && (candidate.children === void 0 || Array.isArray(candidate.children)) && (candidate.tags === void 0 || Array.isArray(candidate.tags));
		}
		DocumentSymbol.is = is;
	})(DocumentSymbol || (DocumentSymbol = {}));
	(function(CodeActionKind) {
		/**
		* Empty kind.
		*/
		CodeActionKind.Empty = "";
		/**
		* Base kind for quickfix actions: 'quickfix'
		*/
		CodeActionKind.QuickFix = "quickfix";
		/**
		* Base kind for refactoring actions: 'refactor'
		*/
		CodeActionKind.Refactor = "refactor";
		/**
		* Base kind for refactoring extraction actions: 'refactor.extract'
		*
		* Example extract actions:
		*
		* - Extract method
		* - Extract function
		* - Extract variable
		* - Extract interface from class
		* - ...
		*/
		CodeActionKind.RefactorExtract = "refactor.extract";
		/**
		* Base kind for refactoring inline actions: 'refactor.inline'
		*
		* Example inline actions:
		*
		* - Inline function
		* - Inline variable
		* - Inline constant
		* - ...
		*/
		CodeActionKind.RefactorInline = "refactor.inline";
		/**
		* Base kind for refactoring rewrite actions: 'refactor.rewrite'
		*
		* Example rewrite actions:
		*
		* - Convert JavaScript function to class
		* - Add or remove parameter
		* - Encapsulate field
		* - Make method static
		* - Move method to base class
		* - ...
		*/
		CodeActionKind.RefactorRewrite = "refactor.rewrite";
		/**
		* Base kind for source actions: `source`
		*
		* Source code actions apply to the entire file.
		*/
		CodeActionKind.Source = "source";
		/**
		* Base kind for an organize imports source action: `source.organizeImports`
		*/
		CodeActionKind.SourceOrganizeImports = "source.organizeImports";
		/**
		* Base kind for auto-fix source actions: `source.fixAll`.
		*
		* Fix all actions automatically fix errors that have a clear fix that do not require user input.
		* They should not suppress errors or perform unsafe fixes such as generating new types or classes.
		*
		* @since 3.15.0
		*/
		CodeActionKind.SourceFixAll = "source.fixAll";
	})(CodeActionKind || (CodeActionKind = {}));
	(function(CodeActionTriggerKind) {
		/**
		* Code actions were explicitly requested by the user or by an extension.
		*/
		CodeActionTriggerKind.Invoked = 1;
		/**
		* Code actions were requested automatically.
		*
		* This typically happens when current selection in a file changes, but can
		* also be triggered when file content changes.
		*/
		CodeActionTriggerKind.Automatic = 2;
	})(CodeActionTriggerKind || (CodeActionTriggerKind = {}));
	(function(CodeActionContext) {
		/**
		* Creates a new CodeActionContext literal.
		*/
		function create(diagnostics, only, triggerKind) {
			let result = { diagnostics };
			if (only !== void 0 && only !== null) result.only = only;
			if (triggerKind !== void 0 && triggerKind !== null) result.triggerKind = triggerKind;
			return result;
		}
		CodeActionContext.create = create;
		/**
		* Checks whether the given literal conforms to the {@link CodeActionContext} interface.
		*/
		function is(value) {
			let candidate = value;
			return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === void 0 || Is.typedArray(candidate.only, Is.string)) && (candidate.triggerKind === void 0 || candidate.triggerKind === CodeActionTriggerKind.Invoked || candidate.triggerKind === CodeActionTriggerKind.Automatic);
		}
		CodeActionContext.is = is;
	})(CodeActionContext || (CodeActionContext = {}));
	(function(CodeAction) {
		function create(title, kindOrCommandOrEdit, kind) {
			let result = { title };
			let checkKind = true;
			if (typeof kindOrCommandOrEdit === "string") {
				checkKind = false;
				result.kind = kindOrCommandOrEdit;
			} else if (Command.is(kindOrCommandOrEdit)) result.command = kindOrCommandOrEdit;
			else result.edit = kindOrCommandOrEdit;
			if (checkKind && kind !== void 0) result.kind = kind;
			return result;
		}
		CodeAction.create = create;
		function is(value) {
			let candidate = value;
			return candidate && Is.string(candidate.title) && (candidate.diagnostics === void 0 || Is.typedArray(candidate.diagnostics, Diagnostic.is)) && (candidate.kind === void 0 || Is.string(candidate.kind)) && (candidate.edit !== void 0 || candidate.command !== void 0) && (candidate.command === void 0 || Command.is(candidate.command)) && (candidate.isPreferred === void 0 || Is.boolean(candidate.isPreferred)) && (candidate.edit === void 0 || WorkspaceEdit.is(candidate.edit));
		}
		CodeAction.is = is;
	})(CodeAction || (CodeAction = {}));
	(function(CodeLens) {
		/**
		* Creates a new CodeLens literal.
		*/
		function create(range, data) {
			let result = { range };
			if (Is.defined(data)) result.data = data;
			return result;
		}
		CodeLens.create = create;
		/**
		* Checks whether the given literal conforms to the {@link CodeLens} interface.
		*/
		function is(value) {
			let candidate = value;
			return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
		}
		CodeLens.is = is;
	})(CodeLens || (CodeLens = {}));
	(function(FormattingOptions) {
		/**
		* Creates a new FormattingOptions literal.
		*/
		function create(tabSize, insertSpaces) {
			return {
				tabSize,
				insertSpaces
			};
		}
		FormattingOptions.create = create;
		/**
		* Checks whether the given literal conforms to the {@link FormattingOptions} interface.
		*/
		function is(value) {
			let candidate = value;
			return Is.defined(candidate) && Is.uinteger(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
		}
		FormattingOptions.is = is;
	})(FormattingOptions || (FormattingOptions = {}));
	(function(DocumentLink) {
		/**
		* Creates a new DocumentLink literal.
		*/
		function create(range, target, data) {
			return {
				range,
				target,
				data
			};
		}
		DocumentLink.create = create;
		/**
		* Checks whether the given literal conforms to the {@link DocumentLink} interface.
		*/
		function is(value) {
			let candidate = value;
			return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
		}
		DocumentLink.is = is;
	})(DocumentLink || (DocumentLink = {}));
	(function(SelectionRange) {
		/**
		* Creates a new SelectionRange
		* @param range the range.
		* @param parent an optional parent.
		*/
		function create(range, parent) {
			return {
				range,
				parent
			};
		}
		SelectionRange.create = create;
		function is(value) {
			let candidate = value;
			return Is.objectLiteral(candidate) && Range.is(candidate.range) && (candidate.parent === void 0 || SelectionRange.is(candidate.parent));
		}
		SelectionRange.is = is;
	})(SelectionRange || (SelectionRange = {}));
	(function(SemanticTokenTypes) {
		SemanticTokenTypes["namespace"] = "namespace";
		/**
		* Represents a generic type. Acts as a fallback for types which can't be mapped to
		* a specific type like class or enum.
		*/
		SemanticTokenTypes["type"] = "type";
		SemanticTokenTypes["class"] = "class";
		SemanticTokenTypes["enum"] = "enum";
		SemanticTokenTypes["interface"] = "interface";
		SemanticTokenTypes["struct"] = "struct";
		SemanticTokenTypes["typeParameter"] = "typeParameter";
		SemanticTokenTypes["parameter"] = "parameter";
		SemanticTokenTypes["variable"] = "variable";
		SemanticTokenTypes["property"] = "property";
		SemanticTokenTypes["enumMember"] = "enumMember";
		SemanticTokenTypes["event"] = "event";
		SemanticTokenTypes["function"] = "function";
		SemanticTokenTypes["method"] = "method";
		SemanticTokenTypes["macro"] = "macro";
		SemanticTokenTypes["keyword"] = "keyword";
		SemanticTokenTypes["modifier"] = "modifier";
		SemanticTokenTypes["comment"] = "comment";
		SemanticTokenTypes["string"] = "string";
		SemanticTokenTypes["number"] = "number";
		SemanticTokenTypes["regexp"] = "regexp";
		SemanticTokenTypes["operator"] = "operator";
		/**
		* @since 3.17.0
		*/
		SemanticTokenTypes["decorator"] = "decorator";
	})(SemanticTokenTypes || (SemanticTokenTypes = {}));
	(function(SemanticTokenModifiers) {
		SemanticTokenModifiers["declaration"] = "declaration";
		SemanticTokenModifiers["definition"] = "definition";
		SemanticTokenModifiers["readonly"] = "readonly";
		SemanticTokenModifiers["static"] = "static";
		SemanticTokenModifiers["deprecated"] = "deprecated";
		SemanticTokenModifiers["abstract"] = "abstract";
		SemanticTokenModifiers["async"] = "async";
		SemanticTokenModifiers["modification"] = "modification";
		SemanticTokenModifiers["documentation"] = "documentation";
		SemanticTokenModifiers["defaultLibrary"] = "defaultLibrary";
	})(SemanticTokenModifiers || (SemanticTokenModifiers = {}));
	(function(SemanticTokens) {
		function is(value) {
			const candidate = value;
			return Is.objectLiteral(candidate) && (candidate.resultId === void 0 || typeof candidate.resultId === "string") && Array.isArray(candidate.data) && (candidate.data.length === 0 || typeof candidate.data[0] === "number");
		}
		SemanticTokens.is = is;
	})(SemanticTokens || (SemanticTokens = {}));
	(function(InlineValueText) {
		/**
		* Creates a new InlineValueText literal.
		*/
		function create(range, text) {
			return {
				range,
				text
			};
		}
		InlineValueText.create = create;
		function is(value) {
			const candidate = value;
			return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && Is.string(candidate.text);
		}
		InlineValueText.is = is;
	})(InlineValueText || (InlineValueText = {}));
	(function(InlineValueVariableLookup) {
		/**
		* Creates a new InlineValueText literal.
		*/
		function create(range, variableName, caseSensitiveLookup) {
			return {
				range,
				variableName,
				caseSensitiveLookup
			};
		}
		InlineValueVariableLookup.create = create;
		function is(value) {
			const candidate = value;
			return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && Is.boolean(candidate.caseSensitiveLookup) && (Is.string(candidate.variableName) || candidate.variableName === void 0);
		}
		InlineValueVariableLookup.is = is;
	})(InlineValueVariableLookup || (InlineValueVariableLookup = {}));
	(function(InlineValueEvaluatableExpression) {
		/**
		* Creates a new InlineValueEvaluatableExpression literal.
		*/
		function create(range, expression) {
			return {
				range,
				expression
			};
		}
		InlineValueEvaluatableExpression.create = create;
		function is(value) {
			const candidate = value;
			return candidate !== void 0 && candidate !== null && Range.is(candidate.range) && (Is.string(candidate.expression) || candidate.expression === void 0);
		}
		InlineValueEvaluatableExpression.is = is;
	})(InlineValueEvaluatableExpression || (InlineValueEvaluatableExpression = {}));
	(function(InlineValueContext) {
		/**
		* Creates a new InlineValueContext literal.
		*/
		function create(frameId, stoppedLocation) {
			return {
				frameId,
				stoppedLocation
			};
		}
		InlineValueContext.create = create;
		/**
		* Checks whether the given literal conforms to the {@link InlineValueContext} interface.
		*/
		function is(value) {
			const candidate = value;
			return Is.defined(candidate) && Range.is(value.stoppedLocation);
		}
		InlineValueContext.is = is;
	})(InlineValueContext || (InlineValueContext = {}));
	(function(InlayHintKind) {
		/**
		* An inlay hint that for a type annotation.
		*/
		InlayHintKind.Type = 1;
		/**
		* An inlay hint that is for a parameter.
		*/
		InlayHintKind.Parameter = 2;
		function is(value) {
			return value === 1 || value === 2;
		}
		InlayHintKind.is = is;
	})(InlayHintKind || (InlayHintKind = {}));
	(function(InlayHintLabelPart) {
		function create(value) {
			return { value };
		}
		InlayHintLabelPart.create = create;
		function is(value) {
			const candidate = value;
			return Is.objectLiteral(candidate) && (candidate.tooltip === void 0 || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.location === void 0 || Location.is(candidate.location)) && (candidate.command === void 0 || Command.is(candidate.command));
		}
		InlayHintLabelPart.is = is;
	})(InlayHintLabelPart || (InlayHintLabelPart = {}));
	(function(InlayHint) {
		function create(position, label, kind) {
			const result = {
				position,
				label
			};
			if (kind !== void 0) result.kind = kind;
			return result;
		}
		InlayHint.create = create;
		function is(value) {
			const candidate = value;
			return Is.objectLiteral(candidate) && Position.is(candidate.position) && (Is.string(candidate.label) || Is.typedArray(candidate.label, InlayHintLabelPart.is)) && (candidate.kind === void 0 || InlayHintKind.is(candidate.kind)) && candidate.textEdits === void 0 || Is.typedArray(candidate.textEdits, TextEdit.is) && (candidate.tooltip === void 0 || Is.string(candidate.tooltip) || MarkupContent.is(candidate.tooltip)) && (candidate.paddingLeft === void 0 || Is.boolean(candidate.paddingLeft)) && (candidate.paddingRight === void 0 || Is.boolean(candidate.paddingRight));
		}
		InlayHint.is = is;
	})(InlayHint || (InlayHint = {}));
	(function(StringValue) {
		function createSnippet(value) {
			return {
				kind: "snippet",
				value
			};
		}
		StringValue.createSnippet = createSnippet;
	})(StringValue || (StringValue = {}));
	(function(InlineCompletionItem) {
		function create(insertText, filterText, range, command) {
			return {
				insertText,
				filterText,
				range,
				command
			};
		}
		InlineCompletionItem.create = create;
	})(InlineCompletionItem || (InlineCompletionItem = {}));
	(function(InlineCompletionList) {
		function create(items) {
			return { items };
		}
		InlineCompletionList.create = create;
	})(InlineCompletionList || (InlineCompletionList = {}));
	(function(InlineCompletionTriggerKind) {
		/**
		* Completion was triggered explicitly by a user gesture.
		*/
		InlineCompletionTriggerKind.Invoked = 0;
		/**
		* Completion was triggered automatically while editing.
		*/
		InlineCompletionTriggerKind.Automatic = 1;
	})(InlineCompletionTriggerKind || (InlineCompletionTriggerKind = {}));
	(function(SelectedCompletionInfo) {
		function create(range, text) {
			return {
				range,
				text
			};
		}
		SelectedCompletionInfo.create = create;
	})(SelectedCompletionInfo || (SelectedCompletionInfo = {}));
	(function(InlineCompletionContext) {
		function create(triggerKind, selectedCompletionInfo) {
			return {
				triggerKind,
				selectedCompletionInfo
			};
		}
		InlineCompletionContext.create = create;
	})(InlineCompletionContext || (InlineCompletionContext = {}));
	(function(WorkspaceFolder) {
		function is(value) {
			const candidate = value;
			return Is.objectLiteral(candidate) && URI.is(candidate.uri) && Is.string(candidate.name);
		}
		WorkspaceFolder.is = is;
	})(WorkspaceFolder || (WorkspaceFolder = {}));
	(function(TextDocument) {
		/**
		* Creates a new ITextDocument literal from the given uri and content.
		* @param uri The document's uri.
		* @param languageId The document's language Id.
		* @param version The document's version.
		* @param content The document's content.
		*/
		function create(uri, languageId, version, content) {
			return new FullTextDocument(uri, languageId, version, content);
		}
		TextDocument.create = create;
		/**
		* Checks whether the given literal conforms to the {@link ITextDocument} interface.
		*/
		function is(value) {
			let candidate = value;
			return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.uinteger(candidate.lineCount) && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
		}
		TextDocument.is = is;
		function applyEdits(document, edits) {
			let text = document.getText();
			let sortedEdits = mergeSort(edits, (a, b) => {
				let diff = a.range.start.line - b.range.start.line;
				if (diff === 0) return a.range.start.character - b.range.start.character;
				return diff;
			});
			let lastModifiedOffset = text.length;
			for (let i = sortedEdits.length - 1; i >= 0; i--) {
				let e = sortedEdits[i];
				let startOffset = document.offsetAt(e.range.start);
				let endOffset = document.offsetAt(e.range.end);
				if (endOffset <= lastModifiedOffset) text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
				else throw new Error("Overlapping edit");
				lastModifiedOffset = startOffset;
			}
			return text;
		}
		TextDocument.applyEdits = applyEdits;
		function mergeSort(data, compare) {
			if (data.length <= 1) return data;
			const p = data.length / 2 | 0;
			const left = data.slice(0, p);
			const right = data.slice(p);
			mergeSort(left, compare);
			mergeSort(right, compare);
			let leftIdx = 0;
			let rightIdx = 0;
			let i = 0;
			while (leftIdx < left.length && rightIdx < right.length) if (compare(left[leftIdx], right[rightIdx]) <= 0) data[i++] = left[leftIdx++];
			else data[i++] = right[rightIdx++];
			while (leftIdx < left.length) data[i++] = left[leftIdx++];
			while (rightIdx < right.length) data[i++] = right[rightIdx++];
			return data;
		}
	})(TextDocument || (TextDocument = {}));
	FullTextDocument = class {
		constructor(uri, languageId, version, content) {
			this._uri = uri;
			this._languageId = languageId;
			this._version = version;
			this._content = content;
			this._lineOffsets = void 0;
		}
		get uri() {
			return this._uri;
		}
		get languageId() {
			return this._languageId;
		}
		get version() {
			return this._version;
		}
		getText(range) {
			if (range) {
				let start = this.offsetAt(range.start);
				let end = this.offsetAt(range.end);
				return this._content.substring(start, end);
			}
			return this._content;
		}
		update(event, version) {
			this._content = event.text;
			this._version = version;
			this._lineOffsets = void 0;
		}
		getLineOffsets() {
			if (this._lineOffsets === void 0) {
				let lineOffsets = [];
				let text = this._content;
				let isLineStart = true;
				for (let i = 0; i < text.length; i++) {
					if (isLineStart) {
						lineOffsets.push(i);
						isLineStart = false;
					}
					let ch = text.charAt(i);
					isLineStart = ch === "\r" || ch === "\n";
					if (ch === "\r" && i + 1 < text.length && text.charAt(i + 1) === "\n") i++;
				}
				if (isLineStart && text.length > 0) lineOffsets.push(text.length);
				this._lineOffsets = lineOffsets;
			}
			return this._lineOffsets;
		}
		positionAt(offset) {
			offset = Math.max(Math.min(offset, this._content.length), 0);
			let lineOffsets = this.getLineOffsets();
			let low = 0, high = lineOffsets.length;
			if (high === 0) return Position.create(0, offset);
			while (low < high) {
				let mid = Math.floor((low + high) / 2);
				if (lineOffsets[mid] > offset) high = mid;
				else low = mid + 1;
			}
			let line = low - 1;
			return Position.create(line, offset - lineOffsets[line]);
		}
		offsetAt(position) {
			let lineOffsets = this.getLineOffsets();
			if (position.line >= lineOffsets.length) return this._content.length;
			else if (position.line < 0) return 0;
			let lineOffset = lineOffsets[position.line];
			let nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
			return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
		}
		get lineCount() {
			return this.getLineOffsets().length;
		}
	};
	(function(Is) {
		const toString = Object.prototype.toString;
		function defined(value) {
			return typeof value !== "undefined";
		}
		Is.defined = defined;
		function undefined$1(value) {
			return typeof value === "undefined";
		}
		Is.undefined = undefined$1;
		function boolean(value) {
			return value === true || value === false;
		}
		Is.boolean = boolean;
		function string(value) {
			return toString.call(value) === "[object String]";
		}
		Is.string = string;
		function number(value) {
			return toString.call(value) === "[object Number]";
		}
		Is.number = number;
		function numberRange(value, min, max) {
			return toString.call(value) === "[object Number]" && min <= value && value <= max;
		}
		Is.numberRange = numberRange;
		function integer(value) {
			return toString.call(value) === "[object Number]" && -2147483648 <= value && value <= 2147483647;
		}
		Is.integer = integer;
		function uinteger(value) {
			return toString.call(value) === "[object Number]" && 0 <= value && value <= 2147483647;
		}
		Is.uinteger = uinteger;
		function func(value) {
			return toString.call(value) === "[object Function]";
		}
		Is.func = func;
		function objectLiteral(value) {
			return value !== null && typeof value === "object";
		}
		Is.objectLiteral = objectLiteral;
		function typedArray(value, check) {
			return Array.isArray(value) && value.every(check);
		}
		Is.typedArray = typedArray;
	})(Is || (Is = {}));
}));
//#endregion
//#region ../../node_modules/monaco-editor/esm/vs/language/common/lspLanguageFeatures.js
function toSeverity(lsSeverity) {
	switch (lsSeverity) {
		case DiagnosticSeverity.Error: return MarkerSeverity.Error;
		case DiagnosticSeverity.Warning: return MarkerSeverity.Warning;
		case DiagnosticSeverity.Information: return MarkerSeverity.Info;
		case DiagnosticSeverity.Hint: return MarkerSeverity.Hint;
		default: return MarkerSeverity.Info;
	}
}
function toDiagnostics(resource, diag) {
	let code = typeof diag.code === "number" ? String(diag.code) : diag.code;
	return {
		severity: toSeverity(diag.severity),
		startLineNumber: diag.range.start.line + 1,
		startColumn: diag.range.start.character + 1,
		endLineNumber: diag.range.end.line + 1,
		endColumn: diag.range.end.character + 1,
		message: diag.message,
		code,
		source: diag.source
	};
}
function fromPosition(position) {
	if (!position) return;
	return {
		character: position.column - 1,
		line: position.lineNumber - 1
	};
}
function fromRange(range) {
	if (!range) return;
	return {
		start: {
			line: range.startLineNumber - 1,
			character: range.startColumn - 1
		},
		end: {
			line: range.endLineNumber - 1,
			character: range.endColumn - 1
		}
	};
}
function toRange(range) {
	if (!range) return;
	return new Range$1(range.start.line + 1, range.start.character + 1, range.end.line + 1, range.end.character + 1);
}
function isInsertReplaceEdit(edit) {
	return typeof edit.insert !== "undefined" && typeof edit.replace !== "undefined";
}
function toCompletionItemKind(kind) {
	const mItemKind = languages.CompletionItemKind;
	switch (kind) {
		case CompletionItemKind.Text: return mItemKind.Text;
		case CompletionItemKind.Method: return mItemKind.Method;
		case CompletionItemKind.Function: return mItemKind.Function;
		case CompletionItemKind.Constructor: return mItemKind.Constructor;
		case CompletionItemKind.Field: return mItemKind.Field;
		case CompletionItemKind.Variable: return mItemKind.Variable;
		case CompletionItemKind.Class: return mItemKind.Class;
		case CompletionItemKind.Interface: return mItemKind.Interface;
		case CompletionItemKind.Module: return mItemKind.Module;
		case CompletionItemKind.Property: return mItemKind.Property;
		case CompletionItemKind.Unit: return mItemKind.Unit;
		case CompletionItemKind.Value: return mItemKind.Value;
		case CompletionItemKind.Enum: return mItemKind.Enum;
		case CompletionItemKind.Keyword: return mItemKind.Keyword;
		case CompletionItemKind.Snippet: return mItemKind.Snippet;
		case CompletionItemKind.Color: return mItemKind.Color;
		case CompletionItemKind.File: return mItemKind.File;
		case CompletionItemKind.Reference: return mItemKind.Reference;
	}
	return mItemKind.Property;
}
function toTextEdit(textEdit) {
	if (!textEdit) return;
	return {
		range: toRange(textEdit.range),
		text: textEdit.newText
	};
}
function toCommand(c) {
	return c && c.command === "editor.action.triggerSuggest" ? {
		id: c.command,
		title: c.title,
		arguments: c.arguments
	} : void 0;
}
function isMarkupContent(thing) {
	return thing && typeof thing === "object" && typeof thing.kind === "string";
}
function toMarkdownString(entry) {
	if (typeof entry === "string") return { value: entry };
	if (isMarkupContent(entry)) {
		if (entry.kind === "plaintext") return { value: entry.value.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&") };
		return { value: entry.value };
	}
	return { value: "```" + entry.language + "\n" + entry.value + "\n```\n" };
}
function toMarkedStringArray(contents) {
	if (!contents) return;
	if (Array.isArray(contents)) return contents.map(toMarkdownString);
	return [toMarkdownString(contents)];
}
function toDocumentHighlightKind(kind) {
	switch (kind) {
		case DocumentHighlightKind.Read: return languages.DocumentHighlightKind.Read;
		case DocumentHighlightKind.Write: return languages.DocumentHighlightKind.Write;
		case DocumentHighlightKind.Text: return languages.DocumentHighlightKind.Text;
	}
	return languages.DocumentHighlightKind.Text;
}
function toLocation(location) {
	return {
		uri: Uri.parse(location.uri),
		range: toRange(location.range)
	};
}
function toWorkspaceEdit(edit) {
	if (!edit || !edit.changes) return;
	let resourceEdits = [];
	for (let uri in edit.changes) {
		const _uri = Uri.parse(uri);
		for (let e of edit.changes[uri]) resourceEdits.push({
			resource: _uri,
			versionId: void 0,
			textEdit: {
				range: toRange(e.range),
				text: e.newText
			}
		});
	}
	return { edits: resourceEdits };
}
function isDocumentSymbol(symbol) {
	return "children" in symbol;
}
function toDocumentSymbol(symbol) {
	return {
		name: symbol.name,
		detail: symbol.detail ?? "",
		kind: toSymbolKind(symbol.kind),
		range: toRange(symbol.range),
		selectionRange: toRange(symbol.selectionRange),
		tags: symbol.tags ?? [],
		children: (symbol.children ?? []).map((item) => toDocumentSymbol(item))
	};
}
function toSymbolKind(kind) {
	let mKind = languages.SymbolKind;
	switch (kind) {
		case SymbolKind.File: return mKind.File;
		case SymbolKind.Module: return mKind.Module;
		case SymbolKind.Namespace: return mKind.Namespace;
		case SymbolKind.Package: return mKind.Package;
		case SymbolKind.Class: return mKind.Class;
		case SymbolKind.Method: return mKind.Method;
		case SymbolKind.Property: return mKind.Property;
		case SymbolKind.Field: return mKind.Field;
		case SymbolKind.Constructor: return mKind.Constructor;
		case SymbolKind.Enum: return mKind.Enum;
		case SymbolKind.Interface: return mKind.Interface;
		case SymbolKind.Function: return mKind.Function;
		case SymbolKind.Variable: return mKind.Variable;
		case SymbolKind.Constant: return mKind.Constant;
		case SymbolKind.String: return mKind.String;
		case SymbolKind.Number: return mKind.Number;
		case SymbolKind.Boolean: return mKind.Boolean;
		case SymbolKind.Array: return mKind.Array;
	}
	return mKind.Function;
}
function fromFormattingOptions(options) {
	return {
		tabSize: options.tabSize,
		insertSpaces: options.insertSpaces
	};
}
function toFoldingRangeKind(kind) {
	switch (kind) {
		case FoldingRangeKind.Comment: return languages.FoldingRangeKind.Comment;
		case FoldingRangeKind.Imports: return languages.FoldingRangeKind.Imports;
		case FoldingRangeKind.Region: return languages.FoldingRangeKind.Region;
	}
}
var DiagnosticsAdapter, CompletionAdapter, HoverAdapter, DocumentHighlightAdapter, DefinitionAdapter, ReferenceAdapter, RenameAdapter, DocumentSymbolAdapter, DocumentLinkAdapter, DocumentFormattingEditProvider, DocumentRangeFormattingEditProvider, DocumentColorAdapter, FoldingRangeAdapter, SelectionRangeAdapter;
var init_lspLanguageFeatures = __esmMin((() => {
	init_main();
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
	DiagnosticsAdapter = class {
		constructor(_languageId, _worker, configChangeEvent) {
			this._languageId = _languageId;
			this._worker = _worker;
			this._disposables = [];
			this._listener = /* @__PURE__ */ Object.create(null);
			const onModelAdd = (model) => {
				let modeId = model.getLanguageId();
				if (modeId !== this._languageId) return;
				let handle;
				this._listener[model.uri.toString()] = model.onDidChangeContent(() => {
					window.clearTimeout(handle);
					handle = window.setTimeout(() => this._doValidate(model.uri, modeId), 500);
				});
				this._doValidate(model.uri, modeId);
			};
			const onModelRemoved = (model) => {
				editor.setModelMarkers(model, this._languageId, []);
				let uriStr = model.uri.toString();
				let listener = this._listener[uriStr];
				if (listener) {
					listener.dispose();
					delete this._listener[uriStr];
				}
			};
			this._disposables.push(editor.onDidCreateModel(onModelAdd));
			this._disposables.push(editor.onWillDisposeModel(onModelRemoved));
			this._disposables.push(editor.onDidChangeModelLanguage((event) => {
				onModelRemoved(event.model);
				onModelAdd(event.model);
			}));
			this._disposables.push(configChangeEvent((_) => {
				editor.getModels().forEach((model) => {
					if (model.getLanguageId() === this._languageId) {
						onModelRemoved(model);
						onModelAdd(model);
					}
				});
			}));
			this._disposables.push({ dispose: () => {
				editor.getModels().forEach(onModelRemoved);
				for (let key in this._listener) this._listener[key].dispose();
			} });
			editor.getModels().forEach(onModelAdd);
		}
		dispose() {
			this._disposables.forEach((d) => d && d.dispose());
			this._disposables.length = 0;
		}
		_doValidate(resource, languageId) {
			this._worker(resource).then((worker) => {
				return worker.doValidation(resource.toString());
			}).then((diagnostics) => {
				const markers = diagnostics.map((d) => toDiagnostics(resource, d));
				let model = editor.getModel(resource);
				if (model && model.getLanguageId() === languageId) editor.setModelMarkers(model, languageId, markers);
			}).then(void 0, (err) => {
				console.error(err);
			});
		}
	};
	CompletionAdapter = class {
		constructor(_worker, _triggerCharacters) {
			this._worker = _worker;
			this._triggerCharacters = _triggerCharacters;
		}
		get triggerCharacters() {
			return this._triggerCharacters;
		}
		provideCompletionItems(model, position, context, token) {
			const resource = model.uri;
			return this._worker(resource).then((worker) => {
				return worker.doComplete(resource.toString(), fromPosition(position));
			}).then((info) => {
				if (!info) return;
				const wordInfo = model.getWordUntilPosition(position);
				const wordRange = new Range$1(position.lineNumber, wordInfo.startColumn, position.lineNumber, wordInfo.endColumn);
				const items = info.items.map((entry) => {
					const item = {
						label: entry.label,
						insertText: entry.insertText || entry.label,
						sortText: entry.sortText,
						filterText: entry.filterText,
						documentation: entry.documentation,
						detail: entry.detail,
						command: toCommand(entry.command),
						range: wordRange,
						kind: toCompletionItemKind(entry.kind)
					};
					if (entry.textEdit) {
						if (isInsertReplaceEdit(entry.textEdit)) item.range = {
							insert: toRange(entry.textEdit.insert),
							replace: toRange(entry.textEdit.replace)
						};
						else item.range = toRange(entry.textEdit.range);
						item.insertText = entry.textEdit.newText;
					}
					if (entry.additionalTextEdits) item.additionalTextEdits = entry.additionalTextEdits.map(toTextEdit);
					if (entry.insertTextFormat === InsertTextFormat.Snippet) item.insertTextRules = languages.CompletionItemInsertTextRule.InsertAsSnippet;
					return item;
				});
				return {
					isIncomplete: info.isIncomplete,
					suggestions: items
				};
			});
		}
	};
	HoverAdapter = class {
		constructor(_worker) {
			this._worker = _worker;
		}
		provideHover(model, position, token) {
			let resource = model.uri;
			return this._worker(resource).then((worker) => {
				return worker.doHover(resource.toString(), fromPosition(position));
			}).then((info) => {
				if (!info) return;
				return {
					range: toRange(info.range),
					contents: toMarkedStringArray(info.contents)
				};
			});
		}
	};
	DocumentHighlightAdapter = class {
		constructor(_worker) {
			this._worker = _worker;
		}
		provideDocumentHighlights(model, position, token) {
			const resource = model.uri;
			return this._worker(resource).then((worker) => worker.findDocumentHighlights(resource.toString(), fromPosition(position))).then((entries) => {
				if (!entries) return;
				return entries.map((entry) => {
					return {
						range: toRange(entry.range),
						kind: toDocumentHighlightKind(entry.kind)
					};
				});
			});
		}
	};
	DefinitionAdapter = class {
		constructor(_worker) {
			this._worker = _worker;
		}
		provideDefinition(model, position, token) {
			const resource = model.uri;
			return this._worker(resource).then((worker) => {
				return worker.findDefinition(resource.toString(), fromPosition(position));
			}).then((definition) => {
				if (!definition) return;
				return [toLocation(definition)];
			});
		}
	};
	ReferenceAdapter = class {
		constructor(_worker) {
			this._worker = _worker;
		}
		provideReferences(model, position, context, token) {
			const resource = model.uri;
			return this._worker(resource).then((worker) => {
				return worker.findReferences(resource.toString(), fromPosition(position));
			}).then((entries) => {
				if (!entries) return;
				return entries.map(toLocation);
			});
		}
	};
	RenameAdapter = class {
		constructor(_worker) {
			this._worker = _worker;
		}
		provideRenameEdits(model, position, newName, token) {
			const resource = model.uri;
			return this._worker(resource).then((worker) => {
				return worker.doRename(resource.toString(), fromPosition(position), newName);
			}).then((edit) => {
				return toWorkspaceEdit(edit);
			});
		}
	};
	DocumentSymbolAdapter = class {
		constructor(_worker) {
			this._worker = _worker;
		}
		provideDocumentSymbols(model, token) {
			const resource = model.uri;
			return this._worker(resource).then((worker) => worker.findDocumentSymbols(resource.toString())).then((items) => {
				if (!items) return;
				return items.map((item) => {
					if (isDocumentSymbol(item)) return toDocumentSymbol(item);
					return {
						name: item.name,
						detail: "",
						containerName: item.containerName,
						kind: toSymbolKind(item.kind),
						range: toRange(item.location.range),
						selectionRange: toRange(item.location.range),
						tags: []
					};
				});
			});
		}
	};
	DocumentLinkAdapter = class {
		constructor(_worker) {
			this._worker = _worker;
		}
		provideLinks(model, token) {
			const resource = model.uri;
			return this._worker(resource).then((worker) => worker.findDocumentLinks(resource.toString())).then((items) => {
				if (!items) return;
				return { links: items.map((item) => ({
					range: toRange(item.range),
					url: item.target
				})) };
			});
		}
	};
	DocumentFormattingEditProvider = class {
		constructor(_worker) {
			this._worker = _worker;
		}
		provideDocumentFormattingEdits(model, options, token) {
			const resource = model.uri;
			return this._worker(resource).then((worker) => {
				return worker.format(resource.toString(), null, fromFormattingOptions(options)).then((edits) => {
					if (!edits || edits.length === 0) return;
					return edits.map(toTextEdit);
				});
			});
		}
	};
	DocumentRangeFormattingEditProvider = class {
		constructor(_worker) {
			this._worker = _worker;
			this.canFormatMultipleRanges = false;
		}
		provideDocumentRangeFormattingEdits(model, range, options, token) {
			const resource = model.uri;
			return this._worker(resource).then((worker) => {
				return worker.format(resource.toString(), fromRange(range), fromFormattingOptions(options)).then((edits) => {
					if (!edits || edits.length === 0) return;
					return edits.map(toTextEdit);
				});
			});
		}
	};
	DocumentColorAdapter = class {
		constructor(_worker) {
			this._worker = _worker;
		}
		provideDocumentColors(model, token) {
			const resource = model.uri;
			return this._worker(resource).then((worker) => worker.findDocumentColors(resource.toString())).then((infos) => {
				if (!infos) return;
				return infos.map((item) => ({
					color: item.color,
					range: toRange(item.range)
				}));
			});
		}
		provideColorPresentations(model, info, token) {
			const resource = model.uri;
			return this._worker(resource).then((worker) => worker.getColorPresentations(resource.toString(), info.color, fromRange(info.range))).then((presentations) => {
				if (!presentations) return;
				return presentations.map((presentation) => {
					let item = { label: presentation.label };
					if (presentation.textEdit) item.textEdit = toTextEdit(presentation.textEdit);
					if (presentation.additionalTextEdits) item.additionalTextEdits = presentation.additionalTextEdits.map(toTextEdit);
					return item;
				});
			});
		}
	};
	FoldingRangeAdapter = class {
		constructor(_worker) {
			this._worker = _worker;
		}
		provideFoldingRanges(model, context, token) {
			const resource = model.uri;
			return this._worker(resource).then((worker) => worker.getFoldingRanges(resource.toString(), context)).then((ranges) => {
				if (!ranges) return;
				return ranges.map((range) => {
					const result = {
						start: range.startLine + 1,
						end: range.endLine + 1
					};
					if (typeof range.kind !== "undefined") result.kind = toFoldingRangeKind(range.kind);
					return result;
				});
			});
		}
	};
	SelectionRangeAdapter = class {
		constructor(_worker) {
			this._worker = _worker;
		}
		provideSelectionRanges(model, positions, token) {
			const resource = model.uri;
			return this._worker(resource).then((worker) => worker.getSelectionRanges(resource.toString(), positions.map(fromPosition))).then((selectionRanges) => {
				if (!selectionRanges) return;
				return selectionRanges.map((selectionRange) => {
					const result = [];
					while (selectionRange) {
						result.push({ range: toRange(selectionRange.range) });
						selectionRange = selectionRange.parent;
					}
					return result;
				});
			});
		}
	};
}));
//#endregion
export { init_lspLanguageFeatures as _, DocumentFormattingEditProvider as a, DocumentRangeFormattingEditProvider as c, HoverAdapter as d, ReferenceAdapter as f, fromRange as g, fromPosition as h, DocumentColorAdapter as i, DocumentSymbolAdapter as l, SelectionRangeAdapter as m, DefinitionAdapter as n, DocumentHighlightAdapter as o, RenameAdapter as p, DiagnosticsAdapter as r, DocumentLinkAdapter as s, CompletionAdapter as t, FoldingRangeAdapter as u, toRange as v, toTextEdit as y };
