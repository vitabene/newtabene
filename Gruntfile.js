module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      options: {
        mangle: true,
        compress: true,
        sourceMap: 'simple.map',
        banner: '/* Vitezslav Benes 2015*/\n'
      },
      target: {
        src: 'js/simple.js',
        dest: 'js/simple.min.js'
      }
    },
    watch: {
      options: {
        livereload: true,
      },
      all: {
        files: ['js/*.js', '*.html', 'css/*.scss'],
        tasks: ['default'],
        options: {
          spawn: false,
        }
      }
    },
    sass: {
      dist: {
        options: {
          style: 'compressed'
        },
        files: {
          'css/style.css': 'css/style.scss'
        }
      }
    },
    concat: {
			options: {
				separator: '',
			},
			dist: {
				src: ['js/Task.js', 'js/Note.js', 'js/Notif.js', 'js/View.js', 'js/Token.js', 'js/ViewStack.js', 'js/App.js', 'js/core.js'],
				dest: 'js/simple.js',
			},
		},
    browserSync: {
			dev: {
				bsFiles: {
					src : [
					'css/*.css',
					'tmpl/*.html'
					]
				},
				options: {
					watchTask: true,
          proxy: "localhost"
				}
			}
		}
  });
  require('load-grunt-tasks')(grunt);
  grunt.registerTask('default', ['sass', 'concat', 'uglify']);
}
