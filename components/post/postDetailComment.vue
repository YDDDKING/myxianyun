<template>
  <div class="postDetailComment">
    <span class="postDetailCommentTitle">评论</span>
    <p>111</p>
    <el-input
      v-model="input"
      placeholder="说点什么吧..."
      class="detailComment1"
    ></el-input>

    <div class="commentOpe">
      <div>
        <el-upload action="#" list-type="picture-card" :auto-upload="false">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{ file }">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </div>

      <div><el-button type="primary">提交</el-button></div>
    </div>

    <div class="commentContent">
      <div class="commentList">
        <div class="item" v-for="(item, index) in commentList" :key="index">
          <div class="head">
            <img :src="item.account.defaultAvatar" alt />
            <div>
              <span class="commentUsername">{{ item.account.nickname }}</span
              >&nbsp;
              <span>{{ item.created_at | formatDate }}</span>
            </div>
          </div>

          <commentItem v-if="item.parent" :data="item.parent" />

          <div class="text">{{ item.content }}<span>回复</span></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commentItem from "./postDetailCommentItem";

export default {
  data() {
    return {
      commentList: [],
      input: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    };
  },
  methods: {
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    }
  },
  mounted() {
    let idNum = this.$route.query.id;
    // console.log(idNum);
    this.$axios({
      url: "/posts/comments",
      params: {
        post: idNum
      }
    }).then(res => {
      // console.log(res);
      if (res.status === 200) {
        this.commentList = res.data.data;
        console.log(this.commentList);
      }

      this.commentList = res.data.data.map(value => {
        value.account.defaultAvatar =
          "http://127.0.0.1:1337" + value.account.defaultAvatar;
        return value;
      });
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
  },
  components: {
    commentItem
  }
};
</script>

<style lang="less" scoped>
.postDetailComment > p {
  color: #fff;
}

.detailComment1 {
  height: 60px;
}

.commentOpe {
  display: flex;
  justify-content: space-between;
}

.commentList {
  margin-top: 30px;
  border: 1px solid #ccc;
  padding: 0 15px;

  
  .item {
    padding: 10px 0;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 16px;
        height: 16px;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;

        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }

        .commentUsername {
          color: #666;
          font-size: 12px;
        }
      }
    }
    .text {
      font-size: 18px;
      color: #333;
      padding: 10px 0 0;
      padding: 0 0 0 30px;
      position: relative;

      span {
        position: absolute;
        right: 0;
        bottom: 0;

        font-size: 14px;
      }
    }
  }
  .more {
    width: 100px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 15px;
    margin: 20px auto;
    font-size: 13px;
  }
}
</style>
