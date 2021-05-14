class Easy{
    randint = (min,max) => Math.floor(Math.random() * (max-min+1)) + min
    play(game){
        let jbot = this.randint(0,8)
        if(game.status[jbot]==''){
            return jbot
        }else{
            this.play(game)
        }
    }
}

export default Easy