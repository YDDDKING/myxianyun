<template>
  <div class="postRightBox">
    <div class="searchTop">
      <el-input
        placeholder="请输入想去的地方，比如:'广州'"
        v-model="input"
        clearable
        class="postSearch"
        @keyup.enter.native="onEnter"
      >
      </el-input>
      <i class="el-icon-search icon"></i>
    </div>

    <div class="searchBottom">
      推荐：
      <span class="searchBottomAdd one" @click="tuijian('广州')">广州</span>
      <span class="searchBottomAdd two" @click="tuijian('上海')">上海</span>
      <span class="searchBottomAdd three" @click="tuijian('北京')">北京</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input: ""
    };
  },
  methods: {
    tuijian(data) {
      // console.log(data);
      this.$emit("tuijian", data);
    },
    onEnter() {
      let value = this.input;
      // console.log(this.input);
      this.$emit("search", value);
    }
  }
};
</script>

<style lang="less" scoped>
/deep/.postSearch {
  outline: none;
  border-color: none;
  border: 4px solid #ffa500;
}

/deep/.el-input__inner {
  border: 0;
}
/deep/.postSearch:active {
  outline: none;
}

/deep/.postSearch:focus {
  outline: none;
  border: 0;
}

.postRightBox {
  position: relative;
}
.icon {
  color: #ffa500;
  font-size: 23px;
  font-weight: 600;

  position: absolute;
  top: 13px;
  right: 10px;
}

.searchBottom {
  margin: 10px 0px;
  color: #666;
  font-size: 14px;
}

.searchBottomAdd {
  color: #666;
  font-size: 14px;
}
.searchBottomAdd:hover {
  color: #ffa500;
  text-decoration: underline;
  cursor: pointer;
}
</style>
