<template>
  <div class="postCreateAddress">
    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryAddress"
          placeholder="请搜索游玩城市"
          @select="handleAddress"
          class="el-autocomplete"
          v-model:value="createAdd"
        ></el-autocomplete>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      createAdd: ""
    };
  },
  methods: {
    queryAddress(value, cb) {
      if (value.trim() === "") {
        cb([]);
        return;
      }

      // 根据输入框value值发起请求
      this.$axios({
        url: "/cities"
      }).then(res => {
        console.log(res);

        // // 循环给data中每一项添加一个value属性，并且没有市字的
        // this.departData = data.map(v => {
        //   v.value = v.name.replace("市", "");
        //   return v;
        // });

        // cb(this.departData);
      });
    },

    // 出发城市下拉选择时触发
    handleAddress(item) {
      this.form.departCode = item.sort;
      // console.log(item)
    }
  }
};
</script>

<style lang="less" scoped>
.postCreateAdd {
  font-size: 14px;
  color: #606266;
}
</style>
