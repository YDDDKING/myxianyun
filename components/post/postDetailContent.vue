<template>
  <div>
    <!--标题部分-->
    <div class="postDetailTitle">
      <h1>
        {{ contentList.title }}
      </h1>
      <hr />
      <div class="postDetailTitlePart">
        <span>攻略：{{ contentList.created_at | formatDate }}</span
        >&nbsp;&nbsp;&nbsp;
        <span>阅读：{{ contentList.watch }}</span>
      </div>
    </div>

    <!--内容部分-->
    <div class="postDetailText" v-html="contentList.content"></div>

    <!--功能部分-->
    <div class="postDetailFuc">
      <div>
        <i class="el-icon-edit-outline firstFuc"></i>
        <div>评论(100)</div>
      </div>
      <div @click="setStar">
        <i class="el-icon-star-off secondFuc"></i>
        <div>收藏</div>
      </div>
      <div>
        <i class="el-icon-share thirdFuc"></i>
        <div>分享</div>
      </div>
      <div @click="setZan">
        <i class="el-icon-thumb fourthFuc"></i>
        <div>点赞(75)</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contentList: {}
    };
  },
  methods: {
    setStar() {
      // if (this.contentList.like.star === true) {
      //   this.$message({
      //     message: "已收藏",
      //     type: "warning"
      //   });
      //   return;
      // }

      // this.$message({
      //   message: "收藏成功",
      //   type: "success"
      // });
      // this.contentList.like.star = true;
      let idNum = this.$route.query.id;
      this.$axios({
        url: "/posts/star",
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        },
        params: {
          id: idNum
        }
      }).then(res => {
        // console.log(res);
        this.$message({
          message: "res.data.message",
          type: "success"
        });
      });
    },
    setZan() {
      let idNum = this.$route.query.id;

      this.$axios({
        url: "/posts/like",
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        },
        params: {
          id: this.contentList.id
        }
      }).then(res => {
        // console.log(res);
        this.$message({
          message: "res.data.message",
          type: "success"
        });
      });
    }
  },
  mounted() {
    let idNum = this.$route.query.id;
    // console.log(idNum);

    this.$axios({
      url: "/posts",
      params: {
        city: idNum
      }
    }).then(res => {
      if (res.status === 200) {
        // if (res.data.data[0].like === null) {
        //   res.data.data[0].like = {
        //     star: false,
        //     zan: false
        //   };
        // }
        this.contentList = res.data.data[0];
        // console.log(this.contentList);
      }
      //   console.log(res);
    });
  },
  filters: {
    formatDate: function(value) {
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    }
  }
};
</script>

<style lang="less" scoped>
hr {
  margin: 20px 0;
  color: #333;
}
.postDetailTitle {
  margin-bottom: 20px;
}
.postDetailTitlePart {
  padding: 0 10px;
  color: #999;
  text-align: right;
}

/deep/.postDetailText img {
  max-width: 700px;
  height: auto;
  margin: 10px 0;
}

.postDetailFuc {
  display: flex;
  justify-content: center;
  text-align: center;
  margin: 50px auto 30px;
}

.postDetailFuc div {
  color: #999;
  font-size: 14px;
}

.firstFuc {
  padding: 0 20px;
  color: #ffa500;
  font-size: 38px;
}
.firstFuc:hover {
  cursor: pointer;
}

.secondFuc {
  padding: 0 20px;
  color: #ffa500;
  font-size: 38px;
}
.secondFuc:hover {
  cursor: pointer;
}

.thirdFuc {
  padding: 0 20px;
  color: #ffa500;
  font-size: 38px;
}
.thirdFuc:hover {
  cursor: pointer;
}

.fourthFuc {
  padding: 0 20px;
  color: #ffa500;
  font-size: 38px;
}
.fourthFuc:hover {
  cursor: pointer;
}
</style>
