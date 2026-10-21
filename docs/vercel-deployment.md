# Vercel Hobby 部署记录

日期：2026-10-21（Asia/Shanghai）。

## 目标与费用

- 用户明确选择试用 Vercel Hobby，并要求继续使用已注册域名 `yuclasslab.dpdns.org`。
- 账号：`qingeneral`；空间：`qingenerals-projects`（`team_FBJgg1V9ZY8mvBQ1blpgbFWu`）。API 读回 `billing.plan: hobby`、`billing.status: active`。
- 新建独立项目：`classroom-lab`（`prj_Mb0ilbGUmeT7WqE8WMTEQGYAynTN`）。未开通 Pro、试用付费套餐或购买域名。

## 发布

- 部署 ID：`dpl_QzMP7MonHStv9j4AHPjavkUrjRH1`。
- 本次部署地址：`https://classroom-9y0m2e4mi-qingenerals-projects.vercel.app`。
- 稳定默认别名：`https://classroom-lab-ruddy.vercel.app`。
- 正式入口：**https://yuclasslab.dpdns.org/**。
- 使用 `python3 scripts/build_vercel.py` 打包 6 个运行资源，再执行 `vercel deploy --prebuilt --prod --yes --scope qingenerals-projects`。以 `.vercel/output/config.json` 的 `version: 3` 和 `static/` 提供原始静态文件。
- 初次普通发布只上传了配置，生产访问返回 404；随后使用上述预构建方式修正。修正后的默认别名及自定义域名均已完成资源哈希核验。
- CLI 48.7.1 用于项目关联、发布及状态检查；新域名绑定使用官方 CLI 65.0.0 的 API 命令，避开旧命令参数不兼容问题。
- Vercel 连接器创建项目返回 403；CLI 自有登录在相同用户和空间成功完成。没有扩大连接器权限。

## 域名与 DNS

- 域名仍使用 `dns1.digitalplat.org`、`dns2.digitalplat.org`；未变更 NS。
- 添加网站 A 记录：`@` → `216.198.79.1`，TTL 300。该值来自添加域名后 Vercel API 返回的首选 IPv4。
- 添加 `_vercel` TXT 所有权记录，使用 Vercel 为本项目生成的值；没有覆盖原有系统 NS 或其他业务记录。
- `POST /v9/projects/:id/domains/:domain/verify` 返回 `verified: true`。
- 读回域名配置：`configuredBy: A`、`misconfigured: false`、`conflicts: []`。
- 公共 DNS HTTPS 查询读回 A 记录为 `216.198.79.1`。
- 正常 HTTPS 校验通过，没有使用忽略证书验证选项，没有关闭部署保护。

## 验证与边界

- 所有 6 个运行文件均通过自定义域名返回 HTTP 200，SHA-256 与本地 `dist/` 逐个一致。结果见 `vercel-verification.json`。
- 默认稳定别名同样完成全部资源核验。
- 浏览器验证：首页；高一年级显示空状态；清除筛选后搜索“气泡”返回绿豆天平；进入实验；右盘 +5 后从 5:5 变为 5:10，右盘下沉、气泡偏左；返回首页。warning/error 日志为空。
- 截图：`vercel-live-home.png`、`vercel-live-experiment.png`。
- 本机系统代理设置为空，但目标 IP 的实际路由通过 `utun0`，本地 DNS 也出现 Fake-IP 回应。因此本次只证明当前网络可用，未验证中国内地无代理网络或各运营商访问质量。没有修改代理或系统网络设置。

## GitHub 自动发布

- 公开仓库：`https://github.com/QinGeneral/classroom-lab`，默认分支 `main`。
- 用户授权官方 Vercel GitHub 应用后，使用 `vercel git connect https://github.com/QinGeneral/classroom-lab.git --scope qingenerals-projects` 将仓库连接到现有项目。
- 项目 API 读回 `link.type: github`、`link.org: QinGeneral`、`link.repo: classroom-lab`、`link.repoId: 1428457315`、`link.productionBranch: main`。
- 连接后发现项目原先关闭 Git 自动部署（`gitProviderOptions.createDeployments: disabled`），现已改为 `enabled`；保留其他权限、部署保护与通知设置。
- 仓库根目录 `vercel.json` 将 `dist/` 设为输出目录，关闭安装和构建命令；无需在仓库保存部署 Token 或配置 GitHub Actions。
- 推送 `main` 后，由 Vercel Git 集成自动发布到正式域名；以对应提交的部署状态和线上资源核验为准。

## 手动发布备用方式与核验

```sh
vercel project inspect classroom-lab --scope qingenerals-projects
python3 scripts/build_vercel.py
vercel deploy --prebuilt --prod --yes --scope qingenerals-projects
python3 scripts/verify_esa.py --base-url https://yuclasslab.dpdns.org --cookie-jar /dev/null --output docs/vercel-verification.json
```

核验脚本沿用历史文件名 `verify_esa.py`，可用于这个不需要 Cookie 的 HTTPS 静态站点。
