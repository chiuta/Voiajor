# VOIAJOR

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · **Português** · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Simulação interativa das trajetórias da Voyager 1 e 2 — do lançamento em 1977 até daqui a mil milhões de anos, dos planetas à Via Láctea.

Versão: 1.0.1 · Última atualização: 2026-11-06

## O que faz

- O tempo vai dos lançamentos de 1977 a +1000 milhões de anos. A aplicação abre na data de hoje, em tempo real, e o botão 📅 salta para qualquer momento do passado ou do futuro.
- Zoom de 1 UA a dezenas de milhares de anos-luz, com círculos de referência para a hora-luz, o dia-luz (≈173 UA) e o ano-luz.
- Arcos balísticos (problema de Lambert) entre as datas reais dos sobrevoos e depois extrapolação com a gravidade do Sol e a dinâmica galáctica local (equações epicíclicas / de Hill).
- Heliosfera, nuvem de Oort e 19 estrelas próximas com movimento próprio, mais uma tabela das aproximações mais próximas.
- Um único ficheiro HTML offline; a interface adapta-se a telemóveis, tablets e computadores.

## Utilização

Abra `index.html` num navegador moderno — sem instalação nem rede. Online: https://chiuta.github.io/voiajor/

## Precisão e limites

- As posições de 5 nov. 2026 (Voyager 1 ≈172,3 UA, Voyager 2 ≈145,1 UA) estão calibradas com os números públicos da missão, incluindo o marco do dia-luz de 15 nov. 2026. São dados de entrada do modelo, não uma validação independente.
- Os sobrevoos são tratados como pontos (cónicas ligadas); sem correções de trajetória nem gravidade de outros corpos.
- O catálogo de estrelas é aproximado. As distâncias de aproximação dependem da direção exata da velocidade: Voyager 2–Sírio dá ≈6,4 a.l. no modelo contra ≈4,3 a.l. na literatura; a aplicação mostra ambos.
- O modelo galáctico é uma linearização em torno da órbita do Sol: bom ao longo de dezenas de milhões de anos, indicativo para além de algumas centenas de milhões.
- As datas do fim da transmissão são estimativas, não previsões oficiais.

## Testes

`node tests/model.test.js` verifica o modelo (planetas, sobrevoos, posições de 2026, distâncias à heliopausa, velocidades, valores finitos, aproximações a estrelas).

## Licença e créditos

MIT © 2026 Alexandru-Ionuț Chiuță (Alexio). Dados da missão: NASA/JPL.

Apoie o projeto: https://buymeacoffee.com/echo.of.the.strings
