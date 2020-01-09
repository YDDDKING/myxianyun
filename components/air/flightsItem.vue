<template>
  <div class="flight-item">
    <div @click="showInfo">
      <!-- 显示的机票信息 -->
      <el-row type="flex" align="middle" class="flight-info">
        <el-col :span="6">
          <span>{{ data.airline_name }} </span> {{ data.flight_no }}
        </el-col>
        <el-col :span="12">
          <el-row
            type="flex"
            justify="space-between"
            class="flight-info-center"
          >
            <el-col :span="8" class="flight-airport">
              <strong>{{ data.dep_time }}</strong>
              <span
                >{{ data.org_airport_name }}{{ data.org_airport_quay }}</span
              >
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{ rankTime }}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{ data.arr_time }}</strong>
              <span
                >{{ data.dst_airport_name }}{{ data.dst_airport_quay }}</span
              >
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥<span class="sell-price">{{ data.base_price / 2 }}</span
          >起
        </el-col>
      </el-row>
    </div>

    <div class="flight-recommend">
      <!-- 隐藏的座位信息列表 -->
      <el-row type="flex" justify="space-between" align="middle" v-if="isShow">
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row
            v-for="(item, index) in data.seat_infos"
            :key="index"
            type="flex"
            justify="space-between"
            align="middle"
            class="flight-sell"
          >
            <el-col :span="16" class="flight-sell-left">
              <span>{{ item.group_name }}</span> | {{ item.supplierName }}
            </el-col>
            <el-col :span="5" class="price"> ￥{{ item.par_price }} </el-col>
            <el-col :span="3" class="choose-button">
              <el-button
                type="warning"
                size="mini"
                @click="jumpChoose(data.id, item.seat_xid)"
              >
                选定
              </el-button>
              <p>剩余：{{ item.discount }}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 数据
    data: {
      type: Object,
      // 默认是空数组
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      isShow: false
    };
  },
  methods: {
    showInfo() {
      //   console.log('111')
      this.isShow = !this.isShow;
    },
    jumpChoose(id, seatxid) {
      // console.log(id,seat_xid)
      this.$router.push({
        path: "/air/order",
        query: {
          id,
          seat_xid: seatxid
        }
      });
    }
  },
  computed: {
    rankTime() {
      //   console.log('111')
      // 获取出发时间和到达时间
      let startTime = this.data.dep_time;
      let endTime = this.data.arr_time;

      // 将时间拆分成数组
      let startList = startTime.split(":");
      let endList = endTime.split(":");

      // 将时间化为分钟
      let start = startList[0] * 60 + +startList[1];
      let end = endList[0] * 60 + +endList[1];

      //   console.log(start, end);
      // 如果出发时间大于到达时间的话
      if (start >= end) {
        end = end + 24 * 60;
        // console.log(start)
      }

      // 用到达时间减去出发时间得出时间差
      let mid = end - start;
      // console.log(mid);
      let hour = Math.floor(mid / 60);
      let min = mid % 60;
      //   console.log(hour,min)

      return `${hour}时${min}分`;
    }
  },
  mounted() {}
};
</script>

<style scoped lang="less">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>
