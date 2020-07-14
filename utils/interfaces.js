const domain = "http://172.18.1.249";
const interfaces = {
	// 获取openid
	getOpenId: domain + "/mini/getMiniProgramByOpenId.do",
	// 账号注册并登录
	setRegistration: domain + "/mini/smallUserRegister.do",
	
	// 上传图片
	upImg: domain + "/api/upload.do",
	// 文件路径
	tempUrl: domain,
	
	
	
	
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