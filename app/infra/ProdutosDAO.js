//Uso da convenção design patter DAO(Data Access Object)
function ProdutosDAO(connection){
	this._connection = connection;
}

ProdutosDAO.prototype.lista = function(callback){
	this._connection.query("select * from livros", callback);
}

ProdutosDAO.prototype.salva = function(produto, callback){
	this._connection.query("insert into livros set ?",produto,callback);
}
//Outra maneira de passar os dados
/*
ProdutosDAO.prototype.salva = function (produto, callback) {
    this._connection.query('insert into produtos (titulo, preco, descricao) values (?, ?, ?)',  [produto.titulo, produto.preco, produto.descricao], callback);
}
*/

module.exports = function(){
	//Função que retorna o resultado da consulta	
	return ProdutosDAO;
}