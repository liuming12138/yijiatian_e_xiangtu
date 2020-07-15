<template>
	<view>
		<!-- 轮播图 -->
		<view class="swiper-box">
			<swiper @change="swiperChange" circular="true" autoplay="true">
				<swiper-item v-for="(swiper, index) in goodsData.swiperList" :key="index"><image :src="swiper"></image></swiper-item>
			</swiper>
			<view class="indicator">{{ currentSwiper + 1 }}/{{ goodsData.swiperList.length }}</view>
		</view>
		<!-- 标题和价格 -->
		<view class="app-1">
			<text>{{ goodsData.name }}</text>
			<view class="app-11">
				<text>商品评分</text>
				<view class="">
					<image src="../../static/img/goods/1.png" v-for="(item, index) in goodsData.common_score" :key="index" mode=""></image>
					<image src="../../static/img/goods/2.png" v-for="(item, index) in 5 - goodsData.common_score" :key="index" mode=""></image>
				</view>
				<text>{{ goodsData.common_score }}.00</text>
			</view>
			<view class="app-12">
				<view class="">
					<view class="">
						<text>￥</text>
						<text>{{ goodsData.market_price }}</text>
					</view>
					<view class="">
						<text>门市价</text>
						<text>￥{{ goodsData.market_price }}</text>
					</view>
				</view>
				<text>月销{{ goodsData.sellcount }}份</text>
			</view>
		</view>
		<!-- 商品详情与评价 -->
		<view class="header">
			<view @tap="handleSelect(index)" class="target" v-for="(target, index) in filterByList" :key="index" :class="{ on: byState == index }">{{ target }}</view>
		</view>
		<!--商品详情  -->
		<view class="app-2" v-if="byState == 0"><image :src="item" v-for="(item, index) in goodsData.image" :key="index" mode=""></image></view>
		<!--商品评价  -->
		<view class="app-3" v-else>
			<view class="ping-list" v-for="(target, index) in 5" :key="index">
				<view class="">
					<image src="../../static/img/goods/p1.png" mode=""></image>
					<view class="">
						<text>姐的霸气你学不来</text>
						<view class="">
							<view class="">
								<image src="../../static/img/goods/1.png" v-for="(item, index) in goodsData.common_score" :key="index" mode=""></image>
								<image src="../../static/img/goods/2.png" v-for="(item, index) in 5 - goodsData.common_score" :key="index" mode=""></image>
							</view>
							<text>6月28日</text>
						</view>
					</view>
				</view>
				<text>
					海州地区第二家海底捞，不过有个小哥哥很 烦人，老朝我要号码，是因为我长得好看... 海州地区第二家海底捞，不过有个小哥哥很 烦人，老朝我要号码，是因为我长得好看...
				</text>
				<view class=""><image v-for="(target, index) in 3" :key="index" src="../../static/img/goods/p3.png" mode=""></image></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentSwiper: 0, // 轮播图下标
			goodsData: {
				swiperList: ['../../static/img/goods/p1.png', '../../static/img/goods/p2.png'],
				name: '海底捞精品捞派肥牛卷半份海底捞精品捞派肥牛卷半份',
				price: '56',
				market_price: '78',
				sellcount: 26450,
				common_score: 4,
				image: ['../../static/img/goods/p3.png', '../../static/img/goods/p4.png', '../../static/img/goods/p4.png']
			},
			byState: '0',
			filterByList: ['商品详情', '用户评价']
		};
	},
	onLoad() {
		this.initData();
	},
	methods: {
		initData() {},
		swiperChange(event) {
			// console.log(event.detail.current);
			this.currentSwiper = event.detail.current;
		},
		handleSelect(index) {
			this.byState = index;
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #f7f7f7;
}
.swiper-box {
	position: relative;
	width: 100%;
	height: 500upx;
	swiper {
		width: 100%;
		height: 500upx;
		swiper-item {
			image {
				width: 100%;
				height: 100%;
				display: block;
				object-fit: cover;
			}
		}
	}
	.indicator {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 25upx;
		height: 40upx;
		border-radius: 40upx;
		font-size: 22upx;
		position: absolute;
		bottom: 20upx;
		right: 20upx;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.2);
	}
}

.app-1 {
	padding: 40upx;
	background-color: #fff;
	> text {
		font-size: 40upx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}
	.app-11 {
		display: flex;
		align-items: center;
		padding: 10upx 0 25upx;
		> text {
			&:nth-of-type(1) {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 500;
				color: rgba(51, 51, 51, 1);
			}
			&:nth-of-type(2) {
				font-size: 28upx;
				font-family: DIN;
				font-weight: 500;
				color: rgba(250, 110, 56, 1);
			}
		}
		view {
			display: flex;
			margin: 0 10upx;
			image {
				margin: 0 -2upx;
				width: 37upx;
				height: 32upx;
			}
		}
	}
	.app-12 {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		> view {
			display: flex;
			align-items: flex-end;
			view {
				&:nth-child(1) {
					align-items: flex-end;
					text {
						&:nth-child(1) {
							font-size: 40upx;
							font-family: PingFang SC;
							font-weight: bold;
							color: rgba(243, 78, 78, 1);
						}
						&:nth-child(2) {
							font-size: 66upx;
							font-family: DIN;
							font-weight: bold;
							color: rgba(243, 78, 78, 1);
						}
					}
				}
				&:nth-child(2) {
					align-items: center;
					margin-left: 20upx;
					position: relative;
					top: -10upx;
					text {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(157, 157, 157, 1);
					}
				}
			}
		}
		> text {
			position: relative;
			top: -10upx;
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(157, 157, 157, 1);
		}
	}
}

.header {
	width: 92%;
	padding: 0 4%;
	height: 100upx;
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
	background-color: #fff;
	border-bottom: solid 1upx #eee;

	.target {
		width: 20%;
		height: 90upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		margin-bottom: -2upx;
		color: #aaa;

		&.on {
			color: #555;
			border-bottom: 4upx solid #fa8138;
			font-weight: 600;
			font-size: 30upx;
		}

		.icon {
			font-size: 26upx;
		}
	}
}
.app-2 {
	padding: 40upx;
	image {
		width: 100%;
		margin: 10upx 0;
	}
}
.app-3 {
	padding: 40upx;
	> view {
		background-color: #fff;
		padding: 30upx 40upx;
		> view {
			display: flex;
			align-items: center;
			&:nth-of-type(1) {
				> image {
					width: 63upx;
					height: 63upx;
					display: block;
					border-radius: 50%;
				}
				> view {
					margin-left: 30upx;
					> text {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 500;
						color: rgba(51, 51, 51, 1);
					}
					>view {
						margin-top: 14upx;
						display: flex;
						text {
							font-size: 20upx;
							font-family: PingFang SC;
							font-weight: 500;
							color: rgba(157, 157, 157, 1);
						}
						view {
							display: flex;
							margin-right: 20upx;
							image {
								margin: 0 -2upx;
								width: 37upx;
								height: 32upx;
							}
						}
					}
				}
			}
			&:nth-of-type(2) {
				display: flex;
				image{
					
				}
			}
		}
		> text {
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 500;
			color: rgba(51, 51, 51, 1);
			line-height: 36upx;
			
		}
	}
}
</style>
