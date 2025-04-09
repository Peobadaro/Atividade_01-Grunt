module.exports = function(grunt) {
    grunt.initConfig({
        // CSS minification
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: ['*.css'],
                    dest: 'dist/css',
                    ext: '.min.css'
                }]
            }
        },

        // JavaScript minification
        uglify: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'src/js',
                    src: ['*.js'],
                    dest: 'dist/js',
                    ext: '.min.js'
                }]
            }
        },

        // HTML minification
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            }
        },

        // Watch for changes
        watch: {
            css: {
                files: ['src/css/*.css'],
                tasks: ['cssmin']
            },
            js: {
                files: ['src/js/*.js'],
                tasks: ['uglify']
            },
            html: {
                files: ['src/*.html'],
                tasks: ['htmlmin']
            }
        },

        // Clean dist directory
        clean: {
            dist: ['dist']
        },

        // Copy assets
        copy: {
            main: {
                expand: true,
                cwd: 'src',
                src: ['images/**', 'fonts/**'],
                dest: 'dist'
            }
        }
    });

    // Load Grunt plugins
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Register tasks
    grunt.registerTask('default', ['clean', 'cssmin', 'uglify', 'htmlmin', 'copy']);
    grunt.registerTask('dev', ['default', 'watch']);
};