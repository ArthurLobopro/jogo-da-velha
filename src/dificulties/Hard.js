import Normal from "./Normal.js"

const randItem = arr => {
    const randint = (min,max) => Math.floor(Math.random() * (max-min+1)) + min
    return arr[randint(0,arr.length - 1)]
}

class Hard extends Normal {
    verticalPlay(sts){
        for(let i of this.range(0,3)){
            if(sts[i] !== "x" && sts[i+3] !== "x" && sts[i+6] !== "x"){

                if(sts[i] === sts[i+3] && sts[i+6] === "o" ) return randItem([i,i+3])
 
                if(sts[i] === sts[i+6] && sts[i+3] === "o" ) return randItem([i,i+6])

                if(sts[i+6] === sts[i+3] && sts[i] === "o" ) return randItem([i+3,i+6])
               
            }
            
        }
        return null
    }
    horizontalPlay(sts){
        for(let i of this.range(0,7,3)){
            if(sts[i] !== "x" && sts[i+1] !== "x" && sts[i+2] !== "x"){

                if(sts[i] === sts[i+1] && sts[i+2] === "o") return randItem([i,i+1])

                if(sts[i] === sts[i+2] && sts[i+1] === "o") return randItem([i,i+2])

                if(sts[i+1] === sts[i+2] && sts[i] === "o") return randItem([i+1,i+2])

            }
        }
        return null
    }
    diagonalPlay(sts){
        if(sts[0] !== 'x' && sts[4] !== 'x' && sts[8] !== 'x'){
            
            if(sts[0] === sts[4] && sts[8] === 'o') return randItem([0,4])
            if(sts[0] === sts[8] && sts[4] === 'o') return randItem([0,8])
            if(sts[4] === sts[8] && sts[0] === 'o') return randItem([4,8])

        }
        if(sts[2] !== 'x' && sts[4] !== 'x' && sts[6] !== 'x'){
            if(sts[2] === sts[4] && sts[6] === 'o') return randItem([2,4])
            if(sts[2] === sts[6] && sts[4] === 'o') return randItem([2,6])
            if(sts[4] === sts[6] && sts[0] === 'o') return randItem([4,6])
        }
        return null
    }
    play(game){
        const { status: sts } = game
        //Verifica se dá pra ganhar
        let jbot = this.verticalWin('o',sts)
        jbot = jbot ?? this.horizontalWin('o',sts)
        jbot = jbot ?? this.diagonalWin('o',sts)
        //Verifica se dá para evitar a derrota
        jbot = jbot ?? this.verticalWin('x',sts)
        jbot = jbot ?? this.diagonalWin('x',sts)
        jbot = jbot ?? this.horizontalWin('x',sts)
        //Verifica se dá para jogar ao lado de uma jogada existente
        jbot = jbot ?? this.diagonalPlay(sts)
        jbot = jbot ?? this.verticalPlay(sts)
        jbot = jbot ?? this.horizontalPlay(sts)
        //Caso nenhuma tenha retornado, faz uma jogada aleatória
        jbot = jbot ?? this.randint(0,8)

        return jbot
    }
}

export default Hard