import {actions} from "mirrorx";
// 引入services，如不需要接口请求可不写
import * as api from "./service";
// 接口返回数据公共处理方法，根据具体需要
import {processData, addChild, handleChild, deepClone} from "utils";



export default {
    // 确定 Store 中的数据模型作用域
    name: "multitop",
    // 设置当前 Model 所需的初始化 state
    initialState: {
        content : [],
        quoteList : [],
        quoteFormObj :{},
    },
    reducers: {
        /**
         * 纯函数，相当于 Redux 中的 Reducer，只负责对数据的更新。
         * @param {*} state
         * @param {*} data
         */
        updateState(state, data) { //更新state
            return {
                ...state,
                ...deepClone(data)
            };
        }
    },
    effects: {
        /**
         * 加载列表数据
         * @param {*} param
         * @param {*} getState
         */
        async loadTree(param , getState) {
            
            let result = processData(await api.getTreeData(param));
            if(!result||result.length <= 0){
                actions.multitop.updateState({
                    showLoading: false
                })
                return;
            };
            let content = [];
            result.map((item)=>{
                if(item.pkFather == null || item.pkFather == ''){
                    item.children = [];
                    content.push(item);
                }
            });
            content.map((item)=>{
                result.map((item2)=>{
                    if(item2.pkFather == item.pkTreeMenu){
                        item.children.push(item2);
                    }
                });
            });
            actions.multitop.updateState({
                content : content,
            })

        },

        /**
         * 加载列表数据
         * @param {*} param
         * @param {*} getState
         */
        async loadQuoteList(param , getState) {
            
            // 正在加载数据，显示加载 Loading 图标
            actions.multitop.updateState({showLoading: true});
            let data = processData(await api.getQuoteList(param));  // 调用 getList 请求数据
            let updateData = {showLoading: false};
            updateData.quoteList = data;
            actions.multitop.updateState(updateData); // 更新数据和查询条件

        },

       
        
    }
};
