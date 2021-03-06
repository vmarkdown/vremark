const vremark = require('../../src/index');

// vremark.parse('# h1');

let md = require('../md/test.md');

const app = new Vue({
    el: '#app',
    render(h) {

        console.time('all');

        console.time('parse');
        const hast = vremark.parse(md, {

            breaks: false,
            hashid: true,
            highlight: true,

            math: false,

            // math: {
            //     katex: true,
            // },

            flowchart: false,
            sequence: false,
            mermaid: false,
            plantuml: false,
            raw: false,
            G2: false,

        });
        console.timeEnd('parse');

        console.time('render');
        const vdom = vremark.render(hast, {
            h: h,
            // mode: 'vue',
            rootTagName: 'main',
            rootClassName: 'markdown-body',
            mode: function (node) {
                var props = {
                    attrs: {},
                    domProps: {},
                    props: {}
                };

                if(node.properties){

                    if(node.properties.className) {
                        props['class'] = node.properties.className;
                    }

                    if(node.properties.innerHTML) {
                        props.domProps.innerHTML = node.properties.innerHTML;
                    }

                    Object.keys(node.properties).forEach(function (key) {
                        if( key ==='className' || key==='innerHTML' ){
                            return;
                        }
                        props.attrs[key] = node.properties[key];
                    });

                }

                if(node.hasOwnProperty('key')){
                    props.key = node.key;
                }

                if(node.data){
                    if(node.data.props){
                        props.props = node.data.props;
                    }
                }

                if(node.type === 'component'){

                }

                return props;

            },
            mode1: function (node) {

                // debugger
                var props = {
                    attrs: {},
                    domProps: {}
                };

                if(node.properties){

                    if(node.properties.className) {
                        props['class'] = node.properties.className;
                    }

                    if(node.properties.innerHTML) {
                        props.domProps.innerHTML = node.properties.innerHTML;
                    }

                    Object.keys(node.properties).forEach(function (key) {
                        if( key ==='className' || key==='innerHTML' ){
                            return;
                        }
                        props.attrs[key] = node.properties[key];
                    });

                }

                if(node.type === "raw"){
                    node.tagName = node.tagName || 'div';
                    props.domProps.innerHTML = node.value;
                }

                return props;

                // return node.properties;
                // if(!node.properties) return {};
                // var props = {
                //     attrs: node.properties,
                //     domProps: {}
                // };
                // if(node.properties.className) {
                //     props['class'] = node.properties.className;
                //     delete props.attrs.className;
                // }
                // if(node.properties.innerHTML) {
                //     props.domProps.innerHTML = node.properties.innerHTML;
                //     delete props.attrs.innerHTML;
                // }
                // return props;
            }
        });
        console.timeEnd('render');

        console.timeEnd('all');

        console.log(hast);

        // vdom.children.push(h(timer));
        return vdom;

    }
});


// setTimeout(function () {
//     md = `# h1====
//
// \`\`\`G2.Chart
// {
//     forceFit: true,
//     height : 300,
//     data:[
//          { genre: 'Sports======', sold: 28875 },
//          { genre: 'Strategy', sold: 115 },
//          { genre: 'Action', sold: 120 },
//          { genre: 'Shooter', sold: 350 },
//          { genre: 'Other', sold: 150 }
//     ],
//     interval: {
//         position: 'genre*sold',
//         color: 'genre'
//     }
//
// }
// \`\`\`
// `;
//
//
//     console.log('----======');
//     app.$forceUpdate();
// }, 3000);


// for(let i=0;i<10;i++){
//     setTimeout(function () {
//         app.$forceUpdate();
//     }, i*1000);
// }
