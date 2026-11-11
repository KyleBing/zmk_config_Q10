const STORAGE = "q10-config-v1";

const CONF_FIELDS = [
  { key: "CONFIG_TRACKPAD_SPEEDMULTIPLIER_HORIZONTAL", label: "鼠标水平速度", min: 0, max: 1000, hint: "百分比，100=默认。越大越快。" },
  { key: "CONFIG_TRACKPAD_SPEEDMULTIPLIER_VERTICAL", label: "鼠标垂直速度", min: 0, max: 10000, hint: "百分比，100=默认。越大越快。" },
  { key: "CONFIG_TRACKPAD_SCROLL_INTERVAL", label: "滚动：位移/格", min: 10, max: 500, hint: "越大越慢、越细；松手有惯性。" },
  { key: "CONFIG_TRACKPAD_ARROW_THRESHOLD", label: "方向键：位移阈值", min: 5, max: 200, hint: "累积多少位移发一次方向键。" },
  { key: "CONFIG_TRACKPAD_ARROW_INTERVAL", label: "方向键：连发间隔", min: 10, max: 500, hint: "毫秒，越大连发越慢。" },
  { key: "CONFIG_INPUT_A320_POLLINGRATE", label: "触控板采样 Hz", min: 50, max: 400, hint: "更高更跟手，略费电。" },
  { key: "CONFIG_ZMK_IDLE_TIMEOUT", label: "空闲超时", min: 5000, max: 120000, step: 1000, hint: "毫秒。空闲后背光可自动关。" },
];

const LED_CONF = [
  { key: "CONFIG_ZMK_INDICATOR_CAPSLOCK_BRT", label: "触控板灯亮度", min: 1, max: 100 },
  { key: "CONFIG_ZMK_IDICATOR_LAYER_BRT", label: "上层 4 灯亮度", min: 1, max: 100 },
  { key: "CONFIG_ZMK_IDICATOR_LAYER_CYCLE_MINBRT", label: "呼吸最低亮度", min: 1, max: 100 },
  { key: "CONFIG_ZMK_IDICATOR_BRT_STEP", label: "呼吸步进", min: 1, max: 30 },
  { key: "CONFIG_ZMK_LED_BURST_PAUSE_TICKS", label: "闪后停顿（格）", min: 1, max: 20, hint: "每格约 120ms。1闪1顿的「顿」。" },
  { key: "CONFIG_ZMK_BACKLIGHT_BRT_START", label: "背光起始亮度", min: 0, max: 100 },
  { key: "CONFIG_ZMK_BACKLIGHT_BRT_STEP", label: "背光步进", min: 1, max: 50 },
];

const BOOL_CONF = [
  { key: "CONFIG_ZMK_BACKLIGHT_ON_START", label: "开机背光开" },
  { key: "CONFIG_ZMK_BACKLIGHT_AUTO_OFF_IDLE", label: "空闲自动关背光" },
];

const TIMING_FIELDS = [
  { key: "slMs", label: "Alt 粘滞层超时", min: 500, max: 5000, hint: "单击 Alt 后多久无按键则退出符号层（ms）" },
  { key: "htlMs", label: "$ 长按进功能层", min: 150, max: 800, hint: "tapping-term-ms" },
  { key: "tdlMs", label: "Alt 双击判定", min: 150, max: 800, hint: "单击粘滞 / 双击锁定" },
  { key: "tdbbMs", label: "BB 双击判定", min: 150, max: 800, hint: "单击滚动 / 双击方向键" },
  { key: "htbbMs", label: "BB 长按 Command", min: 120, max: 400, hint: "超过此时长按发 Cmd" },
];

const KEYS = [
  { i: 0, row: "sh", phys: "左肩", cls: "letter" },
  { i: 1, row: "sh", phys: "右肩", cls: "letter" },
  { i: 2, row: "fn", phys: "Call", cls: "fnled" },
  { i: 3, row: "fn", phys: "BB", cls: "fnled" },
  { i: 4, row: "fn", phys: "触控板", cls: "pad" },
  { i: 5, row: "fn", phys: "Back", cls: "fnled" },
  { i: 6, row: "fn", phys: "挂断", cls: "fnled" },
  { i: 7, row: "ten", phys: "Q", cls: "letter" },
  { i: 8, row: "ten", phys: "W", cls: "letter" },
  { i: 9, row: "ten", phys: "E", cls: "letter" },
  { i: 10, row: "ten", phys: "R", cls: "letter" },
  { i: 11, row: "ten", phys: "T", cls: "letter" },
  { i: 12, row: "ten", phys: "Y", cls: "letter" },
  { i: 13, row: "ten", phys: "U", cls: "letter" },
  { i: 14, row: "ten", phys: "I", cls: "letter" },
  { i: 15, row: "ten", phys: "O", cls: "letter" },
  { i: 16, row: "ten", phys: "P", cls: "letter" },
  { i: 17, row: "ten", phys: "A", cls: "letter" },
  { i: 18, row: "ten", phys: "S", cls: "letter" },
  { i: 19, row: "ten", phys: "D", cls: "letter" },
  { i: 20, row: "ten", phys: "F", cls: "letter" },
  { i: 21, row: "ten", phys: "G", cls: "letter" },
  { i: 22, row: "ten", phys: "H", cls: "letter" },
  { i: 23, row: "ten", phys: "J", cls: "letter" },
  { i: 24, row: "ten", phys: "K", cls: "letter" },
  { i: 25, row: "ten", phys: "L", cls: "letter" },
  { i: 26, row: "ten", phys: "⌫", cls: "letter" },
  { i: 27, row: "ten", phys: "Alt", cls: "letter" },
  { i: 28, row: "ten", phys: "Z", cls: "letter" },
  { i: 29, row: "ten", phys: "X", cls: "letter" },
  { i: 30, row: "ten", phys: "C", cls: "letter" },
  { i: 31, row: "ten", phys: "V", cls: "letter" },
  { i: 32, row: "ten", phys: "B", cls: "letter" },
  { i: 33, row: "ten", phys: "N", cls: "letter" },
  { i: 34, row: "ten", phys: "M", cls: "letter" },
  { i: 35, row: "ten", phys: "$", cls: "letter" },
  { i: 36, row: "ten", phys: "Enter", cls: "letter" },
  { i: 37, row: "bot", phys: "aA", cls: "letter" },
  { i: 38, row: "bot", phys: "0", cls: "letter" },
  { i: 39, row: "bot", phys: "Space", cls: "letter wide" },
  { i: 40, row: "bot", phys: "SYM", cls: "letter" },
  { i: 41, row: "bot", phys: "aA", cls: "letter" },
];

const PRESETS = [
  ["自定义", ""],
  ["无", "&none"],
  ["透明(下层)", "&trans"],
  ["BB 长按Cmd / 单击滚动 / 双击方向", "&htbb LGUI 0"],
  ["Alt 单击粘滞 / 双击锁定符号层", "&tdl"],
  ["$ 短按 / 长按功能层", "&htl UTIL DLLR"],
  ["退出符号层", "&tog SYM"],
  ["退出功能层", "&tog UTIL"],
  ["鼠标左键", "&mkp LCLK"],
  ["鼠标右键", "&mkp RCLK"],
  ["滚轮上", "&msc SCRL_UP"],
  ["滚轮下", "&msc SCRL_DOWN"],
  ["Tab", "&kp TAB"],
  ["Esc", "&kp ESC"],
  ["Caps Lock", "&kp CLCK"],
  ["Enter", "&kp ENTER"],
  ["Backspace", "&kp BSPC"],
  ["Delete", "&kp DEL"],
  ["Space", "&kp SPACE"],
  ["Shift", "&kp LSHFT"],
  ["右 Shift", "&kp RSHFT"],
  ["短按 0 / 长按 Ctrl", "&mt LCTRL N0"],
  ["短按 ( / 长按 [", "&mt LBKT LPAR"],
  ["短按 ) / 长按 ]", "&mt RBKT RPAR"],
  ["蓝牙设备 1", "&bt BT_SEL 0"],
  ["蓝牙设备 2", "&bt BT_SEL 1"],
  ["蓝牙设备 3", "&bt BT_SEL 2"],
  ["蓝牙设备 4", "&bt BT_SEL 3"],
  ["清除蓝牙配对", "&bt BT_CLR"],
  ["USB/蓝牙输出", "&out OUT_TOG"],
  ["触控板电源", "&ext_power EP_TOG"],
  ["重启", "&sys_reset"],
  ["Bootloader", "&bootloader"],
  ["背光减", "&bl BL_DEC"],
  ["背光开关", "&bl BL_TOG"],
  ["背光加", "&bl BL_INC"],
  ["静音", "&kp C_MUTE"],
  ["2", "&kp N2"],
];

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
LETTERS.forEach((c) => PRESETS.push([`字母 ${c}`, `&kp ${c}`]));
for (let n = 0; n <= 9; n++) PRESETS.push([`数字 ${n}`, `&kp N${n}`]);
[
  ["#", "HASH"], ["@", "AT"], ["*", "STAR"], ["$", "DLLR"], ["_", "UNDER"],
  ["-", "MINUS"], ["+", "PLUS"], ["/", "SLASH"], [":", "COLON"], [";", "SEMI"],
  ["'", "APOS"], ['"', "DQT"], ["?", "QMARK"], ["!", "EXCL"], [",", "COMMA"], [".", "DOT"],
].forEach(([l, c]) => PRESETS.push([l, `&kp ${c}`]));

function k(bind, legend, sub = "") {
  return { bind, legend, sub };
}

function defaultLayers() {
  return [
    [
      k("&mkp LCLK", "左键"), k("&mkp RCLK", "右键"),
      k("&kp TAB", "Tab"), k("&htbb LGUI 0", "Cmd", "单击滚 · 双击方向"),
      k("&mkp LCLK", "左键"), k("&kp ESC", "Esc"), k("&kp CLCK", "Caps"),
      k("&kp Q", "Q"), k("&kp W", "W"), k("&kp E", "E"), k("&kp R", "R"), k("&kp T", "T"),
      k("&kp Y", "Y"), k("&kp U", "U"), k("&kp I", "I"), k("&kp O", "O"), k("&kp P", "P"),
      k("&kp A", "A"), k("&kp S", "S"), k("&kp D", "D"), k("&kp F", "F"), k("&kp G", "G"),
      k("&kp H", "H"), k("&kp J", "J"), k("&kp K", "K"), k("&kp L", "L"), k("&kp BSPC", "⌫"),
      k("&tdl", "Alt", "单击符号 · 双击锁定"),
      k("&kp Z", "Z"), k("&kp X", "X"), k("&kp C", "C"), k("&kp V", "V"), k("&kp B", "B"),
      k("&kp N", "N"), k("&kp M", "M"), k("&htl UTIL DLLR", "$", "长按功能层"), k("&kp ENTER", "Enter"),
      k("&kp LSHFT", "Shift"), k("&mt LCTRL N0", "0", "长按 Ctrl"), k("&kp SPACE", "Space"),
      k("&kp N2", "2"), k("&kp RSHFT", "Shift"),
    ],
    [
      k("&msc SCRL_UP", "滚上"), k("&msc SCRL_DOWN", "滚下"),
      k("&kp TAB", "Tab"), k("&htbb LGUI 0", "Cmd", "单击滚 · 双击方向"),
      k("&mkp LCLK", "左键"), k("&kp ESC", "Esc"), k("&kp CLCK", "Caps"),
      k("&kp HASH", "#"), k("&kp N1", "1"), k("&kp N2", "2"), k("&kp N3", "3"), k("&mt LBKT LPAR", "(", "["),
      k("&mt RBKT RPAR", ")", "]"), k("&kp UNDER", "_"), k("&kp MINUS", "-"), k("&kp PLUS", "+"), k("&kp AT", "@"),
      k("&kp STAR", "*"), k("&kp N4", "4"), k("&kp N5", "5"), k("&kp N6", "6"), k("&kp SLASH", "/"),
      k("&kp COLON", ":"), k("&kp SEMI", ";"), k("&kp APOS", "'"), k("&kp DQT", '"'), k("&kp BSPC", "⌫"),
      k("&tog SYM", "退出"),
      k("&kp N7", "7"), k("&kp N8", "8"), k("&kp N9", "9"), k("&kp QMARK", "?"), k("&kp EXCL", "!"),
      k("&kp COMMA", ","), k("&kp DOT", "."), k("&kp C_MUTE", "静音"), k("&kp ENTER", "Enter"),
      k("&kp LSHFT", "Shift"), k("&mt LCTRL N0", "0", "长按 Ctrl"), k("&kp SPACE", "Space"),
      k("&kp N2", "2"), k("&kp RSHFT", "Shift"),
    ],
    [
      k("&mkp LCLK", "左键"), k("&mkp RCLK", "右键"),
      k("&kp TAB", "Tab"), k("&htbb LGUI 0", "Cmd", "单击滚 · 双击方向"),
      k("&mkp LCLK", "左键"), k("&kp ESC", "Esc"), k("&kp CLCK", "Caps"),
      k("&sys_reset", "重启"), k("&bt BT_SEL 0", "BT1"), k("&bt BT_SEL 1", "BT2"), k("&bt BT_SEL 2", "BT3"),
      k("&ext_power EP_TOG", "触控板电源"), k("&none", ""), k("&out OUT_TOG", "输出"), k("&none", ""), k("&none", ""), k("&none", ""),
      k("&none", ""), k("&bt BT_SEL 3", "BT4"), k("&none", ""), k("&none", ""), k("&none", ""),
      k("&none", ""), k("&none", ""), k("&none", ""), k("&none", ""), k("&bt BT_CLR", "清配对"),
      k("&none", ""),
      k("&bootloader", "刷机"), k("&none", ""), k("&none", ""), k("&bl BL_DEC", "背光-"), k("&bl BL_TOG", "背光"),
      k("&bl BL_INC", "背光+"), k("&none", ""), k("&tog UTIL", "退出"), k("&kp ENTER", "Enter"),
      k("&kp LSHFT", "Shift"), k("&mt LCTRL N0", "0", "长按 Ctrl"), k("&kp SPACE", "Space"),
      k("&kp N2", "2"), k("&kp RSHFT", "Shift"),
    ],
  ];
}

function defaultState() {
  return {
    conf: {
      CONFIG_TRACKPAD_SPEEDMULTIPLIER_HORIZONTAL: 80,
      CONFIG_TRACKPAD_SPEEDMULTIPLIER_VERTICAL: 80,
      CONFIG_TRACKPAD_SCROLL_INTERVAL: 16,
      CONFIG_TRACKPAD_ARROW_THRESHOLD: 30,
      CONFIG_TRACKPAD_ARROW_INTERVAL: 80,
      CONFIG_INPUT_A320_POLLINGRATE: 100,
      CONFIG_ZMK_IDLE_TIMEOUT: 30000,
      CONFIG_ZMK_INDICATOR_CAPSLOCK: "y",
      CONFIG_ZMK_INDICATOR_CAPSLOCK_BRT: 100,
      CONFIG_ZMK_INDICATOR_LED: "y",
      CONFIG_ZMK_IDICATOR_LAYER_BRT: 100,
      CONFIG_ZMK_IDICATOR_LAYER_CYCLE_MAXBRT: 100,
      CONFIG_ZMK_IDICATOR_LAYER_CYCLE_MINBRT: 20,
      CONFIG_ZMK_IDICATOR_LAYER_CYCLE_INTERVAL: 20,
      CONFIG_ZMK_IDICATOR_BRT_STEP: 5,
      CONFIG_ZMK_BACKLIGHT: "y",
      CONFIG_ZMK_BACKLIGHT_BRT_START: 40,
      CONFIG_ZMK_BACKLIGHT_BRT_STEP: 10,
      CONFIG_ZMK_BACKLIGHT_ON_START: "y",
      CONFIG_ZMK_BACKLIGHT_AUTO_OFF_IDLE: "y",
      CONFIG_ZMK_LED_LAYER0_PATTERN: 0,
      CONFIG_ZMK_LED_LAYER1_PATTERN: 1,
      CONFIG_ZMK_LED_LAYER2_PATTERN: 3,
      CONFIG_ZMK_LED_PAD_IDLE_PATTERN: 0,
      CONFIG_ZMK_LED_PAD_CAPS_PATTERN: 1,
      CONFIG_ZMK_LED_PAD_SCROLL_PATTERN: 3,
      CONFIG_ZMK_LED_PAD_ARROW_PATTERN: 5,
      CONFIG_ZMK_LED_BURST_PAUSE_TICKS: 4,
    },
    timing: { slMs: 2000, htlMs: 500, tdlMs: 400, tdbbMs: 350, htbbMs: 200 },
    layers: defaultLayers(),
  };
}

let state = loadState();
let layer = 0;
let selected = 2;
let previewFile = "conf";
let ledMode = "sym";
let ledTick = 0;

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    const base = defaultState();
    return {
      conf: { ...base.conf, ...parsed.conf },
      timing: { ...base.timing, ...parsed.timing },
      layers: parsed.layers?.length === 3 ? parsed.layers : base.layers,
    };
  } catch {
    return defaultState();
  }
}

function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.add("show");
  setTimeout(() => el.classList.remove("show"), 1800);
}

function saveLocal() {
  localStorage.setItem(STORAGE, JSON.stringify(state));
  toast("已保存到浏览器");
}

function padBind(s) {
  return s.padEnd(12, " ");
}

function generateConf() {
  const c = state.conf;
  return `# BBQ10 可覆盖的板级/触控板配置（由配置器生成）
# 对应固件分支：KyleBing/zmk @ bbkeyboard_tp-q10-modes

# ========== 触控板：移动速度 ==========
CONFIG_TRACKPAD_SPEEDMULTIPLIER_HORIZONTAL=${c.CONFIG_TRACKPAD_SPEEDMULTIPLIER_HORIZONTAL}
CONFIG_TRACKPAD_SPEEDMULTIPLIER_VERTICAL=${c.CONFIG_TRACKPAD_SPEEDMULTIPLIER_VERTICAL}

# ========== 触控板：滚动速度 ==========
CONFIG_TRACKPAD_SCROLL_INTERVAL=${c.CONFIG_TRACKPAD_SCROLL_INTERVAL}

# ========== 触控板：方向键模式 ==========
CONFIG_TRACKPAD_ARROW_THRESHOLD=${c.CONFIG_TRACKPAD_ARROW_THRESHOLD}
CONFIG_TRACKPAD_ARROW_INTERVAL=${c.CONFIG_TRACKPAD_ARROW_INTERVAL}

# ========== 触控板：采样频率 ==========
CONFIG_INPUT_A320_POLLINGRATE=${c.CONFIG_INPUT_A320_POLLINGRATE}

# ========== 其它 ==========
CONFIG_ZMK_IDLE_TIMEOUT=${c.CONFIG_ZMK_IDLE_TIMEOUT}
CONFIG_ZMK_INDICATOR_CAPSLOCK=${c.CONFIG_ZMK_INDICATOR_CAPSLOCK}
CONFIG_ZMK_INDICATOR_CAPSLOCK_BRT=${c.CONFIG_ZMK_INDICATOR_CAPSLOCK_BRT}
CONFIG_ZMK_INDICATOR_LED=${c.CONFIG_ZMK_INDICATOR_LED}
CONFIG_ZMK_IDICATOR_LAYER_BRT=${c.CONFIG_ZMK_IDICATOR_LAYER_BRT}
CONFIG_ZMK_IDICATOR_LAYER_CYCLE_MAXBRT=${c.CONFIG_ZMK_IDICATOR_LAYER_CYCLE_MAXBRT}
CONFIG_ZMK_IDICATOR_LAYER_CYCLE_MINBRT=${c.CONFIG_ZMK_IDICATOR_LAYER_CYCLE_MINBRT}
CONFIG_ZMK_IDICATOR_LAYER_CYCLE_INTERVAL=${c.CONFIG_ZMK_IDICATOR_LAYER_CYCLE_INTERVAL}
CONFIG_ZMK_IDICATOR_BRT_STEP=${c.CONFIG_ZMK_IDICATOR_BRT_STEP}
CONFIG_ZMK_BACKLIGHT=${c.CONFIG_ZMK_BACKLIGHT}
CONFIG_ZMK_BACKLIGHT_BRT_START=${c.CONFIG_ZMK_BACKLIGHT_BRT_START}
CONFIG_ZMK_BACKLIGHT_BRT_STEP=${c.CONFIG_ZMK_BACKLIGHT_BRT_STEP}
CONFIG_ZMK_BACKLIGHT_ON_START=${c.CONFIG_ZMK_BACKLIGHT_ON_START}
CONFIG_ZMK_BACKLIGHT_AUTO_OFF_IDLE=${c.CONFIG_ZMK_BACKLIGHT_AUTO_OFF_IDLE}

# ========== 灯效（0关 1常亮 2–6为1–5闪一顿 7闪烁 8呼吸 9频闪 10心跳 11脉冲）==========
CONFIG_ZMK_LED_LAYER0_PATTERN=${c.CONFIG_ZMK_LED_LAYER0_PATTERN}
CONFIG_ZMK_LED_LAYER1_PATTERN=${c.CONFIG_ZMK_LED_LAYER1_PATTERN}
CONFIG_ZMK_LED_LAYER2_PATTERN=${c.CONFIG_ZMK_LED_LAYER2_PATTERN}
CONFIG_ZMK_LED_PAD_IDLE_PATTERN=${c.CONFIG_ZMK_LED_PAD_IDLE_PATTERN}
CONFIG_ZMK_LED_PAD_CAPS_PATTERN=${c.CONFIG_ZMK_LED_PAD_CAPS_PATTERN}
CONFIG_ZMK_LED_PAD_SCROLL_PATTERN=${c.CONFIG_ZMK_LED_PAD_SCROLL_PATTERN}
CONFIG_ZMK_LED_PAD_ARROW_PATTERN=${c.CONFIG_ZMK_LED_PAD_ARROW_PATTERN}
CONFIG_ZMK_LED_BURST_PAUSE_TICKS=${c.CONFIG_ZMK_LED_BURST_PAUSE_TICKS}
`;
}

function layerBlock(name, comment, keys, extraComment) {
  const L = (a, b) => keys.slice(a, b).map((x) => padBind(x.bind)).join("    ");
  return `        ${name} {
${extraComment || ""}            bindings = <
            //                  TOP LEFT BUTTON                                                                                          TOP RIGHT BUTTON
                                ${keys[0].bind.padEnd(40)} ${keys[1].bind}

            //  PHONE                       BLACKBERRY                                TOUCH_PAD                          BACK                             HUNG_UP
                ${L(2, 7)}

            //  Q               W           E           R          T                  Y                 U                I               O                P
                ${L(7, 17)}

            //  A               S           D           F          G                  H                 J                K               L                BACKSPACE
                ${L(17, 27)}

            //  Alt             Z           X           C          V                  B                 N                M               $                ENTER
                ${L(27, 37)}

            //                  LSHIFT            0                                   SPACE                     SYM                      RSHIFT
                                ${L(37, 42)}
            >;
        };`;
}

function generateKeymap() {
  const t = state.timing;
  const [d, s, u] = state.layers;
  return `/*
 * Generated by BBQ10 configurator
 */

#include <behaviors.dtsi>
#include <dt-bindings/zmk/keys.h>
#include <dt-bindings/zmk/bt.h>
#include <dt-bindings/zmk/outputs.h>
#include <dt-bindings/zmk/mouse.h>
#include <dt-bindings/zmk/backlight.h>
#include <dt-bindings/zmk/ext_power.h>
#include <dt-bindings/zmk/trackpad_mode.h>

#define SYM 1
#define UTIL 2

&sl {
    release-after-ms = <${t.slMs}>;
};

/ {
    behaviors {
        htl: hold_toggle_layer {
            compatible = "zmk,behavior-hold-tap";
            #binding-cells = <2>;
            tapping-term-ms = <${t.htlMs}>;
            bindings = <&tog &kp>;
        };
        tdl: tap_dance_layer {
            compatible = "zmk,behavior-tap-dance";
            #binding-cells = <0>;
            tapping-term-ms = <${t.tdlMs}>;
            bindings = <&sl SYM>, <&tog SYM>;
        };
        tdbb: tap_dance_trackpad {
            compatible = "zmk,behavior-tap-dance";
            #binding-cells = <0>;
            tapping-term-ms = <${t.tdbbMs}>;
            bindings = <&tp_mode TP_TOG_SCROLL>, <&tp_mode TP_TOG_ARROW>;
        };
        htbb: hold_tap_blackberry {
            compatible = "zmk,behavior-hold-tap";
            #binding-cells = <2>;
            flavor = "hold-preferred";
            tapping-term-ms = <${t.htbbMs}>;
            quick-tap-ms = <${t.tdbbMs}>;
            bindings = <&kp>, <&tdbb>;
        };
    };

    keymap {
        compatible = "zmk,keymap";

${layerBlock("default_layer", "", d)}


${layerBlock("sym_layer", "", s)}


${layerBlock("util_layer", "", u)}
    };
};
`;
}

function generateJson() {
  return JSON.stringify(state, null, 2);
}

function download(name, text) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
  a.download = name;
  a.click();
  URL.revokeObjectURL(a.href);
}

async function saveFolder() {
  if (!window.showDirectoryPicker) {
    download("bbq10.conf", generateConf());
    setTimeout(() => download("bbq10.keymap", generateKeymap()), 250);
    setTimeout(() => download("q10-config.json", generateJson()), 500);
    toast("已下载三个文件（当前浏览器不支持选文件夹）");
    return;
  }
  try {
    const dir = await window.showDirectoryPicker();
    async function write(name, text) {
      const fh = await dir.getFileHandle(name, { create: true });
      const w = await fh.createWritable();
      await w.write(text);
      await w.close();
    }
    await write("bbq10.conf", generateConf());
    await write("bbq10.keymap", generateKeymap());
    await write("q10-config.json", generateJson());
    toast("已写入所选文件夹");
  } catch (e) {
    if (e.name !== "AbortError") toast("保存取消或失败");
  }
}

function renderFields(host, fields, bools) {
  host.innerHTML = "<h2>参数</h2>";
  fields.forEach((f) => {
    const wrap = document.createElement("div");
    wrap.className = "field";
    wrap.innerHTML = `<label></label><span class="val"></span><input type="range"><div class="hint"></div>`;
    wrap.querySelector("label").textContent = f.label;
    wrap.querySelector(".hint").textContent = f.hint || "";
    const input = wrap.querySelector("input");
    const val = wrap.querySelector(".val");
    input.min = f.min;
    input.max = f.max;
    input.step = f.step || 1;
    const src = f.group === "time" ? state.timing : state.conf;
    const key = f.key;
    const read = () => (f.group === "time" ? state.timing[key] : state.conf[key]);
    input.value = read();
    val.textContent = read();
    input.addEventListener("input", () => {
      const n = Number(input.value);
      if (f.group === "time") state.timing[key] = n;
      else state.conf[key] = n;
      val.textContent = n;
      refreshPreview();
    });
    host.appendChild(wrap);
  });
  (bools || []).forEach((f) => {
    const wrap = document.createElement("label");
    wrap.className = "check";
    const box = document.createElement("input");
    box.type = "checkbox";
    box.checked = state.conf[f.key] === "y";
    box.addEventListener("change", () => {
      state.conf[f.key] = box.checked ? "y" : "n";
      refreshPreview();
    });
    wrap.appendChild(box);
    wrap.append(f.label);
    host.appendChild(wrap);
  });
}

function renderKeyboard(root, interactive) {
  root.innerHTML = "";
  const rows = [
    { cls: "row sh", ids: [0, -1, 1] },
    { cls: "row fn", ids: [2, 3, 4, 5, 6] },
    { cls: "row ten", ids: range(7, 17) },
    { cls: "row ten", ids: range(17, 27) },
    { cls: "row ten", ids: range(27, 37) },
    { cls: "row bot", ids: range(37, 42) },
  ];
  rows.forEach((r) => {
    const row = document.createElement("div");
    row.className = r.cls;
    r.ids.forEach((id) => {
      if (id < 0) {
        const spacer = document.createElement("div");
        row.appendChild(spacer);
        return;
      }
      const meta = KEYS[id];
      const data = state.layers[layer][id];
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "key " + (meta.cls || "") + (data.bind === "&none" ? " empty" : "");
      if (interactive && selected === id) btn.classList.add("selected");
      btn.innerHTML = `<span class="phys"></span><span class="leg"></span><span class="sub"></span>`;
      const legend = data.legend || data.bind.replace(/^&/, "");
      btn.querySelector(".phys").textContent = legend === meta.phys ? "" : meta.phys;
      btn.querySelector(".leg").textContent = legend;
      btn.querySelector(".sub").textContent = data.sub || "";
      if (interactive) {
        btn.addEventListener("click", () => {
          selected = id;
          renderKeyboard(root, true);
          fillInspector();
        });
      }
      row.appendChild(btn);
    });
    root.appendChild(row);
  });
}

function range(a, b) {
  return Array.from({ length: b - a }, (_, i) => a + i);
}

function fillInspector() {
  const data = state.layers[layer][selected];
  const meta = KEYS[selected];
  document.getElementById("insp-phys").value = meta.phys + "  ·  层 " + ["字母", "符号", "功能"][layer];
  document.getElementById("insp-legend").value = data.legend;
  document.getElementById("insp-sub").value = data.sub;
  document.getElementById("insp-bind").value = data.bind;
  const sel = document.getElementById("insp-preset");
  const hit = PRESETS.findIndex((p) => p[1] === data.bind);
  sel.value = String(hit >= 0 ? hit : 0);
}

function bindInspector() {
  const sel = document.getElementById("insp-preset");
  PRESETS.forEach((p, i) => {
    const o = document.createElement("option");
    o.value = String(i);
    o.textContent = p[0];
    sel.appendChild(o);
  });
  sel.addEventListener("change", () => {
    const p = PRESETS[Number(sel.value)];
    if (!p[1]) return;
    const data = state.layers[layer][selected];
    data.bind = p[1];
    data.legend = p[0].replace(/^字母 |^数字 /, "");
    if (data.legend.length > 8) data.legend = p[1].replace(/^&\w+\s*/, "").slice(0, 8);
    document.getElementById("insp-bind").value = data.bind;
    document.getElementById("insp-legend").value = data.legend;
    renderKeyboard(document.getElementById("keyboard"), true);
    refreshPreview();
  });
  ["insp-legend", "insp-sub", "insp-bind"].forEach((id) => {
    document.getElementById(id).addEventListener("input", () => {
      const data = state.layers[layer][selected];
      data.legend = document.getElementById("insp-legend").value;
      data.sub = document.getElementById("insp-sub").value;
      data.bind = document.getElementById("insp-bind").value.trim();
      renderKeyboard(document.getElementById("keyboard"), true);
      refreshPreview();
    });
  });
}

const LED_FX = [
  { id: 0, name: "关闭" },
  { id: 1, name: "常亮" },
  { id: 2, name: "1闪1顿" },
  { id: 3, name: "2闪1顿" },
  { id: 4, name: "3闪1顿" },
  { id: 5, name: "4闪1顿" },
  { id: 6, name: "5闪1顿" },
  { id: 7, name: "均匀闪烁" },
  { id: 8, name: "呼吸灯" },
  { id: 9, name: "频闪" },
  { id: 10, name: "心跳" },
  { id: 11, name: "长脉冲" },
];

const LED_SLOTS = [
  { id: "alpha", key: "CONFIG_ZMK_LED_LAYER0_PATTERN", title: "字母层", desc: "上层 4 灯（Call / BB / Back / 挂断）", ch: "top" },
  { id: "sym", key: "CONFIG_ZMK_LED_LAYER1_PATTERN", title: "符号层", desc: "上层 4 灯", ch: "top" },
  { id: "util", key: "CONFIG_ZMK_LED_LAYER2_PATTERN", title: "功能层", desc: "上层 4 灯", ch: "top" },
  { id: "idle", key: "CONFIG_ZMK_LED_PAD_IDLE_PATTERN", title: "触控板 · 鼠标", desc: "默认划动、Caps 关", ch: "pad" },
  { id: "caps", key: "CONFIG_ZMK_LED_PAD_CAPS_PATTERN", title: "触控板 · Caps", desc: "大小写开", ch: "pad" },
  { id: "scroll", key: "CONFIG_ZMK_LED_PAD_SCROLL_PATTERN", title: "触控板 · 滚动", desc: "Blackberry 单击", ch: "pad" },
  { id: "arrow", key: "CONFIG_ZMK_LED_PAD_ARROW_PATTERN", title: "触控板 · 方向键", desc: "Blackberry 双击", ch: "pad" },
];

const ledFxMem = {};

function fxBurst(flashes, pause, step, max) {
  const onoff = flashes * 2;
  const period = onoff + pause;
  const phase = step % period;
  return phase < onoff && phase % 2 === 0 ? max : 0;
}

function fxTick(pattern, slotId) {
  const pause = Number(state.conf.CONFIG_ZMK_LED_BURST_PAUSE_TICKS) || 4;
  const max = 100;
  const min = Number(state.conf.CONFIG_ZMK_IDICATOR_LAYER_CYCLE_MINBRT) || 20;
  const stepSz = Number(state.conf.CONFIG_ZMK_IDICATOR_BRT_STEP) || 5;
  if (!ledFxMem[slotId]) ledFxMem[slotId] = { step: 0, brt: min, dir: 1 };
  const s = ledFxMem[slotId];
  s.step++;
  switch (Number(pattern)) {
    case 1: return max;
    case 2: return fxBurst(1, pause, s.step, max);
    case 3: return fxBurst(2, pause, s.step, max);
    case 4: return fxBurst(3, pause, s.step, max);
    case 5: return fxBurst(4, pause, s.step, max);
    case 6: return fxBurst(5, pause, s.step, max);
    case 7: return (s.step % 4) < 2 ? max : 0;
    case 9: return s.step % 2 ? max : 0;
    case 10: return (s.step % 10 === 0 || s.step % 10 === 2) ? max : 0;
    case 11: return (s.step % 8) < 5 ? max : 0;
    case 8: {
      s.brt += s.dir * stepSz;
      if (s.brt >= max) { s.brt = max; s.dir = -1; }
      if (s.brt <= min) { s.brt = min; s.dir = 1; }
      return s.brt;
    }
    default: return 0;
  }
}

function applyLedMode() {
  const kb = document.getElementById("led-keyboard");
  if (!kb) return;
  const slot = LED_SLOTS.find((m) => m.id === ledMode) || LED_SLOTS[1];
  const brt = fxTick(state.conf[slot.key], slot.id);
  kb.style.setProperty("--top-glow", slot.ch === "top" ? String(brt) : "0");
  kb.style.setProperty("--pad-glow", slot.ch === "pad" ? String(brt) : "0");
  kb.classList.toggle("glow-back", true);
  document.querySelectorAll("#led-cards .led-card").forEach((card, i) => {
    const m = LED_SLOTS[i];
    if (!m) return;
    const v = fxTick(state.conf[m.key], m.id + "-dot");
    const dot = card.querySelector(".dot");
    dot.classList.toggle("on", v > 8);
    dot.style.opacity = String(Math.max(0.15, v / 100));
  });
}

function renderLedCards() {
  const host = document.getElementById("led-cards");
  host.innerHTML = "";
  LED_SLOTS.forEach((m) => {
    const el = document.createElement("div");
    el.className = "led-card" + (ledMode === m.id ? " active" : "");
    const color = m.ch === "pad" ? "mint" : "amber";
    el.innerHTML = `<div class="dot ${color}"></div><div><b></b><span></span><select></select></div>`;
    el.querySelector("b").textContent = m.title;
    el.querySelector("span").textContent = m.desc;
    const sel = el.querySelector("select");
    LED_FX.forEach((fx) => {
      const o = document.createElement("option");
      o.value = String(fx.id);
      o.textContent = fx.name;
      sel.appendChild(o);
    });
    sel.value = String(state.conf[m.key] ?? 0);
    sel.addEventListener("click", (e) => e.stopPropagation());
    sel.addEventListener("change", () => {
      state.conf[m.key] = Number(sel.value);
      ledMode = m.id;
      ledFxMem[m.id] = { step: 0, brt: 20, dir: 1 };
      renderLedCards();
      refreshPreview();
    });
    el.addEventListener("click", () => {
      ledMode = m.id;
      renderLedCards();
      applyLedMode();
    });
    host.appendChild(el);
  });
}

function refreshPreview() {
  const pre = document.getElementById("preview");
  if (!pre) return;
  pre.textContent = previewFile === "conf" ? generateConf() : previewFile === "keymap" ? generateKeymap() : generateJson();
}

function showTab(id) {
  document.querySelectorAll(".panel").forEach((p) => p.classList.toggle("active", p.id === "tab-" + id));
  document.querySelectorAll("#tabs button").forEach((b) => b.classList.toggle("active", b.dataset.tab === id));
  if (id === "keys") renderKeyboard(document.getElementById("keyboard"), true);
  if (id === "leds") {
    layer = 0;
    renderKeyboard(document.getElementById("led-keyboard"), false);
    applyLedMode();
  }
  if (id === "export") refreshPreview();
}

function init() {
  const confHost = document.getElementById("conf-fields");
  renderFields(confHost, CONF_FIELDS.concat(TIMING_FIELDS.map((f) => ({ ...f, group: "time" }))), []);
  const extra = document.createElement("p");
  extra.className = "note";
  extra.textContent = "下方时间参数写入 keymap（Alt / $ / Blackberry 的长按与双击判定）。";
  confHost.appendChild(extra);

  bindInspector();
  renderKeyboard(document.getElementById("keyboard"), true);
  fillInspector();
  renderKeyboard(document.getElementById("led-keyboard"), false);
  renderLedCards();
  renderFields(document.getElementById("led-conf"), LED_CONF, BOOL_CONF);

  document.getElementById("tabs").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (b) showTab(b.dataset.tab);
  });
  document.getElementById("layer-bar").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    layer = Number(b.dataset.layer);
    document.querySelectorAll("#layer-bar button").forEach((x) => x.classList.toggle("active", x === b));
    renderKeyboard(document.getElementById("keyboard"), true);
    fillInspector();
  });
  document.getElementById("reset-conf").onclick = () => {
    const d = defaultState();
    state.conf = d.conf;
    state.timing = d.timing;
    renderFields(confHost, CONF_FIELDS.concat(TIMING_FIELDS.map((f) => ({ ...f, group: "time" }))), []);
    refreshPreview();
    toast("触控板/时间已恢复默认");
  };
  document.getElementById("reset-layer").onclick = () => {
    state.layers[layer] = defaultLayers()[layer];
    renderKeyboard(document.getElementById("keyboard"), true);
    fillInspector();
    refreshPreview();
  };
  document.getElementById("reset-keys").onclick = () => {
    state.layers = defaultLayers();
    renderKeyboard(document.getElementById("keyboard"), true);
    fillInspector();
    refreshPreview();
  };
  document.getElementById("save-local").onclick = saveLocal;
  document.getElementById("save-folder").onclick = saveFolder;
  document.getElementById("dl-conf").onclick = () => download("bbq10.conf", generateConf());
  document.getElementById("dl-keymap").onclick = () => download("bbq10.keymap", generateKeymap());
  document.getElementById("dl-json").onclick = () => download("q10-config.json", generateJson());
  document.getElementById("import-json").addEventListener("change", async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const parsed = JSON.parse(await file.text());
    const base = defaultState();
    state = {
      conf: { ...base.conf, ...parsed.conf },
      timing: { ...base.timing, ...parsed.timing },
      layers: parsed.layers?.length === 3 ? parsed.layers : base.layers,
    };
    localStorage.setItem(STORAGE, JSON.stringify(state));
    location.reload();
  });
  document.getElementById("file-tabs").addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    previewFile = b.dataset.file;
    document.querySelectorAll("#file-tabs button").forEach((x) => x.classList.toggle("active", x === b));
    refreshPreview();
  });
  refreshPreview();
  setInterval(() => {
    ledTick += 1;
    applyLedMode();
  }, 120);
}

init();
