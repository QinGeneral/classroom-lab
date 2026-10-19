# ESA Pages 部署记录

日期：2026-10-20（Asia/Shanghai）。

- CLI：esa-cli v1.0.13。
- 部署目标：classroom-bean-balance；生产环境；静态目录 dist。
- 页面范围：课堂实验室首页、CSS/JS、天平 SVG 缩略图、独立绿豆天平实验页。
- 只读检查 `esa-cli project list --skip-update-check` 返回 HTTP 403，AuthAction 为 esa:ListUserRoutines。
- 正式命令 `esa-cli deploy --name classroom-bean-balance --assets ./dist --environment production --skip-update-check` 的登录检查通过；创建项目时返回 HTTP 403，AuthAction 为 esa:CreateRoutine。
- 创建调用 RequestId：01A15683-E386-56BA-8685-6EA043A4AEEF。
- 结论：部署未成功。无可报告的 ESA 生产网址，也没有完成线上验证。
- 需要管理员为当前 CLI 使用的 RAM 身份补充 ESA 权限，再执行同一部署命令。阿里云 CLI 指南使用 AliyunESAFullAccess；也可由管理员按组织要求提供满足发布需要的自定义策略。

官方指南：https://help.aliyun.com/zh/edge-security-acceleration/esa/user-guide/create-pages-by-cli

本记录不保存凭据、AccessKey ID、Secret、鉴权 token 或云端完整诊断密文。


## 授权后部署成功

- 用户明确允许为 RAM 用户 esa-pages-deploy 添加 AliyunESAFullAccess。授权后使用 ListPoliciesForUser 读回确认；原有 EsaCliLoginOnly 策略保留。
- 再次执行上述 esa-cli deploy 命令，创建项目、上传 dist、生成版本与部署到 production 均成功。
- 代码版本：1792453389306711266。
- 部署 ID：1792453392060377299；生产流量 100%。
- 运行源代码提交：1110a6c；后续变更为部署记录与验证脚本，不改变线上运行文件。
- 默认域名：classroom-bean-balance-1705990141621112.debug.er.aliyun-esa.net。
- 默认调试 token 有效期 1 小时；没有将 token 或 Cookie 写入本项目的文档和源码。长期公网入口需要自定义域名。
- 线上首页经鉴权跳转后 HTTP 200，哈希与本地一致；全部 6 个运行资源逐个读回匹配（详见 esa-verification.json）。
- 内置浏览器线上验证：年级筛选、搜索“气泡”得 1 个实验、进入天平、右盘 +5 后 5:10 与气泡向左、返回首页成功；warning/error 日志为空。
- 截图：esa-live-home.jpg、esa-live-experiment.jpg。
- 阿里云云解析当前没有已管理域名；等待用户选择长期域名方案。

## 可重复的资源核验

scripts/verify_esa.py 使用 curl 的 Netscape Cookie 支持读回资源。macOS Python 3.9 的 MozillaCookieJar 会跳过 #HttpOnly_ 行，因此不用于实际发起验证请求。脚本不输出或保存 Cookie 值；报告仅包含相对路径、状态和哈希。
