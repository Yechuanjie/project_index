<template>
	<div class="card">
		<div class="effect_name">
			<div class="effect_up_bg" :style="bgStyle">
				<router-link :to="link">
					<div class="effect_inner">{{name}}</div>
				</router-link>
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
        backgroundImage: `url(${require(`../assets/cp${Math.floor((Math.random() * 6) + 1)}.jpg`)})`
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
      default: '/nest'
    }
  },
  created() {
    document.title = this.name;
  },
  methods: {},
  computed: {}
};
</script>
<style lang="scss" scoped>
a {
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
}
.effect_name {
  padding: 30px;
  width: 300px;
  height: 160px;
  position: relative;
  .effect_up_bg,
  .effect_mid_bg,
  .effect_down_bg {
    position: absolute;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 8px;
  }
  .effect_up_bg {
    width: 300px;
    height: 160px;
    z-index: 3;
    .effect_inner {
      color: rgba(255, 255, 255, 0.9);
      font-size: 17px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      transition: all 0.3s;
      &:hover {
        transform: translate3d(0, -6px, 0);
        box-shadow: 0 30px 30px 0px rgba(0, 0, 100, 0.4);
      }
    }
  }
  .effect_mid_bg {
    width: 290px;
    height: 150px;
    opacity: 0.4;
    z-index: 2;
    top: 48px;
    left: 35px;
  }
  .effect_down_bg {
    width: 280px;
    height: 140px;
    opacity: 0.2;
    z-index: 1;
    top: 65px;
    left: 40px;
  }
}
</style>