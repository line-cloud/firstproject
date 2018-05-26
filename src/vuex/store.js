import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)
export default new Vuex.Store({
    state:{
        show:{},
        // subject_name:'高中数学',
        subject_id:19,
        newCasequestList:[],
        caseId:-1,    //初始化默认讲义 ID
        storageIdArray:[],  
        editCase:{},
        caseLevel:'',   //  讲义的难易程度表示
    }
})
 // _this.$store.state.isToggle=!_this.$store.state.isToggle