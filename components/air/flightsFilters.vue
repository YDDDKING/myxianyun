<template>
  <div class="filters">
    <el-row
      type="flex"
      class="filters-top"
      justify="space-between"
      align="middle"
    >
      <el-col :span="8">
        单程：
        {{ data.info.departCity }} - {{ data.info.destCity }}
        /
        {{ data.info.departDate }}
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="airport"
          placeholder="起飞机场"
          @change="handleAirport"
        >
          <el-option
            v-for="(item, index) in data.options.airport"
            :key="index"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="flightTimes"
          placeholder="起飞时间"
          @change="handleFlightTimes"
        >
          <el-option
            v-for="(item, index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="company"
          placeholder="航空公司"
          @change="handleCompany"
        >
          <el-option
            v-for="(item, index) in data.options.company"
            :key="index"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select
          size="mini"
          v-model="airSize"
          placeholder="机型"
          @change="handleAirSize"
        >
          <el-option
            :label="item.name"
            v-for="(item, index) in sizeOptions"
            :value="item.size"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button
        type="primary"
        round
        plain
        size="mini"
        @click="handleFiltersCancel"
      >
        撤销
      </el-button>
    </div>
    <!-- 随便调用为了函数可以执行 -->
    <span>{{ filterData }}</span>
  </div>
</template>

<script>
export default {
  props: {
    // 传入的总数据
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      airport: "", // 机场
      flightTimes: "", // 出发时间
      company: "", // 航空公司
      airSize: "", // 机型大小

      sizeOptions: [
        { name: "大", size: "L" },
        { name: "中", size: "M" },
        { name: "小", size: "S" }
      ]
    };
  },
  methods: {
    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport = "";
      this.flightTimes = "";
      this.company = "";
      this.airSize = "";
    },
    // 选择机场时候触发
    handleAirport(value) {},

    // 选择出发时间时候触发
    handleFlightTimes(value) {},

    // 选择航空公司时候触发
    handleCompany(value) {},

    // 选择机型时候触发
    handleAirSize(value) {},

    // 撤销条件时候触发
    handleFiltersCancel() {}
  },
  computed: {
    // 用于监听选项的变化，返回过滤后符合条件的数组，返回给父组件
    filterData() {
      const arr = this.data.flights.filter(item => {
        // 默认每条数据都是符合条件
        let valid = true;

        if (this.airport && item.org_airport_name !== this.airport) {
          valid = false;
        }

        // 起飞时间
        if (this.flightTimes) {
          const [from, to] = this.flightTimes.split(",");
          // 出发时间的小时
          const start = +item.dep_time.split(":")[0];
          if (start < from || start >= to) {
            valid = false;
          }
        }

        if (this.company && item.airline_name !== this.company) {
          valid = false;
        }

        if (this.airSize && item.plane_size !== this.airSize) {
          valid = false;
        }

        return valid;
      });

      this.$emit("selectList", arr);

      // 为了页面渲染空的字符串
      return "";
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>
