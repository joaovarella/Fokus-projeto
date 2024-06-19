const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const temporizador = document.querySelector('#timer');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iconPlayPause = document.querySelector('.app__card-primary-butto-icon');
const musica = new Audio('sons/luna-rise-part-one.mp3');
const playPause = document.querySelector('#start-pause span');
const playSom = new Audio('sons/play.wav');
const pauseSom = new Audio('sons/pause.mp3');
const beep = new Audio('sons/beep.mp3');
musica.loop = true;

let tempoDecorridoEmMinutos = 25;
let tempoSegundos = 0;
let intervaloId = null;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play()
    }   else{
            musica.pause()
    }
})


//Nós estamos criando um evento ao clicar através do 'click' é passado uma arrow function que não tem parametro para funcionar, porem ele altera o atributo data-contexto para foco ou descanso-curto para que seja trocado a cor da pagina.
focoBt.addEventListener('click', () => {
    tempoDecorridoEmMinutos = 25;
    tempoSegundos = 0;
    alterarContexto('foco');
    focoBt.classList.add('active')
})

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmMinutos = 1;
    tempoSegundos = 0;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click', () => {
    tempoDecorridoEmMinutos = 15;
    tempoSegundos = 0;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active')
})

function alterarContexto(contexto){
    mostrarTempo();
    zerar();
    botoes.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>
                `
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br> 
                <strong class="app__title-strong">Faça uma pausa curta!`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superficie.<br> 
                <strong class="app__title-strong">Faça uma pausa longa.`
        default:
            break;
    }
}

const contagemRegressiva = () => {
    if(tempoDecorridoEmMinutos <= 0 && tempoSegundos <= 0){
        beep.play();
        alert('Tempo finalizado') 
        zerar()
        return
    }
    if (tempoSegundos <= 0) {
        if (tempoDecorridoEmMinutos > 0) {
            tempoDecorridoEmMinutos -= 1;
            tempoSegundos = 59;
        } else {
            tempoSegundos = 0;
        }
    } else {
        tempoSegundos -= 1;
    }
    mostrarTempo();
}

playPause.addEventListener('click', iniciarOuPausar);

function iniciarOuPausar(){
    if(intervaloId){
        pauseSom.play();
        zerar()
        return
    }
    playSom.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    playPause.textContent = "Pausar"
    iconPlayPause.setAttribute('src', `imagens/pause.png`);
}

function zerar(){
    clearInterval(intervaloId);
    playPause.textContent = "Começar"
    iconPlayPause.setAttribute('src', `imagens/play_arrow.png`);
    intervaloId = null;
}

function mostrarTempo() {
    const tempo = new Date(0);
    tempo.setMinutes(tempoDecorridoEmMinutos);
    tempo.setSeconds(tempoSegundos);
    const tempoFormatado = tempo.toLocaleTimeString('pt-BR', {minute: '2-digit', second: '2-digit'});
    temporizador.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();