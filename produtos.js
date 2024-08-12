function Layout(){
    window.location.href = 'Layout pág.html'; //função para o botão de página principal
}

function Contato(){
    window.location.href = 'contato.html'; //função para página de contato
}

function Compre(){
    window.location.href = 'contato.html'; //função para botão de compre
}
//enviar as informações para o whatssap
function enviarParaWhatsApp(event) { 
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const telefone = document.getElementById('telefone').value;

//validar o telefone 
    if (!validarTelefone(telefone)) {
        alert("Por favor, insira um número de telefone válido.");
        return;
    }
//mensagem pronta que é enviada com o pedido
    const mensagem = `Olá, gostaria de personalizar uma peça. Nome: ${nome} Descrição: ${descricao} Telefone: ${telefone}`;
    const url = `https://api.whatsapp.com/send?phone=5533999091040&text=${encodeURIComponent(mensagem)}`;

    window.open(url, '_blank');

    // Armazenar no localStorage
    const personalizacoes = JSON.parse(localStorage.getItem('personalizacoes')) || [];
    personalizacoes.push({ nome, descricao, telefone });
    localStorage.setItem('personalizacoes', JSON.stringify(personalizacoes));

    // Exibir as personalizações na tela
    exibirPersonalizacoes();

    //evita o envio padrão do formulário
    document.querySelector('#formularioPersonalizacao').onsubmit = enviarParaWhatsApp;

    fecharFormulario();
}
//função para as personalizações aparecerem na tela
function exibirPersonalizacoes() {
    const lista = document.getElementById('listaPersonalizacoes');
    lista.innerHTML = '';

    const personalizacoes = JSON.parse(localStorage.getItem('personalizacoes')) || [];
    personalizacoes.forEach((personalizacao, index) => {
        const item = document.createElement('li');
        item.className = 'personalizacao';

        const nome = document.createElement('div');
        nome.className = 'nome';
        nome.textContent = `Nome: ${personalizacao.nome}`;

        const descricao = document.createElement('div');
        descricao.className = 'descricao';
        descricao.textContent = `Descrição: ${personalizacao.descricao}`;

        const telefone = document.createElement('div');
        telefone.className = 'telefone';
        telefone.textContent = `Telefone: ${personalizacao.telefone}`;

        const botoes = document.createElement('div');
        botoes.className = 'botoes';

        const botaoEditar = document.createElement('button');
        botaoEditar.textContent = 'Editar';
        botaoEditar.onclick = () => editarPersonalizacao(index);
        botoes.appendChild(botaoEditar);

        const botaoExcluir = document.createElement('button');
        botaoExcluir.textContent = 'Excluir';
        botaoExcluir.onclick = () => excluirPersonalizacao(index);
        botoes.appendChild(botaoExcluir);

        item.appendChild(nome);
        item.appendChild(descricao);
        item.appendChild(telefone);
        item.appendChild(botoes);

        lista.appendChild(item);
    });
}
//função para editar as personalizações
function editarPersonalizacao(index) {
    const personalizacoes = JSON.parse(localStorage.getItem('personalizacoes')) || [];
    const personalizacao = personalizacoes[index];

    document.getElementById('nome').value = personalizacao.nome;
    document.getElementById('descricao').value = personalizacao.descricao;
    document.getElementById('telefone').value = personalizacao.telefone;

    document.querySelector('#formularioPersonalizacao').onsubmit = (event) => {
        event.preventDefault();
        atualizarPersonalizacao(index);
    };

    abrirFormulario();
}

function atualizarPersonalizacao(index) {
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const telefone = document.getElementById('telefone').value;

    if (!validarTelefone(telefone)) {
        alert("Por favor, insira um número de telefone válido.");
        return;
    }

    const personalizacoes = JSON.parse(localStorage.getItem('personalizacoes')) || [];
    personalizacoes[index] = { nome, descricao, telefone };
    localStorage.setItem('personalizacoes', JSON.stringify(personalizacoes));

    exibirPersonalizacoes();
    fecharFormulario();

     //evita o envio padrão do formulário
    document.querySelector('#formularioPersonalizacao').onsubmit = enviarParaWhatsApp;
}

//função para excluir as personalizações
function excluirPersonalizacao(index) {
    const personalizacoes = JSON.parse(localStorage.getItem('personalizacoes')) || [];
    personalizacoes.splice(index, 1);
    localStorage.setItem('personalizacoes', JSON.stringify(personalizacoes));

    exibirPersonalizacoes();
}

function abrirFormulario() {
    document.getElementById('formularioPersonalizacao').style.display = 'block';
}

function fecharFormulario() {
    document.getElementById('formularioPersonalizacao').style.display = 'none';
}

function mostrarCategoria(categoria) {
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
        if (categoria === 'todos' || item.classList.contains(categoria)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}
// verifica se o telefone está nos padrões do Brasil
function validarTelefone(telefone) {
    const regex = /^[1-9]{2}[0-9]{8,9}$/; 
    return regex.test(telefone);
}

window.onload = function() {
    exibirPersonalizacoes();
    mostrarCategoria('todos');
};
