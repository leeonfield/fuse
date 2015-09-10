// var width = window.innerWidth;
// var height = window.innerHeight * 0.8;
var list = new Array();
var colorList=["#FF0000","#FF7F00","#FFFF00","#00FF00","#00FFFF","#0000FF","#8B00FF"];

// 红色 #FF0000 
// 橙色 #FF7F00
// 黄色 #FFFF00 
// 绿色 #00FF00 
// 青色 #00FFFF 
// 蓝色 #0000FF
// 紫色 #8B00FF

var player = {
	x: 300,
	y: 300,
	target_x: 300,
	target_y: 300,
	score: 20,
	color: colorList[randomColor()],
	radius: 20,
	speed: 2
};

function ListNode(color, radius, x, y) {

	this.color = color;
	this.radius = radius;
	this.x = x;
	this.y = y;
	this.next = null;
}

function randomCoordinate() {

	return Math.round(Math.random() * 800);
}

function randomRadius() {

	return (5+Math.round(Math.random() * 4));
}
function randomColor(){
	return Math.floor(Math.random()*7);
}

function getDistance(x1, y1, x2, y2) {

	var dis_x = x1 - x2;
	var dis_y = y1 - y2;
	return Math.sqrt(Math.pow(dis_x, 2) + Math.pow(dis_y, 2));
}

function getCoordinates(e) {
	var x = e.clientX;
	var y = e.clientY;
	player.target_x = x;
	player.target_y = y;
}


function updata() {

	var dis_x = player.target_x - player.x;
	var dis_y = player.target_y - player.y;
	var distance = Math.sqrt(Math.pow(dis_x, 2) + Math.pow(dis_y, 2));

	if (distance >= player.speed) {
		var mov_x = player.speed * (dis_x / distance);
		var mov_y = player.speed * (dis_y / distance);
		player.x += mov_x;
		player.y += mov_y;
	} else {
		player.x = player.target_x;
		player.y = player.target_y;
	}

	for (var i = 50 - list.length; i >= 0; i--) {
		var x = new ListNode(colorList[randomColor()], randomRadius(), randomCoordinate(), randomCoordinate());
		list.push(x);
	}
}

function draw(context) {
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);

	for (var i = 0; i < list.length; i++) {

		if (getDistance(player.x, player.y, list[i].x, list[i].y) <= player.radius) {
			player.radius+=0.5;
			player.color=list[i].color;

			var x = new ListNode(colorList[randomColor()], randomRadius(), randomCoordinate(), randomCoordinate());
			list.splice(i, 1, x);

		}



		context.beginPath();
		context.fillStyle = list[i].color;
		context.arc(list[i].x, list[i].y, list[i].radius, 0, Math.PI * 2);
		context.fill();
	}

	context.beginPath();
	context.fillStyle = player.color;
	context.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
	context.fill();

	document.getElementById("status").innerHTML = " Score:" + player.score + "</br>" + " Range:.....";

}

var i = 0;

function func() {
	var c = document.getElementById("mycanvas");
	c.width = 800;
	c.height = 800;
	var cxt = c.getContext("2d");

	updata();
	draw(cxt);

	requestAnimationFrame(func);

}
window.onload = func;