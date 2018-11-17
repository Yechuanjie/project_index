<template>
  <div class="index">
    <banner></banner>
    <div class="effect_list">
      <card v-for="(item, index) in cardList" :key="index" :status="item.status" :index="index" :name=item.name :link=item.link></card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import banner from '@/components/banner.vue';
import card from '@/components/card.vue';

const projectList = [
  {
    name: 'nest粒子效果',
    link: 'nest',
    status: 'finish'
  },
  {
    name: '碰壁反弹',
    link: 'bumping',
    status: 'finish'
  },
  {
    name: '粒子图轮播',
    link: 'mapswiper',
    status: 'finish'
  },
  {
    name: '太阳系动画(进行中)', // https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Basic_animations
    link: 'solarsystem',
    status: 'processing'
  },
  {
    name: '时钟动画(进行中)',
    link: 'clock',
    status: 'processing'
  }
];
export default {
  name: 'index',
  components: {
    banner,
    card
  },
  data() {
    return {
      cardList: projectList
    };
  },
  created() {
    // console.log(this.$route.query);
  },
  methods: {},
  computed: {}
};
</script>

<style lang="scss" scoped>
.effect_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 30px 30px;
}
</style>
