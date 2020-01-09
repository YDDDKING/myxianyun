<template>
  <div>
    <h3 class="postCreateh3">发表新攻略</h3>
    <span class="postCreateSpan">分享你的个人游记，让更多人看到哦！</span>
    <div class="postCreateNone">111</div>
    <el-input v-model="input" placeholder="请输入标题"></el-input>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ""
    };
  }
};
</script>

<style lang="less" scoped>
.postCreateh3 {
  font-weight: 400;
  font-size: 22px;
  margin-bottom: 7px;
}
.postCreateNone {
  color: #fff;
  font-size:5px;
}
.postCreateSpan {
  margin-bottom: 10px;
  font-size: 12px;
  color: #999;
}
</style>
