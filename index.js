import Easy from "./src/dificulties/Easy.js"
import Normal from "./src/dificulties/Normal.js"
import Hard from "./src/dificulties/Hard.js"
import { criaPlacar, criarDificuldade, lerDificuldade, lerPlacar } from "./src/Save.js";
import { placar, draw, drawWinSequence } from "./src/View.js"
import confirm from "./src/browser-functions/confirm.js"
// Variáveis Globais
const get = id => document.getElementById(id)
const game = {
    status: ['','','','','','','','',''],
    placar: {
        player: 0,
        bot: 0
    },
    have_winner: false,
    difficulty: undefined,
    getDifficulty: function ()  {
        if(this.difficulty === 'facil') return new Easy()
        if(this.difficulty === 'dificil') return new Hard()
        return new Normal()
    }
}

const msg = get('msg')

const jogar = event => jogadaPlayer(String(event.target.id)[3])

let bot
// Função do jogo
function jogadaPlayer(player,alerta=true) {
    if(game.status[player-1]==''){
        removeEventAll()
        game.status[player-1]='x'
        draw(player,'x')
        let have_winner = verifica()
        game.have_winner = have_winner
        let disp = false
        for(let i of game.status){
            if(i==''){
                disp=true
                break
            }
        }
        get(`div${player}`).onclick = ""
        if(disp==true && have_winner==false){
            jogadaBot()
            verifica()
        }
       setTimeout(() => {
            if(game.have_winner == false){
                addEventAll()
            }
        }, 4000)
    }else{
        (alerta==true) ? alert('Jogada inválida') : null
    }
}

function jogadaBot() {

    let jbot = bot.play(game)
    if(game.status[jbot] === ''){
        game.status[jbot] = 'o'
        draw(jbot+1,'o')
    }else{
        jogadaBot()
    }
}
// Validação de vitórias.
function verifica() {
    const sts = game.status
    let have_winner = false
    //Verifica se há algum vencedor na horizontal
    for(let i=0;i<7;i+=3){
        if(sts[i] == sts[i+1] && sts[i] == sts[i+2] && (sts[i]!='')){
            win(sts[i],[i+1,i+2,i+3])
            have_winner=true
        }
    }
    for(let i=0;i<3;i++){
        if(sts[i] == sts[i+3] && sts[i] == sts[i+6] && (sts[i]!='')){
            win(sts[i],[i+1,i+4,i+7])
            have_winner=true
        }
    }
    if(sts[0] == sts[4] && sts[0] == sts[8] && (sts[0]!='')){
        win(sts[0],[1,5,9])
        have_winner=true
    }
    if(sts[2] == sts[4] && sts[2] == sts[6] && (sts[2]!='')){
        win(sts[2],[3,5,7])
        have_winner=true
    }
    if(game.status.indexOf('')==-1 && have_winner==false){
        win()
    }
    return have_winner
}

function win(winner='en',sequence){
    if(winner=='x'){
        drawWinSequence({sequence, winner})
        game.placar.player++
        placar(game)
        msg.innerHTML=`Você venceu!<br>`
    }else if(winner=='o'){
        drawWinSequence({sequence, winner})
        game.placar.bot++
        placar(game)
        msg.innerHTML=`Você perdeu!<br>`
    }else if(winner=='en'){
        msg.innerHTML=`Empate!!<br>`
    }
    get('new-game-button').classList.toggle('invisible')
    criaPlacar(game.placar)
    removeEventAll()
}

const newgame= () => {
    for(let i in game.status){
        game.status[i]=''
        document.getElementById(`div${Number(i)+1}`).innerHTML=''
    }
    msg.innerHTML=''
    get('new-game-button').classList.toggle('invisible')
    addEventAll()
}

// Detecção de eventos
const addEventAll = () => {
    for(let i in game.status){
        if (game.status[i]=='') {
            i = Number(i)
            get(`div${i+1}`).onclick = jogar
        }
    }
}
const removeEventAll = () => {
    for(let i in game.status){
        i = Number(i)
        get(`div${i+1}`).onclick = null
    }
}

const body = document.body
body.onload = () =>{
    game.placar = lerPlacar()
    game.difficulty = lerDificuldade()
    addEventAll()
    bot = game.getDifficulty()
    placar(game)
    get(game.difficulty).checked = true
}

const img_config = document.querySelector('.config > img')
img_config.onclick = () => {
    if(!new_game_button.classList.contains('invisible')){ newgame() }
        
    get('game').classList.toggle('invisible')
    get('config').classList.toggle('invisible')
    img_config.classList.toggle('rotated')
}

const difficulty_config = document.querySelectorAll('#config input')
for(let i of difficulty_config){
    i.onclick = event => {
        const value = event.target.value
        criarDificuldade(value)
        game.difficulty = value
        bot = game.getDifficulty()
    }
}

const new_game_button = get("new-game-button")
new_game_button.onclick = newgame
const reset = get("reset")
reset.onclick = async () => {
    if(await confirm({title: "Confirme para continuar", text:"Você realmente deseja resetar o placar?"})){
        game.placar = { player:0, bot: 0}
        criaPlacar(game.placar)
        placar(game)
    }
}