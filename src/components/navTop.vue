<template>
    <div id="topnavContain">
       <home-header></home-header>
    	 <div class="topNav-bg">
    	 	 <div class="topNav">
    	 	    <div class="curSubject" @mouseover="menuShow" @mouseout="menuHiden" >当前: {{subject_name}}
                    <div class="menuList" v-show="menuToggle">
                    	<div class="menuSon ">
                    	    <div class="schoolSort">小学</div>
                    	    <a href="javascript:void(0);" v-for="(item,index) in primaryScho" @click="chooseSubject(item.id,item.title)" v-if="item.school_cat_id==1">{{item.title}}
                    	    </a>
                    	</div>
                    	<div class="menuSon">
                    	    <div class="schoolSort">初中</div>
                    	    <a href="javascript:void(0);" v-for="(item,index) in primaryScho" @click="chooseSubject(item.id,item.title)" v-if="item.school_cat_id==2">{{item.title}}
                    	    </a>
                    	</div>
                    	<div class="menuSon">
                    	    <div class="schoolSort" >高中</div>
                    	    <a href="javascript:void(0);" v-for="(item,index) in primaryScho" @click="chooseSubject(item.id,item.title)" v-if="item.school_cat_id==3">{{item.title}}
                    	     </a>
                    	</div>
                    </div>
    	 	    </div>
    	 	    <router-link to="/kledgeTree">
    	 	    	<div class="handleVolume" @mouseover="manualVolumeShow" @mouseout="manualVolumeHiden" >手动组卷
                      <div class="handleChoose" v-show="manualVolumeToggle">
                      	  <a href="javascript:void(0);" @click="handleChoose(1)">章节同步选题</a>	
                      	  <a href="javascript:void(0);" @click="handleChoose(2)">知识点选题</a>	
                      </div>
    	 	    </div>
    	 	    </router-link>
    	 	    <router-link to="/handout">
    	 	    	<div class="handleVolume handout" >讲义</div>
    	 	    </router-link>
    	 	    
    	     </div>
    	 </div>
    	 <router-view :handledata="handleChooseInfo"></router-view>	
    </div>
</template>
<script>
  import $ from 'zeptojs'
export default{
	name:'nav-top',
	data(){
		return{
			menuToggle:false,
			manualVolumeToggle:false,
			versionDechoose:0,
			gradeDechoose:0,
      caseData:{},
      toggleIndex:1,
			handoutShow:false,
			book_id:-1,
      kname:'',
			handleChooseInfo:{
           type:'chapters',
			},
			subject_name:'高中数学',
			primaryScho:[],
      gradeVersion:[],
		}
	},
	mounted:function() {
		  this.getSubname()
		},
	methods:{
     // 获取年级学科
       getSubname:function(){
               this.axios.get('http://192.168.0.172/question/public/index.php/api/math/class_subject_info').then((res)=>{
                         this.primaryScho=res.data.data
               })

            },
		menuShow:function(){
			 this.menuToggle=true;
		},
		menuHiden:function(){
			 this.menuToggle=false;
		},
		manualVolumeShow:function(){
            if(this.toggleIndex==1){
             this.manualVolumeToggle=true;
            }
		},
		manualVolumeHiden:function(){
              this.manualVolumeToggle=false;
		},
	
		handleChoose:function(num){
			this.manualVolumeToggle=false;
             if(num==1){
             	 this.handleChooseInfo.type='chapters'
             }else{
             	 this.handleChooseInfo.type='knowledges'
             }
             this.$router.push('kledgeTree')
		},
		tabToggle:function(index){
      this.toggleIndex=index
		},
    chooseSubject:function(subjectId,subject_name){
          // this.subject_name=event.target.parentNode.children[0].innerHTML+subjectName
          // this.handleChooseInfo.subject_name=this.subject_name
            this.subject_name=subject_name
            this.$store.state.subject_id=subjectId;
            this.menuToggle=false;
            this.$router.push('kledgeTree')
    },    
	}
}
</script>
<style  scoped>
    #topnavContain{
    	/*height: 110px;*/
    	width: 100%;
    }
	.topNav{
		width: 1200px;
		height: 50px;
		line-height: 50px;
		margin-left: auto;
		margin-right: auto;
		cursor: pointer;
		background: #52c684;
	}
  .topNav:after{
      content:"";
      display: block;
      height: 0;
      clear: both;
  }
	.topNav-bg{
		width: 100%;
		background: #52c684;
	}
	.curSubject{
		width: 260px;
	    background: #f19159;
	    color:white; 
	    padding-left: 15px;
	    float: left;
	    position: relative;
	    box-sizing: border-box;
	}
	.handleVolume{
         width: 150px;
         text-align: center;
         color: white;
         display: inline-block;
         /*float: left;*/
         background: #3db06e;
         position: relative;
         z-index: 100
	}
	.handleChoose{
		position: absolute;
		line-height: 50px;
		top: 50px;
		left: 0px;
		background: white;
		width: 150px;
		height: auto;
		border: 1px solid #ccd5d8;
		box-shadow: 0 0 5px #ccc;
	}
	.handleVolume .handleChoose a{
		 display: block;
		 width: 100%;
		 margin-left: auto;
		 margin-right: auto;
		 color: black;
		 border-radius: 5px;
		 text-decoration: none;
	}
	.handleVolume .handleChoose a:hover{
		 background: #52c684;
		 color: white;
	}
	.menuList{
		top: 50px;
		left: 0;
		width: 260px;
		height: auto;
		z-index: 10;
		position:absolute;
		background: white;
		border: 1px solid #ccd5d8;
		box-shadow: 0 0 5px #ccc;
	}
	.menuSon{
		margin: 5px;
		line-height: 30px;
	}
	.schoolSort{
		 margin-left: 5px;
	}
	.menuSon a{
		text-decoration: none;
		color: black;margin-right: 10px;
		font-size: 13px;
    display: inline-block;
		margin-left: 5px;
		padding: 2px 5px;
		border-radius: 5px;
	}
	.menuSon a:hover{
		 background: #52c684;
		 color: white;
	}
	.schoolSort{
		width: 100px;
		height: 30px;
		line-height: 30px;
		color: black;
		padding-left: 5px;
		font-weight: bold;
	}
    .curPosition{
    	height: 50px;
    	line-height: 50px;
    	width: 1200px;
    	color: #999;
    	font-size: 12px;
    	margin-left: auto;
    	margin-right: auto;
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
    .handout{
    	margin-left: 20px;
    	position: relative;
    }
    .caseDialogdiv{
        border: 1px solid rgb(220, 220, 220);position:fixed; top:30%;left: 1%;width:30%; height: 60%;font-size: 14px;z-index: 1000;background: #FFFFFF;
    }
</style>