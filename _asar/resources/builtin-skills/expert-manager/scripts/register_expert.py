#!/usr/bin/env python3
"""
Expert Register - Validates and registers an expert into marketplace.json

This script should be called AFTER the expert package is fully created and validated.
Only registered experts will be visible in the WorkBuddy expert center.

Usage:
    register_expert.py <expert-dir> [--marketplace-dir <marketplace-dir>] [--session-id <session-id>]

Examples:
    python3 register_expert.py <expert-dir>
    python3 register_expert.py ./my-expert --marketplace-dir <marketplace-dir>
    python3 register_expert.py ./my-expert --session-id abc-123
"""

import sys
import json
import os
from pathlib import Path
from typing import Optional, List, Tuple


def get_expert_base_dir():
    """获取专家 marketplace 根目录，优先读取 WORKBUDDY_CONFIG_DIR 环境变量。"""
    config_dir = os.environ.get('WORKBUDDY_CONFIG_DIR', '').strip()
    if not config_dir:
        config_dir = str(Path.home() / '.workbuddy')
    return Path(config_dir) / 'plugins' / 'marketplaces' / 'my-experts'


def find_plugin_json(expert_dir: Path) -> Optional[Path]:
    """Find plugin.json in the expert directory."""
    for meta_dir in ['.codebuddy-plugin', '.workbuddy-plugin']:
        candidate = expert_dir / meta_dir / 'plugin.json'
        if candidate.exists():
            return candidate
    return None


def validate_expert_completeness(expert_dir: Path) -> Tuple[bool, List[str]]:
    """
    Validate that the expert package is complete and ready for registration.
    Returns (is_valid, list_of_errors).
    """
    errors = []

    # 1. Check plugin.json exists
    plugin_json_path = find_plugin_json(expert_dir)
    if not plugin_json_path:
        errors.append("Missing plugin.json (checked .codebuddy-plugin/ and .workbuddy-plugin/)")
        return False, errors

    # 2. Parse plugin.json
    try:
        with open(plugin_json_path, 'r', encoding='utf-8') as f:
            plugin_data = json.load(f)
    except json.JSONDecodeError as e:
        errors.append(f"plugin.json is not valid JSON: {e}")
        return False, errors

    # 3. Check required fields are not [TODO]
    required_fields = ['name', 'description', 'expertType']
    for field in required_fields:
        value = plugin_data.get(field, '')
        if not value or '[TODO' in str(value):
            errors.append(f"Field '{field}' is missing or contains [TODO] placeholder")

    # 4. Check displayName is filled
    display_name = plugin_data.get('displayName', {})
    if isinstance(display_name, dict):
        zh_name = display_name.get('zh', '')
        en_name = display_name.get('en', '')
        if (not zh_name or '[TODO' in zh_name) and (not en_name or '[TODO' in en_name):
            errors.append("displayName (zh or en) is missing or contains [TODO]")
    elif not display_name or '[TODO' in str(display_name):
        errors.append("displayName is missing or contains [TODO]")

    # 5. Check agents directory has at least one non-template .md file
    agents_dir = expert_dir / 'agents'
    if agents_dir.exists():
        md_files = list(agents_dir.glob('*.md'))
        if not md_files:
            errors.append("No .md files found in agents/ directory")
        else:
            # Check at least one agent file has real content (not all [TODO])
            has_real_content = False
            for md_file in md_files:
                content = md_file.read_text(encoding='utf-8')
                # Count [TODO] occurrences - if more than 3, likely still a template
                todo_count = content.count('[TODO')
                if todo_count <= 2:
                    has_real_content = True
                    break
            if not has_real_content:
                errors.append("All agent .md files still contain many [TODO] placeholders")
    else:
        errors.append("Missing agents/ directory")

    return len(errors) == 0, errors


def _write_session_marker(expert_dir: Path, session_id: str) -> None:
    """Write .created-by-session marker file into the expert directory."""
    marker_path = expert_dir / '.created-by-session'
    try:
        marker_path.write_text(session_id, encoding='utf-8')
    except OSError as e:
        print(f"⚠️ Warning: could not write session marker: {e}")


def get_marketplace_dir(expert_dir: Path, explicit_marketplace_dir: Optional[str]) -> Path:
    """Determine the marketplace directory."""
    if explicit_marketplace_dir:
        return Path(explicit_marketplace_dir).expanduser().resolve()

    # Infer from expert_dir path: .../marketplaces/my-experts/plugins/<name>
    # -> marketplace dir is .../marketplaces/my-experts/
    parts = expert_dir.parts
    try:
        plugins_idx = len(parts) - 2  # parent of expert dir should be "plugins"
        if parts[plugins_idx] == 'plugins':
            return Path(*parts[:plugins_idx])
    except (IndexError, ValueError):
        pass

    # Fallback to default
    return get_expert_base_dir()


def register_expert(expert_dir: Path, marketplace_dir: Path, session_id: Optional[str] = None) -> bool:
    """Register the expert in marketplace.json."""
    manifest_path = marketplace_dir / '.codebuddy-plugin' / 'marketplace.json'

    # Read existing manifest or create new one
    if manifest_path.exists():
        with open(manifest_path, 'r', encoding='utf-8') as f:
            manifest = json.load(f)
    else:
        # Create marketplace directory structure if needed
        manifest_path.parent.mkdir(parents=True, exist_ok=True)
        manifest = {
            "name": "my-experts",
            "description": "my-experts marketplace (auto-generated)",
            "plugins": []
        }

    # Read expert plugin.json for metadata
    plugin_json_path = find_plugin_json(expert_dir)
    if not plugin_json_path:
        print(f"❌ Error: plugin.json not found in {expert_dir}")
        return False
    with open(plugin_json_path, 'r', encoding='utf-8') as f:
        plugin_data = json.load(f)

    expert_name = plugin_data.get('name', expert_dir.name)
    expert_description = plugin_data.get('description', '')
    source = f"./plugins/{expert_dir.name}"

    # Check if already registered
    plugins = manifest.get('plugins', [])
    for p in plugins:
        if p.get('source') == source or p.get('name') == expert_name:
            # Update existing entry
            p['name'] = expert_name
            p['source'] = source
            p['description'] = expert_description
            if session_id:
                _write_session_marker(expert_dir, session_id)
            print(f"✅ Updated existing registration for '{expert_name}' in marketplace.json")
            with open(manifest_path, 'w', encoding='utf-8') as f:
                json.dump(manifest, f, indent=2, ensure_ascii=False)
            return True

    # Add new entry
    plugins.append({
        "name": expert_name,
        "source": source,
        "description": expert_description
    })
    manifest['plugins'] = plugins

    if session_id:
        _write_session_marker(expert_dir, session_id)

    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2, ensure_ascii=False)

    print(f"✅ Registered '{expert_name}' in marketplace.json")
    return True


def main():
    if len(sys.argv) < 2:
        print("Usage: register_expert.py <expert-dir> [--marketplace-dir <marketplace-dir>]")
        print("\nExamples:")
        print("  python3 register_expert.py <expert-dir>")
        print("  python3 register_expert.py ./my-expert --marketplace-dir <marketplace-dir>")
        sys.exit(1)

    expert_dir = Path(sys.argv[1]).expanduser().resolve()
    marketplace_dir_arg = None
    session_id_arg = None

    i = 2
    while i < len(sys.argv):
        if sys.argv[i] == '--marketplace-dir' and i + 1 < len(sys.argv):
            marketplace_dir_arg = sys.argv[i + 1]
            i += 2
        elif sys.argv[i] == '--session-id' and i + 1 < len(sys.argv):
            session_id_arg = sys.argv[i + 1]
            i += 2
        else:
            i += 1

    # Validate expert directory exists
    if not expert_dir.exists():
        print(f"❌ Error: expert directory does not exist: {expert_dir}")
        sys.exit(1)

    # Validate completeness
    print(f"🔍 Validating expert package: {expert_dir.name}")
    is_valid, errors = validate_expert_completeness(expert_dir)

    if not is_valid:
        print(f"\n❌ Expert package is incomplete. Cannot register.")
        print("   Issues found:")
        for err in errors:
            print(f"   - {err}")
        print("\n   Please fix the above issues and try again.")
        sys.exit(1)

    print("   ✅ Validation passed")

    # Determine marketplace directory
    marketplace_dir = get_marketplace_dir(expert_dir, marketplace_dir_arg)
    print(f"📋 Marketplace: {marketplace_dir}")

    # Register
    success = register_expert(expert_dir, marketplace_dir, session_id_arg)
    if success:
        print(f"\n🎉 Expert '{expert_dir.name}' is now registered and visible in WorkBuddy!")
    else:
        print(f"\n❌ Registration failed")
        sys.exit(1)


if __name__ == "__main__":
    main()
