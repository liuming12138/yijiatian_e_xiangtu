(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods/goodsList"],{"20ee":function(t,e,n){},"35ab":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o(n("6c99"));function o(t){return t&&t.__esModule?t:{default:t}}var a={data:function(){return{goodsList:[],filterby:"all",page:1,size:6,loadingText:"正在加载....",filterByList:[{text:"全部",selected:!0,filterby:"all"},{text:"口碑",selected:!1,filterby:"public"},{text:"热门",selected:!1,filterby:"hot"}]}},methods:{handleGoods:function(e){t.navigateTo({url:"./goods?goodsInfo="+JSON.stringify(e)})},handleSelect:function(t){this.filterByList[t].selected=!0;for(var e=0;e<this.filterByList.length;e++)e!=t&&(this.filterByList[e].selected=!1);this.filterby=this.filterByList[t].filterby,this.page=1,this.loadingText="加载中...",this.goodsList=[],this.loadData()},loadData:function(){var t=this;this.request({url:"".concat(i.default.getGoodsList,"/").concat(this.filterby,"/").concat(this.page,"/").concat(this.size),success:function(e){e.data.length>0?e.data.forEach((function(e){t.goodsList.push(e)})):t.loadingText="到底了"}})}},onLoad:function(e){t.setNavigationBarTitle({title:e.name}),this.loadData()},onPullDownRefresh:function(){var e=this;setTimeout((function(){e.page=1,e.loadingText="加载中...",e.goodsList=[],e.loadData(),t.stopPullDownRefresh()}),1e3)},onReachBottom:function(){this.page++,this.loadData()}};e.default=a}).call(this,n("543d")["default"])},5448:function(t,e,n){"use strict";var i=n("20ee"),o=n.n(i);o.a},"5d48":function(t,e,n){"use strict";n.r(e);var i=n("35ab"),o=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=o.a},"69ae":function(t,e,n){"use strict";var i,o=function(){var t=this,e=t.$createElement;t._self._c},a=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}))},8846:function(t,e,n){"use strict";n.r(e);var i=n("69ae"),o=n("5d48");for(var a in o)"default"!==a&&function(t){n.d(e,t,(function(){return o[t]}))}(a);n("5448");var s,l=n("f0c5"),u=Object(l["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);e["default"]=u.exports},"9d09":function(t,e,n){"use strict";(function(t){n("a1d0");i(n("66fd"));var e=i(n("8846"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["9d09","common/runtime","common/vendor"]]]);