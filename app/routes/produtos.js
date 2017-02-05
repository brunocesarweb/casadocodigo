//Define as rotas dos recurso da url produtos no modulo exports e recebe a var app como parametro
module.exports = function(app){
/*	//Funcao de listar produtos, ela deverá ser invocada como listaProdutos
	var listaProdutos = function(req,res){
		//Acesso a conexao atraves do load express
		var connection = app.infra.connectionFactory();
		//Carrega o modulo produtos banco
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		produtosDAO.lista(function(err, results){
			res.render("produtos/lista", {lista:results});
		});
		//Finaliza conexao com o banco
		connection.end();
	};
	//Controller que chama o modulo de lista de produtos
	//app.get("/produtos", listaProdutos); // end - /produtos */

	app.get("/produtos",function(req,res){
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		produtosDAO.lista(function(erros,resultados){
			if( erros ){
				return next(erros);
			};
			res.format({
				html: function(){
					res.render("produtos/lista",{lista:resultados});
				},
				json: function(){
					res.json(resultados);
				}
			});
		});
		connection.end();
	});

	//controller - formulario para cadastrar os produtos
	app.get('/produtos/form',function(req,res){
		res.render("produtos/form",{errosValidacao:{},produto:{}});
	});
	//Controller que utliza o get na url produtos
/*	app.get('/produtos',function(req,res){
	    var connection = app.infra.connectionFactory();
	    var produtosDAO = new app.infra.ProdutosDAO(connection);
	    produtosDAO.lista(function(err,results){
	        res.format({
	            html: function(){
	                res.render('produtos/lista',{lista:results});
	            },
	            json: function(){
	                res.json(results);
	            }
	        });
	    });
	    connection.end();
	});*/

	//controller - que salva os produtos no banco de dados
	app.post('/produtos',function(req,res){

		var produto = req.body;
		
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);

		//Validação de dados do formulário utilizando o express-validator
		req.assert("titulo","Título é obrigatório!").notEmpty();
		req.assert("preco","Formato inválido!").isFloat();

		//Retorna erro do formulário
		var erros = req.validationErrors();

		//If de verificação de erros
		if(erros){
			res.format({
				html: function(){
					res.status(400).render("produtos/form",{errosValidacao:erros,produto:produto});
				},
				json: function(){
					res.status(400).json(erros);
				}
			});
			return;
		}

		produtosDAO.salva(produto, function(erros, resultados){
			res.redirect('/produtos');
			//res.redirect('/produtos/lista');
		});

		//Finaliza conexao com o banco
		connection.end();
	});

} //end - module.exports

