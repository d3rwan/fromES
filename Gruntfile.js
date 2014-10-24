module.exports = function(grunt) {
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        exec: {
            mkdir: {
                command: 'mkdir build'
            },
            rmdir: {
                command: 'rmdir /S /Q build'
            }
        },

        copy: {
            build: {
                files: [
                    {
                        expand: true,
                        src: ['bin/*', 'src/*', 'src/**', 'node_modules/**', 'services/**', '*.js', '*.json'],
                        dest: 'build'
                    },
                    {
                        src: ['config/production.json'],
                        dest: 'build/config/config.json'
                    }
                ]
            }
        },

        compress: {
            build: {
                options: {
                    archive: 'dist/<%= pkg.name %>-<%= pkg.version %>.zip'
                },
                files: [
                    {
                        expand: true,
                        cwd: 'build/',
                        src: ['**'],
                        dest: '<%= pkg.name %>-<%= pkg.version %>'
                    }
                ]
            }
        },

        clean: {
            build: ['build/**/**/*.*', 'build/**/*.*', 'build/*.*']
        }
    });

    grunt.loadNpmTasks('grunt-exec');
    grunt.loadNpmTasks('grunt-contrib-compress');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', ['exec:mkdir', 'copy:build', 'compress:build', 'exec:rmdir']);

};