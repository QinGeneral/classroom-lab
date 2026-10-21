# 课堂实验室

按小学、初中、高中共 12 个年级浏览课堂互动小实验。目前开放「绿豆天平」，建议适用于小学一年级、二年级，其他年级明确显示待补充。

正式网站：**https://yuclasslab.dpdns.org/**（Vercel Hobby）。

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

## Vercel Hobby 部署

当前使用 `qingenerals-projects/classroom-lab`，已确认套餐为 Hobby；域名 `yuclasslab.dpdns.org` 已通过所有权验证和 HTTPS 验证。

先确认项目关联正确，再打包并发布：

```sh
vercel project inspect classroom-lab --scope qingenerals-projects
python3 scripts/build_vercel.py
vercel deploy --prebuilt --prod --yes --scope qingenerals-projects
```

新检出目录需先运行 `vercel link --project classroom-lab --scope qingenerals-projects`。预构建脚本只把 `dist/` 中的网站文件复制到官方 Build Output API 目录，逐个核对 SHA-256；不上传原始参考、截图、文档或凭据。完整部署和 DNS 记录见 `docs/vercel-deployment.md`。

已验证当前网络可以打开网站，但该电脑路由经过 `utun0`，不能当作中国内地无代理直连证明；课堂网络请另行实测，离线版可作为备用。

## ESA Pages 部署记录

已提供 `esa.jsonc`，名称沿用 `classroom-bean-balance`，资源目录为 `dist`。部署命令：

```sh
esa-cli deploy --name classroom-bean-balance --assets ./dist --environment production --skip-update-check
```

2026-10-20 已按用户明确授权为 `esa-pages-deploy` 添加 `AliyunESAFullAccess`，并成功部署至 ESA 生产环境。版本 `1792453389306711266`，流量比例 100%。线上 6 个运行资源均按 SHA-256 读回核对一致，IAB 已验证目录筛选、搜索、天平气泡与返回首页。默认调试链接鉴权有效期为 1 小时；长期访问需要自定义域名。不要把密钥或调试 token 放入仓库、离线包或聊天记录文件。

2026-10-21 接入 `yuclasslab.dpdns.org` 时，ESA 将其识别为子域名并拒绝免费套餐接入，因此按用户要求改用 Vercel Hobby。ESA 原有部署与历史 Sites 私人预览不是当前正式入口。

## 来源与验证

- `reference/original.html` 保留用户最初提供的网页。
- `docs/design-concept.png`、`docs/home-concept.png` 为内置 Image Gen 的界面概念。
- 实际网页使用原生 HTML/CSS/SVG，天平缩略图来自已实现的真实实验图形。
- `docs/home-verification.md` 记录首页功能、布局与迁移检查。
- `docs/esa-deployment.md` 记录 ESA 部署尝试与阻塞原因。
- `docs/vercel-deployment.md` 和 `docs/vercel-verification.json` 记录当前正式网站的发布、域名和资源核验。
