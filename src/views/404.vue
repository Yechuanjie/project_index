<template>
    <div class="404">
      <div class="not_found">
        <img src="../assets/404.jpg" alt="" srcset="" class="not_found_img">
        <router-link to="/" class="back_index"><button>返回首页</button></router-link>
      </div>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  components: {},
  props: {},
  created() {},
  mounted() {},
  methods: {},
  computed: {}
};
</script>
<style lang="scss" scoped>
.not_found {
  background: #f8f5ec;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  .not_found_img {
    @media screen and(max-width: 768px) {
      width: 100%;
      margin-top: 20%;
    }
    @media screen and(min-width: 768px) {
      max-width: 900px;
    }
  }
  button {
    width: 150px;
    height: 40px;
    background: sandybrown;
    border: 0;
    border-radius: 5px;
    outline: none;
    color: #fff;
    font-size: 14px;
    cursor: pointer;
  }
  .back_index {
    text-decoration: none;
  }
}
</style>