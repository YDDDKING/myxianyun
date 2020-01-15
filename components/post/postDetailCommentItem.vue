<template>
  <div class="commentitem">
    <mycomment v-if="data.parent" :data="data.parent" />
    <div class="head">
      <div>
        <span class="commentUsername">{{ data.account.nickname }}</span
        >&nbsp;
        <span>{{ data.created_at | formatDate }}</span>
      </div>
    </div>
    <div class="text">{{ data.content }}<span>回复</span></div>
  </div>
</template>

<script>
export default {
  name: "mycomment",
  data() {
    return {};
  },
  props: {
    // 传入的总数据
    data: {
      type: Object,
      default() {
        return {};
      }
    }
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
  methods: {}
};
</script>

<style lang="less" scoped>
.commentitem {
  padding: 10px 0;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  margin: 10px 25px;

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
    padding: 10px 0 0 10px;
    position: relative;

    span {
      position: absolute;
      right: 0;
      bottom: 0;

      font-size: 14px;
    }
  }
}
</style>
