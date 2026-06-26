/* ================================================================
   SOARES & MARQUES ADVOGADOS — main.js
   Componentes compartilhados + interatividade
   ================================================================ */

const WA_YGOR     = '5511991680688'; // Dr. Ygor — Trabalhista
const WA_BEATRIZ  = '5515997554851'; // Dra. Beatriz — Cível e Previdenciário

/* Escolhe o número correto conforme a área da página atual */
function getWaNumber() {
  return window.location.pathname.includes('/trabalhista') ? WA_YGOR : WA_BEATRIZ;
}
const WA_NUMBER = getWaNumber();
const INSTAGRAM = 'ygorsoares_bjj';

/* ----------------------------------------------------------------
   Raiz do site — funciona em localhost E no GitHub Pages
   No GitHub Pages o site fica em /Nome-Do-Repositorio/
   ---------------------------------------------------------------- */
const SITE_ROOT = (() => {
  const h = window.location.hostname;
  if (h.endsWith('github.io')) {
    // Primeiro segmento do path é o nome do repositório
    const repo = window.location.pathname.split('/').filter(Boolean)[0];
    return repo ? '/' + repo : '';
  }
  return ''; // localhost
})();

/* Retorna caminho absoluto dentro do site */
function url(path) {
  return SITE_ROOT + path;
}

/* ----------------------------------------------------------------
   Logo
   ---------------------------------------------------------------- */
function logoSVG() {
  return `<img src="${url('/logo.png')}" alt="Soares &amp; Marques Advogados" width="120" style="display:block">`;
}

/* ----------------------------------------------------------------
   Navbar HTML
   ---------------------------------------------------------------- */
function buildNavbar() {
  const links = [
    { href: url('/'),                    label: 'Início' },
    { href: url('/trabalhista/'),        label: 'Trabalhista' },
    { href: url('/civel/'),              label: 'Cível' },
    { href: url('/previdenciario/'),     label: 'Previdenciário' },
    { href: url('/blog/'),               label: 'Blog' },
    { href: url('/sobre/'),              label: 'O Escritório' },
    { href: url('/contato/'),            label: 'Contato' },
  ];

  const desktopLinks = links.map(l =>
    `<a href="${l.href}" class="nav-link">${l.label}</a>`
  ).join('');

  const mobileLinks = links.map(l =>
    `<a href="${l.href}" class="mobile-link">${l.label}</a>`
  ).join('');

  return `
<nav class="navbar" role="navigation" aria-label="Navegação principal">
  <div class="navbar__inner">
    <a href="${url('/')}" class="navbar__logo" aria-label="Soares e Marques Advogados — Página inicial">
      ${logoSVG()}
    </a>
    <div class="navbar__links" role="menubar" aria-label="Menu principal">
      ${desktopLinks}
    </div>
    <button class="navbar__toggle" id="menuToggle"
            aria-expanded="false" aria-controls="mobileMenu"
            aria-label="Abrir menu de navegação">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="navbar__mobile" id="mobileMenu" role="dialog"
     aria-label="Menu de navegação" aria-hidden="true">
  ${mobileLinks}
</div>`;
}

/* ----------------------------------------------------------------
   Footer HTML
   ---------------------------------------------------------------- */
function buildFooter() {
  return `
<footer class="footer" role="contentinfo">
  <div class="footer__inner">
    <div class="footer__brand">
      <a href="${url('/')}" aria-label="Página inicial">${logoSVG()}</a>
      <p class="footer__desc">Escritório digital de advocacia multidisciplinar com atuação nas áreas trabalhista, cível e previdenciária. Sede em São Paulo/SP.</p>
      <p class="footer__desc" style="margin-top:.5rem;font-style:italic;opacity:.85">Escritório digital • Atendimento em todo o Brasil</p>
    </div>
    <div>
      <p class="footer__heading">Áreas de Atuação</p>
      <nav class="footer__nav" aria-label="Áreas de atuação">
        <a href="${url('/trabalhista/')}">Direito Trabalhista</a>
        <a href="${url('/civel/')}">Direito Cível</a>
        <a href="${url('/previdenciario/')}">Direito Previdenciário</a>
      </nav>
    </div>
    <div>
      <p class="footer__heading">Escritório</p>
      <nav class="footer__nav" aria-label="Links do escritório">
        <a href="${url('/sobre/')}">O Escritório</a>
        <a href="${url('/blog/')}">Blog Jurídico</a>
        <a href="${url('/contato/')}">Contato</a>
        <a href="${url('/privacidade.html')}">Política de Privacidade</a>
      </nav>
    </div>
  </div>
  <div class="footer__bottom">
    <p>© ${new Date().getFullYear()} Soares & Marques Advogados. Todos os direitos reservados.</p>
    <p>Dr. Ygor Pinheiro Soares — OAB/SP XXX.XXX &nbsp;|&nbsp; Dra. Beatriz Farias Marques — OAB/SP XXX.XXX</p>
  </div>
</footer>

<!-- Widget WhatsApp -->
<div class="chat-widget" id="chatWidget">
  <div class="chat-bubble" id="chatBubble" role="dialog"
       aria-label="Fale conosco pelo WhatsApp" aria-hidden="true">
    <p class="chat-bubble__title">Fale com nossa equipe</p>
    <p class="chat-bubble__sub">Descreva sua dúvida jurídica e entraremos em contato pelo WhatsApp.</p>
    <textarea id="chatMsg" placeholder="Descreva sua dúvida..."
              aria-label="Sua dúvida jurídica" rows="3"></textarea>
    <div class="lgpd">
      <input type="checkbox" id="lgpdOk" aria-required="true">
      <label for="lgpdOk">Li e aceito a
        <a href="${url('/privacidade.html')}">Política de Privacidade</a>.
      </label>
    </div>
    <button class="btn btn--filled" onclick="enviarWhatsApp()"
            style="width:100%;justify-content:center;gap:.75rem">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.522 5.854L.057 23.998l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.659-.52-5.17-1.42l-.37-.22-3.741.981.999-3.648-.242-.374A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
      </svg>
      Enviar pelo WhatsApp
    </button>
  </div>
  <button class="chat-open-btn" id="chatOpenBtn"
          onclick="toggleChat()" aria-label="Abrir chat com nossa equipe">
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.522 5.854L.057 23.998l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.89 0-3.659-.52-5.17-1.42l-.37-.22-3.741.981.999-3.648-.242-.374A9.958 9.958 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  </button>
</div>`;
}

/* ----------------------------------------------------------------
   Chat toggle
   ---------------------------------------------------------------- */
function toggleChat() {
  const bubble = document.getElementById('chatBubble');
  const btn    = document.getElementById('chatOpenBtn');
  if (!bubble) return;
  const open = bubble.classList.toggle('open');
  bubble.setAttribute('aria-hidden', !open);
  btn.setAttribute('aria-label', open ? 'Fechar chat' : 'Abrir chat com nossa equipe');
}

function enviarWhatsApp() {
  const msg     = document.getElementById('chatMsg')?.value?.trim();
  const consent = document.getElementById('lgpdOk')?.checked;
  if (!consent) { alert('Por favor, aceite a Política de Privacidade para continuar.'); return; }
  if (!msg)     { alert('Por favor, descreva sua dúvida.'); return; }
  const texto   = encodeURIComponent(`Olá! Vim pelo site e tenho uma dúvida jurídica:\n\n${msg}`);
  window.open(`https://wa.me/${WA_NUMBER}?text=${texto}`, '_blank', 'noopener');
}

/* ----------------------------------------------------------------
   Menu mobile
   ---------------------------------------------------------------- */
function initMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu   = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Fechar ao clicar em link
  menu.querySelectorAll('.mobile-link').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });

  // Fechar com Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && menu.classList.contains('open')) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      toggle.focus();
    }
  });
}

/* ----------------------------------------------------------------
   Scroll reveal
   ---------------------------------------------------------------- */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

/* ----------------------------------------------------------------
   Destaca link ativo na navbar
   ---------------------------------------------------------------- */
function markActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href') || '';
    // href já é absoluto (ex: /Site---Ygor-e-Bea/trabalhista/)
    const isHome = href === SITE_ROOT + '/';
    if (isHome) {
      if (path === href || path === SITE_ROOT + '/index.html') a.setAttribute('aria-current', 'page');
    } else if (href && path.startsWith(href)) {
      a.setAttribute('aria-current', 'page');
    }
  });
}

/* ----------------------------------------------------------------
   Inicialização
   ---------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  // Injetar navbar
  document.body.insertAdjacentHTML('afterbegin', buildNavbar());

  // Injetar footer
  document.body.insertAdjacentHTML('beforeend', buildFooter());

  // Inicializar componentes
  initMenu();
  initReveal();
  markActiveNav();

  // Conectar campos de data da calculadora trabalhista
  const dataInicio = document.getElementById('t-data-inicio');
  const dataFim    = document.getElementById('t-data-fim');
  if (dataInicio) dataInicio.addEventListener('change', calcMesesEntreDatas);
  if (dataFim)    dataFim.addEventListener('change', calcMesesEntreDatas);

  // Revelar body (anti-FOUC)
  requestAnimationFrame(() => {
    document.body.classList.add('loaded');
  });
});

/* ----------------------------------------------------------------
   Utilitário: formata valor em R$
   ---------------------------------------------------------------- */
function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value || 0);
}

/* ----------------------------------------------------------------
   Cálculo automático de meses entre datas (calculadora trabalhista)
   ---------------------------------------------------------------- */
function calcMesesEntreDatas() {
  const inicio = document.getElementById('t-data-inicio')?.value;
  const fim    = document.getElementById('t-data-fim')?.value;
  const display = document.getElementById('t-meses-display');
  const texto   = document.getElementById('t-meses-texto');
  const hidden  = document.getElementById('t-meses');

  if (!inicio || !fim) { if (display) display.style.display = 'none'; return; }

  const d1 = new Date(inicio);
  const d2 = new Date(fim);
  if (d2 <= d1) {
    if (texto) texto.textContent = 'A data de demissão deve ser posterior à admissão.';
    if (hidden) hidden.value = '0';
    if (display) display.style.display = 'block';
    return;
  }

  let meses = (d2.getFullYear() - d1.getFullYear()) * 12 + (d2.getMonth() - d1.getMonth());
  const diasRestantes = d2.getDate() - d1.getDate();
  if (diasRestantes > 0) meses += diasRestantes / 30;

  const anos  = Math.floor(meses / 12);
  const mesesR = Math.floor(meses % 12);
  const diasR  = Math.round((meses % 1) * 30);

  let partes = [];
  if (anos > 0)    partes.push(`${anos} ano${anos > 1 ? 's' : ''}`);
  if (mesesR > 0)  partes.push(`${mesesR} mês${mesesR > 1 ? 'es' : ''}`);
  if (diasR > 0)   partes.push(`${diasR} dia${diasR > 1 ? 's' : ''}`);

  if (texto)  texto.textContent = partes.join(', ') || 'Menos de 1 dia';
  if (hidden) hidden.value = meses.toFixed(2);
  if (display) display.style.display = 'block';
}

/* ----------------------------------------------------------------
   Calculadora Trabalhista — Verbas Rescisórias
   ---------------------------------------------------------------- */
function calcTrabalhista() {
  const salario    = parseFloat(document.getElementById('t-salario')?.value?.replace(',','.')) || 0;
  const meses      = parseFloat(document.getElementById('t-meses')?.value) || 0;
  const tipo       = document.getElementById('t-tipo')?.value || 'semjusta';
  const aviso      = document.getElementById('t-aviso')?.value || 'trabalhado';
  const fgts       = parseFloat(document.getElementById('t-fgts')?.value?.replace(',','.')) || 0;

  if (salario <= 0 || meses <= 0) {
    alert('Por favor, preencha o salário e as datas de admissão e demissão.');
    return;
  }

  // Meses e fração para 13º e férias
  const anos = meses / 12;
  const mesesFracao = meses % 12;

  let itens = [];
  let total = 0;

  // Saldo de salário (simplificado: 15 dias = metade)
  const saldo = salario / 2;
  itens.push({ label: 'Saldo de salário (15 dias)', val: saldo });

  if (tipo === 'semjusta' || tipo === 'acordo') {
    // Aviso prévio
    const avisoVal = aviso === 'trabalhado' ? salario : salario;
    itens.push({ label: `Aviso prévio ${aviso === 'trabalhado' ? '(trabalhado)' : '(indenizado)'}`, val: avisoVal });

    // 13º salário proporcional
    const decimo = (salario / 12) * (mesesFracao || 12);
    itens.push({ label: '13.º salário proporcional', val: decimo });

    // Férias proporcionais + 1/3
    const feriasBase = (salario / 12) * (mesesFracao || 12);
    const ferias = feriasBase + feriasBase / 3;
    itens.push({ label: 'Férias proporcionais + 1/3', val: ferias });

    // FGTS + multa 40%
    const multaFgts = fgts * 0.4;
    itens.push({ label: 'Multa rescisória FGTS (40%)', val: multaFgts });

    if (tipo === 'acordo') {
      // Art. 484-A CLT: metade do aviso + metade da multa FGTS
      itens.push({ label: 'Acordo (art. 484-A) — redução aplicada', val: -(avisoVal / 2) - (multaFgts / 2) });
    }
  } else {
    // Com justa causa
    const decimo = (salario / 12) * (mesesFracao || 12);
    itens.push({ label: '13.º salário proporcional', val: decimo });
    const feriasBase = (salario / 12) * (mesesFracao || 12);
    const ferias = feriasBase + feriasBase / 3;
    itens.push({ label: 'Férias proporcionais + 1/3', val: ferias });
  }

  total = itens.reduce((s, i) => s + i.val, 0);

  // Renderizar
  const container = document.getElementById('t-resultado');
  const rows = itens.map(i => `
    <div class="result-row">
      <span class="result-row__label">${i.label}</span>
      <span class="result-row__val">${formatBRL(i.val)}</span>
    </div>`).join('');

  container.innerHTML = rows + `
    <div class="result-row result-total">
      <span class="result-row__label">Estimativa Total</span>
      <span class="result-row__val">${formatBRL(total)}</span>
    </div>`;

  container.classList.add('show');
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ----------------------------------------------------------------
   Calculadora Previdenciária — Aposentadoria
   ---------------------------------------------------------------- */
function calcPrevidenciario() {
  const tipo       = document.getElementById('p-tipo')?.value || 'idade';
  const salario    = parseFloat(document.getElementById('p-salario')?.value?.replace(',','.')) || 0;
  const contribuicoes = parseFloat(document.getElementById('p-contribuicoes')?.value) || 0;
  const idade      = parseFloat(document.getElementById('p-idade')?.value) || 0;

  if (salario <= 0) {
    alert('Por favor, informe o salário de contribuição.');
    return;
  }

  const TETO = 7786.02;  // Teto do INSS 2024 (referência)
  const BPC  = 1412.00;  // Salário mínimo 2024

  let resultado = { elegivel: false, beneficio: 0, observacoes: [] };

  if (tipo === 'idade') {
    // Aposentadoria por idade: H ≥ 65 / M ≥ 62, mín 15 anos contribuição
    const idadeMinH = 65, idadeMinM = 62, contribMin = 180; // 15 anos
    resultado.elegivel = (idade >= idadeMinH || idade >= idadeMinM) && contribuicoes >= contribMin;
    resultado.observacoes.push(`Requisito: 65 anos (homem) / 62 anos (mulher) + 15 anos de contribuição`);
    resultado.observacoes.push(`Você possui ${contribuicoes} contribuições (${Math.floor(contribuicoes/12)} anos e ${contribuicoes%12} meses)`);

    // RMI = 60% + 2% por ano acima do mínimo de contribuição
    const anosAcima = Math.max(0, (contribuicoes - contribMin) / 12);
    const percentual = Math.min(1.0, 0.60 + anosAcima * 0.02);
    resultado.beneficio = Math.min(TETO, salario * percentual);
    resultado.observacoes.push(`Alíquota aplicada: ${(percentual * 100).toFixed(0)}% do salário de benefício`);

  } else if (tipo === 'tempo') {
    // Por tempo de contribuição (regras de transição)
    const contribMin = tipo === 'tempo' ? (contribuicoes >= 420 ? 420 : 480) : 0;
    resultado.elegivel = contribuicoes >= 420;
    resultado.observacoes.push(`Referência: 35 anos (homem) / 30 anos (mulher) de contribuição`);
    resultado.observacoes.push(`Regras de transição aplicam-se — consulte um advogado para análise individual`);

    const percentual = Math.min(1.0, 0.60 + Math.max(0, (contribuicoes - 420) / 12) * 0.02);
    resultado.beneficio = Math.min(TETO, salario * percentual);

  } else if (tipo === 'especial') {
    // Especial: 15/20/25 anos em atividade especial
    resultado.elegivel = contribuicoes >= 180;
    resultado.observacoes.push(`Requer reconhecimento de tempo especial (insalubridade/periculosidade)`);
    resultado.observacoes.push(`Necessária análise do PPP (Perfil Profissiográfico Previdenciário)`);
    resultado.beneficio = Math.min(TETO, salario * 1.0); // 100% em atividade especial
    resultado.observacoes.push(`Atividade especial pode garantir 100% do salário de benefício`);

  } else if (tipo === 'bpc') {
    // BPC/LOAS
    resultado.elegivel = true;
    resultado.beneficio = BPC;
    resultado.observacoes.push(`Valor fixo: 1 salário mínimo vigente`);
    resultado.observacoes.push(`Requisitos: 65 anos OU deficiência + renda familiar per capita ≤ ¼ do SM`);
    resultado.observacoes.push(`Não exige contribuição ao INSS`);
  }

  // Garantir piso = salário mínimo
  if (resultado.beneficio > 0 && resultado.beneficio < BPC) resultado.beneficio = BPC;

  const container = document.getElementById('p-resultado');
  const statusClass = resultado.elegivel ? 'color:var(--dourado)' : 'color:#c97b7b';
  const statusText  = resultado.elegivel ? 'Você pode se enquadrar neste benefício' : 'Análise indica possível não elegibilidade — consulte um especialista';

  const obsHTML = resultado.observacoes.map(o =>
    `<div class="result-row"><span class="result-row__label" style="font-style:italic;font-size:.88rem">${o}</span></div>`
  ).join('');

  container.innerHTML = `
    <div class="result-row">
      <span class="result-row__label">Situação estimada</span>
      <span class="result-row__val" style="${statusClass};font-size:.95rem">${statusText}</span>
    </div>
    ${obsHTML}
    <div class="result-row result-total">
      <span class="result-row__label">Benefício estimado</span>
      <span class="result-row__val">${formatBRL(resultado.beneficio)}/mês</span>
    </div>`;

  container.classList.add('show');
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ----------------------------------------------------------------
   Calculadora Cível — Pensão Alimentícia (estimativa)
   ---------------------------------------------------------------- */
function calcPensao() {
  const renda      = parseFloat(document.getElementById('c-renda')?.value?.replace(',','.')) || 0;
  const filhos     = parseInt(document.getElementById('c-filhos')?.value) || 1;

  if (renda <= 0) {
    alert('Por favor, informe a renda líquida do alimentante.');
    return;
  }

  // Percentuais orientativos (não vinculantes — o juiz decide)
  const percentuais = { 1: 0.30, 2: 0.40, 3: 0.50 };
  const pct = percentuais[Math.min(filhos, 3)] || 0.50;

  const total = renda * pct;
  const porFilho = total / filhos;

  const container = document.getElementById('c-resultado');
  container.innerHTML = `
    <div class="result-row">
      <span class="result-row__label">Renda líquida informada</span>
      <span class="result-row__val">${formatBRL(renda)}</span>
    </div>
    <div class="result-row">
      <span class="result-row__label">Percentual orientativo (${filhos} filho${filhos > 1 ? 's' : ''})</span>
      <span class="result-row__val">${(pct * 100).toFixed(0)}%</span>
    </div>
    <div class="result-row">
      <span class="result-row__label">Valor por filho</span>
      <span class="result-row__val">${formatBRL(porFilho)}</span>
    </div>
    <div class="result-row result-total">
      <span class="result-row__label">Total estimado</span>
      <span class="result-row__val">${formatBRL(total)}/mês</span>
    </div>`;

  container.classList.add('show');
  container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ----------------------------------------------------------------
   Blog: filtro por área
   ---------------------------------------------------------------- */
function initBlogFilter() {
  const btns   = document.querySelectorAll('.filter-btn');
  const cards  = document.querySelectorAll('.blog-card[data-area]');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const area = btn.dataset.filter;
      cards.forEach(card => {
        const show = area === 'todos' || card.dataset.area === area;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

document.addEventListener('DOMContentLoaded', initBlogFilter);
