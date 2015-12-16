module.exports = function(app) {
  var controller = {};
  var Contato = app.models.contato;
  var sanitize = require('mongo-sanitize');

  controller.listaContatos = function(req, res) {
    var promise = Contato.find().populate('emergencia').exec();
    promise.then((contatos) => {
      res.json(contatos)
    }, (erro) => {
      console.error(erro);
      res.status(500).json(erro);
    });
  };
  controller.obtemContato = function(req, res) {
    var _id = sanitize(req.params.id);
    var promise = Contato.findById(_id).exec();
    promise.then((contato) => {
      if (!contato) throw new Error("Contato não encontrado");
      res.json(contato);
    }, (erro) => {
      console.error(erro);
      res.status(404).json(erro);
    });
  };
  controller.removeContato = function(req, res) {
    var _id = sanitize(req.params.id);
    var promise = Contato.remove({
      "_id": _id
    }).exec();
    promise.then(() => {
      res.status(204).end()
    }, (erro) => {
      console.error(erro);
    });
  };
  controller.salvaContato = function(req, res) {
    var _id = sanitize(req.body.id);
    var dados = {
      "nome": sanitize(req.body.nome),
      "email": sanitize(req.body.email),
      "emergencia": sanitize(req.body.emergencia) || null
    };
    if (_id) {
      var promise = Contato.findByIdAndUpdate(_id, dados).exec();
      promise.then((contato) => {
        res.json(contato)
      }, (erro) => {
        console.error(erro);
        res.status(500).json(erro);
      });
    } else {
      var promise = Contato.create(dados);
      promise.then((contato) => {
        res.status(201).json(contato)
      }, (erro) => {
        console.error(erro);
        res.status(500).json(erro);
      });
    }
  };
  return controller;
};
