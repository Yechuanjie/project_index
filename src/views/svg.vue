<template>
    <div class="svg">
        <!-- <img src="../assets/border.svg" alt=""> -->
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
    for (let i = 0; i < 20; i++) {
      this.list.push(`index_${i}`);
    }
  },
  methods: {},
  computed: {}
};
</script>
<style lang="scss" scoped>
.svg {
  // background: #000;
  padding: 30px 0;
}
.border {
  box-sizing: border-box;
  position: relative;
  ul {
    margin: 0 20px;
    padding: 20px 0 0 0;
    border-image-source: url('../assets/border.svg');
    // border-image:linear-gradient(180deg, rgba(248,229,204,1), rgba(239,231,191,1)) 2 2;
    border-width: 20px;
    border-style: solid;
    border-image-repeat: repeat;
    border-image-slice: 20;
    @media screen and(min-width: 768px) {
      max-width: 40%;
      margin: 0 auto;
    }
    li {
        margin-bottom: 25px;
        color: #333;
    }
  }
}
</style>