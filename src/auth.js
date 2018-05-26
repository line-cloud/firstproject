import common from './common/js/common';
import $ from 'zeptojs';

/* globals localStorage */
function pretendRequest (username, pass, cb) {
    $.ajax({
        url: 'http://www.qdzone.cn/biz_nyg/nyg/auth/login',
        data:{
           username: username,
           pwd: pass
        },
        success: function (res) {
            if (cb) cb(res)
        }
    })
}

export default {
  login (email, pass, cb) {
    /* eslint no-param-reassign:0 */
    /* eslint prefer-rest-params:0 */
    cb = arguments[arguments.length - 1]
    // if (localStorage.token) {
    //   if (cb) cb(true)
    //   this.onChange(true)
    //   return
    // }
    pretendRequest(email, pass, (res) => {
      if (res && res.ret == 0) {
        if (cb) cb(true)
        this.onChange(true)
      } else {
        if (cb) cb(false)
        this.onChange(false)
      }
    })
  },

  getToken () {
    return localStorage.token
  },

  logout (cb) {
    delete localStorage.token
    if (cb) cb()
    this.onChange(false)
  },

  loggedIn () {
    console.log(!!common.cookie('token'));
    return !!common.cookie('token');
  },

  onChange () {}
}
