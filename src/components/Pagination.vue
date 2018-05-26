<template>
	<div id="pagination">
		<el-pagination
		  background
		  layout="prev, pager, next"
		  :total="data.total"
		  @current-change="pagechange" :current-page="data.page">
		</el-pagination>
	</div>
</template>
<script>
	export default{
		name:'pagination',
		props:['data'],
		methods:{
			pagechange:function(page){
				this.$emit('pageclick',page)
			}
		}
	}
</script>
<style  scoped>
	#pagination{
		margin-top: 30px;
		margin-left: 240px;
		margin-bottom: 300px;
	}
</style>