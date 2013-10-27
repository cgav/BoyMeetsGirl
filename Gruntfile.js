/*

    - TO FIX SOURCEMAP PROBLEM, see https://github.com/gruntjs/grunt-contrib-coffee/pull/78/files
    AND EDIT tasks/coffee.js ACCORDINGLY.

 */
/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    dist: "dist",

    // ------------------------------------------
    coffee: {
      dev: {
        options: {
          bare: true
        },
        expand: true,
        cwd: '.',
        src: ['app/**/*.coffee', 'server.coffee'],
        ext: '.js'
      }
    },

    // ------------------------------------------
    notify: {
      watch: {
        options: {
          title: 'BoyMeetsGirl',  // optional
          message: 'Build succeeded', //required
        }
      }
    },

    // ------------------------------------------
    watch: {
      coffee: {
        files: ["app/**/*.coffee", "server.coffee"],
        tasks: ["coffee"],
        optinos: {
          nospawn: true
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-strip');

  // Default tasks.
  grunt.registerTask('default', ['coffee']);

};
