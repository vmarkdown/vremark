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

