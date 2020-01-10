<template>
  <div>
    <!--标题部分-->
    <div>
      <h3 class="postCreateh3">发表新攻略</h3>
      <span class="postCreateSpan">分享你的个人游记，让更多人看到哦！</span>
      <div class="postCreateNone">111</div>
      <el-input
        v-model="input"
        placeholder="请输入标题"
        ref="editorTitle"
      ></el-input>
    </div>

    <!--编辑器部分-->
    <div id="app">
      <VueEditor :config="config" class="myEditor" ref="editorContent" />
    </div>

    <!--选择城市部分-->
    <div class="postCreateAddress">
      <el-form class="search-form-content" ref="form" label-width="80px">
        <el-form-item label="选择城市">
          <!-- fetch-suggestions 返回输入建议的方法 -->
          <!-- select 点击选中建议项时触发 -->
          <el-autocomplete
            :fetch-suggestions="queryAddress"
            placeholder="请搜索游玩城市"
            class="el-autocomplete"
            v-model:value="createAdd"
          ></el-autocomplete>
        </el-form-item>
      </el-form>
    </div>

    <!--发布及存草稿部分-->
    <div class="postCreateBtn">
      <el-button type="primary" @click="sendActrical">发布</el-button>
      <span
        >或者<span class="caogao" @click="keepCaogao">保存至草稿</span></span
      >
    </div>
  </div>
</template>

<script>
import "quill/dist/quill.snow.css";
let VueEditor;

if (process.browser) {
  VueEditor = require("vue-word-editor").default;
}

export default {
  components: {
    VueEditor
  },
  data() {
    return {
      departCity: "", //选择城市
      caogao: {
        caogaoTitle: "",
        caogaoContent: ""
      },
      cacheCaogao: {},
      createAdd: "",
      input: "",

      config: {
        // 上传图片的配置
        uploadImage: {
          url: "http://127.0.0.1:1337/upload",
          name: "files",

          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess(res, insert) {
            insert("http://127.0.0.1:1337" + res.data[0].url);
            console.log(res);
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: "http://127.0.0.1:1337/upload",
          name: "files",
          uploadSuccess(res, insert) {
            insert("http://127.0.0.1:1337" + res.data.url);
          }
        }
      }
    };
  },
  methods: {
    // 发布文章
    sendActrical() {
      // console.log("111");
      // console.log(this.createAdd);
      this.$axios({
        url: "/posts",
        method: "POST",
        headers: {
          Authorization: "Bearer " + this.$store.state.user.userInfo.token
        },
        data: {
          content: this.$refs.editorContent.editor.root.innerText,
          title: this.$refs.editorTitle.$refs.input.value,
          city: this.createAdd
        }
      }).then(res => {
        console.log(res);
        if (res.status === 200) {
          this.$router.back();
        }
      });
    },
    setToken() {
      let token = this.$store.state.user.userInfo.token;
      console.log(token);
      return {
        Authorization: token
      };
    },
    keepCaogao() {
      // console.log(this.$refs.editorTitle.$refs.input.value);
      // console.log(this.$refs.editorContent.editor.root.innerText);
      this.caogao.caogaoTitle = this.$refs.editorTitle.$refs.input.value;
      this.caogao.caogaoContent = this.$refs.editorContent.editor.root.innerText;
      this.cacheCaogao = { ...this.caogao };
      this.$store.commit("post/setCaogao", this.cacheCaogao);
      // console.log(this.$store.state.post.caogao);
      // console.log(this.$store.state.post.caogao);
    },

    queryAddress(value, cb) {
      if (value.trim() === "") {
        cb([]);
        return;
      }

      // 根据输入框value值发起请求
      this.$axios({
        url: "/airs/city",
        params: {
          name: value
        }
      }).then(res => {
        const { data } = res.data;

        // 循环给data中每一项添加一个value属性，并且没有市字的
        this.departData = data.map(v => {
          v.value = v.name.replace("市", "");
          return v;
        });

        cb(this.departData);
      });
      this.creatAdd = value;
    }
  },
  name: "app",

  mounted() {}
};
</script>

<style lang="less" scoped>
.postCreateh3 {
  font-weight: 400;
  font-size: 22px;
  margin-bottom: 7px;
}
.postCreateNone {
  color: #fff;
  font-size: 5px;
}
.postCreateSpan {
  margin-bottom: 10px;
  font-size: 12px;
  color: #999;
}

#app {
  margin-top: 20px;
  height: 458px;
  width: 750px;
}

.myEditor {
  height: 399px;
  width: 750px;
}

.postCreateAdd {
  margin: 50px 0;
  font-size: 14px;
  color: #606266;
}

.postCreateBtn {
  margin-top: 15px;
}
.caogao {
  margin: 0 5px;
  color: orange;
}
.caogao:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
