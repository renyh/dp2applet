// 服务器基础地址
const baseUrl = "https://demo30.ilovelibrary.cn"

// 通用的请求函数
function requeat(url, data={}){
  wx.showLoading()
  return new Promise(resolve=>{
    wx.request({
      url, data, 
      success(res){
        resolve(res.data)
        wx.hideLoading()
      }
    })
  })  
}
  
// 图书馆分类
const libclassify = data=>requeat(baseUrl+'/i/api2/LibrarySettingApi/GetAreaLib',data)
//  获取前端用户绑定的图书馆帐号
const getInfo = data =>requeat(baseUrl+'/i/api2//WxUserApi/GetBindUsers',data)
// 获取读者信息
const getInfos = data =>requeat(baseUrl+'/i/api2/PatronApi/GetPatron',data)
// 导出请求
export{
    libclassify,
    getInfo,
    getInfos  
}