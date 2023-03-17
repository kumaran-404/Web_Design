
document.addEventListener("DOMContentLoaded", () => {
    new Snake()
})

const config = {
    deltaX: 3,
    deltaY: 3,
    intervalTime: 40,
    snakeColor: "yellow",
    ballColor: "#FF00BF",
}

class Snake {

    constructor() {
        this.x = 5 
        this.y = 5
        this.height = 10   
        this.width = 5
        this.currHeight =  this.height 
        this.currWidth = this.width
        this.prevHeight = this.height
        this.prevWidth = this.width
        this.direction = "right"   // left , right , top , bottom 
        this.canvas = document.getElementById("box")
        this.ctx = this.canvas.getContext("2d")
        this.func = setInterval(this.moveSnake, config.intervalTime)  // moving snake continuously 
        this.ctx.fillRect(this.x, this.y, this.height, this.width) //draw intial snake
        document.addEventListener("keyup", this.keyListener)
        this.createBall()
    }

    keyListener = (e) => {
    
        this.prevHeight = this.currHeight
        this.prevWidth = this.currWidth
    
        switch (e.code) {
            
                    case "ArrowUp": {
                        this.direction = "up"
                        this.currHeight = this.width 
                        this.currWidth = this.height   
                    }
                        break;
                    case "ArrowDown": {
                        this.direction = "down"
                        this.currHeight = this.width 
                        this.currWidth = this.height 
                    }
                        break;
                    case "ArrowLeft": {
                        this.direction = "left"
                        this.currHeight = this.height
                        this.currWidth = this.width 
                    }
                        break;
                    case "ArrowRight": {            
                        this.direction = "right"
                        this.currHeight = this.height 
                        this.currWidth = this.width 
                    }
            
                }
    
    }

    createBall() {
        this.ctx.clearRect(this.ballX,this.ballY,100,100)
    
        this.ballX =  Math.random() * (this.canvas.width-1)
        this.ballY = Math.random() * (this.canvas.height - 1)
        
        this.ctx.fillStyle = "#FF00BF";
      
        this.ctx.fillRect(this.ballX, this.ballY, 7, 5)
    }

    resetGame = () => {

        this.ctx.clearRect(this.x, this.y, this.prevHeight, this.prevWidth)
        this.ctx.clearRect(this.ballX,this.ballY,100,100)
        //display game-over for few seconds 

        var points = document.getElementById("points")
        points.innerHTML = "0"

        var style = document.getElementById("game-over").style
        
        clearInterval(this.func) 

        style.opacity = 1
        
        setInterval(()=>{
            style.opacity = 0 
        }, 2000)
        
        this.prototype = new Snake()
    }

    updateScore = () => {
        // render current score 
        var score = document.getElementById("points")
        console.log("hi")
        score.innerHTML = parseInt(score.innerHTML) + 1
        this.height+=5
        this.createBall()
    }

    moveSnake = () => {

        this.ctx.clearRect(this.x, this.y, this.prevHeight, this.prevWidth)

        switch (this.direction){
            case "up": {
                this.y-= config.deltaY 
            }
                break;
            case "down": {
                this.y += config.deltaY
            }
                break;
            case "left": {
                this.x -= config.deltaX
            }
                break;
            case "right": {
                this.x+= config.deltaX
            }
        }

        // next level 
        if ((this.x >= this.ballX - 5 && this.x <= this.ballX + 5) && (this.y >= this.ballY - 5 && this.y <= this.ballY + 5)) this.updateScore()
        

        this.ctx.fillStyle = config.snakeColor 

        this.ctx.fillRect(this.x, this.y, this.currHeight ,  this.currWidth )
    
        this.prevHeight = this.currHeight
        this.prevWidth = this.currWidth

        //game-over 
        if (this.x < 0 || this.y < 0 || this.x > this.canvas.width || this.y > this.canvas.height) {
            this.resetGame();
        }

    }

   
}


