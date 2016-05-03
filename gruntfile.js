module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      all: {
        options: { livereload: true },
        files: ['!/node_modules/**']
      },
      sass: {
        files: ['**/*.scss'],
        tasks: ['sass']
      }
      // browserify goes here?
    },
    express: {
      options: {
        hostname: 'localhost'
      },
      default: {
        options: {
          script: __dirname + '/app.js',
          node_env: 'DEV'
        }
      }
      // static: {
      //   options: {
      //     port: 3000,
      //     hostname: 'localhost',
      //     bases: [
      //       'public/',
      //       'public/styles'
      //     ]
      //   }
      // }
    },
    sass: {
      dist: {
        files: { 'public/styles/index.css': 'assets/sass/index.scss' },
        options: {
          sourceMap: true,
          verbose: true
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-sass');
  grunt.registerTask('default', 'server');
  grunt.registerTask('server', ['express:default', 'watch']);
};
