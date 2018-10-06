const processor = require('./processor');

const preview = new Vue({
    el: '#app',
    data() {
        return {
            md: ''
        }
    },
    methods: {
        setValue(md) {
            this.md = md;
        }
    },
    render(h) {
        const file = processor().data('h', h).processSync(this.md);
        return file.contents;
    }
});

module.exports = preview;