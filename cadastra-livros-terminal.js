var http = require('http');

var configuracoes = {
    hostname: 'localhost',
    port:3000,
    path: '/produtos',
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
};

var client = http.request(configuracoes, function(res){
    console.log("Code: " + res.statusCode);
    res.on('data', function(body){
        console.log('Corpo:' +body);
    });
});

var produto = {
    titulo : '',
    descricao : 'Snode, javascript e um pouco de http',
    preco : 1
}

client.end(JSON.stringify(produto));
