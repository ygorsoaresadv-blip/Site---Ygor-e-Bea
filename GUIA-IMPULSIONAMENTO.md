# Guia de Impulsionamento — Soares & Marques Advogados

Este guia explica, passo a passo e em linguagem simples, como configurar o
Google Analytics, o Facebook Pixel e criar anúncios pagos para o escritório.

---

## PARTE 1 — Google Analytics 4 (GA4)

O GA4 mostra quantas pessoas visitam seu site, de onde vêm, quais páginas
acessam e quanto tempo ficam. É gratuito.

### Passo a passo para configurar

1. Acesse **analytics.google.com** e faça login com sua conta Google.
2. Clique em **"Começar a medir"** → dê um nome à conta (ex.: "Soares & Marques").
3. Crie uma **Propriedade** → nome: "Site Soares & Marques" → fuso: **Brasília**.
4. Em **"Fluxo de dados"**, escolha **Web** → informe a URL do site.
5. O Google vai gerar um **ID de medição** no formato `G-XXXXXXXXXX`.
6. **Substitua** `G-XXXXXXXXXX` pelo seu ID real nos arquivos HTML do site
   (em todos os `<head>`, onde está o comentário `Google Analytics 4`).
7. Publique o site no GitHub para as alterações entrarem em vigor.
8. Volte ao Analytics e aguarde até 48 horas para os primeiros dados aparecerem.

### O que você vai conseguir ver

- Visitantes em tempo real
- Páginas mais acessadas
- De onde vieram (Google, Instagram, WhatsApp direto)
- Dispositivos usados (celular × computador)

---

## PARTE 2 — Google Search Console (verificação do site)

O Search Console mostra como seu site aparece no Google: quais palavras-chave
levam pessoas até você, se há erros e como melhorar o posicionamento.

### Passo a passo

1. Acesse **search.google.com/search-console** e faça login.
2. Clique em **"Adicionar propriedade"** → escolha **"Prefixo de URL"**.
3. Cole a URL do seu site (ex.: `https://soaresemarques.adv.br/`).
4. O Google oferece algumas formas de verificação. A mais simples é o **arquivo HTML**:
   - Baixe o arquivo que o Google fornecer (nome parecido com `googleXXXXXXXXX.html`).
   - Substitua o conteúdo do arquivo `google-site-verification.html` que já
     está na pasta do site pelo arquivo baixado.
   - Suba o arquivo atualizado para o GitHub.
5. De volta ao Search Console, clique em **"Verificar"**.
6. Pronto! Em alguns dias o Google começa a mostrar dados.

### Alternativa: meta tag no HTML

Se preferir, você pode adicionar esta linha no `<head>` do `index.html`:
```html
<meta name="google-site-verification" content="SEU_CODIGO_AQUI">
```
O código é fornecido pelo próprio Search Console.

---

## PARTE 3 — Facebook Pixel (Meta Pixel)

O Pixel registra quem visita seu site para que você possa criar anúncios
no Facebook e Instagram direcionados exatamente para essas pessoas — ou para
pessoas parecidas com elas.

### Passo a passo para criar o Pixel

1. Acesse **business.facebook.com** e faça login.
2. No menu lateral, vá em **"Gerenciador de Eventos"** (Events Manager).
3. Clique em **"Conectar fontes de dados"** → **"Web"** → **"Pixel do Facebook"**.
4. Dê um nome ao Pixel (ex.: "Site Soares & Marques").
5. O sistema vai gerar um **ID do Pixel** (número de 15 a 16 dígitos).
6. **Substitua** `YOUR_PIXEL_ID` pelo seu ID real nos arquivos HTML do site
   (em todos os `<head>`, onde está o comentário `Facebook Pixel`).
7. Publique o site no GitHub para as alterações entrarem em vigor.
8. Instale a extensão **"Meta Pixel Helper"** no Chrome para confirmar que
   o Pixel está funcionando ao visitar o site.

---

## PARTE 4 — Criando anúncios pagos (impulsionamento)

### Opção A: Impulsionar post do Instagram (mais simples)

1. No app do Instagram, publique um post ou Reels relacionado ao escritório.
2. Toque no botão **"Impulsionar publicação"** abaixo do post.
3. Escolha o objetivo: **"Mais visitas ao site"** ou **"Mais mensagens"**.
4. Defina o público:
   - Localização: **Brasil** (para alcance nacional) ou **São Paulo e região**.
   - Interesses: direito, trabalho, consumidor, aposentadoria, família.
   - Faixa etária: 25 a 55 anos.
5. Defina o orçamento diário (sugestão inicial: **R$ 15 a R$ 30/dia**) e a duração (7 dias).
6. Confirme e aguarde aprovação (geralmente em até 1 hora).

### Opção B: Anúncios pelo Gerenciador (mais controle)

1. Acesse **adsmanager.facebook.com**.
2. Clique em **"Criar"** → escolha o objetivo **"Tráfego"** (para levar ao site)
   ou **"Mensagens"** (para o WhatsApp).
3. No público, use o Pixel para criar um **"Público Personalizado"** de quem
   já visitou o site — e um **"Público Semelhante"** de pessoas parecidas com
   quem já te procurou.
4. Crie o anúncio: use uma imagem profissional do escritório, texto direto
   e uma chamada para ação clara (ex.: "Fale com um advogado agora").
5. Defina verba, datas e publique.

### Dicas importantes

- **OAB e publicidade**: a Resolução 54/2015 do CFOA regula a publicidade
  advocatícia. É permitido divulgar áreas de atuação, mas é proibido prometer
  resultados, usar termos como "o melhor" ou "garantimos vitória".
- Prefira linguagem informativa: "Sabia que você tem direito a..." em vez de
  "Ganhe sua causa com a gente".
- Posts com conteúdo educativo (seus artigos do blog) costumam ter melhor
  desempenho e custo menor do que anúncios puramente comerciais.

---

## PARTE 5 — Google Ads (anúncios no Google)

Para aparecer no topo do Google quando alguém pesquisar "advogado trabalhista
São Paulo", por exemplo:

1. Acesse **ads.google.com** e crie uma conta.
2. Escolha objetivo: **"Visitas ao site"**.
3. Defina palavras-chave (exemplos):
   - `advogado trabalhista São Paulo`
   - `verbas rescisórias direito`
   - `advogado previdenciário Brasil`
   - `advogado cível nome negativado`
4. Crie o anúncio: título + descrição + URL do site.
5. Orçamento inicial sugerido: **R$ 20 a R$ 40/dia**.

---

*Dúvidas sobre como configurar qualquer parte deste guia?
Entre em contato pelo WhatsApp para orientação.*
