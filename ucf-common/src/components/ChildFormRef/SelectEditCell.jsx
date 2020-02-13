/**
 * 下拉框
 */
import React, { Component } from "react";
import {  } from 'tinper-bee';
import {Select,Form } from "tinper-bee";
const Option = Select.Option;

const SELECT_SOURCE = ["男", "女"];

class SelectEditCell extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      value: props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.editable) {
      this.setState({ value: nextProps.value });
    }
  }

  handleSelect = value => {
    this.setState({ value });
    this.props.onChange && this.props.onChange(value);
  };

  render() {
    const { editable } = this.props;
    const { value } = this.state;
    let cls = "editable-cell-input-wrapper";
    return editable ? (
      <div className="editable-cell">
        <div className={cls}>
          <Select value={value} onSelect={this.handleSelect}>
            {SELECT_SOURCE.map((item, index) => (
              <Option key={index} value={item}>
                {item}
              </Option>
            ))}
          </Select>
        </div>
      </div>
    ) : (
      value || " "
    );
  }
}

export default Form.createForm()(SelectEditCell);