let contador = 0;
const tarefas = [
    { titulo: "Adicione uma tarefa no botão acima ☝️", status: "progresso" },
    { titulo: "Passe o mouse na tarefa para ver o botão excluir 🗑️", status: "progresso" },
    { titulo: "Clique na tarefa para marca-la como feita ✔️", status: "progresso" }

];

function atualizarTarefas() {
    const ul = document.querySelector("ul");
    ul.innerHTML = "";
    contador = 0;

    for (let index = 0; index < tarefas.length; index++) {
        let elementoTarefa = `
            <li class="${tarefas[index].status === "finalizada" ? "finalizada" : ""}">
                <div class="btn-delete" onclick="removerTarefa(this)"> 
                    <ion-icon name="trash-outline"></ion-icon>
                </div>
                <span onclick="finalizarTarefa(this)">${tarefas[index].titulo}</span> 
            </li>
        `;

        ul.innerHTML += elementoTarefa;
        if (tarefas[index].status !== "finalizada") contador++;
    }
    atualizarContador();
}


atualizarTarefas();

function removerTarefa(elemento) {
    const li = elemento.parentNode; 
    const index = [...li.parentNode.children].indexOf(li); 

    tarefas.splice(index, 1); 
    atualizarTarefas(); 
}

function adicionarNovaTarefa() {
    const novaTarefa = document.querySelector("input").value.trim(); 
    if (novaTarefa === "") return; // Evita adicionar tarefas vazias

    tarefas.push({ titulo: novaTarefa, status: "progresso" }); // Adiciona corretamente um objeto
    atualizarTarefas();
    document.querySelector("input").value = "";
}


function finalizarTarefa(elemento) {
    const li = elemento.parentNode; 

    const estaFinalizada = li.classList.contains("finalizada");
    if (estaFinalizada === true) {
        contador++;
    } else {
        contador--;
    }

    li.classList.toggle("finalizada"); 
    atualizarContador();

}

function finalizarTodas() {
    const tarefas = document.querySelectorAll("li"); 
    let todasFinalizadas = true; 

    //  Verifica se todas as tarefas já estão finalizadas
    for (let i = 0; i < tarefas.length; i++) {
        if (!tarefas[i].classList.contains("finalizada")) { 
            todasFinalizadas = false; 
            break; 
        }
    }

    //  Alterna entre finalizar todas ou reativar todas
    for (let i = 0; i < tarefas.length; i++) {
        if (todasFinalizadas) { 
            tarefas[i].classList.remove("finalizada"); 
        } else {
            tarefas[i].classList.add("finalizada"); 
        }
    }

    //  Atualiza o contador
    contador = todasFinalizadas ? tarefas.length : 0;
    atualizarContador();
}


function atualizarContador() {
    const elementoContador = document.querySelector("h1");
    elementoContador.innerHTML = `TO-DO LIST (${contador})`;
}

