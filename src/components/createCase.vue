<template>
	<div id="createCase">
		<div style="text-align: center;">
			新建讲义
		</div>
		<div class="caseContent">
			 <div class="caseName">
			 	 <span> 讲义名称:</span>
			 	 <input type="text" name="" placeholder="最多12字呦" ref="inputValue" 
			 	 >
			 	 <div></div>
			 </div>
			 <div style="margin-top: 5px;margin-left: 5px;"> 知识点 : {{this.$store.state.show.name}} </div>
			 <div style="margin-left: 5px;margin-top:5px;">
			 	 <label > 程度 : </label>
				 <el-radio-group v-model="radioValue" @change="radioOnchange" >
					    <el-radio :label="5">困难</el-radio>
					    <el-radio :label="3">普通</el-radio>
					    <el-radio :label="1">容易</el-radio>
				</el-radio-group>
			 </div>
			 <div class="questionList">
			    <div v-for="(item,index) in  this.$store.state.newCasequestList"  class="newCasequest">
                         <div v-html="index+1+'-,- '+item.question_text"></div>
                         <button style="float: right;cursor: pointer;" @click="deleteClickFun(index)">删除</button>
                     </div>
			 </div>
			 
			 <div style="float: right;margin-top: 10px;margin-right: 5px;">
			 	<button @click="makesure" style="cursor: pointer;">确认</button>
			 	<button @click="cancelNewsCase" style="margin-left: 5px;cursor: pointer;">取消</button>
			 </div>
		</div>
	</div>
</template>
<script>
	import $ from 'zeptojs'
	export default{
		name:"create-case",
		props:['data'],
		data(){
			return{
				radioValue:5,
			    idArray:[],
			}
		},
		watch:{
          // newCasequestList:{
          // 	handler:function(cur,old){
          // 		this.idArray=[]
          // 		for(var i=0;i<cur.length;i++){
          // 			this.idArray.push(cur[i].id)
          // 		}
          //  },
          // 	deep:true
          // } 
          // '$store.state.isToggle':{
          // 	   handler:function(){
          // 	   	   this.$refs.inputValue.value=this.$store.state.editCase.case_title||''
          // 	   },
          // 	   deep:true
          // }
		},
		mounted:function(){
			 if(this.$route.query.toggleIndex=='editCase'){
                     this.$refs.inputValue.value=this.$store.state.editCase.case_title
                     switch(this.$store.state.caseLevel){
					case '困难':this.radioValue=5;break;
					case '普通':this.radioValue=3;break;
					case '容易':this.radioValue=1; break;
					default:this.radioValue=5;break;
				}
			 }
              
		},
		methods:{
			deleteClickFun:function(index){
				this.$store.state.newCasequestList.splice(index,1)
				console.log(index)
			},
			radioOnchange:function(value){
			},
			makesure:function(){
                 if(this.$route.query.toggleIndex=='editCase'){
                          this.editCaseFun()
			   }else{
			   	        this.increaseCaseFun()
			   }
			},
			// 新建讲义
			increaseCaseFun:function(){
				var _this=this
				var degreeIndex;
                
				switch(this.radioValue){
					case 5:degreeIndex=5;break;
					case 3:degreeIndex=3;break;
					case 1:degreeIndex=1; break;
				}
				this.getStorageIdArray()
                 $.ajax({
                url: 'http://192.168.0.172/question/public/index.php/api/math/case_edit',
                data:{
                	subject_id:this.$store.state.subject_id,
                	case_knowledge_node_id:this.$store.state.show.id,
                	case_title:this.$refs.inputValue.value,
                	case_difficult_index:degreeIndex,
                	question_ids:this.idArray,
                	// question_ids:this.$store.state.storageIdArray,
                },
                success:(res)=>{
                	 if(res.ret==0){
                	 	 alert('成功')
                	 	 this.$store.state.newCasequestList=[]
                          this.$emit('close')
                	 }else if(res.ret==-1){
                	 	 this.idArray=[]
                         alert('失败了,请查看是否信息添加完全')
                	 }
                },
                error:function(res,reb,rec){
                     alert('请求失败,服务器错误')
                	   _this.$emit('close')
                }
              })
                  
			},
            // 编辑讲义
            editCaseFun:function(){
				var degreeIndex;
                
				switch(this.radioValue){
					case 5:degreeIndex=5;break;
					case 3:degreeIndex=3;break;
					case 1:degreeIndex=1; break;
				}
				this.getStorageIdArray()
                 this.axios.get('http://192.168.0.172/question/public/index.php/api/math/case_edit',{
                 	 params:{
	                    subject_id:this.$store.state.subject_id,
	                	case_knowledge_node_id:this.$store.state.show.id,
	                	case_title:this.$refs.inputValue.value,
	                	case_difficult_index:degreeIndex,
	                	question_ids:this.idArray,
	                	case_id:this.$store.state.caseId||-1  
                 	 }
                 }).then((res)=>{
                 	 	console.log(res)
                       if(res.data.ret==0){
                	 	 alert('成功')
                	 	 this.$store.state.newCasequestList=[]
                          this.$emit('close')
                	 }else if(res.data.ret==-1){
                	 	 this.idArray=[]
                	 	 
                         alert('失败了,请查看是否信息添加完全')
                	 }
                 }).catch(()=>{
                 	   alert('请求失败,服务器错误')
                	   this.$emit('close')
                 })
            },
			getStorageIdArray:function(){
				 this.idArray=[]
				var questionData=this.$store.state.newCasequestList;
				for(var i=0;i<questionData.length;i++){
					    this.idArray.push(questionData[i].question_id)
				}
			},
			cancelNewsCase:function(){
				alert('取消成功')
				this.$store.state.newCasequestList=[]
				 this.$emit('close')
                 // this.$refs.inputValue.value=''
			}
		}
	}
</script>
<style scoped="createCase.vue">
	.caseName{
		text-align: left;
		margin-left: 5px;
	}
	.caseContent{
	}
	.caseName input{
		padding-left: 5px;
		box-sizing: border-box;
		height: 25px;
		width: 70%;
		line-height: 25px;
		margin-left: 10px;
	}
	  .el-dialog{
       width: 100%;
       height: 100%;
       margin: 0 auto!important;
    }
    .questionList{
    	border: 1px solid #CCC;
    	height: 320px;
    	margin-top: 5px;
        overflow-y:scroll;
    }
    .el-dialog__header{
    	padding: 0;
    }
    .el-dialog__body{
    	padding: 10px 10px
    }
    .newCasequest{
    	margin-top: 4px;border: 1px dashed #dcdcdc;cursor: pointer;
    }
    .newCasequest::after{
    	content: "";
    	display: block;
    	height: 0;
    	clear: both;
    }
</style>