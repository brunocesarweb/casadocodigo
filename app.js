//Carrega o módulo express em um arquivo a parte e chama na var app
var app = require("./config/express")();

//Criacao da var http que exporta a funcao Server que recebe a função customizada app que trata as requisições
var http = require('http').Server(app);

//Carrega módulo de websocket, que recebe o http como parametro, pois o socket precisa do carregamento das requisições
var io = require('socket.io')(http);

//Disponibiliza a var io para que possa ser acessada por todas as rotas. Setamos a var io recebendo o conteúdo da io que foi requisitada
app.set('io', io);


//Verifica porta do ambiente do heroku ou a 3000 de ambiente local
var porta = process.env.PORT || 3000;

//Sobe o servidor
http.listen(porta, function(){
	//var host = server.address().address;
    //var port = server.address().port;
    //console.log('Example app listening at http://%s:%s', host, port);
	console.log("Running server :-)");

});


