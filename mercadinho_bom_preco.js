const { none, sort } = require("list");
const prompt = require("prompt-sync")({ sigint: true });

let clientes_id = 0; // Inicializa o id do cliente, contador
let funcionarios_id = 0; // Inicializa o id do funcionário, contador

const cadastros = []; // Array que guardará os cadastros de email e senha
const pedidos = []; // Array que guardará os pedidos
const funcionarios = []; // Array que guardará os funcionários
const clientes = []; // Array que guardará os clientes
const produtos = []; // Array que guardará os produtos

let loginStatus = -1; // -1: ninguém logado, 0: cliente logado, 1: funcionário logado
let emailLogado = null; // guardará o email da conta logada

class Pedido {
  constructor(id_pedido, id_cliente, status, data_pedido, conteudo, avaliacao) {
    this.id_pedido = id_pedido;
    this.id_cliente = id_cliente;
    this.status = status;
    this.data_pedido = data_pedido;
    this.conteudo = conteudo;
    this.avaliacao = avaliacao;
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
  constructor(validade, preco, quantidade_estoque, nome, descricao) {
    this.validade = validade;
    this.preco = preco;
    this.quantidade_estoque = quantidade_estoque;
    this.nome = nome;
    this.descricao = descricao;
  }
}

class Sistema {
  cadastro(tipoConta, nome, data_nascimento, cpf, email, senha) {
    if (tipoConta == "cliente") {
      // Se o tipo de conta for 'cliente'
      for (let i = 0; i < cadastros.length; i++) {
        if (cadastros[i][0] == email) {
          // Verifica se o email já está cadastrado
          console.log("O email já está cadastrado. Tente novamente.\n");
          return;
        }
      }
      let cadastroCliente = [email, senha];
      cadastros.push(cadastroCliente); // Adiciona o email e senha correspondente ao array de cadastros

      let novoCliente = new Cliente( // Cria um novo cliente
        clientes_id.toString() + "c", // O id do cliente é baseado no número de clientes cadastrados com um indicador 'c' no final
        nome,
        data_nascimento,
        cpf,
        email,
        senha
      );
      clientes_id++; // Incrementa o id do cliente
      clientes.push(novoCliente); // Adiciona o novo cliente ao array de clientes
      console.log("Cadastro de cliente realizado com sucesso!\n");
    } else if (tipoConta == "funcionario") {
      if (loginStatus == 0) {
        // Clientes não podem cadastrar funcionários
        console.log("Você não tem permissão para cadastrar funcionários.\n");
        return;
      } else if (tipoConta == "funcionario") {
        for (let i = 0; i < cadastros.length; i++) {
          if (cadastros[i][0] == email) {
            // Verifica se o email já está cadastrado
            console.log("O email já está cadastrado. Tente novamente.\n");
            return;
          }
        }
        let cadastroFuncionario = [email, senha];
        // Adiciona o email e senha correspondente ao array de cadastros
        cadastros.push(cadastroFuncionario);
        let novoFuncionario = new Funcionario( // Cria um novo funcionário
          funcionarios_id.toString() + "f", // O id do funcionário é baseado no número de funcionários cadastrados com um indicador 'f' no final
          nome,
          cpf,
          email,
          senha
        );
        funcionarios_id++;
        funcionarios.push(novoFuncionario);
        console.log("Cadastro de funcionário realizado com sucesso!\n");
      } else {
        // Se o tipo de conta especificado não for 'cliente' nem 'funcionario'
        console.log("Tipo de conta não reconhecido. Tente novamente.\n");
        return;
      }
    }
  }

  login(email, senha, tipoConta) {
    if (tipoConta == "cliente") {
      // Se o tipo de conta logando for 'cliente'
      for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].email == email && clientes[i].senha == senha) {
          // Verifica se o par email e senha correspondem a um cliente
          loginStatus = 0; // Status de login para 'cliente logado' é
          emailLogado = email; // Guarda o email do cliente logado
          console.log("Login realizado com sucesso!\n");
          return;
        }
      }
      console.log("Email ou senha incorretos. Tente novamente.\n");
    } else if (tipoConta == "funcionario") {
      for (let i = 0; i < funcionarios.length; i++) {
        if (funcionarios[i].email == email && funcionarios[i].senha == senha) {
          // Verifica se o par email e senha correspondem a um funcionário
          loginStatus = 1; // Status de login para 'funcionário logado' é 1
          emailLogado = email; // Guarda o email do funcionário logado
          console.log("Login realizado com sucesso!\n");
          return;
        }
      }
      console.log("Email ou senha incorretos. Tente novamente.\n");
    } else {
      console.log("Tipo de conta não reconhecido\n");
    }
  }
  sairDoPrograma() {
    loginStatus = -1; // Status de login para 'ninguém logado' é -1
    console.log("Você não está mais logado no sistema.\n");
    return;
  }
  verMeusDados() {
    if (loginStatus == -1) {
      console.log("Ninguém está logado.\n");
      return;
    } else if (loginStatus == 0) {
      // Se um cliente está logado
      for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].email == emailLogado) {
          // Identifica o cliente logado pelo 'emailLogado' e mostra seus dados
          console.log(`ID: ${clientes[i].id_cliente}\n
          Nome: ${clientes[i].nome}\n
          Data de nascimento: ${clientes[i].data_nascimento}\n
          CPF: ${clientes[i].cpf}\n
          Email: ${clientes[i].email}\n
          Senha: ${clientes[i].senha}`);
          return;
        }
      }
    } else if (loginStatus == 1) {
      // Se um funcionário está logado
      for (let i = 0; i < funcionarios.length; i++) {
        if (funcionarios[i].email == emailLogado) {
          // Identifica o funcionário logado pelo 'emailLogado' e mostra seus dados
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
    if (loginStatus != 0) {
      // Apenas clientes logados podem modificar seus dados
      console.log("Você não pode modificar seus dados.\n");
      return;
    } else {
      for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].email == emailLogado) {
          // Identifica o cliente que está logado
          clientes[i][propriedade] = novoValor; // Modifica a propriedade especificada com o novo valor
          console.log("Dados editados com sucesso!\n");
          return;
        }
      }
    }
  }
  adicionarProduto(validade, preco, quantidade_estoque, nome, descricao) {
    if (loginStatus != 1) {
      // Apenas funcionários logados podem adicionar produtos
      console.log("Você não tem permissão para adicionar produtos.\n");
      return;
    } else {
      let novoProduto = new Produto( // Cria um novo produto com as informações fornecidas
        validade,
        preco,
        quantidade_estoque,
        nome,
        descricao
      );
      produtos.push(novoProduto); // Adiciona o novo produto ao array de produtos
      console.log("Produto adicionado com sucesso!\n");
    }
  }
  excluirProduto(nome) {
    if (loginStatus != 1) {
      // Apenas funcionários logados podem excluir produtos
      console.log("Você não tem permissão para excluir produtos.\n");
      return;
    } else {
      for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].nome == nome) {
          // Procura o produto com o nome especificado
          produtos.splice(i, 1); // Remove o produto do array de produtos
          console.log("Produto excluído com sucesso!\n");
          return;
        }
      }
      console.log("O Produto especificado não existe.\n");
    }
  }
  editarProduto(nome, propriedade, novoValor) {
    if (loginStatus != 1) {
      // Apenas funcionários logados podem editar produtos
      console.log("Você não tem permissão para editar produtos.\n");
      return;
    } else {
      for (let i = 0; i < produtos.length; i++) {
        if (produtos[i].nome == nome) {
          // Procura o produto com o nome especificado
          produtos[i][propriedade] = novoValor; // Modifica a propriedade especificada com o novo valor
          console.log("Produto editado com sucesso!\n");
          return;
        }
      }
    }
  }
  fazerPedido(data_pedido, conteudo, avaliacao = null) {
    let id_cliente_logado;
    if (loginStatus != 0) {
      // Apenas clientes logados podem fazer pedidos
      console.log("Você não tem permissão para fazer pedidos.\n");
      return;
    } else {
      for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].email == emailLogado) {
          // Identifica o cliente logado
          id_cliente_logado = clientes[i].id_cliente; // Guarda o id do cliente logado
          continue;
        }
      }
      let novoPedido = new Pedido( // Cria um novo pedido com as informações fornecidas
        pedidos.length.toString() + "p",
        id_cliente_logado,
        "Pendente", // Status inicial do pedido é 'Pendente', sinalizando que ainda não foi realizado
        data_pedido,
        conteudo,
        avaliacao
      );
      pedidos.push(novoPedido); // Adiciona o novo pedido ao array de pedidos
      console.log("Pedido realizado com sucesso!\n");
    }
  }
  setStatusPedido(id_pedido, status) {
    if (loginStatus != 1) {
      // Apenas funcionários logados podem editar pedidos
      console.log("Você não tem permissão para editar pedidos.\n");
      return;
    } else if (
      // Verifica se o status fornecido é válido
      status != "Pendente" &&
      status != "Adiado" &&
      status != "Realizado" &&
      status != "Cancelado"
    ) {
      console.log(
        "Status inválido.",
        "Opções válidas: 'Pendente', 'Adiado', 'Realizado', 'Cancelado'.\n"
      );
      return;
    } else {
      for (let i = 0; i < pedidos.length; i++) {
        if (pedidos[i].id_pedido == id_pedido) {
          // Procura o pedido com o id especificado
          pedidos[i].status = status; // Modifica o status do pedido
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
    let id_cliente_logado;
    for (let i = 0; i < clientes.length; i++) {
      if (clientes[i].email == emailLogado) {
        // Identifica o cliente logado
        id_cliente_logado = clientes[i].id_cliente; // Guarda o id do cliente logado
        continue;
      }
    }
    if (loginStatus != 0) {
      // Apenas clientes logados podem cancelar pedidos
      console.log("Você não tem permissão para cancelar pedidos.\n");
      return;
    } else {
      for (let i = 0; i < pedidos.length; i++) {
        if (pedidos[i].id_pedido == id_pedido) {
          // Procura o pedido com o id especificado
          if (pedidos[i].id_cliente != id_cliente_logado) {
            // Verifica se o cliente logado é o dono do pedido
            console.log("Você não pode cancelar esse pedido.\n");
            return;
          } else if (pedidos[i].status == "Cancelado") {
            // Verifica se o pedido já foi cancelado
            console.log("Esse pedido já foi cancelado.\n");
            return;
          } else if (pedidos[i].status == "Realizado") {
            // Verifica se o pedido já foi realizado
            console.log(
              "Você não pode cancelar um pedido que já foi realizado. Aguarde a entrega para solicitar um reembolso.\n"
            );
            return;
          }
          pedidos[i].status = "Cancelado"; // Modifica o status do pedido para 'Cancelado'
          console.log("Pedido cancelado com sucesso!\n");
          return;
        }
      }
      console.log("O pedido especificado não existe.\n");
    }
  }
  verMeusPedidos() {
    // Ordena o array de pedidos por data
    pedidos.sort((a, b) => {
      const dateA = new Date(a.data_pedido);
      const dateB = new Date(b.data_pedido);
      return dateA - dateB;
    });

    let id_cliente_logado;
    if (loginStatus != 0) {
      // Apenas clientes logados podem ver seus pedidos
      console.log("Você não tem permissão para ver pedidos.\n");
      return;
    } else {
      for (let i = 0; i < clientes.length; i++) {
        if (clientes[i].email == emailLogado) {
          // Identifica o cliente logado
          id_cliente_logado = clientes[i].id_cliente; // Guarda o id do cliente logado
          continue;
        }
      }
      for (let i = 0; i < pedidos.length; i++) {
        if (pedidos[i].id_cliente == id_cliente_logado) {
          // filtro para mostrar apenas os pedidos do cliente que está logado
          if (pedidos[i].status != "Cancelado") {
            // Mostra apenas pedidos não cancelados
            console.log(pedidos[i]);
          }
        }
      }
    }
  }
  avaliarPedido(id_pedido, avaliacao) {
    let id_cliente_logado = null; // Inicialize o id_cliente_logado com null
    for (let i = 0; i < clientes.length; i++) {
      if (clientes[i].email == emailLogado) {
        // Identifica o cliente logado
        id_cliente_logado = clientes[i].id_cliente; // Identifica o ID do cliente logado
        break;
      }
    }
    if (loginStatus != 0) {
      // Apenas clientes logados podem avaliar pedidos
      console.log("Você não tem permissão para avaliar pedidos.\n");
      return;
    }

    for (let i = 0; i < pedidos.length; i++) {
      if (pedidos[i].id_pedido == id_pedido) {
        // Procura o pedido com o id especificado
        if (pedidos[i].status == "Cancelado") {
          // Verifica se o pedido foi cancelado
          console.log("Você não pode avaliar um pedido cancelado.\n");
          return;
        } else if (pedidos[i].id_cliente == id_cliente_logado) {
          // Verifica se o cliente logado é o dono do pedido
          pedidos[i].avaliacao = avaliacao; // Adiciona a avaliação ao pedido
          console.log(
            `Pedido ${id_pedido} avaliado com sucesso. Avaliacao:\n\n${avaliacao}.\n`
          );
          return;
        } else {
          console.log("Você não pode avaliar esse pedido.\n");
          return;
        }
      }
    }
    console.log("O pedido especificado não existe.\n");
  }

  visualizarAvaliacoes() {
    if (loginStatus == -1) {
      // Apenas contas logadas podem ver avaliações
      console.log("Você não tem permissão para ver avaliações.\n");
      return;
    } else {
      for (let i = 0; i < pedidos.length; i++) {
        // Percorre todos os pedidos para verificar se há avaliações
        // Se houver, mostra a avaliação
        if (pedidos[i].avaliacao != undefined) {
          console.log(
            `Avaliação do pedido ${pedidos[i].id_pedido}: ${pedidos[i].avaliacao}.\n`
          );
        }
      }
    }
  }

  verListaClientes() {
    if (loginStatus != 1) {
      // Apenas funcionários logados podem ver a lista de clientes
      console.log("Você não tem permissão para ver a lista de clientes.\n");
      return;
    } else {
      clientes.sort((a, b) => a.nome.localeCompare(b.nome)); // Ordena a lista de clientes por nome
      console.log(clientes); // Mostra a lista de clientes
    }
  }
  verListaProdutos() {
    if (loginStatus == -1) {
      // Apenas contas logadas podem ver a lista de produtos
      console.log("Você não tem permissão para ver a lista de produtos.\n");
      return;
    } else {
      produtos.sort((a, b) => a.nome.localeCompare(b.nome)); // Ordena a lista de produtos por nome
      console.log(produtos); // Mostra a lista de produtos
    }
  }
  verListaPedidos() {
    if (loginStatus != 1) {
      // Apenas funcionários logados podem ver a lista de pedidos
      console.log("Você não tem permissão para ver a lista de pedidos.\n");
      return;
    } else {
      // Ordena o array de pedidos por data
      pedidos.sort((a, b) => {
        const dateA = new Date(a.data_pedido);
        const dateB = new Date(b.data_pedido);
        return dateA - dateB;
      });
      console.log(pedidos); // Mostra a lista de pedidos
    }
  }
}

const readline = require("readline");

const sistema = new Sistema();

function mostrarMenu() {
  // Mostra o menu de opções
  console.log(`
  Escolha uma opção:
  1. Cadastrar Nova Conta
  2. Fazer Login
  3. Listar Produtos
  4. Listar Clientes
  5. Ver meus Dados
  6. Modificar meus Dados
  7. Fazer Pedido
  8. Ver Lista de Pedidos
  9. Ver meus Pedidos
  10. Cancelar Pedido
  11. Setar Status Pedido
  12. Avaliar Pedido
  13. Visualizar Avaliações
  14. Adicionar Produto
  15. Excluir Produto
  16. Editar Produto
  17. Sair
    `);
}

function main() {
  while (true) {
    mostrarMenu();
    const choice = prompt("Escolha uma opção: ");
    // Declarando variáveis para serem usadas em diferentes opções
    let nome,
      data_nascimento,
      cpf,
      senha,
      validade,
      preco,
      quantidade_estoque,
      descricao,
      email,
      tipoConta,
      id_pedido,
      data_pedido,
      status,
      avaliacao;
    switch (
      choice // Switch case para cada opção
    ) {
      case "1":
        tipoConta = prompt("Tipo de conta (cliente/funcionario): ");
        nome = prompt("Nome: ");
        if (tipoConta == "cliente") {
          data_nascimento = prompt("Data de nascimento (yyyy-mm-dd): ");
        } else {
          // Data de nascimento é null para funcionários
          data_nascimento = null;
        }
        cpf = prompt("CPF: ");
        email = prompt("Email: ");
        senha = prompt("Senha: ");
        sistema.cadastro(tipoConta, nome, data_nascimento, cpf, email, senha);
        break;
      case "2":
        email = prompt("Email: ");
        senha = prompt("Senha: ");
        tipoConta = prompt("Tipo de conta (cliente/funcionario): ");
        sistema.login(email, senha, tipoConta);
        break;
      case "3":
        sistema.verListaProdutos();
        break;
      case "4":
        sistema.verListaClientes();
        break;
      case "5":
        sistema.verMeusDados();
        break;
      case "6":
        propriedade = prompt("Propriedade a ser editada: ");
        novoValor = prompt("Novo valor: ");
        sistema.modificarMeusDados(propriedade, novoValor);
        break;
      case "7":
        data_pedido = prompt("Data do pedido (yyyy-mm-dd): ");
        conteudo = prompt("Conteúdo: ");
        sistema.fazerPedido(data_pedido, conteudo, null);
        break;
      case "8":
        sistema.verListaPedidos();
        break;
      case "9":
        sistema.verMeusPedidos();
        break;
      case "10":
        id_pedido = prompt("ID do pedido a ser cancelado: ");
        sistema.cancelarPedido(id_pedido);
        break;
      case "11":
        id_pedido = prompt("ID do pedido: ");
        status = prompt("Novo Status: ");
        sistema.setStatusPedido(id_pedido, status);
        break;
      case "12":
        id_pedido = prompt("ID do pedido a ser avaliado: ");
        avaliacao = prompt("Avaliação: ");
        sistema.avaliarPedido(id_pedido, avaliacao);
        break;
      case "13":
        sistema.visualizarAvaliacoes();
        break;
      case "14":
        validade = prompt("Validade (yyyy-mm-dd): ");
        preco = prompt("Preço: ");
        quantidade_estoque = prompt("Quantidade em estoque: ");
        nome = prompt("Nome: ");
        descricao = prompt("Descrição: ");
        sistema.adicionarProduto(
          validade,
          preco,
          quantidade_estoque,
          nome,
          descricao
        );
        break;
      case "15":
        nome = prompt("Nome do produto a ser excluído: ");
        sistema.excluirProduto(nome);
        break;
      case "16":
        nome = prompt("Nome do produto: ");
        propriedade = prompt("Propriedade a ser editada: ");
        novoValor = prompt("Novo valor: ");
        sistema.editarProduto(nome, propriedade, novoValor);
        break;
      case "17":
        sistema.sairDoPrograma();
        break;
      default:
        console.log("Opção inválida. Tente novamente.");
    }
  }
}

main();
