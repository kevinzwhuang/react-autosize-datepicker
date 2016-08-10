'use strict'

var _ = require('lodash')
var webpack = require('webpack')

var mergeWebpackConfig = function (config) {
  // Load webpackConfig only when using `grunt:webpack`
  // load of grunt tasks is faster
  var webpackConfig = require('./webpack.config')
  return _.merge({}, webpackConfig, config, function (a, b) {
    if (_.isArray(a)) {
      return a.concat(b)
    }
  })
}

module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    sass: {
      min: {
        files: {
          'dist/react-datepicker.css': 'src/stylesheets/datepicker.scss'
        },
        options: {
          sourcemap: 'none',
          style: 'expanded'
        }
      },
      unmin: {
        files: {
          'dist/react-datepicker.min.css': 'src/stylesheets/datepicker.scss'
        },
        options: {
          sourcemap: 'none',
          style: 'compressed'
        }
      }
    },

    watch: {
      eslint: {
        files: ['{src,test,docs-site/src}/**/*.{js,jsx}', '*.js'],
        tasks: ['eslint']
      },

      css: {
        files: '**/*.scss',
        tasks: ['sass']
      },

      webpack: {
        files: ['src/**/*.js', 'src/**/*.jsx'],
        tasks: ['webpack']
      }
    },

    // standalone build for ./dist
    webpack: {
      unmin: mergeWebpackConfig({
        output: {
          filename: 'react-autosize-datepicker.js'
        }
      }),
      min: mergeWebpackConfig({
        output: {
          filename: 'react-autosize-datepicker.min.js'
        },
        plugins: [
          new webpack.optimize.UglifyJsPlugin({
            compressor: {
              warnings: false
            }
          })
        ]
      }),
    },

    // source build for ./lib
    babel: {
      lib: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.js', '**/*.jsx'],
          dest: 'lib/',
          ext: '.js'
        }]
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-sass')
  grunt.loadNpmTasks('grunt-babel')
  grunt.loadNpmTasks('grunt-webpack')

  grunt.registerTask('build', ['babel', 'webpack', 'sass'])
}
