//获取画板相关信息
var canvas = document.getElementById("showImg");
var context = canvas.getContext("2d");
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

//加载资源后开始轮播
loadImage.load(function() {
    //先将第一张轮播图绘画到画板上
    context.drawImage(images[0], 0, 0, 576, 324);
    //初始化开始绘画位置
    var img1startDrawX = 0;
    var img2startDrawX = 576;
    //初始化图片播放到第几张
    var i = 0;
    var img1 = images[0];
    var img2 = images[1];
    self = this;
    //主要轮播逻辑
    var main = setInterval(function(){
        self.img1Andimg2Move = setInterval(function () {
            if (img1startDrawX > -576) {
                //正常图片平移播放
                img1startDrawX -= 4;//开始绘画的位置，图片每次移动的距离为4
                img2startDrawX = 576 + img1startDrawX;//图片2开始绘画的位置
            }else {
                //当一张图片播放完成执行的操作
                img1startDrawX = 0;
                img2startDrawX = 576;
                //i+1代表加载下一张图片
                i += 1;
                img1 = images[i];
                changeBgColor();
                //判断上面i+1后再加1是否会超出图片的总张数
                if(i == images.length - 1) {
                    img2 = images[0];
                    i = -1;
                }else {
                    img2 = images[i + 1];
                }
                //清楚平移播放定时器，实现图片停留效果
                clearInterval(self.img1Andimg2Move);
            }
            //清除，绘制画布
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.drawImage(img1, img1startDrawX, 0, 576, 324);
            context.drawImage(img2, img2startDrawX, 0, 576, 324);
        },1000/60);

        
    },5000);//这里可以设置图片大致停留时间

    //遍历绑定事件，点击下方按钮跳转到对应图片
    var btn = document.getElementsByClassName("btn")
    changeBgColor();
    for (var j = 0; j < btn.length; j++) {
        btn[j].addEventListener("click",function(num) {
            return function () {
            clearInterval(self.img1Andimg2Move);
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.drawImage(images[num], 0, 0, 576, 324);
            img1startDrawX = 0;
            img2startDrawX = 576;
            i = num;
            img1 = images[i];
            changeBgColor();
            if(i == images.length - 1) {
                img2 = images[0];
                i = -1;
            }else {
                img2 = images[i + 1];
            }}
        }(j));
    }

    //点击左切换按钮事件绑定
    var leftBtn = document.getElementById("left");
    leftBtn.addEventListener("click",function() {
        clearInterval(self.img1Andimg2Move);
        img1startDrawX = 0;
        img2startDrawX = 576;
        switch(i) {
            case -1 :
                i = 1;
                changeBgColor();
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                context.drawImage(images[i], 0, 0, 576, 324);
                img1 = images[i];
                img2 = images[i + 1];
                break;
            case 0 :
                i = 2;
                changeBgColor();
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                context.drawImage(images[i], 0, 0, 576, 324);
                img1 = images[i];
                img2 = images[0];
                i = -1;
                break;
            default : 
                i -= 1;
                changeBgColor();
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                context.drawImage(images[i], 0, 0, 576, 324);
                img1 = images[i];
                img2 = images[i + 1];
                break;
        }
    });

    //点击右切换按钮事件绑定
    var rightBtn = document.getElementById("right");
    rightBtn.addEventListener("click",function() {
        clearInterval(self.img1Andimg2Move);
        img1startDrawX = 0;
        img2startDrawX = 576;
        switch(i) {
            case 1 :
                i += 1;
                changeBgColor();
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                context.drawImage(images[i], 0, 0, 576, 324);
                img1 = images[i];
                img2 = images[0];
                i = -1;
                break;
            default : 
                i += 1;
                changeBgColor();
                context.clearRect(0, 0, canvasWidth, canvasHeight);
                context.drawImage(images[i], 0, 0, 576, 324);
                img1 = images[i];
                img2 = images[i + 1];
                break;
        }
    });

    //更改下方滑动选择按钮背景颜色的方法
    function changeBgColor() {
        switch(i) {
            case 0 :
                btn[0].style.backgroundColor = "red";
                btn[1].style.backgroundColor = "";
                btn[2].style.backgroundColor = "";
                break;
            case 1 :
                btn[1].style.backgroundColor = "red";
                btn[0].style.backgroundColor = "";
                btn[2].style.backgroundColor = "";
                break;
            case 2 :
                btn[2].style.backgroundColor = "red";
                btn[0].style.backgroundColor = "";
                btn[1].style.backgroundColor = "";
                break;
        }
    }
});





