var mysql = require("mysql");

//Ao ser carregado o express-load ele carrega o módulo e invoca o objeto, nesse caso o já é criado uma conexão com o banco direto

//Método Wrapper
//A criação da function createDBConnection e a invocação dela no module.exports é um método chamado wrapper
//Esse método faz com que uma função embrulhe outra função, fazendo com que o createDBConnection somente sera invocado quando o seu objeto for carregado
//Criando uma função anonima
var createDBConnection = function(){
	//Método process.env.NODE_ENV contem o valor dev para conectar com banco de dados de teste
	//No arquivo application dentro da lib do express para separar o ambiente de dev.
	
	console.log("BANCO " + JSON.stringify(process.env));

	if (!process.env.NODE_ENV) {
		return mysql.createConnection({
			host : "localhost",
			user : "root",
			password : "@lamp#",
			database : "casadocodigo_nodejs"
		});
	} 
	if (process.env.NODE_ENV == 'test'){
		return mysql.createConnection({
			host : "localhost",
			user : "root",
			password : "@lamp#",
			database : "casadocodigo_nodejs_test"
		});
	}

	//If usado para validar a produção, por padrão o parametro é o production
	if (process.env.NODE_ENV == 'production'){

		//Exemplo de variavel de ambiente
		//var urlDeConexao = process.env.CLEARDB_DATABASE_URL;
//CLEARDB_DATABASE_URL: mysql://b831b1e8d38fc0:05fb291f@us-cdbr-iron-east-04.cleardb.net/heroku_ae86d57b751b5b8?reconnect=true

		return mysql.createConnection({
			host : "us-cdbr-iron-east-04.cleardb.net",
			user : "b831b1e8d38fc0",
			password : "05fb291f",
			database : "heroku_ae86d57b751b5b8"
		});
	}

}

//A criação de desse modulo se deve a uma limitação do load express que carrega a conexao do banco sem precisar acessar os dados.
//Para isso foi criado esse módulo, que só retorna os dados quando ouver acesso ao banco.
module.exports = function(){
	return createDBConnection;
}


/* Criar banco de dados

CREATE TABLE livros(
	id int(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    titulo varchar(255) DEFAULT NULL,
    descricao text,
    preco decimal(10,2) DEFAULT NULL
);

INSERT INTO `livros` (`id`, `titulo`, `descricao`, `preco`) VALUES ('86', 'Treinamento em nodejs', 'Livro com curso de treinamento em nodejs', '20.00');
*/