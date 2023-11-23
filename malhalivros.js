// Objeto Livro e seu construtor
function Livro(titulo, autor, totalDePaginas) {
  this.titulo = titulo;
  this.autor = autor;
  this.totalDePaginas = totalDePaginas;
  this.paginaAtual = 0;

  // Método para atualizar o progresso de leitura
  this.progressoDeLeitura = function(pagina) {
    this.paginaAtual = pagina;
    return (this.paginaAtual / this.totalDePaginas) * 100;
  };
}

// Array de livros
var livros = [
  new Livro("Dom Quixote", "Miguel de Cervantes", 1000),
  new Livro("1984", "George Orwell", 300),
  new Livro("O Senhor dos Anéis", "J.R.R. Tolkien", 1500)
];

// Função para criar e adicionar um novo livro ao array
function cadastrarLivro() {
  var titulo = document.getElementById("titulo").value;
  var autor = document.getElementById("autor").value;
  var totalDePaginas = parseInt(document.getElementById("totalDePaginas").value);

  if (titulo && autor && !isNaN(totalDePaginas) && totalDePaginas > 0) {
    var novoLivro = new Livro(titulo, autor, totalDePaginas);
    livros.push(novoLivro);
    exibirTabela();
  } else {
    alert("Preencha todos os campos corretamente.");
  }
}

// Função para deletar um livro
function deletarLivro(index) {
  livros.splice(index, 1);
  exibirTabela();
}

// Função para atualizar o progresso de leitura
function atualizarProgresso(index) {
  var novaPagina = prompt("Digite a nova página:");

  if (novaPagina !== null && !isNaN(novaPagina) && novaPagina >= 0 && novaPagina <= livros[index].totalDePaginas) {
    livros[index].progressoDeLeitura(parseInt(novaPagina));
    exibirTabela();
  } else {
    alert("Digite um valor válido para a página.");
  }
}

// Função para exibir dados em uma tabela HTML
function exibirTabela() {
  var tabela = "<table border='1'><tr><th>Título</th><th>Autor</th><th>Total de Páginas</th><th>Página Atual</th><th>Progresso</th><th>Ações</th></tr>";

  livros.forEach(function(livro, index) {
    tabela += `<tr>
                <td>${livro.titulo}</td>
                <td>${livro.autor}</td>
                <td>${livro.totalDePaginas}</td>
                <td>${livro.paginaAtual}</td>
                <td>${livro.progressoDeLeitura(livro.paginaAtual).toFixed(2)}%</td>
                <td>
                  <button class="delete-button" onclick="deletarLivro(${index})">Deletar</button>
                  <button onclick="atualizarProgresso(${index})">Atualizar Progresso</button>
                </td>
              </tr>`;
  });

  tabela += "</table>";
  document.getElementById("tabelaLivros").innerHTML = tabela;
}

// Inicializar tabela
exibirTabela();
