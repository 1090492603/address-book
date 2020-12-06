<template>
	<view class="de_container">
			<view class="de_icon" style="background:red">{{this.contact.name.slice(0,1)}}</view>
			<view class="de_name" ><input type="text" placeholder="请输入姓名" v-model="contact.name"></view>
			<view class="underline"></view>
			<view class="de_numBox">
				<view>联系电话：</view>
				<input type="number" placeholder="请输入电话" class="de_numInput" maxlength="11" v-model="contact.number" />
			</view>
			<view class="underline2"></view>
			<view class="de_numBox">
				<view>电子邮箱：</view>
				<input type="email" placeholder="请输入电子邮箱" class="de_numInput" v-model="contact.mail" />
			</view>
			<view class="underline2"></view>
			<view class="de_numBox">
				<view>家庭住址：</view>
				<input type="text" class="de_numInput" placeholder="请输入住址" style="width: 60%;" v-model="contact.address"/>
			</view>
			<view class="underline3"></view>
			<button type="primary" class="de_btn1" @click="de_keep">保存</button>
			<button type="warn" class="de_btn2" @click="de_delete">删除</button>
			<button type="warn" class="de_btn2 de_btn3" @click="de_call" style="background-color: #F0AD4E;">拨打电话</button>
	</view>
</template>

<script>
	
	export default {
		data(){
			return {
				contact: {},
				status: -1,
				number: ""
			}
		},
		onLoad(option) {
			this.contact.status = option.status;
			if(this.contact.status == 0){
				this.contact.name = "";
				this.contact.number = "";
				this.contact.mail = "";
				this.contact.address = "";
			}else{
				this.contact.name = option.name;
				this.contact.number = option.number;
				this.number = option.number;
				this.contact.mail = option.mail;
				this.contact.address = option.address;
			}
		},
		methods: {
			de_keep(){
				let data = this.contact;
				if(this.contact.name.slice(0,1)<=9&&this.contact.name.slice(0,1)>=0){
					uni.showToast({
					    title: '姓名不能有数字'
					});
					return ;
				}
				
				if(this.isNoNull(data.mail)){
					var regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
					//判断 要fasle匹配失败
					if(!regex.test(this.contact.mail)){
						uni.showToast({
						    title: '邮箱格式不正确'
						});
						return ;
					}
				}
				

				if(this.isNoNull(data.name)&& this.isNoNull(data.number)  && this.isNoNull(data.address)){
					if(this.contact.status != 0){
						this.contact.status = 1;
						if(this.contact.number != this.number ){
							this.contact.oldNumber = this.number;
						}
						
					}else{
						this.contact.status = 0;
					}	
					
					uni.$emit("de",this.contact);
					uni.navigateBack({
						
					})
				}else{
					uni.showToast({
					    title: '信息不能为空'
					});
				}
			},
			de_delete(){
				this.contact.status = 2;
				uni.$emit("de",this.contact);
				uni.navigateBack({});
			},
			isNoNull(data){
				if(data=="" || data==null || data == undefined || !data){
					return false;
				}
				return true;
			},
			de_call(){
				if(this.isNoNull(this.contact.number)){
					uni.makePhoneCall({
					    phoneNumber:  this.contact.number
					});
				}
			}
		}
	}
</script>

<style>
	
	.de_container{
		margin: 10upx;
		width: 100%;
	}
	
	.de_icon {
		width: 120upx;
		height: 120upx;
		border-radius: 50%;
		display: flex;
		margin: 0 auto;
		justify-content: center;
		align-items: center;
		font-size: 30upx;
		color: #fff;	
	}
	.de_name{
		margin: 10upx 0;
		width: 100%;
		height: 65upx;
		text-align: center;
		font-size: 15px;
	}
	.underline{
		height: 3upx;
		width: 100%;
		opacity: 0.5;
		background: #8F8F94;
	}
	.de_numBox{
		color: #007AFF;
		margin-top: 10upx;
		margin-left: 30upx;
		display: flex;
	}
	.de_numInput{
		padding: 5upx;
	}
	.underline2{
		margin-top: 20upx;
		margin-left: 30upx;
		width: 100%;
		height: 3upx;
		opacity: 0.4;
		background: #8F8F94;
	}
	.underline3{
		margin-top: 20upx;
		width: 100%;
		height: 3upx;
		opacity: 0.5;
		background: #8F8F94;
		margin-bottom: 50upx;
	}
	.de_btn1{
		margin: 10upx auto;
		width: 75%;
		height: 70upx;
	}
	.de_btn2{
		margin: 40upx auto;
		width: 75%;
		height: 70upx;
	}
	.de_btn3{
		margin: 80upx auto;
		background-color: #F0AD4E;
	}
</style>
