const timer = Vue.extend({
    name: 'timer',
    data: function () {
        return {
            time: ''
        }
    },
    template: '<div>{{time}}</div>',
    mounted () {
        const self = this;
        self.interval = setInterval(() => {
            this.time = new Date;
        }, 1000);
    },
    destroyed() {
        const self = this;
        self.interval && clearInterval(self.interval);
    }
});

Vue.component('timer', timer);