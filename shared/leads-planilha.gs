/**
 * Recebe os leads do site Soares e Melo e grava na planilha.
 *
 * COMO PUBLICAR (o passo 4 é o que costuma ser esquecido):
 *
 *  1. Abra a planilha de leads > menu Extensões > Apps Script.
 *  2. Selecione TUDO que está no editor (Ctrl+A) e apague.
 *  3. Cole este arquivo INTEIRO, do começo ao fim, e salve (Ctrl+S).
 *  4. Implantar > Gerenciar implantações > lápis (editar) >
 *     em "Versão" escolha "Nova versão" > Implantar.
 *     Sem criar uma versão nova, o Google continua servindo o código antigo.
 *
 * Em "Quem pode acessar" tem que estar QUALQUER PESSOA. A opção
 * "Qualquer pessoa com uma Conta do Google" também bloqueia e devolve 403.
 *
 * Para conferir se deu certo, abra a URL /exec no navegador: tem que
 * aparecer {"ok":true,...}. Se aparecer "Função de script não encontrada",
 * o passo 4 não foi feito.
 *
 * Tudo aqui vive dentro das funções de propósito: colar só um pedaço do
 * arquivo não quebra mais o script.
 */

function doPost(e) {
  try {
    var lead = JSON.parse(e.postData.contents);

    /* barra quem achou a URL solta e tenta despejar lixo na planilha.
       Quem ler o código do site encontra a chave: ela não é segredo, é
       um filtro contra robô. Se aparecer lixo mesmo assim, troque a
       chave aqui e em captura.js, e republique os dois. */
    if (lead.chave !== chave_()) {
      return responder_({ ok: false, erro: 'chave invalida' });
    }

    var aba = pegarAba_();

    aba.appendRow([
      formatarData_(lead.enviado_em),
      lead.nome || '',
      lead.telefone || '',
      lead.url || ''
    ]);

    return responder_({ ok: true });
  } catch (erro) {
    return responder_({ ok: false, erro: String(erro) });
  }
}

/* Abrir a URL /exec no navegador cai aqui: serve para conferir se a
   implantação está mesmo servindo esta versão do código. */
function doGet() {
  return responder_({ ok: true, servico: 'leads soares e melo' });
}

/* Grava uma linha de mentira, para testar sem depender do site.
   Rode pelo botão "Executar" do editor. */
function testarGravacao() {
  pegarAba_().appendRow([
    formatarData_(null),
    'Teste pelo editor',
    '(31) 90000-0000',
    'https://advocaciasoaresemelo.com.br/'
  ]);
}

/* precisa ser igual à constante CHAVE do captura.js */
function chave_() {
  return 'som-lead-7b2f94ae';
}

function pegarAba_() {
  var ID_PLANILHA = '1G61lX_2184iXKLWoRjzFYWF5dcCG_Y8M8ZNH27Q3T80';
  var COLUNAS = ['Data e hora', 'Nome', 'Telefone', 'URL'];

  /* quando o script é criado a partir da planilha, getActive() já resolve;
     o ID é o caminho de volta se ele virar um projeto solto */
  var planilha = SpreadsheetApp.getActiveSpreadsheet() ||
                 SpreadsheetApp.openById(ID_PLANILHA);
  var aba = planilha.getSheets()[0];

  if (aba.getLastRow() === 0) {
    aba.appendRow(COLUNAS);
    aba.getRange(1, 1, 1, COLUNAS.length).setFontWeight('bold');
    aba.setFrozenRows(1);
  }

  return aba;
}

/* o navegador manda ISO em UTC; a planilha mostra no horário de Brasília */
function formatarData_(iso) {
  var data = iso ? new Date(iso) : new Date();
  return Utilities.formatDate(data, 'America/Sao_Paulo', 'dd/MM/yyyy HH:mm');
}

function responder_(objeto) {
  return ContentService
    .createTextOutput(JSON.stringify(objeto))
    .setMimeType(ContentService.MimeType.JSON);
}
