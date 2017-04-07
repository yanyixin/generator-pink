'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = Generator.extend ({
  initializing() {
    this.props = {};
  },
  
  prompting() {
    // 用户提示选项
    var done = this.async();
    this.log(yosay(
      '欢迎使用' + chalk.red('generator-pink') + ' 生成器!'
    ));

    const prompts = [{
      type: 'input',
      name: 'projectName',
      message: '项目名称',
      default: true,
      store: true
    },
      {
        type: 'input',
        name: 'description',
        message: '项目描述',
        default: true
      },{
        type: 'input',
        name: 'author',
        message: '作者'
      }];
  
    return this.prompt(prompts).then(function (answers) {
      this.props = Object.assign({}, this.props, answers);
    }.bind(this));
    // return this.prompt(prompts).then(answers => {
    //   // To access props later use this.props.someAnswer;
    //   this.props = Object.assign({}, this.props, answers);
    // }.bind(this));
  },

  writing() {
    // 生成项目目录结构阶段
    this.directory('src', 'src');
    this.copy('_package.json', 'package.json');
    this.copy('tsconfig.json', 'tsconfig.json');
    this.copy('webpack.config.js', 'webpack.config.js');
    this.copy('README.md', 'README.md');
    this.fs.copy(
      this.templatePath('dummyfile.txt'),
      this.destinationPath('dummyfile.txt')
    );
  },

  install() {
    // 运行(npm, bower)时的安装
    this.log(yosay(
      chalk.green('生成结束,开始使用吧!')
    ));
  }
});
