"""
Phase G Migration — Script 2: Middleware + next.config
=====================================================================
RUN FROM star-food PROJECT ROOT:
  python 02_middleware_and_config.py

WHAT IT DOES:
  1. Replaces src/middleware.ts with next-intl middleware (proxy.ts)
  2. Wraps next.config with createNextIntlPlugin
  3. Backs up original files

MODIFIES: src/middleware.ts (renamed to proxy.ts), next.config.ts/js
"""

import os
import shutil
import subprocess
import sys

PROJECT_ROOT = os.getcwd()


def check_project():
    if not os.path.exists("package.json"):
        print("❌ Run from star-food root!")
        sys.exit(1)
    # Verify next-intl installed
    import json
    with open("package.json") as f:
        pkg = json.load(f)
    if "next-intl" not in pkg.get("dependencies", {}):
        print("❌ next-intl not installed. Run Script 1 first!")
        sys.exit(1)
    print("✅ Project verified, next-intl installed")


def backup_file(path):
    if os.path.exists(path):
        backup = path + ".backup"
        shutil.copy2(path, backup)
        print(f"   💾 Backup: {path} → {backup}")
        return True
    return False


def write_file(path, content, description):
    full_path = os.path.join(PROJECT_ROOT, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w") as f:
        f.write(content)
    print(f"   ✅ Written: {path} — {description}")


def main():
    print("=" * 60)
    print("🚀 Phase G — Script 2: Middleware + next.config")
    print("=" * 60)

    check_project()

    # ============================================================
    # 1. Replace middleware with next-intl version
    # ============================================================
    print("\n📂 1. Replacing middleware...")

    # In Next.js 16, middleware.ts still works (proxy.ts is the new name)
    # We'll keep it as middleware.ts for now since that's what exists
    # next-intl createMiddleware works with both names

    old_mw = "src/middleware.ts"
    if os.path.exists(old_mw):
        backup_file(old_mw)

    write_file("src/middleware.ts", '''// src/middleware.ts — next-intl locale routing middleware
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  // Geo-restriction: UA users can't see /ru/, RU users can't see /ua/
  const country = request.headers.get("x-vercel-ip-country");
  const pathname = request.nextUrl.pathname;

  if (country === "UA" && pathname.startsWith("/ru")) {
    const newPath = "/ua" + pathname.slice(3);
    return NextResponse.redirect(new URL(newPath, request.url));
  }
  if (country === "RU" && pathname.startsWith("/ua")) {
    const newPath = "/ru" + pathname.slice(3);
    return NextResponse.redirect(new URL(newPath, request.url));
  }

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files, API routes, etc.
    "/((?!api|_next|_vercel|gallery|favicon|robots|sitemap|google|og-|images|icons|fonts|manifest|.*\\\\..*).*)",
  ],
};
''', "next-intl middleware with geo-restriction")

    # ============================================================
    # 2. Update next.config with next-intl plugin
    # ============================================================
    print("\n📂 2. Updating next.config...")

    config_file = None
    for name in ["next.config.ts", "next.config.js", "next.config.mjs"]:
        if os.path.exists(name):
            config_file = name
            break

    if not config_file:
        print("   ❌ No next.config found!")
        sys.exit(1)

    backup_file(config_file)

    with open(config_file, "r") as f:
        config_content = f.read()

    if "createNextIntlPlugin" in config_content:
        print(f"   ℹ️  {config_file} already has next-intl plugin — skipping")
    else:
        # Wrap existing config with next-intl plugin
        # Detect if it's TS or JS
        is_ts = config_file.endswith(".ts")

        # Find the export pattern
        if "export default" in config_content:
            # TypeScript style: export default { ... }
            # or: const config = { ... }; export default config;

            # Strategy: add import at top, wrap export at bottom
            import_line = 'import createNextIntlPlugin from "next-intl/plugin";\n\n'

            if import_line.strip().split("\n")[0] in config_content:
                print("   ℹ️  Import already exists")
            else:
                # Add import at the very top (after any existing imports)
                lines = config_content.split("\n")
                insert_idx = 0
                for i, line in enumerate(lines):
                    if line.startswith("import ") or line.startswith("const ") or line.startswith("//"):
                        continue
                    else:
                        insert_idx = i
                        break

                # Simple approach: prepend import, wrap the default export
                new_content = import_line + config_content

                # Replace "export default nextConfig" or similar with wrapped version
                # Common patterns:
                # export default nextConfig;
                # export default config;
                # module.exports = nextConfig;

                import re

                # Pattern: export default <varname>;
                match = re.search(r'export default (\w+);', new_content)
                if match:
                    var_name = match.group(1)
                    old_export = match.group(0)
                    new_export = f"""const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
export default withNextIntl({var_name});"""
                    new_content = new_content.replace(old_export, new_export)
                    print(
                        f"   ✅ Wrapped export default {var_name} with withNextIntl()")
                else:
                    # Pattern: export default { ... }
                    # More complex — add a variable
                    print("   ⚠️  Could not auto-detect export pattern")
                    print(f"   📝 Add manually to {config_file}:")
                    print(f'      import createNextIntlPlugin from "next-intl/plugin";')
                    print(
                        f'      const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");')
                    print(
                        f"      // Then wrap: export default withNextIntl(yourConfig);")
                    new_content = None

                if new_content:
                    with open(config_file, "w") as f:
                        f.write(new_content)
                    print(f"   ✅ Updated: {config_file}")

        elif "module.exports" in config_content:
            # CommonJS style
            import_line = 'const createNextIntlPlugin = require("next-intl/plugin");\n'
            new_content = import_line + config_content

            import re
            match = re.search(r'module\.exports\s*=\s*(\w+)', new_content)
            if match:
                var_name = match.group(1)
                old_export = match.group(0)
                new_export = f'const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");\nmodule.exports = withNextIntl({var_name})'
                new_content = new_content.replace(old_export, new_export)

                with open(config_file, "w") as f:
                    f.write(new_content)
                print(f"   ✅ Updated: {config_file}")

    # ============================================================
    # 3. Git commit
    # ============================================================
    print("\n📝 Creating git commit...")
    subprocess.run(["git", "add", "-A"], capture_output=True)
    result = subprocess.run(
        ["git", "commit", "-m",
            "feat(phase-g): replace middleware with next-intl + update next.config"],
        capture_output=True, text=True
    )
    if result.returncode == 0:
        print("   ✅ Committed")
    else:
        print(f"   ⚠️  {result.stdout.strip()}")

    # ============================================================
    # Summary
    # ============================================================
    print("\n" + "=" * 60)
    print("✅ Script 2 Complete!")
    print("=" * 60)
    print("\nModified files:")
    print("  • src/middleware.ts — next-intl middleware (backup saved)")
    print(f"  • {config_file} — wrapped with createNextIntlPlugin")
    print("\n⚠️  Site may NOT work yet — Layout still uses old LanguageProvider")
    print("   This is expected. Script 3 will fix the layout.")
    print("\n👉 Next: Run Script 3 (locale layout migration)")
    print("=" * 60)


if __name__ == "__main__":
    main()
