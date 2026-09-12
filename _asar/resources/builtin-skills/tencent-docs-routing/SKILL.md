---
name: tencent-docs-routing
description: Load this Skill before handling local Office/WPS files such as doc/docx/dot/wps/wpt, xls/xlsx/xlt/csv/tsv, or ppt/pptx/pps/pot, and before creating a new local document, spreadsheet, or presentation. Load first whenever the user uploads, mentions, previews, edits, or asks to create such a local file, to decide whether to use the local office editing Skill, the local spreadsheet agent, or the PPT generation Skill. Text-based outputs such as speech scripts, talking points, copywriting, summaries, reports, or meeting minutes should default to local DOCX unless the user explicitly specifies another local format such as markdown or plain text. Other file types are out of scope.
author: Tencent Docs
version: "0.1.0"
---

# Local Office/WPS Routing

> **This is the gate you MUST read before handling local Office/WPS files — doc/docx/dot/wps/wpt, xls/xlsx/xlt/csv/tsv, or ppt/pptx/pps/pot — AND before generating/creating any new local document, spreadsheet, or presentation.** This Skill only describes local file operations. It routes **content** work only — reading a document's content into context, editing, creating, transforming, and the like. Simply opening, previewing, or presenting a document for the user to *view* is the host's preview/present surface, not content work — call the host preview/present tool directly instead of routing it through this Skill.

## Host document context

The host injects a `<tencent_docs_editor_context>` block that surfaces local documents (e.g. `<active_document type="local" .../>`, `<local_files>`). Route each surfaced document by the file-type rules below.

If the context block already injected a `file_id` for a document, follow the **Injected `file_id`** rule in [file_id resolution](#file_id-resolution-local-documents).

## Supported Local Formats

Use these extensions to decide whether this routing Skill applies:

| Type | Supported local file extensions |
|---|---|
| doc | `.doc` `.dot` `.wps` `.wpt` `.docx` `.dotx` `.docm` `.dotm` |
| sheet | `.xls` `.xlt` `.xlsx` `.xltx` `.xlsm` `.xltm` `.csv` `.tsv` |
| slide | `.ppt` `.pps` `.pot` `.pptx` `.ppsx` `.potx` `.pptm` `.ppsm` `.potm` |

Macro-enabled files (`.docm` `.dotm` `.xlsm` `.xltm` `.pptm` `.ppsm` `.potm`) can be opened as their corresponding doc/sheet/slide type, but macros are not executed. WPS-specific `.et` `.ett` `.dps` `.dpt` are not supported; ask the user to save them as `.xlsx` or `.pptx` first.

## New Local File Creation

When the user asks to **generate / create / produce** a new document, spreadsheet, or presentation, produce a local Office/WPS-type file and route by file type.

### Format classification (prerequisite step)

When the output the user requests is essentially structured textual content — such as speech scripts, talking points, copywriting, summaries, reports, or meeting minutes — always classify it as a doc first, then apply the local DOCX creation path.
Do not default to Markdown or plain text.
Only when the user explicitly specifies another local non-DOCX format (e.g. "generate markdown" or "plain text is fine") is this rule overridden.
This rule does not affect outputs that clearly belong to sheet (e.g. "make a spreadsheet") or ppt (e.g. "make a PPT").

## Existing Local Documents

> Note: This section applies to **existing local** documents that need to be read or edited. For **new** document creation, see "New Local File Creation" above.

Every task resolves by file type and task nature:

1. **Local doc/slide single-file edits** → load the **`tencent-local-office-edit`** Skill and operate through it.
2. **Local PPT creation from source materials** → use the **`tencent-pptx`** Skill.
3. **Local spreadsheet tasks** → follow the sheet routing rules below.

## Creating a new PPT from source materials

When the user's intent is to create a new PPT based on source materials (e.g. DOCX, XLSX, PPT, PDF, etc.), strictly use the `tencent-pptx` Skill. This Skill has efficient built-in material parsing and processing capabilities; avoid parsing those materials by any other means.

## Sheet Files (spreadsheets)

Resolve local sheet tasks by task nature. The `tencent-local-office-edit` Skill is allowed only for single-call, semantically unambiguous operations; complex or data-dependent local tasks MUST use `tencent-docs-sheetagent`.

**Decide from the request TEXT alone, never from the data.** Apply this one test to the user's wording:

> Can the request, exactly as written, be completed by **one** MCP call whose target (cell/range address) the user already named explicitly?

- **Yes** → operate through the `tencent-local-office-edit` Skill.
- **Other sheet content work** → `tencent-docs-sheetagent`. No deliberation, no investigation.

Match the work to the tool:

| Route here | When the local sheet task is |
|------------|------------------|
| `tencent-local-office-edit` Skill | A semantically unambiguous read/write completing in a **single API call** — e.g. reading one specific cell/range, or writing a value to one explicitly identified cell (operate through the Skill) |
| `tencent-docs-sheetagent` | Data analysis · aggregation · pivot · stats, cross-sheet linkage, formula building, data cleaning, conditional formatting across ranges, or anything needing you to understand the data before deciding how to edit. For these local tasks, use `tencent-docs-sheetagent`; do not handle them through the `tencent-local-office-edit` Skill |

For local sheet files, the `tencent-local-office-edit` Skill is a narrow route, not the default. If you would need ANY information from the file to answer the routing test above — what the data looks like, where it ends, what a previous edit did, why something renders wrong — the answer is already `tencent-docs-sheetagent`: reading data "to understand the problem before deciding" IS the data-dependence test failing. Diagnosis, comparison, and verification are the subagent's job, exactly like data discovery — they are not part of routing. Delegating means **invoking the `tencent-docs-sheetagent` skill first** — call the Skill tool with the name `tencent-docs-sheetagent` — and spawning the `sheet-agent` subagent only as it instructs; do **not** spawn `sheet-agent` directly, even though the subagent is visible on the Agent tool. `tencent-docs-sheetagent` counts as unavailable **only** if that Skill call itself fails with a not-found / unknown-skill error; only then fall back to the `tencent-local-office-edit` Skill.

**Atomic sheetagent delegation:** For one user request, if a local sheet task should enter `tencent-docs-sheetagent`, hand it the entire spreadsheet task — do not split the request by doing preparatory reads, partial writes, chart setup, formatting, or cleanup through the `tencent-local-office-edit` Skill and then delegating only the remaining work. The only local calls allowed before delegating are the ones [file_id resolution](#file_id-resolution-local-documents) needs — nothing that touches document content; a brand-new spreadsheet with no source file follows the **brand-new document** rule there instead. Once `tencent-docs-sheetagent` is the route (or even a candidate), resolve the `file_id`, then **invoke the `tencent-docs-sheetagent` skill and follow its delegation contract** — do not spawn the `sheet-agent` subagent directly — forwarding the resolved `file_id`, the absolute path, and the user's request verbatim; the subagent only consumes a live `file_id` and must not open files or resolve paths itself. If the task involves another spreadsheet (e.g. comparing with, or restoring formats from, an original file), resolve that file's `file_id` the same way and pass **both** ids with their paths — do not read or inspect either file's content yourself. Saving after the subagent finishes stays with you, not the subagent — per the `tencent-local-office-edit` flow. Use the `tencent-local-office-edit` Skill only when the whole request is a single-call, unambiguous operation, or when `tencent-docs-sheetagent` is unavailable.

Between resolving the `file_id` and delegating, make **no other** local call. Do not call `sheet_get_sheet_info`, do not read cells or ranges, do not pre-locate the data, and do not "look at the data first to understand it" — data discovery (sheets, headers, ranges) is the subagent's job, and any pre-reading splits the task (see [Atomic sheetagent delegation](#sheet-files-spreadsheets) above). If a plan you formed before reading this Skill included "read the data, then delegate", drop the read step. If the subagent rejects the `file_id` you passed, re-check it per [file_id resolution](#file_id-resolution-local-documents) and re-delegate; do **not** switch to reading the data yourself.

### Examples

> These illustrate the *pattern* — judge a request by which description fits, not by whether its wording matches an example.

**Examples → local `tencent-local-office-edit` Skill**
- Read a named cell or range — e.g. "Read A1", "Read the range A1:D10"
- Write a value into one named cell, or format a named cell — e.g. "Set B2 to 100", "Bold A1"

**Examples → local `tencent-docs-sheetagent`**
- **Any** chart or pivot-table create or edit — e.g. "Create a chart from this data", "Build a pivot table"; it always requires reading the source data first.
- An edit whose target or range depends on the data — e.g. "Update the price for a given row"; you must locate the row by its content first.
- Targets that must be found by scanning — e.g. "Delete the empty rows".
- Ambiguous scope that needs judgment — e.g. "Clean up this table".
- Layout restructuring — e.g. "Move this column"; it needs to read the current structure first.

## file_id resolution (local documents)

`file_id` identifies an open local editor instance — it always comes from the **`tencent-local-office-edit`** Skill's entry tools (`get_pool_status`, `open_file`, `create_*`); never invent one from a path or filename. This section only fixes **when** each entry applies; the calling style, workflow, and error handling are owned by that Skill's own documentation.

- **Injected `file_id`** — if the context block already injected one (e.g. `<active_document type="local" ... file_id="..."/>`), use it directly. The document already has a live host-owned editor/preview instance — do **not** reopen or re-present it.
- **Existing file, no injected id** — resolve it through the `tencent-local-office-edit` Skill's documented flow (`get_pool_status` to find an already-open instance, `open_file` otherwise), then do the content work through that Skill.
- **Brand-new document (no file on disk yet)** — there is nothing to resolve; do **not** call `get_pool_status` / `open_file` on a path that does not exist. Creating the file and its first save are owned by the routed Skill (e.g. `tencent-pptx`) or the host's create flow; once the file exists on disk, re-enter here for any subsequent edit.

## Showing a document to the user (preview)

Previewing is the **host's preview surface**, not a content channel and not part of [file_id resolution](#file_id-resolution-local-documents). Present a local document to the user, per the host's preview instructions, whenever they should see it:

- **After creating a new local document** through a routed Skill (e.g. `tencent-pptx`, `tencent-docs-sheetagent`), open it so the user can immediately see and work with the result.
- **After finishing edits** on a document that is not already visible to the user, once it is saved.

Do **not** re-preview a document the context block already injected with a live `file_id`: it already has a host-owned preview instance.
