// Função para reiniciar a lista
document.getElementById('reiniciar-lista').addEventListener('click', () => {
  if (!confirm('Tem certeza que deseja limpar toda a lista?')) return;
  compras = [];
  salvar();
  renderizar();
  document.getElementById('nome-lista').value = '';
  calcularTotal();
});
// Salvar e sugerir preço unitário dos produtos
function salvarPrecoProduto(produto, preco) {
  let precos = JSON.parse(localStorage.getItem('precosProdutos')) || {};
  precos[produto.toLowerCase()] = preco;
  localStorage.setItem('precosProdutos', JSON.stringify(precos));
}

function sugerirPrecoProduto(produto) {
  let precos = JSON.parse(localStorage.getItem('precosProdutos')) || {};
  return precos[produto.toLowerCase()] || '';
}


const inputProduto = document.getElementById('produto');
const inputPreco = document.getElementById('preco');

// Ao digitar produto, sugerir preço se já existir
inputProduto.addEventListener('input', function() {
  // ...código de sugestão de produto já existente...
  const precoSugerido = sugerirPrecoProduto(this.value.trim());
  if (precoSugerido) {
    inputPreco.value = precoSugerido;
  }
});
// Função para baixar a lista em PDF personalizado com nome customizado
document.getElementById('baixar-lista').addEventListener('click', () => {
  if (compras.length === 0) {
    alert('A lista está vazia!');
    return;
  }
  const inputNomeLista = document.getElementById('nome-lista');
  const nomeLista = inputNomeLista.value.trim() || 'Lista de Compras';
  // Usando jsPDF
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Título
  doc.setFontSize(20);
  doc.setTextColor(40, 40, 180);
  doc.text('🛒 ' + nomeLista, 105, 20, { align: 'center' });

  // Cabeçalho da tabela
  doc.setFontSize(13);
  doc.setTextColor(0,0,0);
  doc.text('Produto', 20, 35);
  doc.text('Qtd', 100, 35);
  doc.text('Preço', 130, 35);

  // Itens
  let y = 45;
  compras.forEach(item => {
    doc.setFontSize(12);
    doc.setTextColor(50,50,50);
    doc.text(item.produto, 20, y);
    doc.text(String(item.quantidade), 100, y);
    doc.text('R$ ' + item.preco.toFixed(2), 130, y);
    y += 10;
  });

  // Total
  const total = compras.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  doc.setFontSize(15);
  doc.setTextColor(220, 50, 47);
  doc.text(`Total: R$ ${total.toFixed(2)}`, 20, y + 10);

  // Nome do arquivo baseado no nome da lista
  const nomeArquivo = nomeLista.replace(/[^a-zA-Z0-9-_]/g, '_').toLowerCase() + '.pdf';
  doc.save(nomeArquivo);
});
// Pegando elementos
const form = document.getElementById('form');
const lista = document.getElementById('lista');
const totalSpan = document.getElementById('total');

// Lista de compras inicial do localStorage
let compras = JSON.parse(localStorage.getItem('compras')) || [];

// Salvar no localStorage
function salvar() {
  localStorage.setItem('compras', JSON.stringify(compras));
}

// Calcular total
function calcularTotal() {
  const total = compras.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
  totalSpan.textContent = total.toFixed(2);
}

// Renderizar lista
function renderizar() {
  lista.innerHTML = '';

  compras.forEach((item, index) => {
    const li = document.createElement('li');
    // Não precisa mais de classe 'comprado'

    const span = document.createElement('span');
    span.textContent = `${item.produto} - ${item.quantidade} x R$ ${item.preco.toFixed(2)}`;

    const divBtns = document.createElement('div');

    // Botão de diminuir quantidade
    const btnDiminuir = document.createElement('button');
    btnDiminuir.type = 'button';
  btnDiminuir.textContent = '➖';
    btnDiminuir.className = 'btn-small diminuir';
    btnDiminuir.addEventListener('click', () => {
      item.quantidade--;
      if (item.quantidade <= 0) {
        compras.splice(index, 1);
      }
      salvar();
      renderizar();
    });

    // Botão de aumentar quantidade
    const btnAumentar = document.createElement('button');
    btnAumentar.type = 'button';
  btnAumentar.textContent = '➕';
    btnAumentar.className = 'btn-small aumentar';
    btnAumentar.addEventListener('click', () => {
      item.quantidade++;
      salvar();
      renderizar();
    });

    // Botão de remover
    const btnRemover = document.createElement('button');
    btnRemover.type = 'button';
    btnRemover.textContent = 'Remover';
    btnRemover.className = 'btn-small remover';
    btnRemover.addEventListener('click', () => {
      compras.splice(index, 1);
      salvar();
      renderizar();
    });

    divBtns.appendChild(btnDiminuir);
    divBtns.appendChild(btnAumentar);
    divBtns.appendChild(btnRemover);
    li.appendChild(span);
    li.appendChild(divBtns);
    lista.appendChild(li);
  });

  calcularTotal();
}

// Adicionar item
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const produto = document.getElementById('produto').value.trim();
  const quantidade = parseInt(document.getElementById('quantidade').value);
  const preco = parseFloat(document.getElementById('preco').value);

  if (!produto || isNaN(quantidade) || isNaN(preco)) {
    alert('Preencha corretamente os campos!');
    return;
  }

  compras.push({ produto, quantidade, preco, comprado: false });
  salvarPrecoProduto(produto, preco); // Salva o preço unitário para sugestão futura
  salvar();
  renderizar();
  form.reset();
});

// Inicializar
renderizar();
calcularTotal();