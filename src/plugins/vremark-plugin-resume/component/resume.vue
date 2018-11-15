<template>
    <div id="resume">
        <h1>{{resume.basics.name}}</h1>
        <h2>{{resume.basics.label}}</h2>
        <section id="basics" v-if="resume.basics">
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


        <section id="work" v-if="resume.work">
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


    </div>
</template>

<script>

    export default {
        name: 'vremark-plugin-resume',
        data () {
            return {
                msg: 'Hello world!',
                resume: {
                    "basics": {
                        "name": "Richard Hendriks",
                        "label": "Programmer",
                        "picture": "",
                        "email": "richard.hendriks@gmail.com",
                        "phone": "(912) 555-4321",
                        "website": "http://richardhendricks.com",
                        "summary": "Richard hails from Tulsa. He has earned degrees from the University of Oklahoma and Stanford. (Go Sooners and Cardinals!) Before starting Pied Piper, he worked for Hooli as a part time software developer. While his work focuses on applied information theory, mostly optimizing lossless compression schema of both the length-limited and adaptive variants, his non-work interests range widely, everything from quantum computing to chaos theory. He could tell you about it, but THAT would NOT be a “length-limited” conversation!",
                        "location": {
                            "address": "2712 Broadway St",
                            "postalCode": "CA 94115",
                            "city": "San Francisco",
                            "countryCode": "US",
                            "region": "California"
                        },
                        "profiles": [
                            {
                                "network": "Twitter",
                                "username": "neutralthoughts",
                                "url": ""
                            },
                            {
                                "network": "SoundCloud",
                                "username": "dandymusicnl",
                                "url": "https://soundcloud.com/dandymusicnl"
                            }
                        ]
                    },
                    "work": [
                        {
                            "company": "Pied Piper",
                            "position": "CEO/President",
                            "website": "http://piedpiper.com",
                            "startDate": "2013-12-01",
                            "endDate": "2014-12-01",
                            "summary": "Pied Piper is a multi-platform technology based on a proprietary universal compression algorithm that has consistently fielded high Weisman Scores™ that are not merely competitive, but approach the theoretical limit of lossless compression.",
                            "highlights": [
                                "Build an algorithm for artist to detect if their music was violating copy right infringement laws",
                                "Successfully won Techcrunch Disrupt",
                                "Optimized an algorithm that holds the current world record for Weisman Scores"
                            ]
                        }
                    ],
                    "volunteer": [
                        {
                            "organization": "CoderDojo",
                            "position": "Teacher",
                            "website": "http://coderdojo.com/",
                            "startDate": "2012-01-01",
                            "endDate": "2013-01-01",
                            "summary": "Global movement of free coding clubs for young people.",
                            "highlights": [
                                "Awarded 'Teacher of the Month'"
                            ]
                        }
                    ],
                    "education": [
                        {
                            "institution": "University of Oklahoma",
                            "area": "Information Technology",
                            "studyType": "Bachelor",
                            "startDate": "2011-06-01",
                            "endDate": "2014-01-01",
                            "gpa": "4.0",
                            "courses": [
                                "DB1101 - Basic SQL",
                                "CS2011 - Java Introduction"
                            ]
                        }
                    ],
                    "awards": [
                        {
                            "title": "Digital Compression Pioneer Award",
                            "date": "2014-11-01",
                            "awarder": "Techcrunch",
                            "summary": "There is no spoon."
                        }
                    ],
                    "publications": [
                        {
                            "name": "Video compression for 3d media",
                            "publisher": "Hooli",
                            "releaseDate": "2014-10-01",
                            "website": "http://en.wikipedia.org/wiki/Silicon_Valley_(TV_series)",
                            "summary": "Innovative middle-out compression algorithm that changes the way we store data."
                        }
                    ],
                    "skills": [
                        {
                            "name": "Web Development",
                            "level": "Master",
                            "keywords": [
                                "HTML",
                                "CSS",
                                "Javascript"
                            ]
                        },
                        {
                            "name": "Compression",
                            "level": "Master",
                            "keywords": [
                                "Mpeg",
                                "MP4",
                                "GIF"
                            ]
                        }
                    ],
                    "languages": [
                        {
                            "language": "English",
                            "fluency": "Native speaker"
                        }
                    ],
                    "interests": [
                        {
                            "name": "Wildlife",
                            "keywords": [
                                "Ferrets",
                                "Unicorns"
                            ]
                        }
                    ],
                    "references": [
                        {
                            "name": "Erlich Bachman",
                            "reference": "It is my pleasure to recommend Richard, his performance working as a consultant for Main St. Company proved that he will be a valuable addition to any company."
                        }
                    ]
                }
            }
        }
    }
</script>

<style lang="scss">

    #resume {
        margin: 0 auto;
        max-width: 480px;
        padding: 0 20px;

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
        }
        section {
            margin-bottom: 2em;
        }
        blockquote {
            margin: 0;
            margin-bottom: 1em;
        }
        .item {
            margin-bottom: 1em;
        }

        #basics {
            margin-bottom: -10px;
        }
        #basics h3 {
            margin-top: 1.5em;
        }
        #basics .contact strong,
        #location strong {
            clear: both;
            float: left;
            line-height: 1.3;
            width: 120px;
        }
        #profiles,
        #skills {
            overflow: hidden;
        }
        #profiles .item,
        #skills .item {
            float: left;
            width: 50%;
        }


    }


</style>