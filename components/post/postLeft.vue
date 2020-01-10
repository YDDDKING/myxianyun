<template>
  <div class="postLeft">
    <div class="theLeft">
      <div class="leftTop">
        <div
          v-for="(item, index) in leftList"
          :key="index"
          class="text item"
          @mouseenter="mouseOver(index)"
          @mouseleave="mouseLeave(index)"
        >
          {{ item.type }}
          <i class="el-icon-arrow-right arrow"></i>
        </div>
      </div>

      <!--弹出框内容-->
      <div :class="{ postLeftContent: isShow }">
        <div
          class="postIntro"
          v-for="(child, index) in childList"
          :key="index"
          v-show="childList.length !== 0"
          @mouseenter="mouseOverChild()"
          @mouseleave="mouseLeaveChild()"
        >
          <span class="leftNum">{{ index + 1 }}</span>
          <span class="leftAddress" @click="jumpActical(child.city)">{{
            child.city
          }}</span>
          <span class="leftAddIntro" @click="jumpActical(child.city)">{{
            child.desc
          }}</span>
          <!--<div class="introtext introitem"></div>-->
        </div>
      </div>
    </div>

    <div class="leftBottom">
      <span class="bottomTitle">推荐城市</span>
      <a href="#"><img style="width:260px" src="../../pics/pic_sea.jpeg"/></a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      leftList: [],
      childList: [],
      listIndex: 0,
      childIndex: 0
    };
  },
  methods: {
    jumpActical(Cname) {
      this.$emit("cityList", Cname);

      // // 为了页面渲染空的字符串
      // return "";
    },

    mouseOver(index) {
      this.isShow = !this.isShow;
      this.childList = this.leftList[index].children;
      this.childIndex = index;

      // console.log(index);
      // console.log(this.childList);
    },
    mouseLeave(index) {
      this.isShow = false;
      this.childList = "";
    },
    mouseOverChild() {
      this.isShow = true;
      this.childList = this.leftList[this.childIndex].children;
    },
    mouseLeaveChild() {
      this.isShow = false;
      this.childList = "";
    }
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      // console.log(res);
      this.leftList = res.data.data;
      // console.log(this.leftList)
    });
  }
};
</script>

<style lang="less" scoped>
.theLeft {
  position: relative;
}

.text {
  font-size: 14px;
  border: 1px solid #ddd;
  line-height: 40px;
  border-bottom: 0;
}

.text:hover {
  color: #ffa500;
  border-right: 1px solid #fff;
}

.text:hover .arrow {
  color: #ffa500;
}
div.text:nth-child(4) {
  border-bottom: 1px solid #ddd;
}

.arrow {
  float: right;
  line-height: 40px;
  color: #ccc;
  font-size: 20px;
}
.item {
  padding: 0px 20px;
}

.postLeftContent {
  padding: 10px;
  position: absolute;
  top: 0;
  left: 260px;
  z-index: 999;
  background-color: #fff;
  border: 1px solid #ddd;
}
.postIntro {
  // display: none;
  width: 350px;
  line-height: 40px;
  font-size: 16px;
}

.leftNum {
  margin: 0 5px;
  font-style: italic;
  color: #ffa500;
  font-size: 20px;
}
.leftAddress {
  cursor: pointer;
  color: #ffa500;
  font-size: 16px;
  margin: 0 10px;
}
.leftAddIntro {
  color: #999;
  font-size: 16px;
}

.leftAddIntro:hover {
  text-decoration: underline;
  cursor: pointer;
}
.leftBottom {
  margin-top: 25px;

  img {
    margin-top: 10px;
  }
}
.bottomTitle {
  display: block;
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}
</style>
