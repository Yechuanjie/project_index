<template>
    <div class="svg">
        <div class="border">
            <ul>
                <li v-for="(item, index) in list" :key="index">{{item}}</li>
            </ul>
        </div>

        <div class="border2">
            <ul>
                <li v-for="(item, index) in testList" :key="index">{{item}}</li>
                <button @click="showMore">展开</button>
            </ul>
        </div>

        <div class="border3" :class="{'large_slice': largeSlice, 'has_fill': hasFill}">
          <button @click="changeSlice">toggle slice</button>
          <button @click="changeFill">toggle fill</button>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      testList: [],
      largeSlice: false,
      hasFill: false
    };
  },
  components: {},
  props: {},
  created() {
    for (let i = 0; i < 20; i++) {
      this.list.push(`index_${i}`);
    }
    for (let i = 0; i < 10; i++) {
      this.testList.push(`index_${i}`);
    }
  },
  methods: {
    showMore() {
      let lastLength = this.testList.length;
      for (let i = 0; i < 10; i++) {
        this.testList.push(`index_${lastLength + i}`);
      }
    },
    changeSlice() {
      this.largeSlice = !this.largeSlice;
    },
    changeFill() {
      this.hasFill = !this.hasFill;
    }
  },
  computed: {}
};
</script>
<style lang="scss" scoped>
.svg {
  // background: #000;
  padding: 30px 0;
}
button {
  width: 130px;
  height: 40px;
}
.border, .border2 {
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
.border2 {
  margin-top: 20px;
  ul {
    border-image-source: url('../assets/border2.svg');
    border-width: 20px;
    border-style: solid;
    border-image-repeat: round;
    border-image-slice: 20;
  }
}
.border3 {
  width: 80%;
  height: 30vh;
  margin: 15px auto 0;
  background: #fff3d4;
  border: 30px solid;
  border-image: url('../assets/border-diamonds.png') 30 round;
  @media screen and(min-width: 768px) {
    max-width: 40%;
    margin: 0 auto;
  }
  button {
    margin-top: 13vh;
  }
  button + button {
    margin-left: 10px;
  }
  &.large_slice {
    border-image-slice: 40;
  }
  &.has_fill {
    border-image-slice: 30 fill;
  }
}
</style>