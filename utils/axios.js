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
const GetAreaLib = data=>requeat(GET,baseUrl+'/i/api2/LibrarySettingApi/GetAreaLib',data)
//  获取前端用户绑定的图书馆帐号
const GetBindUsers = data =>requeat(GET,baseUrl+'/i/api2//WxUserApi/GetBindUsers',data)
// 获取读者信息
const GetPatron = data =>requeat(GET,baseUrl+'/i/api2/PatronApi/GetPatron',data)
// 实现绑定
const bind  = data=>requeat(POST,baseUrl+'/i/api2/WxUserApi/bind',data)
// 检索书目
const SearchBiblio = data => requeat(GET,baseUrl+'/i/api2/BiblioApi/SearchBiblio',data)
// 获取书目详情
const GetBiblio = data => requeat(GET,baseUrl+'/i/api2/BiblioApi/GetBiblio',data)
// 获取册详情
const getItems = data=>requeat(GET,baseUrl+'/i/api2/BiblioApi/GetItems',data)
// 获取二维码
const GetPatronQRcode = data => requeat(GET,baseUrl+'/i/api2/WxUserApi/GetPatronQRcode',data)
// 用户信息
const GetActiveUser = data=> requeat(GET,baseUrl+'/i/api2/wxuserApi/GetActiveUser',data)
// 预约图书
const  Reserveh = data=>requeat(POST,baseUrl+'/i/api2/CirculationApi/Reserve',data)

// 导出请求
export{
    GetAreaLib,
    GetBindUsers,
    GetPatron,
    bind,
    SearchBiblio,
    GetBiblio,
    GetPatronQRcode,
    getItems,
    GetActiveUser,
    Reserveh,
   
}