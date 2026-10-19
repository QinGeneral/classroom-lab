# 绿豆天平 · 课堂实验室

打开 `dist/index.html` 即可离线使用，无需安装、联网或登录。也可在项目目录启动 `python3 -m http.server 4186`，打开 http://127.0.0.1:4186/dist/ 。

## 教学机制

- 自由探索：左右分别 ±1、±5，点击托盘也可加一颗；每边 0–30 颗，完整显示。
- 隐藏数量：供学生观察、数豆和预测。不会隐藏实际豆子。
- 平衡挑战：固定左盘，调整右盘；检查答案、重试本题、换题。切回自由探索保留原先实验。
- 全屏与键盘：A/Z 左盘加减，K/M 右盘加减；Shift 每次改变 5 颗。窄屏自适应，支持减少动画偏好。
- 教学假设：等臂、每颗豆子同重。倾斜角度仅作示意，不是实际力学角度。气泡作为辅助标记，向较高的一侧移动。

## ESA Pages

已提供 `esa.jsonc`，静态资源目录为 `dist`。在本项目目录登录后部署：

```sh
esa-cli login
esa-cli deploy
```

本次交付未部署到阿里云 ESA，未使用阿里云凭据。Sites 私人预览与阿里云部署是不同的托管服务。

## 文件与来源

- `dist/index.html`：完整、无外部依赖的教学网页。
- `reference/original.html`：用户提供原文件的保留副本。
- `docs/design-concept.png`：内置 Image Gen 生成的界面概念，仅作设计参考。
- `docs/design.md`：设计约定、修复依据与有意差异。
- `docs/verification.md`：浏览器检查记录。
- `docs/desktop.jpg`、`mobile.jpg`、`projector.jpg`：最终实现截图。

实际天平和豆子是代码生成的 SVG，可缩放与动画；没有把概念图当作网页。
