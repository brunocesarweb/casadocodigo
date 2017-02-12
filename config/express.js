//Acesso heroku https://casadc-nodejs1.herokuapp.com/ | https://git.heroku.com/casadc-nodejs1.git

//Invoca a função express direto na var app
var express = require("express");

//Plugin de carregamento automatico dos módulos
var load = require("express-load");

//Plugin body parser
var bodyParser = require("body-parser");

//Plugin express validator para validação de dados
var expressValidator = require("express-validator");

//Para carregar a function é preciso carregar via módulo
module.exports = function(){

	//Invoca a function express
	var app = express();

	//Função que define os recursos estaticos para o site
	app.use(express.static('./app/public'));

	//seta a engine que será usada para renderizar o html
	app.set("view engine", "ejs");

	//Define o caminho do diretório views. Usa-se o ./ pois o caminho não e o relativo
	app.set("views", "./app/views");
 
	//Recebe funcoes que vao ser aplicadas ao request antes de exportar os modulos
	//Exemplos:
	// requisicao -> middlewareBodyParser -> middlewareAutenticacao ->  funcao que trata a requisicao
	//Necessário usar o parametro extended, é um parametro passado para urlencoded que serve para o bodyparser entender que se trata de um formulario normal 
	app.use(bodyParser.urlencoded({extended : true}));
	//middleware de retorno de dados em json
	app.use(bodyParser.json());
	//middleware de validaçaõ do express validator
	app.use(expressValidator());

	//Invoca o objeto load, e faz o carregamento das rotas, depois carrega a conexao dentro de infra, e faz isso dentro de app
	//O json com cwd: app passa o caminho da pasta em que a aplicação irá usar como caminho
	load("routes", {cwd: "app"})
		.then("infra")
		.into(app);

		//A verificação da página tem que ser feita depois de invocar o express-load para que primeiro a aplicação ache as rotas da aplicação e caso o endereço requisitado não seja encontrado então cai no erro 404
		app.use(function(req,res,next){
			//console.log("Erro 404 " + res.textContent );
			res.status(404).render('erros/404');
			next();
		});

		//Recebe um parametro a mais para tratar o erro, e valida o ambiente que a aplicação está se está em produção ou em desenvolvimento
		//O comando NODE_ENV=production nodemon app, roda o servidor em ambiente de produção para testar a página
		app.use(function(error,req,res,next){
			if(process.env.NODE_ENV == 'production'){
				res.status(500).render('erros/500');
				return;
			}
			next(error);
		});

	//Retorna o app
	return app;
} //end - module.exports



