module.exports = function(grunt) {

  grunt.initConfig({
    browserify: {
      '../dist/app.js': ['../js/generateSong.js']
      },
    sass: {
      '../dist/main.css': ['../sass/mainSass.scss']
    },
    jshint: {
      options: {
        predef: [ "document", "console" ],
        esnext: true,
        globalstrict: true,
        globals: {"CarLot": true},
        browserify: true
      },
      files: ['../carLot/**/*.js']
    },
    watch: {
      javascripts: {
        files: ['../carLot/**/*.js'],
        tasks: ['jshint', 'browserify']
      }
    }
});

require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
grunt.registerTask('default', ['browserify', 'sass', 'jshint', 'watch']);
}
