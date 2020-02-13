import React, { Component } from 'react';
import { Col, Row, Icon } from 'tinper-bee';
import './index.less';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {}

    render() {
        const {title } = this.props;
        const {open } = this.props;
        return (
            <Row className={'title'}>
                <Col xs={12}>
                    <span className="main-title">
                        {open? <Icon type="uf-reduce-c-o"/>:  <Icon type="uf-add-c-o"/>}{title}
                    </span>
                </Col>
            </Row>
        )
    }
}
export default Header;
