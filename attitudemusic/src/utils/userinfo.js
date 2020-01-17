import Cookie from 'js-cookie'
import vuex from '../store'
export const saveUserInfo = function saveUserInfo() {
  let userInfo = Cookie.get('userInfo');
  if(!userInfo) {
    return;
  }
  userInfo = JSON.parse(userInfo)
  if (userInfo) {
    vuex.state.user = userInfo
  }
}

