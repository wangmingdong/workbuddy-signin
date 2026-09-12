const require_chunk = require("./chunk.js");
let better_sqlite3 = require("better-sqlite3");
better_sqlite3 = require_chunk.__toESM(better_sqlite3);
//#region ../../packages/workbuddy-server/src/storage/sqlite/readonly.ts
function openReadonlySqliteDatabase(dbPath) {
	return new better_sqlite3.default(dbPath, {
		readonly: true,
		fileMustExist: true
	});
}
function queryReadonlySqliteValue(dbPath, sql, ...params) {
	const db = openReadonlySqliteDatabase(dbPath);
	try {
		return db.prepare(sql).get(...params);
	} finally {
		db.close();
	}
}
//#endregion
Object.defineProperty(exports, "openReadonlySqliteDatabase", {
	enumerable: true,
	get: function() {
		return openReadonlySqliteDatabase;
	}
});
Object.defineProperty(exports, "queryReadonlySqliteValue", {
	enumerable: true,
	get: function() {
		return queryReadonlySqliteValue;
	}
});
