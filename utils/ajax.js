// 服务器基础地址
const baseUrl = "https://demo30.ilovelibrary.cn"

// 通用的请求函数
function requeat(url, data={}){
  wx.showLoading()
  return new Promise(resolve=>{
    wx.request({
    method:"POST",
      url, data, 
      success(res){
        resolve(res.data)
        wx.hideLoading()
      }
    })
  })  
}
// 实现绑定
const bound  = data=>requeat(baseUrl+'/i/api2/WxUserApi/bind',data)
// 修改密码
const  changeWord =data=>requeat(baseUrl+'/i/api2/wxuserApi/ChangePassword',data)
export{
    bound,
    changeWord
}
