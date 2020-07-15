<template>
	<view class="app">
		<view class="app-1">
			<view class="">
				<text>店铺LOGO</text>
				<text>请上传尺寸大于100x100px</text>
			</view>
			<view class="" @tap="onChooseImage(0)">
				<text v-if="fromData.logo.length <= 0"  style="white-space:pre-wrap">
					点击\n上传
				</text>
				<image v-else :src="fromData.logo" mode=""></image>
			</view>
		</view>
		<view class="app-2">
			<view class="">
				<text>店铺名称</text>
				<input v-model="fromData.name" type="text" placeholder="请输入店铺名称（必填）" placeholder-class="on-inp" />
			</view>
			<view class="">
				<text>联系人</text>
				<input v-model="fromData.contacts" type="text" placeholder="请输入联系人姓名（必填）" placeholder-class="on-inp" />
			</view>
			<view class="">
				<text>联系方式</text>
				<input v-model="fromData.phone" type="text" placeholder="请输入联系方式（必填）" placeholder-class="on-inp" />
			</view>
			<view class="">
				<text>身份证号</text>
				<input v-model="fromData.idCardNo" type="text" placeholder="请输入联系人身份证号（必填）" placeholder-class="on-inp" />
			</view>
			<view class="">
				<text>行业分类</text>
				<view class="">
					<picker mode="selector" range-key="name" :range="industryList" @change="onChangeIndustry">
						<text>{{ industry }}</text>
					</picker>
					<image src="../../static/img/setShop/1.png" mode=""></image>
				</view>
			</view>
			<view class="">
				<text>经营时间</text>
				<view class="">
					<picker mode="date" @change="onChangeDate">
						<text>{{ fromData.business_hours_data_begin1 }}</text>
					</picker>
					<image src="../../static/img/setShop/1.png" mode=""></image>
				</view>
			</view>
			<view class="">
				<text>店铺区域</text>
				<view class="">
					<picker mode="selector" range-key="name" :range="areaList" @change="onChangeArea">
						<text>{{ fromData.area }}</text>
					</picker>
					<image src="../../static/img/setShop/1.png" mode=""></image>
				</view>
			</view>
			<view class="">
				<text>店铺地址</text>
				<view class="" @tap="onAddress">
					<text>{{ fromData.address }}</text>
					<image src="../../static/img/setShop/1.png" mode=""></image>
				</view>
			</view>
		</view>
		<view class="app-3">
			<text>请上传身份证正反面照片</text>
			<view class="app-from">
				<view class="app-item">
					<view class="">
						<view class="">
							<image :src="fromData.id_card_photo_positive" mode=""></image>
							<button type="default" @tap="onChooseImage(1)"></button>
						</view>
						<text>上传身份证正面</text>
					</view>
					<view class="">
						<view class="">
							<image :src="fromData.id_card_photo_side" mode=""></image>
							<button type="default" @tap="onChooseImage(2)"></button>
						</view>
						<text>上传身份证国徽面</text>
					</view>
				</view>
			</view>
		</view>
		<view class="app-3">
			<text>上传营业执照 / 门头</text>
			<view class="app-from">
				<view class="app-item">
					<view class="">
						<view class="">
							<image :src="fromData.business_licence" mode=""></image>
							<button type="default" @tap="onChooseImage(3)"></button>
						</view>
						<text>上传营业执照</text>
					</view>
					<view class="">
						<view class="">
							<image :src="fromData.image" mode=""></image>
							<button type="default" @tap="onChooseImage(4)"></button>
						</view>
						<text>上传门头</text>
					</view>
				</view>
			</view>
		</view>
		<view class="btn"><view @tap="formSubmit">提交</view></view>
	</view>
</template>

<script>
import LbPicker from '@/components/lb-picker';
import interfaces from '../../utils/interfaces.js';
import WxValidate from '../../utils/wx-validate/WxValidate'
export default {
	components: {
		LbPicker
	},
	data() {
		return {
			state: 2,
			industry: '请选择',
			industryList: [],
			areaList: [],
			fromData: {
				logo: '', //logo
				name: '',
				contacts: '',
				phone: '',
				idCardNo: '', //身份证号
				industry_id: 0,
				'sysCodeInfoByIndustryId.id': '',
				business_hours_data_begin1: '请选择',
				area: '请选择',
				address: '请选择',
				id_card_photo_positive: '../../static/img/setShop/2.png',
				id_card_photo_side: '../../static/img/setShop/3.png',
				business_licence: '../../static/img/setShop/4.png',
				image: '../../static/img/setShop/4.png',
				longitude: '',
				latitude: ''
			}
		};
	},
	onLoad() {
        var _this = this;
        _this.initValidate()
        uni.request({
            url: this.interfaces.getCodePidList,
            data:{pid:100027},
            success: (res) => {
                console.log(res)
                _this.industryList = res.data.data;
                console.log(_this.industryList)
            }
        })
        uni.request({
            url: this.interfaces.getPlaceList,
            data:{parentId:320700000000},
            success: (res) => {
                console.log(res)
                _this.areaList = res.data.data;
                console.log(_this.areaList)
            }
        })
    },
	onShow() {
		const chooseLocation = requirePlugin('chooseLocation');
		const location = chooseLocation.getLocation();
		if (location) {
			this.fromData.address = location.name;
			this.fromData.longitude = location.longitude;
			this.fromData.latitude = location.latitude;
		}
		console.log(location);
	},
	methods: {
		//选择图片
		onChooseImage(type) {
			var _this = this;
			uni.chooseImage({
				count: 1,
				// sizeType: ['compressed'],
				success(res) {
					var imgFiles = res.tempFilePaths[0];
					var tempFiles = res.tempFiles[0];
					uni.showLoading({
						mask: true,
						title: '上传中'
					});
					// if (tempFiles.size / (1024 * 1024) > 10) {
					// 	console.log(111);
					// 	_this.onCompression(tempFiles, function(data, files) {
					// 		_this.onUpImage(data, type);
					// 	});
					// } else {
					// 	console.log(222);
					// }
                    _this.onUpImage(imgFiles, type);
				}
			});
		},
		//压缩图片
		onCompression(file, callback) {
			let fileObj = file;
			let reader = new FileReader();
			reader.readAsDataURL(fileObj); //转base64
			reader.onload = function(e) {
				let image = new Image(); //新建一个img标签（还没嵌入DOM节点)
				image.src = e.target.result;
				image.onload = function() {
					let canvas = document.createElement('canvas'), // 新建canvas
						context = canvas.getContext('2d'),
						imageWidth = image.width / 2, //压缩后图片的大小
						imageHeight = image.height / 2,
						data = '';
					canvas.width = imageWidth;
					canvas.height = imageHeight;
					context.drawImage(image, 0, 0, imageWidth, imageHeight);
					data = canvas.toDataURL('image/jpeg'); // 输出压缩后的base64
					let arr = data.split(','),
						mime = arr[0].match(/:(.*?);/)[1], // 转成blob
						bstr = atob(arr[1]),
						n = bstr.length,
						u8arr = new Uint8Array(n);
					while (n--) {
						u8arr[n] = bstr.charCodeAt(n);
					}
					let files = new window.File([new Blob([u8arr], { type: mime })], 'test.jpeg', { type: 'image/jpeg' }); // 转成file
					callback(data, files); // 回调
				};
			};
		},
		//上传图片
		onUpImage(imgFiles, type) {
			var _this = this;
			var uper = uni.uploadFile({
				url: interfaces.upImg,
				filePath: imgFiles,
				name: 'imgFile',
				header: {
					'Content-Type': 'multipart/form-data'
				},
				success(res) {
					uni.hideLoading();
					console.log(JSON.parse(res.data));
					if (type == 0) {
						_this.fromData.logo = interfaces.tempUrl + JSON.parse(res.data).imgUrl;
					} 
					else if (type == 1) {
						_this.fromData.id_card_photo_positive = interfaces.tempUrl + JSON.parse(res.data).imgUrl;
					} else if (type == 2) {
						_this.fromData.id_card_photo_side = interfaces.tempUrl + JSON.parse(res.data).imgUrl;
					} else if (type == 3) {
						_this.fromData.business_licence = interfaces.tempUrl + JSON.parse(res.data).imgUrl;
					} else if (type == 4) {
						_this.fromData.image = interfaces.tempUrl + JSON.parse(res.data).imgUrl;
					}
				}
			});
			console.log(uper);
		},
		//获取位置
		onAddress() {
			// uni.getLocation({
			// 	type: 'wgs84',
			// 	success: function(res) {
			// 		console.log(res)
			// 		console.log('当前位置的经度：' + res.longitude);
			// 		console.log('当前位置的纬度：' + res.latitude);
			// 	}
			// });
			const key = 'KRGBZ-GY2CX-IIA47-ZGTVK-5VCW3-LKFM2'; //使用在腾讯位置服务申请的key
			const referer = 'e享兔'; //调用插件的app的名称

			wx.navigateTo({
				url: `plugin://chooseLocation/index?key=${key}&referer=${referer}`
			});
		},
		//提交
		formSubmit() {
			console.log(this.fromData);
            // 传入表单数据，调用验证方法
            if (!this.WxValidate.checkForm(this.fromData)) {
            	const error = this.WxValidate.errorList[0]
            	uni.showModal({
            	    title:"提示",
            	    content:error.msg,
            	})
            	return false
            }
            
		},
		//行业分类
		onChangeIndustry(e) {
			this.fromData.industry_id = e.detail.id;
			this.fromData.sysCodeInfoByIndustryId = e.detail.id;
			this.industry = this.industryList[e.detail.value].name;
		},
		//经营时间
		onChangeDate(e) {
			console.log(e.detail.value);
			this.fromData.business_hours_data_begin1 = e.detail.value;
		},
		//店铺区域
		onChangeArea(e) {
			this.fromData.area = this.areaList[e.detail.value].name;
		},
        initValidate() {
        	// 验证字段的规则
        	const rules = {
        		logo: {
        			required: true,
        		},
        		name: {
        			required: true,
        		},
        		mobilePhone: {
        			required: true,
        			tel: true,
        		},
        		contacts: {
        			required: true,
        		},
        		idCardNo: {
        			required: true,
                    idcard:true
        		},
        		'sysCodeInfoByIndustryId.id': {
        			required: true,
        		}
        	}
        
        	// 验证字段的提示信息，若不传则调用默认的信息
        	const messages = {
        		logo: {
        			required: "请选择店铺LOGO",
        		},
        		name: {
        			required: "请输入姓名",
        		},
        		mobilePhone: {
        			required: "请输入您的联系方式",
        			tel: "请输入正确的手机号码",
        		},
        		contacts: {
        			required: "请输入联系人",
        		},
        		idCardNo: {
        			required: "请输入身份证号码",
        			idcard: "请输入正确的身份证号码",
        		},
        		'sysCodeInfoByIndustryId.id': {
        			required: "请选择行业分类",
        		}
        	}
        
        	// 创建实例对象
        	this.WxValidate = new WxValidate(rules, messages)
        },
	}
};
</script>

<style lang="scss">
page {
	background-color: #f7f7f7;
}

.app {
	padding: 40upx;
	.app-1 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 40upx;
		height: 200upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx;
		view {
			&:nth-of-type(1) {
				text {
					display: block;
					&:nth-of-type(1) {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: bold;
						padding-bottom: 10upx;
						color: rgba(51, 51, 51, 1);
					}
					&:nth-of-type(2) {
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(207, 207, 207, 1);
					}
				}
			}
			&:nth-of-type(2) {
				width: 120upx;
				height: 120upx;
				overflow: hidden;
				border-radius: 50%;
				text {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 100%;
					background: rgba(241, 241, 241, 1);
					border-radius: 50%;
					font-size: 20upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}
				image {
					width: 100%;
					height: 100%;
					display: block;
					object-fit: cover;
				}
			}
		}
	}
	.app-2 {
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx;
		margin: 40upx 0;
		padding: 0 40upx;
		> view {
			padding: 30upx 0;
			display: flex;
			align-items: center;
			border-bottom: 1px solid rgba(235, 235, 235, 1);
			&:last-child {
				border-bottom: 0;
			}
			> text {
				width: 120upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: bold;
				color: rgba(51, 51, 51, 1);
			}
			input {
				flex: 1;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
				padding-left: 60upx;
			}
			.on-inp {
				color: rgba(207, 207, 207, 1);
			}
			view {
				display: flex;
				align-items: center;
				flex: 1;
				image {
					width: 20upx;
					height: 20upx;
					display: block;
				}
				> text {
					flex: 1;
					text-align: right;
					padding-right: 20upx;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
				}
				picker {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: flex-end;
					text {
						padding-right: 20upx;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
						position: relative;
						top: -6upx;
						width: 100%;
						display: block;
					}
				}
			}
		}
	}
	.app-3 {
		padding: 40upx 40upx 10upx;
		box-sizing: border-box;
		margin-bottom: 40upx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 15upx 50upx 0px rgba(9, 9, 53, 0.07);
		border-radius: 20upx;
		> text {
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
		}
		.app-item {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 37upx 0 30upx;
			text-align: center;
			text {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				display: inline-block;
				margin-top: 30upx;
				color: rgba(100, 108, 127, 1);
			}
			> view {
				width: 260upx;
				position: relative;
				image {
					width: 100%;
					height: 167upx;
					object-fit: cover;
					border-radius: 10upx;
				}
				button {
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 167upx;
					z-index: 5;
					opacity: 0;
				}
			}
		}
	}
	.btn {
		view {
			height: 90upx;
			background: linear-gradient(90deg, rgba(249, 147, 56, 1) 1%, rgba(249, 109, 55, 1) 100%);
			border-radius: 45upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(255, 255, 255, 1);
			text-align: center;
			line-height: 90upx;
		}
	}
}
</style>
