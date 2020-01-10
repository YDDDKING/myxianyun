<template>
  <div>
    <div class="contianer">
      <div class="left">
        <PostList @cityList="cityList" />
      </div>
      <div class="right">
        <PostSearch @tuijian="cityList" @search="cityList" />
        <PostStar />
        <PostItem
          v-for="(item, index) in postList"
          :key="index"
          :data="item"
          @toDetail="toDetail"
        />
        <div class="postPage">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[3, 6, 9, 12]"
            :page-size="pageSize"
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
      keepList: [],
      pageIndex: 1, // 当前页数
      pageSize: 3 // 显示条数
    };
  },
  methods: {
    toDetail(data) {
      // console.log(data);

      this.$axios({
        url: "/posts",
        params: {
          city: data
        }
      }).then(res => {
        // console.log(res);
        if (res.status === 200) {
          this.$router.push({
            path: "post/detail?id=" + data,
            query: {
              id: data
            }
          });
        }
      });
    },

    cityList(data) {
      console.log(data);

      this.$axios({
        url: "/posts",
        params: {
          city: data
        }
      }).then(res => {
        // console.log(res);
        this.postList = res.data.data;

        // console.log(this.postList);
        this.total = this.postList.length;
        this.pageData();
      });
    },
    setDataList() {
      this.$axios({
        url: "/posts"
      }).then(res => {
        // console.log(res);
        this.postList = res.data.data;
        console.log(this.postList);
        // console.log(this.postList);
        this.total = this.postList.length;
        this.pageData();
      });
    },

    handleSizeChange(val) {
      //   console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.pageIndex = 1;
      this.setDataList();
    },

    handleCurrentChange(val) {
      //   console.log(`当前页: ${val}`);
      this.pageIndex = val;
      this.setDataList();
    },

    pageData() {
      const start = (this.pageIndex - 1) * this.pageSize;
      const end = start + this.pageSize;
      //   console.log(start,end)
      this.total = this.postList.length;
      this.postList = this.postList.slice(start, end);
      //   console.log(this.postList);
    }
  },
  mounted() {
    this.setDataList();
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
