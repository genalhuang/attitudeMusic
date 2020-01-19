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
export const saveHistoryList = function saveHistoryList() {
  let historyList = Cookie.get('historyList');
  if(!historyList) {
    return;
  }
  historyList = JSON.parse(historyList)
  if (historyList) {
    vuex.state.historyList = historyList
  }
}

