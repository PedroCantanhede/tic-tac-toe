// Selecionando elementos obrigatórios
const selectBox = document.querySelector(".select-box"),
selectXBtn = selectBox.querySelector(".playerX"),
selectOBtn = selectBox.querySelector(".playerO"),
playBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text");
replayBtn = resultBox.querySelector("button");

window.onload = () => {
    for (let i = 0; i < allBox.length; i++) { // Adiciona o atributo onclick em todas as seções com spans disponíveis
        allBox[i].setAttribute("onclick", "clickedBox(this)");
    }

    selectXBtn.onclick = () => {
        selectBox.classList.add("hide"); // Oculta a caixa de seleção (select-box) quando o botão "Jogador (X)" é clicado
        playBoard.classList.add("show"); // Mostra o tabuleiro (playboard) quando o botão "Jogador (X)" é clicado
    }
    selectOBtn.onclick = () => {
        selectBox.classList.add("hide"); // Oculta a caixa de seleção (select-box) quando o botão "Jogador (O)" é clicado
        playBoard.classList.add("show"); // Mostra o tabuleiro (playboard) quando o botão "Jogador (O)" é clicado
        players.setAttribute("class", "players active player"); // Adicionando três nomes de classe no elemento player
    }
}

let playerXIcon = "fas fa-times"; // Classe do ícone do Font Awesome
let playerOIcon = "fas fa-dot-circle"; // Classe do ícone do Font Awesome
let playerSign = "X"; // Supondo que o jogador seja X
let runBot = true; // 

function clickedBox(element) {
    // console.log(element);

    // Se o elemento conter a classe .player, então...
    if(players.classList.contains("player")) {
        element.innerHTML = `<i class="${playerOIcon}"></i>`; // Adiciona a tag de ícone círculo (O) dentro do elemento clicado
        players.classList.add("active");
        // Se o jogador selecionar O, alteraremos o valor do playerSign para O
        playerSign = "O";
        element.setAttribute("id", playerSign);
    } else { // Se não
        element.innerHTML = `<i class="${playerXIcon}"></i>`; // Adiciona a tag de ícone cruzado (X) dentro do elemento clicado
        players.classList.add("active");
        element.setAttribute("id", playerSign);
    }
    selectWinner(); // Chamando a função selectWinner | Selecionando Vencedor
    playBoard.style.pointerEvents = "none"; // Uma que o usuário selecionar, ele não poderá selecionar nenhuma outra caixa até que a box seja selecionada
    element.style.pointerEvents = "none"; // Uma vez que o usuário selecione qualquer box, essa box não poderá ser selecionada novamente
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); // Gera um atraso de tempo aleatório para que o bot atrase aleatoriamente para selecionar a box
    setTimeout(() => {
        bot(runBot); // Chamando a função do bot
    }, randomDelayTime); // Passando o tempo de atraso aleatório
}

// Bot PVE
function bot(runBot) {
    if(runBot) { // se runBot for verdadeiro, execute os seguintes códigos...
        // Primeiro mude o playerSign, então se o usuário tiver o valor X no id, o bot terá O
    playerSign = "O";
    let array = []; // Criando um array vazio. Armazenando o índice da box não selecionado neste array
    for (let i = 0; i < allBox.length; i++) {
        // Se span não tiver nenhum elemento filho...
        if(allBox[i].childElementCount == 0) {
            array.push(i); // Inserir boxes não clicadas ou não selecionadas dentro do array, span não tem filhos
            // console.log(i + " " + "não tem filhos");
        }
    }
    let randomBox = array[Math.floor(Math.random() * array.length)]; // Obtém o índice aleatório do array para que o bot selecione a box aleatória não selecionada até o momento
    if(array.length > 0) {
        if(players.classList.contains("player")) {
            allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; // Adiciona a tag de ícone cruzado (X) dentro do elemento clicado
            players.classList.remove("active");
            // Se o usuário for O, então o valor do id da box será X
            playerSign = "X";
            allBox[randomBox].setAttribute("id", playerSign);
        } else { // Se não
            allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; // Adiciona a tag de ícone círculo (O) dentro do elemento clicado 
            players.classList.remove("active");
            allBox[randomBox].setAttribute("id", playerSign);
        }
        selectWinner(); // Chamando a função selectWinner | Selecionando Vencedor
    }
    allBox[randomBox].style.pointerEvents = "none"; // Uma vez que o bot seleciona qualquer box, o usuário não pode selecionar ou clicar nessa box
    playBoard.style.pointerEvents = "auto"; 
    playerSign = "X"; // Passando o valor X
    }
}

// Selecionando o Vencedor
function getId(idname) { 
    return document.querySelector(".box" + idname).id; // Retorna o nome do id
} 

// Verificando nomes dos id's
function checkThreeIds(val1, val2, val3, sign) {
    if(getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
        return true;
    }
}

// Checando os três ids que formam o vencedor 
function selectWinner() { // Se uma combinação deles corresponder, selecione o vencedor
    if(checkThreeIds(1, 2, 3, playerSign) || checkThreeIds(4, 5, 6, playerSign) || checkThreeIds(7, 8, 9, playerSign) || checkThreeIds(1, 4, 7, playerSign) || checkThreeIds(2, 5, 8, playerSign) || checkThreeIds(3, 6, 9, playerSign) || checkThreeIds(1, 5, 9, playerSign) || checkThreeIds(3, 5, 7, playerSign)) {
        console.log(playerSign + " " + "is the winner");
        // Uma vez que a partida foi vencida por alguém, então pare o bot
        runBot = false;
        bot(runBot);
        setTimeout(()=> { // Delay na exibição da result box (Caixa com o Vencedor)
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700); // Delay de 700ms | 700 milesegundos

        // Exibindo a box com o resultado
        wonText.innerHTML = `O Jogador <span>${playerSign}</span> ganhou!`;
    }
}