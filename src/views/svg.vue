<template>
    <div class="svg">
        <img src="../assets/border.svg" alt="">
        <div class="border">
            <ul>
                <li v-for="(item, index) in list" :key="index">{{item}}</li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      list: []
    };
  },
  components: {},
  props: {},
  created() {
    for (let i = 0; i < 30; i++) {
      this.list.push(`index_${i}`);
    }
  },
  methods: {},
  computed: {}
};
</script>
<style lang="scss" scoped>
.svg {
  background: #000;
  padding: 30px 0;
}
.border {
  box-sizing: border-box;
  position: relative;
  ul {
    margin: 0 20px;
    padding: 20px 0 0 0;
    // border-image: url('../assets/border.svg');
    border-image:linear-gradient(180deg, rgba(248,229,204,1), rgba(239,231,191,1)) 2 2;
    border-width: 5px;
    border-style: solid;
    li {
        margin-bottom: 15px;
        color: #eee;
    }
  }
}
</style>