import React, { Component } from 'react';
import { Form, Icon, Button, Label, Select, Col, FormControl,Panel } from 'tinper-bee';
import { deepClone } from "utils";
import DatePicker from "tinper-bee/lib/Datepicker";
import FormInputNumber from 'components/FormRef/FormInputNumber';
import TableFormRef from 'components/FormRef/TableFormRef';
import TableTreeRef from 'components/FormRef/TableTreeRef';
import 'styles/public.less'
import ContractButtonGroup from './ContractButtonGroup';
const FormItem = Form.FormItem;

class ContractFormView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            powerButton : ['Save','Return','ViewFlow','Check','Submit','Edit','Add'],
            activeKey: 1, //子页签默认活动key
            open: true,   //各个小标签的展开与收缩
            open2: true,
            open3: true,
            open4: true,
            open5: true,
            open6: true,
        };
    }

    //组件生命周期方法-在渲染前调用,在客户端也在服务端
    componentWillMount() {
    }

    //组件生命周期方法-在第一次渲染后调用，只在客户端
    componentDidMount() {
       // this.props.onRef(this); //绑定子组件
    }

    //组件生命周期方法-在组件接收到一个新的 prop (更新后)时被调用
    componentWillReceiveProps(nextProps) {
    }

    //保存方法 供父组件调用 读取当前表单内部页面的更改属性
    submit = () => {
        return this.props.form.getFieldsValue();
    }

    //编辑Panel是否展开折叠
    handleSelect = (key)=> {
        if(key =='1'){
            this.setState({open:!this.state.open});
        }else if(key =='2'){
            this.setState({open2:!this.state.open2});
        }else if(key =='3'){
            this.setState({open3:!this.state.open3});
        }else if(key =='4'){
            this.setState({open4:!this.state.open4});
        }else if(key =='5'){
            this.setState({open5:!this.state.open5});
        }else if(key =='6'){
            this.setState({open6:!this.state.open6});
        }
    }

    getValue = (formObject,value) =>{
        if(value.indexOf('.')>0){
            let field = value.substr(value.indexOf('.')+1);
            value = value.substring(0,value.indexOf("."));
            formObject = formObject[value];
            return this.getValue(formObject,field);
        }
        return formObject[value];
    }

    /**
     * 表单内部数据处理通用写入格式
     * label:属性名称
     * field:属性字段值
     * com:对应组件名称 包含FormControl(输入框) TableFormRef(参照框) Select(下拉框) DatePicker(日期选取框) FormInputNumber(数字金额框)
     * required:必输项控制
     * data:对应Select下拉框中的选取数据
     * format:对应日期选取框的格式化格式
     * toThousands:对应数字金额框的千分位是否展示
     * precision:对应数字金额框的小数位精度
     */
    mainForm1 = [
        { label: '测算方案名称', field: 'quot_name', com: FormControl, required: true },
        { label: '限额方案', field: 'pk_limit_plan', com: TableFormRef, required: true ,refurl:'/sys/queryOrg'},
        { label: '租赁方式', field: 'lease_method', com: Select, required: true, data: [{ key: '直租', value: '0' }, { key: '回租', value: '1' }] },
        { label: '本金是否开票', field: 'if_corpus_tickets', com: Select, required: true, data: [{ key: '是', value: '0' }, { key: '否', value: '1' }] },
        { label: '租金税率', field: 'rent_tax_rate', com: Select, required: true, data: [{ key: '0%', value: '0' }, { key: '3%', value: '3' }, { key: '6%', value: '6' }, { key: '10%', value: '10' }] },
        { label: '税种', field: 'pk_currtype', com: Select, required: true, data: [{ key: '增值税', value: '1' }, { key: '营业税', value: '2' }, { key: '复合税', value: '3' }, { key: '无', value: '0' }] },
        { label: '投放日期', field: 'plan_date_loan', com: DatePicker, required: true, format: 'YYYY-MM-DD' },
        { label: '投放金额', field: 'total_amount_equipment', com: FormInputNumber, required: true, toThousands: true, precision: 2 },
        { label: '租赁本金', field: 'fact_cash_loan', com: FormInputNumber, required: true, toThousands: true, precision: 2 },
        { label: '净融资比例', field: 'project_manager', com: TableTreeRef, refurl:'/sys/queryTreeOrg'},
        { label: '净融资额(元)', field: 'net_finance_cash', com: FormInputNumber, required: true, toThousands: true, precision: 2 },
    ]

    mainForm2 = [
        { label: '留购价款(元)', field: 'nominal_price', com: FormInputNumber, toThousands: true, precision: 2, required: true },
        { label: '保证金比例', field: 'deposit_ratio', com: FormInputNumber, required: true, toPercent: true, precision: 4 },
        { label: '保证金金额', field: 'deposit_cash', com: FormInputNumber, required: true, toThousands: true, precision: 2 },
    ]

    mainForm3 = [
        { label: '手续费收取方式', field: 'srvfee_method_in', com: Select, required: true, data: [{ key: '每满一年收取', value: '0' }, { key: '每年年初收取', value: '1' }, { key: '初期收取', value: '2' }] },
        { label: '手续费比例', field: 'srvfee_ratio_in', com: FormInputNumber, required: true, toPercent: true, precision: 4 },
        { label: '首期手续费金额(元)', field: 'srvfee_cash_in_ft', com: FormInputNumber, required: true, toThousands: true, precision: 2 },
        { label: '手续费总金额(元)', field: 'srvfee_cash_in', com: Select, required: true, toThousands: true, precision: 2 },
        { label: '手续费收入税率(增值税)', field: 'srvfee_taxrate_in', com: FormControl, required: true },
        { label: '中间费用支出方式', field: 'lease_cal_method', com: Select, required: true, data: [{ key: '指定支付', value: '0' }, { key: '每满一年支付', value: '1' }, { key: '每年年初支付', value: '2' }] },
        { label: '首期中间费用支出时间', field: 'srvfee_date_out_ft', com: DatePicker, required: true, format: 'YYYY-MM-DD' },
        { label: '首期中间费用支出金额(元)', field: 'srvfee_cash_out_ft', com: FormInputNumber, required: true, toThousands: true, precision: 2 },
        { label: '中间费用支出总金额(元)', field: 'fact_cash_loan', com: FormInputNumber, required: true, toThousands: true, precision: 2 },
        {
            label: '中间费用支出税率(增值税)', field: 'srvfee_taxrate_out', com: Select, required: true, data: [{ key: '3%', value: '3' }, { key: '6%', value: '6' }, { key: '17%', value: '17' }
                , { key: '0%', value: '0' }, { key: '11%', value: '11' }, { key: '16%', value: '16' }, { key: '10%', value: '10' }
                , { key: '13%', value: '13' }, { key: '9%', value: '9' }
            ]
        },

    ]

    mainForm4 = [
        { label: '租赁期限(月)', field: 'lease_times', com: FormControl, required: true },
        { label: '先付后付标志', field: 'prepay_or_not', com: Select, required: true, data: [{ key: '先付', value: '0' }, { key: '后付', value: '1' }] },
        {
            label: '支付频率', field: 'lease_freq', com: Select, required: true, data: [{ key: '月', value: '0' }, { key: '双月', value: '1' }, { key: '季', value: '2' }
                , { key: '四月', value: '1' }, { key: '半年', value: '1' }, { key: '年', value: '1' }]
        },
        { label: '计算方式', field: 'lease_cal_method', com: Select, required: true, data: [{ key: '等额租金', value: '0' }, { key: '等额本金', value: '1' }, { key: '平息法', value: '2' }] },
        { label: '总投放金额的计息方式', field: 'interest_method_total_loan', com: Select, required: true, data: [{ key: '约定计息(第一笔投放)', value: '0' }, { key: '按投放时间点计息', value: '1' }] },
        { label: '现金流日期计算方式', field: 'pk_currtype', com: Select, required: true, data: [{ key: '360', value: '0' }, { key: '365', value: '1' }] },

    ]

    mainForm5 = [
        { label: '报价利率', field: 'final_rate', com: FormInputNumber, required: true, toThousands: true, precision: 2 },
        { label: '基准利率', field: 'interrate', com: FormInputNumber, required: true, toPercent: true, precision: 6 },
        { label: '支付频率', field: 'cal_digit', com: Select, required: true, data: [{ key: '分', value: '0' }, { key: '元', value: '1' }] },
        { label: '年化天数', field: 'year_days', com: Select, required: true, data: [{ key: '360', value: '0' }, { key: '365', value: '1' }] },
        { label: '利率类型', field: 'interrate_type', com: Select, required: true, data: [{ key: '0%', value: '0' }, { key: '3%', value: '3' }, { key: '6%', value: '6' }, { key: '10%', value: '10' }] },
        {
            label: '币种', field: 'pk_currtype', com: Select, required: true, data: [{ key: '人民币', value: '0' }, { key: '多币种', value: '1' }, { key: '欧元', value: '1' }
                , { key: '港元', value: '1' }, { key: '日元', value: '1' }, { key: '澳门元', value: '1' }, { key: '美元', value: '1' }]
        },
        { label: '利率浮动方式', field: 'float_method', com: Select, required: true, data: [{ key: '百分比', value: '0' }, { key: '绝对值', value: '1' }] },
        { label: '利率生效日期', field: 'pk_interrate', com: TableFormRef, required: true },
        { label: '利率档次', field: 'interrate_level', com: FormControl, required: true },
        { label: '利率浮动值(%)', field: 'project_mfloat_valueanager', com: FormInputNumber, required: true, toPercent: true, precision: 6 },
    ]

    mainForm6 = [
        { label: '会计IRR按最新算法', field: 'finace_irr_method', com: FormControl, required: true },
        { label: '会计IRR算法启用年份', field: 'finace_irr_year', com: FormControl, required: true },
        { label: '市场IRR', field: 'project_irr', com: FormControl, required: true },
        { label: '市场去税IRR', field: 'project_notax_irr', com: FormControl, required: true },
        { label: '会计IRR', field: 'finance_irr', com: FormControl, required: true },
        { label: '会计去税IRR', field: 'finance_notax_irr', com: FormControl, required: true },
    ]

    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        let formObject = deepClone(this.props.formObject);
        let ButtonPower = {
            PowerButton : this.state.powerButton,
            isGrid : this.state.isGrid,
            isEdit : this.state.isEdit,
        }
        //渲染组件方法
        const loop = data => data.map((value, key) => {
            return (
                <Col md={value.col ? value.col : 4} xs={value.col ? value.col : 4} sm={value.col ? value.col : 4}>
                    <FormItem
                        className={(value.col === 12 ? (value.class && value.class === 'textarea' ? "remark flex jic-textArea" : "remark flex ") : '')}>
                        <Label className={value.col === 12 ? "line-height-32" : ''}>
                            {(value.required && value.required === true) ?
                                <Icon type="uf-mi" className='mast'></Icon> : ''}
                            {value.label}
                        </Label>
                        <value.com {...this.props}
                                   title={value.label}
                                   name={value.field}
                                   format={value.format}
                                   disabled={value.disabled ? value.disabled : !this.props.isEdit}
                                   data={value.data ? value.data : ''}
                                   refurl={value.refurl}
                                   toThousands={value.com === FormInputNumber ? (value.toThousands ? value.toThousands : true) : ''}  //是否显示千分位
                                   precision={value.com === FormInputNumber ? (value.precision ? value.precision : 2) : ''} //保留2位小数
                                   componentClass={value.class ? value.class : 'input'}
                                   {
                                       ...getFieldProps(value.field, {
                                           initialValue:value.field&&value.field.indexOf(".")>0 ? this.getValue(formObject,value.field): formObject[value.field],
                                           rules: [{
                                               required: true,
                                           }],
                                       })
                                   }>
                        </value.com>
                    </FormItem>
                </Col>)
        });
            return (
                <div>
                    <div><ContractButtonGroup BtnPower= {ButtonPower}  ></ContractButtonGroup></div>
                    {/**
                      卡片页 内容 jic-form 统一公共样式
                      Panel 标签 点击折叠标签
                      loop 渲染组件方法
                    */}
                    <div className='jic-form'>
                        <div className = 'jic-form-content-single'>
                        <Panel header={this.state.open ? <Icon type="uf-reduce-c-o">项目基本信息</Icon>:<Icon type="uf-add-c-o">投放信息</Icon>} eventKey="1" collapsible defaultExpanded="true" expanded={this.state.open} onSelect={this.handleSelect.bind(this,'1')} >
                            <Form>
                                {loop(this.mainForm1)}
                            </Form>
                        </Panel>


                        <Panel header={this.state.open2 ? <Icon type="uf-reduce-c-o">合同基本信息</Icon>:<Icon type="uf-add-c-o">留购价款及保证金设置</Icon>} eventKey="2" collapsible defaultExpanded="true" expanded={this.state.open2} onSelect={this.handleSelect.bind(this,'2')} >
                            <Form>
                                    {loop(this.mainForm2)}
                            </Form>
                            </Panel>

                        <Panel header={this.state.open3 ? <Icon type="uf-reduce-c-o">调息设置</Icon>:<Icon type="uf-add-c-o">手续费及中间费用支出设置</Icon>} eventKey="3" collapsible defaultExpanded="true" expanded={this.state.open3} onSelect={this.handleSelect.bind(this,'3')} >

                            <Form>
                                {loop(this.mainForm3)}
                            </Form>
                            </Panel>

                        <Panel header={this.state.open4 ? <Icon type="uf-reduce-c-o">合同基本信息</Icon>:<Icon type="uf-add-c-o">收租设置</Icon>} eventKey="4" collapsible defaultExpanded="true" expanded={this.state.open4} onSelect={this.handleSelect.bind(this,'4')} >

                            <Form>
                                {loop(this.mainForm4)}
                            </Form>
                            </Panel>

                        <Panel header={this.state.open5 ? <Icon type="uf-reduce-c-o">客户基本信息</Icon>:<Icon type="uf-add-c-o">租息率设置</Icon>} eventKey="5" collapsible defaultExpanded="true" expanded={this.state.open5} onSelect={this.handleSelect.bind(this,'5')} >
                            <Form>
                                {loop(this.mainForm5)}
                            </Form>
                            </Panel>

                        <Panel header={this.state.open6 ? <Icon type="uf-reduce-c-o">账户信息</Icon>:<Icon type="uf-add-c-o">IRR信息</Icon>} eventKey="6" collapsible defaultExpanded="true" expanded={this.state.open6} onSelect={this.handleSelect.bind(this,'6')} >

                            <Form>
                                {loop(this.mainForm6)}
                            </Form>
                            </Panel>
                        </div>
                    </div>
                </div>
            );

    }
}

export default Form.createForm()(ContractFormView);