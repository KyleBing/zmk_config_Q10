# 黑莓蓝牙键盘配置文件

> ZMK 固件可用的动作、按键说明：  
> [ZMK 固件中可以使用哪些按键](https://zmk.dev/docs/codes)  
> [ZMK 固件可以使用哪些动作](https://zmk.dev/docs/behaviors)

## 如何构建自己的个性化键盘固件
### 1. Fork 这个仓库

<img width="1295" alt="Screenshot 2024-03-28 at 10 51 28" src="https://github.com/KyleBing/zmk_config_Q10/assets/12215982/d6bf4867-6593-4022-9983-c264dc2d1786">


### 2. 编辑 `.keymap` 文件

> 你可以自己 clone 仓库到本地，或者直接在线上修改。

打开 Fork 后的仓库，找到 `.keymap` 文件，编辑它

对应可用的键位和操作可以查看下面的文档：
> [ZMK 固件中可以使用哪些按键](https://zmk.dev/docs/codes)  
> [ZMK 固件可以使用哪些动作](https://zmk.dev/docs/behaviors)


<img width="1384" alt="Screenshot 2024-03-28 at 10 52 08" src="https://github.com/KyleBing/zmk_config_Q10/assets/12215982/a5a3aef6-52d0-4281-b716-2d44873e6868">

编辑完成之后，点击右上角的 <kbd>Commit</kbd> 按钮提交你的修改。

<img width="1350" alt="Screenshot 2024-03-28 at 10 52 44" src="https://github.com/KyleBing/zmk_config_Q10/assets/12215982/28eff4c3-fc2c-4858-9417-8cbc34ba6277">


### 3. 执行 Actions 产出键盘固件

修改完成并提交之后，github 会自动将最新的仓库内容编译出最新的键盘固件。  
点击 `Actions` 标签进入 Actions 页面。首次可能没有自动运行，需要手动执行。  
之后就不用手动操作了，会自动运行。

<img width="1301" alt="Screenshot 2024-03-28 at 08 49 51" src="https://github.com/KyleBing/zmk_config_Q10/assets/12215982/f48e8221-451d-4b6c-9906-cc6add94d363">

点击运行之后，在列表中会多出一个正在执行的任务。

<img width="1301" alt="Screenshot 2024-03-28 at 08 50 06" src="https://github.com/KyleBing/zmk_config_Q10/assets/12215982/b45a4a51-b83c-4ca8-90a9-e216a4c18ce2">

点开它，能看到它的具体进度

<img width="1301" alt="Screenshot 2024-03-28 at 08 50 17" src="https://github.com/KyleBing/zmk_config_Q10/assets/12215982/e2cfd5f2-5dbd-42ef-8a66-3c51f5301612">

完成之后会在最下多出一个名为 firmware 的文件，点击下载它，会下载下来一个名为 `firmware.zip` 的文件

<img width="1301" alt="Screenshot 2024-03-28 at 09 15 15" src="https://github.com/KyleBing/zmk_config_Q10/assets/12215982/40f59100-c644-43d2-a07c-dd83aa2b2cc8">


### 4. 更新键盘固件

解压下载好的 `firmware.zip` 文件，解压后会获得 `bbxxxx-zmk.uf2` 的文件，这个文件就是键盘固件

<img width="712" alt="Screenshot 2024-03-28 at 08 58 32" src="https://github.com/KyleBing/zmk_config_Q10/assets/12215982/de14cce4-3e72-4aba-81ab-8849898cff7a">



USB 连接键盘，进入固件更新模式（具体操作参见键盘说明书）。  
此时电脑上会多出一个名为 `NICENANO` 的外接硬盘。  
将固件拖动到这个盘里，当电脑提示`硬盘已弹出`或者`硬盘非正常弹出`，表示升级完成。

![deploy firmware](https://github.com/KyleBing/zmk_config_Q10/assets/12215982/ec59d330-a2a1-4c4e-a5cb-6eaae36b8f4e)


macOS 上的提示是这样的，不要慌张，这是正常的。


<img width="421" alt="Screenshot 2024-03-28 at 09 15 45" src="https://github.com/KyleBing/zmk_config_Q10/assets/12215982/37cb6907-a432-4e6b-a744-c993dfa6dd92">

### 5. 更新固件完成









