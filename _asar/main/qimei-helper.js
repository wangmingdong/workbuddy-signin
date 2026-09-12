//#region src/main/features/telemetry/qimei-helper.ts
function isValidQimei36(value) {
	return typeof value === "string" && value.length > 0;
}
function writeResult(result) {
	return new Promise((resolve) => {
		process.stdout.write(`${JSON.stringify(result)}\n`, () => resolve());
	});
}
function redirectConsoleToStderr() {
	console.log = (...args) => console.error(...args);
	console.info = (...args) => console.error(...args);
	console.debug = (...args) => console.error(...args);
}
function loadQimeiSdk() {
	const mod = process.platform === "win32" ? require("@tencent/qimei-node/src/win/index") : require("@tencent/qimei-node/src/mac/index");
	return mod.default ?? mod;
}
async function main() {
	redirectConsoleToStderr();
	const appKey = process.env.WORKBUDDY_QIMEI_APP_KEY?.trim() ?? "";
	if (!appKey) {
		await writeResult({
			ok: false,
			error: "appKey missing"
		});
		return;
	}
	const qimei36 = await new (loadQimeiSdk())({
		appKey,
		dllPath: process.env.WORKBUDDY_QIMEI_DLL_PATH?.trim() ?? ""
	}).getQimei36();
	if (isValidQimei36(qimei36)) {
		await writeResult({
			ok: true,
			qimei36
		});
		return;
	}
	await writeResult({
		ok: false,
		error: "qimei36 empty"
	});
}
main().catch((error) => writeResult({
	ok: false,
	error: error instanceof Error ? error.message : String(error)
})).finally(() => process.exit(0));
//#endregion
