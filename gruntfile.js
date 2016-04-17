module.exports = function(grunt) {
  grunt.initConfig({
    watch: {
      all: {
        options: { livereload: true },
        files: ['~/node_modules/**'],
        tasks: []
      },
      sass: {
        files: ['**/*.scss'],
        tasks: ['sass']
      }
    },
    express: {
      dev: {
        server: __dirname + 'app.js'
      },
      static: {
        options: {
          port: 3000,
          hostname: 'localhost',
          bases: [
            'public/',
            'public/styles'
          ],
          livereload: true
        }
      }
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
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-sass');
  grunt.registerTask('default', 'server');
  grunt.registerTask('server', ['express:dev', 'watch']);
};
