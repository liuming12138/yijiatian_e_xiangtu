const domain = "http://172.18.1.249";
const interfaces = {
	// 上传图片
    upImg: domain + "/api/upload.do",
    // 文件路径
    tempUrl: domain,
    
    // 获取openid
    getOpenId: domain + "/mini/getMiniProgramByOpenId.do",
    // 获取字典数据
    getCodePidList: domain + "/mini/getCodePidList.do",
    // 获取地址数据
    getPlaceList: domain + "/mini/getPlaceList.do",
    // 账号注册并登录
    setRegistration: domain + "/mini/smallUserRegister.do",
    // 广告获取
    loadAdvertisingData: domain + "/mini/loadAdvertisingData.do",
    // 砍价产品获取
    loadCommodityHaggleInfoData: domain + "/mini/loadCommodityHaggleInfoData.do",
    // 砍价产品详情获取
    loadCommodityHaggleDetail: domain + "/mini/loadCommodityHaggleDetail.do",
    // 惊爆产品获取
    loadCommodityGroupInfoData: domain + "/mini/loadCommodityGroupInfoData.do",
    // 惊爆产品详情获取
    loadCommodityGroupDetail: domain + "/mini/loadCommodityGroupDetail.do",
    // 店铺信息获取
    loadDealerData: domain + "/mini/loadDealerData.do",
    // 店铺详情获取
    loadDealerDetail: domain + "/mini/loadDealerDetail.do",
    // 用户信息获取
    getUserData: domain + "/mini/getUserData.do",
	
	
	
	
	// 获取首页数据
	getMallData: 'https://uniapp-interface.herokuapp.com/' + "api/profiles/mall_list",
	// 获取分类数据
	getCategory: 'https://uniapp-interface.herokuapp.com/' + "api/profiles/category",
	// 获取商品列表数据
	getGoodsList: 'https://uniapp-interface.herokuapp.com/' + 'api/profiles/goodslist',
	// 商品详情信息
	getGoods: 'https://uniapp-interface.herokuapp.com/' + "api/profiles/goods"
	
}
module.exports = interfaces;