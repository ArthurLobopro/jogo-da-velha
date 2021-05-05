const get = id => document.getElementById(id)

const span_player = get('player')
const span_bot = get('bot')

const placar = game => {
    span_player.innerText= game.placar.player
    span_bot.innerText= game.placar.bot
}

const draw = (id,src) => {
    get(`div${id}`).innerHTML=`<img src='assets/${src}.png' class='show${src}'>`
}

const drawWinSequence = ({sequence,winner}) => {
    for(let i of sequence){
        get(`div${i}`).innerHTML=`<img src='assets/red-${winner}.png'>`
    }
}

export { placar, draw, drawWinSequence }