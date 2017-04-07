'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var glob = require('glob');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = Generator.extend({
  initializing: function() {
    this.props = {};
  },
  
  prompting: {
    dir: function () {
      // Have Yeoman greet the user.
      this.log(yosay(
        '欢迎使用 ' + chalk.red('generator-newborn') + ' 生成器!'
      ));
      
      if (this.props.createDirectory) {
        return true;
      }
      
      var prompt = [{
        type: 'confirm',
        name: 'createDirectory',
        message: '你想要为你的项目创建一个新目录吗?'
      }];

      return this.prompt(prompt).then(function (answers) {
        this.props.createDirectory = answers.createDirectory;
      }.bind(this));
    },
    
    dirname: function () {
      if (!this.props.createDirectory || this.props.dirname) {
        return true;
      }

      var prompt = [{
        type: 'input',
        name: 'dirname',
        message: '请输入目录名',
        validate: function (value) {
          return value.replace(/^\s+|\s+$/ig, '') && true;
        }
      }];

      return this.prompt(prompt).then(function (answers) {
        this.props.dirname = answers.dirname;
      }.bind(this));
    },
    
    init: function() {
      var prompts = [
        {
          type: 'input',
          name: 'projectName',
          message: '项目名',
          default: this.appname, // 默认为当前文件夹名
          store: true
        },{
        type: 'input',
        name: 'description',
        message: '项目描述'
        },{
          type: 'input',
          name: 'author',
          message: '作者'
        }];
      return this.prompt(prompts).then(function (answers) {
        this.props = Object.assign({}, this.props, answers);
      }.bind(this));
    }
  },
  
  writing: {
    rootInit: function () {
      if(this.props.createDirectory){
        this.destinationRoot(this.props.dirname);
        this.appname = this.props.dirname;
      }
    },
    // 拷贝app
    app: function () {
      console.log('app');
      this._copy('config', 'config/');
      this._copy('src', 'src/');
      this._copyTpl('_package.json', 'package.json');
      this._copyTpl('tsconfig.json', 'tsconfig.json');
      this._copyTpl('webpack.config.js', 'webpack.config.js');
    },
    
  },
  _copy: function (from, to) {
    this.fs.copy(this.templatePath(from), this.destinationPath(to));
  },
  
  _copyTpl: function (from, to) {
    this.fs.copyTpl(this.templatePath(from), this.destinationPath(to), this);
  },
  install: function () {
    var _this = this;
    this.log("Install node modules by hnpm");
    this.npmInstall('--registry http://registry.fe.yeshj.com', function () {
      _this.log(yosay(
        chalk.green('生成结束,开始使用吧!')
      ));
    });
  }
});
