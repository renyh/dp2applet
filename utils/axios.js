// 服务器基础地址
const baseUrl = "https://demo30.ilovelibrary.cn"
const GET = 'GET';
const POST = 'POST';

// 通用的请求函数
function requeat(method,url, data={}){
  wx.showLoading()
  return new Promise(resolve=>{
    wx.request({
     method: method,
      url, data, 
      success(res){
        resolve(res.data)
        wx.hideLoading()
      }
    })
  })  
}
  
// 图书馆分类
const libclassify = data=>requeat(GET,baseUrl+'/i/api2/LibrarySettingApi/GetAreaLib',data)
//  获取前端用户绑定的图书馆帐号
const getInfo = data =>requeat(GET,baseUrl+'/i/api2//WxUserApi/GetBindUsers',data)
// 获取读者信息
const getInfos = data =>requeat(GET,baseUrl+'/i/api2/PatronApi/GetPatron',data)
// 实现绑定
const bound  = data=>requeat(POST,baseUrl+'/i/api2/WxUserApi/bind',data)
// 获取临时密码
const getTemporaryCode = data=>requeat(POST,baseUrl+'/i/api2/wxuserApi/ResetPassword',data)
// 修改密码
const  changeWord =data=>requeat(POST,baseUrl+'/i/api2/wxuserApi/ChangePassword',data)
// 检索书目
const Searchbook = data => requeat(GET,baseUrl+'/i/api2/BiblioApi/SearchBiblio',data)
// 获取书目详情
const bookDetail = data => requeat(GET,baseUrl+'/i/api2/BiblioApi/GetBiblioDetail',data)
// 获取二维码
const getQRcode = data => requeat(GET,baseUrl+'/i/api2/WxUserApi/GetPatronQRcode',data)
// 导出请求
export{
    libclassify,
    getInfo,
    getInfos,
    bound ,
    getTemporaryCode,
    changeWord,
    Searchbook,
    bookDetail,
    getQRcode
}