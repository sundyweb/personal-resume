//点击开始游戏--startpage消失--游戏开始
// 随即出现食物，出现三截蛇开始运动
// 上下左右--改变方向运动
//判断是否吃到食物，吃到食物，食物消失，蛇加一
// 判断游戏结束，弹出框

var content = document.getElementById('content');
var startPage = document.getElementById('startPage');
var snakeMove;
var speed =200;
init();
function init(){//初始化
	//地图
	this.mapW = parseInt(getComputedStyle(content).width);
	this.mapH = parseInt(getComputedStyle(content).height);
	this.mapDiv = content;
	//食物
	this.foodW = 20;
	this.foodH = 20;
	this.foodX = 0;
	this.foodY = 0;
	//蛇
	this.snakeW = 20;
	this.snakeH = 20;
	this.snakeBody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];
	//游戏属性
	this.direct = 'right';
	this.left = false;
	this.right = false;
	this.up = true;
	this.down = true;
	startGame();
}
function startGame(){
	food();
	snake();
	snakeMove = setInterval(function(){
		move();
	},speed)
}
function food(){
	var food = document.createElement('div');
	food.style.width = this.foodW + 'px';
	food.style.height = this.foosH + 'px';
	food.style.position = 'absolute';
	this.foodX = Math.floor(Math.random() * (this.mapW / 20));
	this.foodY = Math.floor(Math.random() * (this.mapH / 20));
	food.style.left = this.foodX * 20 +'px';
	food.style.top = this.foodY *20 +'px';
	this.mapDiv.appendChild(food).setAttribute('class','food');
}
function snake(){
	for(var i = 0;i < this.snakeBody.length; i++){
		var snake = document.createElement('div');
		snake.style.width = this.snakeW + "px";
		snake.style.height = this.snakeH + "px";
		snake.style.position = "absolute";
		snake.style.left = this.snakeBody[i][0]*20 +'px';
		snake.style.top = this.snakeBody[i][1]*20 +'px';
		snake.classList.add(this.snakeBody[i][2]);
		this.mapDiv.appendChild(snake).classList.add('snake');
		switch(this.direct){
			case 'right':
			break;
			case 'up':
			snake.style.transform = 'rotate(270deg)';
			break;
			case 'left':
			snake.style.transform = 'rotate(180deg)';
			break;
			case 'down':
			snake.style.transform = 'rotate(90deg)';
			break;
		}
	}
}

function move(){ 
	for(var i = this.snakeBody.length - 1; i > 0; i--){
		this.snakeBody[i][0] = this.snakeBody[i - 1][0];//把上一截的位置赋给下一截
		this.snakeBody[i][1] = this.snakeBody[i - 1][1];
	}
	switch(this.direct){
		case 'right':
		this.snakeBody[0][0] += 1;
		break;
		case 'up':
		this.snakeBody[0][1] -= 1;
		break;
		case 'left':
		this.snakeBody[0][0] -= 1;
		break;
		case 'down':
		this.snakeBody[0][1] += 1;
		break;
	}
	removeClass('snake');
	snake();//重新渲染一条蛇
}
function removeClass(className){
	var ele = document.getElementsByClassName(className);
	while(ele.length > 0){
		ele[0].parentNode.removeChild(ele[0]);
	}
}
function setDirect(){
	switch(code){
		case 37:
		if(this.direct){
			this.direct = 'left';
			this.left = false;
			this.right = false;
			this.up = true;
			this.down = true;
		}
		break;
		case 38:
		if(this.direct){
			this.direct = 'up';
			this.left = true;
			this.right = true;
			this.up = false;
			this.down = false;
		}
		break;
	    case 39:
		if(this.direct){
			this.direct = 'right';
			this.left = false;
			this.right = false;
			this.up = true;
			this.down = true;
		}
		break;
	    case 38:
		if(this.direct){
			this.direct = 'down';
			this.left = true;
			this.right = true;
			this.up = false;
			this.down = false;
		}
		break;
	    default:
	    break;
	}	
}
function bindEvent(){
	document.onkeydown = function(e){
		var code = e.keycode;
		setDirect(code);
	}
}
