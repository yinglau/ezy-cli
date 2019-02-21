# react-stack

> 一个使用`react`全家桶的项目脚手架

## 前期准备

### 需要的库、框架和工具：

- [express node服务器框架](http://www.expressjs.com.cn/)
- [reactjs](https://reactjs.org/)
- [react-router](https://reacttraining.com/react-router/web/example/basic)
- [redux 数据状态管理框架](https://redux.js.org/)
  - [react-redux 状态绑定组件](https://react-redux.js.org/)
  - [redux-saga 异步操作解决方案](https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html)
  - [immutable facebook出品不可变数据处理](http://facebook.github.io/immutable-js/)
  - [reselect](https://github.com/reduxjs/reselect#readme)
- [webpack 项目打包方案工具](https://webpack.js.org/)
- 测试套件
  - [enzyme](https://airbnb.io/enzyme/)
  - [jest](https://jestjs.io/docs/zh-Hans/getting-started)
- 代码转化，检测，规范工具
  - [eslint](https://cn.eslint.org/)
  - [babel](https://babel.docschina.org/)

### npm scripts

**develop server start**

```bash
$ npm start
```

**lint js**

```bash
$ npm run lint
```

**lint js and fix it**

```bash
$ npm run lint:fix
```

**generators**

> generate the `container`, `component` files

```bash
$ npm run g
```

