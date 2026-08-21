#!/usr/bin/env python3
"""
Injects the shared header/footer partials into every page.

Edit partials/header.html or partials/footer.html, then run:
    python3 build.py

Each page must contain these marker comments (already in place):
    <!-- header:start -->...<!-- header:end -->
    <!-- footer:start -->...<!-- footer:end -->

A page can override the footer quote by putting the text in the
footer:start marker, e.g.:
    <!-- footer:start quote="Custom quote for this page." -->
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).parent
PARTIALS = ROOT / "partials"
DEFAULT_QUOTE = "Intimate by design. Eight leaders, one year together."

HEADER_RE = re.compile(r"<!-- header:start -->.*?<!-- header:end -->", re.DOTALL)
FOOTER_RE = re.compile(
    r'<!-- footer:start(?:\s+quote="(?P<quote>[^"]*)")?\s*-->.*?<!-- footer:end -->',
    re.DOTALL,
)


def build_header(current_file, template):
    def mark_active(m):
        href, classes, label = m.group(1), m.group(2), m.group(3)
        if href == current_file and "active" not in classes:
            classes += " active"
        return f'<a href="{href}" class="{classes}">{label}</a>'

    return re.sub(
        r'<a href="([^"]+)" class="(nav-link[^"]*)">([^<]*)</a>',
        mark_active,
        template,
    )


def main():
    header_template = (PARTIALS / "header.html").read_text()
    footer_template = (PARTIALS / "footer.html").read_text()

    pages = sorted(p for p in ROOT.glob("*.html"))
    if not pages:
        print("No HTML pages found.", file=sys.stderr)
        sys.exit(1)

    for page in pages:
        text = page.read_text()
        original = text

        header_html = build_header(page.name, header_template)
        text, n_header = HEADER_RE.subn(
            f"<!-- header:start -->\n{header_html}\n  <!-- header:end -->", text
        )

        def footer_sub(m):
            quote = m.group("quote") or DEFAULT_QUOTE
            marker = (
                f'<!-- footer:start quote="{quote}" -->'
                if m.group("quote")
                else "<!-- footer:start -->"
            )
            footer_html = footer_template.replace("{{QUOTE}}", quote)
            return f"{marker}\n{footer_html}\n  <!-- footer:end -->"

        text, n_footer = FOOTER_RE.subn(footer_sub, text)

        if n_header == 0 or n_footer == 0:
            print(f"warning: {page.name} missing header/footer markers "
                  f"(header={n_header}, footer={n_footer})", file=sys.stderr)

        if text != original:
            page.write_text(text)
            print(f"updated {page.name}")

    print("Build complete.")


if __name__ == "__main__":
    main()
