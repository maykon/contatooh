angular.module('contatooh').controller('ContatoController',
  function($scope, $routeParams, Contato) {

    function buscaContatos(contatoId) {
      $scope.contato = {};
      if (contatoId) {
        var promise = Contato.get({
          id: contatoId
        }).$promise;
        promise
          .then(function(contato) {
            $scope.contato = contato;
            $scope.mensagem = {};
          })
          .catch(function(erro) {
            console.log(erro);
            $scope.mensagem = {
              texto: 'Não foi possível obter a lista'
            };
          });
      } else {
        $scope.contato = new Contato();
      }
    }

    $scope.salva = function() {
      $scope.contato.$save()
        .then(function() {
          $scope.mensagem = {
            texto: 'Salvo com sucesso'
          };
          $scope.contato = new Contato();
          $scope.$broadcast('contatoSalvo');
        })
        .catch(function(erro) {
          $scope.mensagem = {
            texto: 'Não foi possível salvar'
          };
        });
    };

    $scope.init = function() {
      buscaContatos($routeParams.contatoId);
    };
    $scope.init();
    Contato.query(function(contatos) {
      $scope.contatos = contatos;
    });
  }
);
