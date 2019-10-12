import Mock from 'mockjs';

function getRandomData(n, name) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(Mock.Random[name]());
    }
    return arr;
}

function getText(n, name, min, max) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(Mock.Random[name](min, max));
    }
    return arr;
}

/**
 * 轮播图数据
 * 请求地址：/api/getslider
 * 请求方式：GET
 * 传入的api 无
 * 返回的数据类型：JSON
 */
let slideData = Mock.mock({
    'sliders|2': [{
        'id|+1': getRandomData(2, 'id'),
        'img_src|+1': [
            'https://shopstatic.vivo.com.cn/vivoshop/commodity/20180430/20180430232146894398_original.jpg',
            'https://shopstatic.vivo.com.cn/vivoshop/commodity/20180418/20180418104131830678_original.jpg',
        ]
    }]
});

Mock.mock('/api/getslider', 'get', slideData);

/**
 * 获取手机商品的列表数据
 * 请求地址 /api/getgoods
 * 请求方式 get
 * 传入的api 无
 * 返回的数据类型 JSON
 */
let goodsIds = [
    "150000199601181657",
    "440000198806069460",
    "110000198801030050",
    "130000199306264050",
    "620000198605114871",
    "520000197210013701"
];
let phoneImgs = [
    'https://shopstatic.vivo.com.cn/vivoshop/commodity/71/4171_1496689409434hd_530x530.png',
    'https://shopstatic.vivo.com.cn/vivoshop/commodity/40/4440_1508723830538hd_530x530.png',
    'https://shopstatic.vivo.com.cn/vivoshop/commodity/95/4495_1509454710945hd_530x530.png',
    'https://shopstatic.vivo.com.cn/vivoshop/commodity/66/4266_1496689781362hd_530x530.png',
    'https://shopstatic.vivo.com.cn/vivoshop/commodity/11/4111_1492998667334hd_530x530.png',
    'https://shopstatic.vivo.com.cn/vivoshop/commodity/80/4180_1496689544465hd_530x530.png'
]
let goodsData = Mock.mock({
    'goods|6': [{
        'id|+1': goodsIds,
        'img_src|+1': phoneImgs,
        'goods_details|+1': getText(6, 'ctitle', 10, 15),
        'oldPrice|1999-2999.2': 1,
        'nowPrice|1999-2599.2': 1,
        'type|1': [
            "120000200001161257",
            "150000199007248820",
            "230000199404103975"
        ]
    }]
});

Mock.mock('/api/getgoods', 'get', goodsData);

/**
 * 获取商品详情数据中轮播图的数据
 * 请求地址 /api/goods/getdest/:id
 * 请求方式 get
 * 传入的api id
 * 返回的数据类型 JSON
 */
let partsGoodsIds = [
    "440000200903216442",
    "230000198611221355",
    "620000201203025838",
    "640000201302122549",
    "120000199411221536",
    "310000198409274525"
]

/**
 * 配置商品详情轮播图
 * 请求的地址 '/api/goods/getPartsSlider/:id'
 * 请求的方式 get
 * 传入的参数 id
 * 返回的数据类型 JSON
 */
let partsdestimgs = [
    [
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/27/5027_1526972514378hd_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/27/5027_1526972555460hd_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/27/5027_1526972611298hd_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/27/5027_1526972617808hd_530x530.png',
    ],
    [
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/20/4020_1481558694236_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/20/4020_1456733531803_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/20/4020_1456733534360_530x530.png',
    ],
    [
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/82/1882_1481558960471_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/82/1882_1447902809866_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/82/1882_1447902810338_530x530.png',
    ],
    [
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/59/4459_1506593158905hd_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/59/4459_1506593164284hd_530x530.png',
    ],
    [
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/83/4183_1482921083765_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/83/4183_1482921084622_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/83/4183_1482921085636_530x530.png',
    ],
    [
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/81/4181_1482720908043_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/81/4181_1482720907295_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/81/4181_1482720908843_530x530.png'
    ]
];

let phonedestimgs = [
    [
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/71/4171_1496689409434hd_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/71/4171_1482112378797_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/71/4171_1482112377158_530x530.png',
    ],
    [
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/40/4440_1508723830538hd_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/40/4440_1508723832425hd_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/40/4440_1508723828993hd_530x530.png',
    ],
    [
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/95/4495_1509454710945hd_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/95/4495_1509454714610hd_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/95/4495_1509454706314hd_530x530.png',
    ],
    [
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/66/4266_1496689781362hd_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/66/4266_1500026039430hd_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/66/4266_1490271072649hd_530x530.png',
    ],
    [
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/11/4111_1492998667334hd_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/11/4111_1500023519212hd_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/11/4111_1500023520345hd_530x530.png',
    ],
    [
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/80/4180_1496689544465hd_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/80/4180_1498696044402hd_530x530.png',
        'https://shopstatic.vivo.com.cn/vivoshop/commodity/80/4180_1482292661461_530x530.png'
    ]
];

let destimgs = [...phonedestimgs, ...partsdestimgs];

let goodsDestImgs = Mock.mock({
    'goodsdest|12': [{
        'dest|+1': destimgs,
        'id|+1': [...[
            "150000199601181657",
            "440000198806069460",
            "110000198801030050",
            "130000199306264050",
            "620000198605114871",
            "520000197210013701"
        ], ...partsGoodsIds]
    }]
});
Mock.mock(RegExp('/api/goods/goodsdetails/' + '.*'), 'get', (options) => {
    let data = [];
    let id = options.url.replace('/api/goods/goodsdetails/', '');
    goodsDestImgs.goodsdest.some(item => {
        if (item.id == id) {
            data = item.dest;
            return true;
        }
    });
    return data;
});


/**
 * 获取商品详情中的价格，标题数据，等信息
 * 请求的地址 /api/goods/getinfo/:id
 * 传入的参数 id
 * 请求的方式 get
 * 返回的数据类型 JSON
 */
let goodsInfoData = Mock.mock({
    'info|12': [{
        'id|+1': [...goodsIds, ...partsGoodsIds],
        'title|+1': getText(12, 'ctitle', 5, 8),
        'content|+1': getText(12, 'cparagraph', 3, 6),
        'small|+1': getText(12, 'cword', 12, 15),
        'price|2599-2999': 1,
        'max|50-100': 1,
        'params|1': `
            <style>
                .list{
                    padding: 0 20px;
                }
                .list p{
                    color: #888;
                    font-size: 16px;
                    margin: 5px 0;
                }
                .list span{
                    display: block;
                    font-size: 16px;
                    padding: 10px 0;
                }
                .list h3{
                    font-weight: normal;
                    color: #333;
                    border-bottom: 1px solid #ccc;
                    font-size: 18px;
                    padding: 15px 0;
                }
            </style>
            <h3>包装清单</h3>
            <span>标配</span>
            <p>X9s Plus A *1 </p>
            <p>取卡针 *1 </p>
            <p>XE680线控耳机 *1</p>
            <p>闪充充电头 *1</p>
            <p>USB数据线</p>
            <p>透明后盖保护壳 *1</p>
            <p>快速入门指南 *1</p>
            <p>重要信息和保修卡</p>
            <h3>其他参数</h3>
            <p>CPU</p>
            <p>高通骁龙八核MSM8976SG（MSM8976pro</p>
        `,
        'introImgs': [{
                "img_src": "https://shopstatic.vivo.com.cn/vivoshop/commodity/20171115/20171115110719510981_original.jpg"
            },
            {
                "img_src": "https://shopstatic.vivo.com.cn/vivoshop/commodity/20171113/20171113112115957344_original.jpg"
            },
            {
                "img_src": "https://shopstatic.vivo.com.cn/vivoshop/commodity/20161219/20161219093807784269_original.jpg"
            },
            {
                "img_src": "https://shopstatic.vivo.com.cn/vivoshop/commodity/20161219/20161219093810349285_original.jpg"
            },
            {
                "img_src": "https://shopstatic.vivo.com.cn/vivoshop/commodity/20161219/20161219093813167921_original.jpg"
            },
            {
                "img_src": "https://shopstatic.vivo.com.cn/vivoshop/commodity/20161219/20161219093814935600_original.jpg"
            },
            {
                "img_src": "https://shopstatic.vivo.com.cn/vivoshop/commodity/20161219/20161219093817527717_original.jpg"
            },
            {
                "img_src": "https://shopstatic.vivo.com.cn/vivoshop/commodity/20161219/20161219093820318903_original.jpg"
            },
            {
                "img_src": "https://shopstatic.vivo.com.cn/vivoshop/commodity/20161219/20161219093822750588_original.jpg"
            },
            {
                "img_src": "https://shopstatic.vivo.com.cn/vivoshop/commodity/20161219/20161219093824598774_original.jpg"
            },
            {
                "img_src": "https://shopstatic.vivo.com.cn/vivoshop/commodity/20161219/20161219093827290232_original.jpg"
            },
            {
                "img_src": "https://shopstatic.vivo.com.cn/vivoshop/commodity/20161219/20161219093829298284_original.jpg"
            },
            {
                "img_src": "https://shopstatic.vivo.com.cn/vivoshop/commodity/20161219/2016121909383925061_original.jpg"
            },
            {
                "img_src": "https://shopstatic.vivo.com.cn/vivoshop/commodity/20161230/20161230205257942403_original.jpg"
            },
            {
                "img_src": "https://shopstatic.vivo.com.cn/vivoshop/commodity/20170629/2017062914535078223_original.jpg"
            }
        ]
    }]
});
Mock.mock(RegExp('/api/goods/getinfo/' + '.*'), 'get', (options) => {
    let data = {};
    let id = options.url.replace('/api/goods/getinfo/', '');
    goodsInfoData.info.some(item => {
        if (item.id == id) {
            data = item;
            return true;
        }
    });
    return data;
});

/**
 * 商品分类数据
 * 请求的地址 /api/getFirstCate
 * 请求的参数 无
 * 请求的方式 get
 * 返回的数据类型 JSON
 */
let phoneIds = [
    "120000200001161257",
    "150000199007248820",
    "230000199404103975",
]

let partsIds = [
    "210000200103278087",
    "540000197911264216",
    "440000201509061467",
    "530000197002284859"
]

let catetoryIds = [...phoneIds, ...partsIds];

let phoneNames = [
    'Xplay系列',
    'X系列',
    'Y系列'
]

let partsNames = [
    '充电器',
    '保护膜',
    '耳机音响',
    '智能外设'
]

let firstCateData = Mock.mock({
    'firstCate|7': [{
        'id|+1': catetoryIds,
        'name|+1': [...phoneNames, ...partsNames]
    }]
});
Mock.mock('/api/getFirstCate', 'get', firstCateData);


/**
 * 二级分类数据
 * 请求地址 /api/getSecondCate/:id
 * 请求的方式 get
 * 传入的参数 id
 * 返回的数据类型 JSON
 */
let partsImgs = [
    'https://shopstatic.vivo.com.cn/vivoshop/commodity/27/5027_1526972514378hd_250x250.png',
    'https://shopstatic.vivo.com.cn/vivoshop/commodity/20/4020_1481558694236_530x530.png',
    'https://shopstatic.vivo.com.cn/vivoshop/commodity/82/1882_1481558960471_530x530.png',
    'https://shopstatic.vivo.com.cn/vivoshop/commodity/73/4273_1491007460873hd_250x250.png',
    'https://shopstatic.vivo.com.cn/vivoshop/commodity/83/4183_1482921083765_530x530.png',
    'https://shopstatic.vivo.com.cn/vivoshop/commodity/81/4181_1482720908043_250x250.png'
];
/**
 * 0--充电器
 * 1--保护膜
 * 2--耳机音响
 * 3--智能外设
 */
/**
 * 选购配件的商品
 * 请求的地址 /api/getPartsGoods/id
 * 请求的方式 get
 * 传入的参数 id
 * 返回的数据类型 JSON
 */
let partsData = Mock.mock({
    'parts|6': [{
        'id|+1': partsGoodsIds,
        'img_src|+1': partsImgs,
        'goods_details|+1': getText(6, 'ctitle', 8, 12),
        'oldPrice|85-180.2': 1,
        'nowPrice|58-158.2': 1,
        'type|1': partsIds
    }]
});

Mock.mock(RegExp('/api/getPartsGoods/' + '.*'), 'get', options => {
    let data = [];
    let id = options.url.replace('/api/getPartsGoods/', '');
    if (id == '0') {
        data = partsData.parts;
    } else {
        partsData.parts.forEach(item => {
            if (item.type == id) {
                data.push(item);
            }
        })
    }
    return data;
});

/**
 * 获取所有的商品数据
 * 请求地址/api/getAllGoods
 * 请求的方式 get
 * 传入的参数 无
 * 返回的数据类型 JSON
 */
let allGoods = [...goodsData.goods, ...partsData.parts];
Mock.mock('/api/getAllGoods', 'get', allGoods);


/**
 * 选购配件的分类tabBar
 * 请求的地址 /api/getPartsCate
 * 请求的方式 get
 * 传入的参数 无
 * 返回的数据类型 JSON
 */
let partsCateData = Mock.mock({
    'partsCate|4': [{
        'id|+1': partsIds,
        'name|+1': partsNames
    }]
});

Mock.mock('/api/getPartsCate', 'get', partsCateData);

let secondCateData = allGoods;

Mock.mock(RegExp('/api/getSecondCate/' + '.*'), 'get', (options) => {
    let data = [];
    let id = options.url.replace(/[^\d]/g, '');
    if (id == '0') {
        data = secondCateData;
    } else {
        secondCateData.forEach(item => {
            if (item.type == id) {
                data.push(item)
            }
        });
    }
    return data;
});

/**
 * 新闻资讯数据
 * 请求的地址 /api/getnews
 * 请求类型 get
 * 传入的参数 无
 * 返回得数据类型 JSON
 */
let newsImgs = [
    'https://bbsfiles.vivo.com.cn/vivobbs/attachment/portal/201804/18/211307l0sr8tqrpststut0.jpg',
    'https://bbsfiles.vivo.com.cn/vivobbs/attachment/portal/201804/12/190408w8123imwv3w22z4t.jpg',
    'https://bbsfiles.vivo.com.cn/vivobbs/attachment/portal/201804/23/175957thm7fz3m6am6l7fz.jpg',
    'https://bbsfiles.vivo.com.cn/vivobbs/attachment/portal/201804/18/210355fmpl8qqnu737qlz9.jpg'
]
let newsIds = [
    "230000198910279477",
    "620000200209055988",
    "370000197906303899",
    "140000199701315454",
]
let newsData = Mock.mock({
    'news|4': [{
        'id|+1': newsIds,
        'title|+1': getText(4, 'ctitle', 15, 18),
        'img_src|+1': newsImgs,
        'info|+1': getText(4, 'cparagraph', 3, 6),
        'public_time|+1': getRandomData(4, 'datetime')
    }]
});

Mock.mock('/api/getnews', 'get', newsData);

/**
 * 新闻资讯详情 
 * 请求的地址 /api/getnewsDetail/:id
 * 请求的方式 get
 * 传入的参数 id
 * 返回的数据类型 JSON
 */
let newsDetailsImgs = [
    [
        'https://bbsfiles.vivo.com.cn/vivobbs/attachment/forum/201804/08/173104exv2szdi2vv18lw3.jpg!t720x.jpg',
        'https://bbsfiles.vivo.com.cn/vivobbs/attachment/forum/201804/08/173549azhpzfq8aze0yccc.jpg!t720x.jpg',
    ],
    [
        'https://bbsfiles.vivo.com.cn/vivobbs/attachment/forum/201804/04/105458fzaood0zl00hnn50.jpg.thumb.jpg',
        'https://bbsfiles.vivo.com.cn/vivobbs/attachment/forum/201804/04/105456fj42zdjz11hvnt1x.jpg.thumb.jpg'
    ],
    [
        'https://bbsfiles.vivo.com.cn/vivobbs/attachment/forum/201804/10/065917f0ph1vtf90fze1vz.jpg!t720x.jpg',
        'https://bbsfiles.vivo.com.cn/vivobbs/attachment/forum/201804/10/065920fu4uynqdq4yqugg2.jpg!t720x.jpg'
    ],
    [
        'https://bbsfiles.vivo.com.cn/vivobbs/attachment/forum/201804/07/213251pfwtzq7ivvue06g7.jpg.thumb.jpg',
        'https://bbsfiles.vivo.com.cn/vivobbs/attachment/forum/201804/07/213332molo9mjzjjmmy6y9.jpg!t720x.jpg'
    ]
]

let d = Mock.mock({
    "data|4": [{
        'img_src|+1': newsDetailsImgs,
        'info|+1': getText(4, 'cparagraph', 4, 6)
    }]
})

let newsDetailsData = Mock.mock({
    'newsDetails|4': [{
        'id|+1': newsIds,
        'news|+1': d.data
    }]
});

Mock.mock(RegExp('/api/getnewsDetail/' + '.*'), 'get', options => {
    let data = [];
    let id = options.url.replace('/api/getnewsDetail/', '');
    newsDetailsData.newsDetails.forEach(item => {
        if (item.id == id) {
            data = item.news
        }
    });
    return data;
});

/**
 * 选购手机分类
 * 请求的地址 /api/getChooseCate
 * 请求的方式 get
 * 传入的参数 无
 * 返回的数据类型 JSON
 */
let choosCateData = Mock.mock({
    'chooseCate|3': [{
        'id|+1': phoneIds,
        'name|+1': phoneNames
    }]
});

Mock.mock('/api/getChooseCate', 'get', choosCateData);

/**
 * 选购手机goods
 * 请求的地址 /api/getChooseGoods/:id
 * 请求的方式 get
 * 传入的参数 id
 * 返回的数据类型 JSON
 */

Mock.mock(RegExp('/api/getChooseGoods/' + '.*'), 'get', options => {
    let data = [];
    let id = options.url.replace('/api/getChooseGoods/', '')
    if (id == '0') {
        data = goodsData.goods
    } else {
        goodsData.goods.forEach(item => {
            if (item.type == id) {
                data.push(item)
            }
        });
    }
    return data;
});

/**
 * 我的收藏
 * 请求地址 /api/addCollection
 * 请求的方式 post
 * 请求传入的参数 
 * 返回值 {code: 200, message: '收藏成功'}
 */