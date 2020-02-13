import React, {Component} from 'react';
import classnames from 'classnames';
import InputGroup from 'bee-input-group';
import FormControl from 'bee-form-control';
import PropTypes from 'prop-types';

const propTypes = {
    max: PropTypes.number,
    min: PropTypes.number,
    step: PropTypes.number,
    autoWidth: PropTypes.bool,
    precision: PropTypes.number,
    format: PropTypes.func,
    delay: PropTypes.number,
    disabled:PropTypes.bool,
    toThousands:PropTypes.bool,
    toNumber:PropTypes.bool //回调函数内的值是否转换为数值类型
};

const defaultProps = {
    value: 0,
    step: 1,
    clsPrefix: 'u-input-number',
    iconStyle: 'double',
    autoWidth: false,
    delay: 300,
    toNumber:false
};

/**
 * 校验value
 * @param {*} props 
 * @param {原来的值} oldValue 
 */
function judgeValue(props,oldValue) {
    let currentValue;
    let { value } = props;
    if (value!=undefined) {
        if(value===''){
            currentValue='';
            return {
                value: '',
            }
        }else{
            currentValue = Number(value) ||0;
        }
    } else if (min&&(value!='')) {
        currentValue = min;
    } else if(value==='0'||value===0){
        currentValue = 0;
    }else{//NaN
        if(oldValue||(oldValue===0)||(oldValue==='0')){
            currentValue = oldValue;
        }else{//value为空
            return {
                value: '',
            }
        }
    }

    return {
        value: currentValue,
    }
}
/**
 * 千分符
 * @param {要转换的数据} num 
 */
function formatThousands(number) {
    if(number==='')return '';
    if(number==='0')return '0';
    let num = (number || 0).toString();
    let integer = num.split('.')[0];
    let decimal = num.split('.')[1]||'';
    let result = '';
    while (integer.length > 3) {
        result = ',' + integer.slice(-3) + result;
        integer = integer.slice(0, integer.length - 3);
    }
    if (integer) { 
        result = integer + result ;
        if(num=='.'||num.indexOf('.')==num.length-1){
            result = result + '.'+decimal;
        }else if (decimal){
            result = result + '.'+decimal;
        }
     }
    return result;
}

function formatPercent(number,_digit){
    let parse = parseFloat(number * 100).toFixed(_digit);
    let result = `${parse}%`;
    return result;
}

class InputNumber extends Component {
    constructor(props) {
        super(props);
        let data = judgeValue(props);
        this.state = {
            value: data.value,
            showValue:this.formatValue(data.value)
        }
        this.timer = null;
        this.focus = false;
    }

    componentDidMount(){
        this.setState({
            value: this.props.value,
            showValue:this.formatValue(this.props.value)
        });
    }
    componentWillReceiveProps(nextProps){
        if(this.focus){
            if(nextProps.value==Infinity||nextProps.value==-Infinity){
                
            }else{
                this.setState({
                    value: nextProps.value,
                    //showValue:this.formatValue(nextProps.value), //暂时注掉  影响修改字表
                });
            }
            
        }else{
            let data = judgeValue(nextProps,this.state.value);
            this.setState({
                value: data.value,
                showValue:this.formatValue(data.value),
            });
        }
    }

    ComponentWillUnMount() {
        this.clear();
    }

    handleChange = (value) => {
        const { onChange } = this.props;
        if(value===''){
            onChange && onChange(value);
            this.setState({
                value
            })
            return;
        }
        if(isNaN(value)&&(value!='.'))return;
        this.setState({
            value,
            showValue:value,
        });
    }

    handleFocus = (v,e) => {
        this.focus = true;
        let value = parseFloat(this.state.value);
        this.setState({
            value,
            showValue:value,
        });
        //console.log(this.state);
        let { onFocus } = this.props;
        onFocus && onFocus(value);
    }

    handleBlur = (v) => {
        this.focus = false;
        const { onBlur,onChange } = this.props;
        if(v===''){
            this.setState({
                value:v
            })
            onBlur && onBlur(v);
            onChange && onChange(v);
            return;
        }
        let value = Number(v);
        let showValue = Number(v);
        showValue = this.formatValue(showValue);
        this.setState({
            value,
            showValue,
        });
        onBlur && onBlur(value);
        onChange && onChange(value);
        //console.log(this.state);        
    }

    formatValue = (value) => {
        let {toThousands,toPercent,precision} = this.props;
        value = value ? Number(value) : 0;
        console.log(value);
        if(toPercent){
            value = formatPercent(value,precision);
            return value;
        }

        if(precision){
            value = value.toFixed(precision);
        }

        if(toThousands){
            value = formatThousands(value);            
        } 
        return value;        
    }    

    clear = () => {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }

    render() {
        const {toThousands, toPercent,disabled, clsPrefix, className, delay, onBlur, onFocus, autoWidth, onChange, format, precision,toNumber, ...others} = this.props;
        let classes = {
            [`${clsPrefix}-auto`]: autoWidth,
            [`${clsPrefix}`]: true,
        };

        let {value,showValue} = this.state;
        
        let disabledCon = disabled? ' disabled-con':'';
        return (
            <div>
                <InputGroup
                    className={classnames(className, classes,disabledCon)}
                    simple
                > 
                <FormControl 
                        {...others}
                        value={showValue}
                        disabled={disabled}
                        onBlur={ this.handleBlur }
                        onFocus={this.handleFocus}
                        onChange={ this.handleChange }
                    />
                </InputGroup>   
            </div>
        );
    }
}
;

InputNumber.defaultProps = defaultProps;
InputNumber.propTypes = propTypes;
export default InputNumber;
