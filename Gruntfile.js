'use strict';
module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-jsxhint');
  	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-browserify');
  	grunt.loadNpmTasks('grunt-sass');

	grunt.initConfig({
		jshint: {
			dev: {
				options: {
					jshintrc: '.jshintrc'
				},
				src: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js', 'index.js', 'app/**/*.js', 'app/**/*.jsx']
			}
		},

		copy: {
			build: {
				expand: true,
				cwd: 'app/',
				src:['**/*.html', './img/**/*.*'],
				dest: 'build/',
				flatten: false,
				filter: 'isFile'
			}
		},

		clean: {
			build: {
				src: ['build']
			}
		},

		browserify: {
			dev: {
				src: ['app/**/*.js', 'app/**/*.jsx'],
				dest: 'build/bundle.js'
			},
			options: {
				transform: ['reactify']
			}
		},

		simplemocha: {
			all: {
				src: ['test/**/*.js']
			}
		},

    sass: {
      dist: {
        options: {
          includePaths: require('node-neat').includePaths
        },
        files: {
          './build/css/main.css': './app/sass/main.scss'
        }
      }
    },

    watch: {
      css: {
        files: './app/sass/**/*.scss',
        tasks: ['sass']
      },
      dev:{
        files: ['./app/js/**/*.js']
      }
    }
	});

	grunt.registerTask('build', ['jshint', 'clean', 'copy', 'browserify', 'sass']);
	grunt.registerTask('test', ['jshint:dev', 'simplemocha:all']);
	grunt.registerTask('default', ['test']);
};