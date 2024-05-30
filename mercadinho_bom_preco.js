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

//variável que indica se o programa encerrará ou não
//manipulada pelo método sair() da classe Sistema
let sair = false;

class Pedido {
  constructor(id_pedido, id_cliente, status, data_pedido, conteudo, avaliação) {
    this.id_pedido = id_pedido;
    this.id_cliente = id_cliente;
    this.status = status;
    this.data_pedido = data_pedido;
    this.conteudo = conteudo;
    this.avaliação = avaliação;
  }
}

class Funcionario {
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

class Produto {
  constructor(validade, preço, quantidade_estoque, nome, descrição) {
    this.validade = validade;
    this.preço = preço;
    this.quantidade_estoque = quantidade_estoque;
    this.nome = nome;
    this.descrição = descrição;
  }
}

class Sistema {
  cadastro(tipoConta, nome, data_nascimento, cpf, email, senha) {
    if (tipoConta == "cliente") {
      for (let i = 0; i < cadastros.length; i++) {
        if (cadastros[i][0] == email) {
          console.log("O email já está cadastrado. Tente novamente.\n");
          return;
        }
      }
      let cadastroCliente = [email, senha, false];
      cadastros.push(cadastroCliente);

      let novoCliente = new Cliente(
        clientes_id.toString() + "c",
        nome,
        data_nascimento,
        cpf,
        email,
        senha
      );
      clientes_id++;
      clientes.push(novoCliente);
      console.log("Cadastro de cliente realizado com sucesso!\n");
    } else if (tipoConta == "funcionario") {
      if (tipoConta == "funcionario") {
        for (let i = 0; i < cadastros.length; i++) {
          if (cadastros[i][0] == email) {
            console.log("O email já está cadastrado. Tente novamente.\n");
            return;
          }
        }
        let cadastroFuncionario = [email, senha, true]; // true para funcionarios
        cadastros.push(cadastroFuncionario);
        let novoFuncionario = new Funcionario(
          funcionarios_id.toString() + "f",
          nome,
          cpf,
          email,
          senha
        );
        funcionarios_id++;
        funcionarios.push(novoFuncionario);
        console.log("Cadastro de funcionário realizado com sucesso!\n");
      } else {
        console.log("Tipo de conta não reconhecido. Tente novamente.\n");
        return;
      }
    }
  }

  login(email, senha, tipoConta) {
    if (tipoConta == "cliente") {
      for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].email == email && clientes[i].senha == senha) {
          login_status = 0;
          login_conta = email;
          console.log("Login realizado com sucesso!\n");
          return;
        } else {
          console.log("Email ou senha incorretos. Tente novamente.\n");
          return;
        }
      }
    } else if (tipoConta == "funcionario") {
      for (let i = 0; i < funcionarios.length; i++) {
        if (funcionarios[i].email == email && funcionarios[i].senha == senha) {
          login_status = 1;
          login_conta = email;
          console.log("Login realizado com sucesso!\n");
          return;
        } else {
          console.log("Email ou senha incorretos. Tente novamente.\n");
          return;
        }
      }
    } else {
      console.log("Tipo de conta não reconhecido\n");
      return;
    }
  }
  sairDoPrograma() {
    login_status = -1;
    sair = true;
    return;
  }
  verMeusDados() {
    if (login_status == -1) {
      console.log("Ninguém está logado.\n");
      return;
    } else if (login_status == 0) {
      for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].email == login_conta) {
          console.log(`ID: ${clientes[i].id_cliente}\n
          Nome: ${clientes[i].nome}\n
          Data de nascimento: ${clientes[i].data_nascimento}\n
          CPF: ${clientes[i].cpf}\n
          Email: ${clientes[i].email}\n
          Senha: ${clientes[i].senha}`);
          return;
        }
      }
    } else if (login_status == 1) {
      for (let i = 0; i < funcionarios.length; i++) {
        if (funcionarios[i].email == login_conta) {
          console.log(`ID: ${funcionarios[i].id_funcionario}\n
          Nome: ${funcionarios[i].nome}\n
          CPF: ${funcionarios[i].cpf}\n
          Email: ${funcionarios[i].email}\n
          Senha: ${funcionarios[i].senha}`);
          return;
        }
      }
    }
  }
  modificarMeusDados(propriedade, novoValor) {
    if (login_status != 0) {
      console.log("Você não pode modificar seus dados.\n");
      return;
    } else {
      for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].email == login_conta) {
          clientes[i].propriedade = novoValor;
          console.log("Dados editados com sucesso!\n");
          return;
        }
      }
    }
  }
  adicionarProduto(validade, preço, quantidade_estoque, nome, descrição) {
    if (login_status != 1) {
      console.log("Você não tem permissão para adicionar produtos.\n");
      return;
    } else {
      let novoProduto = new Produto(
        validade,
        preço,
        quantidade_estoque,
        nome,
        descrição
      );
      produtos.push(novoProduto);
      console.log("Produto adicionado com sucesso!\n");
    }
  }
  excluirProduto(nome) {
    if (login_status != 1) {
      console.log("Você não tem permissão para excluir produtos.\n");
      return;
    } else {
      for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].nome == nome) {
          produtos.splice(i, 1);
          console.log("Produto excluído com sucesso!\n");
          return;
        }
      }
      console.log("O Produto especificado não existe.\n");
    }
  }
  editarProduto(nome, propriedade, novoValor) {
    if (login_status != 1) {
      console.log("Você não tem permissão para editar produtos.\n");
      return;
    } else {
      for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].nome == nome) {
          produtos[i].propriedade = novoValor;
          console.log("Produto editado com sucesso!\n");
          return;
        }
      }
    }
  }
  fazerPedido(data_pedido, conteudo, avaliação = null) {
    let id_cliente_logado;
    if (login_status != 0) {
      console.log("Você não tem permissão para fazer pedidos.\n");
      return;
    } else {
      for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].email == login_conta) {
          id_cliente_logado = clientes[i].id_cliente;
          continue;
        }
      }
      let novoPedido = new Pedido(
        pedidos.length.toString() + "p",
        id_cliente_logado,
        "Realizado",
        data_pedido,
        conteudo,
        avaliação
      );
      pedidos.push(novoPedido);
      console.log("Pedido realizado com sucesso!\n");
    }
  }
  setStatusPedido(id_pedido, status) {
    if (login_status != 1) {
      console.log("Você não tem permissão para editar pedidos.\n");
      return;
    } else {
      for (let i = 0; i < pedidos.length; i++) {
        if (pedidos[i].id_pedido == id_pedido) {
          pedidos[i].status = status;
          console.log(
            `Status do pedido ${id_pedido} foi alterado com sucesso para ${status}.\n`
          );
          return;
        }
      }
      console.log("O pedido especificado não existe.\n");
    }
  }
  cancelarPedido(id_pedido) {
    if (login_status != 0) {
      console.log("Você não tem permissão para cancelar pedidos.\n");
      return;
    } else {
      for (let i = 0; i < pedidos.length; i++) {
        if (pedidos[i].id_pedido == id_pedido) {
          pedidos.splice(i, 1);
          console.log("Pedido cancelado com sucesso!\n");
          return;
        }
      }
      console.log("O pedido especificado não existe.\n");
    }
  }
  verMeusPedidos() {
    let id_cliente_logado;
    if (login_status != 0) {
      console.log("Você não tem permissão para ver pedidos.\n");
      return;
    } else {
      for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].email == login_conta) {
          id_cliente_logado = clientes[i].id_cliente;
          continue;
        }
      }
      for (let i = 0; i < pedidos.length; i++) {
        if (pedidos[i].id_cliente == id_cliente_logado) {
          console.log(pedidos[i]);
        }
      }
    }
  }
  avaliarPedido(id_pedido, avaliação) {
    if (login_status != 0) {
      console.log("Você não tem permissão para avaliar pedidos.\n");
      return;
    } else {
      for (let i = 0; i < pedidos.length; i++) {
        if (pedidos[i].id_pedido == id_pedido) {
          pedidos[i].avaliação = avaliação;
          console.log(
            `Pedido ${id_pedido} avaliado com sucesso. Avaliacao:\n\n${avaliação}.\n`
          );
          return;
        }
      }
      console.log("O pedido especificado não existe.\n");
    }
  }
  visualizarAvaliacoes() {
    if (login_status != 0) {
      console.log("Você não tem permissão para ver avaliações.\n");
      return;
    } else {
      for (let i = 0; i < pedidos.length; i++) {
        if (pedidos[i].avaliação != undefined) {
          console.log(
            `Avaliação do pedido ${pedidos[i].id_pedido}: ${pedidos[i].avaliação}.\n`
          );
        }
      }
    }
  }

  verListaClientes() {
    if (login_status != 1) {
      console.log("Você não tem permissão para ver a lista de clientes.\n");
      return;
    } else {
      console.log(clientes);
    }
  }
  verListaProdutos() {
    console.log("Lista de produtos: ");
    console.log(produtos);
  }
}

const sistema = new Sistema();

// Testes

// sistema.cadastro("funcionario");
// sistema.login("carol@gmail.com", "123456789", "funcionario");
// sistema.verMeusDados();
// sistema.modificarMeusDados("nome", "Carol Silva");
// sistema.verMeusDados();
// sistema.adicionarProduto("12/12/2022", 10, 1000, "Arroz", "Arroz branco");
// sistema.adicionarProduto("12/12/2023", 15, 1500, "Feijão", "Feijão preto");
// sistema.adicionarProduto("12/12/2024", 24, 780, "Macarrão", "Penne");
// sistema.verListaProdutos();
// sistema.editarProduto("Arroz", "quantidade_estoque", 6); // cria novo atributo "propriedade" - erro
// sistema.verListaProdutos();
// sistema.excluirProduto("Macarrão");
// sistema.verListaProdutos();
// sistema.sairDoPrograma();

// sistema.cadastro("cliente");
// sistema.login("amy@out.com", "123456789", "cliente");
// sistema.verMeusDados();
// sistema.modificarMeusDados("nome", "Amyzinha"); // não funciona
// sistema.verMeusDados();
// sistema.fazerPedido("12/12/2021", "Feijão");
// sistema.verMeusPedidos();
// sistema.setStatusPedido("0p", "Entregue");
// sistema.avaliarPedido("0p", "Muito bom");
// sistema.visualizarAvaliacoes();
// sistema.sairDoPrograma();
