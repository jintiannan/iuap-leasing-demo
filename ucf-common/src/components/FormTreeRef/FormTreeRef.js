/**
 *
 * @title 基础示例3
 * @description 快捷录入和清空功能。快捷录入：在input是空的情况下，可以输入内容进行搜索; 清空功能：配合form表单使用
 *
 */

import React, { Component } from 'react';
import {RefTreeWithInput} from'ref-tree';
import 'ref-tree/lib/index.css'
import { Button, Form } from 'tinper-bee';

import request from 'ucf-request';

const option = {
    title: "树", //标题
    searchable: true, //搜索
    multiple: false, //多选
    param: {
        refCode: "neworganizition_tree"
    },
    checkStrictly: true,
    disabled: false,
    nodeDisplay: record => {
        return record.refname;
    },
    displayField: record => {
        return record.refname;
    }, //显示内容的键
    valueField: "refpk", //真实 value 的键
    // refModelUrl: {
    //   treeUrl: "https://mock.yonyoucloud.com/mock/358/blobRefTree",
    //   treeUrl: "/pap_basedoc/common-ref/blobRefTree"
    // },
    // matchUrl: "/pap_basedoc/common-ref/matchPKRefJSON",
    // filterUrl: "/pap_basedoc/common-ref/filterRefJSON",
    lazyModal: false,
    strictMode: true,
    lang: "zh_CN",
    treeData: [
        {
            code: "org1",
            children: [
                {
                    code: "bj",
                    entityType: "mainEntity",
                    name: "北京总部-简",
                    pid: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                    refcode: "bj",
                    refpk: "5305416e-e7b4-4051-90bd-12d12942295b",
                    id: "5305416e-e7b4-4051-90bd-12d12942295b",
                    isLeaf: "true",
                    refname: "北京总部-简"
                },
                {
                    code: "xd",
                    entityType: "mainEntity",
                    name: "新道-简",
                    pid: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                    refcode: "xd",
                    refpk: "b691afff-ea83-4a3f-affa-beb2be9cba52",
                    id: "b691afff-ea83-4a3f-affa-beb2be9cba52",
                    isLeaf: "true",
                    refname: "新道-简"
                },
                {
                    code: "yy3",
                    entityType: "mainEntity",
                    name: "test3",
                    pid: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                    refcode: "yy3",
                    refpk: "e75694d9-7c00-4e9e-9573-d29465ae79a9",
                    id: "e75694d9-7c00-4e9e-9573-d29465ae79a9",
                    isLeaf: "true",
                    refname: "test3"
                },
                {
                    code: "yy1",
                    entityType: "mainEntity",
                    name: "test1",
                    pid: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                    refcode: "yy1",
                    refpk: "fd32ceeb-57a8-4f44-816e-fa660f5715ab",
                    id: "fd32ceeb-57a8-4f44-816e-fa660f5715ab",
                    isLeaf: "true",
                    refname: "test1"
                },
                {
                    code: "dept2",
                    children: [
                        {
                            code: "cs",
                            entityType: "subEntity",
                            organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                            name: "测试部-简",
                            pid: "0ebbb6d8-250a-4d1d-a019-7ae951629a2c",
                            refcode: "cs",
                            refpk: "cc43a66a-438d-4106-937f-bec44406f771",
                            id: "cc43a66a-438d-4106-937f-bec44406f771",
                            isLeaf: "true",
                            refname: "测试部-简"
                        },
                        {
                            code: "qd",
                            entityType: "subEntity",
                            organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                            name: "前端部-简",
                            pid: "0ebbb6d8-250a-4d1d-a019-7ae951629a2c",
                            refcode: "qd",
                            refpk: "73a10edd-aae8-4f31-af25-1f48f0a3b344",
                            id: "73a10edd-aae8-4f31-af25-1f48f0a3b344",
                            isLeaf: "true",
                            refname: "前端部-简"
                        }
                    ],
                    entityType: "subEntity",
                    organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                    name: "生产处",
                    refcode: "dept2",
                    refpk: "0ebbb6d8-250a-4d1d-a019-7ae951629a2c",
                    id: "0ebbb6d8-250a-4d1d-a019-7ae951629a2c",
                    refname: "生产处"
                },
                {
                    code: "dept1",
                    children: [
                        {
                            code: "dept1_2",
                            entityType: "subEntity",
                            organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                            name: "财务二科",
                            pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
                            refcode: "dept1_2",
                            refpk: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
                            id: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
                            isLeaf: "true",
                            refname: "财务二科"
                        },
                        {
                            code: "dept1_1",
                            entityType: "subEntity",
                            organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                            name: "财务一科",
                            pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
                            refcode: "dept1_1",
                            refpk: "9711d912-3184-4063-90c5-1facc727813c",
                            id: "9711d912-3184-4063-90c5-1facc727813c",
                            isLeaf: "true",
                            refname: "财务一科"
                        }
                    ],
                    entityType: "subEntity",
                    organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                    name: "财务处",
                    refcode: "dept1",
                    refpk: "95b60f35-ed0b-454e-b948-fb45ae30b911",
                    id: "95b60f35-ed0b-454e-b948-fb45ae30b911",
                    refname: "财务处"
                }
            ],
            entityType: "mainEntity",
            name: "用友集团",
            refcode: "org1",
            refpk: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
            id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
            refname: "用友集团"
        }
    ]
};
class FormTreeRef extends Component {



    constructor() {
        super();
        this.state = {
            treeData:[],
            nodeDisplay: (record) => {
                return `${record.refname}-nodeDisplay`
            },//树节点展示
            displayField: (record) => {
                return `${record.name}-${record.code}-displayField`
            },//下拉展示的
            inputDisplay:'{refname}-inputDisplay',//input框展示
            matchData:[{name:'用友集团',refname:'用友集团',refpk: "45a6400c-f80a-47be-9cfc-91d9581f32f4"},{name:'用友金融',refname:'用友金融',refpk: "3a9ea0ca-a8e0-43ab-ae91-0c16f23ad671"}],
            value:JSON.stringify({
                refname: "用友集团;用友金融",
                refpk: "45a6400c-f80a-47be-9cfc-91d9581f32f4;3a9ea0ca-a8e0-43ab-ae91-0c16f23ad671",  //value中指定的refpk要等于valueField对应的字段
            }),
            valueField:'refpk',
        }
    }
    componentDidMount(){
    }
    /**
     * @msg: 打开input右侧menu icon触发的操作
     * @param {type}
     * @return:
     */
    canClickGoOn = () =>{
        this.loadData();
        return true;//必须要有
    };
    /**
     * @msg: 请求mock数据
     */
    loadData = async () => {
        this.setState({
            loading:true,
        });
        let ajax={
            url: 'https://mock.yonyoucloud.com/mock/1264/pap_basedoc/common-ref/blobRefTree',
        };
        let results = await request(ajax);
        let treeData = [];
        if (!results || !results.data.length){
            this.setState({
                loading:false,
                pageCount:-1,//不展示分页
                totalElements:0,
                treeData,
            });
            return false;
        }
        treeData= [
            {
                code: "org1",
                children: [
                    {
                        code: "bj",
                        entityType: "mainEntity",
                        name: "北京总部-简",
                        pid: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                        refcode: "bj",
                        refpk: "5305416e-e7b4-4051-90bd-12d12942295b",
                        id: "5305416e-e7b4-4051-90bd-12d12942295b",
                        isLeaf: "true",
                        refname: "北京总部-简"
                    },
                    {
                        code: "xd",
                        entityType: "mainEntity",
                        name: "新道-简",
                        pid: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                        refcode: "xd",
                        refpk: "b691afff-ea83-4a3f-affa-beb2be9cba52",
                        id: "b691afff-ea83-4a3f-affa-beb2be9cba52",
                        isLeaf: "true",
                        refname: "新道-简"
                    },
                    {
                        code: "yy3",
                        entityType: "mainEntity",
                        name: "test3",
                        pid: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                        refcode: "yy3",
                        refpk: "e75694d9-7c00-4e9e-9573-d29465ae79a9",
                        id: "e75694d9-7c00-4e9e-9573-d29465ae79a9",
                        isLeaf: "true",
                        refname: "test3"
                    },
                    {
                        code: "yy1",
                        entityType: "mainEntity",
                        name: "test1",
                        pid: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                        refcode: "yy1",
                        refpk: "fd32ceeb-57a8-4f44-816e-fa660f5715ab",
                        id: "fd32ceeb-57a8-4f44-816e-fa660f5715ab",
                        isLeaf: "true",
                        refname: "test1"
                    },
                    {
                        code: "dept2",
                        children: [
                            {
                                code: "cs",
                                entityType: "subEntity",
                                organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                                name: "测试部-简",
                                pid: "0ebbb6d8-250a-4d1d-a019-7ae951629a2c",
                                refcode: "cs",
                                refpk: "cc43a66a-438d-4106-937f-bec44406f771",
                                id: "cc43a66a-438d-4106-937f-bec44406f771",
                                isLeaf: "true",
                                refname: "测试部-简"
                            },
                            {
                                code: "qd",
                                entityType: "subEntity",
                                organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                                name: "前端部-简",
                                pid: "0ebbb6d8-250a-4d1d-a019-7ae951629a2c",
                                refcode: "qd",
                                refpk: "73a10edd-aae8-4f31-af25-1f48f0a3b344",
                                id: "73a10edd-aae8-4f31-af25-1f48f0a3b344",
                                isLeaf: "true",
                                refname: "前端部-简"
                            }
                        ],
                        entityType: "subEntity",
                        organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                        name: "生产处",
                        refcode: "dept2",
                        refpk: "0ebbb6d8-250a-4d1d-a019-7ae951629a2c",
                        id: "0ebbb6d8-250a-4d1d-a019-7ae951629a2c",
                        refname: "生产处"
                    },
                    {
                        code: "dept1",
                        children: [
                            {
                                code: "dept1_2",
                                entityType: "subEntity",
                                organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                                name: "财务二科",
                                pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
                                refcode: "dept1_2",
                                refpk: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
                                id: "55b7fff1-6579-4ca9-92b7-3271d288b9f3",
                                isLeaf: "true",
                                refname: "财务二科"
                            },
                            {
                                code: "dept1_1",
                                entityType: "subEntity",
                                organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                                name: "财务一科",
                                pid: "95b60f35-ed0b-454e-b948-fb45ae30b911",
                                refcode: "dept1_1",
                                refpk: "9711d912-3184-4063-90c5-1facc727813c",
                                id: "9711d912-3184-4063-90c5-1facc727813c",
                                isLeaf: "true",
                                refname: "财务一科"
                            }
                        ],
                        entityType: "subEntity",
                        organization_id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                        name: "财务处",
                        refcode: "dept1",
                        refpk: "95b60f35-ed0b-454e-b948-fb45ae30b911",
                        id: "95b60f35-ed0b-454e-b948-fb45ae30b911",
                        refname: "财务处"
                    }
                ],
                entityType: "mainEntity",
                name: "用友集团",
                refcode: "org1",
                refpk: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                id: "a4cf0601-51e6-4012-9967-b7a64a4b2d47",
                refname: "用友集团"
            }
        ];
        let page = results.page;
        this.setState({
            treeData,
            ...page,
            loading:false
        });

    };
    /**
     * @msg: filterUrlFunc，快捷录入的回调函数
     * @param {type}
     * @return:
     */
    filterUrlFunc = (value) =>{
        //模拟过滤数据
        this.setState({
            filterData:[
                {
                    "code": "asdas",
                    "name": "asfasf",
                    "pid": "44228a37-e97c-4347-8667-3aead5d1261b",
                    "refcode": "asdas",
                    "refpk": "a17df4c2-7b0c-4b26-ba0e-652c380c9f95",
                    "id": "a17df4c2-7b0c-4b26-ba0e-652c380c9f95",
                    "isLeaf": "true",
                    "refname": "asfasf"
                },
                {
                    "code": "bjfs",
                    "name": "北京分公司",
                    "pid": "44228a37-e97c-4347-8667-3aead5d1261b",
                    "refcode": "bjfs",
                    "refpk": "29fedd0a-9d3d-4690-b24d-4a2032cca349",
                    "id": "29fedd0a-9d3d-4690-b24d-4a2032cca349",
                    "isLeaf": "true",
                    "refname": "北京分公司"
                }],
        })
    }
    /**
     * @msg: 保存的回调函数
     * @param {type}
     * @return:
     */
    onSave = (result) =>{
        this.setState({
            matchData:result,
        })
    };
    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        const {treeData,matchData,filterData,value,valueField,nodeDisplay,displayField,inputDisplay} = this.state;
        return (
            <div className="ref-input u-select">
                <RefTreeWithInput
                    {...option}
                    onSave={this.handleSelect}
                    disabled={this.props.disabled}
                    getRefTreeData={this.getRefTreeData}
                    {...getFieldProps("code1", {
                        initialValue: JSON.stringify(value),
                        rules: [
                            {
                                message: "请输入请选择",
                                pattern: /[^{"refname":"","refpk":""}|{"refpk":"","refname":""}]/
                            }
                        ]
                    })}
                />
            </div>
        )
    }
}
export default Form.createForm()(FormTreeRef);
