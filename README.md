# vue-front

## Preface
提供个人面试展示代码。

如需运行,请先开启后端 [*链接*](https://github.com/tinfengyee/node-server)



目录结构

```powershell
vue-front/src
    ├── main.js (主要文件)
    ├── Home.vue (首页)
    ├── App.vue (页面入口文件)
    ├── assets (资源文件)
    ├── components (业务组件)
    ├── config (全局配置)
    ├── cool (核心文件)
    ├── dict (字典)
    ├── filter (过滤器)
    ├── icons (字体、图标库)
    │   ├── svg (存放svg文件，对应icon-svg组件使用)
    │   └── index.js 配置入口
    ├── mock (测试)
    ├── pages (基础页面)
    │   ├── layout (整体布局)
    │   │   ├── process (任务栏)
    │   │   ├── slider (侧边)
    │   │   ├── topbar (顶部)
    │   │   └── index.vue 
    │   ├── iframe (外链)
    │   ├── 403
    │   ├── 404
    │   ├── 500
    │   ├── 503
    │   ├── login (登录)
    │   ├── my
    │   │   └── info(个人信息)
    │   └── index.vue 页面布局
    ├── views (视图页面)
    │   ├── system (系统管理页面)
    │   └── ... 
    ├── router (路由)
    │   ├── routes (公共路由)
    │   └── index.js 路由业务事件处理
    ├── service (请求服务接口)
    │   ├── system (系统管理接口)
    │   ├── common (通用接口)
    │   ├── ... 
    │   └── request.js (请求处理)
    ├── store (本地存储)
    └── utils (工具)
```



## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
