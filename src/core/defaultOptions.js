module.exports = {
    // parse
    breaks: true,
    math: true,
    allowDangerousHTML: true,
    hash: true,

    //plugins
    flowchart: true,
    mermaid: true,
    sequence: true,
    chart: true,
    g2: true,
    highlight: true,


    // render
    mode: 'vue',
    h: function () {},
    rootClassName: 'vremark-body',
    rootTagName: 'div',
    hashid: true
};
