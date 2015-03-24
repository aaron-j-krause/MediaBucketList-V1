module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-simple-mocha');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-browserify');

	grunt.initConfig({
		jshint: {
			dev: {
				options: {
					node: true,
					globals: {
						describe: true,
						it: true,
						before: true,
						after: true
					}
				},
				src: ['Gruntfile.js', 'lib/**/*.js', 'test/**/*.js', 'index.js']
			}
		},

		copy: {
			build: {
				expand: true,
				cwd: 'app/',
				src:['**/*.html', '**/*.css'],
				dest: 'build/',
				flatten: false,
				filter: 'isFile'
			}
		},

		clean: {
			build: {
				src: ['/build']
			}
		},

		browserify: {
			dev: {
				src: ['app/**/*.js'],
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
		}
	});

	grunt.registerTask('build', ['clean', 'copy', 'browserify']);
	grunt.registerTask('test', ['jshint:dev', 'simplemocha:all']);
	grunt.registerTask('default', ['test']);
};