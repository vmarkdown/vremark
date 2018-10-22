## 快速上手


```g2
const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 }
];

const chart = new G2.Chart({
    forceFit: true,
    container: container,
    height : 300
});
chart.source(data);
chart.interval().position('genre*sold').color('genre')
chart.render();

return chart;
```


## 基础折线图


```g2
var data = [{
  year: '1991',
  value: 3
}, {
  year: '1992',
  value: 4
}, {
  year: '1993',
  value: 3.5
}, {
  year: '1994',
  value: 5
}, {
  year: '1995',
  value: 4.9
}, {
  year: '1996',
  value: 6
}, {
  year: '1997',
  value: 7
}, {
  year: '1998',
  value: 9
}, {
  year: '1999',
  value: 13
}];
var chart = new G2.Chart({
  container: container,
  forceFit: true,
  height: 400
});
chart.source(data);
chart.scale('value', {
  min: 0
});
chart.scale('year', {
  range: [0, 1]
});
chart.tooltip({
  crosshairs: {
    type: 'line'
  }
});
chart.line().position('year*value');
chart.point().position('year*value').size(4).shape('circle').style({
  stroke: '#fff',
  lineWidth: 1
});
chart.render();

return chart;
```

## 基础柱状图

```g2
var data = [{
  year: '1951 年',
  sales: 38
}, {
  year: '1952 年',
  sales: 52
}, {
  year: '1956 年',
  sales: 61
}, {
  year: '1957 年',
  sales: 145
}, {
  year: '1958 年',
  sales: 48
}, {
  year: '1959 年',
  sales: 38
}, {
  year: '1960 年',
  sales: 38
}, {
  year: '1962 年',
  sales: 38
}];
var chart = new G2.Chart({
  container: container,
  forceFit: true,
  height: 400
});
chart.source(data);
chart.scale('sales', {
  tickInterval: 20
});
chart.interval().position('year*sales');
chart.render();

return chart;
```



## 基础饼图

```g2
var data = [{
  item: '事例一',
  count: 40,
  percent: 0.4
}, {
  item: '事例二',
  count: 21,
  percent: 0.21
}, {
  item: '事例三',
  count: 17,
  percent: 0.17
}, {
  item: '事例四',
  count: 13,
  percent: 0.13
}, {
  item: '事例五',
  count: 9,
  percent: 0.09
}];
var chart = new G2.Chart({
  container: container,
  forceFit: true,
  height: window.innerHeight
});
chart.source(data, {
  percent: {
    formatter: function formatter(val) {
      val = val * 100 + '%';
      return val;
    }
  }
});
chart.coord('theta', {
  radius: 0.75
});
chart.tooltip({
  showTitle: false,
  itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
});
chart.intervalStack().position('percent').color('item').label('percent', {
  formatter: function formatter(val, item) {
    return item.point.item + ': ' + val;
  }
}).tooltip('item*percent', function(item, percent) {
  percent = percent * 100 + '%';
  return {
    name: item,
    value: percent
  };
}).style({
  lineWidth: 1,
  stroke: '#fff'
});
chart.render();

return chart;
```
