<template>
  <div class="postDetailRight">
    <div class="postDetailRightTitle">
      <span>相关攻略</span>
    </div>

    <div
      class="postDetailRightItem"
      v-for="(item, index) in postDetailItemRightList"
      :key="index"
    >
      <div class="postDetailItemLeft">
        <img :src="item.images[0]" style="width:100px;height:80px" />
      </div>

      <div class="postDetailItemRight">
        <p>{{ item.title }}</p>
        <span>{{ item.created_at | formatDate }} 阅读 {{ item.watch }}</span>
      </div>
    </div>
  </div>
</template>

<script src="moment.js"></script>
<script>
export default {
  data() {
    return {
      postDetailItemRightList: {}
    };
  },
  mounted() {
    this.$axios({
      url: "/posts/recommend"
    }).then(res => {
    //   console.log(res);
      this.postDetailItemRightList = res.data.data;
      // console.log(this.postDetailItemRightList);
    });
  },
  methods: {},
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
.postDetailRightTitle > span {
  font-size: 18px;
}
.postDetailRightTitle {
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}

.postDetailRightItem {
  display: flex;
  margin-top: 20px;
  border-bottom: 1px solid #ccc;
  padding-bottom: 15px;
}

.postDetailItemRight {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
}

.postDetailItemRight > span {
  font-size: 12px;
  color: #999;
}
</style>
