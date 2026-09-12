# genie-safe-delete bash environment — sourced via BASH_ENV for every bash subprocess.
# Defines rm/unlink/rmdir wrappers to intercept shell delete commands and move to OS trash.
if [ -n "${CODEBUDDY_SAFE_DELETE_BIN_DIR:-}" ]; then
    rm() { "${CODEBUDDY_SAFE_DELETE_BIN_DIR}/rm" "$@"; }
    unlink() { "${CODEBUDDY_SAFE_DELETE_BIN_DIR}/unlink" "$@"; }
    rmdir() { "${CODEBUDDY_SAFE_DELETE_BIN_DIR}/rmdir" "$@"; }
    export -f rm unlink rmdir
fi
