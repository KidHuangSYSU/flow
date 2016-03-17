var data = {'images':[{'src':'../img/0.jpg','width':230,'height':319},{'src':'../img/1.jpg','width':230,'height':271},{'src':'../img/2.jpg','width':230,'height':165},{'src':'../img/3.jpg','width':230,'height':152},{'src':'../img/4.jpg','width':230,'height':165},{'src':'../img/5.jpg','width':230,'height':153},{'src':'../img/6.jpg','width':230,'height':319},{'src':'../img/7.jpg','width':230,'height':155},{'src':'../img/8.jpg','width':230,'height':230},{'src':'../img/9.jpg','width':230,'height':172},{'src':'../img/10.jpg','width':230,'height':345},{'src':'../img/11.jpg','width':230,'height':165},{'src':'../img/12.jpg','width':230,'height':287},{'src':'../img/13.jpg','width':230,'height':172},{'src':'../img/14.jpg','width':230,'height':191},{'src':'../img/15.jpg','width':230,'height':167},{'src':'../img/16.jpg','width':230,'height':172},{'src':'../img/17.jpg','width':230,'height':307},{'src':'../img/18.jpg','width':230,'height':319},{'src':'../img/19.jpg','width':230,'height':319}]};

function getMin(arr) {
  var minIndex = 0;
  for (var i = 1; i < arr.length; ++i)
    if (arr[minIndex] > arr[i])
      minIndex = i;
  return minIndex;
}

function locate(son, colH) {
  var index = getMin(colH);
  son.style.position = "absolute";
  son.style.left = index*son.offsetWidth + "px";
  son.style.top = colH[index] + "px";
  colH[index] += son.offsetHeight;
}

function readData(id, data, colH) {
  var node = document.getElementById(id);
  if (colH.length == 0) {
    var col = parseInt((document.documentElement.clientWidth | document.body.clientWidth) / data.images[0].width);
    for (var i = 0; i < col; ++i)
      colH.push(0);
    node.style.cssText = "width:"+ col*(data.images[0].width+21) + "px; margin: 0 auto";
  } else {
    var col = colH.length;
  }
  var num = data.images.length;

  for (var i = 0; i < num; ++i) {
  	var box = document.createElement("div");
  	var pic = document.createElement("div");
  	var img = document.createElement("img");
  	box.className = "box";
  	pic.className = "pic";
  	img.src = data.images[i].src;
//------------------a bug waste my whole afternoon, without it, the outside box get the height as 0--------------------------------------------------------------------
  	img.style.cssText = "width:" + data.images[i].width + "px; height:" + data.images[i].height + "px";
  	node.appendChild(box);
  	box.appendChild(pic);
  	pic.appendChild(img);

  	locate(box, colH);
  }
}

function toEnd(cname) {
  var node = document.getElementsByClassName(cname);
  var time = (document.documentElement.scrollTop+document.documentElement.clientHeight) | (document.body.scrollTop+document.body.clientHeight);
  var temp = parseInt(node[node.length-5].style.top.replace(/px/,''));
  //console.log(temp+" "+time)
  return temp < time;
}

window.onload = function() {
  var colH = [];
  readData("main", data, colH);
  window.onscroll = function() {
  	if (toEnd("box"))
  	  readData("main", data, colH);
  }
}