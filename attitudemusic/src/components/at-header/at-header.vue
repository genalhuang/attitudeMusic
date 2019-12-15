<template>
  <div class="music">
    <div class="music-content">
      <div>ATM</div>
      <a-dropdown>
        <a class="ant-dropdown-link" href="#" v-if='!isAccount'> 账号管理 <a-icon type="down" /> </a>
        <a class="ant-dropdown-link" href="#" v-if='isAccount'> {{accountName}} <a-icon type="down" /> </a>
        <a-menu slot="overlay">
          <a-menu-item  v-if='!isAccount'>
            <a href="javascript:;" @click='register'>登录</a>
          </a-menu-item>
          <a-menu-item v-if='!isAccount'>
            <a href="javascript:;"  @click='register'>注册</a>
          </a-menu-item>
          <a-menu-item v-if='isAccount'>
            <a href="javascript:;" @click='out'>退出</a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <a-modal title="" v-model="showregister" @ok='confirmRegister' okText="确认" cancelText="取消">
        <div class="music-register">
          账号:<a-input v-model='account'></a-input>
          密码:<a-input v-model='password'></a-input>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<script>
import { accountEnter } from 'api/account'
export default {
  name: 'Music',
  components: {
  },
  data() {
    return {
      showregister : false,
      account: '',
      password: '',
      accountName: '',
      isAccount: false
    }
  },
  methods: {
    register() {
      this.account = '';
      this.password = '';
      this.showregister = true
    },
    async confirmRegister() {
      this.showregister = false;
      let data = await accountEnter(this.account, this.password)
      if(data.status === 200 ) {
        this.accountName = data.data.account
        this.isAccount = true;
        this.$message.success('登录成功')
      } else {
        this.$message.error('登录失败')
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
