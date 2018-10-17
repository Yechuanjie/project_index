<template>
  <div class="index">
    <banner></banner>
    <div class="effect_list">
      <card v-for="(item, index) in cardList" :key="index" :name=item.name :link=item.link></card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import banner from '@/components/banner.vue'
import card from '@/components/card.vue'

const projectList = [
  {
    name: 'nest粒子效果',
    link: '/nest'
  },
  {
    name: '碰壁反弹',
    link: '/bumping'
  },
  {
    name: '粒子图轮播',
    link: '/mapswiper'
  }
]
export default {
  name: 'index',
  components: {
    banner,
    card
  },
  data () {
    return {
      cardList: projectList
    }
  }
}
</script>

<style lang="scss" scoped>
.effect_list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 30px 30px;
}
</style>
