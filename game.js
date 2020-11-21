function loadGame() {
    let canvas = document.getElementById("gameCanvas")

    let context = canvas.getContext("2d")

        //defining the player
    let player = {
        height: 32,
        width: 32,
        isJumping: false,
        x:0,
        y:0,
        velocityX:0,
        velocityY:0
    }

    //controller logic
    let controller = {
        left:false,
        right:false,
        up:false,
        listener: function (event){
            console.log("fxdjnffijg")
            let keyState 
            if(event.type === "keydown"){
                keyState = true
            }else{
                keyState = false
            }

            console.log(keyState)

            // left arrow detect
            if(event.keyCode === 37) {
                controller.left = keyState
            }else if (event.keyCode === 38){
                controller.up = keyState
            }else if(event.keyCode === 39){
                console.log("right")
                controller.right = keyState
            }
        }
    }

    function loop(){
        if(controller.up&&!player.isJumping){
            player.isJumping=true
            player.velocityY-=20
        }
        if(controller.left){
            player.velocityX-=0.5
        }
        if(controller.right){
            console.log(player.velocityX)
            player.velocityX+=0.5
        }

        player.velocityY+=1.5
        player.x+=player.velocityX
        player.y+=player.velocityY
        player.velocityX*=0.9
        player.velocityY*=0.9

        if(player.y>338){
            player.isJumping=false
            player.y=338
            player.velocityY=0
        }
        if(player.x<-20){
            player.x=1220
        }else if(player.x>1220){
            player.x=-20
        }

        // Creates the backdrop for each frame  
    context.fillStyle = "#201A23";  
    context.fillRect(0, 0, 1220, 400); // x, y, width, height
    // Creates and fills the cube for each frame  
    context.fillStyle = "#8DAA9D"; // hex for cube color 
    context.beginPath();  
    context.rect(player.x, player.y, player.width, player.height);  
    context.fill();
    // Creates the "ground" for each frame  
    context.strokeStyle = "#2E2532";  
    context.lineWidth = 30;  
    context.beginPath();  
    context.moveTo(0, 385);  
    context.lineTo(1220, 385);  
    context.stroke();

    window.requestAnimationFrame(loop)
    }

    window.addEventListener("keydown", controller.listener)
    window.addEventListener("keyup", controller.listener)
    window.requestAnimationFrame(loop)

}
