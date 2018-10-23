require('./plantuml.scss');
// var Vue = require('vue');
var plantumlEncoder = require('plantuml-encoder');

var FORMAT = {
    'svg': 'embed',
    'img': 'img'
};

module.exports = ({
    name: 'plantuml',
    props: {
        'code': {
            type: String,
            required: true
        },
        'type': {
            type: String,
            default: 'svg'
        }
    },
    computed: {
        url() {
            var self = this;
            if(!self.code) return '';
            var encoded = plantumlEncoder.encode(self.code);
            return 'http://www.plantuml.com/plantuml/'+self.type+'/' + encoded;
        }
    },
    render(h) {
        return h('div', {
            'class': ['remark-plantuml']
        },[
            h(FORMAT[this.type], {
                attrs: {
                    src: this.url
                }
            })
        ]);
    }
});