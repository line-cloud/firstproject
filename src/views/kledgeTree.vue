<template>
	<div id="kledgeTree">
       <div class="version" v-show="toggleShow">
           <div class="tbookVersion">
                <label>教材: </label>
                <a  v-for="(item,index) in tbookVersion" 
                :class="{'activecolor':index==versionDechoose}" 
                @click="chooseTbook(index,item)">{{item.bookversion_title}}</a>
           </div>
           <div class="tbookVersion gradeName">
                <label>年级: </label>
                <a  v-for="(item,index) in gradeVersion":class="{'activecolor':index==gradeDechoose}" 
                @click="chooseGrade(index,item.id)">{{item.chapter_title}}</a>
           </div>
       </div>
	    <div class="aside-left">
	    	<h1 class="chooseChapter">{{handledata.type=='chapters'?'选择章节':'选择知识点'}}</h1>
		    <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" style="border: 1px solid #dcdcdc;height:400px;overflow:auto;" @node-expand="nodeExpand"></el-tree>
	    </div>
      <div class="aside-right">
          <div class="chooseSort">
               <div class="tag-tit">题型: </div>
               <div class="tagContain">
                   <div class="tigList" v-for="(items,indexs) in prosortList[0]" @click="handleChooseSorts(items.id,indexs,0)" :class="{'activecolor':indexs==toggleBgColor1}">
                    {{items.question_channel_type_title}}
                  </div>
               </div>
          </div>
          <div class="chooseSort">
               <div class="tag-tit">难易程度: </div>
               <div class="tagContain">
                   <div class="tigList" v-for="(items,indexs) in prosortList[1]" @click="handleChooseSorts(items.id,indexs,1)" 
                  :class="{'activecolor':indexs==toggleBgColor2}">
                    {{items.difficult_index_title}}
                  </div>
               </div>
          </div>
          <div class="chooseSort">
               <div class="tag-tit">题类筛选: </div>
               <div class="tagContain">
                   <div class="tigList" v-for="(items,indexs) in prosortList[2]"
                   @click="handleChooseSorts(items.id,indexs,2)"
                    :class="{'activecolor':indexs==toggleBgColor3}">
                    {{items.exam_type_title}}
                  </div>
               </div>
          </div>
          <div class="chooseSort">
               <div class="tag-tit">知识点个数: </div>
               <div class="tagContain">
                   <div class="tigList" v-for="(items,indexs) in prosortList[3]"
                   @click="handleChooseSorts(items.id,indexs,3)"
                    :class="{'activecolor':indexs==toggleBgColor4}">
                    {{items.kid_num_title}}
                  </div>
               </div>
          </div>
          <div class="chooseSort lastChoose">
               <div class="tag-tit">适用年级: </div>
               <div class="tagContain checkList">
                   <template>
                    <el-checkbox-group v-model="applicableGrade" @change="checkgroup">
                      <el-checkbox :label=item.grade_title v-for="(item,index) in applicableGrade[0]" :key=item.grade_title :checked=true ></el-checkbox>
                    </el-checkbox-group>
                  </template>
               </div>
          </div>
      </div>
      <div class="sorting">
          <div class="sort-left">
              排序: <span>时间</span>
              <span>组卷次数</span>
          </div>
          <div class="sort-right">
              <el-button type="primary" size="mini" 
              @click="newTestQuestion"
              style="margin-right: 10px;">新建试题</el-button>
              共计 : <span>{{questListTotal||0}} 题</span>
          </div>
       </div>
      <div class="exam-list">
           <div class="beauty-man" v-for="(item,index) in searchExamList">
              <div class="exam-head clearFloat">
                 <div class="exam-head-left">
                     <span>题型：{{item.question_channel_type}}</span>
                     <i class="line"></i>
                     <span>题类：{{item.exam_type}}</span>
                     <i class="line"></i>
                     <span>难易度：{{item.difficult_index}}</span>
                 </div>
                 <div class="exam-head-right">
                      <span>试题来源: <a href="#" target="_blank" v-html="item.question_source"></a></span>
                 </div>
              </div>
              <div class="exam-con">
                   <div class="exam-q" @click="answerTogglefun(index+1)" >
                        <div v-html=item.question_text class="questionText"></div>
                      <!-- <el-checkbox 
                      size="mini"class="getQuesCon" v-model="checkArray[index]">选择</el-checkbox> -->
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
               <div class="exam-foot clearFloat">
                  <div class="exam-foot-left">
                       <!-- <a href="javascript:void(0);" target="_blank">
                          <i class="icona-jiexi"></i>查看解析
                       </a>
                       <a href="#" target="_blank">
                          <i class="icona-jiexi"></i>收藏
                       </a>
                        <a href="#" target="_blank">
                          <i class="icona-jiexi"></i>纠错
                       </a> -->
                  </div>
                  <div class="exam-foot-right">
                      <!-- <span>组卷次数:13次</span> -->
                      <span  class="addbtn J_AddQuestion"  @click="getQuesContent(item.question_id,item.question_text)">
                         <b>+</b>选题
                      </span>
                  </div>
               </div>
           </div>
             <!-- 新建讲义左侧dialog -->
        <div style="" v-show="caseDialogToggle" class="caseDialogdiv">
           <create-case  v-on:close="closeCaseDialog"></create-case>
        </div>
        <!-- 新建试题弹窗 -->
         <el-dialog  :visible.sync="newTestToggle" style="top:-10%;height: 1000px">
            <new-testdialog  v-on:close="closeNewTestDialog" :src="'http://192.168.0.172/question/public/index.php/api/math/upload_image'"></new-testdialog>
        </el-dialog>

           <pagination @pageclick="hasPagenub" :data="pageArray"></pagination>
      </div>

	</div>
</template>
<script>
  import $ from 'zeptojs'
  import require from '../api/request.js'
  export default {
  	name:'kledge-tree',
    props:['handledata'],
    data() {
      return {
        subjectName:[],
         prosortList:[],    //存储  题型、难易程度、题类、知识点个数 适用年级 等数据
        searchExamList:[],  //存储题库中习题列表数据
        applicableGrade:[],  
        applicableList:[], //存储适用年级列表数据
        gradeIdStorage:[],
        quesTextStorage:[],
        answerToggle:false,
        caseDialogToggle:false,
        keepRight:true,
        checked:[],
        num:0,
        pageArray:{
           page:1,
           total:500,
        },
        toggleShow:true,
        newTestToggle:false,
        versionDechoose:0,
        gradeDechoose:0,
         tbookVersion:[],
         gradeVersion:[],
         book_id:-1,
         grade_ver_id:-1,
        toggleBgColor1:0,
        toggleBgColor2:0,
        toggleBgColor3:0,
        toggleBgColor4:0,
        data:[],
        questListTotal:0,
        question_channel_type_id:-1,
        difficult_index_id:-1,
        exam_type_id:-1,
        kid_num_id:-1,
        chapter_id:-1,
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    mounted:function(){
      this.toggleshowFun()
      this.getTbooklist()
      this.getTopCategory()
      this.getFollowCategory()
      this.getKindsData()
      this.getquestionList()
      this.showCaseDialog()
    },
    watch:{
       handledata:{
              handler:function(vew,old){
                 this.data=[]   
                 this.chapter_id=-1
                 this.pageArray.page=1
                 this.toggleshowFun()
                 this.getquestionList()
                 this.getFollowCategory()
                 this.getTbooklist()
                 this.getTopCategory()
              },
                deep: true //深度监视，当对象中的属性发生变化时会被监控
                },
    },
    methods: {
              // 获取教材版本
    getTbooklist:function(){
      $.ajax({
                url: 'http://192.168.0.172/question/public/api/math/get_books',
                dataType:'json',
                data:{subject_id:this.$store.state.subject_id},
                success:(res)=>{
                  this.tbookVersion=res.data
                  this.book_id=-1
                },
                error:function(res,reb,rec){
                     console.log(res)
                }
              })
    },
    // 获取年级
    getTopCategory:function(){
           $.ajax({
                url: 'http://192.168.0.172/question/public/api/math/get_top_chapters',
                dataType:'json',
                data:{
                  book_id:this.book_id,
                },
                success:(res)=>{
                  this.gradeVersion=res.data
                },
                error:function(res,reb,rec){
                     console.log(res)
                   }
              })
    },
    chooseTbook:function(index,item){
                 this.data=[]   
                 this.chapter_id=-1
                 this.pageArray.page=1
                 this.versionDechoose=index
                 this.gradeDechoose=0;
                 this.book_id=item.id
                 this.grade_ver_id=-1
                 this.getTopCategory()
                 this.getFollowCategory()
                 this.getquestionList()

    },
    chooseGrade:function(index,id){
                 this.data=[]   
                 this.chapter_id=-1
                 this.pageArray.page=1
                 this.gradeDechoose=index
                 this.grade_ver_id=id
                 this.getFollowCategory()
                 this.getquestionList()
    },
      showCaseDialog:function(){
        var queryData=this.$route.query.toggleIndex;
         if(queryData=='newsCase'||queryData=='editCase'){
                   this.caseDialogToggle=true;
                   
         }
      },
        closeCaseDialog:function(){
            this.caseDialogToggle=false;
     },
      // 获取章节知识树
    getFollowCategory:function(catid,children){
       $.ajax({
                url: 'http://192.168.0.172/question/public/api/math/get_follow_categories',
                data:{
                   book_id:this.book_id,
                   grade_ver_id:this.grade_ver_id,
                   subject_id:this.$store.state.subject_id,
                   type:this.handledata.type,
                   chapter_id:catid||-1
                },
                success:(res)=>{
                    for(var i=0;i<res.data.length;i++){
                          var o={
                             label:"",
                             id:"",
                             haschild:"",
                             children:[]
                          }
                          o.label=res.data[i].chapter_title
                          o.id=res.data[i].id
                          o.haschild=res.data[i].haschild
                          if(catid==undefined){
                              this.data.push(o) 
                              this.data[i].children.push({})
                          }else{
                                children.push(o)
                              if(children[i].haschild==1){
                                   children[i].children.push({})
                              }
                          }
                    }
                },
                error:function(res,reb,rec){
                     console.log(res)
                }
              })
    },
     // 获取题型、难易程度、题类、知识点个数、适用年级等数据
      getKindsData:function(){
             $.ajax({
                 url:"http://192.168.0.172/question/public/api/math/get_kinds",
                 data:{
                    subject_id:this.$store.state.subject_id
                 },
                 success:(res)=>{
                     this.prosortList=res.data
                     this.applicableGrade=this.prosortList.slice(4)
                     for(var i=0;i<this.applicableGrade[0].length;i++){
                            this.applicableList.push(this.applicableGrade[0][i].grade_title)
                     }
                     this.prosortList.splice(4,1)
                 }
             })
      },
         // post请求
         // getquestionList:function(){
         //       let postData = this.$qs.stringify({
         //           grade_id:this.gradeIdStorage,
         //           question_channel_type_id:this.question_channel_type_id,
         //           difficult_index_id:this.difficult_index_id,
         //           question_exam_type_id:this.exam_type_id,
         //           kid_num_id:this.kid_num_id,
         //           book_id:this.handledata.book_id,
         //           grade_ver_id:this.handledata.grade_ver_id,
         //           subject_name:this.handledata.subject_name,
         //           chapter_id:this.chapter_id,
         //           page:this.pageArray.page,
         //           type:this.handledata.type,
         //          });
         //       this.axios({
         //          method: 'post',
         //          url:'http://192.168.0.172/question/public/api/math/get_questions',
         //          data:postData
         //      }).then((res)=>{
         //           this.searchExamList=res.data.data
         //           this.questListTotal=res.total
         //          console.log(res)
         //      });
         // },
      // 获取试题列表
      getquestionList:function(){
           $.ajax({
               url:'http://192.168.0.172/question/public/api/math/get_questions',
               data:{
                   grade_id:this.gradeIdStorage,
                   question_channel_type_id:this.question_channel_type_id,
                   difficult_index_id:this.difficult_index_id,
                   question_exam_type_id:this.exam_type_id,
                   kid_num_id:this.kid_num_id,
                   book_id:this.book_id,
                   grade_ver_id:this.grade_ver_id,
                   subject_id:this.$store.state.subject_id,
                   chapter_id:this.chapter_id,
                   page:this.pageArray.page,
                   type:this.handledata.type,
               },
               success:(res)=>{
                   this.searchExamList=res.data
                   this.questListTotal=res.total
                   this.pageArray.total=res.total
               }
           })
      },
      // 弹出新建试题
      newTestQuestion:function(){
            this.newTestToggle=true;
      },

      closeNewTestDialog(){
            this.newTestToggle=false;
      },
      // 给讲义添加试题
      getQuesContent:function(questId,questText){
        var newCasequestList=this.$store.state.newCasequestList
            var isclick=false;
              var o={
                       question_id:questId,
                       question_text:questText
                    }
                if(newCasequestList.length==0){
                       newCasequestList.push(o)
                        // this.quesTextStorage.push(o)
                        // this.$store.state.storageIdArray.push(o.id)
                        // =this.quesTextStorage
                        // this.$emit('getQuestionText',this.quesTextStorage)
                        return
                }
            for(var i=0;i<newCasequestList.length;i++){
                if(newCasequestList[i].question_id==o.question_id){
                      alert('您已经选过这道题了,请重新选择')
                       // this.quesTextStorage.splice(i,1)
                        // newCasequestList.splice(i,1)
                       // this.$store.state.storageIdArray.splice(i,1)
                       // this.$store.state.newCasequestList=this.quesTextStorage
                       // this.$emit('getQuestionText',this.quesTextStorage)
                       isclick=true;
                }             
            }
                if(isclick){
                  return
                }else{
                     newCasequestList.push(o)
                     // this.quesTextStorage.push(o)
                     // this.$store.state.storageIdArray.push(o.id)
                     // this.$store.state.newCasequestList=this.quesTextStorage
                     // this.$emit('getQuestionText',this.quesTextStorage)
                }
      },
      handleChooseSorts:function(itemId,index,number){
               switch(number){
                   case 0: this.question_channel_type_id=itemId;
                           this.toggleBgColor1=index;break;
                   case 1: this.difficult_index_id=itemId;
                           this.toggleBgColor2=index;break;
                   case 2: this.exam_type_id=itemId;
                           this.toggleBgColor3=index;break;
                   case 3: this.kid_num_id=itemId;
                           this.toggleBgColor4=index;break;
               }
                 this.getquestionList()
      },
      
      checkgroup:function(data){
            this.gradeIdStorage=[];
            for(var i=0;i<data.length;i++){
                  for(var j=0;j<data[0].length;j++){
                        if(data[i]==data[0][j].grade_title){
                            this.gradeIdStorage.push(data[0][j].id)
                        }
                  }
            }
           this.getquestionList()
      },
      handleNodeClick(data) {
          this.chapter_id=data.id
           this.getquestionList()
      },
      nodeExpand:function(data){
         if(data.isclick){
             return
         }
          data.children.splice(0,1)
          data.isclick=true
          this.getFollowCategory(data.id,data.children)
      },
      answerTogglefun:function(index){
         this.num=index
         this.answerToggle=!this.answerToggle
      },
      hasPagenub:function(data){
            this.pageArray.page=data
            this.getquestionList()
      },
      toggleshowFun:function(){
      if(this.handledata.type=='knowledges'){
                    this.toggleShow=false
               }else{
                   this.toggleShow=true
               }
      }
    }
  };
</script>
<style  scoped>
 .caseDialogdiv{
        border: 1px solid rgb(220, 220, 220);position:fixed; top:30%;left: 1%;width:30%; height: 60%;font-size: 14px;z-index: 1000;background: #FFFFFF;
    }
.el-tree-node{
   white-space: normal;
}
.el-tree-node__content{
    height: auto;
}
	#kledgeTree{
		width: 1200px;
		margin-left: auto;
		margin-right: auto;
	}
  #kledgeTree:after{
     content: '';
     display: block;
     clear: both;
     height: 0;
  }
	.aside-left{
		width: 260px;
		height: auto;
    float: left;
	}
	.chooseChapter{
      height: 40px;
	    line-height: 40px;
	    background: #3db06e;
	    color: #fff;
	    font-size: 14px;
      text-align: center;
	}
	.aside-right{
      width:925px;
      height: auto;
      float: right;
      font-size: 12px;
      border: 1px solid #dcdcdc;
      margin-top: 10px;
  }
  .chooseSort{
    height: 40px;
    line-height: 40px;
    margin: 0 20px -1px;
    border-bottom: 1px dashed #dcdcdc;
  }
  .tag-tit{
    float: left;
    width: 72px;
    margin-right: -72px;
    color: #666;
    text-align: right;
  }
  .tagContain{
      margin-left: 72px;
  }
  .tigList{
      display: inline-block;
      height: 20px;
      line-height: 20px;
      margin: 8px;
      padding: 0 10px;
      color: #333;
      border-radius: 5px;
      border-bottom: none;
  }
  .activecolor{
      background: #17b55b; 
      color: #ffffff;
    }
  .lastChoose{
      border-bottom: none;
  }
  .tigList:hover{
    background: #17b55b;
    color: #fff;
    cursor: pointer;
  }
  .checkList{
      margin-left: 90px;
  }
  .checkList .el-checkbox__label{
       font-size: 12px;
  }
  .sorting{
      width:925px;
      margin: 15px auto 0;
      overflow: hidden;
      color: #999;
      font-size: 12px;
      float:left;
  }
  .sorting:after{
    content: "";
    display: block;
    height: 0;
    clear: both;
  }
  .sort-left{
    cursor: pointer;
    margin-left: 15px;
    float: left;
  }
  .sort-left span{
      margin-left: 15px;
      color: #333;
  }
 .sort-right{
     float: right;
 }
  .sort-right span{
         color: #333;font-weight: bold;
  }
  .exam-list{
      width: 925px;
      height: auto;
      float: right;
      margin-top: 10px;
      /*border: 1px solid #dcdcdc;*/
      cursor: pointer;
      font-size: 14px;
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
  .beauty-man{
      border: 1px solid #dcdcdc;
      margin-bottom:10px; 
      /*overflow: hidden;*/
  }
  .exam-q{
     height: auto;

  }
  .exam-foot{
    height: 50px;
    padding: 0 18px;
    border-top: 1px dashed #dcdcdc;
  }
  .exam-foot-left{
     float: left;
  }
  .exam-foot a{
      text-decoration: none;
  }
  .exam-foot-left a {
    margin-right: 25px;
    font-size: 14px;
    color: #333;
    line-height: 50px;
  }
  .exam-foot-right{
       float: right;
  }
   .exam-foot-right span{
    margin-right: 30px;
    font-size: 12px;
    color: #999;
    line-height: 50px;
  }
  .exam-foot-right .addbtn {
    background: #17b55b;
    font-size: 14px;
    height: 35px;
    line-height: 35px;
    margin: 7px 0;
    padding: 0 24px;
    border-radius: 5px;
    color: #fff;
    display: inline-block;
}
.exam-answer{
    border-top: 1px dashed #dcdcdc;
    padding-top: 20px;
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
.version{
      width: 1200px;
      height: 80px;
      margin-bottom: 10px;
      border: 1px solid #dcdcdc;
      background: #eee;  
      margin-left: auto;
      margin-right: auto; 
    }
    .tbookVersion{
      height: 40px;
      line-height: 40px;
      width: 95%;
        color: #666;
        font-size: 12px;
      margin-left: auto;
      margin-right: auto;
      border-bottom: 1px dashed #dcdcdc;
    }
    .tbookVersion a{
      color: #666;
      text-decoration: none;
      padding: 3px 6px;
      margin-left: 16px;
      border-radius: 5px;
      cursor: pointer;
    }
    .tbookVersion a:hover{
       background: #17b55b;
       color: #ffffff;
    }
    .gradeName{
      border: none;
    }
    .tbookVersion .activecolor{
      background: #17b55b; 
      color: #ffffff;
    }
</style>