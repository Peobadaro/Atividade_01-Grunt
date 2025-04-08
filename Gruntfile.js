module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            development: {
                options: {
                    paths: ['src/styles']
                },
                files: {
                    'public/css/main.css': 'src/styles/main.less'
                }
            },
            production: {
                options: {
                    paths: ['src/styles'],
                    compress: true
                },
                files: {
                    'public/css/main.min.css': 'src/styles/main.less'
                }
            }
        },
        uglify: {
            target: {
                files: {
                    'public/js/main.min.js': ['src/script/main.js']
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'public/index.html': 'src/index.html'
                }
            }
        },
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'css/main.css',
                            replacement: 'css/main.min.css'
                        },
                        {
                            match: 'js/main.js',
                            replacement: 'js/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['public/index.html'],
                        dest: 'public/'
                    }
                ]
            }
        },
        clean: {
            public: ['public/**/*']
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:development']
            },
            js: {
                files: ['src/script/**/*.js'],
                tasks: ['uglify']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['htmlmin']
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['clean', 'less:development', 'uglify', 'htmlmin', 'replace']);
    grunt.registerTask('build', ['clean', 'less:production', 'uglify', 'htmlmin', 'replace']);
}