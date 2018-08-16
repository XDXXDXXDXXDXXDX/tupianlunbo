//存放图片对象的数组
var images = [];

var loadImage = {
    //资源列表
    resource: [
        { src: "./img/banner_1.jpg",
          name: "chineseFlag"
        },
        { src: "./img/banner_2.jpg",
          name: "run"
        },
        { src: "./img/banner_3.jpg",
          name: "deer"
        },
    ],
    //加载图片的方法
   imageLoader: function(src,callback) {
        var img = new Image();
        img.addEventListener("load", callback);
        img.src = src;
        return img;
    },
    //加载图片
    load: function(callback) {
        var total = this.resource.length;
        var self = this;
        var finish = 0;
        //遍历加载图片
        for (var i = 0; i < total; i++) {
            var src = self.resource[i].src;
            var newImg = self.imageLoader(src, function() {
                finish++;
                if(finish == total) {
                    callback();
                } 
            });
            images.push(newImg);
        }
    },
}
