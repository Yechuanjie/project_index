<template>
    <div class="404">
        <h1>This is not the web page you are looking for!</h1>
        <button>
          <router-link to="/" class="back_index">返回首页</router-link>
        </button>
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
  mounted() {
  },
  methods: {},
  computed: {}
};
</script>
<style lang="scss" scoped>
h1 {
  margin-top: 35vh;
  text-align: center
}
button {
  width: 150px;
  height: 50px;
  background: sandybrown;
  border: 0;
  border-radius: 10px;
  margin-top: 30px;
}
.back_index {
  text-decoration: none;
  color: #fff;
  font-size: 16px;
}
</style>