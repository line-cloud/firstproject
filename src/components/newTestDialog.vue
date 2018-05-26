<template>
    <div class="vue-uploader">
        <form action="http://192.168.0.172/question/public/index.php/api/math/upload_image" method="post" enctype="multipart/form-data">
            <input type="file" name="imgInfo">
            <input type=submit name="submit1" value="登陆"> 
        </form> 
        <h3 style="text-align: center;">新建试题</h3>
        <span>上传试题图片</span>
        <div class="file-list">
            <section v-for="(file, index) of files" class="file-item draggable-item">
                <img :src="file.src" alt="" ondragstart="return false;">
                <p class="file-name">{{file.name}}</p>
                <span class="file-remove" @click="remove(index)">+</span>
            </section>
            <section v-if="status == 'ready'" class="file-item">
                <div @click="add" class="add">
                    <span>+</span>
                </div>
            </section>
        </div>
          <span>上传答案图片</span>
        <div class="file-list">
            <section v-for="(file, index) of filesd" class="file-item draggable-item">
                <img :src="file.src" alt="" ondragstart="return false;">
                <p class="file-name">{{file.name}}</p>
                <span class="file-remove" @click="remove(index)">+</span>
            </section>
            <section v-if="status == 'ready'" class="file-item">
                <div @click="adds" class="add">
                    <span>+</span>
                </div>
            </section>
        </div>
       <!--  <div style="height: 400px;border: 1px solid #e5e5e5;">
            <div class="writeInfo">
                <label>选择年级科目</label>
                <el-select v-model="selectSubjectValue" placeholder="请选择" @change="selectChange" style="margin-top: 5px;">
                       <el-option
                          v-for="item in subjectName"
                          :key="item.id"
                          :label="item.title"
                          :value="item.id">
                       </el-option>
                 </el-select>
            </div>
            <div class="writeInfo">
                <label>选择试题所属类别</label>
                 <el-select v-model="selectSortValue" placeholder="请选择" @change="selectChange" style="margin-top: 5px;">
                       <el-option
                          v-for="item in sortOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                 </el-select>
            </div>
             <div class="writeInfo" v-show="selectSortValue=='chapters'">
                <label>选择教材版本</label>
                 <el-select v-model="selectBookValue" placeholder="请选择" @change="selectChange" style="margin-top: 5px;">
                       <el-option
                          v-for="item in bookOptions"
                          :key="item.id"
                          :label="item.bookversion_title"
                          :value="item.id">
                        </el-option>
                 </el-select>
            </div>
             <div class="writeInfo" v-show="selectSortValue=='chapters'">
                <label>选择年级列表</label>
                 <el-select v-model="selectGradeValue" placeholder="请选择"  style="margin-top: 5px;">
                       <el-option
                          v-for="item in gradeOptions"
                          :key="item.id"
                          :label="item.chapter_title"
                          :value="item.id">
                        </el-option>
                 </el-select>
            </div>
            <div class="writeInfo">
                <label>选择所属题型</label>
                 <el-select v-model="selectQtypeValue" placeholder="请选择"  style="margin-top: 5px;">
                       <el-option
                          v-for="item in prosortList[0]"
                          :key="item.id"
                          :label="item.question_channel_type_title"
                          :value="item.id">
                        </el-option>
                 </el-select>
            </div>
             <div class="writeInfo">
                <label>选择难易程度</label>
                 <el-select v-model="selectDegreeValue" placeholder="请选择"  style="margin-top: 5px;">
                       <el-option
                          v-for="item in prosortList[1]"
                          :key="item.id"
                          :label="item.difficult_index_title"
                          :value="item.id">
                        </el-option>
                 </el-select>
            </div>
             <div class="writeInfo">
                <label>选择题类筛选</label>
                 <el-select v-model="selectFilterValue" placeholder="请选择" style="margin-top: 5px;">
                       <el-option
                          v-for="item in prosortList[2]"
                          :key="item.id"
                          :label="item.exam_type_title"
                          :value="item.id">
                        </el-option>
                 </el-select>
            </div>
            <div class="writeInfo">
                <label>选择知识点个数</label>
                 <el-select v-model="selectKnumValue" placeholder="请选择" style="margin-top: 5px;">
                       <el-option
                          v-for="item in prosortList[3]"
                          :key="item.id"
                          :label="item.kid_num_title"
                          :value="item.id">
                        </el-option>
                 </el-select>
            </div>
            <div class="tagContain checkList">
                   <template>
                    <label >适用年级</label>
                    <el-checkbox-group v-model="applicableGrade" @change="checkgroup" style="margin-top: 15px;">
                      <el-checkbox :label=item.grade_title v-for="(item,index) in applicableGrade[0]" :key=item.grade_title :checked=true ></el-checkbox>
                    </el-checkbox-group>
                  </template>
               </div>
        </div> -->
        <section v-if="files.length != 0" class="upload-func">
            <div class="operation-box">
                <button v-if="status == 'ready'" @click="submit">上传</button>
                <button v-if="status == 'finished'" @click="finished">完成</button>
            </div>
        </section>
        <input type="file" accept="image/*" @change="fileChanged" ref="file" multiple="multiple" name="picInfo">
        <input type="file" accept="image/*" @change="fileChangeds" ref="filed" multiple="multiple">
    </div>
</template>
<script>
      import $ from 'zeptojs'
    export default {
        name:"new-testdialog",
        props: {
            src: {
                type: String,
                required: true
            }
        },
        data() {
            return {
                status: 'ready',
                input:'',
                files: [],
                filesd: [],
                point: {},
                uploading: false,
                percent: 0,
                toggleOver:false,
                subjectName:[],
                applicableGrade:[],  
                prosortList:[],
                selectSubjectValue:'',
                selectSortValue:'',
                selectBookValue:'',
                selectGradeValue:'',
                selectQtypeValue:'',
                selectDegreeValue:'',
                selectFilterValue:'',
                selectKnumValue:'',
                bookOptions:[],
                gradeOptions:[],
                sortOptions:[
                   {
                     value:'chapters',
                     label:'章节',
                   },
                    {
                     value:'knowledges',
                     label:'知识点',
                   },
                ]
            }
        },
        mounted:function(){
            this.getSubname()
            this.getTbooklist()
            this.getKindsData()
            this.getTopCategory()
        },
        methods: {
            selectChange:function(data){
                 this.getTopCategory()
            },
            getSubname:function(){
               this.axios.get('http://192.168.0.172/question/public/index.php/api/math/class_subject_info').then((res)=>{
                         this.subjectName=res.data.data
               })

            },
        getTbooklist:function(){
            $.ajax({
                url: 'http://192.168.0.172/question/public/api/math/get_books',
                dataType:'json',
                data:{subject_id:this.$store.state.subject_id},
                success:(res)=>{
                  this.bookOptions=res.data
                  this.selectBookValue=''
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
                  book_id:this.selectBookValue||-1,
                },
                success:(res)=>{
                  this.gradeOptions=res.data
                },
                error:function(res,reb,rec){
                     console.log(res)
                   }
              })
    },
            getKindsData:function(){
             $.ajax({
                 url:"http://192.168.0.172/question/public/api/math/get_kinds",
                 data:{
                    subject_id:this.$store.state.subject_id
                 },
                 success:(res)=>{
                     this.prosortList=res.data
                     this.applicableGrade=this.prosortList.slice(4)
                     this.prosortList.splice(4,1)
                 }
             })
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
      },
            add() {
                this.$refs.file.click()
            },
             adds() {
                this.$refs.filed.click()
            },
            submit() {
                if (this.files.length === 0) {
                    console.warn('no file!');
                    return
                }
                const formData = new FormData()
                this.files.forEach((item) => {
                    formData.append("imgInfo", item.file)
                    // console.log(formData.get("qwe"))
                })

                 // let postData = this.$qs.stringify({
                 //         formData
                 // })

                 // this.axios({
                 //    method:'post',
                 //    url:this.src,
                 //    data:formData,
                 // }).then((res)=>{
                 //       console.log(res)
                 //     // console.log('成功')
                 // })
                
                const xhr = new XMLHttpRequest()
                // xhr.upload.addEventListener('progress', this.uploadProgress, false)
                xhr.open('POST', this.src, true)
                // xhr.setRequestHeader('content-type','multipart/form-data')
                this.uploading = true
                xhr.send(formData)
                xhr.onload = () => {
                    this.uploading = false
                    if (xhr.status === 200 || xhr.status === 304) {
                        this.status = 'finished'
                        console.log('upload success!')
                    } else {
                        console.log(`error：error code ${xhr.status}`)
                    }
                }
            },
            finished() {
                this.files = []
                this.status = 'ready'
            },
            remove(index) {
                this.files.splice(index, 1)
            },
            fileChanged() {
                const list = this.$refs.file.files
                for (let i = 0; i < list.length; i++) {
                    if (!this.isContain(list[i])) {
                        const item = {
                            name: list[i].name,
                            size: list[i].size,
                            file: list[i]
                        }
                        this.html5Reader(list[i], item)
                        this.files.push(item)
                    }
                }
                this.$refs.file.value = ''
            },
            fileChangeds() {
                const list = this.$refs.filed.files
                for (let i = 0; i < list.length; i++) {
                    if (!this.isContaind(list[i])) {
                        const item = {
                            name: list[i].name,
                            size: list[i].size,
                            file: list[i]
                        }
                        this.html5Reader(list[i], item)
                        this.filesd.push(item)
                    }
                }
                this.$refs.filed.value = ''
            },
            // 将图片文件转成BASE64格式
            html5Reader(file, item){
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.$set(item, 'src', e.target.result)
                }
                reader.readAsDataURL(file)
            },
            isContain(file) {
              return this.files.find((item) => item.name === file.name && item.size === file.size)
            },
            isContaind(file) {
              return this.filesd.find((item) => item.name === file.name && item.size === file.size)
            },
        }
    }
</script>
<style scoped>
.vue-uploader {
    border: 1px solid #e5e5e5;
}
.writeInfo{
   width: 300px;
   margin-top: 10px;
   text-align: center;
   display:inline-block;
   margin-left: 20px;
}
.writeSpan{
    background-color: #fff;
    box-sizing: border-box;
    display: inline-block;
    margin-top: 5px;
    width: 100%;
    color: #606266;  
    height: 40px;
    line-height: 40px;
    padding: 0 15px;    
    border-radius: 4px;
    position: relative;
    border: 1px solid #dcdfe6;
}
.writeSpan div{
     position:absolute;
     top: 38px; 
     left: -1px;
     width: 100%;
     height: auto;
     border: 1px solid #dcdfe6;
     -webkit-padding-start: 0px;
}
.writeSpan a{
    height: 30px;
    line-height: 30px;
    display: inline-block;
    padding: 2px 4px;
    text-align: left;
    border:1px dashed #dcdfe6;
    background: #ccc;
}
.tagContain{
    width: 100%;
    margin-left: 25px;
    margin-top: 25px;
}
.vue-uploader .file-list {
    padding: 10px 0px;
}
.vue-uploader .file-list:after {
    content: '';
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
    font-size: 0;
}
.vue-uploader .file-list .file-item {
    float: left;
    position: relative;
    width: 100px;
    text-align: center;
}
.vue-uploader .file-list .file-item img{
    width: 80px;
    height: 80px;
    border: 1px solid #ececec;
}
.vue-uploader .file-list .file-item .file-remove {
    position: absolute;
    right: 12px;
    display: none;
    top: 4px;
    width: 14px;
    height: 14px;
    color: white;
    cursor: pointer;
    line-height: 12px;
    border-radius: 100%;
    transform: rotate(45deg);
    background: rgba(0, 0, 0, 0.5);
}
.vue-uploader .file-list .file-item:hover .file-remove {
    display: inline;
}
.vue-uploader .file-list .file-item .file-name {
    margin: 0;
    height: 40px;
    word-break: break-all;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.vue-uploader .add {
    width: 80px;
    height: 80px;
    margin-left: 10px;
    float: left;
    text-align: center;
    line-height: 80px;
    border: 1px dashed #ececec;
    font-size: 30px;
    cursor: pointer;
}
.vue-uploader .upload-func {
    display: flex;
    padding: 10px;
    margin: 0px;
    background: #f8f8f8;
    border-top: 1px solid #ececec;
}
.vue-uploader .upload-func .progress-bar {
    flex-grow: 1;
}
.vue-uploader .upload-func .progress-bar section {
    margin-top: 5px;
    background: #00b4aa;
    border-radius: 3px;
    text-align: center; 
    color: #fff;
    font-size: 12px;
    transition: all .5s ease;
}
.vue-uploader .upload-func .operation-box {
    flex-grow: 0;
    padding-left: 10px;
}
.vue-uploader .upload-func .operation-box button {
    padding: 4px 12px;
    color: #fff;
    background: #007ACC;
    border: none;
    border-radius: 2px;
    cursor: pointer;
}
.vue-uploader > input[type="file"] {
    display: none;
}
</style>