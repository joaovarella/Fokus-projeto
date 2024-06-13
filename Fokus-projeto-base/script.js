const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');

//Nós estamos criando um evento ao clicar através do 'click' é passado uma arrow function que não tem parametro para funcionar, porem ele altera o atributo data-contexto para foco ou descanso-curto para que seja trocado a cor da pagina.
focoBt.addEventListener('click', () => {
    alterarContexto('foco');
})

curtoBt.addEventListener('click', () => {
    alterarContexto('descanso-curto');
})

longoBt.addEventListener('click', () => {
    alterarContexto('descanso-longo');
})

function alterarContexto(contexto){
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