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
      radius: 0.5,
      color: 'rgb(0,0,255)',
      count: 99,
      speed: 3,
      currentMaxDist: window.innerWidth < 500 ? 5000 : 20000, //和鼠标点产生连线的
      maxDist: window.innerWidth < 500 ? 2500 : 10000 //两点之间产生连线的距离平方
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
          const pointWidth = this.radius * 2;
          p.x += p.speedx;
          p.y += p.speedy;
          p.speedx *= p.x > canvasWidth || p.x < pointWidth ? -1 : 1;
          p.speedy *= p.y > canvasHeight || p.y < pointWidth ? -1 : 1;
          ctx.beginPath();
          ctx.arc(p.x - this.radius, p.y - this.radius, this.radius, 0, 2 * Math.PI);
          // ctx.fillRect(p.x - this.radius, p.y - this.radius, this.radius, 1, 1);
          ctx.fillStyle = this.color;
          ctx.fill();

          // 绘制两点之间的连线
          for (let i = index + 1; i < allPoints.length; i += 1) {
            let point = allPoints[i];
            if (point.x !== null && point.y !== null) {
              let dist_x = p.x - point.x;
              let dist_y = p.y - point.y;
              let dist = Math.pow(dist_x, 2) + Math.pow(dist_y, 2);
              let opacity = 1 - dist / maxDist; // 按距离改变透明度 达到过度效果

              // 两点之间小于最小距离 绘制连线
              dist < point.max && (point === current_point && dist >= point.max / 2 && ((p.x -= 0.03 * dist_x), (p.y -= 0.03 * dist_y))); //eslint-disable-line
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity + 0.2})`;
              ctx.moveTo(p.x - this.radius, p.y - this.radius);
              ctx.lineTo(point.x - this.radius, point.y - this.radius);
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
  background: darkkhaki;
  position: fixed;
  top: 0;
  left: 0;
}
</style>
