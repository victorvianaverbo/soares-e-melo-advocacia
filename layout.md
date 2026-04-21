# Layout Spec — Soares e Melo Advocacia · Home

> Biblia de implementação. Todas as medidas, tokens, animações e interações devem ser reproduzidos exatamente como especificados. Nada fica "para depois ver".

---

## Design Tokens (globais)

### Cores
```
--navy:        #0F1E4A   /* background principal (hero, CTA final, footer) */
--navy-deep:   #0A1538   /* sombras, profundidade */
--ivory:       #F5EFE0   /* background de seções claras (paper) */
--ivory-soft:  #FBF8F0   /* variação ainda mais clara */
--gold:        #AF8F47   /* accent único, rules, kickers, italic de destaque */
--gold-soft:   #C9A55D   /* hover states de elementos ouro */
--mist:        #C9CFDD   /* textos secundários em navy, linhas discretas */
--ink:         #1a1a1a   /* texto base sobre ivory */
--ink-muted:   #555      /* texto de prose sobre ivory */
```

### Fontes (Google Fonts — já carregadas)
```
Playfair Display — ital,wght @ 0,400; 0,500; 0,600; 1,400; 1,500; 1,600
Inter            — wght @ 300; 400; 500; 600
```
- `--serif`: `'Playfair Display', Georgia, serif`
- `--sans`:  `'Inter', system-ui, -apple-system, 'Helvetica Neue', sans-serif`

### Espaçamento
```
--gutter:       clamp(20px, 4vw, 48px)
--page-pad-x:   clamp(20px, 5vw, 80px)
--page-pad-y:   clamp(56px, 9vw, 120px)
--content-max:  1200px
```

### Fluid type
```
--fs-kicker:  clamp(10px, 0.72vw + 8px, 12px)
--fs-body:    clamp(15px, 0.3vw + 14px, 17px)
--fs-lede:    clamp(17px, 0.4vw + 15px, 20px)
--fs-hero:    clamp(44px, 7vw + 8px, 112px)
--fs-h2:      clamp(34px, 4vw + 10px, 72px)
--fs-h3:      clamp(22px, 1.4vw + 14px, 34px)
```

### Easings & durações padrão
- **Entrada:** `1.1s cubic-bezier(.2,.7,.2,1)` com keyframe `rise-in` (translateY 18px + blur 2px → 0)
- **Hover pequeno:** `.25s ease` ou `.3s cubic-bezier(.2,.7,.2,1)`
- **Transições de header/navegação:** `.35s ease` ou `cubic-bezier(.2,.7,.2,1)`
- **Scroll-linked:** `animation-timeline: view()` com range `entry 10%` a `cover 30%`

### Ritmo tipográfico editorial
- **Kicker:** 10–12px, peso 500, letter-spacing 3px, UPPERCASE, cor gold; **sempre** acompanhado de `<span class="kicker__rule">` (linha 48×1px gold @70% opacity) como ornamento lateral.
- **Italic em gold para palavra de destaque:** herança direta do wordmark (`Soares <em>& Melo</em>`) — cada headline usa UMA palavra em Playfair italic weight 500 na cor gold.
- **Hairlines:** `1px` em `rgba(175,143,71,.35)` ou gradiente `transparent → rgba(175,143,71,.45) 12%-88% → transparent` para divisores full-bleed.

### Logos (uso consistente)
- Header (repouso): `soares-melo-editorial-ouro.svg` 84px de altura sobre navy
- Header (scrolled): `soares-melo-mini-ouro.svg` 44px (fade cross com backdrop-blur 14px + 85% opacity navy)
- Sobre: `soares-melo-crest-ouro.svg` como elemento ornamental grande
- Footer: `soares-melo-seal-navy.svg` sobre ivory, 96px

### Animações globais
```css
@keyframes rise-in {
  from { opacity: 0; transform: translateY(18px); filter: blur(2px); }
  to   { opacity: 1; transform: translateY(0);     filter: blur(0); }
}
```
- **Stagger de entrada:** classes `.stagger` com `--d` custom property para delay (0s, .15s, .3s, .45s, .6s…)
- **Reveal on scroll:** `animation-timeline: view()` — `rise-in 1s forwards`, range `entry 15% cover 25%`

### Princípios não-negociáveis
1. **Selective color:** ouro é o ÚNICO accent. Nada de gradientes coloridos, nenhum segundo accent. Navy + ivory + gold + mist apenas.
2. **Tipografia é o herói.** Playfair com italic em gold sempre presente, letterspacing exagerado em kickers.
3. **Hairlines finas, nunca linhas grossas.** Divisores 1px em gold opacidade baixa.
4. **Padding generoso 56–120px** na vertical entre seções.
5. **Nunca:** emojis, gradientes berrantes, sombras pesadas difusas, ícones redondos coloridos, caixas "card com border-radius 16px" estilo SaaS.
6. **Hover underline animado:** links de nav e áreas usam `::after` width 0→100% em 350ms cubic-bezier(.2,.7,.2,1).

### Alternância de fundo (ritmo)
| Seção | Background |
|---|---|
| 01 Hero | navy (com radial gold @10% top center + radial navy-deep @ bottom) |
| 02 Problema | ivory |
| 03 Diferenciais | navy |
| 04 Áreas | ivory |
| 05 Como Funciona | ivory com side-rail navy |
| 06 Sobre | navy |
| 07 CTA Final | ivory com bloco navy embutido |
| 08 FAQ | ivory |
| 09 Footer | navy-deep |

---

# SEÇÃO 01 — HERO

**Status:** Implementado. Documentar para coerência das próximas seções.

### Arquétipo e Constraints
- **Arquétipo:** Editorial (Baseados em Tipografia) — layout de revista com tipografia como elemento principal.
- **Constraints:**
  - Tipografia · Mixed Fonts (Playfair italic + Inter uppercase tracking)
  - Tipografia · Mixed Weights (400 regular Playfair + 500 italic Playfair + 500 Inter uppercase)
  - Layout · Asymmetric (ordinal editorial no topo, título centrado com respiração assimétrica)
  - Cor · Selective Color (apenas ouro como accent sobre navy/ivory)
  - Movimento · Stagger pós-load (5 elementos revelam em sequência)
- **Justificativa:** O escritório é premium, editorial, tradicional mas não engessado. Tipografia é o protagonista porque transmite seriedade e craft, sem recorrer a fotos/stock que empobrecem advocacia.

### Conteúdo (exato)
- Ordinal: `Est.` `MMXX` `Belo Horizonte · MG`
- Kicker: `Advocacia em Direito Civil`
- H1:
  ```
  Sua causa merece
  estratégia, <em>clareza</em>
  e atenção real.
  ```
- Lede: `Há cinco anos em Belo Horizonte, defendemos seus direitos com linguagem direta, resposta rápida e acompanhamento próximo do início ao fim do processo.`
- CTA primário: `Agendar consulta gratuita →`
- CTA secundário: `Conheça as áreas`
- Index (6 áreas, numeração romana I–VI): Direito de Família, Direito das Sucessões, Direito Contratual, Direitos Reais, Obrigações & Responsabilidade Civil, Parte Geral · Direito das Pessoas

### Layout
- `min-height: 100vh`
- `padding: clamp(160px, 18vh, 200px) var(--page-pad-x) 48px`
- `display: grid; grid-template-rows: 1fr auto` (conteúdo flui acima, index como footer ancorado)
- `text-align: center`
- Background composto: `radial-gradient(1200px 600px at 50% 10%, rgba(175,143,71,.12), transparent 60%), radial-gradient(900px 500px at 50% 95%, rgba(10,21,56,.85), transparent 55%), var(--navy)`
- Ornamento de fundo: colunas verticais 120px em `rgba(201,207,221,.04)` com mask radial (papel-grid sutil)

### Tipografia
- Ordinal: Inter 500, 10px / letter-spacing 3px / UPPERCASE / color mist @70%. "MMXX" em Playfair italic 400, 18px, color gold. Separador `·` em gold @60%.
- Kicker: Inter 500, `var(--fs-kicker)`, letter-spacing 3px, UPPERCASE, color gold. Flanqueado por duas `kicker__rule` (48×1px gold @70%).
- H1: Playfair 400, `var(--fs-hero)` [44–112px], line-height 1.02, letter-spacing -0.02em, color ivory. `em` = italic 500 color gold. `max-width: 22ch`.
- Lede: Inter 300, `var(--fs-lede)` [17–20px], line-height 1.55, color `rgba(245,239,224,.78)`, `max-width: 56ch`.

### Cores
- Background: navy com gradientes (ver Layout)
- Texto principal: ivory
- Accent (italic H1, kicker, rules, numerais romanos): gold
- Ordinal e metadados: mist @70%
- Botão primário: bg gold / fg navy / border gold
- Botão secundário: bg transparent / fg ivory / border `rgba(245,239,224,.28)`

### Elementos Visuais
- Botão primário: padding 16×28, border-radius 2px, texto UPPERCASE 13px letter-spacing 1.2px, ícone `→` 16px ao lado do texto com `transition: transform .3s ease`
- Botão secundário: mesmo formato, sem ícone
- Index das áreas: grid 3 colunas com `gap: 1px` e background `rgba(201,207,221,.12)` (cria divisores 1px entre células). Cada item: padding 18×20, numeração romana em Playfair italic 20px gold, separador `—` mist @40%, título em Inter 400 13px ivory @75%.

### Animações
- **Stagger de entrada** (pós-load, roda uma vez):
  - Ordinal: `--d: .05s`
  - Kicker: `--d: .15s`
  - H1: `--d: .3s`
  - Lede: `--d: .5s`
  - CTAs: `--d: .65s`
  - Index: `--d: .9s`
- Cada um usa keyframe `rise-in` 1.1s cubic-bezier(.2,.7,.2,1).

### Interatividade
- Botão primário hover: `translateY(-2px)` + bg → ivory + border → ivory + shadow `0 18px 40px -20px rgba(0,0,0,.6)`. Ícone `→` translateX 4px.
- Botão secundário hover: border → gold + color → gold
- Nav link hover: `::after` underline gold cresce esquerda → direita em 350ms cubic-bezier(.2,.7,.2,1) + color → gold
- Index de áreas: hover em cada li → background `rgba(175,143,71,.05)` fade in + color vai de `rgba(245,239,224,.75)` para ivory 100%

### Responsividade
- ≤1024px: ordinal reduz tamanho (9px / 16px MMXX); marginalia esconde
- ≤720px: ordinal esconde; nav colapsa deixando só CTA "Contato"; brand mark hero reduz para 44px; hero padding 100px vertical; CTAs viram coluna full-width; index vira 1 coluna

---

# SEÇÃO 02 — PROBLEMA

**Status:** Implementado. Documentar.

### Arquétipo e Constraints
- **Arquétipo:** Contained Center (Baseados em Foco) — coluna central com muito respiro, foco em leitura.
- **Constraints:**
  - Tipografia · Drop Cap (letra capitular italic gold)
  - Tipografia · Pullquote Editorial (quote destacado com hairline vertical)
  - Layout · Container Narrow (680px max-width para leitura)
  - Layout · Hairline Divider (topo e base em gradient)
  - Cor · Low Contrast (ivory com ink-muted — leitura calma)

### Conteúdo
- Kicker: `Primeiro passo`
- H2: `Você não precisa<br>passar por isso <em>sozinho</em>.`
- Parágrafo 1 (com dropcap): `Quando um problema jurídico aparece — uma separação, um inventário, uma cobrança indevida, uma disputa de imóvel — a sensação mais comum é de estar perdido. O processo tem uma linguagem que ninguém explica. Os prazos aparecem sem aviso. E a impressão é de que o tempo simplesmente não passa.`
- Pullquote: `Processos que se arrastam sem explicação. Advogados que somem depois de assinar o contrato. Linguagem técnica que ninguém entende.`
- Parágrafo 2: `É justamente por isso que o Soares e Melo Advocacia existe: resolver seu caso com competência técnica e, acima de tudo, manter você informado e confiante em cada etapa. Você fala sempre com o advogado responsável. Você entende o que está acontecendo. E sabe, desde o início, quanto vai pagar e quanto tempo vai levar.`
- Assinatura final: `É assim que acreditamos que advocacia deve ser feita.`

### Layout
- Background: `var(--ivory)`
- `padding: var(--page-pad-y) var(--page-pad-x)` + inner `max-width: 680px; margin: 0 auto; padding: clamp(60px, 10vw, 120px) 0`
- Hairline wide no topo E na base (gradient transparent → gold@45% 12-88% → transparent)

### Tipografia
- Kicker: Inter 500, 10–12px, letter-spacing 3px, UPPERCASE, color navy. Rule esquerda em navy @35%.
- H2: Playfair 400, `var(--fs-h2)` [34–72px], line-height 1.02, letter-spacing -0.015em, color navy. `em` italic 500 color gold.
- Prose: Inter 400, `var(--fs-body)` [15–17px], line-height 1.75, color ink-muted, max-width 62ch.
- Lead paragraph: Inter 400, tamanho +1px, color ink.
- Dropcap: Playfair 400 italic, font-size 5.4em, line-height 0.82, color gold, float left, margin `0.12em 0.14em 0 -0.04em`.
- Pullquote: Playfair 400 italic, `clamp(22px, 1.8vw + 14px, 30px)`, line-height 1.35, color navy, letter-spacing -0.005em. Aspa decorativa Playfair 80px gold @40% top-left.
- Signature: Playfair italic 400, 17px, color navy @75%, text-align center.

### Cores
- bg: `#F5EFE0`
- texto: `#555` (prose) e `#1a1a1a` (lead)
- dropcap + italic + pullquote-mark + rule: `#AF8F47`
- títulos: `#0F1E4A`

### Elementos Visuais
- Pullquote: border-left 1px gold, padding-left 40px (24px mobile), padding-block 32px, margin-block 48px.
- Aspa decorativa: absoluta em top -8px left 24px, opacity 0.4.
- Assinatura: `hair--short` (48×1px gold @80%) acima do texto, 20px gap.

### Animações
- Kicker, H2, lead paragraph: scroll-linked. Entram com `rise-in` 1s quando topo atinge 15% do viewport.
- Pullquote: atraso adicional de 100ms após o lead. Adiciona efeito de `clip-path: inset(0 100% 0 0)` → `inset(0 0 0 0)` em 900ms cubic-bezier(.2,.7,.2,1) para "revelar da esquerda".
- Signature: fade-in simples 600ms quando entra viewport.

### Interatividade
- Sem interações ativas. Seção é puramente narrativa.

### Responsividade
- ≤720px: padding inner reduz para 40px; pullquote padding-left 24px + aspa em 12px/-4px/font 56px; dropcap 4.4em; hair wide mantém.

---

# SEÇÃO 03 — DIFERENCIAIS

### Arquétipo e Constraints
- **Arquétipo:** Split Assimétrico (Baseados em Divisão) — divisão 40/60 com "índice" lateral de kickers numerados em uma coluna e a "entrada" expandida do item ativo na outra.
- **Constraints:**
  - Tipografia · Headline Full Width ("POR QUE · SOARES & MELO" ocupando 100% como faixa editorial de abertura, tratada como title-rule)
  - Tipografia · Numerals Italic (01., 02., 03.... em Playfair italic gold, tamanho 32–48px)
  - Layout · Sticky Element (coluna direita com item ativo sticky durante scroll interno)
  - Layout · Hairline Divider (divisores horizontais 1px gold@20% entre cada item)
  - Interação · Hover Reveal (hover em cada item expande uma descrição curta com clip-path)
  - Cor · Selective Color (ouro para numerais e accent)
- **Justificativa:** Cada diferencial precisa de peso individual. Split com numeração editorial + hover reveal cria hierarquia de revista (índice + entrada desenvolvida) em vez do genérico "6 cards com ícones".

### Conteúdo

**Kicker (abertura):** `Por que escolher`
**H2:** `Um jeito diferente de fazer<br><em>advocacia</em> em Belo Horizonte.`

**Itens (numeração 01–06):**
1. **Atendimento direto com o advogado responsável.** Você não é passado para estagiários ou secretárias. Fala sempre com quem cuida do seu caso.
2. **Linguagem clara, sem juridiquês.** Cada etapa do processo é explicada de forma que você realmente entende o que está acontecendo e o que vem pela frente.
3. **Resposta rápida por WhatsApp.** Nada de ficar dias sem retorno. Se você perguntou, vamos responder no mesmo dia.
4. **Transparência total em prazos e custos.** Você sabe desde o início quanto vai pagar, em que etapa e por quais serviços. Sem surpresas.
5. **Consulta inicial gratuita.** Antes de contratar, converse com um advogado sem compromisso e saia com clareza sobre o que fazer.
6. **Estratégia personalizada.** Cada caso é único. Construímos juntos um plano pensado especificamente para seus interesses.

### Layout
- Background: `var(--navy)` + noise overlay sutil (ver Elementos Visuais).
- Padding: `var(--page-pad-y) var(--page-pad-x)`.
- Inner: `max-width: var(--content-max); margin: 0 auto`.

**Header da seção** (full width do inner):
- Stack vertical: kicker → H2. Max-width 780px. text-align: left.
- Margin-bottom: 80px.

**Grid principal** (desktop ≥900px):
- `display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr); gap: clamp(48px, 6vw, 96px)`
- **Coluna esquerda (índice sticky):** contém o título "I N D I C E" e uma lista vertical de numerais ativos. `position: sticky; top: 140px; align-self: start;` alturas máximas dos itens 60px. Os numerais servem como navegação visual durante o scroll.
- **Coluna direita (itens detalhados):** lista com cada item ocupando sua própria "linha" de 1px hairline gold@20%. Cada item: padding-block 40px, display grid 2 colunas (60px numeral + 1fr conteúdo).

### Tipografia
- Kicker de seção: Inter 500, 10–12px, letter-spacing 3px, UPPERCASE, gold, com rule direita.
- H2: Playfair 400, var(--fs-h2), line-height 1.02, letter-spacing -0.015em, ivory; `em` = italic 500 gold.
- Índice sticky (kicker "Índice"): Inter 500 10px tracking 3px UPPERCASE color gold @70%.
- Item numeral: Playfair 400 italic, 48px desktop (clamp(32px, 2.4vw + 18px, 52px)), line-height 0.9, color gold.
- Item título (bold): Inter 600, 18px (clamp(16px, 0.4vw + 14px, 20px)), letter-spacing -0.005em, color ivory.
- Item descrição: Inter 400, 15px (`var(--fs-body)`), line-height 1.65, color `rgba(245,239,224,.68)`, max-width 52ch.

### Cores
- bg: `#0F1E4A`
- Noise overlay: PNG data-uri ou SVG `filter: turbulence` em 0.9 baseFrequency, mix-blend-mode: overlay, opacity 0.04.
- Divisores: `rgba(175,143,71,.18)` 1px.
- Numerais: `#AF8F47`.
- Título item: `#F5EFE0`.
- Descrição: `rgba(245,239,224,.68)` → hover `rgba(245,239,224,.92)`.

### Elementos Visuais
- **Background noise** (sutil, premium feel): SVG inline ou pseudo-element `::before` com `background-image: url("data:image/svg+xml,...")`, opacity 0.04, mix-blend-mode overlay.
- **Divisor entre itens:** 1px gold@18% full-width da coluna direita. Primeiro item NÃO tem hairline superior (abre direto).
- **Ornamento da coluna sticky:** filete vertical 1px gold@30% ligando o topo ao fim da lista, posicionado à esquerda dos numerais.
- **Numerals no índice sticky:** Mostrados em grid 2×3, cada um 40×40px, Playfair italic 20px gold. O numeral "ativo" (da entrada sendo lida) ganha `color: ivory` + pseudo-border `box-shadow: 0 0 0 1px gold@40%` rounded 2px.

### Animações
- **Header da seção:** rise-in no scroll (entry 15% cover 25%), kicker primeiro, H2 delay 120ms.
- **Cada item da lista:** scroll-linked individual com `animation-timeline: view()`. Numeral entra com `translateY(20px) + opacity 0 → 0 + 1` em 800ms. Título e descrição sobem com stagger de 80ms.
- **Numeral ativo no índice:** transição suave 400ms ease no `color` e `box-shadow` quando o usuário rola sobre o item correspondente (IntersectionObserver).
- **Hover reveal:** clip-path `inset(0 100% 0 0)` → `inset(0 0 0 0)` em 600ms cubic-bezier(.2,.7,.2,1) numa linha dourada de 2px que aparece abaixo do título do item em hover.

### Interatividade
- **Hover em item:** descrição passa de opacity 0.68 → 0.92; numeral ganha micro `translateX(-2px)` em 300ms ease; aparece hairline dourada 2px de 40px abaixo do título (clip-path reveal).
- **Scroll spy:** IntersectionObserver no conjunto dos 6 itens; quando um item atinge 40% do viewport, a numeração correspondente na coluna esquerda assume o estado ativo.
- **Click no numeral sticky:** scroll smooth até o item correspondente (offset -120px para header).

### Responsividade
- **≤900px:** grid colapsa para 1 coluna. Coluna esquerda (índice sticky) some; numerais ficam inline junto aos itens.
- **≤720px:** numerais reduzem para 32px; item padding-block 28px; descrição line-height 1.55.

---

# SEÇÃO 04 — ÁREAS DE ATUAÇÃO

### Arquétipo e Constraints
- **Arquétipo:** Bento Box Editorial (Baseados em Grid) — 6 áreas em grid assimétrico com uma área "principal" maior em destaque + 5 menores.
- **Constraints:**
  - Layout · Bento Box (grid 4 cols × 3 rows com células de tamanhos diferentes)
  - Layout · Container Wide (quase full width, respeitando content-max)
  - Tipografia · Numerals Italic (I, II, III romanos em gold italic 28px no canto de cada célula)
  - Interação · Hover Lift + Hover Reveal (card sobe 4px + revela ícone/linha dourada inferior)
  - Movimento · Stagger (6 células revelam em sequência ao entrar viewport, delays escalados)
  - Cor · Color Blocking (cada célula alterna sutil entre ivory puro e ivory-soft)
- **Justificativa:** Evita o "6 cards idênticos lado a lado". A hierarquia de tamanhos sugere importância relativa (família é maior porque é o maior volume de casos) e quebra a monotonia grid simétrico. Mantém editorial ao usar numeração romana como ornamento.

### Conteúdo

**Kicker:** `Áreas de atuação`
**H2:** `Direito Civil em todas as<br><em>dimensões</em> da sua vida.`
**Lede:** `Atuamos de forma ampla em todas as áreas do Direito Civil, tanto na esfera consultiva (prevenção de problemas) quanto contenciosa (defesa em processos já instaurados).`

**Células** (cada uma com: numeral romano, título, subtítulo curto de especialidades, CTA):

1. **I — Direito de Família** (célula GRANDE, 2×2)
   Divórcio · Pensão alimentícia · Guarda de filhos · União estável · Regulamentação de convivência
   CTA: `Conhecer →`

2. **II — Direito das Sucessões** (célula média, 2×1)
   Inventários judiciais e extrajudiciais · Testamentos · Planejamento sucessório
   CTA: `Conhecer →`

3. **III — Direito Contratual** (célula pequena, 1×1)
   Elaboração, análise e revisão de contratos
   CTA: `Conhecer →`

4. **IV — Direitos Reais** (célula pequena, 1×1)
   Usucapião · Regularização de imóveis · Disputas patrimoniais
   CTA: `Conhecer →`

5. **V — Obrigações & Responsabilidade Civil** (célula média, 2×1)
   Cobranças · Indenizações por danos materiais e morais · Reparação de prejuízos
   CTA: `Conhecer →`

6. **VI — Parte Geral e Direito das Pessoas** (célula pequena, 1×1)
   Capacidade civil · Direitos da personalidade · Proteção individual
   CTA: `Conhecer →`

### Layout
- Background: `var(--ivory)`.
- Padding: `var(--page-pad-y) var(--page-pad-x)`.
- Inner: `max-width: var(--content-max); margin: 0 auto`.

**Header da seção:**
- Kicker + H2 + lede. Max-width 780px. Text-align left. Margin-bottom 64px.

**Grid Bento (desktop ≥1024px):**
```
grid-template-columns: repeat(4, 1fr);
grid-template-rows: repeat(3, minmax(180px, auto));
gap: 1px;
background: rgba(15,30,74,.08);  /* cria "linhas" de grade */
```

Posicionamento das células:
- `.cell-I    { grid-column: 1 / 3; grid-row: 1 / 3; }`     /* 2×2 */
- `.cell-II   { grid-column: 3 / 5; grid-row: 1 / 2; }`     /* 2×1 */
- `.cell-III  { grid-column: 3 / 4; grid-row: 2 / 3; }`     /* 1×1 */
- `.cell-IV   { grid-column: 4 / 5; grid-row: 2 / 3; }`     /* 1×1 */
- `.cell-V    { grid-column: 1 / 3; grid-row: 3 / 4; }`     /* 2×1 */
- `.cell-VI   { grid-column: 3 / 5; grid-row: 3 / 4; }`     /* 2×1 */

**Cada célula:**
- bg: ivory (ou ivory-soft alternado via `:nth-child`)
- padding: 32–48px (clamp para cell pequena 28px, média 36px, grande 56px)
- display: flex flex-column justify-content: space-between
- Position relative (para numeral absoluto)

### Tipografia
- Kicker seção: Inter 500, 10–12px, tracking 3px, UPPERCASE, gold.
- H2: Playfair 400, `var(--fs-h2)`, line-height 1.02, letter-spacing -0.015em, navy. `em` italic 500 gold.
- Lede: Inter 300, `var(--fs-lede)`, line-height 1.55, color `#555`, max-width 62ch.
- **Numeral da célula** (I, II, III…): Playfair 400 italic, 28px (célula pequena) / 36px (média) / 56px (grande); position absolute top 24px right 28px; color `rgba(175,143,71,.45)`. Hover: passa para `rgba(175,143,71,1)` em 300ms.
- **Título da célula:** Playfair 400, `var(--fs-h3)` [22–34px], line-height 1.05, letter-spacing -0.01em, navy. Célula grande: 40–48px (+25%).
- **Especialidades (subtítulo):** Inter 400, 14px, line-height 1.5, color `#555`, separados por "·" em gold@50%.
- **CTA da célula:** Inter 500, 12px, letter-spacing 1.5px, UPPERCASE, color navy. Seta "→" em gold, 14px, translate X em hover.

### Cores
- bg seção: `#F5EFE0`
- bg células: alterna `#F5EFE0` (I, III, V) e `#FBF8F0` (II, IV, VI)
- Divisores grid: `rgba(15,30,74,.08)` 1px
- Títulos: `#0F1E4A`
- Especialidades: `#555`
- Numeral repouso: `rgba(175,143,71,.45)`
- Numeral hover: `#AF8F47`
- CTA seta: `#AF8F47`

### Elementos Visuais
- **Filete dourado na base de cada célula** (apenas no hover): 100% width × 2px gold, aparece com clip-path `inset(0 100% 0 0)` → `inset(0 0 0 0)` em 500ms.
- **Numeral grande gold** no canto superior direito de cada célula como assinatura editorial.
- **Seta animada** no CTA inferior de cada célula.
- **Célula "Família" (I):** além do conteúdo, ganha uma linha sutil de detalhe — dois blocos pequenos de texto `Consultivo · Contencioso` abaixo das especialidades (etiquetas 10px tracking 2px UPPERCASE gold@70%, separadas por hairline vertical 1px).

### Animações
- **Header:** rise-in stagger (kicker .1s, H2 .25s, lede .4s) no scroll (entry 15%).
- **Células:** stagger baseado em ordem de leitura natural (I, II, III, IV, V, VI). Delays: 0s, .08s, .14s, .2s, .26s, .32s. Cada uma rise-in 800ms + `scale(.98)` → `scale(1)` em 800ms cubic-bezier(.2,.7,.2,1).
- **Numeral:** scroll-linked parallax — move 12px para cima conforme célula passa pelo viewport (CSS `animation-timeline: view()`).

### Interatividade
- **Célula hover:**
  - `translateY(-4px)` em 400ms cubic-bezier(.2,.7,.2,1)
  - Numeral passa de opacity 0.45 → 1
  - Filete dourado inferior revelado esquerda → direita
  - bg tint: se célula era ivory-soft, fica ivory puro (ou vice-versa, para sensação de "acendeu")
  - Título: color mantém navy mas letter-spacing vai de `-0.01em` → `-0.005em` (micro respiração)
- **CTA "Conhecer →" hover:** color do texto → gold + seta translateX 4px.
- **Clique em célula:** navega para `/[slug-da-area]/` (placeholder enquanto páginas não existem).
- **Click/tap mobile:** estado hover aplicado em tap, mantém até sair do foco.

### Responsividade
- **≤1024px:** grid colapsa para `repeat(2, 1fr)` com todas as células 1×1. Famíia perde o 2×2 mas ganha borda dourada 1px top como "selo" de destaque.
- **≤720px:** 1 coluna, células full width. Numerais reduzem para 24px. Padding 24px.

---

# SEÇÃO 05 — COMO FUNCIONA

### Arquétipo e Constraints
- **Arquétipo:** Scroll Storytelling com Sticky Side (Baseados em Fluxo) — coluna esquerda fixa com numeral romano gigante que muda conforme o usuário rola pelos 4 passos à direita.
- **Constraints:**
  - Layout · Sticky Element (coluna esquerda sticky durante scroll da seção)
  - Tipografia · Headline >150px (numeral romano gigante sticky, até 220px)
  - Movimento · Scroll Progress (numeral muda em pontos específicos do scroll)
  - Movimento · Draw SVG (linha conectora vertical entre os passos "cresce" conforme scroll)
  - Cor · Selective Color (somente gold para numerais e connector)
  - Estrutura · Timeline editorial (não o timeline SaaS com ícones circulares)
- **Justificativa:** Atendimento jurídico é processo. Mostrar os passos com numeral gigante que "avança" cria narrativa cinematográfica. Diferente do "4 cards lado a lado com checkmarks".

### Conteúdo

**Kicker:** `O processo`
**H2:** `Em poucas horas você sai da dúvida<br>e entra em um <em>plano claro</em>.`

**Passos:**

**I — Contato inicial**
Você preenche o formulário com nome e telefone. Em minutos, retornamos pelo WhatsApp para entender sua situação.
Metadado lateral: `0 — 10 min`

**II — Consulta gratuita**
Conversamos com atenção sobre seu caso, esclarecemos suas dúvidas e apresentamos as melhores alternativas. Sem compromisso.
Metadado lateral: `30 — 60 min`

**III — Estratégia personalizada**
Se decidir seguir com o escritório, traçamos juntos um plano com prazos, custos e etapas bem definidas.
Metadado lateral: `1 — 3 dias`

**IV — Acompanhamento próximo**
Durante todo o processo você é atualizado regularmente e tem contato direto com o advogado responsável pelo seu caso.
Metadado lateral: `Durante todo o caso`

### Layout
- Background: `var(--ivory)` com "side-rail" navy à esquerda (ver Elementos Visuais).
- Padding: `var(--page-pad-y) var(--page-pad-x)`.
- Inner: `max-width: var(--content-max); margin: 0 auto`.

**Header:** kicker + H2, text-align left, max-width 780px, margin-bottom 80px.

**Grid principal:**
```
display: grid;
grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.6fr);
gap: clamp(48px, 8vw, 120px);
```

**Coluna esquerda (sticky):**
- `position: sticky; top: 140px; align-self: start; height: fit-content`
- Contém: numeral romano gigante (muda I→IV), sublinha "Etapa" em kicker + label da etapa.
- Numeral: 180–220px, Playfair 400 italic, gold. Transição entre numerais: 500ms ease-out com cross-fade (opacity + translateY 8px).

**Coluna direita (passos):**
- Cada passo: padding-block 80px, display grid 2 cols (100px metadado lateral + 1fr conteúdo).
- Divisores: hairline gold@20% entre os passos.
- Primeiro passo sem divisor superior.

### Tipografia
- Kicker seção: gold, padrão editorial.
- H2: Playfair 400, fs-h2, navy. `em` italic gold.
- Numeral gigante sticky: Playfair 400 italic, `clamp(120px, 14vw + 30px, 220px)`, line-height 0.85, color gold.
- Label sticky ("Etapa I · Contato inicial"): Inter 500, 11px, tracking 2.5px, UPPERCASE, color navy @70%.
- Metadado lateral dos passos: Inter 500, 11px, tracking 2px, UPPERCASE, color gold.
- Título do passo: Playfair 400, clamp(26px, 1.6vw + 16px, 38px), line-height 1.1, letter-spacing -0.01em, navy.
- Descrição do passo: Inter 400, var(--fs-body), line-height 1.7, color #555, max-width 52ch.

### Cores
- bg: `#F5EFE0`
- Side-rail vertical (ornamento): 1px `rgba(175,143,71,.3)` na divisa das colunas esquerda/direita, desenhado como SVG que "draw" conforme scroll.
- Numeral gigante: `#AF8F47`
- Títulos: `#0F1E4A`
- Descrição: `#555`
- Metadado lateral: `#AF8F47`

### Elementos Visuais
- **Side-rail (linha conectora vertical SVG):** posicionada na divisa coluna esq/direita. SVG line com `stroke-dasharray` calculado; `stroke-dashoffset` anima de 100% → 0% conforme scroll progride na seção (CSS `animation-timeline: scroll(self)`). Stroke 1px gold.
- **Markers nos passos:** pequeno losango (◆) 8×8px gold, rotacionado 45°, posicionado exatamente na altura do título de cada passo sobre o side-rail. Aparece com scale 0→1 em 400ms quando o passo entra viewport.
- **Numeral cross-fade:** quando um passo atinge 45% do viewport, o numeral sticky troca para o próximo (I → II → III → IV). Durante a transição: opacity 1→0 em 250ms, depois novo numeral 0→1 em 250ms, com translateY (8px, 0, -8px) easing.

### Animações
- **Header:** rise-in stagger.
- **Numeral sticky:** cross-fade 500ms total (250+250) disparado por IntersectionObserver nos passos (threshold 0.45).
- **SVG side-rail:** scroll-linked draw — `stroke-dashoffset` animado com `animation-timeline: view()` (range `cover 0%` a `cover 100%`).
- **Cada passo:** entra com rise-in stagger interno — metadado lateral (.0s), título (.12s), descrição (.24s).
- **Losango marker:** scale 0→1 + rotate 0→45° em 500ms quando passo entra viewport.

### Interatividade
- **Hover sobre numeral sticky:** cursor: pointer; ao clicar, abre modal `"Agendar agora"` (ou scroll para seção CTA).
- **Hover sobre passo:** título passa color navy → gold em 250ms; cursor default (não é clicável).
- **Scroll experience:** rolagem suave (já global). Numeral sticky é a principal "linha do tempo" visual.

### Responsividade
- **≤1024px:** grid vira 1 coluna. Numeral fica no topo de cada passo (inline, 80px) em vez de sticky. Metadado lateral some ou vira texto inline.
- **≤720px:** padding-block dos passos 48px; numeral inline 56px; títulos clamp(22px, .).

---

# SEÇÃO 06 — SOBRE O ESCRITÓRIO

### Arquétipo e Constraints
- **Arquétipo:** Layered com Overlap (Baseados em Camadas) — Crest gigante em marca d'água atrás + bloco de texto sobre + linha de assinatura flutuante.
- **Constraints:**
  - Layout · Overlap Elements (Crest se sobrepõe parcialmente ao bloco de texto)
  - Mídia · SVG Ilustração (Crest em large como elemento principal)
  - Interação · Mouse Parallax (Crest desloca sutilmente conforme mouse move)
  - Tipografia · Pullquote Editorial (filosofia do escritório em italic grande)
  - Cor · Selective Color (crest em gold@18% como watermark)
- **Justificativa:** Seção institucional quer transmitir peso histórico e craft. Crest como elemento central (em watermark) cria presença visual premium sem depender de fotos do escritório. Layered funciona como identidade visual "com ar de marca clássica".

### Conteúdo

**Kicker:** `O escritório`
**H2:** `Advocacia feita com <em>rigor</em>,<br>em Belo Horizonte desde MMXX.`

**Parágrafo 1:** `Fundado em Belo Horizonte, o Soares e Melo Advocacia atua há cinco anos oferecendo soluções jurídicas completas em todas as áreas do Direito Civil.`

**Pullquote (filosofia):**
> `Cada cliente merece atenção verdadeira, clareza sobre seu caso e uma estratégia pensada especificamente para seus interesses.`

**Parágrafo 2:** `Atuamos com ética, transparência e compromisso total — tanto na prevenção de conflitos por meio de orientação consultiva, quanto na defesa ativa dos direitos de nossos clientes em processos judiciais.`

**Stats (3 indicadores em faixa inferior):**
- `05` anos de atuação
- `06` áreas do Direito Civil
- `100%` foco em Direito Civil

**CTA:** `Conhecer o escritório →` (linkado para página Sobre, futura)

### Layout
- Background: `var(--navy)`.
- Padding: `var(--page-pad-y) var(--page-pad-x)`.
- Inner: `max-width: var(--content-max); margin: 0 auto`.
- Min-height: 720px para dar respiro ao Crest.

**Estrutura (desktop):**
- Position: relative para permitir overlap.
- **Crest (SVG):** position absolute, right -60px, top 50%, transform translateY(-50%), width 520px, opacity 0.12, fill gold.
- **Bloco de texto principal:** position relative z-index 2, max-width 640px, margin-left: clamp(0px, 6vw, 80px) (alinha à esquerda).
- **Stats:** grid 3 colunas abaixo do bloco de texto, margin-top 96px, com hairline gold@25% no topo.

### Tipografia
- Kicker: gold + rule direita.
- H2: Playfair 400, var(--fs-h2), line-height 1.02, letter-spacing -0.015em, ivory. `em` italic 500 gold.
- Parágrafos: Inter 300, var(--fs-lede) (17–20px), line-height 1.6, color `rgba(245,239,224,.78)`, max-width 58ch.
- Pullquote: Playfair 400 italic, clamp(26px, 2vw + 14px, 36px), line-height 1.3, color ivory. Margin-block 48px. Border-left 1px gold, padding-left 32px.
- Stats — número: Playfair 400 italic, 56px (clamp(40px, 3vw + 16px, 64px)), line-height 1, color gold.
- Stats — label: Inter 500, 11px, tracking 2.5px, UPPERCASE, color `rgba(245,239,224,.6)`. Margin-top 8px.
- CTA: Inter 500, 12px, tracking 1.5px, UPPERCASE, color gold. Seta gold + underline gold @ 0→100% width em hover.

### Cores
- bg: `#0F1E4A`
- Crest (watermark): `#AF8F47` com opacity 0.12
- Ivory text: `rgba(245,239,224,.78)`
- Pullquote: ivory
- Stats num: gold
- Stats label: ivory @60%
- Hairline stats: `rgba(175,143,71,.25)`

### Elementos Visuais
- **Crest SVG (soares-melo-crest-ouro.svg)**: elemento decorativo gigante, 520px desktop, corrigido com `mix-blend-mode: normal` e opacity 0.12. À direita, transbordando parcialmente da área de conteúdo (bleed right 60px).
- **Linha de assinatura** acima do CTA: hair short (40×1px gold).
- **Stats divisores:** 1px gold@20% entre as 3 colunas (vertical dividers) e 1px gold@25% no topo da faixa.

### Animações
- **Header:** rise-in stagger.
- **Crest:** mouse parallax sutil — `transform: translate3d(calc(var(--mx, 0) * 12px), calc(var(--my, 0) * -8px), 0) translateY(-50%)` onde `--mx` e `--my` são -0.5 a 0.5 baseados em posição do mouse. Debounce 16ms.
- **Crest (scroll):** rotação lenta `rotate(0 → 6deg)` entre `entry 0%` e `exit 100%` (animation-timeline: view()).
- **Pullquote:** clip-path reveal (inset 0 100% 0 0 → inset 0 0 0 0) 900ms cubic-bezier(.2,.7,.2,1) quando entra viewport.
- **Stats:** counter animation — números contam de 0 até o valor final em 1.4s cubic-bezier(.2,.7,.2,1) quando stats entram viewport. Labels sobem com rise-in stagger 80ms após cada número.

### Interatividade
- **Mouse parallax no Crest** (ver Animações).
- **Hover no CTA:** underline gold cresce esquerda→direita 350ms cubic-bezier; seta translateX 4px.
- **Stats hover:** número muda color gold → gold-soft em 250ms.

### Responsividade
- **≤1024px:** Crest reduz para 360px, reposiciona como top-right -40px/-40px, opacity 0.08. Texto full-width do inner.
- **≤720px:** Crest vira watermark de fundo centralizado 280px opacity 0.06. Stats em coluna única com hairline horizontal entre elas. Pullquote padding-left 20px.

---

# SEÇÃO 07 — CTA FINAL (formulário)

### Arquétipo e Constraints
- **Arquétipo:** Isolated Element (Baseados em Foco) — formulário em "cartão" navy embutido em faixa ivory, ÚNICO foco da seção.
- **Constraints:**
  - Layout · Container Narrow (bloco central 720px)
  - Layout · Overlap Elements (bloco navy sobe sobre a base ivory, com sombra profunda)
  - Tipografia · Headline dramática italic
  - Movimento · Draw SVG (linha dourada decorativa do lado do formulário que desenha conforme scroll)
  - Cor · High Contrast (bloco navy escuro sobre ivory claro — chama atenção)
- **Justificativa:** É o ponto de conversão. Precisa roubar a cena. Bloco navy isolado + sombras = presença visual e destaque natural para preencher o form.

### Conteúdo

**Kicker:** `Consulta gratuita`
**H2:** `Seu caso merece<br><em>atenção</em> agora.`
**Lede:** `Preencha os campos abaixo e converse gratuitamente com um de nossos advogados. Em poucos minutos, você sai com mais clareza sobre o que fazer.`

**Formulário:**
- Nome completo (placeholder: "Como podemos te chamar?")
- Telefone (WhatsApp) (placeholder: "(31) 9 0000-0000", mask automática)
- Botão: `Falar com um advogado agora →`

**Texto de apoio:** `Seus dados são confidenciais e usados apenas para retornar o contato.`

**Alternativa:** "Ou direto pelo WhatsApp" com link `wa.me/...` e o número visível.

### Layout
- Background: `var(--ivory)`.
- Padding: `var(--page-pad-y) var(--page-pad-x)`.
- Inner: `max-width: 920px; margin: 0 auto`.

**Estrutura:**
- **Header** (kicker + H2 + lede): max-width 640px, centered text-align center, margin-bottom 64px.
- **Bloco do formulário** (navy card):
  - bg: `var(--navy)`
  - padding: clamp(40px, 6vw, 72px)
  - border-radius: 2px
  - border: 1px solid `rgba(175,143,71,.3)`
  - box-shadow: `0 32px 64px -24px rgba(15,30,74,.4)`
  - max-width: 720px; margin: 0 auto
  - position: relative (para o draw-SVG)

**Form fields:**
- Cada field em coluna vertical, gap 24px.
- Input: altura 56px, bg transparent, border-bottom 1px `rgba(245,239,224,.3)`, color ivory, font Inter 400 16px. Placeholder color `rgba(245,239,224,.4)`.
- Label flutuante acima do input: Inter 500 10px tracking 2.5px UPPERCASE gold.
- Focus: border-bottom vira gold em 300ms, label ganha color gold.

**Botão:**
- Full width do form.
- bg: gold, color: navy.
- padding: 18px, font Inter 500 13px tracking 1.5px UPPERCASE.
- Seta 16px → translate X em hover.
- Hover: bg → ivory, transform translateY(-2px), shadow 0 18px 40px -20px rgba(0,0,0,.5).

### Tipografia
- Kicker: gold, padrão.
- H2: Playfair 400, var(--fs-h2), navy, centered. `em` italic gold.
- Lede: Inter 300, var(--fs-lede), color `#555`, line-height 1.55, centered.
- Labels: Inter 500, 10px, tracking 2.5px, UPPERCASE, color gold.
- Inputs: Inter 400, 16px, color ivory.
- Botão: Inter 500, 13px, tracking 1.5px, UPPERCASE, color navy.
- Texto apoio: Inter 400, 12px, color `rgba(245,239,224,.5)`, italic Playfair opcional para sensação editorial, text-align center.
- Alternativa WhatsApp: Inter 500, 13px, gold, underline em hover.

### Cores
- bg seção: `#F5EFE0`
- Card: `#0F1E4A` com border `rgba(175,143,71,.3)`
- Inputs text: ivory; border: `rgba(245,239,224,.3)` → gold em focus
- Labels: gold
- Placeholder: `rgba(245,239,224,.4)`
- Botão: bg gold, fg navy; hover bg ivory, fg navy
- Texto apoio: `rgba(245,239,224,.5)`

### Elementos Visuais
- **Draw SVG decorativo:** linha diagonal 1px gold ao lado esquerdo do card (absolute position), SVG com `stroke-dasharray` e `stroke-dashoffset` animados via `animation-timeline: view()`. Vai de top-left (fora do card) descendo em curva até o canto superior direito do card. Como "linha de assinatura" ornamentando.
- **Micro-ornamento no topo do card:** pequeno losango ◆ gold 6×6 rotacionado centralizado, acima do primeiro input (separador visual).
- **Hairline entre campos:** nenhuma — apenas o border-bottom dos inputs.

### Animações
- **Header:** rise-in stagger.
- **Card:** entra com scale 0.98 → 1 + opacity 0 → 1 em 900ms cubic-bezier(.2,.7,.2,1), trigger quando 30% do card entra viewport.
- **Draw SVG:** desenha conforme scroll na seção.
- **Labels flutuantes:** se campo tem conteúdo OU está em focus, label move de `position inicial` (16px acima do input) para `position elevada` (translateY -6px + scale 0.9). Transição 250ms cubic-bezier.
- **Erro de validação:** shake horizontal (keyframe 5 passos em 400ms) + border-bottom red-muted `#A84848`.

### Interatividade
- **Input focus:** border-bottom gold + label color gold.
- **Input válido (após blur):** mantém border em gold suave + icon ✓ gold 12px à direita do input, fade-in 200ms.
- **Botão hover:** já descrito. Tem `transform: translateY(-2px)` + bg change + shadow.
- **Botão click:** pulse ripple (800ms circle opacity gold 0.3 → transparent).
- **Máscara de telefone:** `(XX) X XXXX-XXXX` auto-aplicada via JS enquanto digita.
- **Submit:** redireciona para WhatsApp com `wa.me/55{telefone}?text=Olá,%20meu%20nome%20é%20{nome}%20e%20gostaria%20de%20agendar%20uma%20consulta.` (abre nova aba).

### Responsividade
- **≤720px:** card padding 32px; botão fica 100% width mas texto do botão pode reduzir para `"Falar com advogado →"`; draw-SVG decorativo esconde.

---

# SEÇÃO 08 — FAQ

### Arquétipo e Constraints
- **Arquétipo:** Accordion Editorial com Index Lateral (Estruturas Especiais + Baseados em Divisão) — split com lista de perguntas numeradas à esquerda (fixa) e accordion full à direita. Mas com tratamento editorial: numerais romanos, hairlines, tipografia editorial em vez de bordas arredondadas.
- **Constraints:**
  - Layout · Split Assimétrico (40/60 em desktop, empilha em mobile)
  - Estrutura · Accordion sem "caixa" — apenas hairlines como separadores
  - Tipografia · Numerals Italic (I, II, III… das perguntas)
  - Movimento · Smooth expand (height auto via JS ou `grid-template-rows: 0fr → 1fr`)
  - Cor · Low Contrast (ivory soft com tipografia escura)
- **Justificativa:** FAQ tradicional é caixa feia. Tratamento editorial (numerais + hairlines + sem bordas) mantém o ritmo do resto do site.

### Conteúdo

**Kicker:** `Perguntas frequentes`
**H2:** `Antes de você<br><em>decidir</em>.`

**Perguntas:**

I — **A primeira consulta é realmente gratuita?**
Sim. A conversa inicial é sem compromisso e sem cobrança. Nosso objetivo é entender seu caso, esclarecer dúvidas e só então apresentar as opções para você decidir com calma.

II — **Vocês atendem apenas em Belo Horizonte?**
O escritório fica em Belo Horizonte, mas atendemos clientes de toda a região metropolitana e de outras cidades. Para casos fora de BH, também oferecemos atendimento online por videoconferência.

III — **Meu caso vai ser acompanhado pelo mesmo advogado do início ao fim?**
Sim. No Soares e Melo você não fica passando de pessoa em pessoa. Você tem contato direto com o advogado responsável durante todo o processo.

IV — **Quanto tempo demora para resolver um processo?**
Depende da natureza do caso. Na consulta inicial gratuita apresentamos uma estimativa realista baseada em nossa experiência com casos semelhantes.

V — **Como é feita a cobrança dos honorários?**
Trabalhamos com valores transparentes, apresentados antes de qualquer contratação. Você sabe exatamente quanto vai pagar, em que etapa e por quais serviços. Sem surpresas no meio do caminho.

VI — **Preciso mesmo de um advogado para um caso simples?**
Mesmo casos que parecem simples costumam ter detalhes que fazem diferença no resultado. Por isso oferecemos a consulta gratuita: para que você avalie, sem risco, se vale a pena seguir com apoio jurídico.

### Layout
- Background: `var(--ivory)`.
- Padding: `var(--page-pad-y) var(--page-pad-x)`.
- Inner: `max-width: var(--content-max); margin: 0 auto`.

**Header:** kicker + H2 — max-width 640px, left aligned, margin-bottom 72px.

**Grid principal:**
- `display: grid; grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.4fr); gap: clamp(48px, 8vw, 120px)`
- **Coluna esquerda (sticky index):** numerais I–VI em uma coluna com kicker "Perguntas" no topo. Sticky top 140px. Cada numeral clicável (scroll smooth até pergunta).
- **Coluna direita (accordion):** lista de perguntas, cada uma separada por hairline 1px gold@20% top+bottom. Primeira aberta por padrão.

**Cada pergunta (accordion item):**
- Button row: `display: grid; grid-template-columns: 60px 1fr 40px; align-items: baseline; gap: 16px; padding-block: 28px; cursor: pointer;`
  - Coluna 1: numeral romano Playfair italic gold
  - Coluna 2: pergunta (título)
  - Coluna 3: ícone `+` / `−` gold (rotate 45° quando aberto)
- Content row: `grid-template-rows: 0fr → 1fr`, padding-bottom 32px quando aberto, max-width 60ch, padding-left 76px (alinha com pergunta).

### Tipografia
- Kicker da seção: gold, padrão.
- H2: Playfair 400, var(--fs-h2), navy, com `em` italic gold.
- Index kicker: Inter 500, 10px, tracking 3px, UPPERCASE, color gold @80%.
- Index numerais: Playfair 400 italic, 22px, color gold @40%, hover/active → color gold 100% + translateX 2px.
- Numeral da pergunta (coluna esq do item): Playfair 400 italic, 24px, color gold.
- Pergunta (título): Playfair 400, 22–26px (clamp(20px, 0.6vw + 17px, 26px)), line-height 1.25, color navy. Hover (ou aberto): color gold.
- Resposta: Inter 400, var(--fs-body), line-height 1.75, color #555, max-width 60ch.

### Cores
- bg: `#F5EFE0`
- Divisores: 1px `rgba(175,143,71,.22)`
- Numerais: `#AF8F47`
- Título pergunta: `#0F1E4A` → hover/active `#AF8F47`
- Resposta: `#555`

### Elementos Visuais
- **Sem caixas, sem bordas arredondadas.** Apenas hairlines horizontais.
- **Ícone expand:** caractere `+` em Inter 300, 20px, gold. Rotate 45° quando aberto (transição 350ms cubic-bezier(.2,.7,.2,1)).

### Animações
- **Header:** rise-in stagger.
- **Expand item:** `grid-template-rows: 0fr → 1fr` em 500ms cubic-bezier(.2,.7,.2,1). Conteúdo fade 200ms → 100% opacity 300ms delay.
- **Numeral ícone:** rotate 0° → 45° em 350ms cubic-bezier.
- **Index numerais sticky:** numeral "atual" (baseado em última pergunta aberta OU última perga visível via IntersectionObserver) recebe color 100% + translateX 2px.

### Interatividade
- **Click em pergunta:** toggle aberto/fechado. Apenas UM aberto por vez (accordion comportamento "único") — opcional. Se preferir múltiplos abertos, explicitar ao dev.
- **Click em numeral do index:** scroll smooth até a pergunta correspondente + abre aquela pergunta + fecha as outras.
- **Hover em pergunta:** cor do título muda para gold.
- **Keyboard:** Enter/Space alterna aberto/fechado (acessibilidade ARIA-expanded).

### Responsividade
- **≤1024px:** grid 1 coluna. Index sticky some (numerais já aparecem inline junto às perguntas).
- **≤720px:** padding-block item 22px; pergunta tamanho 18px; padding-left do conteúdo reduz para 44px.

---

# SEÇÃO 09 — RODAPÉ

### Arquétipo e Constraints
- **Arquétipo:** Minimal Editorial (Baseados em Densidade) — poucos elementos, muito respiro, tipografia como único protagonista.
- **Constraints:**
  - Layout · Container Wide (usa quase todo o content-max)
  - Tipografia · Monospace Editorial (opcional — coordenadas e OAB em Inter Mono ou Inter tabular-nums)
  - Cor · High Contrast (navy deep com ivory/gold)
  - Elementos · SVG Seal como elemento de assinatura
- **Justificativa:** Rodapé não é seção de conteúdo novo. É fechamento editorial com marca, navegação compacta e disclaimer legal. Tem que respirar.

### Conteúdo

**Coluna 1 (marca):**
- SVG Seal (soares-melo-seal-ouro.svg) 88px
- Abaixo: "Soares e Melo Advocacia" (Playfair 400 italic, 20px, ivory) + "Belo Horizonte · Minas Gerais" (Inter 400, 12px, ivory @60%)

**Coluna 2 (áreas — 6 itens):**
- Kicker "Áreas"
- Links: Direito de Família / Sucessões / Contratual / Direitos Reais / Obrigações & Resp. Civil / Parte Geral

**Coluna 3 (escritório):**
- Kicker "Escritório"
- Links: Sobre / Time / Clientes / Contato

**Coluna 4 (contato):**
- Kicker "Contato"
- WhatsApp: (31) 9 XXXX-XXXX (mailto/tel link)
- E-mail: contato@soaresemelo.adv.br
- Endereço: Rua XYZ, 100 · Savassi · BH
- Horário: Seg–Sex · 9h às 18h

**Faixa inferior (compliance):**
- Nome "SOARES & MELO · ADVOCACIA · MMXX"
- OAB: OAB/MG XXX.XXX (registro profissional, opcional se fornecido)
- Disclaimer: `Em conformidade com o Código de Ética da OAB (Provimento 205/2021), este site tem caráter meramente informativo. Não oferecemos serviços jurídicos por meio deste canal — o contato inicial serve apenas para agendamento de consulta.`

### Layout
- Background: `var(--navy-deep)` (#0A1538).
- Padding: `96px var(--page-pad-x) 48px`.
- Inner: `max-width: var(--content-max); margin: 0 auto`.

**Grid principal (4 colunas):**
```
display: grid;
grid-template-columns: 1.4fr 1fr 1fr 1.2fr;
gap: clamp(32px, 4vw, 72px);
margin-bottom: 80px;
```

**Faixa inferior (compliance):**
- Separador: hairline gold@20% acima.
- Padding-block 32px.
- Display grid 2 cols: esquerda (nome + OAB), direita (disclaimer).
- Em mobile: empilha.

### Tipografia
- Kickers ("Áreas", "Escritório", "Contato"): Inter 500, 10px, tracking 3px, UPPERCASE, color gold. Margin-bottom 20px.
- Links das colunas: Inter 400, 14px, color `rgba(245,239,224,.7)` → hover `#AF8F47`. Line-height 2.
- Nome da marca: Playfair 400 italic, 20px, ivory.
- Localização sob logo: Inter 400, 12px, color ivory @60%.
- Contato (telefone/email): Inter 400, 14px, ivory @80%, hover gold, com underline animado.
- Faixa inferior — nome: Inter 500, 10px, tracking 3px, UPPERCASE, ivory @50%.
- Faixa inferior — OAB: Inter 400 tabular-nums, 12px, ivory @50%.
- Disclaimer: Inter 300, 11px, line-height 1.6, color ivory @45%, max-width 520px. Italic Playfair opcional para "Em conformidade com o Código de Ética da OAB".

### Cores
- bg: `#0A1538`
- Seal: gold natural
- Títulos kicker: gold
- Links repouso: `rgba(245,239,224,.7)`
- Links hover: `#AF8F47`
- Texto: ivory tonalidades .45/.5/.6/.8

### Elementos Visuais
- **SVG Seal** 88px na coluna 1. Hover: rotate 360° em 1.2s cubic-bezier(.2,.7,.2,1) + opacity 0.8 → 1. Só anima uma vez a cada hover.
- **Hairline superior** da seção (separando FAQ): gradient full-bleed.
- **Hairline faixa inferior:** gold@20% entre colunas e faixa de compliance.

### Animações
- **Entrada:** fade simples 600ms quando footer entra viewport. Sem stagger complexo (é fechamento).
- **Hover do Seal:** rotate 360° + glow sutil box-shadow gold@20% 0 0 60px em 1.2s.

### Interatividade
- **Links hover:** color → gold + underline animado 250ms.
- **Contato links:** telefone abre tel:, e-mail abre mailto:.
- **Seal click:** volta ao topo (scroll smooth).

### Responsividade
- **≤1024px:** grid vira 2×2 (áreas+escritório na primeira linha, contato+marca na segunda).
- **≤720px:** 1 coluna. Seal + marca primeiro, depois kickers de seção empilhados. Faixa inferior empilha (nome, OAB, disclaimer).

---

# Elementos Encantadores (distribuídos pela página)

Além dos específicos de cada seção, os seguintes elementos distribuídos criam identidade coerente:

1. **Smooth scroll global** já habilitado (html { scroll-behavior: smooth }).
2. **Prefers-reduced-motion:** todas as animações rise-in e clip-path reveals têm fallback para `animation: none; opacity: 1`.
3. **Focus states ARIA:** todos os links e botões têm focus ring 2px gold com offset 3px (`outline: 2px solid #AF8F47; outline-offset: 3px`).
4. **Scroll spy para active nav link:** quando usuário rola, link correspondente no header (Áreas / Escritório / Contato) ganha underline ativo.
5. **Botão "voltar ao topo"** flutuante: aparece depois de 600px de scroll, canto inferior direito, círculo 48×48 navy com seta gold, hover scale 1.08. Click = scroll to top smooth.
6. **Cursor link amplificado:** em todos os links tipograficos de prose (H2, H3 com link), cursor troca para `pointer` e o sublinhado dourado anima (mesmo padrão).
7. **Tabular-nums globalmente** em todos os numerais latinos (datas, telefones, CEP) para alinhamento visual fino.
8. **Dropcap recorrente:** além da seção Problema, o primeiro parágrafo da seção Sobre também ganha dropcap em Playfair italic gold (consistência editorial).
9. **Selection gold:** `::selection { background: rgba(175,143,71,.25) }`.
10. **Container query opcional** nas células de Áreas (responde ao tamanho da própria célula, não só do viewport) — melhora grid assimétrico.

---

# Resumo de Arquétipos & Constraints (visão rápida)

| # | Seção | Arquétipo | Constraints principais |
|---|---|---|---|
| 01 | Hero | Editorial (Tipografia) | Mixed Fonts · Asymmetric · Selective Color · Stagger |
| 02 | Problema | Contained Center (Foco) | Drop Cap · Pullquote · Hairline Divider · Low Contrast |
| 03 | Diferenciais | Split Assimétrico (Divisão) | Sticky Element · Numerals Italic · Hairline Divider · Hover Reveal |
| 04 | Áreas | Bento Box (Grid) | Hover Lift · Stagger · Color Blocking · Numerals Italic |
| 05 | Como Funciona | Scroll Storytelling + Sticky (Fluxo) | Sticky · Headline>150px · Draw SVG · Scroll Progress |
| 06 | Sobre | Layered com Overlap (Camadas) | Overlap · SVG Ilustração · Mouse Parallax · Pullquote |
| 07 | CTA Final | Isolated Element (Foco) | Container Narrow · Overlap · Draw SVG · High Contrast |
| 08 | FAQ | Accordion Editorial (Estrutura+Divisão) | Split Assimétrico · Numerals Italic · Smooth Expand |
| 09 | Rodapé | Minimal Editorial (Densidade) | Container Wide · Monospace Editorial · High Contrast |

Nenhum arquétipo se repete em seções consecutivas. Todos os arquétipos são distintos entre si (9 diferentes).

---

# Notas finais para o desenvolvedor

1. **Ao implementar, siga esta spec como contrato.** Nenhum valor deve ser "arredondado para simplificar".
2. **Animation-timeline (scroll-linked) funciona em Chrome/Edge 115+, Safari 17+, Firefox com flag.** Para Firefox estável: fallback com IntersectionObserver + CSS animation com keyframes.
3. **Máscara de telefone:** usar Cleave.js ou implementação vanilla com regex; não dependa de libs pesadas.
4. **WhatsApp link:** `https://wa.me/55{telefone-sem-formatacao}?text={mensagem-encoded}`.
5. **SEO básico:** cada área terá sua própria página depois. Home usa `<h1>` apenas no hero; todas as outras seções usam `<h2>`. Structured data (LegalService) recomendada.
6. **Performance:** fontes via Google Fonts (display=swap já setado), SVGs inline onde ornamental, PNGs 2× para logos com fallback 1×. Lazy-load images abaixo do fold.
7. **Acessibilidade:** navegação por teclado completa, focus ring gold visível, alt em todas as imagens, ARIA em accordion do FAQ, labels em todos os inputs.
8. **Conformidade OAB:** nunca usar palavras como "melhor", "garantimos", "oferta", "desconto". Nunca mostrar valores. CTAs sempre convidam ao "agendar consulta", nunca "contratar serviço".
