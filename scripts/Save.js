function lerDificuldade(){
    let difficulty = 'normal'
    if(localStorage.difficulty == undefined){
        criarDificuldade('normal')
    }else{
        ( { difficulty } = localStorage )
    }

    return difficulty
}

function criarDificuldade(dificuldade){
    localStorage.difficulty = dificuldade
    lerDificuldade()    
}

function lerPlacar(){
    let data = {player: 0, bot: 0}
    if(localStorage.placar == undefined){
        criaPlacar(data)
    }else{
        data = JSON.parse(localStorage.placar)
    }
    return data
}

function criaPlacar(placar){
    let json = JSON.stringify(placar)
    localStorage.setItem("placar",json)
}

export { criarDificuldade, criaPlacar, lerDificuldade, lerPlacar }