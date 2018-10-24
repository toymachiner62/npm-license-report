#!/usr/bin/env node
'use strict'
var npm = require('npm')
var npmView = require('npm/lib/view')
var _ = require('lodash')
var pkg = require('./package.json')

function mapDeps (deps, usage) {
  _.forEach(deps, function (version, dep) {
    npmView([dep], true, function (err, data) {
      if (err) {
        console.log('err')
        return
      }
      var v = _.first(_.keys(data))
      var d = _.first(_.values(data))
      var author = d.author ? d.author.name : undefined
      var row = [
        dep + '/' + v,
        d.license || 'UNKNOWN',
        author || 'UNKNOWN',
        d.homepage,
        pkg.name,
        '',
        usage
      ]

      console.log(row.join('\t'))
    })
  })
}

npm.load('./package.json', function () {
  mapDeps(pkg.devDependencies, 'Dev/Test')
  mapDeps(pkg.dependencies, 'product')
})
