<template>
  <div class="postStar">
    <div class="postStarLeft1">推荐攻略</div>
    <div class="postStarRight">
      <el-button
        type="primary"
        icon="el-icon-edit"
        class="postIcon"
        @click="jumpPostCreate"
        >写游记</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    jumpPostCreate() {
      this.$router.push({
        path: "/post/postCreate"
      });
    }
  }
};
</script>

<style lang="less" scoped>
.postStar {
  height: 52px;
  display: flex;
}

.postStarLeft1 {
  width: 80px;
  color: #ffa500;
  font-size: 20px;
  display: inline-block;
  border-bottom: 3px solid #ffa500;
  padding: 10px 0;
}

.postStarRight {
  flex: 1;
  display: inline;
  width: 100%;
  float: right;
  border-bottom: 1px solid #eeeeee;
}

.postIcon {
  float: right;
}
</style>
