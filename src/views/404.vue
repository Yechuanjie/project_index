<template>
    <div class="404">
        <div id="wrapper">
            <div id="field">
                <img class="img_bg" src="../assets/field.jpg">
            </div>
            <div id="pictures">
                <img class="img_text" src="../assets/text.png" alt="This not the web page you are looking for">
                <img class="img_cat" src="../assets/cat.png">
                <img class="img_cat_shadow" src="../assets/cat_shadow.png">
                <img class="img_speeder" src="../assets/speeder.png">                        
                <img class="img_speeder_shadow" src="../assets/speeder_shadow.png">            
                <img class="img_building_1" src="../assets/buliding_1.png">
                <img class="img_building_2" src="../assets/building_2.png">                        
            </div>
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
  mounted() {
    this.$nextTick(() => {
      let window_width,
        window_height,
        field_width,
        field_height,
        rate_w,
        rate_h,
        field;
        // text,
        // cat,
        // cat_shadow,
        // speeder,
        // speeder_shadow,
        // buliding_1,
        // building_2;
      window_width = document.body.clientWidth;
      window_height = document.body.clientHeight;

      field = document.getElementById('field');
      field_width = field.offsetWidth;
      field_height = field.offsetHeight;
      rate_w = field_width / window_width;
      rate_h = field_height / window_height;
      let imgArray = {
        bg: { left: -780, top: -200, scale: 0.06, isFont: false },
        text: { left: -500, top: -120, scale: 0.03, isFont: true },
        cat: { left: -200, top: -100, scale: 0.02, isFont: true },
        cat_shadow: { left: -189, top: 100, scale: 0.02, isFont: true },
        speeder: { left: -70, top: -40, scale: 0.01, isFont: true },
        speeder_shadow: { left: -70, top: 75, scale: 0.01, isFont: true },
        building_1: { left: 20, top: -111, scale: 0.03, isFont: false },
        building_2: { left: 300, top: -60, scale: 0.05, isFont: false }
      };
      (function() {
        for (let i in imgArray) {
          let theImg = document.getElementsByClassName('img_' + i)[0];
          //
          let offset_w = (field_width / 2) * imgArray[i].scale;
          let offset_h = (field_height / 2) * imgArray[i].scale;
          if (imgArray[i].isFont === true) {
            theImg.style.left = field_width / 2 + offset_w + imgArray[i].left + 'px';
            theImg.style.top = field_height / 2 + offset_h + imgArray[i].top + 'px';
          } else {
            theImg.style.left = field_width / 2 - offset_w + imgArray[i].left + 'px';
            theImg.style.top = field_height / 2 - offset_h + imgArray[i].top + 'px';
          }
        }
      })();
      let picMove = function(pageX, pageY) {
        for (let i in imgArray) {
          let theImg = document.getElementsByClassName('img_' + i)[0];
          let offset_w = rate_w * pageX * imgArray[i].scale;
          let offset_h = rate_h * pageY * imgArray[i].scale;
          if (imgArray[i].isFont === true) {
            theImg.style.left = field_width / 2 + offset_w + imgArray[i].left + 'px';
            theImg.style.top = field_height / 2 + offset_h + imgArray[i].top + 'px';
          } else {
            theImg.style.left = field_width / 2 - offset_w + imgArray[i].left + 'px';
            theImg.style.top = field_height / 2 - offset_h + imgArray[i].top + 'px';
          }
        }
      };
      document.body.onmousemove = function(e) {
        picMove(e.pageX, e.pageY);
      };
    })
  },
  methods: {},
  computed: {}
};
</script>
<style lang="scss" scoped>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
#field {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  width: 100vw;
  height: 370px;
}
.img_bg {
//   position: absolute;
//   top: -11px;
//   left: -20px;
  width: 120%;
  height: 425px;
}
.img_text {
  position: absolute;
  z-index: 8;
}
.img_cat {
  position: absolute;
  z-index: 7;
}
.img_speeder {
  position: absolute;
  z-index: 6;
}
.img_cat_shadow {
  position: absolute;
  z-index: 5;
}
.img_speeder_shadow {
  position: absolute;
  z-index: 4;
}
.img_building_1 {
  position: absolute;
  z-index: 3;
}
.img_building_2 {
  position: absolute;
  z-index: 2;
}
</style>