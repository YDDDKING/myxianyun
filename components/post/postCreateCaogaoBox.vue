<template>
  <div class="postCreateCaogaoBox">
    <div>
      <div class="caoGaoBoxTitle">
        草稿箱（{{ $store.state.post.caogao.length }}）<span
          class="caogaoHistory"
          @click="clearCaogao"
          >清空</span
        >
      </div>
      <div
        class="caoGaoBoxContent"
        v-for="(item, index) in $store.state.post.caogao"
        :key="index"
      >
        <div class="caoGaoBoxText" @click="showCaogao">
          {{ item.data.caogaoTitle }} <i class="el-icon-edit"></i>
        </div>
        <div class="caoGaoBoxTime">{{ item.time }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // caogaoBox: [
      //   {
      //     caogaoIndex: 0,
      //     caogaoTitle: 123
      //   }
      // ]
    };
  },
  methods: {
    showCaogao() {
      console.log("111");
    },
    clearCaogao() {
      this.$store.commit("post/clearCaogao");
    }
  },
  watch: {
    $store() {
      this.caogaoBox = this.$store.state.post.caogao;
      console.log(this.caogaoBox);
    }
  },
  mounted() {}
};
</script>

<style lang="less" scoped>
.postCreateCaogaoBox {
  border: 1px solid #ddd;
  padding: 10px;
}

.caoGaoBoxTitle {
  color: #666;
}

.caoGaoBoxContent {
  margin: 10px 0;
}
.caoGaoBoxText {
  font-size: 14px;
}

.caoGaoBoxTime {
  font-size: 14px;
  color: #999;
}

.caogaoHistory {
  font-size: 14px;
  float: right;
}
</style>
