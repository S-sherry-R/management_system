// eslint.config.mjs
import antfu from '@antfu/eslint-config'

export default antfu({
  stylistic: {
    //代码前方空格数
    indent: 2, // 4, or 'tab'
    //字符串单引号
    quotes: 'single', // or 'double'
  },
  typescript: true,
  vue: true,
  ignores: [
    '**/node_modules/',
    '**/dist/',
    // ...globs
  ],
})
