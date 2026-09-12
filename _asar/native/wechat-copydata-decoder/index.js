'use strict';

// Load the compiled N-API addon. Rebuild lives in build/Release, produced by
// @electron/rebuild against the current Electron ABI. See ./README.md.

const path = require('node:path');

let binding;
let loadError;
try {
    // eslint-disable-next-line node/no-missing-require
    binding = require(path.join(__dirname, 'build', 'Release', 'wechat_copydata_decoder.node'));
} catch (error) {
    loadError = error;
    binding = null;
}

function isSupported() {
    return process.platform === 'win32' && binding != null;
}

function getLoadError() {
    return loadError ? String(loadError.message || loadError) : null;
}

function readCopyDataPayload(lParam) {
    if (!binding) {
        throw new Error(
            'wechat-copydata-decoder native binding unavailable: ' + getLoadError(),
        );
    }
    return binding.readCopyDataPayload(lParam);
}

function getPointerSize() {
    if (!binding) {return process.arch === 'ia32' ? 4 : 8;}
    return binding.getPointerSize();
}

module.exports = {
    isSupported,
    getLoadError,
    readCopyDataPayload,
    getPointerSize,
};
