# h1




```G2.Chart
{
    forceFit: true,
    legend: 'country',
    padding: [40, 40, 130, 40],
    coord: 'polar',
    source: {
        data:[{
            country: '中国',
            cost: 96
            }, {
            country: '德国',
            cost: 121
            }, {
            country: '美国',
            cost: 100
            }, {
            country: '日本',
            cost: 111
            }, {
            country: '韩国',
            cost: 102
            }, {
            country: '法国',
            cost: 124
            }, {
            country: '意大利',
            cost: 123
            }, {
            country: '荷兰',
            cost: 111
            }, {
            country: '比利时',
            cost: 123
            }, {
            country: '英国',
            cost: 109
            }, {
            country: '加拿大',
            cost: 115
            }, {
            country: '俄罗斯',
            cost: 99
            }, {
            country: '墨西哥',
            cost: 91
            }, {
            country: '印度',
            cost: 87
            }, {
            country: '瑞士',
            cost: 125
            }, {
            country: '澳大利亚',
            cost: 130
            }, {
            country: '西班牙',
            cost: 109
            }, {
            country: '巴西',
            cost: 123
            }, {
            country: '泰国',
            cost: 91
            }, {
            country: '印尼',
            cost: 83
            }, {
            country: '波兰',
            cost: 101
            }, {
            country: '瑞典',
            cost: 116
            }, {
            country: '奥地利',
            cost: 111
            }, {
            country: '捷克',
            cost: 107
        }],
        scaleConfig: {
            'cost': {min: 0}
        }
    },
     interval: {
        position:'country*cost',
        color:'country',
        label: {
            field: 'cost',
            cfg: {
                offset: -15,
                textStyle: {
                    textAlign: 'center',
                    fontSize: 11,
                    shadowBlur: 2,
                    shadowColor: 'rgba(0, 0, 0, .45)'
                }
            }
        },
        style: {
            lineWidth: 1,
            stroke: '#fff'
        }
     }



}
```

-------

```G2.Chart1
{
    forceFit: true,
    legend: {
        position: 'top'
    },
    data:[
         { genre: 'Sports', sold: 28875 },
         { genre: 'Strategy', sold: 115 },
         { genre: 'Action', sold: 120 },
         { genre: 'Shooter', sold: 350 },
         { genre: 'Other', sold: 150 }
     ]

}
```