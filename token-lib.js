exports.tokenizarPorSplit = function(text){
	var parcial = text.split(' ');
	var tokens = [];
	for(var m in parcial) {
		var candidato = parcial[m];
		if ( candidato == '' ) continue;
		tokens.push(candidato);
	}
	return tokens;
};

exports.tokenizarPorRx = function(text){
	var rx1 = /[\wáéíóúàèìòùäëïöüâêîôûãẽĩõũçñ]+/gi;
	
	return text.match(rx1);
};

exports.tokenizarPorSplitRx = function(text){
	var buffer = text.split(' ');
	
	var rx1 = /^[^\wáéíóúàèìòùäëïöüâêîôûãẽĩõũçñ]/gi;
	var rx2 = /[^\wáéíóúàèìòùäëïöüâêîôûãẽĩõũçñ]$/gi;
	
	var tokens = [];
	
	for(var m in buffer) {
		var candidato = buffer[m];
		candidato = candidato.replace(rx1, '').replace(rx2, '');
		if ( candidato == '' ) continue;
		tokens.push(candidato);
	}
	
	return tokens;
};

exports.tokenizarPorMaquinaEstado = function(texto){
	var tokens = [];
	
	var i = 0;
	leitor.atribuir(texto);
	
	// processar até o fim do texto.
	while ( !leitor.fim() ) {
		var c = leitor.ler();
		var buffer = [];
		if ( isFimDeLinha(c) ) {
			// possível evolução: tratar a captura de fim de linha
			// conforme opção passada como argumento.
			c = '';
		}
		else if ( isBranco(c) ) {
			// possível evolução: tratar a captura de um branco
			// conforme opção passada como argumento.
			c = '';
		}
		else if ( isAlfa(c) ) {
			buffer.push(c);
			// o while roda até um caráter não esperado aparecer, ou
			// até o fim do texto.
			while(!leitor.fim() ) {
				c = leitor.ver(0);
				if ( isAlfa(c) || isDigito(c) || ('_-/ºª'.indexOf(c)>=0) ) {
					buffer.push(leitor.ler());
				}
				else if ( c == '.' ) {
					if ( isAlfa(leitor.ver(1)) || isDigito(leitor.ver(1)) ){
						buffer.push(leitor.ler());
					}
					else {
						break;
					}
				}
				else if ( c == "'" && isAlfa(leitor.ver(1))){
					buffer.push(leitor.ler());
				}
				else {
					break;
				}
			}
		}
		else if ( isDigito(c) ) {
			buffer.push(c);
			// o while roda até um caráter não esperado aparecer, ou
			// até o fim do texto.
			while(!leitor.fim() ) {
				c = leitor.ver(0);
				if ( isAlfa(c) || isDigito(c) || ('/-ºª_'.indexOf(c)>=0) ) {
					buffer.push(leitor.ler());
				}
				else if ( c == '.' ) {
					if ( isAlfa(leitor.ver(1)) || isDigito(leitor.ver(1)) ){
						buffer.push(leitor.ler());
					}
					else {
						break;
					}
				}
				else {
					break;
				}
			}
		}
		else {
			// aqui fica livre: tudo o que não se encaixar nas classes anteriores é capturado
			// neste estado, mas apenas com um caráter.
			buffer.push(c);
		}
		
		// se há caracteres acumulados no buffer, eles representam
		// um token que deve ser adicionado à linha.
		//
		// possível evolução: em vez de construir uma lista de strings,
		// construir uma lista de tokens, já classificados.
		if ( buffer.length > 0 ) {
			tokens.push(buffer.join(''));
		}
	}
	
	return tokens;
};

// verifica se é um dígito
function isDigito(ch){
	return ch.match(/\d/) != null;
}

function isAlfa(ch) {
	return null != ch.match(/[a-záéíóúàèìòùäëïöüâêîôûãẽĩõũçñ]/gi);
}

function isBranco(ch) {
	return ch.match(/\s/)!=null;
}

function isFimDeLinha(ch){
	return ch != '' && ( ch.charCodeAt(0) == 10 || ch.charCodeAt(0)== 13 );
}

var leitor = {
	_pos: 0,
	_texto: '',
	atribuir: function(texto) {
		this._texto = texto;
		this._pos = 0;
	},
	fim: function(desloc) {
		desloc = desloc || 0;
		return ( this._pos >= this._texto.length );
	},
	ler: function() {
		if ( this.fim() ) return '';
		return this._texto.charAt(this._pos++);
	},
	ver: function(desloc) {
		desloc = desloc || 0;
		if ( this.fim(desloc) ) return '';
		return this._texto.charAt(this._pos + desloc);
	}
};
