<template>
  <div class="contianer2">
    <div class="postDetailLeft">
      <PostDetailBread />
      <PostDetailContent />
      <PostDetailComment />
    </div>
    <div class="postDetailRight">
      右边
    </div>
  </div>
</template>

<script>
import PostDetailBread from "../../components/post/postDetailBread";
import PostDetailContent from "../../components/post/postDetailContent";
import PostDetailComment from "../../components/post/postDetailComment.vue";

export default {
  components: {
    PostDetailBread,
    PostDetailContent,
    PostDetailComment
  }
};
</script>

<style lang="less" scoped>
.contianer2 {
  width: 1000px;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
}

.postDetailLeft {
  width: 720px;
}

.postDetailRight {
  width: 280px;
  margin-left: 50px;
}
</style>
