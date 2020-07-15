<template>
	<view>
		<!-- 状态栏 -->
		<page-status></page-status>
		<!-- 自定义顶部导航栏 -->
		<pageHeader :city="city" @locationArea="locationArea" />

		<!-- 轮播图 -->
		<view class="swiper">
			<view class="swiper-box">
				<swiper circular="true" autoplay="true" @change="swiperChange">
					<swiper-item v-for="(swiper, index) in swiperList" :key="index" @tap="onBanner(swiper)"><image :src="swiper.imageUrl"></image></swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 菜单导航 -->
		<view class="nav">
			<navigator url="">
				<image src="../../../static/img/home/4.png" mode=""></image>
				<text>美食</text>
			</navigator>
			<navigator url="">
				<image src="../../../static/img/home/5.png" mode=""></image>
				<text>休闲娱乐</text>
			</navigator>
			<navigator url="">
				<image src="../../../static/img/home/6.png" mode=""></image>
				<text>生活周边</text>
			</navigator>
			<navigator url="">
				<image src="../../../static/img/home/7.png" mode=""></image>
				<text>运动健身</text>
			</navigator>
			<navigator url="">
				<image src="../../../static/img/home/8.png" mode=""></image>
				<text>丽人</text>
			</navigator>
			<navigator url="">
				<image src="../../../static/img/home/9.png" mode=""></image>
				<text>酒店住宿</text>
			</navigator>
			<navigator url="">
				<image src="../../../static/img/home/10.png" mode=""></image>
				<text>摄影写真</text>
			</navigator>
			<navigator url="">
				<image src="../../../static/img/home/11.png" mode=""></image>
				<text>行业分类</text>
			</navigator>
		</view>
		<!-- 推荐 -->
		<view class="tuijian">
			<navigator url=""><image src="../../../static/img/home/12.png" mode=""></image></navigator>
		</view>
		<!-- 惊爆活动 -->
		<view class="bill">
			<view class="bill-1">
				<text>惊爆活动</text>
				<navigator url="">查看更多</navigator>
			</view>
			<view class="bill-2">
				<navigator class="bill-21" url="">
					<image :src="groupCommodityDealer.logo" mode=""></image>
					<view class="">
						<text>{{groupCommodityDealer.name}}</text>
						<view class="">
							<text class="tab">{{groupCommodityDealer.sysCodeInfoByIndustryId.name}}</text>
							<text class="ard">{{groupCommodityDealer.address}}</text>
						</view>
						<text>周一至周日 {{groupCommodityDealer.businessHoursDataBegin1|subtime}}-{{groupCommodityDealer.businessHoursDataEnd1|subtime}} {{groupCommodityDealer.businessHoursDataBegin2|subtime}}-{{groupCommodityDealer.businessHoursDataEnd2|subtime}}</text>
					</view>
					<view class="">
						<image src="../../../static/img/home/14.png" mode=""></image>
						<text>6.8km</text>
					</view>
				</navigator>
				<view class="bill-22">
					<navigator url="" v-for="(item, index) in groupCommodityList" :key="index">
                        <image :src="item.commodityInfo.adjunct" mode=""></image>
                        <text>{{item.commodityInfo.name}}</text>
                        <view class="">
							<view class="">
								<text>￥</text>
								<text>{{item.groupPrice}}</text>
							</view>
							<text>￥{{item.commodityInfo.price}}</text>
						</view>
					</navigator>
				</view>
			</view>
		</view>
		<!-- 惊爆活动 -->
		<view class="piece">
			<view class="piece-1">
				<text>拼团砍价</text>
				<navigator url="">查看更多</navigator>
			</view>
			<view class="piece-2">
				<view v-for="(item,index) in haggleCommodityList" :key="index">
					<image :src="item.commodityInfo.adjunct" mode=""></image>
					<view class="piece-21">
						<view class="">
							<text>{{item.commodityInfo.name}}</text>
							<text>468km</text>
						</view>
						<text>{{item.commodityInfo.title}}</text>
						<view class="">
							<view class="">
								<view class="">
									<text>￥</text>
									<text>{{item.commodityInfo.price}}</text>
								</view>
								<text>￥{{item.commodityInfo.marketPrice}}</text>
							</view>
							<text>发起砍价</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		<lb-picker ref="picker1" v-model="area" :list="areaList" @confirm="handleConfirm" @cancel="handleCancel"></lb-picker>
	</view>
</template>

<script>
import pageHeader from './pageHeader.vue';
import LbPicker from '@/components/lb-picker';
import interfaces from '../../../utils/interfaces.js';
export default {
	data() {
		return {
			isCanUse: true, //是否授权 默认没有授权
			area: '1', //选中地区的值
			city: '连云港', //选中地区的值
			areaList: [
				// 地区的数据
				{
					label: '连云港',
					value: '1'
				},
				{
					label: '海州区',
					value: '2'
				},
				{
					label: '连云区',
					value: '3'
				},
				{
					label: '赣榆区',
					value: '4'
				},
				{
					label: '灌南县',
					value: '2'
				},
				{
					label: '灌云县',
					value: '5'
				},
				{
					label: '东海县',
					value: '6'
				}
			],
			currentSwiper: 0,
			swiperList: [], // 轮播图片
			haggleCommodityList: [], // 砍价产品
			groupCommodityList: [], // 惊爆产品
			groupCommodityDealer: {}, // 惊爆店铺
		};
	},
	components: {
		pageHeader,
		LbPicker
	},
	onShow() {
		if (this.isCanUse) {
			uni.navigateTo({
				url: '../../login/login'
			});
			uni.showToast({
				title: '请先登录'
			});
		}
	},
	onLoad() {
		this.isCanUse = uni.getStorageSync('isCanUse');
		if (this.isCanUse || this.isCanUse.toString().length < 1) {
			uni.navigateTo({
				url: '../../login/login'
			});
		}
		this.initData();
	},
    filters:{
        subtime(value){
            if (!value){
                return "";
            }
            return value.substr(0,5)
        }
    },
	methods: {
		//地区选择
		handleConfirm(item) {
			this.city = item.item.label;
		},
		handleCancel(item) {
			this.$refs['picker1'].hide();
		},
		locationArea() {
			this.$refs['picker1'].show();
		},
		// 轮播图点击详情
		onBanner(data) {
			console.log(data);
		},

		handlePromotion(item) {
			uni.showToast({
				title: item.title,
				icon: 'none'
			});
		},
		handleCategory(item) {
			// 分类跳转
			// console.log(item.name);
			uni.navigateTo({
				url: '../../goods/goodsList?name=' + item.name
			});
		},
		initData() {
			this.request({
				url: interfaces.loadAdvertisingData,
				success: res => {
					console.log(res);
					this.swiperList = res.data;
				}
			});
			this.request({
				url: interfaces.loadCommodityHaggleInfoData,
                data:{"haggleState":2},
				success: res => {
					console.log(res);
					this.haggleCommodityList = res.data;
				}
			});
			this.request({
				url: interfaces.loadCommodityGroupInfoData,
                data:{"groupState":2},
				success: res => {
					console.log(res);
					this.groupCommodityList = res.data;
                    if (res.data.length>0) {
                        var groupCommodityDealer = res.data[0].commodityInfo.dealerInfo;
                        this.request({
                        	url: interfaces.loadDealerDetail,
                            data:{id:groupCommodityDealer.id},
                        	success: res => {
                        		console.log(res);
                                if (res.flag==1) {
                                    this.groupCommodityDealer = res.data;
                                }
                        	}
                        });
                    }
				}
			});
		},
		swiperChange(event) {
			// console.log(event.detail.current);
			this.currentSwiper = event.detail.current;
		}
	}
};
</script>

<style lang="scss">
.swiper {
	width: 100%;
	margin-top: 10upx;
	display: flex;
	justify-content: center;
	.swiper-box {
		width: 670upx;
		height: 300upx;
		overflow: hidden;
		border-radius: 15upx;
		box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
		//兼容ios，微信小程序
		position: relative;
		z-index: 1;
		swiper {
			width: 670upx;
			height: 300upx;
			swiper-item {
				image {
					width: 100%;
					height: 40vw;
				}
			}
		}
	}
}

.nav {
	display: flex;
	flex-wrap: wrap;
	padding: 0 40upx;
	navigator {
		display: block;
		text-align: center;
		width: 25%;
		margin-top: 25upx;
		image {
			width: 160upx;
			height: 160upx;
			display: block;
		}
		text {
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			position: relative;
			top: -10upx;
		}
	}
}

.tuijian {
	image {
		width: 714upx;
		height: 247upx;
		display: block;
		margin: 0 auto;
	}
}

.bill {
	padding: 37upx 40upx 70upx;
	.bill-1 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 50upx;
		text {
			font-size: 42upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
		}
		navigator {
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(250, 109, 56, 1);
		}
	}
	.bill-2 {
		.bill-21 {
			display: flex;
			> image {
				width: 120upx;
				height: 120upx;
				display: block;
				border-radius: 10upx;
				margin-top: 15upx;
			}
			> view:nth-of-type(1) {
				flex: 1;
				padding: 0 40upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				> text:nth-of-type(1) {
					font-size: 34upx;
					font-family: PingFang SC;
					font-weight: bold;
					color: rgba(51, 51, 51, 1);
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				> view {
					display: flex;
					align-items: center;
					padding-top: 15upx;
					.tab {
						height: 34upx;
						background: rgba(250, 228, 220, 1);
						border-radius: 10upx;
						padding: 0 15upx;
						line-height: 34upx;
						font-size: 22upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(250, 109, 56, 1);
					}
					.ard {
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						padding-left: 17upx;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}
				}
				> text:nth-of-type(2) {
					font-size: 22upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(157, 157, 157, 1);
				}
			}
			> view:nth-of-type(2) {
				image {
					margin: 15upx auto 5upx;
					width: 37upx;
					height: 37upx;
					display: block;
				}
				text {
					color: #9d9d9d;
					font-size: 26upx;
					padding-top: 10upx;
				}
			}
		}
		.bill-22 {
			display: flex;
			padding-top: 30upx;
			navigator:last-child {
				margin-right: 0;
			}
			navigator {
                width: 33%;
				margin-right: 22upx;
				display: block;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				image {
					width: 210upx;
					height: 140upx;
					display: block;
				}
				> text {
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 500;
					color: rgba(51, 51, 51, 1);
					padding: 15upx 0;
					display: block;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
				> view {
					display: flex;
					justify-content: space-between;
					align-items: flex-end;
					view {
						display: flex;
						align-items: flex-end;
						text:nth-of-type(1) {
							font-size: 26upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: rgba(243, 78, 78, 1);
						}
						text:nth-of-type(2) {
							font-size: 35upx;
							font-family: DIN;
							font-weight: bold;
							color: rgba(243, 78, 78, 1);
						}
					}
					> text {
						font-size: 26upx;
						font-family: DIN;
						font-weight: 500;
						color: rgba(207, 207, 207, 1);
						text-decoration: line-through;
					}
				}
			}
		}
	}
}
.piece{
	padding: 37upx 40upx 20upx;
	.piece-1 {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-bottom: 50upx;
		text {
			font-size: 42upx;
			font-family: PingFang SC;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
		}
		navigator {
			font-size: 26upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(250, 109, 56, 1);
		}
	}	
	.piece-2{
		>view{
			display: flex;
			margin-bottom: 50upx;
			image{
				width: 210upx;
				height: 210upx;
				display: block;
			}
			.piece-21{
				flex: 1;
				padding-left: 30upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				>view:nth-of-type(1){
					display: flex;
					align-items: center;
					justify-content: space-between;
					text:nth-of-type(1){
						font-size:30upx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(51,51,51,1);
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
						display: block;
						width: 70%;
					}
					text:nth-of-type(2){
						font-size:26upx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(157,157,157,1);
					}
				}
				>text{
					font-size:34upx;
					font-family:PingFang SC;
					font-weight:bold;
					color:rgba(51,51,51,1);
					padding: 20upx 0 60upx;
					display: block
				}
				>view:nth-of-type(2){
					display: flex;
					align-items: flex-end;
					justify-content: space-between;
					>view{
						display: flex;
						justify-content: space-between;
						align-items: flex-end;
						view {
							display: flex;
							align-items: flex-end;
							text:nth-of-type(1) {
								font-size: 26upx;
								font-family: PingFang SC;
								font-weight: bold;
								color: rgba(243, 78, 78, 1);
							}
							text:nth-of-type(2) {
								font-size: 46upx;
								font-family: DIN;
								font-weight: bold;
								color: rgba(243, 78, 78, 1);
							}
						}
						> text {
							font-size: 26upx;
							font-family: DIN;
							font-weight: 500;
							color: rgba(207, 207, 207, 1);
							text-decoration: line-through;
							padding-left: 15upx;
						}
					}
					>text{
						width:180upx;
						height:70upx;
						text-align: center;
						line-height: 70upx;
						background:linear-gradient(90deg,rgba(250,147,56,1) 1%,rgba(250,109,56,1) 100%);
						border-radius:35upx;
						font-size:30upx;
						font-family:PingFang SC;
						font-weight:bold;
						color:rgba(255,255,255,1);
					}
				}
			}
		}
	}
}

@media (max-width: 375px) {
	.bill-22 {
		navigator {
			margin-right: 12upx !important;
		}
	}
}
@media (max-width: 320px) {
	.bill-22 {
		navigator {
			margin-right: 6upx !important;
		}
	}
}
</style>
