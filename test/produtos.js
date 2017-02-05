// comando para rodar o teste mocha: NODE_ENV=test node_modules/mocha/bin/mocha
// O NODE_ENV é definido como variavel de test para acessar o banco de teste
//O express exporta uma função por isso precisa ser invocada como tal
var express = require('../config/express')();

//Retorna uma funcao que deverá ser invocada e será passado o parametro express
var request = require('supertest')(express);

//Controler de teste
describe('ProdutosController', function(){


	//Função do mocha disponĩvel para limpar banco de testes
	//Recebe como parametro done para finalizar(assincronamente)
	beforeEach(function(done){
		var conn = express.infra.connectionFactory();
		//Biblioteca node-database-cleaner que limpa todas as tabelas do banco usado
		//Funcao de delete que limpa o banco e retorna um callback com excessao e o resultado
		conn.query("delete from livros", function(ex, result){
			//Tratamento do callback de ex.
			if(!ex){
				done();
			}
		});
	});

	//Teste de listagem de produtos
	it('listagem json', function(done){
		//Requisição a url produtos
		request.get('/produtos')
		//Seta o accept e aguarda o json como resposta
		.set('Accept', 'application/json')
		//Aguarda o json como resposta
		.expect('Content-Type', /json/)
		//Espera que o status seja 200, e por ser integrado com o mocha o supertest aceita o done
		.expect(200,done);
	});

	//Teste cadastro inválido
	it('#cadastro de novo produto com dados inválidos', function(done){
		request.post('/produtos')
		.send({titulo:"", descricao:"novo livro"})
		.expect(400,done);
		//Aguarda retorno 400 status bad request
	});

	it('#cadastro de novo produto com dados válidos', function(done){
		request.post('/produtos')
		.send({titulo:"titulo", descricao:"novo livro", preco: 20.50})
		.expect(302,done);
		//Aguarda status 302 moved temporally
	});

});


/* -- Código com assert sem o supertest
var http = require("http");
//Módulo assert possui verificação e usa um asseption que qualquer biblioteca de teste possui.
var assert = require("assert");
describe("#Produtos Controller", function(){
	//A função done é usada como parametro para indicar para o mocha que a function de teste assincrona foi finalizada e podeŕá seguir com o teste
	it("#listagem json", function(done){
		var configuracoes = {
		    hostname: 'localhost',
		    port:3000,
		    path: '/produtos',
		    headers: {
		        'Accept':'application/json'
		    }
		};
		http.get(configuracoes, function(res){

			assert.equal(res.statusCode, 200);
			assert.equal(res.headers['content-type'],'application/json; charset=utf-8');
			done();
		});
	});

});
*/
