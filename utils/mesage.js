// 引入公用的接口
import {GetActiveUser} from "./axios"

var weixinId = wx.getStorageSync('oppenid')

const result= GetActiveUser({weixinId:weixinId}).then(res=>{
   return res
  }
)
// 导出
export {
    result
}
