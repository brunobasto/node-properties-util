'use strict';

var gulp = require('gulp');
var karma = require('karma').server;
var merge = require('merge');
var openFile = require('open');
var path = require('path');

module.exports = function(config) {
	gulp.task(
		'test:unit',
		[],
		function(done) {
			runKarma(config, {}, done);
		}
	);

	gulp.task(
		'test:unit:coverage',
		[],
		function(done) {
			runKarma(
				config,
				{
					configFile: path.resolve(config.karmaCoverageFile),
					coverage: true
				},
				function() {
					done();
				}
			);
		}
	);

	gulp.task(
		'test:unit:coverage:open',
		['test:unit:coverage'],
		function(done) {
			openFile(path.resolve(config.karmaCoverageOutput + '/lcov/lcov-report/index.html'));
			done();
		}
	);

	gulp.task(
		'test:unit:browsers',
		[],
		function(done) {
			runKarma(
				config,
				{
					browsers: ['Chrome', 'Firefox', 'Safari']
				},
				done
			);
		}
	);

	gulp.task(
		'test:unit:watch',
		[],
		function(done) {
			runKarma(
				config,
				{
					singleRun: false
				},
				done
			);
		}
	);
};

function runKarma(config, karmaConfig, done) {
	karmaConfig = merge(
		{
			configFile: path.resolve(config.karmaFile),
			singleRun: true
		},
		karmaConfig
	);

	karma.start(
		karmaConfig,
		function(exitCode) {
			if (exitCode) {
				console.log('Tests failed.');
			}

			done();
		}
	);
}