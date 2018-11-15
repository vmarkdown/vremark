<template>
    <div class="vremark-plugin-resume-theme vremark-plugin-resume-theme-default">
        <h1>{{resume.basics.name}}</h1>
        <h2>{{resume.basics.label}}</h2>

        <section class="basics" v-if="resume.basics">
            <div class="contact">
                <div class="website" v-if="resume.basics.website">
                    <strong>Website</strong>
                    {{resume.basics.website}}
                </div>
                <div class="email" v-if="resume.basics.email">
                    <strong>Email</strong>
                    {{resume.basics.email}}
                </div>
                <div class="phone" v-if="resume.basics.phone">
                    <strong>Phone</strong>
                    {{resume.basics.phone}}
                </div>
            </div>
            <div class="summary" v-if="resume.basics.summary">
                <p>{{resume.basics.summary}}</p>
            </div>

            <template v-if="resume.basics.location">
                <h3>Location</h3>
                <section id="location">
                    <div class="address" v-if="resume.basics.location.address">
                        <strong>Address</strong>
                        {{resume.basics.location.address}}
                    </div>
                    <div class="postalCode" v-if="resume.basics.location.postalCode">
                        <strong>Postal code</strong>
                        {{resume.basics.location.postalCode}}
                    </div>
                    <div class="city" v-if="resume.basics.location.city">
                        <strong>City</strong>
                        {{resume.basics.location.city}}
                    </div>
                    <div class="countryCode" v-if="resume.basics.location.countryCode">
                        <strong>Country code</strong>
                        {{resume.basics.location.countryCode}}
                    </div>
                    <div class="region"  v-if="resume.basics.location.region">
                        <strong>Region</strong>
                        {{resume.basics.location.region}}
                    </div>
                </section>
            </template>

            <template v-if="resume.basics.profiles">
                <h3>Profiles</h3>
                <section id="profiles">
                    <div class="item" v-for="profile in resume.basics.profiles">
                        <strong class="network" v-if="profile.network">
                            {{profile.network}}
                        </strong>
                        <div class="username" v-if="profile.username">
                            {{profile.username}}
                        </div>
                        <div class="url" v-if="profile.url">
                            <a :href="profile.url">Link</a>
                        </div>
                    </div>
                </section>
            </template>
        </section>

        <section class="work"  v-if="resume.work">
            <h2>Work</h2>
            <div class="item" v-for="work in resume.work">
                <h3 class="name" v-if="work.company">
                    {{work.company}}
                </h3>
                <div class="date">
                    <span class="startDate" v-if="work.startDate">
					{{work.startDate}}
				    </span>
                    <span class="endDate" v-if="work.endDate">
					- {{work.endDate}}
				    </span>
                    <span class="endDate" v-else>
					- Present
				    </span>
                </div>


                <div class="position" v-if="work.position">
                    {{work.position}}
                </div>
                <div class="website" v-if="work.website">
                    <a :href="work.website">{{work.website}}</a>
                </div>
                <div class="summary" v-if="work.summary">
                    <p>{{work.summary}}</p>
                </div>
                <ul class="highlights" v-if="work.highlights">
                    <li v-for="text in work.highlights">{{text}}</li>
                </ul>
            </div>
        </section>

        <section class="volunteer"  v-if="resume.volunteer">
            <h2>Volunteer</h2>

            <div class="item" v-for="item in resume.volunteer">
                <h3 class="company" v-if="item.organization">
                    {{item.organization}}
                </h3>
                <div class="date">

                    <span class="startDate" v-if="item.startDate">
					{{item.startDate}}
				    </span>

                    <span class="endDate" v-if="item.endDate">
					- {{item.endDate}}
				    </span>
                    <span class="endDate" v-else>
					- Present
				    </span>

                </div>

                <div class="position" v-if="item.position">
                    {{item.position}}
                </div>

                <div class="website" v-if="item.website">
                    <a :href="item.website">{{item.website}}</a>
                </div>

                <div class="summary" v-if="item.summary">
                    <p>{{item.summary}}</p>
                </div>

                <ul class="highlights" v-if="item.highlights">
                    <li v-for="text in item.highlights">{{text}}</li>
                </ul>

            </div>


        </section>


        <section class="education"  v-if="resume.education">
            <h2>Education</h2>
            <div class="item" v-for="item in resume.education">
                <div class="date">

                    <span class="startDate" v-if="item.startDate">
					{{item.startDate}}
				    </span>

                    <span class="endDate" v-if="item.endDate">
					- {{item.endDate}}
				    </span>
                    <span class="endDate" v-else>
					- Present
				    </span>

                </div>


                <div class="institution" v-if="item.institution">
                    {{item.institution}}
                </div>
                <div class="area" v-if="item.area">
                    {{item.area}}
                </div>
                <div class="studyType" v-if="item.studyType">
                    {{item.studyType}}
                </div>
                <div class="gpa" v-if="item.gpa">
                    GPA: {{item.gpa}}
                </div>

                <ul class="courses" v-if="item.courses">
                    <li v-for="text in item.courses">{{text}}</li>
                </ul>
            </div>
        </section>

        <section class="awards"  v-if="resume.awards">
            <h2>Awards</h2>
            <div class="item" v-for="item in resume.awards">
                <div class="title" v-if="item.title">
                    {{item.title}}
                </div>
                <div class="date" v-if="item.date">
                    {{item.date}}
                </div>
                <div class="awarder" v-if="item.awarder">
                    {{item.awarder}}
                </div>
                <div class="summary" v-if="item.summary">
                    <p>{{item.summary}}</p>
                </div>
            </div>
        </section>

        <section class="publications"  v-if="resume.publications">
            <h2>Publications</h2>
            <div class="item" v-for="item in resume.publications">
                <div class="name" v-if="item.name">
                    {{item.name}}
                </div>
                <div class="publisher" v-if="item.publisher">
                    {{item.publisher}}
                </div>
                <div class="releaseDate" v-if="item.releaseDate">
                    {{item.releaseDate}}
                </div>
                <div class="website" v-if="item.website">
                    <a :href="item.website">Link</a>
                </div>
                <div class="summary" v-if="item.summary">
                    <p>{{item.summary}}</p>
                </div>
            </div>
        </section>

        <section class="skills"  v-if="resume.skills">
            <h2>Skills</h2>
            <div class="item" v-for="item in resume.skills">
                <div class="name"  v-if="item.name">
                    {{item.name}}
                </div>
                <div class="level" v-if="item.level">
                    <em>{{item.level}}</em>
                </div>

                <ul class="keywords" v-if="item.keywords">
                    <li v-for="text in item.keywords">{{text}}</li>
                </ul>

            </div>
        </section>


        <section class="languages" v-if="resume.languages">
            <h2>Languages</h2>
            <div class="item" v-for="item in resume.languages">
                <div class="language" v-if="item.language">
                    {{item.language}}
                </div>
                <div class="fluency" v-if="item.fluency">
                    <em>{{item.fluency}}</em>
                </div>
            </div>
        </section>


        <section class="interests" v-if="resume.interests">
            <h2>Interests</h2>
            <div class="item" v-for="item in resume.interests">
                <div class="name" v-if="item.name">
                    {{item.name}}
                </div>

                <ul class="keywords" v-if="item.keywords">
                    <li v-for="text in item.keywords">{{text}}</li>
                </ul>

            </div>
        </section>

        <section class="references" v-if="resume.references">
            <h2>References</h2>
            <div class="item" v-for="item in resume.references">
                <blockquote class="reference" v-if="item.reference">
                    {{item.reference}}
                </blockquote>
                <div class="name" v-if="item.name">
                    — {{item.name}}
                </div>
            </div>
        </section>




    </div>
</template>

<script>

    export default {
        name: 'vremark-plugin-resume-theme-default',
        props: {
            'resume': {
                type: Object,
                required: true
            }
        }
    }

</script>

<style lang="scss">

    .vremark-plugin-resume-theme-default {
        font: 15px Arial, Helvetica, sans-serif;
        line-height: 1.4;
        /*margin: 0 auto;*/
        /*max-width: 480px;*/
        /*padding: 0 20px;*/
        margin-bottom: 1.1em;

        h1, h2, h3, h4, h5, h6{
            border-bottom: none;
        }

        em {
            color: #999;
        }
        p {
            line-height: 1.4;
            margin-top: 16px;
            margin-bottom: 16px;
        }
        ul {
            margin-bottom: 0;
            margin-top: 1em;
        }
        section {
            margin-bottom: 2em;
        }
        blockquote {
            margin: 0;
            margin-bottom: 1em;
            border: none;
            color: inherit;
            padding: inherit;
        }
        .item {
            margin-bottom: 1em;
        }

        .basics {
            margin-bottom: -10px;
            h3 {
                margin-top: 1.5em;
            }
        }

        .basics .contact strong,
        .location strong {
            clear: both;
            float: left;
            line-height: 1.3;
            width: 120px;
        }

        .profiles, .skills {
            overflow: hidden;
            .item {
                float: left;
                width: 50%;
            }
        }

    }

</style>