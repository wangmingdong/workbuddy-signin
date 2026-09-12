#!/usr/bin/env python3
"""
Expert Packager - Validates and packages an expert directory into a zip file.

Usage:
    package_expert.py <path/to/expert-dir> [output-dir]

Example:
    python3 package_expert.py plugins/my-expert
    python3 package_expert.py plugins/my-expert ./dist

Safety:
    - Files under output-dir are excluded from the package, so an output-dir
      inside the expert directory will not be zipped into itself.
    - output-dir must not be the expert directory itself.
    - Packaging aborts after 30 seconds or when the package exceeds 2GB, and
      removes the incomplete zip file.
"""

import sys
import time
import zipfile
from pathlib import Path

MAX_PACKAGE_BYTES = 2 * 1024 * 1024 * 1024
MAX_PACKAGE_SECONDS = 30
ALLOWED_HIDDEN_PATH = '.codebuddy-plugin'
EXCLUDED_DIRECTORY_NAMES = {'__pycache__', 'node_modules'}
EXCLUDED_ROOT_DIRECTORY_NAMES = {'dist'}
EXCLUDED_FILE_NAMES = {'.gitkeep', '.DS_Store', 'Thumbs.db'}

# Import validate_expert from sibling script
script_dir = Path(__file__).parent
sys.path.insert(0, str(script_dir))
from validate_expert import validate_expert


def is_path_under(path, parent):
    try:
        path.relative_to(parent)
        return True
    except ValueError:
        return False


def should_exclude_relative_path(relative_path):
    parts = relative_path.parts
    has_disallowed_hidden_path = any(
        part.startswith('.') and part != ALLOWED_HIDDEN_PATH
        for part in parts
    )
    if has_disallowed_hidden_path:
        return True

    if parts and parts[0] in EXCLUDED_ROOT_DIRECTORY_NAMES:
        return True

    if any(part in EXCLUDED_DIRECTORY_NAMES for part in parts):
        return True

    return relative_path.name in EXCLUDED_FILE_NAMES


def package_expert(expert_path, output_dir=None):
    """
    Validate and package an expert directory into a .zip file.

    Args:
        expert_path: Path to the expert directory
        output_dir: Optional output directory (defaults to current directory).
            Files under this directory are excluded from the package.

    Returns:
        Path to the created zip file, or None if error
    """
    expert_path = Path(expert_path).resolve()

    if not expert_path.exists():
        print(f"❌ Error: Expert directory not found: {expert_path}")
        return None

    if not expert_path.is_dir():
        print(f"❌ Error: Path is not a directory: {expert_path}")
        return None

    # Validate first
    print("🔍 Validating expert package...\n")
    result = validate_expert(expert_path)
    print(result.summary())

    if not result.is_valid:
        print("\n❌ Packaging aborted. Please fix validation errors first.")
        return None

    print()

    # Determine output location
    expert_name = expert_path.name
    if output_dir:
        output_path = Path(output_dir).resolve()
        output_path.mkdir(parents=True, exist_ok=True)
    else:
        output_path = Path.cwd()

    zip_filename = output_path / f"{expert_name}.zip"

    if output_path == expert_path:
        print("❌ Error: Output directory must not be the expert directory itself.")
        return None

    # Create the zip file
    try:
        file_count = 0
        started_at = time.monotonic()
        with zipfile.ZipFile(zip_filename, 'w', zipfile.ZIP_DEFLATED) as zip_file:
            for file_path in sorted(expert_path.rglob('*')):
                if not file_path.is_file():
                    continue

                resolved_file = file_path.resolve()
                if is_path_under(resolved_file, output_path):
                    continue

                if time.monotonic() - started_at > MAX_PACKAGE_SECONDS:
                    raise TimeoutError(f"Packaging exceeded {MAX_PACKAGE_SECONDS}s limit")

                if resolved_file.stat().st_size > MAX_PACKAGE_BYTES:
                    raise ValueError(f"File too large to package: {resolved_file}")

                rel = file_path.relative_to(expert_path)
                if should_exclude_relative_path(rel):
                    continue

                arcname = str(Path(expert_name) / rel)
                zip_file.write(file_path, arcname)
                if zip_file.fp and zip_file.fp.tell() > MAX_PACKAGE_BYTES:
                    raise ValueError(f"Package exceeded {MAX_PACKAGE_BYTES // (1024 * 1024)}MB limit")
                print(f"  📄 {arcname}")
                file_count += 1

        print(f"\n✅ Packaged {file_count} files to: {zip_filename}")
        print(f"   Size: {zip_filename.stat().st_size / 1024:.1f} KB")
        return zip_filename

    except Exception as e:
        if zip_filename.exists():
            zip_filename.unlink()
        print(f"❌ Error creating zip: {e}")
        return None


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 package_expert.py <path/to/expert-dir> [output-dir]")
        print("\nExample:")
        print("  python3 package_expert.py plugins/my-expert")
        print("  python3 package_expert.py plugins/my-expert ./dist")
        print("\nNotes:")
        print("  - Files under output-dir are excluded from the zip package.")
        print("  - output-dir must not be the expert directory itself.")
        print("  - Packaging aborts after 30 seconds or when the package exceeds 2GB.")
        sys.exit(1)

    expert_path = sys.argv[1]
    output_dir = sys.argv[2] if len(sys.argv) > 2 else None

    print(f"📦 Packaging expert: {expert_path}")
    if output_dir:
        print(f"   Output directory: {output_dir}")
    print()

    result = package_expert(expert_path, output_dir)

    if result:
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == "__main__":
    main()
