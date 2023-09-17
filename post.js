// Constantes Globais
const SS = SpreadsheetApp.openById(
  "1kWX6wvA1rVyzMFRRo6O1ikbksvN2gMvdrntv09nhCY8"
);
const main = SS.getSheetByName("main");
const usuarios = SS.getSheetByName("usuários");
/////////////////////////////////////////////////////////////////////////////////

function doPost(e) {
  if (e.parameters.qualFuncao == "entradaDeFuncionario") {
    entradaDeFuncionario(e);
  } else if (e.parameters.qualFuncao == "lerFuncionarios") {
    return ContentService.createTextOutput(JSON.stringify(lerFuncionarios(e)));
  } else if (e.parameters.qualFuncao == "remover_funcionario") {
    remover_funcionario(e);
  } else if (e.parameters.qualFuncao == "autenticacao") {
    return ContentService.createTextOutput(JSON.stringify(autenticacao(e)));
  }
}

function autenticacao(e) {
  let ultima_linha_usuarios = usuarios.getLastRow();

  let user_name = e.parameters.user_name;
  let password = e.parameters.password;

  let usuario_autenticado = false;
  // usuario_autenticado = "Usuário Não Autenticado."

  for (let i = 1; i <= ultima_linha_usuarios; i++) {
    if (usuarios.getRange(i, 1).getValue() == user_name) {
      if (usuarios.getRange(i, 2).getValue() == password) {
        usuario_autenticado = true;
        //usuario_autenticado = "Usuário Autenticado."
      }
    }
  }
  console.log(usuario_autenticado);
  return usuario_autenticado;
}

function entradaDeFuncionario(e) {
  var ultimaLinha = main.getLastRow();
  var colunaId = main.getRange("A2:A").getValues();
  var id = "";

  if (id == "") {
    id = Math.max.apply(null, colunaId) + 1;
  }

  if (e.parameters.idDoFuncionario == "") {
    // Adicionar funcuonário
    main.getRange(ultimaLinha + 1, 1).setValue(id);
    main.getRange(ultimaLinha + 1, 2).setValue(e.parameters.nomeDoFuncionario);
    main.getRange(ultimaLinha + 1, 3).setValue(e.parameters.cargoDoFuncionario);
    main
      .getRange(ultimaLinha + 1, 4)
      .setValue(e.parameters.salarioDoFuncionario);
    // Alerar Funcionaário
  } else {
    for (i = 1; i <= ultimaLinha; i++) {
      if (main.getRange(i, 1).getValue() == e.parameters.idDoFuncionario) {
        main.getRange(i, 1).setValue(e.parameters.idDoFuncionario);
        main.getRange(i, 2).setValue(e.parameters.nomeDoFuncionario);
        main.getRange(i, 3).setValue(e.parameters.cargoDoFuncionario);
        main.getRange(i, 4).setValue(e.parameters.salarioDoFuncionario);
      }
    }
  }
}

function lerFuncionarios(e) {
  var ultimaLinha = main.getLastRow();
  var ultimaColuna = main.getLastColumn();
  var todaATabela = main
    .getRange(2, 1, ultimaLinha - 1, ultimaColuna)
    .getValues();

  return todaATabela;
}

function remover_funcionario(e) {
  let ultima_linha_main = main.getLastRow();
  for (var i = 1; i <= ultima_linha_main; i++) {
    if (main.getRange(i, 1).getValue() == e.parameters.idDoFuncionario) {
      main.deleteRow(i);
      break;
    }
  }
}
