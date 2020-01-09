<template>
  <el-form :model="form" ref="ruleForm" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model:value="form.username">
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model:value="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">
            发送验证码
          </el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model:value="form.nickname">
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="pass">
      <el-input
        placeholder="密码"
        type="password"
        v-model:value="form.pass"
      ></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPass">
      <el-input
        placeholder="确认密码"
        type="password"
        v-model:value="form.checkPass"
      >
      </el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">
      注册
    </el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    //   验证用户名是否符合规则
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

    // 验证昵称是否合法
    var validateNickname = (rule, value, callback) => {
      //   console.log(value)
      let reg = /^[\\u4e00-\\u9fa5_a-zA-Z0-9-]{1,16}$/;
      // console.log(reg.test(value));
      if (reg.test(value) === true) {
        callback();
      } else {
        callback(new Error("限16个字符，支持中英文、数字、减号或下划线"));
      }
    };

    // 验证是否有输入密码
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.pass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };

    // 验证第一次密码与第二次密码是否相同
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      // 表单数据
      form: {
        username: "",
        pass: "",
        checkPass: "",
        nickname: "",
        captcha: ""
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: "请输入用户手机", trigger: "blur" },
          { validator: validateUser, trigger: "blur" }
        ],
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        nickname: [{ validator: validateNickname, trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      //   console.log(this.form.username);
      // 如果手机号为空
      // if (this.form.username === "") {
      //   this.$message({
      //     message: "请输入手机号",
      //     type: "warning"
      //   });
      // }

      // 如果手机号不符合格式
      if (this.form.username.length !== 11 && this.form.username !== "") {
        this.$message({
          message: "请输入正确的手机号",
          type: "warning"
        });
        return
      }

      this.$axios({
        url: "/captchas",
        method: "POST",
        data: {
          tel: this.form.username
        }
      }).then(res => {
        console.log(res);
        let yanzheng = res.data.code;

        // 弹出验证码
        this.$alert("000000是您本次的短信验证码，5分钟内有效。", "尊敬的用户", {
          confirmButtonText: "确定"
          // callback: action => {

          //   this.$message({
          //     type: "info",
          //     message: `action: ${action}`
          //   });
          // }
        });
      });
    },

    // 注册
    handleRegSubmit() {
      console.log(this.form);

      this.$refs['ruleForm'].validate(valid => {
        console.log(valid)
        
        if (valid) {
          this.$axios({
            url: `/accounts/register`,
            method: "POST",
            data: {
              username: this.form.username,
              nickname: this.form.nickname,
              captcha: this.form.captcha,
              password: this.form.pass
            }
          }).then(res => {
            this.$message.success("注册成功，返回登录页面");
            this.$router.push({path:'/user/Login'});
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
