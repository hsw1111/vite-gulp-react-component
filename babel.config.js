let babel_env = process.env['BABEL_ENV'];
let modules = false,
  useESModules = false;

switch (babel_env) {
  case 'cjs':
    modules = 'cjs';
    useESModules = false;
    break;
  case 'es':
    modules = false;
    useESModules = true;
    break;
  case 'umd':
    modules = 'auto';
    useESModules = false;
    break;
}

module.exports = {
  //	预设数组，从后向前执行；@babel/env是@babel/preset-env的简写。
  presets: [
    [
      '@babel/env',
      {
        //	同browserslist配置，同时配置以targets为主，一般不设置targets
        /* targets: {
                    chrome: "58",
                    ie: "11",
                }, */
        /**
         *	useBuiltIns项取值可以是"usage" 、 "entry" 或 false
         *	默认false,polyfill全部引入
         *	"entry"需要在入口处引入polyfill,最后部分引入
         *	"usage"Babel7.4以后版本稳定，自动进行polyfill的引入（'entry'这种方式不会根据我们实际用到的API进行针对性引入polyfill，而'usage'可以做到）
         */
        // useBuiltIns: "usage",
        /**
         * 这个参数项只有useBuiltIns设置为'usage'或'entry'时，才会生效。
         * 默认是2，Babel转码的时候使用的是core-js@2版本；如果使用了core-js@3中的新API，需要设置为3，同时安装并引入core-js@3版本
         */
        // corejs: 2,
        /**
         * 这个参数项的取值可以是"amd"、"umd" 、 "systemjs" 、 "commonjs" 、"cjs" 、"auto" 、false。在不设置的时候，取默认值"auto"。
         * 设置是否把ES6模块化语法改为其他模块化语法
         * 'auto'或者不设置，import都被转码成require
         * 设置为false，不会对ES6模块进行更改；可以静态分析，按需引入
         */
        modules: modules,
        loose: true,
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ],
  //	插件，先于预设，从前向后执行
  plugins: [
    [
      /**
       * 1、自动移除语法转换后内联的辅助函数（inline Babel helpers），使用@babel/runtime/helpers里的辅助函数来替代；
       * 2、当代码里使用了core-js的API，自动引入@babel/runtime-corejs3/core-js-stable/，以此来替代全局引入的core-js/stable，不污染全局；配置corejs
       * 3、当代码里使用了Generator/async函数，自动引入@babel/runtime/regenerator，以此来替代全局引入的regenerator-runtime/runtime，不污染全局；默认开启，不需要设置
       */
      '@babel/plugin-transform-runtime',
      {
        corejs: 3,
        useESModules: useESModules,
      },
    ],
  ],
};
