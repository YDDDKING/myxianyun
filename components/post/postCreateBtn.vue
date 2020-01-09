<template>
  <div class="postCreateBtn">
    <el-button type="primary">发布</el-button>
    <span>或者<span class="caogao" @click="keepCaogao">保存至草稿</span></span>
  </div>
</template>

<script>
export default {
  methods: {
    keepCaogao() {
      this.$emit("keepCaogao");
    }
  }
};
</script>

<style lang="less" scoped>
.postCreateBtn {
  margin-top: 15px;
}
.caogao {
  margin: 0 5px;
  color: orange;
}
.caogao:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
