<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <FlightsFilters :data="cacheFlightsData" @selectList="selectList" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <div>
          <FlightsItem
            v-for="(item, index) in dataList"
            :key="index"
            :data="item"
          />

          <el-pagination
            style="text-align:center"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from "../../components/air/flightsListHead.vue";
import FlightsItem from "../../components/air/flightsItem.vue";
import FlightsFilters from "../../components/air/flightsFilters.vue";
import FlightsAside from "../../components/air/flightsAside";

import moment from "moment";

export default {
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  data() {
    return {
      pageIndex: 1, // 当前页数
      pageSize: 5, // 显示条数
      total: 0,

      allData: {},
      dataList: {},
      // 缓存的变量，当该变量一旦被赋值之后不会被修改
      cacheFlightsData: {
        info: {},
        options: {},
        flights: []
      }
    };
  },
  methods: {
    selectList(arr) {
      // console.log(arr)
      this.dataList = arr;
      this.pageData();
    },

    setDataList() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        //   console.log(res);
        this.allData = res.data;
        this.cacheFlightsData = { ...res.data };
        this.dataList = this.allData.flights;
        this.total = this.dataList.length;
        // console.log(this.dataList);
        // console.log(this.allData);
        this.pageData();
      });
    },

    // 设置分页的数据
    pageData() {
      const start = (this.pageIndex - 1) * this.pageSize;
      const end = start + this.pageSize;
      //   console.log(start,end)
      this.total = this.dataList.length;
      this.dataList = this.dataList.slice(start, end);
      //   console.log(this.dataList);
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
    }
  },

  watch: {
    $route() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        //   console.log(res);
        this.allData = res.data;
        this.cacheFlightsData = { ...res.data };
        this.dataList = this.allData.flights;
        this.total = this.dataList.length;
        // console.log(this.dataList);
        // console.log(this.allData);
        this.pageData();
      });
    }
  },

  mounted() {
    this.setDataList();
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>
