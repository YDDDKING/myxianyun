<template>
  <div class="postDetailBread">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/post' }">旅游攻略</el-breadcrumb-item>
      <el-breadcrumb-item>攻略详情</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.postDetailBread {
  margin-bottom: 20px;
}
</style>
