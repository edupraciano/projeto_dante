var SS = SpreadsheetApp.openById(
  "1vt04glByJ6-aPqZEnLg1Vi-X9g3c1BruqZzkAneYuzY"
);
var main = SS.getSheetByName("main");

function doPost(e) {
  if (e.parameters.qualFuncao == "entradaDeFuncionario") {
    entradaDeFuncionario(e);
  } else if (e.parameters.qualFuncao == "lerFuncionarios") {
    return ContentService.createTextOutput(JSON.stringify(lerFuncionarios(e)));
  } else if (e.parameters.qualFuncao == "removerFuncionario") {
    removerFuncionario(e);
  }
}

function lerFuncionarios(e) {
  var ultimaLinha = main.getLastRow();
  var ultimaColuna = main.getLastColumn();
  var todaTabela = main.getRange(1, 1, ultimaLinha, ultimaColuna).getValues();
  //console.log(todaTabela);
  return todaTabela;
}

function entradaDeFuncionario(e) {
  // ADICIONAR FUNCIONÁRIO
  if (e.parameters.idDoFuncionario == "") {
    var ultimaLinha = main.getLastRow() + 1;
    main.getRange(ultimaLinha, 1).setValue(ultimaLinha);
    main.getRange(ultimaLinha, 2).setValue(e.parameters.nomeDoFuncionario);
    main.getRange(ultimaLinha, 3).setValue(e.parameters.cargoDoFuncionario);
    main.getRange(ultimaLinha, 4).setValue(e.parameters.salarioDoFuncionario);
  } else {
    // ALTERAR FUNCIONÁRIO
    var ultimaLinha = main.getLastRow();
    for (var i = 1; i <= ultimaLinha; i++) {
      if (main.getRange(i, 1).getValue() == e.parameters.idDoFuncionario) {
        main.getRange(i, 1).setValue(e.parameters.idDoFuncionario);
        main.getRange(i, 2).setValue(e.parameters.nomeDoFuncionario);
        main.getRange(i, 3).setValue(e.parameters.cargoDoFuncionario);
        main.getRange(i, 4).setValue(e.parameters.salarioDoFuncionario);
        break;
      }
    }
  }
}

function removerFuncionario(e) {
  var ultimaLinha = main.getLastRow();
  for (var i = 1; i <= ultimaLinha; i++) {
    if (main.getRange(i, 1).getValue() == e.parameters.idDoFuncionario) {
      main.deleteRow(i);
      break;
    }
  }
}
