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

        // Watch for changes
        watch: {
            styles: {
                files: ['src/less/**/*.less'],
                tasks: ['less:development'],
                options: {
                    spawn: false
                }
            }
        },

        // Clean task
        clean: {
            css: ['dist/css/*']
        }
    });

    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Register tasks
    grunt.registerTask('default', ['clean', 'less:development', 'watch']);
    grunt.registerTask('build', ['clean', 'less:production', 'cssmin']);
}; 