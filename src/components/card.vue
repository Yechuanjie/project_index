<template>
	<div class="card">
		<div class="effect_name">
			<div class="effect_up_bg" :style="bgStyle">
        <div class="effect_outer" @click="routePath">
					<div class="effect_inner">{{name}}</div>
				</div>
			</div>
			<div class="effect_mid_bg" :style="bgStyle"></div>
			<div class="effect_down_bg" :style="bgStyle"></div>
		</div>
	</div>
</template>
<script>
export default {
  data() {
    return {
      bgStyle: {
        // backgroundImage: `url(${require(`../assets/cp${Math.floor(Math.random() * 6 + 1)}.jpg`)})`
        // backgroundImage: `url(${require(`../assets/cp${(this.index + 1)}.jpg`)})`
        backgroundImage: ``
      },
      bgUrl: ''
    };
  },
  components: {},
  props: {
    name: {
      type: String,
      default: 'nest粒子效果'
    },
    imgOrder: {
      type: Number,
      default: 1
    },
    link: {
      type: String,
      default: 'nest'
    },
    status: {
      type: String,
      default: 'finish'
    },
    index: Number
  },
  created() {
    let index = this.index + 1;
    if (index > 5) {
      index = (index) % 5 + 1;
    }
    this.bgStyle.backgroundImage = `url(${require(`../assets/cp${index}.jpg`)})`;
  },
  methods: {
    routePath() {
      if (this.status === 'processing') return;
      if (this.link.indexOf('http') > -1) {
        window.location.href = this.link;
        return;
      }
      this.$router.push({
        name: this.link,
        query: {
          id: this.index,
          name: this.name
        }
      });
    },
    setColor() {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      return `rgba(${r}, ${g}, ${b}, 0.8)`;
    },
    /**
     * HSL颜色值转换为RGB
     * H，S，L 设定在 [0, 1] 之间
     * R，G，B 返回在 [0, 255] 之间
     *
     * @param H 色相
     * @param S 饱和度
     * @param L 亮度
     * @returns Array RGB色值
     */
    hslToRgb(H, S, L) {
      let R, G, B;
      if (+S === 0) {
        R = G = B = L; // 饱和度为0 为灰色
      } else {
        let hue2Rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1/6) return p + (q - p) * 6 * t;
          if (t < 1/2) return q;
          if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
          return p;
        };
        let Q = L < 0.5 ? L * (1 + S) : L + S - L * S;
        let P = 2 * L - Q;
        R = hue2Rgb(P, Q, H + 1/3);
        G = hue2Rgb(P, Q, H);
        B = hue2Rgb(P, Q, H - 1/3);
      }
      return [Math.round(R * 255), Math.round(G * 255), Math.round(B * 255)];
    },
    // 获取随机HSL
    randomHsl() {
      let H = Math.random();
      let S = Math.random();
      let L = Math.random();
      return [H, S, L];
    }
    // // 获取HSL数组
    // getHslArray() {
    //   let HSL = [];
    //   let hslLength = 16; // 获取数量
    //   for (let i = 0; i < hslLength; i++) {
    //     let ret = this.randomHsl();

    //     // 颜色相邻颜色差异须大于 0.25
    //     if (i > 0 && Math.abs(ret[0] - HSL[i - 1][0]) < 0.25) {
    //       i--;
    //       continue; // 重新获取随机色
    //     }
    //     ret[1] = 0.7 + (ret[1] * 0.2); // [0.7 - 0.9] 排除过灰颜色
    //     ret[2] = 0.4 + (ret[2] * 0.4); // [0.4 - 0.8] 排除过亮过暗色

    //     // 数据转化到小数点后两位
    //     ret = ret.map((item) => {
    //       return parseFloat(item.toFixed(2));
    //     });

    //     HSL.push(ret);
    //   }
    //   return HSL;
    // }
  },
  computed: {
  }
};
</script>
<style lang="scss" scoped>
.effect_name {
  padding: 30px;
  width: 300px;
  height: 160px;
  position: relative;
  cursor: pointer;
  .effect_up_bg,
  .effect_mid_bg,
  .effect_down_bg {
    position: absolute;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 8px;
    transition: all .3s;
  }
  &:hover {
    .effect_up_bg {
      transform: translate3d(0, -10px, 0);
    }
    .effect_mid_bg {
      transform: translate3d(0, -3px, 0) scaleX(0.95);
      top: 45px;
    }
    .effect_down_bg {
      transform: translate3d(0, -2px, 0) scaleX(0.9);
      top: 65px;
    }
  }
  .effect_up_bg {
    width: 300px;
    height: 160px;
    z-index: 3;
    transition: all 0.3s;
    .effect_outer {
      width: 100%;
      height: 100%;
      .effect_inner {
        color: rgba(255, 255, 255, 0.9);
        font-size: 17px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
    }
  }
  .effect_mid_bg {
    width: 290px;
    height: 150px;
    opacity: 0.4;
    z-index: 2;
    top: 45px;
    left: 35px;
  }
  .effect_down_bg {
    width: 280px;
    height: 140px;
    opacity: 0.2;
    z-index: 1;
    top: 60px;
    left: 40px;
  }
}
</style>