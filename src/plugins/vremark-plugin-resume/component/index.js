// const {  } = require('vremark-plugin-resume-libs');

require('./index.scss');

const component = require('./resume.vue').default;


module.exports = {
    name: 'vremark-plugin-resume',
    props: {
        'code': {
            type: String,
            required: true
        }
    },
    data() {
        return {
            result: this.code || ''
        }
    },
    render(h) {
        return h('div',
            {'class': ['vremark-plugin-resume']}
        );
    },
    methods:{
        getOptions() {


        },
        compile() {
            var self = this;
            try {
                var options = JSON.parse(self.code);
                debugger
            } catch (e) {
                console.error(e);
            }
        }
    },
    mounted() {
        var self = this;
        self.compile();
    },
    destroyed(){
        var self = this;
    }
};