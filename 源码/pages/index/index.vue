<template>
	<view class="content">
			<txl @ev="evFunc" :datas="datas" color="red" :index="true" name="name"></txl>
	</view>
</template>

<script>
	
	import txl from '@/components/yt-txl/index.vue'
	
	export default {
		components:{txl},
		data() {
			return {
				title: 'Hello',
			    datas : []
			}
		},
		methods: {
			evFunc(data){
				uni.showToast({
					title:data
				})
			}
		}
	}
</script>

<style>
	page{
		background: #f4f4f4;
	}
</style>
