<template>
	<div class="nest">
	<canvas id="nest_canvas"></canvas>
	</div>
</template>
<script>
export default {
  data() {
    return {
      animate: null,
      radius: 0.5, // 点大小
      color: '255, 0, 0', //连线颜色
      // color: '255, 0, 255', //连线颜色
      count: 60,
      speed: 3,
      currentMaxDist: 20000, //和鼠标点产生连线的
      maxDist: 6000 //两点之间产生连线的距离平方
    };
  },
  components: {},
  props: {},
  created() {
    console.log(this.$route.query);
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    initCanvas() {
      const canvas = document.querySelector('#nest_canvas');
      const ctx = canvas.getContext('2d');
      let canvasWidth = (canvas.width =
        window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth);
      let canvasHeight = (canvas.height =
        window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight);
      let current_point = {
        x: null, //当前鼠标x
        y: null, //当前鼠标y
        max: this.currentMaxDist
      };
      let randomPoints = [];
      let allPoints = [];
      let maxDist = this.maxDist;
      // 随机生成count个点
      for (let i = 0; i < this.count; i += 1) {
        let x = Math.random() * canvasWidth;
        let y = Math.random() * canvasHeight;
        let speedx = Math.random() * this.speed - 1;
        let speedy = Math.random() * this.speed - 1;
        let max = maxDist;
        randomPoints[i] = { x, y, speedx, speedy, max };
      }
      let draw = () => {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        randomPoints.forEach((p, index) => {
          // const pointWidth = this.radius * 2;
          p.x += p.speedx;
          p.y += p.speedy;
          p.speedx *= p.x > canvasWidth || p.x < 0 ? -1 : 1;
          p.speedy *= p.y > canvasHeight || p.y < 0 ? -1 : 1;
          // 绘制点
          ctx.beginPath();
          ctx.arc(p.x - this.radius, p.y - this.radius, this.radius * 5, 0, Math.PI * 2);
          ctx.fillStyle = '#fff';
          ctx.fill();
          // ctx.??

          // 绘制两点之间的连线
          for (let i = index + 1; i < allPoints.length; i += 1) {
            let point = allPoints[i];
            if (point.x !== null && point.y !== null) {
              let dist_x = p.x - point.x;
              let dist_y = p.y - point.y;
              let dist = Math.pow(dist_x, 2) + Math.pow(dist_y, 2);
              let opacity = 1 - dist / maxDist; // 按距离改变透明度 达到过度效果
              opacity = (point.max - dist) / point.max;
              // 两点之间小于最小距离 绘制连线
              dist < point.max && (point === current_point && dist >= point.max / 2 && ((p.x -= 0.03 * dist_x), (p.y -= 0.03 * dist_y))); //eslint-disable-line
              ctx.beginPath();
              ctx.lineWidth = opacity / 2;
              ctx.strokeStyle = `rgba(${this.color},${opacity + 0.4})`;
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(point.x, point.y);
              ctx.stroke();
            }
          }
        });
        this.animate = window.requestAnimationFrame(draw);
      };
      // let current_point = {};
      canvas.addEventListener('mousemove', (e) => {
        current_point.x = e.offsetX;
        current_point.y = e.offsetY;
        current_point.max = this.currentMaxDist;
      });
      allPoints = [...randomPoints, current_point];
      draw();
    }
  },
  destroyed() {
    window.cancelAnimationFrame(this.animate);
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
#nest_canvas {
  background: rgb(119, 154, 168);
  position: fixed;
  top: 0;
  left: 0;
}
</style>
