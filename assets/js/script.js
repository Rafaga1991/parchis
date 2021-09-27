var scord = null;
var moveElement = null;
var nextElement = null;
var border = null;
var position = {};// alamcenando la posición de cada ficha.

function onMouseDown(e, element) {
    moveElement = element;
    if (border == null) {
        border = moveElement.style.border;
        moveElement.style.border = "1px solid gray";
    }

    if (position[element.id] == undefined) {
        position[element.id] = { x: e.clientX, y: e.clientY };
    }
}

function onMouseEnter(e, element) {
    nextElement = element;
    console.log(element)
}

function addPosition(X, Y, element) {

    element.style.transform = 'translate3d(' + X + 'px,' + Y + 'px, 0px)';
}

function getRandom(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

let turn = 0;
let cont = 0;
var classess = ['bg-green mouse-move-green', 'bg-yellow mouse-move-yellow', 'bg-blue mouse-move-blue', 'bg-red mouse-move-red'];
var bgClass = ['bg-green', 'bg-yellow', 'bg-blue', 'bg-red'];
function trhowDice(){
    let dice1 = getRandom(1, 7);
    let dice2 = getRandom(1, 7);
    document.getElementById('dice-one').innerHTML = dice1;
    document.getElementById('dice-two').innerHTML = dice2;
    var element = document.getElementsByClassName('dice');
    for(var index in element){
        element[index].className = 'dice ' + bgClass[(turn == -1 ? 3 : turn)];
    }

    // Agregando jugadas al tablero
    element = document.getElementsByClassName('board-body')[0];
    var div = document.createElement('div');
    var text = document.createTextNode(`- Jugada #${++cont}: Dado #1: ${dice1}, Dado #2: ${dice2}`);
    div.className = bgClass[(turn == -1 ? 3 : turn)];
    div.appendChild(text);
    element.appendChild(div);
    element.scrollTop = element.scrollHeight;// mantiene el scroll abajo
    // fin de agregar jugadas
    if(dice1 == dice2){
        if(dice2 != 6){
            document.getElementById('btn-trhow-dice').className = classess[++turn];
        }
    }else{
        document.getElementById('btn-trhow-dice').className = classess[++turn];
    }
    turn = turn == 3 ? -1 : turn;
}

window.addEventListener('mouseup', (e) => {
    if (moveElement != null) {
        moveElement.style.border = border;
        border = null;
        // alert(moveElement.id + ' - x:' + e.clientX + ' - y:' + e.clientY);
        moveElement = null;
        nextElement = null;
    }
})

window.addEventListener('mousemove', (e) => {
    if (moveElement != null) {
        let posY = e.clientY - moveElement.offsetHeight/2;
        let posX = e.clientX - moveElement.offsetWidth/2;
        moveElement.style.transform = 'translate3d(' + posX + 'px,' + posY + 'px, 0px)';
        // console.log(moveElement.id, 'x', e.clientX, 'y', e.clientY)
    }
})

window.onload = ()=>{
    [
        {id: 'y1', x: 430, y: 70}, {id: 'y2', x: 550, y: 70}, {id: 'y3', x: 430, y: 160}, {id: 'y4', x: 550, y: 160},
        {id: 'b1', x: 430, y: 570}, {id: 'b2', x: 550, y: 570}, {id: 'b3', x: 430, y: 660}, {id: 'b4', x: 550, y: 660},
        {id: 'g1', x: 1010, y: 70}, {id: 'g2', x: 1130, y: 70}, {id: 'g3', x: 1010, y: 160}, {id: 'g4', x: 1130, y: 160},
        {id: 'r1', x: 1010, y: 570}, {id: 'r2', x: 1130, y: 570}, {id: 'r3', x: 1010, y: 660}, {id: 'r4', x: 1130, y: 660}
    ].forEach((element)=>{
        addPosition(
            element.x,
            element.y,
            document.getElementById(element.id)
        );
        position[element.id] = {x: 0, y: 0};
        
    })
}