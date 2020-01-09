<template>
  <div>
    <!-- 左字右图!-->
    <div
      class="single"
      v-for="(item, index) in postList"
      :key="index"
      v-if="item.images.length < 3"
    >
      <div>
        <img :src="item.images[0]" alt style="width:220px;height:150px" />
      </div>

      <div class="left">
        <p class="title">{{ item.title }}</p>
        <p class="content" v-html="item.summary"></p>
        <p class="info">
          <span
            ><i class="el-icon-location-outline"></i>{{ item.cityName }}</span
          >
          <span><i class="el-icon-view"></i>{{ item.watch }}</span>
        </p>
      </div>
    </div>

    <!-- 上字下图!-->
    <div
      class="single1"
      v-for="(item, index) in postList"
      :key="index"
      v-if="item.images.length >= 3"
    >
      <p class="title">{{ item.title }}</p>
      <p class="content" style="padding: 0px 5px;" v-html="item.summary"></p>
      <div class="imgs" style="overflow:hidden">
        <div v-for="(imgItem, index) in item.images" :key="index">
          <img
            :src="imgItem"
            style="width:220px;height:150px;margin:0px 10px;"
          />
        </div>
      </div>
      <p class="info">
        <span><i class="el-icon-location-outline"></i>{{ item.cityName }}</span>
        <span><i class="el-icon-view"></i>{{ item.watch }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postList: []
    };
  },
  mounted() {
    this.$axios({
      url: "/posts"
    }).then(res => {
      // console.log(res);
      this.postList = res.data.data;
      // console.log(this.postList);
    });
  }
};
</script>

<style lang="less" scoped>
body {
  overflow-x: hidden;
  overflow-y: hidden;
}

.title {
  font-size: 18px;
  padding: 0px 5px;
  margin-bottom: 5px;
}
.info {
  font-size: 12px;
  padding: 5px;
  color: #999;
  > span:nth-of-type(1) {
    padding-right: 15px;
  }
}
.left {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow: hidden;
}
.content {
  color: #666666 !important;
  font-size: 14px;
  padding: 0px 5px;
  line-height: 24px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
}
.single {
  margin-top: 5px;
  padding: 20px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
  flex-wrap: wrap;
  img {
    width: 220px;
    height: 150px;
    object-fit: cover;
    padding-right: 5px;
  }
}
.single1 {
  padding: 20px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-bottom: 1px solid #ccc;

  .imgs {
    flex: 1;
    display: flex;
    padding: 10px 0 0 0;
    margin: 0 5px;
    > img {
      width: 33.33%;
      padding: 0 5px;
      box-sizing: border-box;
      margin: 0 5px;
    }
  }
}
.single2 {
  padding: 15px 0px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-bottom: 1px solid #ccc;
  .myvideo {
    margin: 5px 0;
    width: 100%;
    position: relative;
    > img {
      width: 100%;
      display: block;
    }
    .playbtn {
      width: 50 * 100vw/360;
      height: 50 * 100vw/360;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.1);
      border-radius: 50%;
      box-shadow: 0px 0px 10px #fff;
      text-align: center;
      color: #fff;
      font-size: 40px;
      .van-icon {
        line-height: 50 * 100vw/360;
      }
    }
  }
}
</style>
