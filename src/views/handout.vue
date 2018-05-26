<template>
	<div id="handout">
	  <div class="elIconEdit" @click="handleKTreeDialogshow">
	  	  <el-button type="primary" icon="el-icon-edit" circle></el-button>
	  </div>
	  <div class="case-left" >
	   <h1 class="chooseChapter">选择知识点</h1>
        <div class="custom-tree-container">
		  <div class="block">
		    <el-tree 
		      style="border: 1px solid #dcdcdc;height:400px;overflow:auto;"
		      @node-click="handleNodeClick"
		       @node-expand="nodeExpand"
		      :data="data"
		      node-key="id">
		      <span class="custom-tree-node" slot-scope="{node, data}" style="line-height: 30px;">
		        <span @click="nodeClick(node,data)">{{ data.label}}</span>
		        <span>
		        </span>
		      </span>
		    </el-tree>
		  </div>
		 </div>
		</div> 

    <div class="case-right" @ondrop="drop($event)" @ondragover="allowDrop($event)">
         <div style="text-align: left;" class="chooseDegree">
             <label style="color:#606266; font-size:14px;">难度:</label>
              <el-button type="danger" size="mini" round @click="chooseDanSuc(5)">难</el-button>
              <el-button type="success" size="mini" round  @click="chooseDanSuc(3)">中</el-button>
              <el-button type="info" size="mini" round  @click="chooseDanSuc(1)"> 易</el-button>
              <el-button type="info" class="increaseCase" @click="handlerNewsCase">+新建讲义</el-button>
         </div>
         <el-table :data="tableData" style="width: 100%;text-align: center;" border>
              <el-table-column  prop="case_title"  label="讲义名称"  width="180"></el-table-column>
              <el-table-column  prop="case_difficult_index" label="难度"  width="180" >
              </el-table-column>
              <el-table-column  prop="c_time" label="创建时间" width="180"></el-table-column>
              <el-table-column   prop="case_author" label="创建人"  width="180">
              </el-table-column>
              <el-table-column label="操作">
                    <template slot-scope="scope" >
             <div style="cursor: pointer;" @click="openTopicDialog(scope.$index,scope.row)">
                  <span @click="previewCaseFun(scope.row.id)">预览</span>
                  <span @click="editCaseFun(scope.row.id)">编辑</span>
                  <span  @click="deleteCaseFun(scope.row.id,scope.$index)">删除</span>
              </div>
              </template>
              </el-table-column>
            </el-table>
    </div>
          <!-- 左侧知识树弹窗 -->
		     <el-dialog  :visible.sync="kTreeDialogToggle" style="top:-10%;" :close-on-click-modal="false" :show-close="false">
            <hand-dialog  v-on:close="closeKTreeHandler"></hand-dialog>
        </el-dialog>

        <!-- 预览讲义弹窗 -->
        <el-dialog  :visible.sync="previewCaseDialogToggle" style="top:-10%;" class="preview" >
            <preview-case  v-on:close="closePreviewHandler" :data="previewData"></preview-case>
        </el-dialog>
	 </div>
</template>
<script>
  let id = 1000;
  import $ from 'zeptojs'
  export default {
  	name:'handout',
    data() {
      return {
        tableData: [],
      	chapter_id:-1,
        previewData:{
           questionList:[],
           case_title:'',
           case_difficult_index:'',
           case_knowledge_node_title:''
        },
        caseDialogToggle:false,
      	kTreeDialogToggle:false,
        previewCaseDialogToggle:false,
      	data:[],
        page:1,
        nodeLevel:false,
        degreeIndex:'',
        kledgeName:{},
      }
    },
    mounted:function(){
    	 this.getFollowCategory()
       this.getCaseList()
    },
    methods: {
                // 获取讲义中知识树列表
    	getFollowCategory:function(catid,children){
          $.ajax({
                url: 'http://192.168.0.172/question/public/api/math/get_follow_categories',
                data:{
                   type:'case_knowledge_nodes',
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
    // 获得讲义列表
      getCaseList:function(){
           var _this=this
            this.axios.get('http://192.168.0.172/question/public/index.php/api/math/get_case_lists',{
               params:{
                  type:'case_knowledge_cases',
                  subject_id:this.$store.state.subject_id,
                  case_knowledge_node_id:this.kledgeName.id,
                  case_author:'',
                  case_difficult_index:this.degreeIndex,
                  page:this.page,
                  pagesize:10,
               }
            })
            .then(function(res){
                 _this.tableData=res.data.data
            })
      },
      // 编辑讲义
      editCaseFun:function(caseId){
          var _this=this;
           this.axios.get('http://192.168.0.172/question/public/index.php/api/math/get_case_details',{
               params:{
                  type:'case_knowledge_cases',
                  subject_id:this.$store.state.subject_id,
                  case_id:caseId
               }
           }).then(function(res){
                _this.$store.state.newCasequestList=res.data.data.questions
                _this.$store.state.caseId=res.data.data.cases.id
                _this.$store.state.caseLevel=res.data.data.cases.case_difficult_index
                _this.$store.state.show.id=res.data.data.cases.case_knowledge_node_id
                _this.$store.state.editCase.case_title=res.data.data.cases.case_title

                // _this.$store.state.isToggle=!_this.$store.state.isToggle
                // _this.$emit('setToggleindex',1)
                _this.$store.state.show.name=res.data.data.case_knowledge_nodes.case_knowledge_node_title
                _this.$router.push({path:'kledgeTree',query:{toggleIndex:'editCase'}})
           })
      },
      // 删除讲义
       deleteCaseFun:function(caseId,index){
            this.axios.get('http://192.168.0.172/question/public/index.php/api/math/case_delete',{
                 params:{
                     type:'case_knowledge_cases',
                     subject_id:this.$store.state.subject_id,
                     case_id:caseId
                 }
            }).then((res)=>{
              console.log(res)
                 alert('删除成功')
                 this.tableData.splice(index,1)
            })
       },
              // 预览讲义
        previewCaseFun:function(caseId){
            var _this=this
             this.axios.get('http://192.168.0.172/question/public/index.php/api/math/get_case_details',{
                 params:{
                     type:'case_knowledge_cases',
                     subject_id:this.$store.state.subject_id,
                     case_id:caseId
                 }
            }).then(function(res){
                _this.previewData.case_knowledge_node_title=res.data.data.case_knowledge_nodes.case_knowledge_node_title
                _this.previewData.case_difficult_index=res.data.data.cases.case_difficult_index
                _this.previewData.questionList=res.data.data.questions
                _this.previewData.case_title=res.data.data.cases.case_title
                _this.previewCaseDialogToggle=true;
            })
        },
     handleKTreeDialogshow:function(){
           this.kTreeDialogToggle=true;
     },
     closeKTreeHandler:function(fromData){
           console.log(fromData)
           if(fromData=='certain'){
               this.data=[];
               this.getFollowCategory()
           }else if(fromData=='recall'){
                 
           }
        this.kTreeDialogToggle=false;
     },
     closePreviewHandler:function(){
           this.previewCaseDialogToggle=false
     },
     handlerNewsCase:function(){
       if( Object.keys(this.kledgeName).length==0){
           alert('你还未选择知识点')
           return
       }
         if(this.nodeLevel){
                this.$router.push({path:'kledgeTree',query:{toggleIndex:'newsCase'}})
                this.$store.state.show=this.kledgeName
         }else{
            alert('只有三级目录才能创建讲义')
         }
         // this.$emit('setToggleindex',1)
         // this.caseDialogToggle=true;
     },
     // closeCaseDialog:function(){
     //        this.caseDialogToggle=false;
     // },
      handleNodeClick(data) {
          this.chapter_id=data.id
          this.kledgeName.name=data.label
          this.kledgeName.id=data.id
          this.$store.state.show=this.kledgeName
          this.degreeIndex=''
          this.getCaseList()
      },
      nodeClick:function(node,data){
           if(node.level==1||node.level==2){
                   this.nodeLevel=false;
           }else{
              this.nodeLevel=true
           }
      },
      nodeExpand:function(data){
         if(data.isclick){
             return
         }
          data.children.splice(0,1)
          data.isclick=true
          this.getFollowCategory(data.id,data.children)
      },
       append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },
      openTopicDialog:function(){
            
      },
      chooseDanSuc:function(index){
             this.degreeIndex=index
             this.getCaseList()
      },
    }
  };
</script>
<style>
	#handout{
		margin-left: auto;margin-right: auto;
		width: 1200px;position: relative;
	}
 /* #handout :after{
     content:'';
     display: block;
     height: 0;
     clear: both;
  }*/
	.chooseChapter{
      height: 40px;
	    line-height: 40px;
	    background: #3db06e;
	    color: #fff;
	    font-size: 14px;
      text-align: center;
	}
	.case-left{
		width: 260px;
		height: auto;
    float: left;
	}
  .case-right{
       height:auto;
       float:left;
       display: inline-block;
       width: 900px;
       margin-top: 10px;
       margin-left: 10px;
       border: 1px solid rgb(220, 220, 220);
  }
	.elIconEdit{
		position: absolute;
		top:3px;left: -50px;
		z-index: 10
	}
  .el-table th{
      text-align: center;
  }
  .chooseDegree{
     height: 40px;
     line-height: 40px;
  }
  .chooseDegree label{
       margin-left: 30px;
  }
   .chooseDegree button{
       margin-left: 30px;
   }
   .increaseCase{
      float: right;
      margin-top: 5px;margin-right: 10px;
   }
   .preview .el-dialog{
       width: 62%;
   }
</style>