var startBtn = document.getElementById('btn');
var box = document.getElementById('box');
var flagBox = document.getElementById('flagBox');
var alertBox = document.getElementById('alertBox');//弹窗
var alertImg = document.getElementById('alertImg');
var score = document.getElementById('score');
var closeBtn =document.getElementById('closeBtn');
var minesNum;
var mineOver;
var block;
var mineMap=[];
var startGameBool =true;

bindEvent();
function bindEvent(){
	startBtn.onclick = function(){
		if(startGameBool){
			box.style.display = 'block';
		    flagBox.style.display = 'block';
		    init();
		    startGameBool = false;
		}
		
	}
	box.oncontextmenu = function(){//取消右键默认事件
		return false;
	}
	box.onmousedown = function(e){//事件委托
		var event = e.target;//获取当前点哪个键
		if(e.which == 1){//判断是不是左键
			leftClick(event);//当前事件为左键
		}else if(e.which == 3){//判断是不是右键
			rightClick(event);//当前时间为右键
		}
	}
	closeBtn.onclick = function(){
		alertBox.style.display ='none';
		flagBox.style.display = 'none';
		box.style.display = 'none';
		box.innerHTML = '';
		startGameBool = true;
	}//激发事件
}
function init(){//生成一百个小雷
	minesNum = 10;
	mineOver = 10;
	score.innerHTML =mineOver;
	for(var i = 0;i < 10; i++){
		for(var j = 0;j < 10; j++){
			var con = document.createElement('div');//创建con，地雷格
			con.classList.add('block');//给con增加class属性block
			con.setAttribute('id',i + '-'+ j);//给con增加属性值id，用来表示位置
			box.appendChild(con);
			mineMap.push({mine:0});//用mineMap标记哪里有雷
		}
	}
	block =document.getElementsByClassName('block');//把一百个小格子取出来
	while(minesNum){
		var minesIndex = Math.floor(Math.random()*100);
		if(mineMap[minesIndex].mine ===0){
			mineMap[minesIndex].mine = 1;
			block[minesIndex].classList.add('isLei');//生成一次雷
			minesNum --;
		}
	}
}
function leftClick(dom){//dom指触发事件的源事件，每个格
	if(dom.classList.contains('flag')){//已经被插旗，不能左击
		return;
	}
	var isLei = document.getElementsByClassName('isLei');//取雷
	if(dom && dom.classList.contains('isLei')){//能取到元素，并且元素是雷
		console.log('gameOver');
		for(var i = 0;i < isLei.length;i ++){
			isLei[i].classList.add('show');//让所有的雷出来
		}
		setTimeout(function(){//延迟出现失败弹窗
			alertBox.style.display = 'block';
			alertImg.style.backgroundImage = 'url("img/over.jpg")';
		},800)
	}else{//不是雷，遍历周边，是0直接显示，不是0 ，接着遍历，扩散
		var n = 0;//n指周围n颗雷
		var posArr = dom && dom.getAttribute('id').split('-');//把id从字符串拆分成数字
		var posX = posArr && +posArr[0];//取第一个值为x
		var posY = posArr && +posArr[1];//取第二个值为y
		dom && dom.classList.add('num');//显示为数字
		//i-1,j-1   i-1,j   i-1,j+1
		//i,j-1     i,j     i,j+1
		//i+1,j-1   i+1,j   i+1,j+1//周围情况
		for(var i = posX - 1; i <= posX + 1; i++){//判断矩阵
			for(var j = posY-1; j <= posY + 1; j++){
				var aroundBox = document.getElementById(i +'-'+ j);
				if(aroundBox && aroundBox.classList.contains('isLei')){
					n ++;
				}
			}
		}
		dom && (dom.innerHTML = n);//dom存在，dom插入数字n
		if(n == 0){
			for(var i = posX - 1; i <= posX + 1; i++){
				for(var j = posY-1; j <= posY + 1; j++){
					var nearBox = document.getElementById(i +'-'+ j);
					if(nearBox && nearBox.length != 0){//周围有元素
						if(!nearBox.classList.contains('check')){//避免点击两次
							nearBox.classList.add('check');//给周围元素增加check用于判断
							leftClick(nearBox);
						}
						
					}
				}
			}
		}
	}
}
function rightClick(dom){//右边插旗
	if(dom.classList.contains('num')){
		return;
	}
	dom.classList.toggle('flag');//切换，可添加，可取消
	if(dom.classList.contains('isLei') && dom.classList.contains('flag')){//插旗
		mineOver --;//有雷，且插旗，雷数减一
	}
	if(dom.classList.contains('isLei') && !dom.classList.contains('flag')){
		mineOver ++;//有雷，未插旗，雷数加一
	}
	score.innerHTML = mineOver;
	if(mineOver == 0){
		alertBox.style.display = 'block';
		alertImg.style.backgroundImage = 'url("img/success.jpg")';
	}
}