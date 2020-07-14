<template>
	<view>
		<view class="header">
			<!-- 定位城市 -->
			<view class="addr" @tap="locationArea">
				<view class="icon iconfont">&#xe650;</view>
				{{ city }}
			</view>
			<!-- 搜索框 -->
			<view class="input-box">
				<view class="icon iconfont">&#xe65c;</view>
				<input type="text" readonly placeholder="搜索商品/门店/优惠" placeholder-style="color:#c0c0c0" />
			</view>

			<!-- 提示信息 -->
			<!-- <view class="icon-btn">
				<view class="icon iconfont">&#xe70a;</view>
			</view> -->
		</view>
		<!-- 占位 -->
		<view class="place"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: {
		city: String
	},
	methods: {
		locationArea() {
			this.$emit('locationArea');
		}
	}
};
</script>

<style lang="scss">
.header {
	width: 100%;
	padding: 0 40upx;
	height: 100upx;
	display: flex;
	align-items: center;
	position: fixed;
	z-index: 10;
	background-color: #fff;
	top: 0;
	box-sizing: border-box;
	// 条件编译 设置离顶部的高度
	/*  #ifdef  APP-PLUS  */
	top: var(--status-bar-height);
	/*  #endif  */

	.addr {
		width: 140upx;
		height: 60upx;
		flex-shrink: 0;
		display: flex;
		align-items: center;
		font-size: 28upx;

		.icon {
			height: 60upx;
			margin-right: 5upx;
			display: flex;
			align-items: center;
			font-size: 42upx;
			color: #ffc50a;
		}
	}

	.input-box {
		width: 100%;
		height: 60upx;
		background-color: #f5f5f5;
		border-radius: 30upx;
		position: relative;
		display: flex;
		align-items: center;

		.icon {
			display: flex;
			align-items: center;
			position: absolute;
			top: 0;
			left: 30upx;
			width: 60upx;
			height: 60upx;
			font-size: 34upx;
			color: #c0c0c0;
		}

		input {
			padding-left: 88upx;
			height: 28upx;
			font-size: 28upx;
		}
	}

	.icon-btn {
		width: 60upx;
		height: 60upx;
		flex-shrink: 0;
		display: flex;

		.icon {
			width: 60upx;
			height: 60upx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-size: 42upx;
		}
	}
}

.place {
	background-color: #ffffff;
	height: 100upx;
	/*  #ifdef  APP-PLUS  */
	margin-top: var(--status-bar-height);
	/*  #endif  */
}
</style>
