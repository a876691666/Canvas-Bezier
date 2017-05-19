
var bseList = [[10,210],[10, 410],[410, 10], [410, 210]]
var c = document.getElementById("_can");
var ctx = c.getContext("2d");
var space = 150;

var c2 = document.getElementById("_can2");
var ctx2 = c2.getContext("2d");


function bse(list, index){
	var clist = [];
	for(var i = 0; i<list.length-1;i++){
		var b = list[i], b1 = list[i+1];
		var t = [(b1[0]-b[0])*index+b[0], (b1[1]-b[1])*index+b[1]];
		clist.push(t)
	}
	if(clist.length >1)for(var i = 0;i<clist.length-1;i++){
		ctx.lineWidth = "3";
		ctx.strokeStyle = "#00f";
		ctx.moveTo.apply(ctx, clist[i]);
		ctx.lineTo.apply(ctx, clist[i+1]);
		ctx.stroke();
	}
	return clist.length < 2 ? clist[0] : bse(clist, index);
}
var t, _t;
function redraw (index){

	t = bse(bseList, index);

	ctx2.lineWidth = "4";
	ctx2.strokeStyle="#000";

	ctx2.beginPath();
	ctx2.moveTo.apply(ctx2, _t || t);
	ctx2.lineTo.apply(ctx2, t);
	ctx2.stroke();

	_t = t;
}

function onSpace (){
	c2.height = c2.height;
	_t = null
}

function _redraw(){
	if(!(timeIndex % space)) onSpace();
	c.height=c.height;
	ctx.lineWidth = "3";
	ctx.strokeStyle="#000";

	ctx.beginPath();
	ctx.moveTo.apply(ctx, bseList[0]);
	for(var i = 1;i<bseList.length;i++) ctx.lineTo.apply(ctx, bseList[i]);
	ctx.stroke();

	ctx.beginPath();
	ctx.lineWidth = "1";
	ctx.strokeStyle="#0f0";
	ctx.moveTo.apply(ctx, bseList[0]);
	ctx.lineTo.apply(ctx, bseList[1]);
	ctx.stroke();

	redraw((timeIndex % space)/space);


	timeIndex++;
}
var timeIndex = 0;
var t = setInterval(_redraw, 1000/60);