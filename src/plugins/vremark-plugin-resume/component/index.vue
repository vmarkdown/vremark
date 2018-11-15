<template>
    <div class="vremark-plugin-resume">
        <component :is="theme" :resume="resume"></component>
    </div>
</template>

<script>

    export default {
        name: 'vremark-plugin-resume',
        props: {
            'code': {
                type: String,
                required: true
            },
            'attrs': {
                type: Object
            }
        },
        computed:{
            resume() {
                return this.getOptions();
            },
            theme() {
                return 'default';
            }
        },
        methods:{
            getOptions() {
                var self = this;
                var options = {};
                try {
                    options = JSON.parse(self.code);
                } catch (e) {
                    console.error(e);
                }
                return options;
            },
            compile() {

            }
        },

        components:{
            'default': require('../themes/default.vue').default,
            // 'flat': require('../themes/flat.vue').default
        }
    }
</script>

<style lang="scss">

    .vremark-plugin-resume {

    }

    .vremark-plugin-resume-theme{

    }

</style>