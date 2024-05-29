const { none } = require("list");
const prompt = require("prompt-sync")({ sigint: true });

let clientes_id = 0;
let funcionarios_id = 0;

const cadastros = [];
const pedidos = [];
const funcionarios = [];
const clientes = [];
const produtos = [];

let login_status = -1;
let login_conta = 0;
class Pedido {
  constructor(id_pedido, id_cliente, status, data_pedido) {
    this.id_pedido = id_pedido;
    this.id_cliente = id_cliente;
    this.status = status;
    this.data_pedido = data_pedido;
  }
}

class Funcionário {
  constructor(id_funcionario, nome, cpf, email, senha) {
    this.id_funcionario = id_funcionario;
    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
    this.senha = senha;
  }
}

class Cliente {
  constructor(id_cliente, nome, data_nascimento, cpf, email, senha) {
    this.id_cliente = id_cliente;
    this.nome = nome;
    this.data_nascimento = data_nascimento;
    this.cpf = cpf;
    this.email = email;
    this.senha = senha;
  }
}

class Produtos {
  constructor(validade, preço, quantidade_estoque, nome, descrição) {
    this.validade = validade;
    this.preço = preço;
    this.quantidade_estoque = quantidade_estoque;
    this.nome = nome;
    this.descrição = descrição;
  }
}

class Sistema {
  cadastro() {
    let tipoConta = prompt(
      "Gostaria de criar uma conta de cliente ou funcionário? (cliente/funcionario) "
    ); // 'voce eh cliente? y/n'

    if (tipoConta == "cliente") {
      // tipoConta = 'y'
      let nome = prompt("Digite seu nome: ");
      let data_nascimento = prompt("Qual sua data de nascimento? (dd/mm/yy) ");
      let cpf = prompt("Digite seu CPF: ");
      let email = "";
      while (true) {
        email = prompt("Digite seu email: ");
        for (let i = 0; i < cadastros.length; i++) {
          if (cadastros[i][0] == email) {
            console.log("O email já está cadastrado. Tente novamente.\n");
          }
        }
        break;
      }

      let senha = prompt("Digite sua senha: ");
      let cadastroCliente = [email, senha, false];
      cadastros.push(cadastroCliente);

      let new_cliente = new Cliente(
        toString(clientes_id) + "c",
        nome,
        data_nascimento,
        cpf,
        email,
        senha
      );
      clientes_id++;
      clientes.push(new_cliente);
      console.log("Cadastro de cliente realizado com sucesso!\n");
    } else if (tipoConta == "funcionario") {
      // else if tipoConta == 'n'
      let nome = prompt("Digite seu nome: ");
      let cpf = prompt("Digite seu CPF: ");
      let email = "";
      while (true) {
        email = prompt("Digite seu email: ");
        for (let i = 0; i < cadastros.length; i++) {
          if (cadastros[i][0] == email) {
            console.log("O email já está cadastrado. Tente novamente.\n");
          }
        }
        break;
      }

      let senha = prompt("Digite sua senha: ");
      let cadastroFuncionario = [email, senha, true]; // true para funcionarios
      cadastros.push(cadastroFuncionario);
      new Funcionario(toString(funcionarios_id) + "f", nome, cpf, email, senha);
      funcionarios_id++;
      funcionarios.push(new_funcionario);
      console.log("Cadastro de funcionário realizado com sucesso!\n");
    } else {
      console.log("Entrada não reconhecida\n");
      return;
    }
  }

  login() {
    let email = prompt("Digite o seu email: ");
    for (let i = 0; i < cadastros.length(); i++) {
      // Procura o email no array de cadastros
      if (cadastros[i][0] == email) {
        let senha = prompt("Digite a sua senha: "); // Se o email for encontrado, pede a senha
        if (cadastros[i][1] == senha) {
          //login como funcionario
          if (cadastros[i][2]) {
            // Se o email for encontrado e a senha estiver correta, verifica se é funcionário
            login_status = 1;
            login_conta = email;
          } else if (!cadastros[i][2]) {
            //login como cliente
            login_status = 1;
            login_conta = email;
          } else {
            console.log("Senha incorreta. Tente novamente.\n");
            return; // poderia ser um while
          }
        }
      }
    }
    console.log("Email não cadastrado. Tente novamente.\n");
    return;
  }
}
const sistema = new Sistema();

sistema.cadastro();

console.log(clientes_id + "\n");
console.log(funcionarios_id + "\n");
console.log(cadastros + "\n");
console.log(clientes + "\n");
console.log(funcionarios + "\n");
