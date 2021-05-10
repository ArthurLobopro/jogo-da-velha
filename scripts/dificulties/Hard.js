import Normal from "./Normal.js"

class Hard extends Normal {
    verticalPlay(game){
        const { status: sts } = game
        for(let i of this.range(0,3)){
            if(sts[i] !== "x" && sts[i+3] !== "x" && sts[i+6] !== "x"){

                if(sts[i] === sts[i+3] && sts[i+6] === "o" ) return i
 
                if(sts[i] === sts[i+6] && sts[i+3] === "o" ) return i+6

                if(sts[i+6] === sts[i+3] && sts[i] === "o" ) return i+6
            }
            
        }
        return ''
    }
    horizontalPlay(game){
        const { status: sts } = game
        for(let i of this.range(0,7,3)){
            if(sts[i] !== "x" && sts[i+1] !== "x" && sts[i+6] !== "x"){
                
            }
        }
    }

    play(game){
        let jbot = ''
        //Verifica se dá pra ganhar
        jbot = this.verticalWin('o',game)
        jbot = (jbot === '') ? this.horizontalWin('o',game) : jbot
        jbot = (jbot === '') ? this.diagonalWin('o',game) : jbot
        //Verifica se dá para evitar a derrota
        jbot = (jbot === '') ? this.verticalWin('x',game) : jbot
        jbot = (jbot === '') ? this.diagonalWin('x',game) : jbot
        jbot = (jbot === '') ? this.horizontalWin('x',game) : jbot
        console.log(`Main: ${jbot}`);
        jbot = (jbot === '') ? this.verticalPlay(game) : jbot
        console.log(`new: ${jbot}`);
        jbot = (jbot === '') ? this.randint(0,8) : jbot
        console.log(`Final: ${jbot}`);
        //return jbot
        if(game.status[jbot] === ''){
            return jbot
        }else{
            this.play(game)
        }
    }
}

export default Hard