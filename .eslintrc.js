module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'no-unused-vars': 'off',

    // 生产环境禁用 debugger
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // 逗号风格
    'comma-style': [2, 'last'], // 放在数组元素、对象属性或变量声明同一行
    // 强制 getter 和 setter 在对象中成对出现
    'accessor-pairs': 2,
    // 箭头函数的箭头(=>)之前或之后的空格风格。
    'arrow-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    // 代码块中开括号前和闭括号后有空格
    'block-spacing': [2, 'always'],
    // 大括号风格 1tbs
    'brace-style': [
      2,
      '1tbs',
      {
        allowSingleLine: true // 允许块的开括号和闭括号在 同一行
      }
    ],
    // 骆驼拼写属性
    camelcase: [
      0,
      {
        properties: 'always'
      }
    ],
    // 禁用拖尾逗号
    'comma-dangle': [2, 'never'],

    'comma-spacing': [
      2,
      {
        before: false, // 禁止在逗号前使用空格
        after: true // 要求在逗号后使用空格
      }
    ],
    // 要求在构造函数中有 super() 的调用
    'constructor-super': 2,
    // 控制语句使用一致的括号风格
    curly: [2, 'multi-line'], // 允许在单行中省略大括号
    // 要求点操作符和属性放在同一行。
    'dot-location': [2, 'property'],
    // 要求或禁止文件末尾存在空行
    'eol-last': 2,
    // 要求使用 === 和 !==
    eqeqeq: ['error', 'always', { null: 'ignore' }],
    // generator * 周围使用一致的空格
    'generator-star-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    // 要求回调函数中有容错处理 当参数名为err | error
    'handle-callback-err': [2, '^(err|error)$'],
    // 强制使用一致的缩进
    indent: [
      0,
      2,
      {
        SwitchCase: 1 // switch 语句中的 case 子句的缩进级别
      }
    ],
    // JSX 属性中一致地使用双引号或单引号
    'jsx-quotes': [2, 'prefer-single'], // 不包含单引号的 JSX 属性值使用单引号
    // 对象的属性中键和值之间使用的间距
    'key-spacing': [
      2,
      {
        beforeColon: false,
        afterColon: true
      }
    ],
    // 关键字前后空格
    'keyword-spacing': [
      2,
      {
        before: true,
        after: true
      }
    ],
    'new-cap': [
      2,
      {
        newIsCap: true, // 调用 new 操作符时有首字母大小的函数
        capIsNew: false // 调用首字母大写的函数时有 new 操作符。
      }
    ],
    // 调用无参构造函数时有圆括号
    'new-parens': 2,
    // 禁用 Array 构造函数
    'no-array-constructor': 2,
    // 禁用 arguments.caller 或 arguments.callee
    'no-caller': 2,
    // 关闭禁用console
    'no-console': 'off',
    // 止条件表达式中出现赋值操作符
    'no-class-assign': 2,
    // 禁止修改 const 声明的变量
    'no-const-assign': 2,
    // 关闭禁止在正则表达式中使用控制字符
    'no-control-regex': 0,
    // 禁止删除变量
    'no-delete-var': 2,
    // 禁止 function 定义中出现重名参数
    'no-dupe-args': 2,
    // 禁止类成员中出现重复的名称
    'no-dupe-class-members': 2,
    // 禁止对象字面量中出现重复的 key
    'no-dupe-keys': 2,
    // 禁止出现重复的 case 标签
    'no-duplicate-case': 2,
    // 禁止在正则表达式中使用空字符集
    'no-empty-character-class': 2,
    // 禁止使用空解构模式
    'no-empty-pattern': 2,
    // 禁用eval()
    'no-eval': 2,
    // 禁止对catch 子句参数赋值
    'no-ex-assign': 2,
    // 禁止扩展原生类型
    'no-extend-native': 2,
    // 禁止不必要的 .bind() 调用
    'no-extra-bind': 2,
    'no-extra-boolean-cast': 2,
    // 函数表达式周围禁止不必要的圆括号
    'no-extra-parens': [2, 'functions'],
    // 禁止 case 语句落空
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    // 禁止对function重新赋值
    'no-func-assign': 2,
    'no-implied-eval': 2,
    // 禁止 function 声明出现在嵌套的语句块中
    'no-inner-declarations': [2, 'functions'],
    'no-invalid-regexp': 2,
    // 禁止不规则的空白
    'no-irregular-whitespace': 2,
    // 禁用 __iterator__ 属性
    'no-iterator': 2,
    // 不允许标签与变量同名
    'no-label-var': 2,
    'no-labels': [
      2,
      {
        allowLoop: false,
        allowSwitch: false
      }
    ],
    // 禁用不必要的嵌套块
    'no-lone-blocks': 2,
    // 禁止空格和tab混合缩进
    'no-mixed-spaces-and-tabs': 2,
    // 禁止使用多个空格
    'no-multi-spaces': 2,
    // 禁止多选字符串
    'no-multi-str': 2,
    // 禁止出现多行空行
    'no-multiple-empty-lines': [
      2,
      {
        max: 1 // 最多一行
      }
    ],
    // 禁止对原生对象或只读的全局对象进行赋值
    'no-global-assign': 2,
    'no-unsafe-negation': 2,
    // 禁用Object构造函数
    'no-new-object': 2,
    'no-new-require': 2,
    // 禁止 Symbolnew 操作符和 new 一起使用
    'no-new-symbol': 2,
    'no-new-wrappers': 2,
    'no-obj-calls': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-path-concat': 2,
    // 	禁用 __proto__ 属性
    'no-proto': 2,
    // 禁止多次声明同一变量
    'no-redeclare': 2,
    'no-regex-spaces': 2,
    // 禁止出现赋值语句，除非使用括号把它们括起来。
    'no-return-assign': [2, 'except-parens'],
    // 禁止自我赋值
    'no-self-assign': 2,
    // 禁止自身比较
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-shadow-restricted-names': 2,
    'no-spaced-func': 2,
    'no-sparse-arrays': 2,
    'no-this-before-super': 2,
    'no-throw-literal': 2,
    'no-trailing-spaces': 2,
    'no-undef': 'off',
    'no-undef-init': 2,
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2,
    'no-unneeded-ternary': [
      2,
      {
        defaultAssignment: false
      }
    ],
    // 禁止在 return、throw、continue 和 break 语句之后出现不可达代码
    'no-unreachable': 2,
    'no-unsafe-finally': 2,
    // 禁止不必要的 .call() 和 .apply()
    'no-useless-call': 2,
    'no-useless-computed-key': 2,
    'no-useless-constructor': 0,
    'no-useless-escape': 0,
    'no-whitespace-before-property': 2,
    'no-with': 2,
    // 要求每个作用域的初始化的变量有多个变量声明
    'one-var': [
      2,
      {
        initialized: 'never'
      }
    ],
    'operator-linebreak': [
      2,
      'after',
      {
        overrides: {
          '?': 'before',
          ':': 'before'
        }
      }
    ],
    // 禁止块语句和类的开始或末尾有空行
    'padded-blocks': [2, 'never'],
    quotes: [
      2,
      'double', // 要求尽可能地使用单引号
      {
        avoidEscape: true, // 允许字符串使用单引号或双引号，只要字符串中包含了一个其它引号，否则需要转义
        allowTemplateLiterals: true // 允许字符串使用反勾号
      }
    ],
    semi: [2, 'always'],
    'semi-spacing': [
      2,
      {
        before: false,
        after: true
      }
    ],
    'space-before-blocks': [2, 'always'],
    // 'space-before-function-paren': ['error', { named: 'always', asyncArrow: 'always' }],
    'space-before-function-paren': 0,
    'space-in-parens': [2, 'never'],
    'space-infix-ops': 2,
    // 一元操作符之前或之后存在空格
    'space-unary-ops': [
      2,
      {
        words: true,
        nonwords: false
      }
    ],
    // 注释空格
    'spaced-comment': [
      2,
      'always',
      {
        markers: [
          'global',
          'globals',
          'eslint',
          'eslint-disable',
          '*package',
          '!',
          ','
        ]
      }
    ],
    // 模板字符串中空格禁止
    'template-curly-spacing': [2, 'never'],
    // 要求调用 isNaN()检查 NaN
    'use-isnan': 2,
    // 强制 typeof 表达式与有效的字符串进行比较
    'valid-typeof': 2,
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    // 静量值必须放在后面。if( name === "name" )
    yoda: [2, 'never'],
    // 该规则旨在标记那些使用 let 声明，但在初始化赋值后从未被修改过的变量
    'prefer-const': 2,

    'object-curly-spacing': [
      2,
      'always', // 要求花括号内有空格
      {
        objectsInObjects: true
      }
    ],
    'array-bracket-spacing': [2, 'never'] // 禁止在数组括号内出现空格
  },
};
