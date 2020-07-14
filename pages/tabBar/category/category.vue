<template>
	<view>
		<view class="header">
			<view @tap="handleSelect(index)" class="target" v-for="(target, index) in filterByList" :key="index" :class="{ on: target.selected }">{{ target.text }}</view>
		</view>
		<!-- 占位 tabbar 有定位 -->
		<view class="place"></view>
		<!-- 订单列表 -->
		<view class="goods-list">
			<view class="product-list">
				<view v-for="(item,index) in 5" :key="index">
					<image src="../../../static/img/home/17.png" mode=""></image>
					<view class="prod">
						<view class="prod-1">
							<text>哥老官牛哥老官牛蛙火锅清哥老官牛蛙火锅清蛙火锅清...</text>
							<text>删除订单</text>
						</view>
						<view class="prod-2">
							<text>待付款</text>
						</view>
						<view class="prod-3">
							<view class="">
								<text>￥</text>
								<text>168</text>
							</view>
							<view class="">
								<view class="prod-31" v-if="order_state==1">
									去付款
								</view>
								<view class="prod-32" v-if="order_state==2">
									<text>核销码</text>
									<text>74506528910</text>
								</view>
								<view class="prod-31" v-if="order_state==3">
									去评价
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="loading-text">{{ loadingText }}</view>
		</view>
	</view>
</template>

<script>
import interfaces from '../../../utils/interfaces.js';
export default {
	data() {
		return {
			goodsList: [], // 商品列表大数组
			filterby: '1', // 默认选择的tab
			page: 1,
			size: 6,
			order_state:1,
			loadingText: '正在加载....',
			filterByList: [
				{
					text: '全部',
					selected: true,
					filterby: '1'
				},
				{
					text: '待付款',
					selected: false,
					filterby: '2'
				},
				{
					text: '待使用',
					selected: false,
					filterby: '3'
				},
				{
					text: '待评价',
					selected: false,
					filterby: '4'
				}
			]
		};
	},
	methods: {
		handleGoods(goods) {
			// 页面跳转 商品详情
			uni.navigateTo({
				url: './goods?goodsInfo=' + JSON.stringify(goods)
			});
		},
		handleSelect(index) {
			this.filterByList[index].selected = true;

			// 其他的selected false
			for (let i = 0; i < this.filterByList.length; i++) {
				if (i != index) {
					this.filterByList[i].selected = false;
				}
			}

			// 数据请求
			this.filterby = this.filterByList[index].filterby;
			this.page = 1;
			this.loadingText = '加载中...';
			this.goodsList = [];
			this.loadData();
		},
		loadData() {
			this.request({
				url: `${interfaces.getGoodsList}/${this.filterby}/${this.page}/${this.size}`,
				success: res => {
					if (res.data.length > 0) {
						res.data.forEach(item => {
							this.goodsList.push(item);
						});
					} else {
						this.loadingText = '到底了';
					}
				}
			});
		}
	},
	onLoad() {
		// 加载数据
		this.loadData();
	},
	// 上啦加载
	onReachBottom() {
		this.page++;
		console.log(this.page)
		this.loadData();
	}
};
</script>

<style lang="scss">
page {
	background-color: #f8f8f8;
}
.header {
	width: 92%;
	padding: 0 4%;
	height: 100upx;
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
	position: fixed;
	z-index: 10;
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

.place {
	background-color: #ffffff;
	height: 100upx;
}

.goods-list {
	.loading-text {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60upx;
		color: #979797;
		font-size: 24upx;
	}
	.product-list {
		padding: 0 40upx;
		>view{
			padding: 40upx;
			margin-top: 30upx;
			background-color: #fff;
			box-shadow:0px 10upx 40upx 0px rgba(0, 0, 0, 0.06);
			border-radius:20upx;
			display: flex;
			align-items: center;
			
			>image{
				width: 140upx;
				height: 140upx;
				display: block;
			}
			.prod{
				flex: 1;
				padding-left: 30upx;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				.prod-1{
					display: flex;
					align-items: center;
					text{
						&:nth-child(1){
							font-size:30upx;
							font-family:PingFang SC;
							font-weight:bold;
							color:rgba(51,51,51,1);
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							display: block;
							padding-right: 20upx;
						}
						&:nth-child(2){
							font-size:24upx;
							font-family:PingFang SC;
							font-weight:500;
							color:rgba(157,157,157,1);
						}
					}
					
				}
				.prod-2{
					padding: 8upx 0 2upx;
					text{
						font-size:22upx;
						font-family:PingFang SC;
						font-weight:500;
						color:rgba(157,157,157,1);
					}
				}
				.prod-3{
					display: flex;
					justify-content: space-between;
					align-items: center;
					>view{
						&:nth-child(1){
							display: flex;
							align-items: flex-end;
							text{
								
								font-family:DIN;
								font-weight:bold;
								color:rgba(243,78,78,1);
								&:nth-child(1){
									font-size: 26upx;
								}
								&:nth-child(2){
									font-size:40upx;
								}
							}
						}
					}
					.prod-31{
						width:150upx;
						height:70upx;
						line-height: 70upx;
						text-align: center;
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
</style>
