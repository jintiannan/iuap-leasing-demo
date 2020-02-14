/**
*
* @title 结合切换事件的 Step组件完成主页面模态框形式新增数据
* @description 点击next，Step的流程跟进
*
*/
import React, { Component } from 'react';
import { Step, Button, Message, Modal, Form, Icon, Label, Col, Row, Select, FormControl, Tabs } from 'tinper-bee';
import { actions } from 'mirrorx';
import TableFormRef from 'components/FormRef/TableFormRef';
import { deepClone } from "utils";
import DatePicker from "tinper-bee/lib/Datepicker";
import FormInputNumber from 'components/FormRef/FormInputNumber';
import { enumConstant } from '../../../../../../ucf-common/src/utils/enums';
import './index.less';

const Steps = Step.Steps;         //步骤条组件使用定义 如不定义则只能使用Step.Steps 此处定义全局变量是为了方便使用
const FormItem = Form.FormItem;   //表单组件使用定义   与上述情况相同 
const addTitle = "快速报价";       //模态框标题
const steps = [                   //步骤条每步使用标题  对应嵌套模态框内部标题
    { title: '投放信息' },
    { title: '留购价款及保证金设置' },
    { title: '手续费及中间费用支出设置' },
    { title: '收租设置' },
    { title: '租息率设置' },
    { title: 'IRR信息' },
];

class AddFormView extends Component {
    constructor(props) {

        super(props);
        this.state = {
            current: 0,        //初始模态框进入页签参数  
            showDiv1: '',      //控制模态框内部每个页签的显示隐藏 为''时显示 为none时隐藏
            showDiv2: 'none',
            showDiv3: 'none',
            showDiv4: 'none',
            showDiv5: 'none',
            showDiv6: 'none',
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

    //将新增数据存入缓存 避免因为异常情况关闭页面重新输入数据
    saveCache = () => {
        let objectForm = this.props.form.getFieldsValue();
        localStorage.setItem("addKey", JSON.stringify(objectForm));  //以JSON ：key-value形式置入缓存
    }

    //模态框下一步操作
    next = () => {
        const current = this.state.current + 1;
        this.setState({ current });
        this.nextController();
        this.saveCache();
    }

    //模态框上一步操作
    prev = () => {
        const current = this.state.current - 1;
        this.setState({ current });
        this.prevController();
    }

    //控制下一步 显示那个div
    nextController = () => {
        let key = 'showDiv';
        let num = this.state.current + 2;
        let showDiv = key + num;
        let noneDiv = key + (num - 1);
        let map = {};
        map[showDiv] = '';
        map[noneDiv] = 'none';
        this.setState(map)
    }

    //控制上一步 显示那个div
    prevController = () => {
        let key = 'showDiv';
        let num = this.state.current;
        let showDiv = key + num;
        let noneDiv = key + (num + 1);
        let map = {};
        map[showDiv] = '';
        map[noneDiv] = 'none';
        this.setState(map)
    }

    //关闭模态框后重置初始化数据
    initDiv = () => {
        this.setState({
            current: 0,
            showDiv1: '',
            showDiv2: 'none',
            showDiv3: 'none',
            showDiv4: 'none',
            showDiv5: 'none',
            showDiv6: 'none',
        });
    }
    //点击保存存储对应新增数据 移除缓存 并重置模态框
    alertDone = () => {
        Message.create({ content: '完成', color: 'successlight' });
        localStorage.removeItem("addKey");
        this.initDiv();
        this.close();
    }
    //关闭模态框
    close = () => {
        actions.calculatorNormalzt.updateState({ showModal: false });
        this.initDiv();
    }

    //onChange方法 保证金比例
    handleChangeDeposit_ratio = (value) => {
        let objectForm = this.props.form.getFieldsValue();
        let val = objectForm.total_amount_equipment * value;
        this.props.form.setFieldsValue({ 'deposit_cash': val });
    }

    //onChange方法 保证金金额
    handleChangeDeposit_cash = (value) => {
        let objectForm = this.props.form.getFieldsValue();
        let val = (objectForm.total_amount_equipment > 0 ? value / objectForm.total_amount_equipment : 0)
        this.props.form.setFieldsValue({ 'deposit_ratio': val });
    }
    //租金税率
    handleChangeRent_tax_rate = (value) => {
        this.props.form.setFieldsValue({ 'srvfee_taxrate_in': value });
    }
    //租赁方式
    handleChangeLease_method = (value) => {
        this.props.form.setFieldsValue({ 'if_corpus_tickets': value });
    }
    //onChange方法 手续费比例
    handleChangeSrvfee_ratio_in = (value) => {
        let objectForm = this.props.form.getFieldsValue();
        let val = objectForm.total_amount_equipment * value;
        this.props.form.setFieldsValue({ 'srvfee_cash_in_ft': val });
    }

    //onChange方法 首期手续费金额
    handleChangeSrvfee_cash_in_ft = (value) => {
        let objectForm = this.props.form.getFieldsValue();
        let val = (objectForm.total_amount_equipment > 0 ? value / objectForm.total_amount_equipment : 0)
        this.props.form.setFieldsValue({ 'srvfee_ratio_in': val });
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
     * onChange: 联动事件
     */
    mainForm1 = [
        { label: '测算方案名称', field: 'quot_name', com: FormControl, required: true },
        { label: '限额方案', field: 'pk_limit_plan', com: TableFormRef, required: true, refurl: '/sys/queryOrg' },
        { label: '租赁方式', field: 'lease_method', com: Select, required: true, data: [{ key: '直租', value: '0' }, { key: '回租', value: '1' }], onChange: this.handleChangeLease_method,},
        { label: '本金是否开票', field: 'if_corpus_tickets', com: Select, required: true, data: [{ key: '是', value: '0' }, { key: '否', value: '1' }] },
        { label: '租金税率', field: 'rent_tax_rate', com: Select, required: true, data: [{ key: '0%', value: '0' }, { key: '3%', value: '3' }, { key: '6%', value: '6' }, { key: '10%', value: '10' }] },
        { label: '税种', field: 'pk_currtype', com: Select, required: true, data: [{ key: '增值税', value: '1' }, { key: '营业税', value: '2' }, { key: '复合税', value: '3' }, { key: '无', value: '0' }] },
        { label: '投放日期', field: 'plan_date_loan', com: DatePicker, required: true, format: 'YYYY-MM-DD' },
        { label: '投放金额', field: 'total_amount_equipment', com: FormInputNumber, required: true, toThousands: true, precision: 2 },
        { label: '租赁本金', field: 'fact_cash_loan', com: FormInputNumber, required: true, toThousands: true, precision: 2 },
        { label: '净融资比例', field: 'project_manager', com: FormInputNumber, required: true, toThousands: true, precision: 2 },
        { label: '净融资额(元)', field: 'net_finance_cash', com: FormInputNumber, required: true, toThousands: true, precision: 2 },
    ]
    mainForm2 = [
        { label: '留购价款(元)', field: 'nominal_price', com: FormInputNumber, toThousands: true, precision: 2, required: true },
        { label: '保证金比例', field: 'deposit_ratio', com: FormInputNumber, required: true, toPercent: true, precision: 4, onChange: this.handleChangeDeposit_ratio, },
        { label: '保证金金额', field: 'deposit_cash', com: FormInputNumber, required: true, toThousands: true, precision: 2, onChange: this.handleChangeDeposit_cash,},
    ]
    mainForm3 = [
        { label: '手续费收取方式', field: 'srvfee_method_in', com: Select, required: true, data: [{ key: '每满一年收取', value: '0' }, { key: '每年年初收取', value: '1' }, { key: '初期收取', value: '2' }] },
        { label: '手续费比例', field: 'srvfee_ratio_in', com: FormInputNumber, required: true, toPercent: true, precision: 4, onChange: this.handleChangeSrvfee_ratio_in,},
        { label: '首期手续费金额(元)', field: 'srvfee_cash_in_ft', com: FormInputNumber, required: true, toThousands: true, precision: 2, onChange: this.handleChangeSrvfee_cash_in_ft, },
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
        const { current } = this.state;
        const { getFieldProps } = this.props.form;
        let _formObject = this.props.formObject;
        let formObject = deepClone(_formObject);
        if (this.props.showModal == false) {
            return <div></div>;
        } else {
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
                            disabled={value.disabled ? value.disabled : false}
                            data={value.data ? value.data : ''}
                            refurl={value.refurl}
                            toThousands={value.com === FormInputNumber ? (value.toThousands ? value.toThousands : true) : ''}  //是否显示千分位
                            precision={value.com === FormInputNumber ? (value.precision ? value.precision : 2) : ''} //保留2位小数
                            componentClass={value.class ? value.class : 'input'}
                            {
                            ...getFieldProps(value.field, {
                                initialValue: value.field && value.field.indexOf(".") > 0 ? this.getValue(formObject, value.field) : formObject[value.field],
                                rules: [{
                                    required: true,
                                }],
                                onChange : value.onChange
                            })
                            }>
                        </value.com>
                    </FormItem>
                </Col>)
        });
            return (
                <div>
                    {/**
                        模态框组件Modal 主组件使用className控制自定义属性  show控制显示隐藏  backdrop static代表固定遮罩层 size控制尺寸 onHide关闭事件
                        拥有三层子组件 分别为 Modal.Header  Modal.Body  Modal.Footer 其中
                        Modal.Header: 模态框的头部 通过Modal.Title 定义模态框的标题
                        Modal.Body:   模态框的内容体 显示主题内容在内部定义
                        Modal.Footer: 模态框的尾部 显示按钮在此处定义 也可定义在Body中不加Footer体
                     */}
                    <Modal
                        className="jic-model"
                        show={this.props.showModal}
                        backdrop="static" //关闭遮罩事件
                        size={"xlg"} //大号模态框
                        onHide={this.close}>
                        <Modal.Header closeButton>
                            <Modal.Title > {addTitle} </Modal.Title>
                        </Modal.Header >
                        <Modal.Body >
                            {
                                /**
                                 * 步骤条组件Steps 展示当前步骤条属性 current
                                 * 单个步骤条子组件Step key为唯一性索引 title为步骤条标题
                                 */
                            }
                            <Steps current={current}>
                                {steps.map(item => <Step key={item.title} title={item.title} />)}
                            </Steps>

                            <div className="steps-content jic-form">
                                {/**
                                    表单内容组件Form 包含表单的内容放置在组件内部
                                    其中 Row Col 为处理格式的栅格布局 Row控制单行 Col 控制 md xs sm 即 中 大 小三种分辨率的列排序占比 单行12列
                                    FormItem为单个表单域 囊括 标签Label与输入框FormControl 其中输入框同样可以换为下拉框Select等组件
                                    FormControl的 getFieldProps为固定使用形式 内部填写当前单个表单域的属性名称 
                                                  initiaValue为表单初始默认值
                                                  rules表单常用校验规则 内部required 为必输属性控制
                                */}
                                <Form>
                                <div style={{ display: this.state.showDiv1 }}>
                                    {loop(this.mainForm1)}
                                    </div>
                                    <div style={{ display: this.state.showDiv2 }}>
                                    {loop(this.mainForm2)}
                                    </div>
                                    <div style={{ display: this.state.showDiv3 }}>
                                    {loop(this.mainForm3)}
                                    </div>
                                    <div style={{ display: this.state.showDiv4 }}>
                                    {loop(this.mainForm4)}
                                    </div>
                                    <div style={{ display: this.state.showDiv5 }}>
                                    {loop(this.mainForm6)}
                                    </div>
                                    <div style={{ display: this.state.showDiv6 }}>
                                    {loop(this.mainForm6)}
                                    </div>
                                </Form>

                            </div>
                            <div className="steps-action">
                                {/**
                                    react的条件渲染支持以下形式处理 但必须使用{}包含
                                */}
                                {
                                    this.state.current > 0
                                    &&
                                    <Button bordered style={{ marginRight: 8 }} onClick={() => this.prev()}>上一步</Button>
                                }
                                {
                                    this.state.current < steps.length - 1
                                    &&
                                    <Button colors="primary" style={{ marginRight: 8 }} onClick={() => this.next()}>下一步</Button>
                                }
                                {
                                    this.state.current === steps.length - 1
                                    &&
                                    <Button colors="primary" style={{ marginRight: 8 }} onClick={() => this.alertDone()}>完成</Button>
                                }{
                                    <Button colors="secondary" onClick={() => this.close()}> 关闭 </Button>
                                }
                            </div>

                        </Modal.Body>
                    </Modal>
                </div>
            );
        }
    }
}
export default Form.createForm()(AddFormView);