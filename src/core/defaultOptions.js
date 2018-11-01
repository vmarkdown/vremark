module.exports = {
    // parse
    breaks: true,
    attrs: {
        header: true,
        link: false,
        fenced_code: false,
        inline_code: false,
    },
    math: true,
    allowDangerousHTML: true,
    hash: true,

    //plugins
    plugins: [],
    flowchart: true,
    mermaid: true,
    sequence: true,
    chart: true,
    g2: true,
    highlight: true,

    yinxiang: {
        imageSize: false
    },

    // render
    mode: 'vue',
    h: function () {},
    rootClassName: 'vremark-body',
    rootTagName: 'div',
    hashid: true
};
