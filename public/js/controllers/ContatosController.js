angular.module('contatooh').controller('ContatosController',
function($scope, Contato) {
  $scope.total = 0;
  $scope.contatos = [];

  $scope.incrementa = function() {
    $scope.total++;
  };
  $scope.filtro = '';
  $scope.mensagem = {texto: ''};

  $scope.remove = function(contato) {
    var promise = Contato.delete({id: contato._id}).$promise;
    promise
      .then(buscaContatos)
      .catch(function(erro) {
        console.log(erro);
        $scope.mensagem = {
          texto: 'Não foi possível remover o contato'
        };
      });
  };

  function buscaContatos(){
    var promise = Contato.query().$promise;
    promise
      .then(function(contatos) {
        $scope.contatos = contatos;
        $scope.mensagem = {};
      })
      .catch(function(erro) {
        console.log(erro);
        $scope.mensagem = {
          texto: 'Não foi possível obter a lista'
        };
      });
  }

  $scope.init = function() {
    buscaContatos();
  };
  $scope.init();
});
