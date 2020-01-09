<template>
  <div>
    <div class="postCreateContianer">
      <div class="postCreateLeft">
        <PostCreateEditor />
      </div>
      <div class="postCreateRight">
        <PostCreateCaogaoBox />
      </div>
    </div>
  </div>
</template>

<script>
import PostCreateEditor from "../../components/post/postCreateEditor";
import PostCreateCaogaoBox from "../../components/post/postCreateCaogaoBox.vue";

export default {
  components: {
    PostCreateEditor,
    PostCreateCaogaoBox
  }
};
</script>

<style lang="less" scoped>
.postCreateContianer {
  width: 1000px;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
}

.postCreateLeft {
  width: 770px;
}

.postCreateRight {
  width: 210px;
  margin-left: 50px;
}
</style>
