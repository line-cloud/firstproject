<template>
	<div id="previewCase">
		<div>讲义名称: {{ data.case_title}}</div>
		<div @click="box">知识点: {{data.case_knowledge_node_title}}</div>
		<div>难度: {{data.case_difficult_index}}</div>
		 <div class="exam-list">
           <div class="beauty-man" v-for="(item,index) in data.questionList">
              <div class="exam-con">
                   <div class="exam-q" @click="answerTogglefun(index+1)" >
                        <div v-html=item.question_text class="questionText"></div>
                        <div class="ansOptions" v-if="item.question_options!='' ">
                            <span  style="width: 210px;display: inline-block;">
                                <span>A .</span>
                                <span v-html=item.question_options.A></span>
                            </span>
                            <span style="width: 210px;display: inline-block;">
                                <span>B .</span>
                                <span v-html=item.question_options.B ></span>
                            </span>
                            <span style="width: 210px;display: inline-block">
                                <span>C .</span>
                                <span v-html=item.question_options.C ></span>
                            </span>
                            <span style="width: 210px;display: inline-block">
                                <span>D .</span>
                                <span v-html=item.question_options.D ></span>
                            </span>
                        </div>
                   </div>
                   <div class="exam-answer" v-show="num==index+1&&answerToggle">
                        <div class="analyticbox">
                            <span class="exam-point">【考点】</span>
                            <div class="analyticbox-body">
                                <img :src="`http://192.168.0.172/question/public/${item.question_knowledge}`" style="vertical-align:middle; ">
                            </div>
                        </div>
                         <div class="analyticbox">
                            <span class="exam-point">【答案】</span>
                            <div class="analyticbox-body" >
                                <img :src="`http://192.168.0.172/question/public/${item.question_answer}`"style="vertical-align: middle"
                                v-show="item.question_answer!='' ">
                            </div>
                        </div>
                         <div class="analyticbox">
                            <span class="exam-point">【解析】</span>
                            <div class="analyticbox-body">
                                <img :src="`http://192.168.0.172/question/public/${item.question_explanation}`" style="vertical-align: middle">
                            </div>
                        </div>
                        
                   </div>
              </div>
           </div>
      </div> 
	</div>
</template>
<script>
	export default{
		name:'preview-case',
		props:['data'],
		data(){
			return{
				num:0,
				answerToggle:false,
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
          '$store.state.isToggle':{
          	   handler:function(){
          	   	   // console.log(this.$store.state.degreeSort)
          	   },
          	   deep:true
          }
		},
		methods:{
			answerTogglefun:function(index){
		         this.num=index
		         this.answerToggle=!this.answerToggle
      },
      box:function(){
      	  this.$store.state.isToggle=!this.$store.state.isToggle
      }
		}
	}
</script>
<style scoped>
.el-dialog{

}
.exam-list{
      width: 925px;
      height: auto;
      margin-top: 10px;
      /*border: 1px solid #dcdcdc;*/
      cursor: pointer;
      font-size: 14px;
  }
	.beauty-man{
      border: 1px solid #dcdcdc;
      margin-bottom:10px; 
      /*overflow: hidden;*/
  }
    .exam-q{
     height: auto;
  }
  .exam-head{
    height: 40px;
    line-height: 40px;
    background: #eee;
    padding-right: 20px;
  }
  .clearFloat:after{
      content: "";
      display: block;
      height: 0;
      clear: both;
  }
  .exam-head-left,.exam-head-right{
     font-size: 12px;
     color: #666;
    line-height: 40px;
  }
  .exam-head-right a{
      text-decoration: none;
      color: #333;
      cursor: pointer;
  }
   .exam-head-left{
      float: left;
   }
   .exam-answer{
    border-top: 1px dashed #dcdcdc;
    padding-top: 20px;
}
  .exam-head-right{
      float: right;
  }
  .exam-head-left span {
    display: inline-block;
    margin: 0 20px;
}
  .exam-head-left .line {
    margin: 0 5px;
    display: inline-block;
    width: 1px;
    height: 20px;
    line-height: 40px;
    background: #d2d2d2;
    vertical-align: middle;
  }
  .exam-con{
     margin: 20px 20px 0;
     
  }
  .analyticbox{
   min-height: 30px;
}
.analyticbox > span {
    font-weight: 700;
    color: #17b55b;
    position: relative;
    float: left;
}
.analyticbox .analyticbox-body {
    color: #333;
    margin-left: 60px;
    margin-bottom: 20px;
}
.ansOptions{
   margin-bottom: 20px;
}
.questionText{
    margin-bottom: 20px;
}
.getQuesCon{
   left: 930px;
   z-index: 100;
}
</style>