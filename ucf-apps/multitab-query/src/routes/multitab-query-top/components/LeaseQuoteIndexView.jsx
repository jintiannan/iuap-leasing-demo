/**
 * 自定义初始默认模块
 */

import React, { Component } from 'react';
import { Loading,Form } from 'tinper-bee';
import {actions} from 'mirrorx';
import {singleRecordOper} from "utils/service";
import { deepClone } from "utils";
import LeaseButtonGroup from './LeaseButtonGroup';
import LeaseQuoteListView from './LeaseQuoteListView';
import LeaseQuoteFormView from './LeaseQuoteFormView';
import moment from 'moment';

class LeaseQuoteIndexView extends Component {
    /**
     * 当前界面内部构造函数 固定格式需添加super(props) 仅需当前界面内部使用的数据可以定义在this.state中
     */
    constructor(props) {
        super(props);

        this.state = {
            showLoading : false, //加载状态
            showListView : '', //显示列表界面
            showFormView : 'none',//显示Form表单
            isEdit : false,//是否可编辑(卡片界面)
            showForm:false, //是否加载 详情修改页
            isGrid : true,//是否列表界面
            formObject: {},//当前卡片界面对象
            listObj: [],//列表对象
            showSearchPanel:false,
            powerButton: ['Test1','Test2','Test3','Test4','Test5'],//按钮权限列表
            ifGridColumn:true,//是否自定义显示字段
            gridColumn: ['project_irr'],//显示字段  
            pkContract: props.pkContract,          
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
        
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
        
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
        
    }
    

    //绑定子组件的引用  使用子组件的地方添加此方法的实现 其中 formchild为调用子组件方法时使用的名字 通过this.formchlc.+方法名调用子组件的方法
    onRef = (ref) => {
        this.child = ref;        
    }

    //绑定子组件的引用(列表)
    onListRef = (ref) =>{
        this.listchild = ref;
    }
    //绑定子组件的引用(搜索)
    onsearchRef = (ref) =>{
        this.serachRef = ref;
    }

    /**
     * 切换为列表界面
     */
    switchToListView = () =>{
        this.setState({
            showListView:'',
            showFormView:'none',
            formObject:{},
            isGrid:!this.state.isGrid,
        })
        actions.multitop.updateState({ quoteFormObj : {},isGrid : true,isEdit : false, showForm : false});
    }

    /**
     * 切换为卡片界面
     */
    switchToCardView = (obj) =>{
        let _formObj = deepClone(obj);  
        this.setState({
            showListView:'none',
            showFormView:'',
            formObject:_formObj,
            isGrid:!this.state.isGrid,
        })       
        actions.multitop.updateState({ quoteFormObj : _formObj,isGrid : false,isEdit : false, showForm : true});
    }

    /**
     * Form表单更改编辑状态
     */
    switchEdit = () =>{
        this.setState({
            isEdit:!this.state.isEdit,
        })
        actions.multitop.updateState({isEdit : !this.state.isEdit});
    }

    /**
     * 查询方法
     */
    onQuery = () =>{        
        this.setState({
            showSearchPanel:true
        })
    }

    /**

     /**
     * 当前页按钮点击事件  添加数据  所有页面内部函数统一采用Es6箭头函数语法形式 避免this指针获取不到存在错误的问题
     */
    onAdd = () =>{
        //单击新增 要置空子表数据
        actions.multitop.updateState({list2:[]});
        let objectForm = localStorage.getItem("addKey");
        if(objectForm){
            let _formObject = deepClone(JSON.parse(objectForm));
            actions.multitop.updateState({quoteFormObj:_formObject});
        }else{
            
            //新增完成初始化form表单
            actions.multitop.updateState({quoteFormObj:{
                //租赁方式
                lease_method:'0',
                //本金是否开票
                if_corpus_tickets:'0',
                //税种
                pk_currtype:'0',
                //投放日期
                plan_date_loan: moment(), //系统当前时间
                //基准利率
                interrate:'0.0435',
                //报价利率
                final_rate:'0.0435',
                //手续费收取方式
                srvfee_method_in:'0',
                //租赁期限(月)
                lease_times:'12',
                //先付后付标志
                prepay_or_not:'1',
                //支付频率
                lease_freq:'0',
                //计算方式
                lease_cal_method:'0',
                //总投放金额的计息方式
                interest_method_total_loan:'0',
                //现金流日期计算方式
                year_days_flow:'0',
                //计算精度
                cal_digit:'1',
                //年化天数
                year_days:'0',
                //利率类型
                interrate_type:'0',
                //币种
                pk_currtype:'0',
                //利率浮动方式
                float_method:'0',
                //利率档次
                interrate_level:'0',
                //会计IRR按最新算法
                finace_irr_method:'0',
                //会计IRR算法启用年份
                finace_irr_year:'1',


            }});
        }
        //填出新增窗口
        actions.multitop.updateState({showModal : true});      
    }


    /**
     * 修改按钮
     */
    onEdit = () =>{
        singleRecordOper(this.props.selectedList,(param) => {
            this.switchToCardView(param);
            this.switchEdit();
        });        
    }

    /**
     * 查看按钮
     */
    onView = () =>{
        //singleRecordOper(this.props.selectedList,(param) => {  //查看选中项数据前进行一次单选校验
            this.switchToCardView(this.props.quoteFormObj);
            actions.multitop.updateState({bt:false});
        //});
    }


    /**
     * 返回按钮
     */
    onReturn = () =>{
        if(this.state.isEdit){
            this.switchEdit();
        }
        this.switchToListView();
    }

    // 保存当前界面的编辑数据
    onSave = () => {
        let obj = this.child.submit();
        let _formObj = deepClone(this.props.quoteFormObj);
        Object.assign(_formObj,obj);
        actions.multitop.updateRowData({'record':_formObj});
        this.switchEdit();
    }

    render() {
        let ButtonPower = {
            PowerButton : this.state.powerButton, 
        }
        return (            

            <div className='project-info'>
            {/**Loadging组件 页面内部加载图标 showBackDrop对应是否显示遮罩层 show为是否展示属性 fullScreen对应是否全屏遮罩 */}
                <Loading showBackDrop={true} show={this.state.showLoading} fullScreen={true}/>
                <div>
                    <LeaseButtonGroup
                        BtnPower= {ButtonPower}    
                        View={this.onView}
                        Return={this.onReturn}
                        isGrid = {this.state.isGrid}
                        isEdit = {this.state.isEdit}
                        {...this.props}
                    />
                </div>
                {/**所有页面内部添加组件必须由html内部标签如div标签等包裹 便于维护样式 且避免报错 display 控制是否显示*/}
                {/**列表页 */}
                <div style={{display:this.state.showListView}}>
                    <LeaseQuoteListView pkContract={this.state.pkContract} gridColumn = {this.state.gridColumn} queryParam={{        //初始化分页查询的参数
                        pageIndex: 0,
                        pageSize: 15,
                        dataNum:0,       //每页显示条数索引
                      }} quoteList = {this.props.quoteList} 　onListRef={this.onListRef} />
                </div> 
                {/**form页 卡片页 */}     
                <div style={{display:this.state.showFormView}}>
                    <LeaseQuoteFormView quoteFormObj = {this.props.quoteFormObj} list2 = {[]} onRef={this.onRef}/>
                </div>
            </div>
            
        );
    }
}

export default Form.createForm()(LeaseQuoteIndexView);
