<template>
	<view>
		<view class="app-1" style="background-image: url(../../../static/img/user/1.png);">
			<view class="">
				<view class=""><image src="../../../static/img/goods/p1.png" mode=""></image></view>
				<text>刘天帝</text>
			</view>
			<navigator url="../../setShop/setShop">我要开店</navigator>
		</view>
		<view class="app-2">
			<view class="app-21">
				<view class="">
					<text>6</text>
					<text>我的收藏</text>
				</view>
				<view class="">
					<text>28</text>
					<text>余额</text>
				</view>
				<view class="">
					<text>540</text>
					<text>积分</text>
				</view>
				<view class="">
					<text>15</text>
					<text>优惠券</text>
				</view>
			</view>
			<view class="app-22">
				<view class="">
					<text>我的订单</text>
					<navigator url="">查看全部</navigator>
				</view>
				<view class="">
					<navigator url="">
						<view class=""><image src="../../../static/img/user/3.png" mode=""></image></view>
						<text>待付款</text>
					</navigator>
					<navigator url="">
						<view class=""><image src="../../../static/img/user/2.png" mode=""></image></view>
						<text>待使用</text>
					</navigator>
					<navigator url="">
						<view class=""><image src="../../../static/img/user/4.png" mode=""></image></view>
						<text>待评价</text>
					</navigator>
				</view>
			</view>
			<view class="app-23">
				<navigator url="">
					<view class="">
						<image src="../../../static/img/user/5.png" mode=""></image>
						<text>邀请好友</text>
					</view>
					<image src="../../../static/img/user/10.png" mode=""></image>
				</navigator>
				<navigator url="">
					<view class="">
						<image src="../../../static/img/user/6.png" mode=""></image>
						<text>平台奖励</text>
					</view>
					<image src="../../../static/img/user/10.png" mode=""></image>
				</navigator>
				<navigator url="">
					<view class="">
						<image src="../../../static/img/user/7.png" mode=""></image>
						<text>拼团活动</text>
					</view>
					<image src="../../../static/img/user/10.png" mode=""></image>
				</navigator>
				<navigator url="">
					<view class="">
						<image src="../../../static/img/user/8.png" mode=""></image>
						<text>店铺设置</text>
					</view>
					<image src="../../../static/img/user/10.png" mode=""></image>
				</navigator>
				<navigator url="">
					<view class="">
						<image src="../../../static/img/user/9.png" mode=""></image>
						<text>设置</text>
					</view>
					<image src="../../../static/img/user/10.png" mode=""></image>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 个人信息
			user: {}
		};
	},
	onLoad() {},
	methods: {}
};
</script>

<style lang="scss">
page {
	background-color: #f8f8f8;
}
.app-1 {
	padding: 0 40upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 300upx;
	background-repeat: no-repeat;
	background-size: cover;
	> view {
		display: flex;
		align-items: center;
		margin-bottom: 80upx;
		view {
			display: flex;
			align-items: center;
			justify-content: center;
			width: 120upx;
			height: 120upx;
			background: rgba(255, 255, 255, 0.3);
			border-radius: 50%;
			image {
				width: 108upx;
				height: 108upx;
				border-radius: 50%;
			}
		}
		text {
			padding-left: 36upx;
			font-size: 40upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(255, 255, 255, 1);
		}
	}
	navigator {
		margin-bottom: 80upx;
		width: 180upx;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 20upx 40upx 0px rgba(214, 73, 20, 0.1);
		border-radius: 35upx;
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(250, 109, 56, 1);
	}
}

.app-2 {
	position: relative;
	z-index: 2;
	top: -80upx;
	padding: 0 40upx;
	> view {
		background-color: #fff;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 20upx 40upx 0upx rgba(0, 0, 0, 0.04);
		border-radius: 20upx;
	}
	.app-21 {
		display: flex;
		align-items: center;
		height: 180upx;
		view {
			flex: 1;
			text-align: center;
			text {
				display: block;

				&:nth-child(1) {
					font-size: 52upx;
					font-family: DIN;
					font-weight: 500;
					color: rgba(250, 109, 56, 1);
				}
				&:nth-child(2) {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					padding-top: 20upx;
				}
			}
		}
	}
	.app-22 {
		padding: 50upx;
		margin-top: 40upx;
		> view {
			display: flex;
			align-items: center;
			&:nth-child(1) {
				justify-content: space-between;
				text {
					font-size: 34upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(51, 51, 51, 1);
				}
				navigator {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(175, 175, 175, 1);
				}
			}
			&:nth-child(2) {
				padding-top: 40upx;
				navigator {
					flex: 1;
					text-align: center;
					view {
						height: 60upx;
						display: flex;
						justify-content: center;
						align-items: center;
						image {
							display: block;
							&:nth-child(1) {
								width: 59upx;
								height: 56upx;
							}
							&:nth-child(2) {
								width: 61upx;
								height: 51upx;
							}
							&:nth-child(3) {
								width: 56upx;
								height: 56upx;
							}
						}
					}
					text{
						font-size:24upx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(51,51,51,1);
						padding-top: 18upx;
					}
				}
			}
		}
	}
	.app-23{
		padding: 25upx 40upx;
		margin-top: 40upx;
		navigator{
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 35upx 0;
			>image{
				width: 20px;
				height: 20px;
			}
			view{
				display: flex;
				align-items: center;
				text{
					font-size:30upx;
					font-family:PingFang SC;
					font-weight:500;
					color:rgba(51,51,51,1);
					padding-left: 30upx;
				}
			}
			&:nth-child(1){
				view{
					image{
						width: 27upx;
						height: 30upx;
					}
				}
			}
			&:nth-child(2){
				view{
					image{
						width: 27upx;
						height: 27upx;
					}
				}
			}
			&:nth-child(3){
				view{
					image{
						width: 27upx;
						height: 28upx;
					}
				}
			}
			&:nth-child(4){
				view{
					image{
						width: 28upx;
						height: 28upx;
					}
				}
			}
			&:nth-child(5){
				view{
					image{
						width: 30upx;
						height: 30upx;
					}
				}
			}
		}
	}
}
</style>
