<template>
  <div>
    <div class="contianer">
      <div class="left">
        <PostList />
      </div>
      <div class="right">
        <PostSearch />
        <PostStar />
        <PostItem />
        <div class="postPage">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[3, 6, 9, 12]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostList from "../../components/post/postLeft";
import PostSearch from "../../components/post/postSearch";
import PostStar from "../../components/post/postStar";
import PostItem from "../../components/post/postItem.vue";

export default {
  data() {
    return {
      total: 0,
      postList: [],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  mounted() {
    this.$axios({
      url: "/posts"
    }).then(res => {
      // console.log(res);
      this.postList = res.data.data;
      console.log(this.postList);
      this.total = this.postList.length;
    });
  },
  components: {
    PostList,
    PostSearch,
    PostStar,
    PostItem
  }
};
</script>

<style lang="less" scoped>
.contianer {
  width: 1000px;
  margin: 20px auto;
  display: flex;
  flex-direction: row;
}

.left {
  width: 270px;
}

.right {
  width: 715px;
  margin-left: 50px;
}

.postPage {
  margin-top: 20px;
  text-align: center;
}
</style>
