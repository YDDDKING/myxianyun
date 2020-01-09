<template>
  <div class="tab">
    <div
      v-for="(item, index) in list"
      :key="index"
      @click="on(index)"
      :class="{ active: myindex === index }"
    >
      <span>{{ item }}</span>
    </div>

    <div v-if="myindex === 0">
      <ul>
        <li>新闻1</li>
        <li>新闻2</li>
        <li>新闻3</li>
      </ul>
    </div>

    <div v-if="myindex === 1">
      <ul>
        <li>体育新闻1</li>
        <li>体育新闻2</li>
        <li>体育新闻3</li>
      </ul>
    </div>

    <div v-if="myindex === 2">
      <ul>
        <li>花边新闻1</li>
        <li>花边新闻2</li>
        <li>花边新闻3</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: ["新闻", "体育新闻", "花边新闻"],
      myindex: 0
    };
  },

  methods: {
    on(index) {
      //   console.log(index)
      this.myindex = index;
    }
  }
};
</script>

<style lang="less" scoped>
.active {
  color: red;
}
</style>
