let canvas = document.getElementById("gameCanvas")
let context = canvas.getContext("2d")

let player = {
    height: 32,
    width: 32,
    isJumping: false,
    x:0,
    y:0,
    velocityX:0,
    velocityY:0
}

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
        if(event.keyCode === 37) {
            controller.left = keyState
        }else if (event.keyCode === 38){
            controller.up = keyState
        }else if(event.keyCode === 39){
            controller.right = keyState
        }
    }
}
