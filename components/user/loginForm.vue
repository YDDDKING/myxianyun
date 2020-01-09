<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model:value="form.username">
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input
        placeholder="密码"
        type="password"
        v-model:value="form.password"
      >
      </el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">
      登录
    </el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    var validateUser = (rule, value, callback) => {
      // console.log(value)
      let reg = /^1[3-9]{1}\d{9}$/;
      // console.log(reg.test(value))
      if (reg.test(value) === true) {
        callback();
      } else {
        callback(new Error("请输入11位数字的手机号"));
      }
    };
    return {
      // 表单数据
      form: {
        username: "",
        password: ""
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: validateUser, trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      //   console.log(this.form);

      this.$refs["form"].validate(valid => {
        // console.log(valid);
        if (!valid) return;

        if (valid) {
          // console.log(this.$store.state.user)

          this.$store.dispatch("user/Login", this.form).then(res => {
            // console.log(this.$store.state.user);

            if (res === true) {
              this.$message.success("登录成功");
            }
          });
        }
        
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
