<template>
    <div class="mapswiper">
      <canvas id="mapswiper" :width="`${width}`" :height="`${height}`"></canvas>
    </div>
</template>
<script>
export default {
  name: 'mapSwiper',
  data() {
    return {
      width: 1000,
      height: 500,
      combine: null,
      separate: null
    };
  },
  components: {},
  props: {},
  created() {},
  mounted() {
    this.$nextTick(() => {
      let MapSwiper = this.initClass();
      const canvas = document.querySelector('#mapswiper');
      new MapSwiper({
        canvas,
        ctx: canvas.getContext('2d'),
        imgs: [
          require('../assets/minertocat.png'),
          require('../assets/inflatocat.png'),
          require('../assets/surftocat.png'),
          require('../assets/vinyltocat.png')
        ],
        radius: 1
      });
    })
  },
  methods: {
    initClass() {
      class MapSwiper {
        constructor(option) {
          this.canvas = option.canvas; // canvas对象
          this.ctx = option.ctx; //ctx对象
          this.radius = option.radius; // 粒子半径
          this.imgs = option.imgs; // 传入的图片列表
          this.imgList = []; // 加载好的图片
          this.index = 0; // 当前图片序号
          this.dots = []; // 像素点数据
          this.initz = 300;
          this.init();
        }
        init() {
          // 控制像素点大小，避免生成过多的点
          if (this.canvas.width > 500 || this.canvas.height > 300)
            this.radius >= 4 ? this.radius = this.radius : this.radius = 4;
          else {
            this.radius >= 2 ? this.radius = this.radius : this.radius = 2;
          }
          this.loadImg();
        }
        async loadImg() {
          let promiseList = this.imgs.map((src) => {
            return new Promise((resolve) => {
              let img = new Image();
              img.src = src;
              img.onload = () => {
                this.imgList.push(img);
                console.log(img.width, img.height);
                resolve();
              };
            });
          });
          // 资源全部加载完成
          try {
            await Promise.all(promiseList);
            this.createPic();
          } catch (error) {
            console.error(error);
          }
        }
        // 循环绘制
        createPic() {
          console.log('imgs init success!');
          // 清空当前粒子 重新绘制
          this.dots = [];
          this.drawPic();
          this.toParticle();
          this.combineAnimate();
          this.index === this.imgs.length-1 ? this.index = 0 : this.index++;
        }
        // 绘制当前图片
        drawPic() {
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          let img = this.imgList[this.index];
          // 居中
          this.ctx.drawImage(img, this.canvas.width / 2 - img.width / 2, 0);
        }
        toParticle() {
          let imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
          let data = imageData.data;
          for (let x = 0; x < imageData.width; x += this.radius * 2) {
            for (let y = 0; y < imageData.height; y += this.radius * 2) {
              let i = (x + y * this.canvas.width) * 4;
              if (data[i + 3] !== 0 && data[i] !== 255 && data[i + 1] !== 255 && data[i + 2] !== 255) {
                let dot = {
                  x: x, //图片x轴坐标
                  y: y, //	  y轴坐标
                  z: 0, //	  z轴坐标
                  r: data[i], //	  rgba
                  g: data[i + 1], //	  rgba
                  b: data[i + 2], //	  rgba
                  a: 1, //	  rgba
                  ix: Math.random() * this.canvas.width, //初始化x轴坐标
                  iy: Math.random() * this.canvas.height, //		y轴坐标
                  iz: Math.random() * this.initz * 2 - this.initz, //		z轴坐标
                  ir: 255, //		rgba
                  ig: 255, //		rgba
                  ib: 255, //		rgba
                  ia: 0, //		rgba
                  tx: Math.random() * this.canvas.width, //目标x轴坐标
                  ty: Math.random() * this.canvas.height, //	  y轴坐标
                  tz: Math.random() * this.initz * 2 - this.initz, //	  z轴坐标
                  tr: 255, //	  rgba
                  tg: 255, //	  rgba
                  tb: 255, //	  rgba
                  ta: 0 //	  rgba
                };
                this.dots.push(dot);
              }
            }
          }
        }
        drowDot(dot) {
          let scale = this.initz / (this.initz + dot.iz);
          this.ctx.save();
          this.ctx.beginPath();
          this.ctx.fillStyle = `rgba(${Math.floor(dot.ir)}, ${Math.floor(dot.ig)}, ${Math.floor(dot.ib)}, ${dot.ia})`;
          this.ctx.arc(
            this.canvas.width / 2 + (dot.ix - this.canvas.width / 2) * scale,
            this.canvas.height / 2 + (dot.iy - this.canvas.height / 2) * scale,
            this.radius * scale,
            0,
            Math.PI * 2
          );
          this.ctx.fill();
          this.ctx.closePath();
          this.ctx.restore();
        }
        combineAnimate() {
          let combined = false;
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.dots.map((dot) => {
            if (Math.abs(dot.ix - dot.x) < 0.1 && Math.abs(dot.iy - dot.y) < 0.1 && Math.abs(dot.iz - dot.z) < 0.1) {
              dot.ix = dot.x;
              dot.iy = dot.y;
              dot.iz = dot.z;
              dot.ir = dot.r;
              dot.ig = dot.g;
              dot.ib = dot.b;
              dot.ia = dot.a;
              combined = true;
            } else {
              dot.ix += (dot.x - dot.ix) * 0.07;
              dot.iy += (dot.y - dot.iy) * 0.07;
              dot.iz += (dot.z - dot.iz) * 0.07;
              dot.ir += (dot.r - dot.ir) * 0.3;
              dot.ig += (dot.g - dot.ig) * 0.3;
              dot.ib += (dot.b - dot.ib) * 0.3;
              dot.ia += (dot.a - dot.ia) * 0.1;
              combined = false;
            }
            return this.drowDot(dot);
          });

          if (!combined) {
            this.combine = requestAnimationFrame(() => {
              return this.combineAnimate();
            });
          } else {
            setTimeout(() => {
              return this.separateAnimate();
            }, 1500);
          }
        }
        separateAnimate() {
          let separated = false;
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.dots.map((dot) => {
            if (Math.abs(dot.ix - dot.tx) < 0.1 && Math.abs(dot.iy - dot.ty) < 0.1 && Math.abs(dot.iz - dot.tz) < 0.1) {
              dot.ix = dot.tx;
              dot.iy = dot.ty;
              dot.iz = dot.tz;
              dot.ir = dot.tr;
              dot.ig = dot.tg;
              dot.ib = dot.tb;
              dot.ia = dot.ta;
              separated = true;
            } else {
              dot.ix += (dot.tx - dot.ix) * 0.07;
              dot.iy += (dot.ty - dot.iy) * 0.07;
              dot.iz += (dot.tz - dot.iz) * 0.07;
              dot.ir += (dot.tr - dot.ir) * 0.02;
              dot.ig += (dot.tg - dot.ig) * 0.02;
              dot.ib += (dot.tb - dot.ib) * 0.02;
              dot.ia += (dot.ta - dot.ia) * 0.03;
              separated = false;
            }
            return this.drowDot(dot);
          });
          if (!separated) {
            this.separate = requestAnimationFrame(() => {
              return this.separateAnimate();
            });
          } else {
            setTimeout(() => {
              return this.createPic(); //间接递归，使用尾递归优化
            }, 100);
          }
        }
      }

      return MapSwiper;
    }
  },
  computed: {},
  destroyed () {
    // 优化 避免占用设备过多内存
    cancelAnimationFrame(this.combine);
    cancelAnimationFrame(this.separate);
  }
};
</script>
<style lang="scss" scoped>
.mapswiper {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
#mapswiper {
  width: 1000px;
  height: 500px;
  // margin-top: calc(50vh - 300px);
  // margin-left: calc(50vw - 570px);
}
</style>