const gulp = require('gulp');
const gutil = require('gulp-util');
const size = require('gulp-size');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const babel = require('gulp-babel');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfigClientProd = require('./webpack.config.client.prod');
const webpackConfigClientDev = require('./webpack.config.client.dev');
const webpackConfigServer = require('./webpack.config.server');
const babelConfigNode = require('./babel.config').node;
const fs = require('fs');
const path = require('path');
const pretty = require('prettysize');
const config = require('./config');
const nodemon = require('nodemon');
const spawn = require('cross-spawn');

gulp.task('build:server', cb => {
  webpack(webpackConfigServer, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      cb();
    }

    const info = stats.toJson();
    if (stats.hasErrors()) {
      console.error(info.errors);
    }
    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }
    const files = fs.readdirSync(config.serverOutputPath, 'utf8');
    let totalSize = 0;
    files.forEach(file => {
      const s = fs.statSync(path.resolve(config.serverOutputPath, file)).size;
      totalSize += s;
      gutil.log(`${gutil.colors.cyan(file)} ${gutil.colors.magenta(pretty(s))}`);
    });
    gutil.log(`${gutil.colors.cyan('Client JS')} ${gutil.colors.green('all files')} ${gutil.colors.magenta(pretty(totalSize))}`)

    cb();
  });
});

gulp.task('build:client', cb => {
  webpack(webpackConfigClientProd, (err, stats) => {
    if (err) {
      console.error(err.stack || err);
      if (err.details) {
        console.error(err.details);
      }
      cb();
    }

    const info = stats.toJson();
    if (stats.hasErrors()) {
      console.error(info.errors);
    }
    if (stats.hasWarnings()) {
      console.warn(info.warnings);
    }
    const files = fs.readdirSync(config.clientOutputPath, 'utf8');
    let totalSize = 0;
    files.forEach(file => {
      const s = fs.statSync(path.resolve(config.clientOutputPath, file)).size;
      totalSize += s;
      gutil.log(`${gutil.colors.cyan(file)} ${gutil.colors.magenta(pretty(s))}`);
    });
    gutil.log(`${gutil.colors.cyan('Client JS')} ${gutil.colors.green('all files')} ${gutil.colors.magenta(pretty(totalSize))}`)

    cb();
  });
});

gulp.task('watch:client', cb => {
  const child = spawn(`${__dirname}/node_modules/.bin/webpack-dev-server`, { stdio: [, 'pipe']});
  child.stdout.on('data', chunk => {
    const str = chunk.toString();
    if (str.match(/^webpack: Compiled successfully/)) {
      gutil.log('Webpack compilation successful');
      const files = fs.readdirSync(config.clientOutputPath, 'utf8');
      let totalSize = 0;
      files.forEach(file => {
        const s = fs.statSync(path.resolve(config.clientOutputPath, file)).size;
        totalSize += s;
        // gutil.log(`${gutil.colors.cyan(file)} ${gutil.colors.magenta(pretty(size))}`)
      });
      gutil.log(`${gutil.colors.cyan('Client JS')} ${gutil.colors.green('all files')} ${gutil.colors.magenta(pretty(totalSize))}`);
    }
    if (str.match(/^webpack: Compiling\.\.\./)) {
      gutil.log('Recompiling...');
    }
  });

  cb();
});

gulp.task('watch:server', ['build:server'], () => {
  gulp.watch('./src/**/*.js', ['build:server']);
});

gulp.task('run', ['watch:client', 'watch:server'], () => {
  nodemon({
    script: 'build/app.js',
    watch: 'build',
    args: ['--trace-warnings'],
  });
});
