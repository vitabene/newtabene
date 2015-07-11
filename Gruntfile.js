module.exports = function(grunt) {

  grunt.initConfig({
    // uglify: {
    //   options: {
    //     mangle: true,
    //     compress: true,
    //     sourceMap: 'menu.map',
    //     banner: '/* Vitezslav Benes 2015*/\n'
    //   },
    //   target: {
    //     src: 'js/menu.js',
    //     dest: 'js/menu.min.js'
    //   }
    // },
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
    }
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

  grunt.registerTask('default', ['browserSync','sass']);
}
