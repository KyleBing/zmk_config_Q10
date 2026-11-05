# 黑莓 Q10 蓝牙键盘 · ZMK 配置

仓库：[KyleBing/zmk_config_Q10](https://github.com/KyleBing/zmk_config_Q10)

> 按键与行为参考：  
> [ZMK Key Codes](https://zmk.dev/docs/codes) · [ZMK Behaviors](https://zmk.dev/docs/behaviors)

主要改这个文件：[`config/bbq10.keymap`](config/bbq10.keymap)

---

## 一、共 3 层

| 层 | 作用 |
|----|------|
| 字母层 | 字母、Shift、Ctrl |
| 符号层 | 数字、常用符号、滚轮 |
| 功能层 | 蓝牙设备 1–4、重启、背光、触控板电源、输出切换、刷机 |

![层级切换](docs/layer-switch.svg)

### 1. 字母层

![字母层](docs/layer-default.svg)

### 2. 符号层

![符号层](docs/layer-symbol.svg)

### 3. 功能层

| 物理键 | 功能 |
|--------|------|
| **Q** | 键盘重启 (`sys_reset`) |
| **1 / 2 / 3 / 4**（W / E / R / S） | 切换蓝牙设备 1–4 |
| **T** | 触控板电源开关 |
| **U** | USB ↔ 蓝牙输出切换 |
| **⌫** | 清除全部蓝牙配对 |
| **Z** | 进入 Bootloader（刷固件） |
| **V / B / N** | 背光减 / 开关 / 加 |
| **$** | 退出功能层 |

![功能层](docs/layer-util.svg)

---

## 二、层级切换

1. **符号层**
   - `Alt` **单击**：临时进入符号层（约 2 秒内按键后自动退出），层指示灯长亮
   - `Alt` **双击**：锁定符号层；再按 `Alt` 退出
2. **功能层**
   - `$` **短按**：输入 `$`
   - `$` **长按**：进入功能层，层指示灯闪烁；再按 `$` 退出

---

## 三、如何编译与刷入

### 1. Fork / 克隆本仓库

### 2. 编辑 keymap

修改 [`config/bbq10.keymap`](config/bbq10.keymap) 后提交。

### 3. GitHub Actions 出固件

打开仓库 **Actions**，等待构建完成，下载产物 `firmware.zip`，解压得到 `bbq10-zmk.uf2`。

### 4. 刷入

1. USB 连接键盘，进入 Bootloader（功能层按 **Z**，或以说明书为准）
2. 电脑出现名为 `NICENANO` 的磁盘
3. 将 `.uf2` 拖入该磁盘；提示磁盘弹出即完成

macOS 上偶发「磁盘未正确推出」属正常现象。

---

## 四、文档图示

| 文件 | 说明 |
|------|------|
| [`docs/layer-switch.svg`](docs/layer-switch.svg) | 三层切换总览 |
| [`docs/layer-default.svg`](docs/layer-default.svg) | 字母层 |
| [`docs/layer-symbol.svg`](docs/layer-symbol.svg) | 符号层 |
| [`docs/layer-util.svg`](docs/layer-util.svg) | 功能层 |
