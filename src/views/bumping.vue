<template>
    <div class="bumping">
        <canvas id="canvas1" width="300" height="200"></canvas>
        <canvas id="canvas2" width="300" height="200"></canvas>
        <canvas id="canvas3" width="300" height="200"></canvas>
        <canvas id="canvas4" width="300" height="200"></canvas>
        <canvas id="canvas5" width="300" height="200"></canvas>
        <canvas id="canvas6" width="300" height="200"></canvas>
    </div>
</template>
<script>
export default {
  data() {
    return {
      animate1: null,
      animate2: null,
      animate3: null,
      animate4: null,
      animate5: null
    };
  },
  components: {},
  props: {},
  created() {
    this.$nextTick(() => {
      this.initBall();
    });
  },
  mounted() {},
  methods: {
    initBall() {
      class Ball {
        /**
         * 创建小球及动画通用方法
         * @param canvas {Object} canvas元素
         * @param context {Object} canvas上下文
         * @param addAcceleration {Boolean} 是否开启加速度效果
         * @param desc {String} 小球描述
         */
        constructor(canvas, context, addAcceleration, desc) {
          this.radius = 15; // 球半径
          this.x = Math.abs(Math.random() * canvas.width - this.radius); // 初始位置
          this.y = Math.abs(Math.random() * canvas.height - this.radius); // 初始位置
          this.speedx = 4; // 横向移动速度
          this.speedy = 2; // 竖向移动速度
          this.canvas = canvas;
          this.context = context;
          this.Acceleration = addAcceleration; // 是否添加加速度
          this.desc = desc;
          this.paint();
        }
        paint() {
          this.context.beginPath();
          this.context.arc(this.x + this.radius, this.y + this.radius, this.radius, 0, 2 * Math.PI);
          this.context.closePath();
          this.context.fillStyle = 'rgb(0,124,139)';
          this.context.font = '18px serif';
          this.context.textAlign = 'center';
          this.context.fillText(this.desc, 150, 50);
          this.context.fill();
        }
        move() {
          this.x += this.speedx;
          this.y += this.speedy;
          // 给小球添加加速度 逐帧减少垂直方向的速度
          if (this.Acceleration) {
            this.speedy *= 0.99;
            this.speedy += 0.25;
          }
        }
        //处理边界情况
        handleMoveEdge() {
          let ballWidth = this.radius * 2;
          let ballRight = this.x + ballWidth;
          let ballBottom = this.y + ballWidth;
          if (this.x < 0) {
            this.speedx = -this.speedx;
          } else if (ballRight > this.canvas.width) {
            this.x = this.canvas.width - ballWidth;
            this.speedx = -this.speedx;
          }
          if (this.y < 0) {
            this.speedy = -this.speedy;
          } else if (ballBottom > this.canvas.height) {
            this.y = this.canvas.height - ballWidth;
            this.speedy = -this.speedy;
          }
        }
      }
      this.createBall('canvas1', 1, Ball, false, false, '', '普通小球');
      this.createBall('canvas2', 2, Ball, true, false, '', '带加速度小球，更逼真的掉落效果');
      this.createBall('canvas3', 3, Ball, false, true, '', '带长尾效果小球');
      this.createBall('canvas4', 4, Ball, true, true, '', '带加速度，带长尾效果小球');
      this.createBall('canvas5', 5, Ball, true, true, 'click', '从点击位置开始下落');
      this.createBall('canvas6', 6, Ball, true, true, 'move', '跟随手指移动，点击释放，移出停止');
    },
    /**
     * 创建小球及动画通用方法
     * @param canvasId {String} 当前canvasid
     * @param index {Number} 当前小球序号 用于创建不同的小球动画名称，方便后续停止动画
     * @param Ball {Object Class} 小球类
     * @param acceleration {Boolean} 是否开启加速度效果
     * @param longTail {Boolean} 是否开启长尾效果
     * @param openMouseControl {String} 开启指定名字的鼠标控制
     * @param desc {String} 小球描述
     */
    createBall(canvasId, index, Ball, acceleration, longTail, openMouseControl, desc) {
      let canvas = document.getElementById(canvasId);
      let context = canvas.getContext('2d');
      let ball = new Ball(canvas, context, acceleration, desc);
      let animateName = `animate_${index}`;
      let animateRuning = false;
      if (openMouseControl === 'click') {
        canvas.addEventListener('click', e => {
          window.cancelAnimationFrame(animateName);
          console.log(e);
          ball.x = e.offsetX;
          ball.y = e.offsetY;
          animate();
        });
      }
      if (openMouseControl === 'move') {
        canvas.addEventListener('mousemove', e => {
          if (!animateRuning) {
            clear();
            ball.x = e.offsetX;
            ball.y = e.offsetY;
            ball.paint();
          }
        });
        canvas.addEventListener('mouseout', () => {
          window.cancelAnimationFrame(animateName);
          animateRuning = false;
        });
        canvas.addEventListener('click', () => {
          if (!animateRuning) {
            animateName = window.requestAnimationFrame(animate);
            animateRuning = true;
          }
        });
      }
      let clear = () => {
        if (!longTail) {
          context.clearRect(0, 0, canvas.width, canvas.height);
        } else {
          context.fillStyle = 'rgba(255,255,255,0.3)';
          context.fillRect(0, 0, canvas.width, canvas.height);
        }
      };
      let animate = () => {
        clear();
        ball.move();
        ball.handleMoveEdge();
        ball.paint();
        animateName = window.requestAnimationFrame(animate);
      };
      if (openMouseControl === 'move') {
        ball.paint();
      } else {
        animateName = window.requestAnimationFrame(animate);
      }
    }
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
.bumping {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
canvas {
  border: 1px solid darkslategray;
  margin: 80px auto 0;
  display: block;
  flex: 0;
}
</style>