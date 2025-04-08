module.exports = function(grunt) {
    // Project configuration
    grunt.initConfig({
        // LESS compilation
        less: {
            development: {
                options: {
                    paths: ['src/less'],
                    sourceMap: true,
                    sourceMapFilename: 'dist/css/styles.css.map'
                },
                files: {
                    'dist/css/styles.css': 'src/less/styles.less'
                }
            },
            production: {
                options: {
                    paths: ['src/less'],
                    compress: true
                },
                files: {
                    'dist/css/styles.min.css': 'src/less/styles.less'
                }
            }
        },

        // CSS minification
        cssmin: {
            target: {
                files: {
                    'dist/css/styles.min.css': ['dist/css/styles.css']
                }
            }
        },

        // HTML minification
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: {
                    'dist/index.html': 'index.html'
                }
            }
        },

        // HTML replacement
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: /styles\.css/g,
                            replacement: 'styles.min.css'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['dist/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },

        // Connect server configuration
        connect: {
            server: {
                options: {
                    port: 9000,
                    base: '.',
                    livereload: true,
                    open: true
                }
            }
        },

        // Watch for changes
        watch: {
            options: {
                // Enable livereload for automatic browser refresh
                livereload: true,
                // Don't spawn new processes for better performance
                spawn: false,
                // Show notifications for file changes
                interrupt: true
            },
            styles: {
                files: ['src/less/**/*.less'],
                tasks: ['less:development'],
                options: {
                    // Show which file changed
                    event: ['changed', 'added', 'deleted']
                }
            },
            // Watch for HTML changes
            html: {
                files: ['**/*.html'],
                tasks: ['htmlmin'],
                options: {
                    livereload: true
                }
            },
            // Watch for JavaScript changes
            scripts: {
                files: ['src/js/**/*.js'],
                tasks: [],
                options: {
                    livereload: true
                }
            }
        },

        // Clean task
        clean: {
            css: ['dist/css/*'],
            html: ['dist/*.html']
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-replace');

    // Register tasks
    grunt.registerTask('default', ['clean', 'less:development', 'connect', 'watch']);
    grunt.registerTask('build', ['clean', 'less:production', 'cssmin', 'htmlmin', 'replace']);
}; 