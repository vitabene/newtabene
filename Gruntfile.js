module.exports = function(grunt) {
  grunt.initConfig({
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
          'css/newtab.css': 'css/newtab.scss'
        }
      }
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
  grunt.registerTask('default', ['browserSync', 'watch']);
};
