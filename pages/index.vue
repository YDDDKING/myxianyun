<template>
  <div class="container">
    <el-carousel :interval="5000" arrow="always" class="lunbo">
      <el-carousel-item v-for="(item, index) in banner" :key="index">
        <div
          class="bgPic"
          :style="
            `background:url(${$axios.defaults.baseURL +
              item.url}) center center no-repeat`
          "
        ></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banner: []
    };
  },
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      // console.log(res)
      const { data } = res.data;
      this.banner = data;
      // console.log(this.banner)
    });
  }
};
</script>

<style lang="less" scoped>
/deep/.el-carousel__container {
  height: 700px;
}

.bgPic {
  width: 100%;
  height: 100%;
}
</style>
