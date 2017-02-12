//Rotas para a parte de promoções
module.exports = function(app){

	app.get('/promocoes/form', function(req,res){
		var connection = app.infra.connectionFactory();
		var produtosDAO = new app.infra.ProdutosDAO(connection);
		produtosDAO.lista(function(erros,resultados){
			res.render('promocoes/form',{lista:resultados});
		});
		connection.end();
	});

	app.post("/promocoes",function(req,res){
		var promocao = req.body;
		//console.log('promocao ' + promocao);

		//O io tem uma funcao emit que carraga o conteúdo que será exibido com a promoção. Ele manda um aviso
		app.get('io').emit('novaPromocao',promocao);

		//console.log("Promocao " + JSON.stringify(promocao) );

		//Prática de always redirect, todas vez que ouver um post a página é redirecionada para ela própria para evitar o código sujo.
		res.redirect('promocoes/form');
	});

}