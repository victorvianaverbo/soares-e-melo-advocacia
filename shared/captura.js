/* Captura de leads — Soares e Melo Advocacia
   Grava nome, telefone e URL numa planilha do Google Sheets.

   Cobre os dois caminhos de contato do site:
     1. o formulário #form-consulta, que já existe e continua funcionando
        exatamente como antes (este arquivo só acrescenta a gravação);
     2. os links que abrem o WhatsApp direto, que passam a pedir nome e
        telefone num popup antes de seguir para a conversa.

   Sem JavaScript os links continuam levando direto ao WhatsApp: o popup é
   um ganho, nunca uma dependência.

   Inclua em TODAS as páginas, depois do script principal. */

(function () {
  'use strict';

  /* ---------------------------------------------------------------
     CONFIGURAÇÃO
     --------------------------------------------------------------- */

  /* URL do Apps Script publicado como "app da web" (acesso: qualquer
     pessoa). Enquanto estiver vazio, o lead só vai para o WhatsApp e nada
     quebra. O código do script está em leads-planilha.gs. */
  var WEBHOOK_PLANILHA = 'https://script.google.com/macros/s/AKfycbwn3rxITqU5ECx6duNJjeNiqhMJ3N2Mi_5NXwgmFbgNTWvkSaKUSObXDVjE1qi6_9l4-g/exec';

  /* filtro contra robô que ache a URL solta: o script confere isto antes de
     gravar. Precisa ser igual ao chave_() de leads-planilha.gs — mudar num
     lugar e não no outro faz os leads pararem de chegar. */
  var CHAVE = 'som-lead-7b2f94ae';

  /* Mesma conversão que o formulário já dispara em script.js. O popup
     precisa contar igual, senão os cliques do WhatsApp somem do Ads. */
  var CONVERSAO_GOOGLE_ADS = 'AW-18148697196/9uqmCJ3_tqscEOzI_M1D';
  var VALOR_CONVERSAO = 1.0;
  var MOEDA_CONVERSAO = 'BRL';

  /* ---------------------------------------------------------------
     PLANILHA
     --------------------------------------------------------------- */

  var registrarLead = function (nome, telefone) {
    if (!WEBHOOK_PLANILHA) return;

    var corpo = JSON.stringify({
      chave: CHAVE,
      nome: nome,
      /* o formulário e o popup têm máscaras diferentes; a planilha recebe
         sempre o mesmo formato */
      telefone: formatarTelefone(telefone),
      url: window.location.href,
      enviado_em: new Date().toISOString()
    });

    /* text/plain evita o preflight de CORS, que o Apps Script não responde */
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon(WEBHOOK_PLANILHA, new Blob([corpo], { type: 'text/plain' }));
        return;
      }
    } catch (e) { /* segue para o fetch */ }

    if (window.fetch) {
      fetch(WEBHOOK_PLANILHA, {
        method: 'POST',
        mode: 'no-cors',
        keepalive: true,
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: corpo
      }).catch(function () {});
    }
  };

  /* ---------------------------------------------------------------
     TELEFONE
     --------------------------------------------------------------- */

  var soDigitos = function (texto) {
    return (texto || '').replace(/\D/g, '');
  };

  var formatarTelefone = function (texto) {
    var d = soDigitos(texto).slice(0, 11);
    if (d.length <= 2) return d;
    if (d.length <= 6) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
    return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
  };

  /* mesma regra do formulário em script.js: nome com 2+ letras, telefone
     com DDD. Se a regra mudar lá, mude aqui também. */
  var nomeValido = function (nome) { return nome.length >= 2; };
  var telefoneValido = function (digitos) { return digitos.length >= 10 && digitos.length <= 11; };

  /* ---------------------------------------------------------------
     PARTE 1 — o formulário que já existe
     --------------------------------------------------------------- */

  var formConsulta = document.getElementById('form-consulta');

  if (formConsulta) {
    /* listener adicional: o de script.js continua cuidando da validação
       visual, da conversão e de abrir o WhatsApp. Aqui só gravamos. */
    formConsulta.addEventListener('submit', function () {
      var campoNome = formConsulta.querySelector('[name="name"]');
      var campoTel = formConsulta.querySelector('[name="phone"]');
      if (!campoNome || !campoTel) return;

      var nome = campoNome.value.trim().replace(/\s+/g, ' ');
      var telefone = campoTel.value.trim();

      if (!nomeValido(nome) || !telefoneValido(soDigitos(telefone))) return;

      registrarLead(nome, telefone);
    });
  }

  /* ---------------------------------------------------------------
     PARTE 2 — popup nos links do WhatsApp
     --------------------------------------------------------------- */

  var links = Array.prototype.slice.call(document.querySelectorAll('a[href*="wa.me"]'));
  if (!links.length) return;

  var MARCACAO =
    '<div class="lead-modal__fundo" data-fechar></div>' +
    '<div class="lead-modal__caixa" role="dialog" aria-modal="true" aria-labelledby="lead-modal-titulo">' +
      '<button type="button" class="lead-modal__x" data-fechar aria-label="Fechar">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">' +
          '<path d="M6 6l12 12M18 6L6 18" stroke-linecap="square" /></svg>' +
      '</button>' +
      '<div class="lead-modal__ornamento" aria-hidden="true">◆</div>' +
      '<h2 class="lead-modal__titulo" id="lead-modal-titulo">Antes de abrir a conversa</h2>' +
      '<p class="lead-modal__lede">Deixe seu nome e telefone para que possamos retornar caso a conversa se perca.</p>' +
      '<form class="lead-modal__form" novalidate>' +
        '<div class="lead-modal__campo">' +
          '<label for="lead-nome">Nome completo</label>' +
          '<input type="text" id="lead-nome" name="nome" autocomplete="name" placeholder="Como podemos te chamar?" />' +
          '<span class="lead-modal__erro" hidden></span>' +
        '</div>' +
        '<div class="lead-modal__campo">' +
          '<label for="lead-telefone">Telefone &middot; WhatsApp</label>' +
          '<input type="tel" id="lead-telefone" name="telefone" autocomplete="tel" placeholder="(31) 97154-7036" inputmode="numeric" maxlength="16" />' +
          '<span class="lead-modal__erro" hidden></span>' +
        '</div>' +
        '<button type="submit" class="lead-modal__enviar">' +
          '<span>Abrir conversa no WhatsApp</span>' +
          '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">' +
            '<path d="M5 12h14M13 6l6 6-6 6" stroke-linecap="square" /></svg>' +
        '</button>' +
        '<p class="lead-modal__apoio">Seus dados são confidenciais e usados apenas para retornar o contato.</p>' +
      '</form>' +
    '</div>';

  var modal = document.createElement('div');
  modal.className = 'lead-modal';
  modal.id = 'lead-modal';
  modal.hidden = true;
  modal.innerHTML = MARCACAO;
  document.body.appendChild(modal);

  var form = modal.querySelector('.lead-modal__form');
  var campoNome = modal.querySelector('[name="nome"]');
  var campoTel = modal.querySelector('[name="telefone"]');
  var botaoEnviar = modal.querySelector('.lead-modal__enviar');

  var destinoAtual = '';   // número do WhatsApp do link clicado
  var assuntoAtual = '';   // mensagem original daquele link
  var focoAnterior = null;

  campoTel.addEventListener('input', function () {
    campoTel.value = formatarTelefone(campoTel.value);
  });

  /* ---------------------------------------------------------------
     ERROS DE PREENCHIMENTO
     --------------------------------------------------------------- */

  var mostrarErro = function (campo, mensagem) {
    var aviso = campo.parentNode.querySelector('.lead-modal__erro');
    campo.setAttribute('aria-invalid', 'true');
    if (aviso) {
      aviso.textContent = mensagem;
      aviso.hidden = false;
    }
  };

  var limparErro = function (campo) {
    var aviso = campo.parentNode.querySelector('.lead-modal__erro');
    campo.removeAttribute('aria-invalid');
    if (aviso) aviso.hidden = true;
  };

  [campoNome, campoTel].forEach(function (campo) {
    campo.addEventListener('input', function () { limparErro(campo); });
  });

  /* ---------------------------------------------------------------
     ABRIR E FECHAR
     --------------------------------------------------------------- */

  var focaveis = function () {
    return Array.prototype.slice.call(
      modal.querySelectorAll('button, input, textarea, select, a[href]')
    ).filter(function (el) { return !el.disabled && el.offsetParent !== null; });
  };

  var abrir = function (destino, assunto, gatilho) {
    destinoAtual = destino;
    assuntoAtual = assunto;
    focoAnterior = gatilho || null;

    modal.hidden = false;
    document.body.classList.add('has-lead-modal');

    /* o rAF dá um quadro para o CSS aplicar o estado inicial antes da
       transição de entrada */
    requestAnimationFrame(function () {
      modal.classList.add('is-open');
      campoNome.focus();
    });
  };

  var fechar = function () {
    modal.classList.remove('is-open');
    document.body.classList.remove('has-lead-modal');

    var esconder = function () {
      modal.hidden = true;
      modal.removeEventListener('transitionend', esconder);
    };
    modal.addEventListener('transitionend', esconder);
    /* rede de segurança: se a transição não rodar (reduced-motion, aba em
       segundo plano), o transitionend nunca chega */
    setTimeout(esconder, 400);

    if (focoAnterior) focoAnterior.focus();
  };

  links.forEach(function (link) {
    link.addEventListener('click', function (evento) {
      var href = link.getAttribute('href') || '';

      var numero = (href.match(/wa\.me\/(\d+)/) || [])[1];
      if (!numero) return;  /* link estranho: deixa passar direto */

      evento.preventDefault();

      /* a mensagem de cada link vira o assunto da conversa: quem está na
         página de Família chega falando de Família */
      var assunto = '';
      var marca = href.indexOf('text=');
      if (marca > -1) {
        assunto = decodeURIComponent(href.slice(marca + 5))
          .replace(/^ol[áa][,!.]?\s*/i, '');
        assunto = assunto.charAt(0).toUpperCase() + assunto.slice(1);
      }

      abrir(numero, assunto, link);
    });
  });

  Array.prototype.slice.call(modal.querySelectorAll('[data-fechar]')).forEach(function (el) {
    el.addEventListener('click', fechar);
  });

  document.addEventListener('keydown', function (evento) {
    if (modal.hidden) return;

    if (evento.key === 'Escape') {
      fechar();
      return;
    }

    /* prende o Tab dentro do popup */
    if (evento.key === 'Tab') {
      var lista = focaveis();
      if (!lista.length) return;
      var primeiro = lista[0];
      var ultimo = lista[lista.length - 1];

      if (evento.shiftKey && document.activeElement === primeiro) {
        evento.preventDefault();
        ultimo.focus();
      } else if (!evento.shiftKey && document.activeElement === ultimo) {
        evento.preventDefault();
        primeiro.focus();
      }
    }
  });

  /* ---------------------------------------------------------------
     ENVIO
     --------------------------------------------------------------- */

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();

    var nome = campoNome.value.trim().replace(/\s+/g, ' ');
    var digitos = soDigitos(campoTel.value);
    var valido = true;

    if (!nomeValido(nome)) {
      mostrarErro(campoNome, 'Escreva seu nome para sabermos com quem falamos.');
      valido = false;
    }

    if (!telefoneValido(digitos)) {
      mostrarErro(campoTel, 'Telefone com DDD, 10 ou 11 números.');
      valido = false;
    }

    if (!valido) {
      modal.querySelector('[aria-invalid="true"]').focus();
      return;
    }

    botaoEnviar.disabled = true;

    if (CONVERSAO_GOOGLE_ADS && typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        send_to: CONVERSAO_GOOGLE_ADS,
        value: VALOR_CONVERSAO,
        currency: MOEDA_CONVERSAO
      });
    }

    registrarLead(nome, campoTel.value);

    var mensagem = assuntoAtual
      ? 'Olá, meu nome é ' + nome + '. ' + assuntoAtual
      : 'Olá, meu nome é ' + nome + ' e gostaria de mais informações.';
    mensagem += '\nMeu WhatsApp: ' + campoTel.value;

    /* dentro do gesto de clique, então o navegador não bloqueia */
    window.open('https://wa.me/' + destinoAtual + '?text=' + encodeURIComponent(mensagem),
                '_blank', 'noopener');

    botaoEnviar.disabled = false;
    campoNome.value = '';
    campoTel.value = '';
    fechar();
  });
})();
