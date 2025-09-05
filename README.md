
# Lista de Compras Inteligente

Este projeto é uma aplicação web de Lista de Compras inteligente, desenvolvida em HTML, CSS e JavaScript puro, com recursos modernos para facilitar o controle das suas compras. O objetivo é ser simples, intuitivo e útil para qualquer pessoa.

---

## 👤 Autor
- **Filipe Gabriel**
- GitHub: [@FilipeGabriel01](https://github.com/FilipeGabriel01/)
- Instagram: [@sr.filipe01](https://www.instagram.com/sr.filipe01/)

Entre em contato para dúvidas, sugestões ou colaborações!

---

## 📂 Estrutura dos Arquivos

```
Agenda-JS/
├── index.html         # Estrutura da página web
├── style.css          # Estilos visuais e responsividade
├── script.js          # Lógica da aplicação (JavaScript)
├── img/               # (opcional) Imagens usadas no projeto
└── README.md          # Este manual detalhado
```

---

## 📄 index.html — Estrutura da Página

- Define o layout principal da aplicação.
- Inclui os campos para nome da lista, produto, quantidade, preço, botões e área da lista.
- Carrega o CSS e o JavaScript.
- Usa o CDN do jsPDF para exportação em PDF.

### Principais Elementos:
- `<input id="nome-lista">`: Campo para o nome personalizado da lista.
- `<form id="form">`: Formulário para adicionar itens (produto, quantidade, preço, botão Adicionar).
- `<ul id="sugestoes-produto">`: Sugestões automáticas de produtos.
- `<ul id="lista">`: Lista dinâmica dos itens adicionados.
- `<span id="total">`: Exibe o valor total da lista.
- Botões: "Adicionar", "Baixar Lista" (PDF), "Reiniciar Lista" (limpa tudo).

---

## 🎨 style.css — Estilização e Layout

- Define o visual moderno, responsivo e agradável.
- Usa gradientes animados no fundo.
- Campos e botões com bordas arredondadas, transparência e efeitos de foco.
- Sugestões de produto aparecem em um dropdown estilizado.
- Botões de ação (adicionar, baixar, reiniciar) com cores e efeitos de hover.
- Layout flexível para funcionar bem em desktop e celular.

### Exemplos de Estilos:
- `.btn-baixar`, `.btn-reiniciar`: Botões grandes e destacados.
- `#nome-lista`, `#form input`: Campos com fundo translúcido e sombra.
- `.campo-produto-autocomplete`: Organiza o autocomplete do produto.
- Responsividade garantida com `flex` e tamanhos mínimos.

---

## 💻 script.js — Lógica da Aplicação

- **Adição de itens**: Captura os dados do formulário, valida e adiciona à lista.
- **Sugestão automática de produtos**: Mostra sugestões ao digitar no campo produto.
- **Sugestão de preço**: Preenche automaticamente o preço se já foi usado antes para o mesmo produto.
- **Ajuste de quantidade**: Botões ➕ e ➖ para alterar quantidade, removendo o item se chegar a zero.
- **Remoção de itens**: Botão para remover qualquer item da lista.
- **Cálculo do total**: Soma automática do valor total da lista.
- **Persistência local**: Salva a lista e preços no navegador (localStorage).
- **Exportação em PDF**: Gera um PDF personalizado com nome, itens e total.
- **Reiniciar lista**: Limpa todos os itens, total e nome da lista.

### Explicação das Principais Funções (linha a linha):

#### 1. Sugestão e Salvamento de Preço
```js
function salvarPrecoProduto(produto, preco) {
	let precos = JSON.parse(localStorage.getItem('precosProdutos')) || {};
	precos[produto.toLowerCase()] = preco;
	localStorage.setItem('precosProdutos', JSON.stringify(precos));
}
```
- Salva o preço do produto no localStorage para sugerir futuramente.

#### 2. Sugestão Automática de Produto
```js
inputProduto.addEventListener('input', function() {
	// ...
	const precoSugerido = sugerirPrecoProduto(this.value.trim());
	if (precoSugerido) {
		inputPreco.value = precoSugerido;
	}
});
```
- Mostra sugestões e preenche o preço automaticamente se já existir.

#### 3. Adicionar Item
```js
form.addEventListener('submit', (e) => {
	e.preventDefault();
	// Captura valores, valida e adiciona à lista
	compras.push({ produto, quantidade, preco, comprado: false });
	salvarPrecoProduto(produto, preco);
	salvar();
	renderizar();
	form.reset();
});
```
- Adiciona o item à lista, salva no localStorage e atualiza a tela.

#### 4. Renderizar Lista
```js
function renderizar() {
	lista.innerHTML = '';
	compras.forEach((item, index) => {
		// Cria elementos, botões de ação e exibe na tela
	});
	calcularTotal();
}
```
- Atualiza a lista visualmente a cada alteração.

#### 5. Baixar PDF
```js
document.getElementById('baixar-lista').addEventListener('click', () => {
	// Gera PDF com nome, itens e total usando jsPDF
});
```
- Permite baixar a lista em PDF personalizado.

#### 6. Reiniciar Lista
```js
document.getElementById('reiniciar-lista').addEventListener('click', () => {
	compras = [];
	salvar();
	renderizar();
	document.getElementById('nome-lista').value = '';
	calcularTotal();
});
```
- Limpa todos os dados e reinicia a lista.

---

## 📝 Observações
- Todo o armazenamento é local, nada é enviado para servidores.
- O projeto funciona em computadores e celulares.
- O código é comentado e organizado para facilitar o entendimento e a manutenção.

---

## 📢 Contato
- **Autor:** Filipe Gabriel
- GitHub: [@filipegabrieldev](https://github.com/filipegabrieldev)
- Instagram: [@filipegabriel.js](https://instagram.com/filipegabriel.js)

Fique à vontade para entrar em contato para dúvidas, sugestões ou colaborações!

---

## 🚀 Como rodar o projeto
1. Baixe ou clone este repositório.
2. Abra o arquivo `index.html` em qualquer navegador moderno.
3. Pronto! Não precisa instalar nada.

---

## 📚 Comentários e Explicações Linha a Linha

O código JavaScript está comentado para explicar cada parte. Se quiser entender cada linha, basta ler os comentários no próprio arquivo `script.js`.

Se tiver dúvidas sobre qualquer trecho, entre em contato!
