#!/usr/bin/env python3
"""Gera sitemap.xml automaticamente."""

import os
import glob
from datetime import date

BASE_URL = 'https://soaresemarques.adv.br'  # ← Atualize com sua URL real
TODAY = date.today().isoformat()

STATIC_URLS = [
    ('/', '1.0', 'weekly'),
    ('/trabalhista/', '0.9', 'monthly'),
    ('/civel/', '0.9', 'monthly'),
    ('/previdenciario/', '0.9', 'monthly'),
    ('/sobre/', '0.7', 'monthly'),
    ('/contato/', '0.7', 'monthly'),
    ('/blog/', '0.9', 'weekly'),
]

def generate_sitemap():
    urls = []
    for path, priority, freq in STATIC_URLS:
        urls.append(f"""  <url>
    <loc>{BASE_URL}{path}</loc>
    <lastmod>{TODAY}</lastmod>
    <changefreq>{freq}</changefreq>
    <priority>{priority}</priority>
  </url>""")

    # Artigos do blog
    for html in sorted(glob.glob('blog/**/*.html', recursive=True)):
        if html.endswith('index.html'):
            continue
        path = '/' + html.replace('\\', '/')
        urls.append(f"""  <url>
    <loc>{BASE_URL}{path}</loc>
    <lastmod>{TODAY}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>""")

    sitemap = f"""<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
{chr(10).join(urls)}
</urlset>"""

    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(sitemap)
    print(f'✅ sitemap.xml gerado com {len(urls)} URLs.')

if __name__ == '__main__':
    generate_sitemap()
