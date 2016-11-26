module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 代码句末添加分号不报错的规则, "never"为不加分号，always 为加分号
    // "semi": ["error","always",{ "omitLastInOneLineBlock": true }] 
    "semi": ["error","never"],
    // indent 是 语句前面的空格 规范，定义了应该4个空格还是 tab， 设为0 表示忽略
    "indent":0
  }
}
