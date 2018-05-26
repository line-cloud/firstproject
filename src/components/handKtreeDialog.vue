<template>
	<div id="handoutDialog">
		<div>编辑树结构</div>
	  <div class="aside-left-dialog">
        <div class="custom-tree-container">
		  <div class="block">
		    <el-tree 
		      style="border: 1px solid #dcdcdc;height:400px;overflow:auto;"
		      @node-click="handleNodeClick"
		       @node-expand="nodeExpand"
		      :data="data"
		      node-key="id"
		        :expand-on-click-node="false"
		       >
		      <span class="custom-tree-node" slot-scope="{ node, data }" style="line-height: 40px;">
		        <span >{{ data.label}}</span>
		        <span>
		          <el-button
		          v-if="!(node.level==1||node.level==3)"
		           style="margin-left: 30px;"
		            type="text"
		            size="mini"
		            @click="() => append(data,node)">
		            添加子集
		          </el-button>
		          <el-button
		            v-if="!(node.level==1||node.level==2)"
		            type="text"
		            size="mini"
		            @click="() => remove(node, data)">
		            删除
		          </el-button>

		          <el-button
		           style="margin-left: 30px;"
		            type="text"
		            size="mini"
		            @click="() => editCase(data,node)">
		            编辑
		          </el-button>
		           <div class="editDiv" v-show="editId==data.id&&editInput">
		           	   <input type="text" name="" v-model="editValue">
		           	   <button  @click="makesurefun(data,node)">确认</button>
		           	   <button  @click="cancelfun">取消</button>
		           </div>
		        </span>
		      </span>
		    </el-tree>
		  </div>
		</div>
		</div> 
		<div style="text-align: right ;padding-right: 40px" >
      <el-button type="primary" @click="certainFun">确定</el-button>
		</div>
	 </div>
</template>
<script>
  let id = 10000;
  import $ from 'zeptojs'
  export default {
  	name:'hand-dialog',
    data() {
      return {
      	chapter_id:-1,
      	data:[],
      	editId:-1,
      	parentId:-1,
      	editInput:false,
      	editValue:'',
      }
    },
    mounted:function(){
    	 this.getFollowCategory()
    },
    methods: {
    	// 获取知识树列表
    	getFollowCategory:function(catid,children){
          $.ajax({
                url: 'http://192.168.0.172/question/public/api/math/get_follow_categories',
                data:{
                   type:'case_knowledge_nodes',
                   chapter_id:catid||-1
                },
                success:(res)=>{
                	console.log(res)
                    for(var i=0;i<res.data.length;i++){
                          var o={
                             label:"",
                             id:"",
                             level:"",
                             haschild:"",
                             children:[]
                          }
                          o.label=res.data[i].chapter_title
                          o.id=res.data[i].id
                          o.level=res.data[i].level
                          o.haschild=res.data[i].haschild
                          if(catid==undefined){
                          	  // this.data=[]
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
                     // console.log(res)
                }
              })
    },
       // 增加或编辑树结构节点
    handleKnowledgeEdit:function(){
       $.ajax({
    	url:'http://192.168.0.172/question/public/index.php/api/math/case_knowledge_edit',
        data:{
          type:'case_knowledge_cases',
    			subject_id:this.$store.state.subject_id,
    			case_knowledge_content:this.editValue,
    			parent_id:this.parentId,
    			case_knowledge_node_id:this.editId,
        },
         success:(res)=>{
         },
         error:()=>{
         	 console.log('请求错误')
         }
      })
    },
     // 删除树结构节点
     handleKnowledgeDelete:function(){
      $.ajax({
    	url:'http://192.168.0.172/question/public/index.php/api/math/case_knowledge_delete',
        data:{
        	type:'case_knowledge_cases',
    			subject_id:this.$store.state.subject_id,
    			parent_id:this.parentId,
			   case_knowledge_node_id:this.editId
        },
         success:(res)=>{
         },
         error:()=>{
         	console.log('请求错误')
         }
      })
     },
      handleNodeClick(data) {
          this.chapter_id=data.id
      },
      nodeExpand:function(data){
         if(data.isclick){
             return
         }
          data.children.splice(0,1)
          data.isclick=true
          this.getFollowCategory(data.id,data.children)
      },
      editCase(data,node){
        this.editInput=true
      	this.editId=data.id
      	this.editValue=data.label
      },
      append(data,node) {
        if(node.childNodes.length>0){
        }else{
      	  data.isclick=true    //有子集和没子集做下判断
        }
        const newChild = { id: id++, label: '请编辑内容', children: [] };
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
        this.parentId=node.parent.data.id
        this.editId=data.id
        this.handleKnowledgeDelete()

      },
      makesurefun:function(data,node){
      	   this.parentId=node.parent.data.id
      	   data.label=this.editValue
      	   this.editInput=false
      	   this.handleKnowledgeEdit()
      	//    for(var i=0;i<node.parent.childNodes.length;i++){
      	// 	   if(node.parent.childNodes[i].label==data.label){
      		   	       
      	// 	   }
      	// }
      },
      cancelfun:function(){
      	    this.editInput=false
      },
      // 整个弹窗的确认和取消
      certainFun:function(){
           // this.getFollowCategory()
      	   this.$emit('close','certain')
      },
      recallFun:function(){
          this.data=[]
          this.getFollowCategory()
          this.$emit('close','recall')
      }
    }
  };
</script>
<style  scoped>
	#handoutDialog{
		height: 500px;
		/*width: 1200px;height: 600px;*/
	}
	.chooseChapter{
        height: 40px;
	    line-height: 40px;
	    background: #3db06e;
	    color: #fff;
	    font-size: 14px;
      text-align: center;
	}
	.el-button--text{
		margin-left: 20px;
	}
	.makeSure{
		text-align: right;
		margin-top: 10px;
	}
	.editDiv{
		display: inline-block;
		margin-left: 20px;
	}
	.editDiv button{
		 cursor: pointer;
	}
</style>