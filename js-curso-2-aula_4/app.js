let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

/* ----- FUNÇÃO DE FALA (WEB SPEECH API) ----- */
function falar(texto) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = texto;
    msg.lang = "pt-BR";
    msg.rate = 1.2;
    msg.pitch = 1;
    speechSynthesis.cancel(); 
    speechSynthesis.speak(msg);
}

/* ----- FUNÇÃO QUE EXIBE TEXTO NA TELA E (OPCIONAL) FALA ----- */
function exibirTextoNaTela(tag, texto, falarTexto = false) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    if (falarTexto) {
        falar(texto);
    }
}

/* ----- MENSAGEM INICIAL ----- */
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

exibirMensagemInicial();

/* ----- VERIFICAR CHUTE ----- */
function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!', true);
        
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;

        exibirTextoNaTela('p', mensagemTentativas, true);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor', true);
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior', true);
        }
        tentativas++;
        limparCampo();
    }
}

/* ----- GERAR NÚMERO ALEATÓRIO SEM REPETIÇÃO ----- */
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

/* ----- LIMPAR CAMPO ----- */
function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

/* ----- REINICIAR JOGO ----- */
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    falar("Novo jogo iniciado! Escolha um número.");
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
