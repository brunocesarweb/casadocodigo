function require(path){
	var codigoDoSeuModulo = carregado(path);
	var funcaoDeCarregamento = function(){
		eval(codigoDoSeuModulo);
	}

	var module = {
		exports : {};
	};

	funcaoDeCarregamento(module, module.exports);
}

/*
ao dar o require o node recebe o caminho para o modulo solicitado, e vai procurar no node modulos,
ele vai receber o codigo do modulo solicitado, cria uma função de carregamento anonima e executa o texto como codigo js com a funcao eval
cria uma variavel module com um objeto literal e dentro cria um objeto literal exports.
depois disso ele carrega a função de carregamento e recebe o modulo criado como parametro, e passa tambem a propriedade exports.
*/

/*
Existe uma função interna do Node.js que recebe um path do módulo a ser carregado.
Essa função procura pelo local do módulo de acordo com o formato do path.

Para conseguir carregar a função do módulo, ele cria uma função com um nome do tipo funcaoDeCarregamento ou algo assim, que recebe uma função anônima e dentro dessa função, invoca a função eval() do JavaScript passando como parâmetro o que foi carregado do módulo a partir do path recebido.

Pronto! Agora o código está carregado.

Para que ele fique visível de fora, é disponibilizado um objeto chamado module ou algo do tipo, que contém um objeto exports onde ficam armazenados todos os paths passados.

Por fim a funcaoDeCarregamento é invocada recebendo como parâmetro os próprios objetos module e module.exports e é retornado o objeto module.

Essa é a maneira escolhida pelo Node.js para fazer carregamento dinâmico de módulos JavaScript. Outros frameworks podem fazer de formas diferentes.

Uma convenção que ajuda a padronizar essa estratégia é a CommonJS, que como já vimos, define várias Especificações para código JavaScript.
*/
Quando uma função é invocada dentro da arquitetura Node.js o que acontece é que o fluxo do código não fica parado esperando o retorno dessa função.
Fala-se que as chamadas das funções são assíncronas ou não-blocantes, ou seja a chamada é feita e logo em seguida o processador já fica liberado para atender a novas chamadas.

Quem fica responsável por orquestrar esse escalonamento do processo é o próprio Sistema Operacional, que já é muito bom em fazer isso!

Por esse motivo é que o Node.js é muito útil para as aplicações que dependem de muitas operações de I/O (Input/Output - Entrada/Saída) em que existem várias chamadas a procedimentos que não necessariamente de lógica da aplicação, mas sim de consultas externas ou ações de infra-estrutura, como a leitura e escrita em um banco de dados, por exemplo.

Isso torna o Node.js muito performático e é uma das principais razões pelo seu sucesso!

Até seria possível escreve o código de uma maneira sequencial, mas como o Node.js simplesmente não espera o final do processamento de uma linha de código para executar a próxima, o funcionamento não seria o esperado.



