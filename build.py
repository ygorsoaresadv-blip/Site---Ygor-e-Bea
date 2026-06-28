#!/usr/bin/env python3
"""
Build script — Soares & Marques Advogados
Converte artigos Markdown em páginas HTML e gera listagem do blog.
"""
 
import os
import glob
import json
from datetime import datetime

try:
    import frontmatter
    import markdown
    from jinja2 import Template
    HAS_DEPS = True
except ImportError:
    HAS_DEPS = False
    print("Dependências não instaladas. Skipping build.")

AREAS = {
    'trabalhista':  {'label': 'Trabalhista',   'dir': 'trabalhista'},
    'civel':        {'label': 'Cível',          'dir': 'civel'},
    'previdenciario': {'label': 'Previdenciário', 'dir': 'previdenciario'},
}

ARTICLE_TEMPLATE = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{ title }} — Soares & Marques Advogados</title>
  <meta name="description" content="{{ excerpt }}">
  <meta property="og:title" content="{{ title }}">
  <meta property="og:description" content="{{ excerpt }}">
  <link rel="icon" type="image/svg+xml" href="../../favicon.svg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="../../css/style.css">
</head>
<body>
  <a href="#conteudo" class="sr-only">Pular para o conteúdo</a>
  <main id="conteudo">
    <header class="page-hero">
      <div class="container">
        <p class="eyebrow">{{ area_label }}</p>
        <h1>{{ title }}</h1>
        <div class="divider" style="justify-content:center;margin:1.25rem auto">
          <div class="divider__line"></div>
          <div class="divider__dots"><span></span><span></span><span></span></div>
          <div class="divider__line"></div>
        </div>
        <p class="page-hero__desc" style="font-style:normal">{{ date_str }}</p>
      </div>
    </header>
    <section class="section section--dark">
      <div class="container">
        <article class="article-content">
          {{ content }}
        </article>
        <div style="margin-top:3rem;display:flex;gap:1rem;flex-wrap:wrap">
          <a href="../../blog/" class="btn">← Voltar ao blog</a>
          <a href="https://wa.me/5515997554851?text=Olá!%20Li%20o%20artigo%20{{ title_encoded }}%20e%20tenho%20uma%20dúvida."
             class="btn btn--filled" target="_blank" rel="noopener">Falar com advogado</a>
        </div>
      </div>
    </section>
  </main>
  <script src="../../js/main.js"></script>
</body>
</html>"""


def build_articles():
    if not HAS_DEPS:
        return []

    all_articles = []
    posts_base = '_posts'

    for area_key, area_info in AREAS.items():
        posts_dir = os.path.join(posts_base, area_key)
        if not os.path.exists(posts_dir):
            continue

        out_dir = os.path.join('blog', area_key)
        os.makedirs(out_dir, exist_ok=True)

        for md_file in sorted(glob.glob(os.path.join(posts_dir, '*.md')), reverse=True):
            post = frontmatter.load(md_file)

            if post.get('draft', False):
                continue

            slug = os.path.splitext(os.path.basename(md_file))[0]
            content_html = markdown.markdown(post.content, extensions=['extra', 'nl2br'])

            date_obj = post.get('date', datetime.now())
            if hasattr(date_obj, 'strftime'):
                date_str = date_obj.strftime('%d/%m/%Y')
            else:
                date_str = str(date_obj)

            tmpl = Template(ARTICLE_TEMPLATE)
            html = tmpl.render(
                title=post.get('title', 'Artigo'),
                excerpt=post.get('excerpt', ''),
                area_label=area_info['label'],
                date_str=date_str,
                content=content_html,
                title_encoded=post.get('title', '').replace(' ', '%20'),
            )

            out_path = os.path.join(out_dir, f'{slug}.html')
            with open(out_path, 'w', encoding='utf-8') as f:
                f.write(html)

            all_articles.append({
                'area': area_key,
                'area_label': area_info['label'],
                'title': post.get('title', ''),
                'excerpt': post.get('excerpt', ''),
                'date': date_str,
                'url': f'{area_key}/{slug}.html',
            })
            print(f'  ✓ {slug}')

    return all_articles


def generate_blog_index(articles):
    """Gera arquivo JSON com artigos para consumo pelo frontend."""
    os.makedirs('_data', exist_ok=True)
    with open('_data/articles.json', 'w', encoding='utf-8') as f:
        json.dump(articles, f, ensure_ascii=False, indent=2)
    print(f'  ✓ _data/articles.json ({len(articles)} artigos)')


if __name__ == '__main__':
    print('🔨 Build — Soares & Marques Advogados')
    articles = build_articles()
    if articles:
        generate_blog_index(articles)
    print(f'✅ Build concluído. {len(articles)} artigo(s) gerado(s).')
