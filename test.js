var nlp = require('./token-lib.js');
var amostras = [
'dois tokens',
'agora   tem espaços         a    mais',
'e agora, será    que processa pontuação?',
'em 25/01, comemoramos o aniversário de São Paulo.'
];

for(var m in amostras) {
	var texto = amostras[m];
	console.log('texto: ' + texto);
	mostrarTokens('1', nlp.tokenizarPorSplit(texto));
	mostrarTokens('2', nlp.tokenizarPorRx(texto));
	mostrarTokens('3', nlp.tokenizarPorSplitRx(texto));
	mostrarTokens('4', nlp.tokenizarPorMaquinaEstado(texto));
}

function mostrarTokens(metodo, tokens){
	var buf = [];
	for(var m in tokens) {
		buf.push('[' + tokens[m] + ']');
	}
	console.log('  ' + metodo + ': ' + buf.join(' '));
}
