<template>
	<view>
		<view class="app-1">
			<image src="../../static/img/login/1.jpg" mode=""></image>
		</view>
		<view class="app-2"><button type="default" open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">登录</button></view>
	</view>
</template>

<script>
import interfaces from '../../utils/interfaces.js';
export default {
	data() {
		return {
			
		};
	},
	methods: {
		wxGetUserInfo(e) {
			let _this = this;
			uni.login({
				provider: 'weixin',
				success: function(loginRes) {
					let data = {
						code: loginRes.code
					};
					_this.request({
						url: interfaces.getOpenId,
						method: 'POST',
						data: data,
						title:'登录中...',
						success: res => {
							let data =e.detail.userInfo
							data.smallOpenid = res.userInfo.openid
							data.headImg = e.detail.userInfo.avatarUrl
							data.sex = e.detail.userInfo.gender
							data.invitationCode = ''
							_this.onSetRegistration(data)
						}
					});
				}
			});
		},
		onSetRegistration(data){
			this.request({
				url: interfaces.setRegistration,
				method: 'POST',
				data: data,
				title:'登录中...',
				success: res => {
					uni.setStorageSync('isCanUse',false)
					uni.setStorageSync('userInfo',res.userData)
					uni.hideLoading()
					uni.navigateTo({
						url:'../tabBar/home/home'
					})
				}
			});
		},
	}
};
</script>

<style lang="scss">
	.app-1 image{
		width: 750upx;
		height: 750upx;
	}
	.app-2{
		padding: 0 40upx;
		button{
			background-color: #07c160;
			height: 88upx;
			font-size: 36upx;
			color: #fff;
			text-align: center;
			line-height: 88upx;
			border-radius: 88upx;
		}
	}
</style>
