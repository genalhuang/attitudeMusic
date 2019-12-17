<template>
  <div class="music">
    <div class="music-content">
      <div>ATM</div>
      <a-dropdown>
        <a class="ant-dropdown-link" href="#" v-if='!isAccount'> 账号管理 <a-icon type="down" /> </a>
        <a class="ant-dropdown-link" href="#" v-if='isAccount'> {{username}} <a-icon type="down" /> </a>
        <a-menu slot="overlay">
          <a-menu-item  v-if='!isAccount'>
            <a href="javascript:;" @click='login'>登录</a>
          </a-menu-item>
          <a-menu-item v-if='!isAccount'>
            <a href="javascript:;"  @click='register'>注册</a>
          </a-menu-item>
          <a-menu-item v-if='isAccount'>
            <a href="javascript:;" @click='out'>退出</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <a-modal title="" v-model="showDialog" @ok='confirm' okText="确认" cancelText="取消">
        <div class="music-register">
          账号:<a-input v-model='username'></a-input>
          密码:<a-input v-model='password'></a-input>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { accountRegister, accountLogin } from 'api/account'
export default {
  name: 'Music',
  components: {
  },
  data() {
    return {
      showDialog : false,
      username: '',
      password: '',
      isAccount: false,
      type: ''
    }
  },
  methods: {
    register() {
      this.type = 'register';
      this.username = '';
      this.password = '';
      this.showDialog = true
    },
    login() {
      this.type = 'login';
      this.username = '';
      this.password = '';
      this.showDialog = true
    },
    async confirm() {
      this.showDialog = false;
      let data;
      if (this.type === 'register') {
        data = await accountRegister(this.username, this.password)
      } else if (this.type === 'login') {
        data = await accountLogin(this.username, this.password)
      }
      if(typeof data.data === 'object' ) {
        this.isAccount = true;
        this.$message.success(data.data.username + ', 欢迎登录！')
        this.username = data.data.username
        this.$store.commit('setUserInfo', data.data);
      } else {
        this.$message.error(data.data)
      }
    },
    out() {
      this.$message.success('退出成功');
      this.isAccount = false;
    }
  }
}

</script>

<style scoped lang="less" >
 .music {
   .music-content {
      text-align: center;
      height: 10vh;
      font-size: 30px;
      background-color: @attitude_color;
      line-height: 10vh;
      color: #fff;
      .ant-dropdown-link {
        position: fixed;
        right: 30px;
        top: 0px;
        height: 80px;
        color: #fff;
        font-size: @font_size_large_x;
      }
      .music-register {
        display: flex;
        color: red;
      }
   }
 }
</style>
