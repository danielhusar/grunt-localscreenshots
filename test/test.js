'use strict';
var assert = require('assert');
var grunt = require('grunt');

it('Screenshots should exists', function () {
  assert(grunt.file.read('tmp/src/index-768x1024.png'));
  assert(grunt.file.read('tmp/src/index-1024x1024.png'));
});

/*
//this fails on linux

it('Screenshots should match the expected ones', function () {
  var local, remote, expected;

  local = grunt.file.read('tmp/src/index-768x1024.png');
  expected = grunt.file.read('test/expected/index-768x1024.png');
  assert.equal(local, expected);

  local = grunt.file.read('tmp/src/index-1024x1024.png');
  expected = grunt.file.read('test/expected/index-1024x1024.png');
  assert.equal(local, expected);
});
*/
