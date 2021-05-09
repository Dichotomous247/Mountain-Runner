function loadGame() {
    let canvas = document.getElementById("gameCanvas")

    let context = canvas.getContext("2d")

    let frameCount = 1

    let obstacleCoordinates = []

    document.getElementById("score").innerHTML = 'Level: 0'


    function nextFrame(){
        
        if(obstacleCoordinates.length===10){
            window.location.href = "game_won.html";
        }
        frameCount+=1

        let increment = 1;
        let whileLoopMaxIterations = 0;
        while(true){
            let objectCoord=Math.floor(Math.random()*(1165-140+1)+140)
    
           let isValidPosition = true
    
            for(let i=0; i<obstacleCoordinates.length; i++){
                if(objectCoord === obstacleCoordinates[i] ||
                    (objectCoord<obstacleCoordinates[i]&&objectCoord-obstacleCoordinates[i]>-100)||
                    (objectCoord>obstacleCoordinates[i]&&objectCoord-obstacleCoordinates[i]<100)){
                    isValidPosition=false
                }
            }

            if(isValidPosition){
                whileLoopMaxIterations = 0;
                increment++;
                obstacleCoordinates.push(objectCoord)
                document.getElementById("score").innerHTML = `Level: ${obstacleCoordinates.length}`
                break
            }

            if (increment === 10 || whileLoopMaxIterations === 50000) {
                window.location.href = "game_won.html";
                break
            }

            whileLoopMaxIterations++;
        }
    }

    //defining the players
    let player = {
        height: 32,
        width: 32,
        isJumping: false,
        x:0,
        y:0,
        velocityX:0,
        velocityY:0,
        bullet:{
            x:player.x,
            y:player.y
        }
    }

    let player2 = {
        height: 32,
        width: 32,
        isJumping: false,
        x:1220-32,
        y:338,
        velocityX:0,
        velocityY:0,
        bullet:{
            x:player2.x,
            y:player2.y
        }
    }

    //controller logic
    let controller = {
        left:false,
        right:false,
        up:false,
        listener: function (event){
            let keyState 
            if(event.type === "keydown"){
                keyState = true
            }else{
                keyState = false
            }

            // left arrow detect
            if(event.keyCode === 65) {
                controller.left = keyState
            }else if (event.keyCode === 87){
                controller.up = keyState
            }else if(event.keyCode === 68){
                controller.right = keyState
            }
        }
    }

    let controller2 = {
        left:false,
        right:false,
        up:false,
        listener: function (event){
            let keyState 
            if(event.type === "keydown"){
                keyState = true
            }else{
                keyState = false
            }

            // left arrow detect
            if(event.keyCode === 37) {
                controller2.left = keyState
            }else if (event.keyCode === 38){
                controller2.up = keyState
            }else if(event.keyCode === 39){
                controller2.right = keyState
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
            player.velocityX+=0.5
        }

        player.velocityY+=1.5
        player.x+=player.velocityX
        player.y+=player.velocityY
        player.velocityX*=0.9
        player.velocityY*=0.9

        if(controller2.up&&!player2.isJumping){
            player2.isJumping=true
            player2.velocityY-=20
        }
        if(controller2.left){
            player2.velocityX-=0.5
        }
        if(controller2.right){
            player2.velocityX+=0.5
        }

        player2.velocityY+=1.5
        player2.x+=player2.velocityX
        player2.y+=player2.velocityY
        player2.velocityX*=0.9
        player2.velocityY*=0.9

        console.log(player.y)
        console.log(player2.y)

        if(player.y>338){
            player.isJumping=false
            player.y=338
            player.velocityY=0
        }

        if(player2.y>338){
            player2.isJumping=false
            player2.y=338
            player2.velocityY=0
        }

        if(player.x<0){
            player.x=0
        }else if(player.x>1220-32){
            player.x=1220-32
            // nextFrame();

        }

        // Creates the backdrop for each frame  
        context.fillStyle = "#201A23";  
        context.fillRect(0, 0, 1220, 400); // x, y, width, height

        // Creates and fills the cube for each frame  
        console.log(player)
        console.log(player2)

        context.fillStyle = "#8DAA9D"; // hex for cube color 
        context.beginPath();  
        context.rect(player.x, player.y, player.width, player.height);  
        context.fill();

        context.fillStyle = "red"; // hex for cube color 
        context.beginPath();  
        context.rect(player2.x, player2.y, player2.width, player2.height);  
        context.fill();        

        let triangleHeight = 200*Math.cos(Math.PI/6)

        context.fillStyle = "fbf5f3"
        for(let i=0; i<obstacleCoordinates.length; i++){

        let currentLocation = obstacleCoordinates[i]

        if (
            player.isJumping &&
            player.y > 310 &&
            player.x + 32 >= currentLocation + 10 && player.x <= currentLocation + 10
        ) {
            window.location.href = 'game_over.html'
        }

        // only care about x collision on ground
        if(
            !player.isJumping &&
            ((player.x + 28 >= currentLocation && player.x < currentLocation) ||
            (player.x + 28 > currentLocation + 20 && player.x <= currentLocation + 20))
        ) {
            window.location.href = "game_over.html";
        }

        context.beginPath();
        context.moveTo(currentLocation, 385);
        context.lineTo(currentLocation+20, 385);
        context.lineTo(currentLocation+10, 510-triangleHeight)
        context.closePath();
        context.fill();
    }

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
    window.addEventListener("keydown", controller2.listener)
    window.addEventListener("keyup", controller2.listener)
    window.requestAnimationFrame(loop)

}
 function playAgain(){
     window.location.href = "index.html"
 }
