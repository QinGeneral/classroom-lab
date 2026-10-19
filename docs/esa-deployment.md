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
