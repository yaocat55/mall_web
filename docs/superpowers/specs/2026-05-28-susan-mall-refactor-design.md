# 商城管理后台 React 重构设计文档

## 概述

将 Vue 2.x + Element UI 的商城管理后台完整重构为 React 18 + Vite + MUI，采用暗黑模式 + 浅蓝色渐变主题。后端 API 保持不变，一比一还原全部 93 个页面。

## 技术栈

| 原项目 | 重构后 |
|--------|--------|
| Vue 2.6 + Webpack 4 | React 18 + Vite 5 |
| Element UI | MUI v6 |
| Vuex | Zustand |
| Vue Router 3 | React Router v6 |
| ECharts 4 + vue-echarts | ECharts 5 + echarts-for-react |
| Axios | Axios（不变） |
| js-cookie | js-cookie（不变） |
| SCSS | MUI sx prop + styled |

## 主题设计

### 深色背景色系
- 最深底（页面背景）：`#0D1117`
- 卡片/侧边栏：`#161B22`
- 输入框/表头：`#21262D`
- 悬浮层/弹窗：`#1C2333`

### 浅蓝色主色调
- 主色：`#58A6FF` → `#3B82F6` 渐变
- 深蓝强调：`#1F6FEB`（hover/active）
- 按钮、链接、选中态、图标高亮统一使用

### 文字色
- 主文字：`#E6EDF3`
- 次要文字/占位符：`#8B949E`
- 白色强调：`#FFFFFF`（标题）

### 表格
- 表头背景：`#21262D`
- 奇数行：`#161B22`
- 偶数行：`#1A1F2B`
- hover 行：`rgba(88, 166, 255, 0.08)`

## 项目结构

```
mall_web/
├── src/
│   ├── api/                    # 54 个 API 文件，与原项目 1:1 对应
│   │   ├── login.js
│   │   ├── data.js
│   │   ├── mall/               # brand, category, product, attribute, ...
│   │   ├── marketing/          # coupon, seckill, ...
│   │   ├── order/              # trade, tradeDeliveryAddress
│   │   ├── shopping/           # cart, favorites, comments, ...
│   │   ├── system/             # user, role, menu, dept, dict, ...
│   │   ├── monitor/            # log, online
│   │   ├── mnt/                # app, database, deploy, ...
│   │   ├── tools/              # email, alipay, storage, ...
│   │   ├── common/             # area, job, photo, ...
│   │   ├── aftersale/          # refund
│   │   └── generator/          # generator, genConfig
│   ├── assets/                 # 图片资源
│   ├── components/
│   │   ├── Crud/               # useCrud Hook + CrudTable + CrudDialog
│   │   ├── Layout/             # Sidebar, Navbar, TagsView, AppMain
│   │   │   ├── index.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── TagsView.jsx
│   │   │   └── AppMain.jsx
│   │   └── shared/             # Breadcrumb, Hamburger, Search...
│   ├── hooks/
│   │   ├── useCrud.js          # 核心 CRUD Hook
│   │   └── usePermission.js    # 权限检查 Hook
│   ├── pages/                  # 93 个页面，目录结构与原 views 一致
│   │   ├── Login.jsx
│   │   ├── Dashboard.jsx
│   │   ├── mall/
│   │   │   ├── Brand.jsx
│   │   │   ├── Category.jsx
│   │   │   ├── Product.jsx
│   │   │   └── ...
│   │   ├── marketing/
│   │   ├── order/
│   │   ├── shopping/
│   │   ├── system/
│   │   │   ├── User.jsx
│   │   │   ├── Role.jsx
│   │   │   ├── Menu.jsx
│   │   │   └── ...
│   │   ├── monitor/
│   │   ├── mnt/
│   │   ├── tools/
│   │   ├── common/
│   │   ├── aftersale/
│   │   └── generator/
│   ├── store/
│   │   ├── authStore.js        # token, userInfo, roles, login/logout
│   │   ├── appStore.js         # sidebar, device
│   │   └── settingsStore.js    # tagsView, fixedHeader, theme
│   ├── theme/
│   │   └── darkTheme.js        # MUI createTheme 暗黑配置
│   ├── utils/
│   │   ├── request.js          # Axios 实例 + 拦截器
│   │   ├── auth.js             # token 存取
│   │   └── rsaEncrypt.js       # RSA 加密
│   ├── router/
│   │   ├── index.jsx           # 路由配置 + 导航守卫
│   │   └── routes.jsx          # 静态路由 + 动态路由加载
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## useCrud Hook 设计

替代原项目 `@crud/crud` mixin 系统，提供相同的 CRUD 抽象能力。

### 接口定义

```js
const crud = useCrud({
  // 配置
  title: '品牌',              // 标题
  url: '/v1/brand/searchByPage',  // 分页查询接口
  crudMethod: brandApi,       // { add, edit, del } API 方法
  defaultForm: { id: null, name: '' },  // 表单默认值
  idField: 'id',              // ID 字段名
  sortField: ['id,desc'],     // 排序

  // 返回值
  // data, loading, page, form, selections, dialogOpen, dialogTitle,
  // toQuery, refresh, toAdd, toEdit, toDelete, cancelCU, submitCU,
  // pageChange, sizeChange, resetQuery, doExport, ...
})
```

### 状态机

```
STATUS.NORMAL(0) → STATUS.PREPARED(1) → STATUS.PROCESSING(2)
```

- NORMAL: 空闲
- PREPARED: 弹窗已打开，等待用户操作
- PROCESSING: 正在提交

### 生命周期钩子

与原项目一致：beforeRefresh、afterRefresh、beforeToCU、afterToCU、beforeSubmit、afterSubmit 等，通过回调函数传入。

## 路由设计

### 静态路由
- `/login` — 登录页
- `/404` — 404 页
- `/401` — 无权限页
- `/redirect/:path*` — 重定向
- `/` — Layout 框架 + 首页 Dashboard
- `/user/center` — 个人中心

### 动态路由
登录成功后调用 `/v1/web/user/info` 获取用户信息，再调用 `buildMenus()` 获取菜单数据，通过 `filterAsyncRouter` 动态注册路由。

使用 React Router v6 的 `useRoutes` + 动态追加实现。

## 状态管理 (Zustand)

### authStore
```js
{
  token, user, roles, loadMenus,
  login(userInfo), getInfo(), logout(), setRoles(roles)
}
```

### appStore
```js
{
  sidebar: { opened, withoutAnimation },
  device: 'desktop' | 'mobile',
  toggleSideBar(), closeSideBar()
}
```

### settingsStore
```js
{
  tagsView, fixedHeader, showSettings, sidebarLogo, theme,
  changeSetting(key, value)
}
```

## 页面模块清单

### 登录 (1页)
- Login.jsx — 账号密码登录 + 验证码 + 记住我

### 首页仪表盘 (4组件)
- Dashboard.jsx
- PanelGroup.jsx — 数据统计卡片
- LineChart.jsx / RadarChart.jsx / PieChart.jsx / BarChart.jsx

### 商城管理 (11页)
- mall/Brand.jsx
- mall/Category.jsx
- mall/Product.jsx + AttributeList.jsx + SelectAttributeValue.jsx + SelectPhoto.jsx
- mall/Attribute.jsx
- mall/AttributeValue.jsx
- mall/Unit.jsx
- mall/ProductGroup.jsx
- mall/IndexCarouselImage.jsx
- mall/IndexNotice.jsx
- mall/IndexProduct.jsx

### 营销管理 (4页)
- marketing/Coupon.jsx
- marketing/CouponUserProvide.jsx
- marketing/CouponUserReceive.jsx
- marketing/Seckill.jsx + SelectProduct.jsx

### 订单管理 (2页)
- order/Trade.jsx
- order/TradeDeliveryAddress.jsx

### 购物管理 (4页)
- shopping/DeliveryAddress.jsx
- shopping/ProductComment.jsx
- shopping/ProductFavorites.jsx
- shopping/ProductViewRecord.jsx
- shopping/ShoppingCart.jsx

### 售后管理 (1页)
- aftersale/Refund.jsx

### 系统管理 (7页)
- system/User.jsx + Center.jsx
- system/Role.jsx
- system/Menu.jsx
- system/Dept.jsx
- system/Dict.jsx + DictDetail.jsx
- system/Job.jsx
- system/Timing.jsx + Log.jsx

### 监控管理 (3页)
- monitor/Online.jsx
- monitor/Server.jsx
- monitor/Sql.jsx
- monitor/Log.jsx + ErrorLog.jsx + Search.jsx

### 运维管理 (5页)
- mnt/App.jsx
- mnt/Database.jsx + Execute.jsx
- mnt/Deploy.jsx + Deploy.jsx + SysRestore.jsx
- mnt/DeployHistory.jsx
- mnt/Server.jsx

### 工具 (4页)
- tools/Email.jsx + Config.jsx + Send.jsx
- tools/AliPay.jsx + Config.jsx + ToPay.jsx
- tools/Storage/Local.jsx
- tools/Storage/Qiniu.jsx + Form.jsx
- tools/Swagger.jsx

### 通用管理 (5页)
- common/Area.jsx
- common/Job.jsx + JobLog.jsx
- common/Notify.jsx
- common/Photo.jsx + PhotoDetail.jsx
- common/SensitiveWord.jsx
- common/SmsRecord.jsx

### 代码生成 (2页)
- generator/Index.jsx
- generator/Config.jsx
- generator/Preview.jsx

## 实施策略

1. 初始化 Vite + React 项目，配置 MUI 暗黑主题
2. 搭建 Layout 框架（Sidebar, Navbar, TagsView, AppMain）
3. 实现 Zustand stores + Axios request 模块 + 路由系统
4. 实现 useCrud Hook + CrudTable/CrudDialog 通用组件
5. 实现登录页 + 首页 Dashboard
6. 按模块批量实现 CRUD 页面（每个模块结构相似，可高效复制）
7. 实现非标准页面（ECharts 图表、树形选择、监控面板等）
8. 整合测试，确保所有 API 调用与原项目一致

## 约束

- 后端 API 路径、请求参数、返回格式一律不动
- 暗黑模式不可切换，浅蓝色为主色调
- 页面功能与样式 1:1 还原
- 所有 API 文件与原项目保持一致命名与路径
