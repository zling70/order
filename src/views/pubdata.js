const custInfo = {
    linenum:3,
    customer:"c03",
    custname:"张小飞",
    custaddress:"株洲"
}
const tableData2 = [
        { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
        { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
        { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
        { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
    ]
const billdt = {
        billno: '20220520001', //单据编号
        billdate: '2022-05-20',//new Date(), //单据日期
        customer: '健坤科技', //客户
        customeraddress: '株洲', //送货地址
        billstatus: '未结案', //单况
        remark: '写入备注:你是一条汉子！', //备注
        currid: 'RMB', //币别
        billstylename: '打折销售',//订单类型
        maker: '', //制单人员
        permitter: '刘经理', //复合人员
        priceofoftax: '是', //单价是否含税
        salesid: '小花', //业务人员
        departid: '销售部', //所属部门
        details: [{
            "linenum": 1,           //行号
            "billno": "20200220001", //单据编号（与主单关联）
            "code": "FI-SW-01",     //物料编号
            "name": "Koi",          //物料名称
            "specs": "ssma",          //规格型号
            "unitof": "pcs",          //计量单位
            "quantities": 10.00,     //数量
            "unitprice": 36.50,      //单价
            "amounts": 368.00,       //金额
        },
        {
            "linenum": 2,
            "billno": "20200220001",
            "code": "K9-DL-01",
            "name": "Dalmation",
            "specs": "EST-10",
            "unitof": "P",
            "quantities": 10.00,
            "unitprice": 18.50,
            "amounts": 185.00,

        },
        {
            "linenum": 3,
            "billno": "20200220001",
            "code": "RP-SN-01",
            "name": "Rattlesnake",
            "specs": "EST-11",
            "unitof": "P",
            "quantities": 10.00,
            "unitprice": 38.50,
            "amounts": 385.00,

        },
        {
            "linenum": 4,
            "billno": "20200220001",
            "code": "RP-SN-01",
            "name": "Rattlesnake",
            "specs": "EST-12",
            "unitof": "P",
            "quantities": 10.00,
            "unitprice": 26.50,
            "amounts": 265.00,
        },
        {
            "linenum": 5,
            "billno": "20200220001",
            "code": "RP-LI-02",
            "name": "Iguana",
            "specs": "EST-13",
            "unitof": "P",
            "quantities": 10.00,
            "unitprice": 35.50,
            "amounts": 355.00,
        },
        {
            "linenum": 6,
            "billno": "20200220001",
            "code": "FL-DSH-01",
            "name": "Manx",
            "specs": "EST-14",
            "unitof": "P",
            "quantities": 10.00,
            "unitprice": 158.50,
            "amounts": 1585.00,

        },
        {
            "linenum": 7,
            "billno": "20200220001",
            "code": "FL-DSH-01",
            "name": "Manx",
            "specs": "EST-15",
            "unitof": "P",
            "quantities": 10.00,
            "unitprice": 83.50,
            "amounts": 835.00,

        },
        {
            "linenum": 8,
            "billno": "20200220001",
            "code": "FL-DLH-02",
            "name": "Persian",
            "specs": "EST-16",
            "unitof": "P",
            "quantities": 10.00,
            "unitprice": 23.50,
            "amounts": 235.00,
        },
        {
            "linenum": 9,
            "billno": "20200220001",
            "code": "FL-DLH-02",
            "name": "Persian",
            "specs": "EST-17",
            "unitof": "P",
            "quantities": 10,
            "unitprice": 89.50,
            "amounts": 895.00,
        },
        {
            "linenum": 10,
            "billno": "20200220001",
            "code": "AV-CB-01",
            "name": "Amazon Parrot",
            "specs": "EST-18",
            "unitof": "P",
            "quantities": 10,
            "unitprice": 63.50,
            "amounts": 635.00,
        }
        ]
    }
export default {custInfo,tableData2,billdt}