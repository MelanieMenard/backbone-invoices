'use strict';

module.exports = function (grunt) {
  // Load all tasks
  require('load-grunt-tasks')(grunt);
  // Show elapsed time
  require('time-grunt')(grunt);

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: {
      // Configurable paths
      appRoot: 'app',
      appNamespace: 'InvoiceApp',
    },

    // Compile the scss source into a single css file.
    sass: {
      development: {
        files: {
          '<%= config.appRoot %>/style/css/main.css': '<%= config.appRoot %>/style/scss/main.scss'
        },
        options: {
          style: 'expanded',
            lineNumbers: true,
            includePaths: require('bourbon').includePaths.concat(require('bourbon-neat').includePaths)
        }
      },
      dist: {
        files: {
          '<%= config.appRoot %>/style/css/main.css': '<%= config.appRoot %>/style/scss/main.scss'
        },
        options: {
          style: 'compressed',
          includePaths: require('bourbon').includePaths.concat(require('bourbon-neat').includePaths)
        }
      }
    },
    handlebars: {
      options: {
        namespace: '<%= config.appNamespace %>.Templates',
        processName: function(filePath) {
          return filePath.replace(/^app.*\/templates\//, '').replace(/\.hbs$/, '');
        }
      },
      all: {
        files: {
          '<%= config.appRoot %>/js/templates/templates.js': ['<%= config.appRoot %>/**/*.hbs']
        }
      }
    }

  });

  grunt.registerTask('build', 'Build for development', function (target) {
    grunt.task.run([
      'sass:development',
      'handlebars'
    ]);
  });

  grunt.registerTask('compile', 'Compile for production', function (target) {
    grunt.task.run([
      'sass:dist',
      'handlebars'
    ]);
  });

};
