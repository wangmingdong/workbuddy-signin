import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
//#region ../../packages/agent-ui/src/utils/theme.ts
/**
* 获取主题管理器实例
*/
function getThemeManager() {
	if (!themeManager) themeManager = new ThemeManager();
	return themeManager;
}
/**
* 设置主题（便捷函数）
*/
function setTheme(theme) {
	getThemeManager().setTheme(theme);
}
/**
* 切换主题（便捷函数）
*/
function toggleTheme() {
	getThemeManager().toggleTheme();
}
/**
* 获取当前主题（便捷函数）
*/
function getCurrentTheme() {
	return getThemeManager().getTheme();
}
/**
* 添加主题变化监听器（便捷函数）
*/
function addThemeListener(listener) {
	return getThemeManager().addListener(listener);
}
/**
* 检测是否在 VSCode 环境中（便捷函数）
*/
function isVSCodeEnvironment() {
	return getThemeManager().isVSCodeEnvironment();
}
var THEME_STORAGE_KEY, ThemeManager, themeManager;
var init_theme = __esmMin((() => {
	THEME_STORAGE_KEY = "agent-ui-theme";
	ThemeManager = class {
		constructor() {
			this.listeners = /* @__PURE__ */ new Set();
			this.mediaQuery = null;
			this.vsCodeApi = null;
			this.themeObserver = null;
			this.themeSwitchCleanupFrame = null;
			this.handleSystemThemeChange = null;
			this.currentConfig = this.getInitialTheme();
			this.initializeVSCodeApi();
			this.initializeSystemThemeListener();
			this.initializeVSCodeThemeObserver();
			this.applyTheme();
		}
		/**
		* 初始化 VSCode 主题属性变化监听器
		* 当 VSCode 修改 body 上的 data-vscode-theme-kind 属性时，同步更新类名
		*/
		initializeVSCodeThemeObserver() {
			if (typeof document === "undefined") return;
			this.themeObserver = new MutationObserver((mutations) => {
				for (const mutation of mutations) if (mutation.type === "attributes" && mutation.attributeName === "data-vscode-theme-kind") this.syncThemeClassesFromAttribute();
			});
			this.themeObserver.observe(document.body, {
				attributes: true,
				attributeFilter: ["data-vscode-theme-kind"]
			});
		}
		/**
		* 根据 body 上的 data-vscode-theme-kind 属性同步类名
		*/
		syncThemeClassesFromAttribute() {
			if (typeof document === "undefined") return;
			const root = document.documentElement;
			const body = document.body;
			const currentThemeKind = body.getAttribute("data-vscode-theme-kind");
			const isLight = currentThemeKind === "vscode-light" || currentThemeKind === "vscode-high-contrast-light";
			const themeClass = isLight ? "light" : "dark";
			const cbThemeClass = isLight ? "cb-light" : "cb-dark";
			const vsCodeThemeClass = isLight ? "vscode-light" : "vscode-dark";
			const oldThemeClass = isLight ? "dark" : "light";
			const oldCbThemeClass = isLight ? "cb-dark" : "cb-light";
			const oldVsCodeThemeClass = isLight ? "vscode-dark" : "vscode-light";
			root.classList.add(themeClass, cbThemeClass, vsCodeThemeClass);
			body.classList.add(themeClass, cbThemeClass, vsCodeThemeClass);
			root.classList.remove(oldThemeClass, oldCbThemeClass, oldVsCodeThemeClass);
			body.classList.remove(oldThemeClass, oldCbThemeClass, oldVsCodeThemeClass);
			root.style.colorScheme = isLight ? "light" : "dark";
			this.currentConfig.theme = isLight ? "light" : "dark";
			this.currentConfig.vsCodeThemeKind = currentThemeKind;
			this.notifyListeners();
		}
		/**
		* 获取初始主题配置
		*/
		getInitialTheme() {
			try {
				const stored = localStorage.getItem(THEME_STORAGE_KEY);
				if (stored) {
					const config = JSON.parse(stored);
					const effectiveTheme = config.followSystem ? this.getSystemTheme() : config.theme;
					const isLight = effectiveTheme === "light";
					return {
						...config,
						theme: effectiveTheme,
						vsCodeThemeName: config.vsCodeThemeName || (isLight ? "IDE Light" : "IDE Night"),
						vsCodeThemeKind: config.vsCodeThemeKind || (isLight ? "vscode-light" : "vscode-dark")
					};
				}
			} catch (error) {
				console.warn("[Theme] Failed to load theme from localStorage:", error);
			}
			const vsCodeTheme = this.getVSCodeTheme();
			if (vsCodeTheme) return {
				theme: vsCodeTheme.kind === "vscode-light" || vsCodeTheme.kind === "vscode-high-contrast-light" ? "light" : "dark",
				followSystem: false,
				vsCodeThemeName: vsCodeTheme.name,
				vsCodeThemeKind: vsCodeTheme.kind
			};
			return {
				theme: "light",
				followSystem: false,
				vsCodeThemeName: "IDE Light",
				vsCodeThemeKind: "vscode-light"
			};
		}
		/**
		* 初始化 VSCode API
		*/
		initializeVSCodeApi() {
			if (typeof window !== "undefined") {
				if (typeof window.acquireVsCodeApi === "function") try {
					this.vsCodeApi = window.acquireVsCodeApi();
				} catch (error) {
					console.warn("[Theme] Failed to acquire VSCode API:", error);
				}
			}
		}
		/**
		* 获取 VSCode 主题信息
		* 仅在 VSCode 环境中有效，Cloud 模式直接返回 null
		*/
		getVSCodeTheme() {
			if (typeof document === "undefined") return null;
			const body = document.body;
			const themeName = body.getAttribute("data-vscode-theme-name");
			const themeKind = body.getAttribute("data-vscode-theme-kind");
			if (themeName && themeKind) return {
				name: themeName,
				kind: themeKind
			};
			return null;
		}
		/**
		* 初始化系统主题监听器
		*/
		initializeSystemThemeListener() {
			if (typeof window === "undefined") return;
			this.mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
			this.handleSystemThemeChange = () => {
				if (this.currentConfig.followSystem) {
					this.currentConfig.theme = this.getSystemTheme();
					this.applyTheme();
					this.notifyListeners();
				}
			};
			if (this.mediaQuery.addEventListener) this.mediaQuery.addEventListener("change", this.handleSystemThemeChange);
			else this.mediaQuery.addListener(this.handleSystemThemeChange);
		}
		/**
		* 获取系统主题
		*/
		getSystemTheme() {
			if (typeof window === "undefined") return "dark";
			return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
		}
		/**
		* 应用主题到 DOM
		*/
		applyTheme() {
			if (typeof document === "undefined") return;
			const { theme, vsCodeThemeName, vsCodeThemeKind } = this.currentConfig;
			const root = document.documentElement;
			const body = document.body;
			const finalThemeName = vsCodeThemeName || (theme === "light" ? "IDE Light" : "IDE Night");
			const finalThemeKind = vsCodeThemeKind || (theme === "light" ? "vscode-light" : "vscode-dark");
			body.setAttribute("data-vscode-theme-name", finalThemeName);
			body.setAttribute("data-vscode-theme-kind", finalThemeKind);
			const currentThemeKind = body.getAttribute("data-vscode-theme-kind");
			const isLight = currentThemeKind === "vscode-light" || currentThemeKind === "vscode-high-contrast-light";
			const themeClass = isLight ? "light" : "dark";
			const cbThemeClass = isLight ? "cb-light" : "cb-dark";
			const vsCodeThemeClass = isLight ? "vscode-light" : "vscode-dark";
			const oldThemeClass = isLight ? "dark" : "light";
			const oldCbThemeClass = isLight ? "cb-dark" : "cb-light";
			const oldVsCodeThemeClass = isLight ? "vscode-dark" : "vscode-light";
			if (this.themeSwitchCleanupFrame !== null) window.cancelAnimationFrame(this.themeSwitchCleanupFrame);
			root.classList.add("theme-switching");
			body.classList.add("theme-switching");
			root.classList.remove(oldThemeClass, oldCbThemeClass, oldVsCodeThemeClass);
			body.classList.remove(oldThemeClass, oldCbThemeClass, oldVsCodeThemeClass);
			root.classList.add(themeClass, cbThemeClass, vsCodeThemeClass);
			body.classList.add(themeClass, cbThemeClass, vsCodeThemeClass);
			root.style.colorScheme = isLight ? "light" : "dark";
			this.themeSwitchCleanupFrame = window.requestAnimationFrame(() => {
				this.themeSwitchCleanupFrame = window.requestAnimationFrame(() => {
					root.classList.remove("theme-switching");
					body.classList.remove("theme-switching");
					this.themeSwitchCleanupFrame = null;
				});
			});
		}
		/**
		* 保存主题配置到本地存储
		*/
		saveTheme() {
			try {
				localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(this.currentConfig));
			} catch (error) {
				console.warn("[Theme] Failed to save theme to localStorage:", error);
			}
		}
		/**
		* 通知监听器
		*/
		notifyListeners() {
			const configSnapshot = { ...this.currentConfig };
			this.listeners.forEach((listener) => {
				try {
					listener(configSnapshot);
				} catch (error) {
					console.error("[Theme] Error in theme change listener:", error);
				}
			});
		}
		/**
		* 设置主题
		*/
		setTheme(theme) {
			if (theme === "auto") {
				this.currentConfig.followSystem = true;
				this.currentConfig.theme = this.getSystemTheme();
			} else {
				this.currentConfig.followSystem = false;
				this.currentConfig.theme = theme;
			}
			const isLight = this.currentConfig.theme === "light";
			const availableTheme = this.findMatchingThemeName(isLight);
			this.currentConfig.vsCodeThemeName = availableTheme || (isLight ? "IDE Light" : "IDE Night");
			this.currentConfig.vsCodeThemeKind = isLight ? "vscode-light" : "vscode-dark";
			this.applyTheme();
			this.saveTheme();
			this.notifyListeners();
		}
		/**
		* 从 stylesheets 中查找匹配的主题名称
		*/
		findMatchingThemeName(isLight) {
			try {
				const styleSheets = document.styleSheets;
				for (let i = 0; i < styleSheets.length; i++) try {
					const sheet = styleSheets[i];
					const rules = sheet.cssRules || sheet.rules;
					if (!rules) continue;
					for (let j = 0; j < rules.length; j++) {
						const rule = rules[j];
						if (rule instanceof CSSStyleRule) {
							const match = rule.selectorText?.match(/\[data-vscode-theme-name=["']([^"']+)["']\]/);
							if (match && match[1]) {
								const themeName = match[1];
								const themeIsLight = themeName.toLowerCase().includes("light");
								const themeIsDark = themeName.toLowerCase().includes("dark") || themeName.toLowerCase().includes("night");
								if (isLight && themeIsLight) return themeName;
								if (!isLight && themeIsDark) return themeName;
							}
						}
					}
				} catch (e) {
					continue;
				}
			} catch (error) {
				console.warn("[Theme] Error finding matching theme name:", error);
			}
			return null;
		}
		/**
		* 切换主题
		*/
		toggleTheme() {
			const newTheme = this.currentConfig.theme === "light" ? "dark" : "light";
			this.setTheme(newTheme);
		}
		/**
		* 获取当前主题配置
		*/
		getTheme() {
			return { ...this.currentConfig };
		}
		/**
		* 添加主题变化监听器
		*/
		addListener(listener) {
			this.listeners.add(listener);
			return () => {
				this.listeners.delete(listener);
			};
		}
		/**
		* 移除主题变化监听器
		*/
		removeListener(listener) {
			this.listeners.delete(listener);
		}
		/**
		* 检测是否在 VSCode 环境中
		*/
		isVSCodeEnvironment() {
			return !!this.currentConfig.vsCodeThemeName || !!this.vsCodeApi;
		}
		/**
		* 销毁主题管理器
		*/
		destroy() {
			if (this.mediaQuery && this.handleSystemThemeChange) if (this.mediaQuery.removeEventListener) this.mediaQuery.removeEventListener("change", this.handleSystemThemeChange);
			else this.mediaQuery.removeListener(this.handleSystemThemeChange);
			if (this.themeObserver) {
				this.themeObserver.disconnect();
				this.themeObserver = null;
			}
			if (this.themeSwitchCleanupFrame !== null) {
				window.cancelAnimationFrame(this.themeSwitchCleanupFrame);
				this.themeSwitchCleanupFrame = null;
			}
			this.listeners.clear();
		}
	};
	themeManager = null;
	if (typeof window !== "undefined") if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => {
		getThemeManager();
	});
	else getThemeManager();
}));
//#endregion
//#region ../../packages/agent-ui/src/utils/useTheme.ts
/**
* React Hook: 使用主题
*
* @example
* ```tsx
* import { useTheme } from './utils/useTheme';
*
* function MyComponent() {
*   const { theme, setTheme, toggleTheme, followSystem } = useTheme();
*
*   return (
*     <div>
*       <p>Current theme: {theme}</p>
*       <button onClick={() => setTheme('light')}>Light</button>
*       <button onClick={() => setTheme('dark')}>Dark</button>
*       <button onClick={toggleTheme}>Toggle</button>
*     </div>
*   );
* }
* ```
*/
function useTheme() {
	const [themeConfig, setThemeConfig] = (0, import_react.useState)(() => getCurrentTheme());
	(0, import_react.useEffect)(() => {
		return addThemeListener((newConfig) => {
			setThemeConfig(newConfig);
		});
	}, []);
	return {
		...themeConfig,
		setTheme,
		toggleTheme,
		isVSCodeEnvironment: isVSCodeEnvironment()
	};
}
/**
* React Hook: 监听主题变化
*
* 只监听主题变化，不返回设置函数，适用于只需要响应主题变化的组件
*
* @example
* ```tsx
* import { useThemeListener } from './utils/useTheme';
*
* function ThemedComponent() {
*   const { theme } = useThemeListener();
*
*   return (
*     <div className={`themed-component ${theme}`}>
*       Content adapts to {theme} theme
*     </div>
*   );
* }
* ```
*/
function useThemeListener() {
	const [themeConfig, setThemeConfig] = (0, import_react.useState)(() => getCurrentTheme());
	(0, import_react.useEffect)(() => {
		return addThemeListener(setThemeConfig);
	}, []);
	return {
		theme: themeConfig.theme,
		followSystem: themeConfig.followSystem,
		vsCodeThemeName: themeConfig.vsCodeThemeName,
		vsCodeThemeKind: themeConfig.vsCodeThemeKind
	};
}
var import_react;
var init_useTheme = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_theme();
}));
//#endregion
export { getCurrentTheme as a, addThemeListener as i, useTheme as n, init_theme as o, useThemeListener as r, init_useTheme as t };
