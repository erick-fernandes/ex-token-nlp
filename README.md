Tokenização em Javascript (ex-token-nlp)
========================================

O tokenizador é o módulo de um sistema de Processamento de Linguagem Natural que reconhece as palavras ou tokens de um texto escrito. Dependendo da aplicação, além da sequência de letras, o tokenizador talvez precise reconhecer, dentro de um texto pontuado, numerais (ex: 23 E 54.833,29) datas (ex: 21/04/2014), horários (ex: 13h, 09:54) ou códigos em geral.

O problema básico no projeto de um tokenizador é definir a estratégia de reconhecimento dos tokens, mais precisamente, a maneira como o módulo vai determinar o início e o fim do token dentro do texto em análise.

Nos próximos itens, vamos avaliar algumas abordagens possíveis para o projeto de um tokenizador, usando a linguagem Javascript rodando em node.js.

Como rodar os exemplos
----------------------

Na linha de comando, basta digitar (e pressionar ENTER):

node test.js

Todos os algoritmos serão executados com todos os textos de amostra.
