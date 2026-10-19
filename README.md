# 课堂实验室

按小学、初中、高中共 12 个年级浏览课堂互动小实验。目前开放「绿豆天平」，建议适用于小学一年级、二年级，其他年级明确显示待补充。

## 使用

打开 `dist/index.html` 即可离线浏览目录。目录使用的 CSS、JavaScript、SVG 和实验页面均在 `dist/` 内；分发时请复制整个目录或使用 `output/classroom-lab-offline.zip`，不要只复制首页 HTML。

也可以在项目目录运行：

```sh
python3 -m http.server 4186 --bind 127.0.0.1
```

访问 http://127.0.0.1:4186/dist/ 。

- 年级入口支持小学一至六年级、初一至初三、高一至高三；点击学段名称可查看该学段。
- 搜索实验名称、知识点，支持多个关键词；可与年级筛选组合。
- URL 保存筛选条件，可复制或刷新；离线文件浏览器不允许更新 URL 时，筛选仍可使用。
- 「绿豆天平」位于 `dist/experiments/bean-balance/index.html`，点击左上角品牌可返回目录。

## 绿豆天平

- 左右各支持 ±1、±5、随机放豆、清空；每边 0–30 颗，完整显示。
- 保留三格绿色气泡管：居中表示平衡；偏左对应左高右低；偏右对应右高左低。气泡管与横梁同步运动。
- 支持隐藏数量、平衡挑战、检查答案、重试、换题和全屏。
- 键盘 A/Z 调整左盘，K/M 调整右盘；Shift 每次改变 5 颗。
- 等臂、同重为教学假设，倾斜角度与气泡偏移仅作观察示意，不代表实际测量。

## 添加新实验

1. 在 `dist/experiments/<实验名>/index.html` 增加真实可用的实验页和返回首页链接。
2. 在 `dist/catalog.js` 的 `experiments` 数组增加实验名称、学段、建议年级、描述、知识点、页面路径和图示路径。
3. 年级使用 `p1`–`p6`（小学）、`m1`–`m3`（初中）、`h1`–`h3`（高中）；一个实验可以归入多个年级。
4. 目录会自动纳入搜索和筛选。不要为尚未实现的实验创建可进入的链接。

## ESA Pages 部署

已提供 `esa.jsonc`，名称沿用 `classroom-bean-balance`，资源目录为 `dist`。部署命令：

```sh
esa-cli deploy --name classroom-bean-balance --assets ./dist --environment production --skip-update-check
```

2026-10-20 已实际尝试部署：CLI 登录检查通过，但阿里云返回 HTTP 403，当前 RAM 身份缺少 `esa:ListUserRoutines` 和 `esa:CreateRoutine` 权限，部署尚未成功。管理员补充权限后执行同一命令即可继续。不要把密钥放入仓库、离线包或聊天。

历史 Sites 私人预览是另一种托管方式，不等于 ESA 部署；本次首页工作按用户要求以 ESA 为部署目标。

## 来源与验证

- `reference/original.html` 保留用户最初提供的网页。
- `docs/design-concept.png`、`docs/home-concept.png` 为内置 Image Gen 的界面概念。
- 实际网页使用原生 HTML/CSS/SVG，天平缩略图来自已实现的真实实验图形。
- `docs/home-verification.md` 记录首页功能、布局与迁移检查。
- `docs/esa-deployment.md` 记录 ESA 部署尝试与阻塞原因。
