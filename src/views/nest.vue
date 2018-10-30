<template>
	<div class="nest">
	<canvas id="nest_canvas"></canvas>
	</div>
</template>
<script>
export default {
  data() {
    return {
      radius: 5
    };
  },
  components: {},
  props: {},
  created() {},
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
      let randomPoints = [];
      let allPoints = [];
      let maxDist = 8000;
      // 随机生成100个点
      for (let i = 0; i < 100; i += 1) {
        let x = Math.random() * canvasWidth;
        let y = Math.random() * canvasHeight;
        let speedx = Math.random() * 2 - 1;
        let speedy = Math.random() * 2 - 1;
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
          ctx.fillStyle = '#fff';
          ctx.fill();

          // 绘制两点之间的连线
          for (let i = index + 1; i < allPoints.length; i += 1) {
            let point = allPoints[i];
            let dist_x = p.x - point.x;
            let dist_y = p.y - point.y;
            let dist = Math.pow(dist_x, 2) + Math.pow(dist_y, 2);
            let opacity = 1 - dist / maxDist; // 按距离改变透明度 达到过度效果
            // console.log(opacity);
            // dist < point.max && //eslint-disable-line
            //   (point === movePoint && dist >= point.max / 2 && ((p.x -= 0.03 * dist_x), (p.y -= 0.03 * dist_y))); //eslint-disable-line
            // 两点之间小于最小距离 绘制连线
            // if (dist < maxDist && point === movePoint && dist >= point.max / 2) {
            //   p.x -= 0.03 * dist_x;
            //   p.y -= 0.03 * dist_y;
            // }
            if (dist < maxDist) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity + 0.2})`;
              ctx.moveTo(p.x - this.radius, p.y - this.radius);
              ctx.lineTo(point.x - this.radius, point.y - this.radius);
              ctx.stroke();
            }
          }
        });
        window.requestAnimationFrame(draw);
      };
      let movePoint = {};
      canvas.addEventListener('mousemove', (e) => {
        movePoint.x = e.offsetX;
        movePoint.y = e.offsetY;
        movePoint.max = 20000;
      });
      allPoints = [...randomPoints, movePoint];
      draw();
    }
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
