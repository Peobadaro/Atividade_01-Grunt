// Função para mostrar mensagem
function showMessage(message) {
    console.log('Mensagem:', message);
}

// Função para adicionar classe ao botão
function addButtonClass(button, className) {
    button.classList.add(className);
}

// Evento de clique no botão
document.querySelector('.button').addEventListener('click', function() {
    showMessage('Botão clicado!');
    addButtonClass(this, 'clicked');
}); 