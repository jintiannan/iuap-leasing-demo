import React, {Component} from 'react';
import {actions} from 'mirrorx';

// 导入组件类
import { Tree, Icon, Loading} from 'tinper-bee';

// 导入样式
import '../index.less';
import ContractFormView from '../ContractFormView';
import LeaseQuoteIndexView from '../LeaseQuoteFormView/LeaseQuoteIndexView'

// 定义组件类常量
const TreeNode = Tree.TreeNode;



class IndexView extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedInfo:{},
    };
  }

  //组件生命周期方法-在渲染前调用,在客户端也在服务端
  componentWillMount() {
    
  }

  //组件生命周期方法-在第一次渲染后调用，只在客户端
  componentDidMount() {
    actions.multileft.loadTree();
  }

  //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
  componentWillReceiveProps(nextProps) {

  }

  onTreeRowSelect = (info, node) => {
    if(node.node.props.ext.pkFather !=null && node.node.props.ext.pkFather != ''){
      this.setState({selectedInfo:{
          pkTreeMenu:info[0],
          pkFather:node.node.props.ext.pkFather,
          menuCode:node.node.props.ext.menuCode,
          menuName:node.node.props.title,
          uiName:node.node.props.ext.uiName,
          mainClass:node.node.props.ext.mainClass,
          mainUi:node.node.props.ext.mainUi,
          ifMore:node.node.props.ext.ifMore,
          pkForeign:node.node.props.ext.pkForeign,
          orderNum:node.node.props.ext.orderNum,
      }});
    }
  }


  render() {
    let { content } = this.props;
    let ContractFormObj = {pkOrg:{"code":"1003","name":"中建投租赁股份有限公司","orgCode":"001-2003"},pk:1,operate_date:'2019-09-05', quot_name:'测算方案名称'
    ,pk_limit_plan:{"code":"1003","name":"中建投租赁(上海机构)","pk":"1003"},lease_method:0,if_corpus_tickets:'0',rent_tax_rate:'0'
    ,pk_currtype:'1',plan_date_loan:'2019-02-05',plan_cash_loan:15000,total_amount_equipment:10000,fact_cash_loan:10000
    ,down_payment_ratio:5,down_payment:50000,net_finance_ratio:5,
    net_finance_cash:10000,nominal_price:10000,assets_margin:1000000,deposit_method:'1',deposit_ratio:'5',deposit_cash:20000,
    return_method_depos:'1',if_interest_depos:'0',final_rate_depos:5,srvfee_method_in:'0',srvfee_base:'0',srvfee_ratio_in:'5'
    ,srvfee_cash_in_ft:4,srvfee_cash_in:10000,srvfee_taxrate_in:'1',srvfee_method_out:'0',srvfee_date_out_ft:'2019-02-05'
    ,srvfee_base_out:'0',srvfee_taxrate_out:'0',srvfee_ratio_out:5,srvfee_cash_out_ft:10000,srvfee_cash_out:20000,lease_times:12
    ,srvfee_base_out:'0',prepay_or_not:'0',lease_cal_method:'0',delay_period:10,
    has_first_lease_date:'0',first_lease_date:'2019-02-05',year_days_flow:'0',interest_method_total_loan:'0'
    ,final_rate:5,interrate:5,cal_digit:'0',year_days:'0',
    interrate_type:'0',pk_currtype:'1',float_method:'1',pk_interrate:'2020-02-10',interrate_level:'0',
    float_value:4,finace_irr_method:'0',finace_irr_year:'0',project_irr:4.56,project_notax_irr:4.56,finance_irr:4.56,finance_notax_irr:4.56,
    special_type:'0',time_pay_date:'2019-02-15',special_limit:5,repayment_interest_period:'0',repayment_corpus_period:'0',repayment_corpus_cash:1000,
    special_final_rate:4.44,special_interrate_level:'0',special_interrate:5,special_interrate_type:'0',special_float_method:'0',special_float_value:5,
    pk_special_interrate:'2019-05-05',calinterest_amount_style:'0',
    plan_cash_corpus:10000, tax_rate:0.6, tax_cash:600, pay_method_loan:'0', make_date_draft:'2019-01-01', end_date_loan:'2019-02-02',
    deposit_ratio4draft:'0.13', interrate_ratio4draft:0.12, calinter_amount_style:'0',
    lease_times:'12', plan_date:'12', trans_type:0,lease_cash_corpus:'10200', lease_cash_tax:600,lease_cash:10000};
    const loop = data => data.map((item)=>{
      if(item.children && item.children.length){
        return <TreeNode title={item.menuName} key={item.pkTreeMenu} icon={<Icon type="uf-treefolder" />} ext={{'pkFather':item.pkFather,'menuCode':item.menuCode,'uiName':item.uiName,'mainClass':item.mainClass,'mainUi':item.mainUi,'ifMore':item.ifMore,'pkForeign':item.pkForeign,'orderNum':item.orderNum}} >
            {loop(item.children)}
        </TreeNode>
      }
      return <TreeNode title={item.menuName} key={item.pkTreeMenu} icon={<Icon type="uf-list-s-o" />} ext={{'pkFather':item.pkFather,'menuCode':item.menuCode,'uiName':item.uiName,'mainClass':item.mainClass,'mainUi':item.mainUi,'ifMore':item.ifMore,'pkForeign':item.pkForeign,'orderNum':item.orderNum}} ></TreeNode>
    })
    return (
      <div className="multitab-left-form">
          <div className='left-form-body'>
            <div className='left-form-left'>
              {content.length ? (
                <Tree
                defaultExpandAll={true}
                showIcon 
                showLine
                openIcon={<Icon type="uf-minus" />}
                closeIcon={<Icon type="uf-plus" />}  
                onSelect = {this.onTreeRowSelect}
                defaultSelectedKeys = {content[0].children[0].pkTreeMenu}
                >
                  {loop(content)}
                </Tree>
                
              ) : (
                <div className="no-search-container">
                  <span className="no-search">未查询到相关节点的树</span>
                </div>
              )}

            </div>
            <div className = 'left-form-right'>
                {
                  (this.state.selectedInfo.uiName == undefined ||  this.state.selectedInfo.uiName == 'ContractFormView' )&& <ContractFormView formObject = {ContractFormObj} />
                }
                { 
                  this.state.selectedInfo.uiName == 'LeaseQuoteIndexView' && <LeaseQuoteIndexView quoteList ={this.props.quoteList} quoteFormObj = {this.props.quoteFormObj} pkContract = {'1'} />
                }
            </div>
          </div>
      </div>
    );
  }
}

export default IndexView;
