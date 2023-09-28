//board
var blockSize=25;
var row= 20;
var cols = 20;
var board;
var context;//drawing object



//snake head
var snakeX=blockSize * 5; //fill x5 and y5 location
var snakeY=blockSize * 5; //fill y box to make snake by * 5 

//speed to snake
var velocityX=0;
var velocityY=0;

var snakeBody=[];//array hold x y segment


//food
var foodX;//auto place by random food function
var foodY;

//game over
var gameOver=false;

window.onload= function(){
    board = document.getElementById("board"); 
    board.height = row * blockSize;//500=20*25
    board.width = cols * blockSize;//500=20*25
    context = board.getContext("2d");//used of drawing on board //context2d..>>tell js drawing would be in 2d 
    placeFood(); 
    document.addEventListener("keyup",changeDirection);
    //update();
    setInterval(update,1000/10);//1sec=1000 milliseconds / 10 ......  run 10 time per sec
}
function update(){
    if (gameOver) {
        return;
    }
    context.fillStyle="black";//color balck filled
    context.fillRect(0,0,board.width,board.height);//fill whole tiny box widht and height 


    //fill food 
    context.fillStyle="red";//food color
    context.fillRect(foodX,foodY,blockSize,blockSize);

    //snake eatfood
    if(snakeX===foodX && snakeY===foodY){
        snakeBody.push([foodX, foodY])//add food to snake body
        placeFood();//if snack touch food then this function again generate foood randomly
    }


    //linnk head to body after eat food
    for(let i=snakeBody.length-1; i>0; i--){
        snakeBody[i]=snakeBody[i-1];
    }
    if(snakeBody.length){//set movement to sanke L shape
        snakeBody[0]= [snakeX, snakeY];

    }

    //fill snake
    context.fillStyle="lime";//snake color
    snakeX +=velocityX*blockSize;//move by 1block
    snakeY +=velocityY*blockSize;//move by a block 
    context.fillRect(snakeX,snakeY,blockSize,blockSize);//fill x y fit to box size
    
    for(let i=0; i<snakeBody.length; i++){
        context.fillRect(snakeBody[i][0],snakeBody[i][1],blockSize, blockSize);//push food  on snake body
    }


        //game over condition
        //out of box
        if(snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY >row*blockSize){
            gameOver=true;
            alert("GAME OVER (ctrl+r)");
        }
        
        //bite his own body
        for(let i=0; i<snakeBody.length [i-1]; i++){
            if(snakeX==snakeBody[i][0] && snakeY==snakeBody[i][1]){//bite it body
                alert("Game Over");
            }
        }
}
//setting up key direction
function changeDirection(e){//key event
    if(e.code=="ArrowUp" && velocityY !=1){//KeyboardEvent: e.code property
        velocityX= 0;
        velocityY= -1;
    }
    else if(e.code=="ArrowDown" && velocityY !=-1){//KeyboardEvent: e.code property
        velocityX= 0;
        velocityY= 1;
    }
    else if(e.code=="ArrowLeft" && velocityX != 1){//KeyboardEvent: e.code property
        velocityX= -1;
        velocityY= 0;
    }
    else if(e.code=="ArrowRight" && velocityX != -1){//KeyboardEvent: e.code property
        velocityX= 1;
        velocityY= 0;
    }

}


//randow food generate
function placeFood(){
    //0-1* col-> ( 0-19)-.0-19=25
    foodX=Math.floor(Math.random() * cols) * blockSize;//random number inside the block size
    foodY=Math.floor(Math.random() * row) * blockSize;//same for row

}