/**
 *
 * @title 行内编辑
 * @parent 编辑 Editor
 * @description 可以对行进行编辑的表格
 */
import React, { Component } from "react";
import {FormControl, Icon, Tooltip, Form } from 'tinper-bee';

class StringEditCell extends Component {
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

  handleChange = value => {
    const { onChange, throwError } = this.props;
    if (value === "") {
      throwError && throwError(true);
    } else {
      throwError && throwError(false);
    }
    this.setState({ value });
    onChange && onChange(value);
  };

  render() {
    const { editable, required, colName } = this.props;
    const { value } = this.state;
    let cls = "editable-cell-input-wrapper";
    if (required) cls += " required";
    if (value === "") cls += " verify-cell";
    return editable ? (
      <div className="editable-cell">
        <div className={cls}>
          <FormControl value={value} onChange={this.handleChange} />
          <span className="error">
            {value === "" ? (
              <Tooltip
                inverse
                className="u-editable-table-tp"
                placement="bottom"
                overlay={<div className="tp-content">{"请输入" + colName}</div>}
              >
                <Icon className="uf-exc-t required-icon" />
              </Tooltip>
            ) : null}
          </span>
        </div>
      </div>
    ) : (
      value || " "
    );
  }
}
export default Form.createForm()(StringEditCell);