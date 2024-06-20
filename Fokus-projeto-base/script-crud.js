const formularioTarefa = document.querySelector('.app__form-add-task');
const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const textArea = document.querySelector('.app__form-textarea');
const ulTarefas = document.querySelector('.app__section-task-list');
const btCancelar = document.querySelector('.app__form-footer__button--cancel');
const paragrafoDescricaoTarefa = document.querySelector('.app__section-active-task-description');


const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
let tarefaSelecionado = null;
let liTarefaSelecionado = null;

function atualizarDescricao(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}

function criarElementoTarefa(tarefa) {
    const li = document.createElement('li')
    li.classList.add('app__section-task-list-item')

    const svg = document.createElement('svg')
    svg.innerHTML = `
        <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
        </svg>
        `

    const paragrafo = document.createElement('p')
    paragrafo.classList.add('app__section-task-list-item-description')
    paragrafo.textContent = tarefa.descricao


    const botao = document.createElement('button')
    botao.classList.add('app_button-edit')

    botao.onclick = () => {
        const novaDescricao = prompt("Insira uma nova descrição");
        if(novaDescricao){
            paragrafo.textContent = novaDescricao;
            tarefa.descricao = novaDescricao;
            atualizarDescricao();
        }
    }

    const imagem = document.createElement('img')
    imagem.setAttribute('src', 'imagens/edit.png')
    botao.append(imagem)

    li.append(svg)
    li.append(paragrafo)
    li.append(botao)

    li.onclick = () => {
        document.querySelectorAll('.app__section-task-list-item-active')
            .forEach(elemento => {
                elemento.classList.remove('app__section-task-list-item-active')
        })
        if (tarefaSelecionado == tarefa) {
            paragrafoDescricaoTarefa.textContent = ''
            tarefaSelecionado = null
            liTarefaSelecionado = null
            return
        }
        tarefaSelecionado = tarefa;
        liTarefaSelecionado = li;
        paragrafoDescricaoTarefa.textContent = tarefa.descricao;
        li.classList.add('app__section-task-list-item-active');

            
    }

    return li

}

btnAdicionarTarefa.addEventListener('click', () => {
    formularioTarefa.classList.toggle('hidden');
})

btCancelar.addEventListener('click', () =>{
    textArea.value = '';
    formularioTarefa.classList.add('hidden')
})

formularioTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textArea.value
    }
    tarefas.push(tarefa);
    formularioTarefa.classList.add('hidden')
    inserirTarefasNaLista(tarefa)
    atualizarDescricao(tarefa)
})

tarefas.forEach(tarefa => {
    inserirTarefasNaLista(tarefa)
});

function inserirTarefasNaLista(tarefa){
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa)
    textArea.value = ''
}

document.addEventListener('FocoFinalizado', () => {
    if(tarefaSelecionado && liTarefaSelecionado){
        liTarefaSelecionado.classList.remove('app__section-task-list-item-active');
        liTarefaSelecionado.classList.add('app__section-task-list-item-complete');
        liTarefaSelecionado.querySelector('button').setAttribute('disabled', 'disabled');
        // liTarefaSelecionado.querySelector('button').setAttribute("style","display:none;");
    }
})