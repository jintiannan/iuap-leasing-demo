import request from "axios";
import Item from "antd/lib/list/Item";
import { deepClone,Info } from "utils";
//定义接口地址
const URL = {
    "ENUM_CONSTANT": `${GROBAL_HTTP_CTX}/sales/list`
};


// export function enumConstant(type) {
//     // return request(URL.ENUM_CONSTANT, {
//     //     method: "post",
//     //     params: type
//     // });

/* ↓使用临时数据↓ */
// switch (type) {
//     case "billstatus": //工厂
//         return [{key: '审核通过', value: 9}, {key: '暂存', value: 20}];
//     case 'yesOrNo':
//         return [{value: "0", key: '是'}, {value: '1', key: '否'}];
//     case 'datecompareCon':
//         return [{value: "0", key: '等于'}, {value: '1', key: '小于'},{value: '2', key: '大于'},{value:'3',key:'大于等于'},{value:'4',key:'包含'},{value:'5',key:'小于等于'},{value:'6',key:'介于'}];
//     case 'compareCon':
//         return [{value: "0", key: '等于'}, {value: '1', key: '小于'},{value: '2', key: '大于'},{value:'3',key:'大于等于'},{value:'4',key:'包含'},{value:'5',key:'小于等于'}];
//     case 'identityType':
//         return [{ key: '身份证', value: '0' }, { key: '执照', value: '1' },{ key: '驾照', value: '2' },{ key: '护照', value: '3' },{ key: '其他', value: '4' }] ;
//     case 'sex':
//         return [{ key: '男', value: '0' }, { key: '女', value: '1' }];
//     case 'education':
//         return [{ key: '研究生', value: '0' }, { key: '本科', value: '1' }, { key: '专科', value: '2' }, { key: '中专', value: '3' }, { key: '高中', value: '4' }, { key: '初中', value: '5' }, { key: '小学', value: '6' }, { key: '未知', value: '7' }];
//     case 'marryStatus':
//         return [{ key: '已婚', value: '0' }, { key: '未婚', value: '1' },{ key: '离异', value: '2' },{ key: '丧偶', value: '3' }] ;
//     case 'profess':
//         return [{ key: '高级', value: '0' }, { key: '中级', value: '1' },{ key: '初级', value: '2' },{ key: '无', value: '3' },{ key: '未知', value: '4' }];
//     case 'lengthOfJob':
//         return [{ key: '3年以下', value: '0' }, { key: '3-10年', value: '1' }, { key: '10年以上', value: '2' }];
//     case 'relationship':
//         return [{ key: '直系亲属', value: '0' }, { key: '朋友', value: '1' }, { key: '同事', value: '2' }, { key: '其他', value: '3' }];
//     case 'leaseFlow':
//         return [{ key: '约定日起租', value: 3 }];
//     case 'assetsClassify':
//         return [{ key: '正常', value: '0' }, { key: '关注', value: '1' }, { key: '次级', value: '2' }];
//     case 'trueOrfalse':
//         return [{value: true, key: '成功'}, {value: false, key: '失败'}];
//     case 'busiType':
//         return [{ key: '合同业务', value: '0' }, { key: '客户业务', value: '1' }, { key: '开票业务', value: '2' },{ key: '收支计划业务', value: '3' },
//         { key: '付款业务', value: '4' },{ key: '保证金收取业务', value: '5' },{ key: '保证金冲抵业务', value: '6' },{ key: '逾期业务', value: '7' },{ key: '不良合同类型', value: '8' },
//         { key: '提前结清', value: '9' },{ key: '收款业务', value: '10' }];
//     default:
//         break;
// }
// }

let enumArray;
export function enumConstant(type) {
    if(enumArray == undefined){
        enumArray = localStorage.getItem("paramType");
        console.log("缓存只读一次");
    }
    let array;
    let request=[];
    if(enumArray){
        array = deepClone(JSON.parse(enumArray));
        array.map((item) =>{
            if(item[type]){
                request = item[type];
            }
        })
    }
    return request;
}

export function enumConstantValue(type, value) {
    let array = enumConstant(type);
    let request = '';
    array.map((item) =>{
        if(item.value == value){
            request = item.key;
        }
    })
    return request;
}
