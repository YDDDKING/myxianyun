<template>
  <div class="contianer2">
    <div class="postDetailLeft">
      <PostDetailBread />
      <PostDetailContent />
      <PostDetailComment />
    </div>
    <div class="postDetailRight">
      <postDetailRight />
    </div>
  </div>
</template>

<script>
import PostDetailBread from "../../components/post/postDetailBread";
import PostDetailContent from "../../components/post/postDetailContent";
import PostDetailComment from "../../components/post/postDetailComment.vue";
import postDetailRight from "../../components/post/postDetailRight";

export default {
  components: {
    PostDetailBread,
    PostDetailContent,
    PostDetailComment,
    postDetailRight
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
  margin-left: 10px;
}
</style>
