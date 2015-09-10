var width = window.innerWidth;
var height = window.innerHeight * 0.8;

var player = {
	x: 300,
	y: 300,
	target_x: 300,
	target_y: 300,
	score: 20,
	color: "#058",
	radius: 20,
	speed: 1
};

function ListNode(data) {
	this.data = data;
	this.next = null;
}

function LinkedList() {
	this.head = null;
	this.tail = null;
}
LinkedList.prototype.find = function(element) {
	var p = this.head;
	while (p != null && p.data != element) {
		p = p.next;
	}
	return p;
}

LinkedList.prototype.insertAfterNode = function(element, node) {
	if (node == null) return;
	var n = new ListNode(element);
	n.next = node.next;
	node.next = n;
	if (node == this.tail) {
		this.tail = n;
	}
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
}

function draw(context) {

	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
	context.beginPath();
	context.fillStyle = "red";
	context.arc(player.x, player.y, player.radius, 0, Math.PI * 2);
	context.fill();
	document.getElementById("status").innerHTML = " Score:" + player.score + "</br>" + " Range:.....";

}

var i = 0;

function func() {
	var c = document.getElementById("mycanvas");
	c.width = width;
	c.height = height;
	var cxt = c.getContext("2d");
	draw(cxt);
	updata();

	requestAnimationFrame(func);

}
window.onload = func;