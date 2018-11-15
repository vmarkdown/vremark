const { axios } = require('vremark-plugin-common-libs');
const { katex } = require('vremark-plugin-math-libs');

require('./index.scss');

const MODE = {
    KATEX: 'katex',
    ONLINE: 'online'
};

const BASE_URL = (function () {
    const prtcl = location.protocol;
    const ntwPath = '//tex.s2cms.ru';
    const BASE_URL = (prtcl === 'http:' || prtcl === 'https:') ? ntwPath : 'http:' + ntwPath;
    return BASE_URL;
})();

function getUrl(code) {
    var src = BASE_URL + '/' + 'svg' + '/' + encodeURIComponent(code);
    return src;
}

function crawl() {
    return new Promise(function (resolve, reject) {
    });
}


module.exports = {
    name: 'vremark-plugin-math',
    props: {
        'inline': {
            type: Boolean,
            default: false
        },
        'code': {
            type: String,
            required: true
        }
    },
    data() {
        return {
            mode: MODE.KATEX,
            result: this.code || ''
        }
    },
    render(h) {

        return h(this.inline?'span':'p', {
            'class': ['vremark-plugin-math', this.inline?'vremark-katex-inlineMath':'vremark-katex-math'],
            domProps:{
                innerHTML: this.result
            }
        });


        // if(this.mode === MODE.KATEX) {
        //
        //
        //
        // }
        //
        // return h(this.inline?'span':'p', {
        //     'class': ['vremark-plugin-math', this.inline?'katex':'katex-display']
        // },[
        //     h('embed', {
        //         ref: 'embed',
        //         attrs: {
        //             src: getUrl(this.code)
        //         }
        //     })
        // ]);

    },
    methods: {


        compileOnline() {
            var self = this;
            // self.mode = MODE.ONLINE;
            //
            // self.$nextTick(function () {
            //
            //     // console.log();
            //
            //     var dom = self.$refs['embed'];
            //
            //
            //     setTimeout(function () {
            //
            //         console.log(dom);
            //         debugger
            //
            //
            //     }, 3000);
            //
            //
            // });


            const url = getUrl(this.code);

            axios.get(url)
                .then(function (response) {
                    // handle success
                    // debugger
                    // console.log(response);

                    const data = response.data;
                    self.result = this.inline
                        ?'<span class="katex">'+data+'</span>'
                        :'<span class="katex-display">'+data+'</span>';


                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });




        },
        compile() {
            var self = this;
            try {
                var renderedValue = katex.renderToString(self.code, {
                    throwOnError: true,
                    displayMode: !this.inline,
                    macros: {}
                });
                self.result = renderedValue;
                // katex.render(self.code, self.$el);
                // katex.render("c = \\pm\\sqrt{a^2 + b^2}", element, {
                //     throwOnError: true
                // });
            } catch (e) {
                // console.log(e);
                self.compileOnline();
            }
        }
    },
    mounted() {
        var self = this;
        self.compile();
    }
};