<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额 <span class="pay-price">￥ {{ price }}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row
          type="flex"
          justify="space-between"
          align="middle"
          class="pay-qrcode"
        >
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt="" />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";

export default {
  data() {
    return {
      token: "",
      price: 0,
      timer: null
    };
  },
  methods: {
    isPay(data) {
      //   console.log('data',data)
      return this.$axios({
        url: "/airorders/checkpay",
        method: "POST",
        headers: {
          Authorization: `Bearer ${this.token}`
        },
        data: {
          id: this.$route.query.id,
          nonce_str: data.nonce_str,
          out_trade_no: data.order_no
        }
      }).then(res => {
        console.log(res);
        const { statusTxt } = res.data;

        if (statusTxt !== "订单未支付") {
          this.$message.success("支付成功！");
          return Promise.resolve(true);
        }

        return Promise.resolve(false);
      });
    }
  },
  destroyed() {
    clearInterval(this.timer);
  },
  mounted() {
    // console.log(this.$route.query)
    // console.log(this.$store.state.user);

    // console.log(id)
    setTimeout(v => {
      this.token = this.$store.state.user.userInfo.token;
      const id = this.$route.query.id;

      this.$axios({
        url: `/airorders/${id}`,
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }).then(res => {
        console.log(res);
        this.price = res.data.price;
        let code = res.data.payInfo.code_url;
        let payInfo = res.data.payInfo;

        const stage = document.querySelector("#qrcode-stage");
        QRCode.toCanvas(stage, code, { width: 300 });

        this.timer = setInterval(async () => {
          const isResolve = await this.isPay(payInfo);
          console.log(isResolve);

          if (isResolve) {
            clearInterval(this.timer);

            this.$router.push({
              path: "/air"
            });
          }
        }, 3000);
      });
    }, 1);
  }
};
</script>

<style scoped lang="less">
.container {
  background: #f5f5f5;
  padding: 30px 0;

  .main {
    width: 1000px;
    margin: 0 auto;

    .pay-title {
      text-align: right;
      span {
        font-size: 28px;
        color: orangered;
      }
    }

    .pay-main {
      background: #fff;
      margin-top: 10px;
      border-top: 5px orange solid;
      padding: 30px;

      h4 {
        font-size: 28px;
        font-weight: normal;
        margin-bottom: 10px;
      }

      .pay-qrcode {
        padding: 0 80px;
      }

      .qrcode {
        border: 1px #ddd solid;
        padding: 15px;
        height: fit-content;

        #qrcode-stage {
          width: 200px;
          height: 200px;
          margin-bottom: 10px;
        }

        p {
          line-height: 2;
          text-align: center;
        }
      }
    }
  }
}
</style>
