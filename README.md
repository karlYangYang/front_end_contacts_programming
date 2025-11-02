# Contact Management System - Frontend

通讯录管理系统前端应用

## 项目简介

这是一个基于 Vue 3 开发的现代化通讯录管理系统前端应用。提供直观的用户界面，支持联系人的完整生命周期管理、智能分组和快速搜索功能。

## 主要功能

- **用户认证系统**
  - 用户注册与登录
  - 会话状态管理
  - 安全登出

- **联系人管理**
  - 添加联系人（姓名、电话、职务、分组）
  - 编辑联系人信息
  - 删除联系人
  - 联系人列表展示

- **智能分组**
  - 默认分组（未分组、家人、同事、朋友）
  - 自定义分组
  - 分组联系人统计
  - 按分组筛选联系人
  - 删除分组（自动归类到"未分组"）

- **搜索功能**
  - 实时搜索（防抖处理）
  - 支持姓名、电话、职务模糊搜索
  - 支持在特定分组内搜索
  - 搜索结果实时显示

- **用户体验优化**
  - 响应式设计（支持移动端）
  - 优雅的动画过渡效果
  - Toast 消息提示
  - 加载状态指示
  - 空状态友好提示

## 技术栈

- **框架**: Vue 3 (Composition API)
- **构建工具**: Vite 4
- **HTTP 客户端**: Axios
- **图标库**: Lucide Vue Next
- **样式**: CSS3 (Scoped Styles)
- **开发语言**: JavaScript ES6+

## 项目结构

```
Front-end/
├── src/
│   ├── api/
│   │   └── contacts.js     # API 接口封装
│   ├── App.vue             # 主应用组件
│   ├── main.js             # 应用入口
│   └── style.css           # 全局样式
├── index.html              # HTML 模板
├── package.json            # 项目配置
├── vite.config.js          # Vite 配置
└── README.md               # 项目文档
```

## 环境要求

- Node.js 16.x 或更高版本
- npm 7.x 或更高版本（或使用 yarn/pnpm）

## 安装步骤

### 1. 克隆项目

```bash
git clone <repository-url>
cd Front-end
```

### 2. 安装依赖

```bash
npm install
```

或使用其他包管理器：

```bash
# 使用 yarn
yarn install

# 使用 pnpm
pnpm install
```

### 3. 配置后端 API 地址

修改 `src/api/contacts.js` 中的 API 地址：

```javascript
const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',  // 修改为你的后端地址
  // ...
})
```

### 4. 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:5173` 启动（Vite 默认端口）。

### 5. 构建生产版本

```bash
npm run build
```

构建产物将生成在 `dist/` 目录。

### 6. 预览生产构建

```bash
npm run preview
```

## 核心依赖

```json
{
  "vue": "^3.3.4",
  "axios": "^1.5.0",
  "lucide-vue-next": "^0.552.0"
}
```

### 依赖说明

- **Vue 3**: 渐进式 JavaScript 框架，使用 Composition API
- **Axios**: 基于 Promise 的 HTTP 客户端
- **Lucide Vue Next**: 精美的开源图标库

## 功能详解

### 用户认证

- **登录页面**: 首次访问或未登录时显示
- **注册功能**: 
  - 用户名至少 3 个字符
  - 密码至少 6 个字符
  - 需确认密码
- **会话保持**: 使用 Cookie Session，刷新页面保持登录状态
- **安全登出**: 清除所有会话数据

### 联系人操作

- **添加联系人**: 顶部表单快速添加，支持选择分组
- **编辑联系人**: 表格内联编辑，实时更新
- **删除联系人**: 确认对话框防止误删
- **联系人展示**: 表格形式，清晰展示所有信息

### 分组管理

- **侧边栏导航**: 
  - 显示所有分组及联系人数量
  - 点击分组筛选联系人
  - 可折叠展开
- **添加分组**: 模态框输入，支持回车确认
- **删除分组**: 除"未分组"外，其他分组可删除

### 搜索功能

- **智能搜索**: 
  - 500ms 防抖优化
  - 搜索姓名、电话、职务
  - 支持分组内搜索
- **搜索结果**: 实时显示匹配数量和结果

### UI/UX 特性

- **渐变背景**: 登录页面采用蓝色渐变
- **卡片设计**: 现代化卡片式布局
- **图标系统**: 统一使用 Lucide 图标
- **动画效果**: 
  - 页面淡入
  - Toast 滑入
  - 模态框缩放
- **响应式布局**: 
  - 桌面端：侧边栏 + 主内容
  - 移动端：垂直堆叠布局

## API 集成

### API 模块 (src/api/contacts.js)

```javascript
// 联系人相关
getAllContacts(groupName)  // 获取联系人列表
addContact(contact)        // 添加联系人
updateContact(id, contact) // 更新联系人
deleteContact(id)          // 删除联系人
searchContacts(keyword, groupName) // 搜索联系人

// 分组相关
getAllGroups()             // 获取分组列表
addGroup(group)            // 添加分组
deleteGroup(id)            // 删除分组

// 用户认证
register(user)             // 注册
login(credentials)         // 登录
logout()                   // 登出
checkAuth()                // 检查登录状态
```

### Axios 拦截器

- **请求拦截器**: 统一配置请求头
- **响应拦截器**: 统一错误处理和消息提示
- **凭证携带**: `withCredentials: true` 支持 Session

## 样式系统

### 主题色

```css
--primary: #409eff;       /* 主色 */
--success: #67c23a;       /* 成功 */
--danger: #f56c6c;        /* 危险 */
--warning: #e6a23c;       /* 警告 */
--info: #909399;          /* 信息 */
```

### 响应式断点

```css
@media (max-width: 768px)  { /* 移动端 */ }
@media (max-width: 1024px) { /* 平板 */ }
```

## 开发建议

### 代码规范

- 使用 Vue 3 Composition API
- 单文件组件 (SFC)
- Scoped 样式避免污染
- 清晰的函数命名

### 性能优化

- 防抖处理搜索请求
- 懒加载图标组件
- Vite 按需编译
- 生产构建代码压缩

### 调试技巧

使用 Vue DevTools 浏览器扩展进行调试：
- 组件树查看
- 响应式数据监控
- 性能分析

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

建议使用最新版本的现代浏览器以获得最佳体验。

## 常见问题

### 1. 无法连接后端

**错误**: "无法连接到服务器"

**解决方案**:
- 确保后端服务已启动（`http://localhost:5000`）
- 检查 CORS 配置
- 验证 API 地址配置正确

### 2. 登录状态丢失

**原因**: Session Cookie 配置问题

**解决方案**:
- 确保前后端都配置了 `withCredentials: true`
- 检查后端 CORS 配置中的 `supports_credentials`

### 3. 样式显示异常

**解决方案**:
- 清除浏览器缓存
- 重新构建项目
- 检查浏览器开发者工具中的 CSS 错误

### 4. 开发服务器端口冲突

修改 `vite.config.js`:

```javascript
export default {
  server: {
    port: 3000  // 修改为其他端口
  }
}
```

## 部署

### 静态文件部署

构建后可部署到任何静态文件服务器：

```bash
npm run build
# 将 dist/ 目录上传到服务器
```

### Nginx 配置示例

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 代理
    location /api {
        proxy_pass http://localhost:5000;
    }
}
```

### 环境变量

创建 `.env` 文件配置不同环境：

```bash
# .env.development
VITE_API_BASE_URL=http://localhost:5000/api

# .env.production
VITE_API_BASE_URL=https://api.your-domain.com/api
```

在代码中使用：
```javascript
const baseURL = import.meta.env.VITE_API_BASE_URL
```

## 许可证

MIT License

## 联系方式

如有问题或建议，请提交 Issue。
