import Easy from "./Easy.js"
class Normal extends Easy{
    range = (min,max,pass=1) => {
        let array = []
        for(let i = min;i<max;i+=pass){
            array.push(i)
        }
        return array
    }
    // "Inteligencia" do bot, faz verificações em todos os angulos
    verticalWin = (str,sts) =>{
        for( let i of this.range(0,3)){
            if(sts[i]== str && sts[i+3] == str && sts[i+6] == '' )  return i+6 
            if(sts[i]== str && sts[i+3] == ''  && sts[i+6] == str)  return i+3 
            if(sts[i]== ''  && sts[i+3] == str && sts[i+6] == str)  return i 
        }
        return null
    }
    horizontalWin = (str,sts) =>{
        for( let i of this.range(0,7,3)){
            if(sts[i] == str && sts[i+1] == str && sts[i+2] == '') return i+2 
            if(sts[i] == str && sts[i+1] == '' && sts[i+2] == str) return i+1 
            if(sts[i] == '' && sts[i+1] == str && sts[i+2] == str) return i 
        }
        return null
    }
    diagonalWin = (str,sts) =>{
        if (sts[0] == str && sts[4] == str && sts[8] == '')  return 8 
        if (sts[0] == str && sts[4] == ''  && sts[8] == str) return 4 
        if (sts[0] == ''  && sts[4] == str && sts[8] == str) return 0 
        if (sts[2] == str && sts[4] == str && sts[6] == '')  return 6 
        if (sts[2] == str && sts[4] == ''  && sts[6] == str) return 4 
        if (sts[2] == ''  && sts[4] == str && sts[6] == str) return 2 
        
        return null
    }
    play(game){
        const { status:sts } = game
        //Verifica se dá pra ganhar
        let jbot =  this.verticalWin('o',sts)
        jbot = jbot ?? this.horizontalWin('o',sts)
        jbot = jbot ?? this.diagonalWin('o',sts)

        //Verifica se dá para evitar a derrota
        jbot = jbot ??  this.verticalWin('x',sts)
        jbot = jbot ?? this.diagonalWin('x',sts)
        jbot = jbot ?? this.horizontalWin('x',sts)
        
        //Caso não há possibilidades nem de ganhar ou evitar a derrota, o bot faz uma jogada aleatória.
        jbot = jbot ?? this.randint(0,8)

        return jbot
    }
}

export default Normal