import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { Ba as Tooltip$1, Ga as FloatingPortal, Ja as useClick, Ka as init_floating_ui_react, Qa as useInteractions, Ua as FloatingFocusManager, Wa as FloatingOverlay, Xa as useFloating, Ya as useDismiss, Yr as toast, Za as useHover, eo as useRole, io as shift, no as flip, oo as autoUpdate, ro as offset, t as init_src, to as arrow } from "./src-DRGoWjIu.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { t as require_jsx_runtime } from "./jsx-runtime-BNEdAQtr.js";
import { It as ChevronUp, r as X, t as init_lucide_react, zt as ChevronDown } from "./lucide-react-CmX0JwWL.js";
import { t as require_client } from "./client-BPkZUIji.js";
import { a as init_i18n, n as getLocale } from "./i18n-Bt_Wap4p.js";
import { Ct as SearchIcon, E as XCloseIcon, Rr as init_Icon$1, ir as ChevronDownIcon, n as init_icons, nr as ChevronRightIcon, wn as HelpCircleIcon, wt as init_SearchIcon } from "./icons-Cj3UopO9.js";
import { i as useFloatingLayer, n as useFloating$1, r as init_use_floating_layer, t as init_floating } from "./floating-1_OFz6f-.js";
import { n as useI18n, r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
//#region ../../packages/agent-ui/src/foundation/tokens/types.ts
var init_types = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/tokens/colors.tokens.ts
var colorTokens;
var init_colors_tokens = __esmMin((() => {
	colorTokens = [
		{
			name: "--wb-brand-primary",
			category: "button",
			value: {
				light: "var(--wb-palette-brand-8)",
				dark: "var(--wb-palette-brand-7)"
			},
			usage: "基础/兼容别名 token：--wb-brand-primary"
		},
		{
			name: "--wb-text-strong",
			category: "text",
			value: {
				light: "var(--wb-color-text-primary)",
				dark: "var(--wb-color-text-primary)"
			},
			usage: "基础/兼容别名 token：--wb-text-strong"
		},
		{
			name: "--wb-text-medium",
			category: "text",
			value: {
				light: "var(--wb-color-text-secondary)",
				dark: "var(--wb-color-text-secondary)"
			},
			usage: "基础/兼容别名 token：--wb-text-medium"
		},
		{
			name: "--wb-text-weak",
			category: "text",
			value: {
				light: "var(--wb-color-text-tertiary)",
				dark: "var(--wb-color-text-tertiary)"
			},
			usage: "基础/兼容别名 token：--wb-text-weak"
		},
		{
			name: "--wb-text-disable",
			category: "text",
			value: {
				light: "var(--wb-color-text-disabled)",
				dark: "var(--wb-color-text-disabled)"
			},
			usage: "基础/兼容别名 token：--wb-text-disable"
		},
		{
			name: "--wb-text-white",
			category: "text",
			value: {
				light: "var(--wb-palette-white-100)",
				dark: "var(--wb-palette-white-100)"
			},
			usage: "基础/兼容别名 token：--wb-text-white"
		},
		{
			name: "--wb-text-muted",
			category: "text",
			value: {
				light: "var(--wb-color-text-disabled)",
				dark: "var(--wb-color-text-disabled)"
			},
			usage: "基础/兼容别名 token：--wb-text-muted"
		},
		{
			name: "--wb-text-link",
			category: "text",
			value: {
				light: "var(--wb-palette-brand-8)",
				dark: "var(--wb-color-text-brand-default)"
			},
			usage: "基础/兼容别名 token：--wb-text-link"
		},
		{
			name: "--wb-text-on-primary",
			category: "text",
			value: {
				light: "var(--wb-palette-white-100)",
				dark: "var(--wb-palette-white-100)"
			},
			usage: "基础/兼容别名 token：--wb-text-on-primary"
		},
		{
			name: "--wb-bg-primary",
			category: "bg",
			value: {
				light: "var(--wb-palette-white-100)",
				dark: "var(--wb-palette-gray-3)"
			},
			usage: "基础/兼容别名 token：--wb-bg-primary"
		},
		{
			name: "--wb-bg-secondary",
			category: "bg",
			value: {
				light: "var(--wb-color-bg-secondary-hover-active)",
				dark: "var(--wb-palette-gray-2)"
			},
			usage: "基础/兼容别名 token：--wb-bg-secondary"
		},
		{
			name: "--wb-bg-tertiary",
			category: "bg",
			value: {
				light: "var(--wb-color-bg-primary-hover)",
				dark: "var(--wb-palette-gray-4)"
			},
			usage: "基础/兼容别名 token：--wb-bg-tertiary"
		},
		{
			name: "--wb-bg-hover",
			category: "bg",
			value: {
				light: "color-mix(in srgb, var(--wb-palette-black-100) 5%, transparent)",
				dark: "color-mix(in srgb, var(--wb-palette-white-100) 6%, transparent)"
			},
			usage: "基础/兼容别名 token：--wb-bg-hover"
		},
		{
			name: "--wb-bg-hover-light",
			category: "bg",
			value: {
				light: "var(--wb-palette-gray-3)",
				dark: "color-mix(in srgb, var(--wb-palette-white-100) 8%, transparent)"
			},
			usage: "基础/兼容别名 token：--wb-bg-hover-light"
		},
		{
			name: "--wb-bg-active",
			category: "bg",
			value: {
				light: "color-mix(in srgb, var(--wb-palette-black-100) 8%, transparent)",
				dark: "var(--wb-palette-white-10)"
			},
			usage: "基础/兼容别名 token：--wb-bg-active"
		},
		{
			name: "--wb-bg-overlay",
			category: "bg",
			value: {
				light: "var(--wb-palette-black-40)",
				dark: "var(--wb-palette-black-60)"
			},
			usage: "基础/兼容别名 token：--wb-bg-overlay"
		},
		{
			name: "--wb-border-default",
			category: "border",
			value: {
				light: "color-mix(in srgb, var(--wb-palette-black-100) 8%, transparent)",
				dark: "color-mix(in srgb, var(--wb-palette-black-100) 8%, transparent)"
			},
			usage: "基础/兼容别名 token：--wb-border-default"
		},
		{
			name: "--wb-border-weak",
			category: "border",
			value: {
				light: "color-mix(in srgb, var(--wb-palette-black-100) 4%, transparent)",
				dark: "color-mix(in srgb, var(--wb-palette-black-100) 4%, transparent)"
			},
			usage: "基础/兼容别名 token：--wb-border-weak"
		},
		{
			name: "--wb-border-subtle",
			category: "border",
			value: {
				light: "var(--wb-palette-gray-3)",
				dark: "color-mix(in srgb, var(--wb-palette-white-100) 6%, transparent)"
			},
			usage: "基础/兼容别名 token：--wb-border-subtle"
		},
		{
			name: "--wb-border-strong",
			category: "border",
			value: {
				light: "var(--wb-color-border-primary)",
				dark: "var(--wb-color-border-primary)"
			},
			usage: "基础/兼容别名 token：--wb-border-strong"
		},
		{
			name: "--wb-border-focus",
			category: "border",
			value: {
				light: "var(--wb-color-border-focus)",
				dark: "var(--wb-color-border-focus)"
			},
			usage: "基础/兼容别名 token：--wb-border-focus"
		},
		{
			name: "--wb-control-selected-bg",
			category: "bg",
			value: {
				light: "var(--wb-palette-black-90)",
				dark: "var(--wb-color-text-brand-default)"
			},
			usage: "基础/兼容别名 token：--wb-control-selected-bg"
		},
		{
			name: "--wb-control-selected-bg-hover",
			category: "bg",
			value: {
				light: "color-mix(in srgb, var(--wb-palette-black-100) 96%, transparent)",
				dark: "var(--wb-color-text-brand-hover)"
			},
			usage: "基础/兼容别名 token：--wb-control-selected-bg-hover"
		},
		{
			name: "--wb-control-selected-fg",
			category: "text",
			value: {
				light: "var(--wb-palette-white-100)",
				dark: "var(--wb-palette-white-100)"
			},
			usage: "基础/兼容别名 token：--wb-control-selected-fg"
		},
		{
			name: "--wb-control-selected-bg-active",
			category: "bg",
			value: {
				light: "var(--wb-palette-black-100)",
				dark: "rgba(255, 255, 255, 0.75)"
			},
			usage: "基础/兼容别名 token：--wb-control-selected-bg-active"
		},
		{
			name: "--wb-control-action-bg",
			category: "bg",
			value: {
				light: "var(--wb-palette-brand-5)",
				dark: "var(--wb-palette-blue-6)"
			},
			usage: "基础/兼容别名 token：--wb-control-action-bg"
		},
		{
			name: "--wb-success",
			category: "status",
			value: {
				light: "var(--wb-status-success)",
				dark: "var(--wb-status-success)"
			},
			usage: "基础/兼容别名 token：--wb-success"
		},
		{
			name: "--wb-warning",
			category: "status",
			value: {
				light: "var(--wb-status-warning)",
				dark: "var(--wb-status-warning)"
			},
			usage: "基础/兼容别名 token：--wb-warning"
		},
		{
			name: "--wb-error",
			category: "status",
			value: {
				light: "var(--wb-status-error)",
				dark: "var(--wb-status-error)"
			},
			usage: "基础/兼容别名 token：--wb-error"
		},
		{
			name: "--wb-info",
			category: "status",
			value: {
				light: "var(--wb-status-info)",
				dark: "var(--wb-status-info)"
			},
			usage: "基础/兼容别名 token：--wb-info"
		},
		{
			name: "--wb-warning-soft",
			category: "status",
			value: {
				light: "var(--wb-status-warning-soft)",
				dark: "var(--wb-status-warning-soft)"
			},
			usage: "基础/兼容别名 token：--wb-warning-soft"
		},
		{
			name: "--wb-error-foreground",
			category: "status",
			value: {
				light: "var(--wb-status-error)",
				dark: "var(--wb-status-error)"
			},
			usage: "基础/兼容别名 token：--wb-error-foreground"
		},
		{
			name: "--wb-text-inverse",
			category: "text",
			value: {
				light: "var(--wb-text-white)",
				dark: "var(--wb-text-white)"
			},
			usage: "基础/兼容别名 token：--wb-text-inverse"
		},
		{
			name: "--wb-bg-inverse",
			category: "bg",
			value: {
				light: "var(--wb-color-text-primary)",
				dark: "var(--wb-color-text-primary)"
			},
			usage: "基础/兼容别名 token：--wb-bg-inverse"
		},
		{
			name: "--wb-text-on-inverse",
			category: "text",
			value: {
				light: "var(--wb-text-white)",
				dark: "var(--wb-palette-black-90)"
			},
			usage: "基础/兼容别名 token：--wb-text-on-inverse"
		},
		{
			name: "--wb-icon-default",
			category: "icon",
			value: {
				light: "var(--wb-icon-primary)",
				dark: "var(--wb-icon-primary)"
			},
			usage: "基础/兼容别名 token：--wb-icon-default"
		},
		{
			name: "--wb-home-bg-primary",
			category: "bg",
			value: {
				light: "#f2f2f2",
				dark: "#1f1f1f"
			},
			usage: "基础/兼容别名 token：--wb-home-bg-primary"
		},
		{
			name: "--wb-home-bg-secondary",
			category: "bg",
			value: {
				light: "#fafafa",
				dark: "#141414"
			},
			usage: "基础/兼容别名 token：--wb-home-bg-secondary"
		},
		{
			name: "--wb-home-input-slot-bg",
			category: "bg",
			value: {
				light: "linear-gradient(180deg, #f0f0f0 0%, #f5f5f5 100%)",
				dark: "#292929"
			},
			usage: "基础/兼容别名 token：--wb-home-input-slot-bg"
		},
		{
			name: "--wb-quick-action-sub-item-bg",
			category: "bg",
			value: {
				light: "#ebebeb",
				dark: "rgba(255, 255, 255, 0.14)"
			},
			usage: "基础/兼容别名 token：--wb-quick-action-sub-item-bg"
		},
		{
			name: "--wb-bg-slate",
			category: "bg",
			value: {
				light: "#64748B",
				dark: "#64748B"
			},
			usage: "基础/兼容别名 token：--wb-bg-slate"
		},
		{
			name: "--wb-bg-gold-start",
			category: "bg",
			value: {
				light: "#C2A979",
				dark: "#C2A979"
			},
			usage: "基础/兼容别名 token：--wb-bg-gold-start"
		},
		{
			name: "--wb-bg-gold-end",
			category: "bg",
			value: {
				light: "#8F6E30",
				dark: "#8F6E30"
			},
			usage: "基础/兼容别名 token：--wb-bg-gold-end"
		},
		{
			name: "--wb-brand-primary-subtle",
			category: "button",
			value: {
				light: "rgba(0, 194, 154, 0.12)",
				dark: "rgba(0, 194, 154, 0.16)"
			},
			usage: "基础/兼容别名 token：--wb-brand-primary-subtle"
		},
		{
			name: "--wb-brand-primary-deep",
			category: "button",
			value: {
				light: "#087866",
				dark: "#0DBFA3"
			},
			usage: "基础/兼容别名 token：--wb-brand-primary-deep"
		},
		{
			name: "--wb-brand-accent",
			category: "button",
			value: {
				light: "#1f1f1f",
				dark: "#E0E0E0"
			},
			usage: "基础/兼容别名 token：--wb-brand-accent"
		},
		{
			name: "--wb-brand-accent-bg",
			category: "button",
			value: {
				light: "var(--wb-palette-purple-1)",
				dark: "var(--wb-palette-purple-1)"
			},
			usage: "基础/兼容别名 token：--wb-brand-accent-bg"
		},
		{
			name: "--wb-brand-icon-bg",
			category: "button",
			value: {
				light: "var(--wb-palette-green-1)",
				dark: "#0e2520"
			},
			usage: "基础/兼容别名 token：--wb-brand-icon-bg"
		},
		{
			name: "--wb-bg-card",
			category: "bg",
			value: {
				light: "var(--wb-palette-white-100)",
				dark: "#242424"
			},
			usage: "基础/兼容别名 token：--wb-bg-card"
		},
		{
			name: "--wb-bg-card-strong",
			category: "bg",
			value: {
				light: "#F5F5F5",
				dark: "#252525"
			},
			usage: "基础/兼容别名 token：--wb-bg-card-strong"
		},
		{
			name: "--wb-bg-item-selected",
			category: "bg",
			value: {
				light: "#f4f5f5",
				dark: "#272B2B"
			},
			usage: "基础/兼容别名 token：--wb-bg-item-selected"
		},
		{
			name: "--wb-bg-popover",
			category: "bg",
			value: {
				light: "var(--wb-palette-white-100)",
				dark: "#2C2C2C"
			},
			usage: "基础/兼容别名 token：--wb-bg-popover"
		},
		{
			name: "--wb-bg-elevated",
			category: "bg",
			value: {
				light: "#3c3c3c",
				dark: "#3C3C3C"
			},
			usage: "基础/兼容别名 token：--wb-bg-elevated"
		},
		{
			name: "--wb-bg-tab-active",
			category: "bg",
			value: {
				light: "#f1f3f6",
				dark: "#25282C"
			},
			usage: "基础/兼容别名 token：--wb-bg-tab-active"
		},
		{
			name: "--wb-bg-success-soft",
			category: "bg",
			value: {
				light: "#e8f5e9",
				dark: "#1D351E"
			},
			usage: "基础/兼容别名 token：--wb-bg-success-soft"
		},
		{
			name: "--wb-bg-error-soft",
			category: "bg",
			value: {
				light: "#fef2f2",
				dark: "#351D1D"
			},
			usage: "基础/兼容别名 token：--wb-bg-error-soft"
		},
		{
			name: "--wb-bg-purple-soft",
			category: "bg",
			value: {
				light: "rgba(124, 58, 237, 0.12)",
				dark: "rgba(124, 58, 237, 0.16)"
			},
			usage: "基础/兼容别名 token：--wb-bg-purple-soft"
		},
		{
			name: "--wb-bg-content",
			category: "bg",
			value: {
				light: "var(--wb-palette-white-100)",
				dark: "#1a1a1a"
			},
			usage: "基础/兼容别名 token：--wb-bg-content"
		},
		{
			name: "--wb-bg-input-inset",
			category: "bg",
			value: {
				light: "transparent",
				dark: "var(--wb-palette-gray-4)"
			},
			usage: "基础/兼容别名 token：--wb-bg-input-inset"
		},
		{
			name: "--wb-bg-tooltip",
			category: "bg",
			value: {
				light: "var(--wb-palette-black-90)",
				dark: "var(--wb-palette-black-90)"
			},
			usage: "基础/兼容别名 token：--wb-bg-tooltip"
		},
		{
			name: "--wb-bg-tooltip-hover",
			category: "bg",
			value: {
				light: "var(--wb-palette-black-75)",
				dark: "var(--wb-palette-black-75)"
			},
			usage: "基础/兼容别名 token：--wb-bg-tooltip-hover"
		},
		{
			name: "--wb-bg-modal",
			category: "bg",
			value: {
				light: "var(--wb-palette-white-100)",
				dark: "var(--wb-palette-gray-1)"
			},
			usage: "基础/兼容别名 token：--wb-bg-modal"
		},
		{
			name: "--wb-bg-skeleton",
			category: "bg",
			value: {
				light: "rgba(128, 128, 128, 0.1)",
				dark: "rgba(128, 128, 128, 0.1)"
			},
			usage: "基础/兼容别名 token：--wb-bg-skeleton"
		},
		{
			name: "--wb-border-card",
			category: "border",
			value: {
				light: "rgba(0, 0, 0, 0.08)",
				dark: "rgba(255, 255, 255, 0.10)"
			},
			usage: "基础/兼容别名 token：--wb-border-card"
		},
		{
			name: "--wb-border-hover",
			category: "border",
			value: {
				light: "rgba(0, 0, 0, 0.16)",
				dark: "var(--wb-palette-white-20)"
			},
			usage: "基础/兼容别名 token：--wb-border-hover"
		},
		{
			name: "--wb-border-action",
			category: "border",
			value: {
				light: "var(--wb-palette-blue-7)",
				dark: "var(--wb-palette-blue-4)"
			},
			usage: "基础/兼容别名 token：--wb-border-action"
		},
		{
			name: "--wb-border-teams",
			category: "border",
			value: {
				light: "var(--wb-palette-cyan-3)",
				dark: "var(--wb-palette-cyan-5)"
			},
			usage: "基础/兼容别名 token：--wb-border-teams"
		},
		{
			name: "--wb-border-popover",
			category: "border",
			value: {
				light: "color-mix(in srgb, var(--wb-palette-black-100) 6%, transparent)",
				dark: "color-mix(in srgb, var(--wb-palette-white-100) 10%, transparent)"
			},
			usage: "基础/兼容别名 token：--wb-border-popover"
		},
		{
			name: "--wb-border-popover-strong",
			category: "border",
			value: {
				light: "color-mix(in srgb, var(--wb-palette-black-100) 24%, transparent)",
				dark: "color-mix(in srgb, var(--wb-palette-white-100) 28%, transparent)"
			},
			usage: "基础/兼容别名 token：--wb-border-popover-strong"
		},
		{
			name: "--wb-border-control",
			category: "border",
			value: {
				light: "var(--wb-palette-gray-4)",
				dark: "color-mix(in srgb, var(--wb-palette-white-100) 22%, transparent)"
			},
			usage: "基础/兼容别名 token：--wb-border-control"
		},
		{
			name: "--wb-border-input",
			category: "border",
			value: {
				light: "var(--wb-palette-gray-3)",
				dark: "color-mix(in srgb, var(--wb-palette-white-100) 15%, transparent)"
			},
			usage: "基础/兼容别名 token：--wb-border-input"
		},
		{
			name: "--wb-border-warning",
			category: "border",
			value: {
				light: "#ffe1a8",
				dark: "#8E6D2F"
			},
			usage: "基础/兼容别名 token：--wb-border-warning"
		},
		{
			name: "--wb-border-error",
			category: "border",
			value: {
				light: "#fecdca",
				dark: "#B44841"
			},
			usage: "基础/兼容别名 token：--wb-border-error"
		},
		{
			name: "--wb-bg-warning-subtle",
			category: "bg",
			value: {
				light: "#fff8e6",
				dark: "rgba(180, 122, 0, 0.15)"
			},
			usage: "基础/兼容别名 token：--wb-bg-warning-subtle"
		},
		{
			name: "--wb-border-warning-subtle",
			category: "border",
			value: {
				light: "#ffe1a8",
				dark: "rgba(180, 122, 0, 0.30)"
			},
			usage: "基础/兼容别名 token：--wb-border-warning-subtle"
		},
		{
			name: "--wb-bg-error-subtle",
			category: "bg",
			value: {
				light: "#fef3f2",
				dark: "rgba(239, 68, 68, 0.15)"
			},
			usage: "基础/兼容别名 token：--wb-bg-error-subtle"
		},
		{
			name: "--wb-border-error-subtle",
			category: "border",
			value: {
				light: "#fecdca",
				dark: "rgba(239, 68, 68, 0.30)"
			},
			usage: "基础/兼容别名 token：--wb-border-error-subtle"
		},
		{
			name: "--wb-brand-bright",
			category: "button",
			value: {
				light: "#4ecba0",
				dark: "#4ECBA0"
			},
			usage: "基础/兼容别名 token：--wb-brand-bright"
		},
		{
			name: "--wb-brand-soft",
			category: "button",
			value: {
				light: "#a8d9c5",
				dark: "#3A785F"
			},
			usage: "基础/兼容别名 token：--wb-brand-soft"
		},
		{
			name: "--wb-bg-action",
			category: "bg",
			value: {
				light: "var(--wb-palette-blue-8)",
				dark: "var(--wb-palette-blue-4)"
			},
			usage: "基础/兼容别名 token：--wb-bg-action"
		},
		{
			name: "--wb-text-action",
			category: "text",
			value: {
				light: "var(--wb-palette-blue-8)",
				dark: "var(--wb-palette-blue-4)"
			},
			usage: "基础/兼容别名 token：--wb-text-action"
		},
		{
			name: "--wb-border-action",
			category: "border",
			value: {
				light: "var(--wb-palette-blue-8)",
				dark: "var(--wb-palette-blue-4)"
			},
			usage: "基础/兼容别名 token：--wb-border-action"
		},
		{
			name: "--wb-bg-info",
			category: "bg",
			value: {
				light: "#EFF6FF",
				dark: "var(--wb-palette-blue-1)"
			},
			usage: "基础/兼容别名 token：--wb-bg-info"
		},
		{
			name: "--wb-border-info",
			category: "border",
			value: {
				light: "var(--wb-palette-blue-2)",
				dark: "var(--wb-palette-blue-3)"
			},
			usage: "基础/兼容别名 token：--wb-border-info"
		},
		{
			name: "--wb-bg-focus-soft",
			category: "bg",
			value: {
				light: "rgba(26, 121, 255, 0.10)",
				dark: "rgba(75, 145, 255, 0.15)"
			},
			usage: "基础/兼容别名 token：--wb-bg-focus-soft"
		},
		{
			name: "--wb-bg-row-selected",
			category: "bg",
			value: {
				light: "var(--wb-bg-item-selected)",
				dark: "var(--wb-bg-item-selected)"
			},
			usage: "基础/兼容别名 token：--wb-bg-row-selected"
		},
		{
			name: "--wb-text-link-default",
			category: "text",
			value: {
				light: "#60a5fa",
				dark: "#60A5FA"
			},
			usage: "基础/兼容别名 token：--wb-text-link-default"
		},
		{
			name: "--wb-accent-purple-light",
			category: "status",
			value: {
				light: "var(--wb-palette-purple-4)",
				dark: "var(--wb-palette-purple-7)"
			},
			usage: "基础/兼容别名 token：--wb-accent-purple-light"
		},
		{
			name: "--wb-bg-purple",
			category: "bg",
			value: {
				light: "var(--wb-accent-purple-light)",
				dark: "var(--wb-accent-purple-light)"
			},
			usage: "基础/兼容别名 token：--wb-bg-purple"
		},
		{
			name: "--wb-bg-purple-light",
			category: "bg",
			value: {
				light: "var(--wb-palette-purple-2)",
				dark: "var(--wb-palette-purple-2)"
			},
			usage: "基础/兼容别名 token：--wb-bg-purple-light"
		},
		{
			name: "--wb-border-purple",
			category: "border",
			value: {
				light: "var(--wb-palette-purple-3)",
				dark: "var(--wb-palette-purple-5)"
			},
			usage: "基础/兼容别名 token：--wb-border-purple"
		},
		{
			name: "--wb-bg-inset-strong",
			category: "bg",
			value: {
				light: "var(--wb-palette-gray-3)",
				dark: "#262626"
			},
			usage: "基础/兼容别名 token：--wb-bg-inset-strong"
		},
		{
			name: "--wb-border-faint",
			category: "border",
			value: {
				light: "var(--wb-palette-black-10)",
				dark: "var(--wb-palette-white-10)"
			},
			usage: "基础/兼容别名 token：--wb-border-faint"
		},
		{
			name: "--wb-text-placeholder-soft",
			category: "text",
			value: {
				light: "var(--wb-palette-black-30)",
				dark: "var(--wb-palette-white-30)"
			},
			usage: "基础/兼容别名 token：--wb-text-placeholder-soft"
		},
		{
			name: "--wb-shadow-card-soft",
			category: "bg",
			value: {
				light: "0 16px 32px -8px rgba(0, 0, 0, 0.03)",
				dark: "0 16px 32px -8px rgba(0, 0, 0, 0.30)"
			},
			usage: "基础/兼容别名 token：--wb-shadow-card-soft"
		},
		{
			name: "--wb-bg-card-hover",
			category: "bg",
			value: {
				light: "color-mix(in srgb, var(--wb-palette-black-100) 6%, var(--wb-bg-card))",
				dark: "color-mix(in srgb, var(--wb-palette-white-100) 6%, var(--wb-bg-card))"
			},
			usage: "基础/兼容别名 token：--wb-bg-card-hover"
		},
		{
			name: "--wb-bg-active-hover",
			category: "bg",
			value: {
				light: "#F7F8FA",
				dark: "#404045"
			},
			usage: "基础/兼容别名 token：--wb-bg-active-hover"
		},
		{
			name: "--wb-border-subtle-soft",
			category: "border",
			value: {
				light: "#EFEFEF",
				dark: "rgba(255, 255, 255, 0.06)"
			},
			usage: "基础/兼容别名 token：--wb-border-subtle-soft"
		},
		{
			name: "--wb-border-selected",
			category: "border",
			value: {
				light: "#C9CDD4",
				dark: "rgba(255, 255, 255, 0.20)"
			},
			usage: "基础/兼容别名 token：--wb-border-selected"
		},
		{
			name: "--wb-shadow-thumb",
			category: "bg",
			value: {
				light: "0 1px 2px rgba(0, 0, 0, 0.18)",
				dark: "0 1px 4px rgba(0, 0, 0, 0.6)"
			},
			usage: "基础/兼容别名 token：--wb-shadow-thumb"
		}
	];
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/tokens/index.ts
var init_tokens = __esmMin((() => {
	init_types();
	init_colors_tokens();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Avatar/Avatar.scss
var init_Avatar$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Avatar/Avatar.tsx
function resolveSize(size) {
	return typeof size === "number" ? size : SIZE_PRESETS[size];
}
/**
* 安全取首字符并转大写：
*   - Array.from 按 code point 切，emoji / CJK 代理对不会半字符
*   - 仅对 children 是 string 时生效；非 string（如 ReactElement）原样渲染
*/
function normalizeTextFallback(node) {
	if (typeof node !== "string") return node;
	const trimmed = node.trim();
	if (!trimmed) return null;
	const first = Array.from(trimmed)[0];
	return first ? first.toUpperCase() : null;
}
var import_react$36, import_jsx_runtime$35, SIZE_PRESETS, Avatar$1;
var init_Avatar$1 = __esmMin((() => {
	init_Avatar$2();
	import_react$36 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$35 = require_jsx_runtime();
	SIZE_PRESETS = {
		small: 24,
		medium: 32,
		large: 40
	};
	Avatar$1 = (0, import_react$36.forwardRef)(function Avatar({ size = "medium", shape = "circle", src, srcSet, alt, icon, onError, referrerPolicy, crossOrigin, className, style, children, ...rest }, ref) {
		const [imgBroken, setImgBroken] = (0, import_react$36.useState)(false);
		(0, import_react$36.useEffect)(() => {
			setImgBroken(false);
		}, [src]);
		const handleImgError = (0, import_react$36.useCallback)(() => {
			if (onError?.() !== false) setImgBroken(true);
		}, [onError]);
		const px = resolveSize(size);
		const fontPx = Math.max(12, Math.round(px * .4));
		const showImage = Boolean(src) && !imgBroken;
		const showIconFallback = !showImage && icon != null;
		const showTextFallback = !showImage && !showIconFallback;
		return /* @__PURE__ */ (0, import_jsx_runtime$35.jsxs)("span", {
			ref,
			className: [
				"wb-avatar",
				`wb-avatar--${shape}`,
				showImage ? "wb-avatar--image" : "wb-avatar--fallback",
				className
			].filter(Boolean).join(" "),
			style: {
				width: px,
				height: px,
				fontSize: fontPx,
				lineHeight: `${px}px`,
				...style
			},
			...rest,
			children: [
				showImage && /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("img", {
					className: "wb-avatar__img",
					src,
					srcSet,
					alt: alt ?? "",
					referrerPolicy,
					crossOrigin,
					draggable: false,
					onError: handleImgError
				}),
				showIconFallback && /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("span", {
					className: "wb-avatar__icon",
					"aria-hidden": alt ? void 0 : "true",
					children: icon
				}),
				showTextFallback && /* @__PURE__ */ (0, import_jsx_runtime$35.jsx)("span", {
					className: "wb-avatar__text",
					"aria-hidden": alt ? void 0 : "true",
					children: normalizeTextFallback(children)
				})
			]
		});
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Avatar/AvatarGroup.tsx
/**
* 判断一个 React 元素是不是 Avatar：用 type === Avatar 严格匹配，
* 避免把任意子节点当成 Avatar 处理（与 antd 行为一致）。
*/
function isAvatarElement(node) {
	return (0, import_react$35.isValidElement)(node) && node.type === Avatar$1;
}
function AvatarGroup({ children, size, shape, maxCount, maxStyle, className, style }) {
	const avatars = (0, import_react$35.useMemo)(() => import_react$35.Children.toArray(children).filter(isAvatarElement), [children]);
	const shouldClip = typeof maxCount === "number" && avatars.length > maxCount;
	const visible = shouldClip ? avatars.slice(0, maxCount) : avatars;
	const overflowCount = shouldClip ? avatars.length - maxCount : 0;
	const merged = ["wb-avatar-group", className].filter(Boolean).join(" ");
	/**
	* 给每个子 Avatar 统一注入 wb-avatar-group__item class（用来吃负 margin + 描边），
	* 同时把 group-level 的 size / shape 在子未指定时下传。
	*/
	const renderAvatar = (node, index) => {
		const childClassName = ["wb-avatar-group__item", node.props.className ?? ""].filter(Boolean).join(" ");
		return (0, import_react$35.cloneElement)(node, {
			key: node.key ?? `wb-avatar-group-${index}`,
			size: node.props.size ?? size,
			shape: node.props.shape ?? shape,
			className: childClassName
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$34.jsxs)("div", {
		className: merged,
		style,
		children: [visible.map((node, idx) => renderAvatar(node, idx)), overflowCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime$34.jsx)(Avatar$1, {
			size,
			shape,
			className: "wb-avatar-group__item wb-avatar-group__item--overflow",
			style: maxStyle,
			children: `+${overflowCount}`
		})]
	});
}
var import_react$35, import_jsx_runtime$34;
var init_AvatarGroup = __esmMin((() => {
	init_Avatar$2();
	import_react$35 = /* @__PURE__ */ __toESM(require_react());
	init_Avatar$1();
	import_jsx_runtime$34 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Avatar/index.ts
var Avatar;
var init_Avatar = __esmMin((() => {
	init_Avatar$1();
	init_AvatarGroup();
	Avatar = Avatar$1;
	Avatar.Group = AvatarGroup;
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Button/Button.scss
var init_Button$2 = __esmMin((() => {})), import_jsx_runtime$33, ButtonLoadingIcon;
var init_ButtonLoadingIcon = __esmMin((() => {
	require_react();
	import_jsx_runtime$33 = require_jsx_runtime();
	ButtonLoadingIcon = (props) => {
		const { className } = props;
		return /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("svg", {
			width: "16",
			height: "16",
			viewBox: "0 0 16 16",
			fill: "none",
			className,
			children: /* @__PURE__ */ (0, import_jsx_runtime$33.jsx)("path", {
				fill: "currentColor",
				fillRule: "evenodd",
				transform: "matrix(1 0 0 1 2.07103 1.5)",
				d: "M6.529 0L6.529 4L5.329 4L5.329 0L6.529 0ZM8.394 5.7697L11.8581 3.7697L11.258 2.7305L7.7939 4.7305L8.394 5.7697ZM3.4641 5.7698L0 3.7698L0.6 2.7305L4.0641 4.7305L3.4641 5.7698ZM7.7939 8.2697L11.258 10.2697L11.8581 9.2305L8.394 7.2305L7.7939 8.2697ZM4.0641 8.2697L0.6 10.2697L0 9.2305L3.4641 7.2305L4.0641 8.2697ZM6.529 9L6.529 13L5.329 13L5.329 9L6.529 9Z"
			})
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Button/Button.tsx
var import_react$33, import_jsx_runtime$32, Button;
var init_Button$1 = __esmMin((() => {
	init_Button$2();
	import_react$33 = /* @__PURE__ */ __toESM(require_react());
	init_ButtonLoadingIcon();
	import_jsx_runtime$32 = require_jsx_runtime();
	Button = (0, import_react$33.forwardRef)(function Button({ className, variant = "secondary", size = "medium", shape = "rounded", iconOnly, danger, loading = false, fullWidth, leftIcon, rightIcon, children, type = "button", disabled, ...rest }, ref) {
		const isCircle = shape === "circle" && iconOnly;
		const hasVisibleChildren = import_react$33.Children.toArray(children).length > 0;
		return /* @__PURE__ */ (0, import_jsx_runtime$32.jsxs)("button", {
			ref,
			type,
			className: [
				"wb-button",
				`wb-button--${variant}`,
				`wb-button--${size}`,
				iconOnly && "wb-button--icon-only",
				isCircle && "wb-button--circle",
				danger && "wb-button--danger",
				loading && "wb-button--loading",
				fullWidth && "wb-button--full-width",
				(disabled || loading) && "wb-button--disabled",
				className
			].filter(Boolean).join(" "),
			disabled: disabled || loading,
			...rest,
			children: [
				leftIcon && /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("span", {
					className: "wb-button__icon wb-button__icon--left",
					children: leftIcon
				}),
				!iconOnly && hasVisibleChildren && /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("span", {
					className: "wb-button__content",
					children
				}),
				iconOnly && hasVisibleChildren && /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("span", {
					className: "wb-button__icon",
					children
				}),
				rightIcon && /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("span", {
					className: "wb-button__icon wb-button__icon--right",
					children: rightIcon
				}),
				loading && /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)("span", {
					className: "wb-button__loading",
					children: /* @__PURE__ */ (0, import_jsx_runtime$32.jsx)(ButtonLoadingIcon, { className: "wb-button__loading-icon" })
				})
			]
		});
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Button/index.ts
var init_Button = __esmMin((() => {
	init_Button$1();
})), import_react$32, import_jsx_runtime$31;
var init_ToggleIcon = __esmMin((() => {
	import_react$32 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$31 = require_jsx_runtime();
	(0, import_react$32.forwardRef)(function ToggleIcon({ icon: DefaultIcon, activeIcon: ActiveIcon, active, ...iconProps }, ref) {
		return /* @__PURE__ */ (0, import_jsx_runtime$31.jsx)(active && ActiveIcon ? ActiveIcon : DefaultIcon, {
			ref,
			...iconProps
		});
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Icon/index.ts
var init_Icon = __esmMin((() => {
	init_Icon$1();
	init_ToggleIcon();
	init_icons();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Input/Input.scss
var init_Input$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/a11y.ts
/**
* 探测当前 locale —— 仅读 DOM lang 属性，**不依赖** src/i18n
*
* 与 src/i18n 的协作方式：src/i18n.setLocale() 内部本就会把语言写到 body[lang]
* （或由 host app 直接写 html[lang]），所以这里只读 lang 属性就能跟着切。
*/
function detectLocale() {
	if (typeof document === "undefined") return "en";
	if ((document.body?.getAttribute("lang") || document.documentElement?.getAttribute("lang") || "").toLowerCase().startsWith("zh")) return "zh-cn";
	return "en";
}
/**
* 获取 a11y 文案（带占位符替换）
*
* 用法：
*   getA11yLabel('close')                        // → 'Close' / '关闭'
*   getA11yLabel('selectRowN', { index: 3 })     // → 'Select row 3' / '选择第 3 行'
*
* 调用方应该这样使用（prop 优先）：
*   const label = props.removeAriaLabel ?? getA11yLabel('remove');
*/
function getA11yLabel(key, replacements) {
	const template = dict[detectLocale()][key] ?? dict.en[key] ?? key;
	if (!replacements) return template;
	return template.replace(/\{(\w+)\}/g, (m, p) => String(replacements[p] ?? m));
}
var dict;
var init_a11y = __esmMin((() => {
	dict = {
		"zh-cn": {
			close: "关闭",
			back: "返回",
			clear: "清除",
			remove: "移除",
			selectRow: "选择行",
			selectAll: "全选",
			selectRowN: "选择第 {index} 行"
		},
		en: {
			close: "Close",
			back: "Back",
			clear: "Clear",
			remove: "Remove",
			selectRow: "Select row",
			selectAll: "Select all",
			selectRowN: "Select row {index}"
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Input/Input.tsx
/**
* 通用受控/非受控钩子：返回当前值与 setter，自动判断是否受控。
* 抽到组件文件内是为 setup-baseline 不引入新文件；后续若 Select/Switch 也用，再提到 utils。
*/
function useControllableInputValue(value, defaultValue, onChange) {
	const isControlled = value !== void 0;
	const [innerValue, setInnerValue] = import_react$31.useState(defaultValue ?? "");
	return [isControlled ? value : innerValue, (0, import_react$31.useCallback)((event) => {
		if (!isControlled) setInnerValue(event.target.value);
		onChange?.(event);
	}, [isControlled, onChange])];
}
var import_react$31, import_jsx_runtime$30, ClearIcon$1, Input$1;
var init_Input$1 = __esmMin((() => {
	init_Input$2();
	import_react$31 = /* @__PURE__ */ __toESM(require_react());
	init_a11y();
	import_jsx_runtime$30 = require_jsx_runtime();
	ClearIcon$1 = /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("svg", {
		viewBox: "0 0 16 16",
		"aria-hidden": "true",
		focusable: "false",
		width: "14",
		height: "14",
		children: [/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("circle", {
			cx: "8",
			cy: "8",
			r: "7",
			fill: "currentColor",
			opacity: "0.5"
		}), /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("path", {
			d: "M5.5 5.5l5 5M10.5 5.5l-5 5",
			stroke: "var(--wb-bg-primary)",
			strokeWidth: "1.4",
			strokeLinecap: "round"
		})]
	});
	Input$1 = (0, import_react$31.forwardRef)(function Input({ className, size = "medium", variant = "default", status, type = "text", value, defaultValue, onChange, prefix, suffix, allowClear, clearAriaLabel, onPressEnter, onKeyDown, disabled, readOnly, addonBefore, addonAfter, showCount, maxLength, ...rest }, ref) {
		const innerRef = (0, import_react$31.useRef)(null);
		(0, import_react$31.useImperativeHandle)(ref, () => innerRef.current, []);
		const [current, handleChange] = useControllableInputValue(value, defaultValue, onChange);
		const handleKeyDown = (0, import_react$31.useCallback)((event) => {
			if (event.key === "Enter") onPressEnter?.(event);
			onKeyDown?.(event);
		}, [onKeyDown, onPressEnter]);
		const handleClear = (0, import_react$31.useCallback)(() => {
			const input = innerRef.current;
			if (!input) return;
			(Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value")?.set)?.call(input, "");
			input.dispatchEvent(new Event("input", { bubbles: true }));
			input.focus();
		}, []);
		const showClear = !!allowClear && !disabled && !readOnly && current.length > 0;
		const hasAffix = prefix !== void 0 || suffix !== void 0 || !!allowClear || !!showCount;
		const hasAddon = addonBefore !== void 0 || addonAfter !== void 0;
		const inputClass = [
			"wb-input",
			`wb-input--${size}`,
			variant !== "default" ? `wb-input--${variant}` : "",
			status === "error" ? "wb-input--status-error" : "",
			hasAffix ? "wb-input--with-affix" : "",
			hasAddon ? "" : className
		].filter(Boolean).join(" ");
		const countNode = showCount ? /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
			className: "wb-input__count",
			"aria-hidden": "true",
			children: typeof maxLength === "number" ? `${current.length} / ${maxLength}` : String(current.length)
		}) : null;
		const renderCore = () => {
			if (!hasAffix) return /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("input", {
				ref: innerRef,
				type,
				className: inputClass,
				value: current,
				onChange: handleChange,
				onKeyDown: handleKeyDown,
				disabled,
				readOnly,
				maxLength,
				...rest
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("span", {
				className: [
					"wb-input-wrapper",
					`wb-input-wrapper--${size}`,
					variant !== "default" ? `wb-input-wrapper--${variant}` : "",
					status === "error" ? "wb-input-wrapper--status-error" : "",
					disabled ? "wb-input-wrapper--disabled" : "",
					hasAddon ? "" : className
				].filter(Boolean).join(" "),
				children: [
					prefix !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
						className: "wb-input__prefix",
						children: prefix
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("input", {
						ref: innerRef,
						type,
						className: "wb-input__inner",
						value: current,
						onChange: handleChange,
						onKeyDown: handleKeyDown,
						disabled,
						readOnly,
						maxLength,
						...rest
					}),
					showClear ? /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("button", {
						type: "button",
						className: "wb-input__clear",
						"aria-label": clearAriaLabel ?? getA11yLabel("clear"),
						tabIndex: -1,
						onMouseDown: (e) => e.preventDefault(),
						onClick: handleClear,
						children: ClearIcon$1
					}) : null,
					suffix !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
						className: "wb-input__suffix",
						children: suffix
					}) : null,
					countNode
				]
			});
		};
		if (!hasAddon) return renderCore();
		return /* @__PURE__ */ (0, import_jsx_runtime$30.jsxs)("span", {
			className: [
				"wb-input-group",
				`wb-input-group--${size}`,
				disabled ? "wb-input-group--disabled" : "",
				className
			].filter(Boolean).join(" "),
			children: [
				addonBefore !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
					className: "wb-input-group__addon",
					children: addonBefore
				}) : null,
				renderCore(),
				addonAfter !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime$30.jsx)("span", {
					className: "wb-input-group__addon",
					children: addonAfter
				}) : null
			]
		});
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Input/Search.tsx
var import_react$30, import_jsx_runtime$29, SEARCH_ICON_SIZE, Search;
var init_Search = __esmMin((() => {
	import_react$30 = /* @__PURE__ */ __toESM(require_react());
	init_Button$1();
	init_SearchIcon();
	init_Input$1();
	import_jsx_runtime$29 = require_jsx_runtime();
	SEARCH_ICON_SIZE = 14;
	Search = (0, import_react$30.forwardRef)(function Search({ onSearch, enterButton = false, loading, showPrefixIcon = true, size = "medium", variant, value, defaultValue, onChange, ...rest }, ref) {
		const isControlled = value !== void 0;
		const [innerValue, setInnerValue] = import_react$30.useState(defaultValue ?? "");
		const current = isControlled ? value : innerValue;
		const handleChange = (0, import_react$30.useCallback)((event) => {
			if (!isControlled) setInnerValue(event.target.value);
			onChange?.(event);
		}, [isControlled, onChange]);
		const handlePressEnter = (0, import_react$30.useCallback)((event) => {
			onSearch?.(current, event);
		}, [current, onSearch]);
		const handleButtonClick = (0, import_react$30.useCallback)((event) => {
			onSearch?.(current, event);
		}, [current, onSearch]);
		const prefixNode = showPrefixIcon ? /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(SearchIcon, {
			width: SEARCH_ICON_SIZE,
			height: SEARCH_ICON_SIZE
		}) : void 0;
		if (!enterButton) return /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(Input$1, {
			ref,
			size,
			variant,
			value,
			defaultValue,
			onChange: handleChange,
			onPressEnter: handlePressEnter,
			prefix: prefixNode,
			...rest
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(Input$1, {
			ref,
			size,
			variant,
			value,
			defaultValue,
			onChange: handleChange,
			onPressEnter: handlePressEnter,
			prefix: prefixNode,
			addonAfter: /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(Button, {
				variant: "primary",
				size: size === "small" ? "small" : "medium",
				loading,
				onClick: handleButtonClick,
				"aria-label": "Search",
				children: enterButton === true ? /* @__PURE__ */ (0, import_jsx_runtime$29.jsx)(SearchIcon, {
					width: SEARCH_ICON_SIZE,
					height: SEARCH_ICON_SIZE
				}) : enterButton
			}),
			...rest
		});
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Input/TextArea.tsx
function useControllableTextAreaValue(value, defaultValue, onChange) {
	const isControlled = value !== void 0;
	const [innerValue, setInnerValue] = import_react$29.useState(defaultValue ?? "");
	return [isControlled ? value : innerValue, (0, import_react$29.useCallback)((event) => {
		if (!isControlled) setInnerValue(event.target.value);
		onChange?.(event);
	}, [isControlled, onChange])];
}
/**
* 测量并设置 textarea 高度（autoSize 模式）。
* 算法：临时把 height 设成 'auto' 让浏览器按内容计算 scrollHeight，再写回 height。
* minRows / maxRows 通过 lineHeight 换算成 px clamp。
*/
function resizeTextArea(textarea, autoSize) {
	if (!autoSize) return;
	const { minRows = void 0, maxRows = void 0 } = typeof autoSize === "object" ? autoSize : {};
	const computed = window.getComputedStyle(textarea);
	let lineHeight = parseFloat(computed.lineHeight);
	if (Number.isNaN(lineHeight)) lineHeight = (parseFloat(computed.fontSize) || 14) * 1.5;
	const paddingY = parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom);
	const borderY = parseFloat(computed.borderTopWidth) + parseFloat(computed.borderBottomWidth);
	textarea.style.height = "auto";
	let next = textarea.scrollHeight + borderY;
	if (typeof minRows === "number") {
		const minHeight = minRows * lineHeight + paddingY + borderY;
		next = Math.max(next, minHeight);
	}
	if (typeof maxRows === "number") {
		const maxHeight = maxRows * lineHeight + paddingY + borderY;
		if (next > maxHeight) {
			next = maxHeight;
			textarea.style.overflowY = "auto";
		} else textarea.style.overflowY = "hidden";
	} else textarea.style.overflowY = "hidden";
	textarea.style.height = `${next}px`;
}
var import_react$29, import_jsx_runtime$28, TextArea;
var init_TextArea = __esmMin((() => {
	import_react$29 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$28 = require_jsx_runtime();
	TextArea = (0, import_react$29.forwardRef)(function TextArea({ className, status, value, defaultValue, onChange, onKeyDown, onPressEnter, autoSize, showCount, maxLength, rows, disabled, readOnly, style, ...rest }, ref) {
		const innerRef = (0, import_react$29.useRef)(null);
		(0, import_react$29.useImperativeHandle)(ref, () => innerRef.current, []);
		const [current, handleChange] = useControllableTextAreaValue(value, defaultValue, onChange);
		(0, import_react$29.useLayoutEffect)(() => {
			if (innerRef.current && autoSize) resizeTextArea(innerRef.current, autoSize);
		}, [current, autoSize]);
		(0, import_react$29.useEffect)(() => {
			if (!autoSize) return;
			const handler = () => {
				if (innerRef.current) resizeTextArea(innerRef.current, autoSize);
			};
			window.addEventListener("resize", handler);
			return () => window.removeEventListener("resize", handler);
		}, [autoSize]);
		const handleKeyDown = (0, import_react$29.useCallback)((event) => {
			if (event.key === "Enter" && !event.shiftKey && !event.ctrlKey && !event.metaKey && !event.altKey) onPressEnter?.(event);
			onKeyDown?.(event);
		}, [onKeyDown, onPressEnter]);
		const textareaClass = [
			"wb-textarea",
			status === "error" ? "wb-textarea--status-error" : "",
			autoSize ? "wb-textarea--autosize" : "",
			className
		].filter(Boolean).join(" ");
		if (showCount) {
			const count = current.length;
			const countText = typeof maxLength === "number" ? `${count} / ${maxLength}` : String(count);
			return /* @__PURE__ */ (0, import_jsx_runtime$28.jsxs)("span", {
				className: [
					"wb-textarea-affix-wrapper",
					status === "error" ? "wb-textarea-affix-wrapper--status-error" : "",
					disabled ? "wb-textarea-affix-wrapper--disabled" : ""
				].filter(Boolean).join(" "),
				children: [/* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("textarea", {
					ref: innerRef,
					className: textareaClass,
					value: current,
					onChange: handleChange,
					onKeyDown: handleKeyDown,
					disabled,
					readOnly,
					rows: rows ?? 3,
					maxLength,
					style,
					...rest
				}), /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("span", {
					className: "wb-textarea__count",
					"aria-hidden": "true",
					children: countText
				})]
			});
		}
		return /* @__PURE__ */ (0, import_jsx_runtime$28.jsx)("textarea", {
			ref: innerRef,
			className: textareaClass,
			value: current,
			onChange: handleChange,
			onKeyDown: handleKeyDown,
			disabled,
			readOnly,
			rows: rows ?? 3,
			maxLength,
			style,
			...rest
		});
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Input/index.ts
var Input;
var init_Input = __esmMin((() => {
	init_Input$1();
	init_Search();
	init_TextArea();
	Input = Input$1;
	Input.TextArea = TextArea;
	Input.Search = Search;
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Tag/Tag.scss
var init_Tag$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Tag/Tag.tsx
function CloseIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("svg", {
		viewBox: "0 0 12 12",
		width: "10",
		height: "10",
		"aria-hidden": "true",
		focusable: "false",
		children: /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("path", {
			d: "M2.5 2.5L9.5 9.5M9.5 2.5L2.5 9.5",
			stroke: "currentColor",
			strokeWidth: "1.5",
			strokeLinecap: "round"
		})
	});
}
var import_react$28, import_jsx_runtime$27, Tag;
var init_Tag$1 = __esmMin((() => {
	init_Tag$2();
	import_react$28 = /* @__PURE__ */ __toESM(require_react());
	init_a11y();
	import_jsx_runtime$27 = require_jsx_runtime();
	Tag = (0, import_react$28.forwardRef)(function Tag({ tone = "default", size = "medium", dot, closable, onClose, disabled, className, children, onClick, removeAriaLabel, ...rest }, ref) {
		const handleClose = (0, import_react$28.useCallback)((event) => {
			if (disabled) return;
			event.stopPropagation();
			onClose?.(event);
		}, [disabled, onClose]);
		const handleClick = (0, import_react$28.useCallback)((event) => {
			if (disabled) return;
			onClick?.(event);
		}, [disabled, onClick]);
		return /* @__PURE__ */ (0, import_jsx_runtime$27.jsxs)("span", {
			ref,
			className: [
				"wb-tag",
				`wb-tag--${tone}`,
				`wb-tag--${size}`,
				disabled ? "wb-tag--disabled" : "",
				onClick && !disabled ? "wb-tag--clickable" : "",
				className
			].filter(Boolean).join(" "),
			onClick: onClick ? handleClick : void 0,
			"aria-disabled": disabled || void 0,
			...rest,
			children: [
				dot && /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("span", {
					className: "wb-tag__dot",
					"aria-hidden": "true"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("span", {
					className: "wb-tag__label",
					children
				}),
				closable && /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)("button", {
					type: "button",
					className: "wb-tag__close",
					onClick: handleClose,
					disabled,
					"aria-label": removeAriaLabel ?? getA11yLabel("remove"),
					children: /* @__PURE__ */ (0, import_jsx_runtime$27.jsx)(CloseIcon, {})
				})
			]
		});
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Tag/index.ts
var init_Tag = __esmMin((() => {
	init_Tag$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Card/Card.scss
var init_Card$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Card/Card.tsx
/**
* 骨架屏占位：3 行宽度递减的灰色矩形，模拟 antd Card.loading 视觉。
* 此处不引入独立 Skeleton 组件，保持 Card 自包含。
*/
function CardSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime$26.jsxs)("div", {
		className: "wb-card__skeleton",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("div", {
				className: "wb-card__skeleton-row",
				style: { width: "40%" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("div", {
				className: "wb-card__skeleton-row",
				style: { width: "90%" }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("div", {
				className: "wb-card__skeleton-row",
				style: { width: "70%" }
			})
		]
	});
}
var import_react$27, import_jsx_runtime$26, Card$1;
var init_Card$1 = __esmMin((() => {
	init_Card$2();
	import_react$27 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$26 = require_jsx_runtime();
	Card$1 = (0, import_react$27.forwardRef)(function Card({ variant = "outlined", padding = "medium", hoverable, loading, className, children, onClick, onKeyDown, ...rest }, ref) {
		const handleKeyDown = (0, import_react$27.useCallback)((event) => {
			if (hoverable && onClick && (event.key === "Enter" || event.key === " ")) {
				event.preventDefault();
				onClick(event);
			}
			onKeyDown?.(event);
		}, [
			hoverable,
			onClick,
			onKeyDown
		]);
		const merged = [
			"wb-card",
			`wb-card--${variant}`,
			`wb-card--padding-${padding}`,
			hoverable && !loading ? "wb-card--hoverable" : "",
			loading ? "wb-card--loading" : "",
			className
		].filter(Boolean).join(" ");
		const isClickable = !!onClick && !loading;
		return /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)("div", {
			ref,
			className: merged,
			onClick: loading ? void 0 : onClick,
			onKeyDown: handleKeyDown,
			role: isClickable ? "button" : rest.role,
			tabIndex: isClickable ? rest.tabIndex ?? 0 : rest.tabIndex,
			"aria-busy": loading || void 0,
			...rest,
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime$26.jsx)(CardSkeleton, {}) : children
		});
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Card/CardMeta.tsx
function CardMeta({ avatar, title, description, className, style }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
		className: ["wb-card-meta", className].filter(Boolean).join(" "),
		style,
		children: [avatar !== void 0 && avatar !== null && /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", {
			className: "wb-card-meta__avatar",
			children: avatar
		}), (title !== void 0 || description !== void 0) && /* @__PURE__ */ (0, import_jsx_runtime$25.jsxs)("div", {
			className: "wb-card-meta__detail",
			children: [title !== void 0 && title !== null && /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", {
				className: "wb-card-meta__title",
				children: title
			}), description !== void 0 && description !== null && /* @__PURE__ */ (0, import_jsx_runtime$25.jsx)("div", {
				className: "wb-card-meta__description",
				children: description
			})]
		})]
	});
}
var import_jsx_runtime$25;
var init_CardMeta = __esmMin((() => {
	require_react();
	import_jsx_runtime$25 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Card/index.ts
var Card;
var init_Card = __esmMin((() => {
	init_Card$1();
	init_CardMeta();
	Card = Card$1;
	Card.Meta = CardMeta;
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Loading/Loading.scss
var init_Loading$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Loading/Loading.tsx
function Loading({ size = "medium", tip, spinning = true, delay, className, children, ...rest }) {
	/**
	* 处理 delay：当 spinning 由 false → true 且 delay > 0 时，
	* 等 delay 毫秒后才真正显示 spinner。
	*/
	const [delayedSpinning, setDelayedSpinning] = (0, import_react$25.useState)(() => delay && delay > 0 ? false : spinning);
	(0, import_react$25.useEffect)(() => {
		if (!spinning) {
			setDelayedSpinning(false);
			return;
		}
		if (!delay || delay <= 0) {
			setDelayedSpinning(true);
			return;
		}
		const timer = window.setTimeout(() => setDelayedSpinning(true), delay);
		return () => window.clearTimeout(timer);
	}, [spinning, delay]);
	if (!(children !== void 0 && children !== null)) {
		if (!delayedSpinning) return /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(import_jsx_runtime$24.Fragment, {});
		return /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("div", {
			className: [
				"wb-loading",
				`wb-loading--${size}`,
				className
			].filter(Boolean).join(" "),
			role: "status",
			"aria-live": "polite",
			...rest,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("span", {
				className: "wb-loading__spinner",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(SpinnerIcon, {})
			}), tip !== void 0 && tip !== null && tip !== "" && /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("span", {
				className: "wb-loading__tip",
				children: tip
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("div", {
		className: [
			"wb-loading-wrapper",
			delayedSpinning ? "wb-loading-wrapper--spinning" : "",
			className
		].filter(Boolean).join(" "),
		...rest,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("div", {
			className: "wb-loading-wrapper__container",
			"aria-busy": delayedSpinning,
			children
		}), delayedSpinning && /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("div", {
			className: "wb-loading-wrapper__overlay",
			role: "status",
			"aria-live": "polite",
			children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsxs)("div", {
				className: `wb-loading wb-loading--${size}`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("span", {
					className: "wb-loading__spinner",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)(SpinnerIcon, {})
				}), tip !== void 0 && tip !== null && tip !== "" && /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("span", {
					className: "wb-loading__tip",
					children: tip
				})]
			})
		})]
	});
}
var import_react$25, import_jsx_runtime$24, SpinnerIcon;
var init_Loading$1 = __esmMin((() => {
	init_Loading$2();
	import_react$25 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$24 = require_jsx_runtime();
	SpinnerIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("svg", {
		className: "wb-loading__spinner-svg",
		viewBox: "0 0 14 14",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": true,
		focusable: "false",
		children: /* @__PURE__ */ (0, import_jsx_runtime$24.jsx)("path", {
			fill: "currentColor",
			fillRule: "evenodd",
			d: "M1.4392 2.7482Q1.7215 2.379 2.0503 2.0503Q2.379 1.7215 2.7482 1.4392L4.7106 4.0057Q4.3111 4.3111 4.0057 4.7106L1.4392 2.7482ZM0.0553 7.8779Q0.0277 7.6595 0.0138 7.4398Q0 7.2201 0 7Q0 6.7799 0.0138 6.5602Q0.0277 6.3405 0.0553 6.1221L3.2605 6.5273Q3.2308 6.7627 3.2308 7Q3.2308 7.2373 3.2605 7.4727L0.0553 7.8779ZM2.7482 12.5608Q2.379 12.2785 2.0503 11.9497Q1.7215 11.621 1.4392 11.2518L4.0057 9.2894Q4.3111 9.6889 4.7106 9.9943L2.7482 12.5608ZM7.8779 13.9447Q7.6595 13.9723 7.4398 13.9862Q7.2201 14 7 14Q6.7799 14 6.5602 13.9862Q6.3405 13.9723 6.1221 13.9447L6.5273 10.7395Q6.7627 10.7692 7 10.7692Q7.2373 10.7692 7.4727 10.7395L7.8779 13.9447ZM12.5608 11.2518Q12.2785 11.621 11.9497 11.9497Q11.621 12.2785 11.2518 12.5608L9.2894 9.9943Q9.6889 9.6889 9.9943 9.2894L12.5608 11.2518ZM13.9447 6.1221Q13.9723 6.3405 13.9862 6.5602Q14 6.7799 14 7Q14 7.2201 13.9862 7.4398Q13.9723 7.6595 13.9447 7.8779L10.7395 7.4727Q10.7692 7.2373 10.7692 7Q10.7692 6.7627 10.7395 6.5273L13.9447 6.1221ZM11.2518 1.4392Q11.621 1.7215 11.9497 2.0503Q12.2785 2.379 12.5608 2.7482L9.9943 4.7106Q9.6889 4.3111 9.2894 4.0057L11.2518 1.4392ZM7.8779 0.0553L7.4727 3.2605Q7.2373 3.2308 7 3.2308Q6.7627 3.2308 6.5273 3.2605L6.1221 0.0553Q6.3405 0.0277 6.5602 0.0138Q6.7799 -0 7 0Q7.2201 0 7.4398 0.0138Q7.6595 0.0277 7.8779 0.0553Z"
		})
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Loading/index.ts
var init_Loading = __esmMin((() => {
	init_Loading$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Popover/Popover.scss
var init_Popover$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Popover/Popover.tsx
function Popover({ trigger, children, placement = "bottom", triggerMode = "click", open: controlledOpen, onOpenChange, defaultOpen = false, hasArrow = false, offsetDistance = 8, disabled = false, className, portalRoot, role: ariaRole = "dialog", stopClickPropagation = false, trackReferenceMove = false }) {
	const [uncontrolledOpen, setUncontrolledOpen] = (0, import_react$24.useState)(defaultOpen);
	const isControlled = controlledOpen !== void 0;
	const open = isControlled ? !!controlledOpen : uncontrolledOpen;
	const handleOpenChange = (0, import_react$24.useCallback)((next) => {
		if (disabled && next) return;
		if (!isControlled) setUncontrolledOpen(next);
		onOpenChange?.(next);
	}, [
		disabled,
		isControlled,
		onOpenChange
	]);
	const arrowRef = (0, import_react$24.useRef)(null);
	const middleware = (0, import_react$24.useMemo)(() => {
		const mw = [
			offset(offsetDistance),
			flip(),
			shift({ padding: 8 })
		];
		if (hasArrow) mw.push(arrow({
			element: arrowRef,
			padding: 4
		}));
		return mw;
	}, [offsetDistance, hasArrow]);
	const isInline = portalRoot === "inline";
	const { refs, floatingStyles, context, placement: resolvedPlacement, middlewareData, isPositioned } = useFloating$1({
		open,
		onOpenChange: handleOpenChange,
		placement,
		middleware,
		whileElementsMounted: trackReferenceMove ? (reference, floating, update) => autoUpdate(reference, floating, update, { animationFrame: true }) : autoUpdate,
		strategy: isInline ? "absolute" : "fixed",
		transform: false
	});
	const { getReferenceProps, getFloatingProps } = useInteractions([
		useClick(context, { enabled: triggerMode === "click" && !disabled }),
		useHover(context, {
			enabled: triggerMode === "hover" && !disabled,
			delay: {
				open: 80,
				close: 100
			},
			handleClose: null
		}),
		useDismiss(context),
		useRole(context, { role: ariaRole })
	]);
	const triggerNode = (0, import_react$24.isValidElement)(trigger) ? (0, import_react$24.cloneElement)(trigger, {
		ref: refs.setReference,
		...getReferenceProps({ ...trigger.props })
	}) : trigger;
	const arrowSide = resolvedPlacement.split("-")[0];
	const oppositeSide = {
		top: "bottom",
		bottom: "top",
		left: "right",
		right: "left"
	};
	const arrowX = middlewareData.arrow?.x;
	const arrowY = middlewareData.arrow?.y;
	const arrowStyle = {
		position: "absolute",
		left: arrowX != null ? `${arrowX}px` : "",
		top: arrowY != null ? `${arrowY}px` : "",
		[oppositeSide[arrowSide]]: `-${ARROW_SIZE / 2}px`,
		width: ARROW_SIZE,
		height: ARROW_SIZE
	};
	const merged = [
		"wb-popover",
		`wb-popover--placement-${arrowSide}`,
		className
	].filter(Boolean).join(" ");
	const shouldPortal = !isInline;
	const resolvedPortalRoot = (() => {
		if (isInline) return;
		if (portalRoot === "body") return;
		if (typeof portalRoot === "function") return portalRoot() ?? void 0;
		if (portalRoot instanceof HTMLElement) return portalRoot;
	})();
	const positioningStrategy = isInline ? "absolute" : "fixed";
	const floatingContent = open && /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)("div", {
		ref: refs.setFloating,
		style: {
			...floatingStyles,
			position: positioningStrategy,
			visibility: isPositioned ? "visible" : "hidden"
		},
		className: merged,
		...getFloatingProps(stopClickPropagation ? {
			onClick: (e) => e.stopPropagation(),
			onMouseDown: (e) => e.stopPropagation()
		} : void 0),
		children: [children, hasArrow && /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)("div", {
			ref: arrowRef,
			className: "wb-popover__arrow",
			style: arrowStyle
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$23.jsxs)(import_jsx_runtime$23.Fragment, { children: [triggerNode, shouldPortal && open ? /* @__PURE__ */ (0, import_jsx_runtime$23.jsx)(FloatingPortal, {
		root: resolvedPortalRoot,
		children: floatingContent
	}) : floatingContent] });
}
var import_react$24, import_jsx_runtime$23, ARROW_SIZE;
var init_Popover$1 = __esmMin((() => {
	init_Popover$2();
	import_react$24 = /* @__PURE__ */ __toESM(require_react());
	init_floating();
	import_jsx_runtime$23 = require_jsx_runtime();
	ARROW_SIZE = 8;
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Popover/index.ts
var init_Popover = __esmMin((() => {
	init_Popover$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Popconfirm/Popconfirm.scss
var init_Popconfirm$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Popconfirm/Popconfirm.tsx
function Popconfirm({ children, title, description, icon, okText = "OK", cancelText = "Cancel", okType = "primary", showCancel = true, okButtonProps, cancelButtonProps, onConfirm, onCancel, disabled = false, placement = "top", trigger = "click", open: controlledOpen, defaultOpen = false, onOpenChange, arrow = true, className }) {
	const [uncontrolledOpen, setUncontrolledOpen] = (0, import_react$23.useState)(defaultOpen);
	const isControlled = controlledOpen !== void 0;
	const open = isControlled ? !!controlledOpen : uncontrolledOpen;
	const [confirmLoading, setConfirmLoading] = (0, import_react$23.useState)(false);
	const setOpen = (0, import_react$23.useCallback)((next) => {
		if (!isControlled) setUncontrolledOpen(next);
		onOpenChange?.(next);
	}, [isControlled, onOpenChange]);
	const handleConfirm = (0, import_react$23.useCallback)((e) => {
		const ret = onConfirm?.(e);
		if (ret && typeof ret.then === "function") {
			setConfirmLoading(true);
			ret.then(() => {
				setConfirmLoading(false);
				setOpen(false);
			}).catch(() => {
				setConfirmLoading(false);
			});
			return;
		}
		setOpen(false);
	}, [onConfirm, setOpen]);
	const handleCancel = (0, import_react$23.useCallback)((e) => {
		onCancel?.(e);
		setOpen(false);
	}, [onCancel, setOpen]);
	const iconNode = icon === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(HelpCircleIcon, { size: "md" }) : icon;
	return /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Popover, {
		open,
		onOpenChange: setOpen,
		placement,
		triggerMode: trigger,
		disabled,
		hasArrow: arrow,
		trigger: children,
		className: ["wb-popconfirm", className].filter(Boolean).join(" "),
		role: "dialog",
		children: /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
			className: "wb-popconfirm__inner",
			children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
				className: "wb-popconfirm__message",
				children: [iconNode != null && /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("span", {
					className: "wb-popconfirm__icon",
					"aria-hidden": "true",
					children: iconNode
				}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
					className: "wb-popconfirm__text",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("div", {
						className: "wb-popconfirm__title",
						children: title
					}), description != null && /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)("div", {
						className: "wb-popconfirm__description",
						children: description
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsxs)("div", {
				className: "wb-popconfirm__buttons",
				children: [showCancel && /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Button, {
					size: "small",
					variant: "grey",
					...cancelButtonProps,
					onClick: handleCancel,
					children: cancelText
				}), /* @__PURE__ */ (0, import_jsx_runtime$22.jsx)(Button, {
					size: "small",
					variant: "primary",
					danger: okType === "danger",
					...okButtonProps,
					loading: confirmLoading,
					onClick: handleConfirm,
					children: okText
				})]
			})]
		})
	});
}
var import_react$23, import_jsx_runtime$22;
var init_Popconfirm$1 = __esmMin((() => {
	init_Popconfirm$2();
	import_react$23 = /* @__PURE__ */ __toESM(require_react());
	init_Button();
	init_Icon();
	init_Popover();
	import_jsx_runtime$22 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Popconfirm/index.ts
var init_Popconfirm = __esmMin((() => {
	init_Popconfirm$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Modal/Modal.scss
var init_Modal$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Modal/Modal.tsx
/** Modal 内部 body 区，可选包装；调用方也可直接放任意内容 */
function ModalBody({ children, className, bodyMask = false, style }) {
	const bodyRef = (0, import_react$22.useRef)(null);
	const [showMask, setShowMask] = (0, import_react$22.useState)(false);
	(0, import_react$22.useEffect)(() => {
		if (!bodyMask) return;
		const node = bodyRef.current;
		if (!node) return;
		const checkMask = () => {
			if (!(node.clientHeight < node.scrollHeight)) {
				setShowMask(false);
				return;
			}
			setShowMask(!(node.scrollHeight - node.scrollTop - node.clientHeight < 1));
		};
		checkMask();
		const ro = new ResizeObserver(checkMask);
		ro.observe(node);
		node.addEventListener("scroll", checkMask, { passive: true });
		return () => {
			ro.disconnect();
			node.removeEventListener("scroll", checkMask);
		};
	}, [bodyMask]);
	return /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
		ref: bodyRef,
		className: [
			"wb-modal__body",
			showMask ? "wb-modal__body--mask" : "",
			className
		].filter(Boolean).join(" "),
		style,
		children
	});
}
/**
* Modal 底部按钮区。
*
* 两种布局：
* - 默认 `align='right'`：所有 children 右对齐（老行为，兼容历史用法）
* - `align='between'` 或传了 `extra`：左侧 `extra` 槽 + 右侧 children SPACE_BETWEEN
*   （对齐设计稿 `1303:5495` 底部操作栏：左操作 + 右按钮）
*/
function ModalFooter({ children, className, align = "right", extra }) {
	const resolvedAlign = extra !== void 0 ? "between" : align;
	const merged = [
		"wb-modal__footer",
		`wb-modal__footer--${resolvedAlign}`,
		className
	].filter(Boolean).join(" ");
	if (resolvedAlign === "between") return /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
		className: merged,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
			className: "wb-modal__footer-extra",
			children: extra
		}), /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
			className: "wb-modal__footer-actions",
			children
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
		className: merged,
		children
	});
}
function toCssLength$1(value) {
	if (value === void 0) return;
	return typeof value === "number" ? `${value}px` : value;
}
function ModalImpl({ open, onOpenChange, title, headerExtra, headerActions, onBack, icon, description, children, size = "medium", variant = "standard", width, height, align = "center", centered: _centered, closeOnOverlayClick = true, closeOnEscape = true, closable = true, unstyled = false, className, wrapClassName, bodyStyle, bodyMask = false, ariaLabel, closeAriaLabel, backAriaLabel, afterOpenChange, footer, footerExtra, footerAlign, okText = "OK", cancelText = "Cancel", onOk, onCancel, okButtonProps, cancelButtonProps, okType = "primary", confirmLoading }) {
	const labelId = (0, import_react$22.useId)();
	const [internalLoading, setInternalLoading] = (0, import_react$22.useState)(false);
	const dialogRef = (0, import_react$22.useRef)(null);
	const prevOpenRef = (0, import_react$22.useRef)(open);
	const overlayRef = (0, import_react$22.useRef)(null);
	const { refs, context } = useFloating({
		open,
		onOpenChange
	});
	const zIndex = useFloatingLayer(open);
	const { getFloatingProps } = useInteractions([useDismiss(context, {
		outsidePress: closeOnOverlayClick,
		escapeKey: closeOnEscape
	}), useRole(context, { role: "dialog" })]);
	(0, import_react$22.useEffect)(() => {
		if (prevOpenRef.current === open) return;
		prevOpenRef.current = open;
		if (!afterOpenChange) return;
		if (open) {
			const node = dialogRef.current;
			if (node) {
				const handler = () => {
					node.removeEventListener("animationend", handler);
					afterOpenChange(true);
				};
				node.addEventListener("animationend", handler);
				return () => node.removeEventListener("animationend", handler);
			}
			const t = setTimeout(() => afterOpenChange(true), 220);
			return () => clearTimeout(t);
		}
		afterOpenChange(false);
	}, [open, afterOpenChange]);
	if (!open) return null;
	const resolvedAlign = align;
	const merged = [
		"wb-modal",
		!unstyled && `wb-modal--${size}`,
		!unstyled && variant !== "standard" && `wb-modal--${variant}`,
		unstyled && "wb-modal--unstyled",
		className
	].filter(Boolean).join(" ");
	const overlayClassName = [
		"wb-modal__overlay",
		`wb-modal__overlay--${resolvedAlign}`,
		wrapClassName
	].filter(Boolean).join(" ");
	const inlineStyle = {};
	const widthValue = toCssLength$1(width);
	const heightValue = toCssLength$1(height);
	if (widthValue) {
		inlineStyle.width = widthValue;
		inlineStyle.maxWidth = widthValue;
	}
	if (heightValue) inlineStyle.height = heightValue;
	const hasBuiltinFooterTrigger = footer === void 0 && (onOk !== void 0 || onCancel !== void 0 || okButtonProps !== void 0 || cancelButtonProps !== void 0 || confirmLoading !== void 0);
	const handleCancelClick = (e) => {
		onCancel?.(e);
		if (!e.defaultPrevented) onOpenChange(false);
	};
	const handleOkClick = async (e) => {
		if (!onOk) {
			onOpenChange(false);
			return;
		}
		try {
			const result = onOk(e);
			if (result && typeof result.then === "function") {
				setInternalLoading(true);
				const resolved = await result;
				setInternalLoading(false);
				if (resolved !== false) onOpenChange(false);
			} else if (result !== false) onOpenChange(false);
		} catch (err) {
			setInternalLoading(false);
			throw err;
		}
	};
	const okLoading = confirmLoading !== void 0 ? confirmLoading : internalLoading;
	const renderBuiltinFooter = () => /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)(ModalFooter, {
		align: footerAlign,
		extra: footerExtra,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Button, {
			variant: "grey",
			size: "medium",
			...cancelButtonProps,
			onClick: handleCancelClick,
			children: cancelText
		}), /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Button, {
			variant: "primary",
			size: "medium",
			danger: okType === "danger",
			...okButtonProps,
			loading: okLoading,
			onClick: handleOkClick,
			children: okText
		})]
	});
	const shouldRenderHeader = title !== void 0 || onBack !== void 0 || headerActions !== void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(FloatingPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(FloatingOverlay, {
		ref: overlayRef,
		className: overlayClassName,
		style: { zIndex },
		lockScroll: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(FloatingFocusManager, {
			context,
			children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
				ref: (node) => {
					refs.setFloating(node);
					dialogRef.current = node;
				},
				className: merged,
				style: inlineStyle,
				"aria-labelledby": title ? labelId : void 0,
				"aria-label": !title ? ariaLabel : void 0,
				...getFloatingProps(),
				children: [
					closable && /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Button, {
						type: "button",
						className: "wb-modal__close",
						variant: "ghost",
						size: "small",
						shape: "circle",
						"aria-label": closeAriaLabel ?? getA11yLabel("close"),
						onClick: () => onOpenChange(false),
						iconOnly: true,
						leftIcon: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(XCloseIcon, {})
					}),
					icon ? /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
						className: "wb-modal__icon-layout",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
							className: "wb-modal__icon-wrapper",
							children: icon
						}), /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
							className: "wb-modal__icon-content",
							children: [shouldRenderHeader && /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
								className: "wb-modal__header",
								children: [/* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
									className: "wb-modal__header-row",
									children: [
										onBack && /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("button", {
											type: "button",
											className: "wb-modal__back",
											"aria-label": backAriaLabel ?? getA11yLabel("back"),
											onClick: onBack,
											children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("span", {
												"aria-hidden": true,
												children: "‹"
											})
										}),
										title !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
											className: "wb-modal__title-wrap",
											children: [/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("h2", {
												className: "wb-modal__title",
												id: labelId,
												children: title
											}), headerExtra !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("span", {
												className: "wb-modal__header-extra",
												children: headerExtra
											})]
										}),
										headerActions !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
											className: "wb-modal__header-tail",
											children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
												className: "wb-modal__header-actions",
												children: headerActions
											})
										})
									]
								}), description !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
									className: "wb-modal__description",
									children: description
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(ModalBody, {
								bodyMask,
								style: bodyStyle,
								children
							})]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)(import_jsx_runtime$21.Fragment, { children: [shouldRenderHeader && /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
						className: "wb-modal__header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
							className: "wb-modal__header-row",
							children: [
								onBack && /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("button", {
									type: "button",
									className: "wb-modal__back",
									"aria-label": backAriaLabel ?? getA11yLabel("back"),
									onClick: onBack,
									children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("span", {
										"aria-hidden": true,
										children: "‹"
									})
								}),
								title !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime$21.jsxs)("div", {
									className: "wb-modal__title-wrap",
									children: [/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("h2", {
										className: "wb-modal__title",
										id: labelId,
										children: title
									}), headerExtra !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("span", {
										className: "wb-modal__header-extra",
										children: headerExtra
									})]
								}),
								headerActions !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
									className: "wb-modal__header-tail",
									children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
										className: "wb-modal__header-actions",
										children: headerActions
									})
								})
							]
						}), description !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
							className: "wb-modal__description",
							children: description
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(ModalBody, {
						bodyMask,
						style: bodyStyle,
						children
					})] }),
					footer === null ? null : footer !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(ModalFooter, {
						align: footerAlign,
						extra: footerExtra,
						children: footer
					}) : hasBuiltinFooterTrigger ? renderBuiltinFooter() : footerExtra !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(ModalFooter, {
						align: footerAlign,
						extra: footerExtra
					}) : null
				]
			})
		})
	}) });
}
function ConfirmInnerBody({ type, content }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
		className: `wb-modal__body wb-modal__confirm-body wb-modal__confirm-body--${type}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)("div", {
			className: "wb-modal__confirm-content",
			children: content
		})
	});
}
function SingleOkFooter({ okText, okType, okButtonProps, onOk }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(Button, {
		variant: "primary",
		size: "medium",
		danger: okType === "danger",
		...okButtonProps,
		onClick: onOk,
		children: okText
	});
}
function createConfirm(type) {
	return (options) => {
		if (typeof document === "undefined") return {
			destroy: () => {},
			update: () => {}
		};
		const container = document.createElement("div");
		container.className = `wb-modal-confirm-portal wb-modal-confirm-portal--${type}`;
		document.body.appendChild(container);
		const root = (0, import_client.createRoot)(container);
		let currentOptions = options;
		const renderRef = {};
		const cleanup = () => {
			setTimeout(() => {
				root.unmount();
				if (container.parentNode) container.parentNode.removeChild(container);
			}, 0);
		};
		const ConfirmRenderer = () => {
			const [opts, setOpts] = (0, import_react$22.useState)(currentOptions);
			const [open, setOpen] = (0, import_react$22.useState)(true);
			renderRef.setOpts = setOpts;
			renderRef.close = () => setOpen(false);
			const showCancel = opts.showCancel ?? type === "confirm";
			const okType = opts.okType ?? (type === "error" ? "danger" : "primary");
			const defaultOkText = type === "confirm" ? "OK" : "Got it";
			return /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(ModalImpl, {
				open,
				onOpenChange: (next) => {
					setOpen(next);
					if (!next) cleanup();
				},
				title: opts.title,
				icon: opts.icon,
				size: opts.size ?? "small",
				variant: "confirm",
				closable: false,
				closeOnEscape: opts.closeOnEscape ?? true,
				closeOnOverlayClick: opts.closeOnOverlayClick ?? false,
				okText: opts.okText ?? defaultOkText,
				cancelText: opts.cancelText ?? "Cancel",
				okType,
				okButtonProps: opts.okButtonProps,
				cancelButtonProps: opts.cancelButtonProps,
				onOk: async () => {
					if (!opts.onOk) return;
					return await opts.onOk();
				},
				onCancel: () => {
					opts.onCancel?.();
				},
				footer: showCancel ? void 0 : /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(SingleOkFooter, {
					okText: opts.okText ?? defaultOkText,
					okType,
					okButtonProps: opts.okButtonProps,
					onOk: async () => {
						if (opts.onOk) await opts.onOk();
						setOpen(false);
					}
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(ConfirmInnerBody, {
					type,
					content: opts.content
				})
			});
		};
		root.render(/* @__PURE__ */ (0, import_jsx_runtime$21.jsx)(ConfirmRenderer, {}));
		return {
			destroy: () => {
				renderRef.close?.();
				setTimeout(cleanup, 50);
			},
			update: (next) => {
				currentOptions = {
					...currentOptions,
					...next
				};
				renderRef.setOpts?.(currentOptions);
			}
		};
	};
}
var import_react$22, import_client, import_jsx_runtime$21, Modal;
var init_Modal$1 = __esmMin((() => {
	init_Modal$2();
	init_floating_ui_react();
	import_react$22 = /* @__PURE__ */ __toESM(require_react());
	import_client = /* @__PURE__ */ __toESM(require_client());
	init_foundation();
	init_use_floating_layer();
	init_a11y();
	init_Button();
	import_jsx_runtime$21 = require_jsx_runtime();
	Modal = ModalImpl;
	Modal.confirm = createConfirm("confirm");
	Modal.info = createConfirm("info");
	Modal.success = createConfirm("success");
	Modal.warning = createConfirm("warning");
	Modal.error = createConfirm("error");
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Modal/index.ts
var init_Modal = __esmMin((() => {
	init_Modal$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Drawer/Drawer.scss
var init_Drawer$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Drawer/Drawer.tsx
/** Drawer 内部 body 区，可选包装；调用方也可直接放任意内容 */
function DrawerBody({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
		className: ["wb-drawer__body", className].filter(Boolean).join(" "),
		children
	});
}
/** Drawer 底部按钮区 —— 标准右对齐布局（与 ModalFooter 一致） */
function DrawerFooter({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
		className: ["wb-drawer__footer", className].filter(Boolean).join(" "),
		children
	});
}
function toCssLength(value) {
	if (value === void 0) return;
	return typeof value === "number" ? `${value}px` : value;
}
function Drawer({ open, onOpenChange, placement = "right", size = "default", width, height, title, extra, children, footer, closable = true, closeIcon, mask = true, maskClosable = true, keyboard = true, className, rootClassName, ariaLabel, closeAriaLabel }) {
	const labelId = (0, import_react$21.useId)();
	const { refs, context } = useFloating({
		open,
		onOpenChange
	});
	const zIndex = useFloatingLayer(open);
	const { getFloatingProps } = useInteractions([useDismiss(context, {
		outsidePress: mask && maskClosable,
		escapeKey: keyboard
	}), useRole(context, { role: "dialog" })]);
	const overlayRef = (0, import_react$21.useRef)(null);
	if (!open) return null;
	const isHorizontal = placement === "left" || placement === "right";
	const containerClassName = [
		"wb-drawer",
		`wb-drawer--${placement}`,
		`wb-drawer--${size}`,
		className
	].filter(Boolean).join(" ");
	const overlayClassName = [
		"wb-drawer__overlay",
		`wb-drawer__overlay--${placement}`,
		!mask && "wb-drawer__overlay--no-mask",
		rootClassName
	].filter(Boolean).join(" ");
	const inlineStyle = {};
	const widthValue = toCssLength(width);
	const heightValue = toCssLength(height);
	if (isHorizontal && widthValue) inlineStyle.width = widthValue;
	if (!isHorizontal && heightValue) inlineStyle.height = heightValue;
	const showHeader = Boolean(title || extra || closable);
	return /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(FloatingPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(FloatingOverlay, {
		ref: overlayRef,
		className: overlayClassName,
		style: { zIndex },
		lockScroll: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)(FloatingFocusManager, {
			context,
			children: /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
				ref: refs.setFloating,
				className: containerClassName,
				style: inlineStyle,
				"aria-labelledby": title ? labelId : void 0,
				"aria-label": !title ? ariaLabel : void 0,
				...getFloatingProps(),
				children: [
					showHeader && /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
						className: "wb-drawer__header",
						children: [title && /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("h2", {
							className: "wb-drawer__title",
							id: labelId,
							children: title
						}), /* @__PURE__ */ (0, import_jsx_runtime$20.jsxs)("div", {
							className: "wb-drawer__header-extra",
							children: [extra, closable && /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("button", {
								type: "button",
								className: "wb-drawer__close",
								"aria-label": closeAriaLabel ?? getA11yLabel("close"),
								onClick: () => onOpenChange(false),
								children: closeIcon ?? /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("span", {
									"aria-hidden": true,
									children: "×"
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
						className: "wb-drawer__content",
						children
					}),
					footer && /* @__PURE__ */ (0, import_jsx_runtime$20.jsx)("div", {
						className: "wb-drawer__footer-wrap",
						children: footer
					})
				]
			})
		})
	}) });
}
var import_react$21, import_jsx_runtime$20;
var init_Drawer$1 = __esmMin((() => {
	init_Drawer$2();
	init_floating_ui_react();
	import_react$21 = /* @__PURE__ */ __toESM(require_react());
	init_use_floating_layer();
	init_a11y();
	import_jsx_runtime$20 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Drawer/index.ts
var init_Drawer = __esmMin((() => {
	init_Drawer$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Dropdown/Dropdown.scss
var init_Dropdown$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Dropdown/Dropdown.tsx
function Dropdown({ trigger, items, onSelect, placement = "bottom", triggerMode = "click", offsetDistance, open: controlledOpen, onOpenChange, disabled, portalRoot, className }) {
	const [uncontrolledOpen, setUncontrolledOpen] = (0, import_react$20.useState)(false);
	const isControlled = controlledOpen !== void 0;
	const open = isControlled ? !!controlledOpen : uncontrolledOpen;
	const handleOpenChange = (0, import_react$20.useCallback)((next) => {
		if (!isControlled) setUncontrolledOpen(next);
		onOpenChange?.(next);
	}, [isControlled, onOpenChange]);
	const handleClickItem = (0, import_react$20.useCallback)((item) => {
		if (item.disabled) return;
		if (onSelect?.(item.key, item) !== false) handleOpenChange(false);
	}, [onSelect, handleOpenChange]);
	return /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)(Popover, {
		trigger,
		triggerMode,
		placement,
		offsetDistance,
		open,
		onOpenChange: handleOpenChange,
		disabled,
		role: "menu",
		className: ["wb-dropdown", className].filter(Boolean).join(" "),
		portalRoot: portalRoot ?? "inline",
		stopClickPropagation: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("ul", {
			className: "wb-dropdown__list",
			role: "none",
			children: items.map((item) => {
				const trackAttrs = item.trackId ? {
					"data-track-id": item.trackId,
					...item.trackName ? { "data-track-name": item.trackName } : {},
					...item.trackProps ? { "data-track-props": JSON.stringify(item.trackProps) } : {}
				} : {};
				return /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)(import_react$20.Fragment, { children: [item.divider && /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("li", {
					className: "wb-dropdown__divider",
					role: "separator"
				}), /* @__PURE__ */ (0, import_jsx_runtime$19.jsxs)("li", {
					className: [
						"wb-dropdown__item",
						item.disabled ? "wb-dropdown__item--disabled" : "",
						item.danger ? "wb-dropdown__item--danger" : "",
						item.selected ? "wb-dropdown__item--selected" : ""
					].filter(Boolean).join(" "),
					role: "menuitem",
					"aria-disabled": item.disabled || void 0,
					"aria-checked": item.selected || void 0,
					tabIndex: item.disabled ? -1 : 0,
					onClick: () => handleClickItem(item),
					onKeyDown: (e) => {
						if (e.key === "Enter" || e.key === " ") {
							e.preventDefault();
							handleClickItem(item);
						}
					},
					...trackAttrs,
					children: [
						item.icon && /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("span", {
							className: "wb-dropdown__icon",
							children: item.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("span", {
							className: "wb-dropdown__label",
							children: item.label
						}),
						item.trackId && /* @__PURE__ */ (0, import_jsx_runtime$19.jsx)("button", {
							type: "button",
							className: "wb-dropdown__item-hit",
							"aria-hidden": "true",
							tabIndex: -1,
							onClick: (e) => {
								e.stopPropagation();
								handleClickItem(item);
							},
							...trackAttrs
						})
					]
				})] }, item.key);
			})
		})
	});
}
var import_react$20, import_jsx_runtime$19;
var init_Dropdown$1 = __esmMin((() => {
	init_Dropdown$2();
	import_react$20 = /* @__PURE__ */ __toESM(require_react());
	init_Popover();
	import_jsx_runtime$19 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Dropdown/index.ts
var init_Dropdown = __esmMin((() => {
	init_Dropdown$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Notification/Notification.scss
var init_Notification$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Notification/Notification.tsx
var import_react$19, import_jsx_runtime$18, Notification;
var init_Notification$1 = __esmMin((() => {
	init_Notification$2();
	init_lucide_react();
	import_react$19 = /* @__PURE__ */ __toESM(require_react());
	init_Button();
	import_jsx_runtime$18 = require_jsx_runtime();
	Notification = (0, import_react$19.forwardRef)(function Notification({ data, onActionClick, onClose, expandable = true, expandText = "View detail", collapseText = "Collapse", closeAriaLabel = "Close", maxContentHeight = 240, expanded: controlledExpanded, onExpandedChange, className }, ref) {
		const [internalExpanded, setInternalExpanded] = (0, import_react$19.useState)(false);
		const isControlled = controlledExpanded !== void 0;
		const isExpanded = isControlled ? controlledExpanded : internalExpanded;
		const toggleExpanded = (0, import_react$19.useCallback)(() => {
			const next = !isExpanded;
			if (!isControlled) setInternalExpanded(next);
			onExpandedChange?.(next);
		}, [
			isControlled,
			isExpanded,
			onExpandedChange
		]);
		const handleActionClick = (0, import_react$19.useCallback)((action) => {
			onActionClick?.(action);
		}, [onActionClick]);
		const { title, content, actions } = data;
		const canToggleExpand = expandable && Boolean(content);
		return /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
			ref,
			className: ["wb-notification", className].filter(Boolean).join(" "),
			role: "status",
			"aria-live": "polite",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
					className: "wb-notification__header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("h3", {
						className: "wb-notification__title",
						title,
						children: title
					}), onClose && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("button", {
						type: "button",
						className: "wb-notification__close",
						onClick: onClose,
						"aria-label": closeAriaLabel,
						children: /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(X, {
							size: 14,
							"aria-hidden": "true"
						})
					})]
				}),
				content && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
					className: isExpanded ? "wb-notification__content wb-notification__content--expanded" : "wb-notification__content wb-notification__content--collapsed",
					style: isExpanded ? { maxHeight: maxContentHeight } : void 0,
					children: content
				}),
				/* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("div", {
					className: "wb-notification__footer",
					children: [canToggleExpand ? /* @__PURE__ */ (0, import_jsx_runtime$18.jsxs)("button", {
						type: "button",
						className: "wb-notification__toggle",
						onClick: toggleExpanded,
						"aria-expanded": isExpanded,
						children: [isExpanded ? collapseText : expandText, isExpanded ? /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(ChevronUp, {
							size: 14,
							"aria-hidden": "true"
						}) : /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(ChevronDown, {
							size: 14,
							"aria-hidden": "true"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("span", { "aria-hidden": "true" }), actions.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)("div", {
						className: "wb-notification__actions",
						children: actions.map((action, index) => {
							return /* @__PURE__ */ (0, import_jsx_runtime$18.jsx)(Button, {
								size: "small",
								variant: index === actions.length - 1 ? "primary" : "secondary",
								onClick: (event) => {
									event.currentTarget.blur();
									handleActionClick(action);
								},
								children: action.text
							}, action.key);
						})
					})]
				})
			]
		});
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Notification/index.ts
var init_Notification = __esmMin((() => {
	init_Notification$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Select/Select.scss
var init_Select$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Select/Select.tsx
/**
* 默认过滤：按 label（兜底用 value）的小写子串匹配。
* label 为 ReactNode 时走 String() 兜底（业务侧若传 JSX 走不到精确匹配，建议同时传 value 子串）。
*/
function defaultFilter(opt, keyword) {
	if (!keyword) return true;
	const k = keyword.toLowerCase();
	const labelText = typeof opt.label === "string" ? opt.label : String(opt.label ?? "");
	return opt.value.toLowerCase().includes(k) || labelText.toLowerCase().includes(k);
}
function Select(props) {
	const { options, placeholder = "Please select", disabled, invalid, allowClear, size = "medium", placement = "bottom", className, fullWidth, showSearch, clearAriaLabel } = props;
	const isMultiple = props.mode === "multiple";
	const [uncontrolledSingle, setUncontrolledSingle] = (0, import_react$18.useState)(isMultiple ? void 0 : props.defaultValue);
	const [uncontrolledMultiple, setUncontrolledMultiple] = (0, import_react$18.useState)(isMultiple ? props.defaultValue ?? [] : []);
	const isControlled = isMultiple ? props.value !== void 0 : props.value !== void 0;
	const singleValue = isMultiple ? void 0 : isControlled ? props.value : uncontrolledSingle;
	const multipleValue = isMultiple ? isControlled ? props.value ?? [] : uncontrolledMultiple : [];
	const [open, setOpen] = (0, import_react$18.useState)(false);
	const [keyword, setKeyword] = (0, import_react$18.useState)("");
	const listId = (0, import_react$18.useId)();
	const handleOpenChange = (0, import_react$18.useCallback)((next) => {
		if (!next) setKeyword("");
		setOpen(next);
	}, []);
	const filteredOptions = (0, import_react$18.useMemo)(() => {
		if (!showSearch || !keyword) return options;
		return options.filter((o) => defaultFilter(o, keyword));
	}, [
		options,
		showSearch,
		keyword
	]);
	const selectedSingle = options.find((o) => o.value === singleValue);
	const selectedMultipleSet = (0, import_react$18.useMemo)(() => new Set(multipleValue), [multipleValue]);
	const selectedMultipleOptions = (0, import_react$18.useMemo)(() => options.filter((o) => selectedMultipleSet.has(o.value)), [options, selectedMultipleSet]);
	const handleSelect = (0, import_react$18.useCallback)((opt) => {
		if (opt.disabled) return;
		if (isMultiple) {
			const cur = multipleValue;
			const exists = cur.includes(opt.value);
			const max = props.maxCount;
			if (!exists && typeof max === "number" && cur.length >= max) return;
			const next = exists ? cur.filter((v) => v !== opt.value) : [...cur, opt.value];
			if (!isControlled) setUncontrolledMultiple(next);
			const nextOptions = options.filter((o) => next.includes(o.value));
			props.onChange?.(next, nextOptions);
		} else {
			if (!isControlled) setUncontrolledSingle(opt.value);
			props.onChange?.(opt.value, opt);
			setOpen(false);
		}
	}, [
		isMultiple,
		multipleValue,
		isControlled,
		options,
		props
	]);
	const handleRemoveTag = (0, import_react$18.useCallback)((event, value) => {
		event.stopPropagation();
		if (disabled || !isMultiple) return;
		const next = multipleValue.filter((v) => v !== value);
		if (!isControlled) setUncontrolledMultiple(next);
		const nextOptions = options.filter((o) => next.includes(o.value));
		props.onChange?.(next, nextOptions);
	}, [
		disabled,
		isMultiple,
		multipleValue,
		isControlled,
		options,
		props
	]);
	const handleClear = (0, import_react$18.useCallback)((event) => {
		event.stopPropagation();
		if (disabled) return;
		if (isMultiple) {
			if (!isControlled) setUncontrolledMultiple([]);
			props.onChange?.([], []);
		} else {
			if (!isControlled) setUncontrolledSingle(void 0);
			props.onChange?.("", null);
		}
	}, [
		disabled,
		isMultiple,
		isControlled,
		props
	]);
	const hasValue = isMultiple ? multipleValue.length > 0 : selectedSingle !== void 0;
	const showClear = allowClear && hasValue && !disabled;
	const triggerClass = [
		"wb-select",
		`wb-select--${size}`,
		isMultiple ? "wb-select--multiple" : "",
		invalid ? "wb-select--invalid" : "",
		disabled ? "wb-select--disabled" : "",
		open ? "wb-select--open" : "",
		fullWidth ? "wb-select--full-width" : "",
		!hasValue ? "wb-select--empty" : "",
		showClear ? "wb-select--clearable" : "",
		className
	].filter(Boolean).join(" ");
	const renderTriggerValue = () => {
		if (isMultiple) {
			if (selectedMultipleOptions.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
				className: "wb-select__placeholder",
				children: placeholder
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
				className: "wb-select__tags",
				children: selectedMultipleOptions.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("span", {
					className: "wb-select__tag",
					children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
						className: "wb-select__tag-label",
						children: opt.label ?? opt.value
					}), !disabled && /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
						role: "button",
						"aria-label": props.removeTagAriaLabel?.(opt.value) ?? `${getA11yLabel("remove")} ${opt.value}`,
						className: "wb-select__tag-close",
						onClick: (e) => handleRemoveTag(e, opt.value),
						onMouseDown: (e) => e.stopPropagation(),
						children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(ClearIcon, {})
					})]
				}, opt.value))
			});
		}
		if (selectedSingle) return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
			className: "wb-select__value",
			children: selectedSingle.label ?? selectedSingle.value
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
			className: "wb-select__placeholder",
			children: placeholder
		});
	};
	const trigger = /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("button", {
		type: "button",
		className: triggerClass,
		disabled,
		"aria-haspopup": "listbox",
		"aria-expanded": open,
		"aria-controls": listId,
		children: [renderTriggerValue(), showClear ? /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
			role: "button",
			tabIndex: -1,
			"aria-label": clearAriaLabel ?? getA11yLabel("clear"),
			className: "wb-select__clear",
			onClick: handleClear,
			onMouseDown: (e) => e.stopPropagation(),
			children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(ClearIcon, {})
		}) : /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
			className: "wb-select__caret",
			"aria-hidden": true,
			children: "▾"
		})]
	});
	const isOptionSelected = (opt) => {
		if (isMultiple) return selectedMultipleSet.has(opt.value);
		return opt.value === singleValue;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)(Popover, {
		trigger,
		placement,
		triggerMode: "click",
		open,
		onOpenChange: handleOpenChange,
		disabled,
		role: "listbox",
		className: "wb-select-popover",
		portalRoot: "inline",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("div", {
			className: "wb-select__panel",
			children: [showSearch && /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("div", {
				className: "wb-select__search",
				children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("input", {
					type: "text",
					className: "wb-select__search-input",
					placeholder: "Search",
					value: keyword,
					onChange: (e) => setKeyword(e.target.value),
					onMouseDown: (e) => e.stopPropagation(),
					autoFocus: true
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("ul", {
				id: listId,
				className: "wb-select__list",
				role: "listbox",
				"aria-multiselectable": isMultiple,
				children: filteredOptions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("li", {
					className: "wb-select__empty",
					children: "No options"
				}) : filteredOptions.map((opt) => {
					const isSelected = isOptionSelected(opt);
					return /* @__PURE__ */ (0, import_jsx_runtime$17.jsxs)("li", {
						className: [
							"wb-select__option",
							isSelected ? "wb-select__option--selected" : "",
							opt.disabled ? "wb-select__option--disabled" : ""
						].filter(Boolean).join(" "),
						role: "option",
						"aria-selected": isSelected,
						"aria-disabled": opt.disabled || void 0,
						tabIndex: opt.disabled ? -1 : 0,
						onClick: () => handleSelect(opt),
						onKeyDown: (e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								handleSelect(opt);
							}
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
							className: "wb-select__option-label",
							children: opt.label ?? opt.value
						}), isSelected && /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("span", {
							className: "wb-select__option-check",
							"aria-hidden": true,
							children: "✓"
						})]
					}, opt.value);
				})
			})]
		})
	});
}
var import_react$18, import_jsx_runtime$17, ClearIcon;
var init_Select$1 = __esmMin((() => {
	init_Select$2();
	import_react$18 = /* @__PURE__ */ __toESM(require_react());
	init_a11y();
	init_Popover();
	import_jsx_runtime$17 = require_jsx_runtime();
	ClearIcon = () => /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("svg", {
		width: "12",
		height: "12",
		viewBox: "0 0 12 12",
		fill: "none",
		xmlns: "http://www.w3.org/2000/svg",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime$17.jsx)("path", {
			d: "M3 3L9 9M9 3L3 9",
			stroke: "currentColor",
			strokeWidth: "1.4",
			strokeLinecap: "round"
		})
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Select/index.ts
var init_Select = __esmMin((() => {
	init_Select$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Message/Message.tsx
/** 内部 dispatch —— 同时支持位置参数与对象参数 */
function dispatch(type, contentOrOptions, durationFromArg) {
	const options = isMessageOptions(contentOrOptions) ? contentOrOptions : {
		content: contentOrOptions,
		duration: durationFromArg
	};
	const finalType = type === "loading" ? "plain" : type;
	const finalContent = type === "loading" ? /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)(LoadingMessageContent, { children: options.content }) : options.content;
	const finalDuration = options.duration ?? (type === "loading" ? 0 : void 0);
	if (options.key) {
		const prevClose = keyRegistry.get(options.key);
		if (prevClose) {
			prevClose();
			keyRegistry.delete(options.key);
		}
	}
	const handle = toast({
		message: finalContent,
		type: finalType,
		...finalDuration !== void 0 ? { duration: finalDuration } : {},
		onClose: () => {
			if (options.key) keyRegistry.delete(options.key);
			options.onClose?.();
		}
	});
	const close = () => handle.close();
	if (options.key) keyRegistry.set(options.key, close);
	return close;
}
function isMessageOptions(x) {
	return typeof x === "object" && x !== null && !x.$$typeof && !Array.isArray(x) && "content" in x;
}
/** Loading toast 内容包装：在文本前加一个旋转 spinner */
function LoadingMessageContent({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$16.jsxs)("span", {
		style: {
			display: "inline-flex",
			alignItems: "center",
			gap: 8
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("span", {
			"aria-hidden": true,
			style: {
				display: "inline-block",
				width: 14,
				height: 14,
				border: "2px solid currentColor",
				borderRightColor: "transparent",
				borderRadius: "50%",
				animation: "wb-message-loading-spin 0.7s linear infinite",
				verticalAlign: "middle"
			}
		}), /* @__PURE__ */ (0, import_jsx_runtime$16.jsx)("span", { children })]
	});
}
function makeMessageFn(type) {
	function fn(arg1, arg2) {
		return dispatch(type, arg1, arg2);
	}
	return fn;
}
var import_jsx_runtime$16, keyRegistry, message;
var init_Message$1 = __esmMin((() => {
	init_src();
	require_react();
	import_jsx_runtime$16 = require_jsx_runtime();
	keyRegistry = /* @__PURE__ */ new Map();
	if (typeof document !== "undefined") {
		const STYLE_ID = "wb-message-loading-keyframes";
		if (!document.getElementById(STYLE_ID)) {
			const style = document.createElement("style");
			style.id = STYLE_ID;
			style.textContent = "@keyframes wb-message-loading-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }";
			document.head.appendChild(style);
		}
	}
	message = {
		success: makeMessageFn("success"),
		info: makeMessageFn("info"),
		warning: makeMessageFn("warning"),
		error: makeMessageFn("error"),
		loading: makeMessageFn("loading")
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Message/index.ts
var init_Message = __esmMin((() => {
	init_Message$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Switch/Switch.scss
var init_Switch$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Switch/Switch.tsx
var import_react$16, import_jsx_runtime$15, Switch;
var init_Switch$1 = __esmMin((() => {
	init_Switch$2();
	import_react$16 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$15 = require_jsx_runtime();
	Switch = (0, import_react$16.forwardRef)(function Switch({ className, size = "medium", label, id, loading, disabled, ...rest }, ref) {
		const autoId = (0, import_react$16.useId)();
		const inputId = id ?? `wb-switch-${autoId}`;
		return /* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("label", {
			className: [
				"wb-switch",
				`wb-switch--${size}`,
				loading ? "wb-switch--loading" : "",
				className
			].filter(Boolean).join(" "),
			htmlFor: inputId,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsxs)("span", {
				className: "wb-switch__control",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("input", {
					ref,
					id: inputId,
					type: "checkbox",
					role: "switch",
					"aria-busy": loading || void 0,
					className: "wb-switch__input",
					disabled: disabled || loading,
					...rest
				}), /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("span", {
					className: "wb-switch__track",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("span", {
						className: "wb-switch__thumb",
						children: loading && /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("span", { className: "wb-switch__spinner" })
					})
				})]
			}), label !== void 0 && label !== null && label !== "" && /* @__PURE__ */ (0, import_jsx_runtime$15.jsx)("span", {
				className: "wb-switch__label",
				children: label
			})]
		});
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Switch/index.ts
var init_Switch = __esmMin((() => {
	init_Switch$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Checkbox/Checkbox.scss
var init_Checkbox$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Checkbox/Checkbox.tsx
var import_react$15, import_jsx_runtime$14, Checkbox$1;
var init_Checkbox$1 = __esmMin((() => {
	init_Checkbox$2();
	import_react$15 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$14 = require_jsx_runtime();
	Checkbox$1 = (0, import_react$15.forwardRef)(function Checkbox({ className, size = "medium", label, id, indeterminate, disabled, ...rest }, ref) {
		const autoId = (0, import_react$15.useId)();
		const inputId = id ?? `wb-checkbox-${autoId}`;
		const innerRef = (0, import_react$15.useRef)(null);
		(0, import_react$15.useImperativeHandle)(ref, () => innerRef.current, []);
		(0, import_react$15.useEffect)(() => {
			if (innerRef.current) innerRef.current.indeterminate = !!indeterminate;
		}, [indeterminate]);
		return /* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("label", {
			className: [
				"wb-checkbox",
				`wb-checkbox--${size}`,
				indeterminate ? "wb-checkbox--indeterminate" : "",
				className
			].filter(Boolean).join(" "),
			htmlFor: inputId,
			children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsxs)("span", {
				className: "wb-checkbox__control",
				children: [/* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("input", {
					ref: innerRef,
					id: inputId,
					type: "checkbox",
					"aria-checked": indeterminate ? "mixed" : void 0,
					className: "wb-checkbox__input",
					disabled,
					...rest
				}), /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", {
					className: "wb-checkbox__box",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", { className: "wb-checkbox__icon" })
				})]
			}), label !== void 0 && label !== null && label !== "" && /* @__PURE__ */ (0, import_jsx_runtime$14.jsx)("span", {
				className: "wb-checkbox__label",
				children: label
			})]
		});
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Checkbox/CheckboxGroup.tsx
function useControllableValueArray(value, defaultValue, onChange) {
	const isControlled = value !== void 0;
	const [innerValue, setInnerValue] = import_react$14.useState(defaultValue ?? []);
	return [isControlled ? value : innerValue, (0, import_react$14.useCallback)((next) => {
		if (!isControlled) setInnerValue(next);
		onChange?.(next);
	}, [isControlled, onChange])];
}
/**
* 把 string 选项规整成对象形式。
*/
function normalizeOptions(options) {
	if (!options) return [];
	return options.map((opt) => typeof opt === "string" ? {
		label: opt,
		value: opt
	} : opt);
}
var import_react$14, import_jsx_runtime$13, CheckboxGroup;
var init_CheckboxGroup = __esmMin((() => {
	import_react$14 = /* @__PURE__ */ __toESM(require_react());
	init_Checkbox$1();
	import_jsx_runtime$13 = require_jsx_runtime();
	CheckboxGroup = import_react$14.forwardRef(function CheckboxGroup({ options, value, defaultValue, onChange, disabled, direction = "horizontal", className, style, children, size, name }, ref) {
		const [current, setValue] = useControllableValueArray(value, defaultValue, onChange);
		const normalized = normalizeOptions(options);
		const handleItemChange = (0, import_react$14.useCallback)((itemValue, e) => {
			const checked = e.target.checked;
			const all = normalized.map((o) => o.value);
			const set = new Set(current);
			if (checked) set.add(itemValue);
			else set.delete(itemValue);
			setValue(all.filter((v) => set.has(v)));
		}, [
			current,
			normalized,
			setValue
		]);
		const wrapperClass = [
			"wb-checkbox-group",
			`wb-checkbox-group--${direction}`,
			className
		].filter(Boolean).join(" ");
		if (children !== void 0) return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
			ref,
			className: wrapperClass,
			style,
			role: "group",
			children
		});
		return /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)("div", {
			ref,
			className: wrapperClass,
			style,
			role: "group",
			children: normalized.map((opt) => /* @__PURE__ */ (0, import_jsx_runtime$13.jsx)(Checkbox$1, {
				name,
				value: String(opt.value),
				size,
				label: opt.label,
				disabled: disabled || opt.disabled,
				checked: current.includes(opt.value),
				onChange: (e) => handleItemChange(opt.value, e)
			}, String(opt.value)))
		});
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Checkbox/index.ts
var Checkbox;
var init_Checkbox = __esmMin((() => {
	init_Checkbox$1();
	init_CheckboxGroup();
	Checkbox = Checkbox$1;
	Checkbox.Group = CheckboxGroup;
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Tabs/Tabs.scss
var init_Tabs$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Tabs/Tabs.tsx
function Tabs({ items, activeKey, defaultActiveKey, onChange, className, tabPosition = "top" }) {
	const id = (0, import_react$13.useId)();
	const isControlled = activeKey !== void 0;
	const [internalKey, setInternalKey] = (0, import_react$13.useState)((() => {
		if (defaultActiveKey) return defaultActiveKey;
		return items.find((i) => !i.disabled)?.key ?? items[0]?.key ?? "";
	})());
	const currentKey = isControlled ? activeKey : internalKey;
	const listRef = (0, import_react$13.useRef)(null);
	const tabRefs = (0, import_react$13.useRef)({});
	const labelRefs = (0, import_react$13.useRef)({});
	const [ink, setInk] = (0, import_react$13.useState)({
		left: 0,
		width: 0
	});
	const measuredRef = (0, import_react$13.useRef)(false);
	const [measured, setMeasured] = (0, import_react$13.useState)(false);
	const setActive = (0, import_react$13.useCallback)((key) => {
		if (!isControlled) setInternalKey(key);
		onChange?.(key);
	}, [isControlled, onChange]);
	(0, import_react$13.useEffect)(() => {
		if (isControlled) return;
		if (!items.some((i) => i.key === internalKey && !i.disabled)) {
			const next = items.find((i) => !i.disabled);
			if (next && next.key !== internalKey) setInternalKey(next.key);
		}
	}, [
		items,
		internalKey,
		isControlled
	]);
	/**
	* 测量并更新 ink-bar 几何。
	* 在每次 active 切换 / 容器尺寸变化 / 字体加载完成后调用。
	*
	* tabPosition='top'：测量水平 left/width，bar 贴底横向滑动
	* tabPosition='left'：测量垂直 top/height，bar 贴右纵向滑动
	*/
	const measure = (0, import_react$13.useCallback)(() => {
		const list = listRef.current;
		const labelEl = labelRefs.current[currentKey];
		if (!list || !labelEl) return;
		const listRect = list.getBoundingClientRect();
		const labelRect = labelEl.getBoundingClientRect();
		let left;
		let width;
		if (tabPosition === "left") {
			left = labelRect.top - listRect.top + INK_INSET;
			width = Math.max(labelRect.height - INK_INSET * 2, 0);
		} else {
			left = labelRect.left - listRect.left + INK_INSET;
			width = Math.max(labelRect.width - INK_INSET * 2, 0);
		}
		setInk((prev) => prev.left === left && prev.width === width ? prev : {
			left,
			width
		});
		if (!measuredRef.current) {
			measuredRef.current = true;
			requestAnimationFrame(() => setMeasured(true));
		}
	}, [currentKey, tabPosition]);
	(0, import_react$13.useLayoutEffect)(() => {
		measure();
	}, [measure, items]);
	(0, import_react$13.useEffect)(() => {
		const list = listRef.current;
		if (!list || typeof ResizeObserver === "undefined") return;
		const ro = new ResizeObserver(() => measure());
		ro.observe(list);
		Object.values(labelRefs.current).forEach((el) => {
			if (el) ro.observe(el);
		});
		return () => ro.disconnect();
	}, [measure, items]);
	(0, import_react$13.useEffect)(() => {
		const fonts = document.fonts;
		if (fonts?.ready) fonts.ready.then(() => measure()).catch(() => {});
	}, [measure]);
	const handleKeyDown = (e) => {
		const enabled = items.filter((i) => !i.disabled);
		if (enabled.length === 0) return;
		const idx = enabled.findIndex((i) => i.key === currentKey);
		let nextIdx = idx;
		const nextKeys = tabPosition === "left" ? ["ArrowDown"] : ["ArrowRight"];
		const prevKeys = tabPosition === "left" ? ["ArrowUp"] : ["ArrowLeft"];
		if (nextKeys.includes(e.key)) nextIdx = idx < 0 ? 0 : (idx + 1) % enabled.length;
		else if (prevKeys.includes(e.key)) nextIdx = idx <= 0 ? enabled.length - 1 : idx - 1;
		else if (e.key === "Home") nextIdx = 0;
		else if (e.key === "End") nextIdx = enabled.length - 1;
		else return;
		e.preventDefault();
		const nextKey = enabled[nextIdx].key;
		setActive(nextKey);
		tabRefs.current[nextKey]?.focus();
	};
	const merged = [
		"wb-tabs",
		`wb-tabs--${tabPosition}`,
		className
	].filter(Boolean).join(" ");
	const activeItem = items.find((i) => i.key === currentKey);
	const listStyle = {
		["--wb-tabs-ink-left"]: `${ink.left}px`,
		["--wb-tabs-ink-width"]: `${ink.width}px`
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
		className: merged,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$12.jsxs)("div", {
			ref: listRef,
			className: ["wb-tabs__list", measured ? "wb-tabs__list--measured" : ""].filter(Boolean).join(" "),
			role: "tablist",
			style: listStyle,
			onKeyDown: handleKeyDown,
			children: [items.map((item) => {
				const isActive = item.key === currentKey;
				return /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("button", {
					ref: (el) => {
						tabRefs.current[item.key] = el;
					},
					type: "button",
					role: "tab",
					"aria-selected": isActive,
					"aria-controls": `${id}-panel-${item.key}`,
					id: `${id}-tab-${item.key}`,
					tabIndex: isActive ? 0 : -1,
					disabled: item.disabled,
					className: [
						"wb-tabs__tab",
						isActive ? "wb-tabs__tab--active" : "",
						item.disabled ? "wb-tabs__tab--disabled" : ""
					].filter(Boolean).join(" "),
					onClick: () => !item.disabled && setActive(item.key),
					children: /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("span", {
						ref: (el) => {
							labelRefs.current[item.key] = el;
						},
						className: "wb-tabs__tab-label",
						"data-text": typeof item.label === "string" ? item.label : void 0,
						children: item.label
					})
				}, item.key);
			}), /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("span", {
				className: "wb-tabs__ink-bar",
				"aria-hidden": true
			})]
		}), activeItem?.children !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime$12.jsx)("div", {
			role: "tabpanel",
			id: `${id}-panel-${activeItem.key}`,
			"aria-labelledby": `${id}-tab-${activeItem.key}`,
			className: "wb-tabs__panel",
			tabIndex: 0,
			children: activeItem.children
		})]
	});
}
var import_react$13, import_jsx_runtime$12, INK_INSET;
var init_Tabs$1 = __esmMin((() => {
	init_Tabs$2();
	import_react$13 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$12 = require_jsx_runtime();
	INK_INSET = 4;
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Tabs/index.ts
var init_Tabs = __esmMin((() => {
	init_Tabs$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Segmented/Segmented.scss
var init_Segmented$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Segmented/Segmented.tsx
function Segmented({ options, value, defaultValue, onChange, size = "medium", fullWidth = false, disabled = false, className, "aria-label": ariaLabel }) {
	const isControlled = value !== void 0;
	const [internal, setInternal] = (0, import_react$12.useState)((() => {
		if (defaultValue !== void 0) return defaultValue;
		return options.find((o) => !o.disabled)?.value ?? options[0]?.value;
	})());
	const current = isControlled ? value : internal;
	const refs = (0, import_react$12.useRef)({});
	const setActive = (0, import_react$12.useCallback)((next) => {
		if (!isControlled) setInternal(next);
		onChange?.(next);
	}, [isControlled, onChange]);
	const handleKeyDown = (e) => {
		const enabled = options.filter((o) => !o.disabled);
		if (enabled.length === 0 || disabled) return;
		const idx = enabled.findIndex((o) => o.value === current);
		let nextIdx = idx;
		switch (e.key) {
			case "ArrowRight":
			case "ArrowDown":
				nextIdx = idx < 0 ? 0 : (idx + 1) % enabled.length;
				break;
			case "ArrowLeft":
			case "ArrowUp":
				nextIdx = idx <= 0 ? enabled.length - 1 : idx - 1;
				break;
			case "Home":
				nextIdx = 0;
				break;
			case "End":
				nextIdx = enabled.length - 1;
				break;
			default: return;
		}
		e.preventDefault();
		const next = enabled[nextIdx].value;
		setActive(next);
		refs.current[next]?.focus();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("div", {
		className: [
			"wb-segmented",
			`wb-segmented--${size}`,
			fullWidth ? "wb-segmented--full" : "",
			disabled ? "wb-segmented--disabled" : "",
			className
		].filter(Boolean).join(" "),
		role: "radiogroup",
		"aria-label": ariaLabel,
		"aria-disabled": disabled || void 0,
		onKeyDown: handleKeyDown,
		children: options.map((opt) => {
			const isActive = opt.value === current;
			const isDisabled = disabled || opt.disabled;
			return /* @__PURE__ */ (0, import_jsx_runtime$11.jsxs)("button", {
				ref: (el) => {
					refs.current[opt.value] = el;
				},
				type: "button",
				role: "radio",
				"aria-checked": isActive,
				tabIndex: isActive ? 0 : -1,
				disabled: isDisabled,
				className: ["wb-segmented__item", isActive ? "wb-segmented__item--active" : ""].filter(Boolean).join(" "),
				onClick: () => !isDisabled && setActive(opt.value),
				children: [
					opt.icon !== void 0 && opt.icon !== null && /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
						className: "wb-segmented__item-icon",
						"aria-hidden": true,
						children: opt.icon
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
						className: "wb-segmented__item-label",
						children: opt.label
					}),
					opt.count !== void 0 && opt.count !== null && opt.count !== "" && /* @__PURE__ */ (0, import_jsx_runtime$11.jsx)("span", {
						className: "wb-segmented__item-count",
						"aria-hidden": true,
						children: typeof opt.count === "number" ? `(${opt.count})` : opt.count
					})
				]
			}, opt.value);
		})
	});
}
var import_react$12, import_jsx_runtime$11;
var init_Segmented$1 = __esmMin((() => {
	init_Segmented$2();
	import_react$12 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$11 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Segmented/index.ts
var init_Segmented = __esmMin((() => {
	init_Segmented$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Table/Table.scss
var init_Table$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Table/Table.tsx
/**
* 把 width（number 或 CSS width 字符串）转 px 数；非数字字符串（如 '20%'）返回 null。
* 仅用于 fixed 列的偏移累加；调用方在 fixed 列上必须传 number 或 'NNNpx' 才能正确累加。
*/
function widthToPx(w) {
	if (typeof w === "number") return w;
	if (typeof w === "string") {
		const m = w.match(/^(\d+(?:\.\d+)?)px$/);
		if (m) return Number(m[1]);
	}
	return null;
}
function getRowKey(row, index, rowKey) {
	if (typeof rowKey === "function") return rowKey(row, index);
	if (typeof rowKey === "string" || typeof rowKey === "number") {
		const v = row[rowKey];
		if (typeof v === "string" || typeof v === "number") return v;
	}
	const idLike = row.id;
	if (typeof idLike === "string" || typeof idLike === "number") return idLike;
	return index;
}
function getCellContent(row, index, col) {
	if (col.render) return col.render(row, index);
	if (col.dataIndex !== void 0) {
		const v = row[col.dataIndex];
		if (v === null || v === void 0) return null;
		if (typeof v === "string" || typeof v === "number" || typeof v === "boolean") return String(v);
		if (import_react$11.isValidElement(v)) return v;
		return null;
	}
	return null;
}
function nextSortDirection(current) {
	if (current === null) return "asc";
	if (current === "asc") return "desc";
	return null;
}
function Table({ columns, dataSource, rowKey, size = "default", striped = false, hover = true, bordered = false, loading = false, empty = "No data", sort, defaultSort, onSortChange, onRowClick, rowSelection, scroll, className }) {
	const isControlledSort = sort !== void 0;
	const [internalSort, setInternalSort] = (0, import_react$11.useState)(defaultSort ?? null);
	const currentSort = isControlledSort ? sort ?? null : internalSort;
	const isControlledSelection = rowSelection?.selectedRowKeys !== void 0;
	const [internalSelectedKeys, setInternalSelectedKeys] = (0, import_react$11.useState)(rowSelection?.defaultSelectedRowKeys ?? []);
	const selectedKeys = (0, import_react$11.useMemo)(() => {
		if (!rowSelection) return [];
		return isControlledSelection ? rowSelection.selectedRowKeys ?? [] : internalSelectedKeys;
	}, [
		rowSelection,
		isControlledSelection,
		internalSelectedKeys
	]);
	const selectedKeysSet = (0, import_react$11.useMemo)(() => new Set(selectedKeys), [selectedKeys]);
	/**
	* 「可选行」= 未被 getCheckboxProps 标记为 disabled 的行。
	* 全选 / 半选状态都基于这个集合，避免被禁的行污染计算。
	*/
	const selectableRows = (0, import_react$11.useMemo)(() => {
		if (!rowSelection) return [];
		const getProps = rowSelection.getCheckboxProps;
		return dataSource.map((row, idx) => ({
			key: getRowKey(row, idx, rowKey),
			row
		})).filter(({ row }) => !getProps?.(row).disabled);
	}, [
		rowSelection,
		dataSource,
		rowKey
	]);
	const allSelectableSelected = selectableRows.length > 0 && selectableRows.every(({ key }) => selectedKeysSet.has(key));
	const someSelectableSelected = selectableRows.some(({ key }) => selectedKeysSet.has(key));
	const commitSelection = (0, import_react$11.useCallback)((nextKeys) => {
		if (!rowSelection) return;
		if (!isControlledSelection) setInternalSelectedKeys(nextKeys);
		const nextRows = dataSource.filter((row, idx) => {
			const k = getRowKey(row, idx, rowKey);
			return nextKeys.includes(k);
		});
		rowSelection.onChange?.(nextKeys, nextRows);
	}, [
		rowSelection,
		isControlledSelection,
		dataSource,
		rowKey
	]);
	const handleRowSelectChange = (0, import_react$11.useCallback)((rowKeyVal, checked) => {
		if (!rowSelection) return;
		commitSelection(checked ? [...selectedKeys, rowKeyVal] : selectedKeys.filter((k) => k !== rowKeyVal));
	}, [
		rowSelection,
		selectedKeys,
		commitSelection
	]);
	const handleSelectAllChange = (0, import_react$11.useCallback)((checked) => {
		if (!rowSelection) return;
		if (checked) {
			const merged = new Set(selectedKeys);
			selectableRows.forEach(({ key }) => merged.add(key));
			commitSelection(Array.from(merged));
		} else {
			const selectableKeysSet = new Set(selectableRows.map(({ key }) => key));
			commitSelection(selectedKeys.filter((k) => !selectableKeysSet.has(k)));
		}
	}, [
		rowSelection,
		selectedKeys,
		selectableRows,
		commitSelection
	]);
	const handleSortClick = (0, import_react$11.useCallback)((col) => {
		if (!col.sortable) return;
		const next = nextSortDirection(currentSort?.key === col.key ? currentSort.direction : null);
		const nextState = next === null ? null : {
			key: col.key,
			direction: next
		};
		if (!isControlledSort) setInternalSort(nextState);
		onSortChange?.(nextState);
	}, [
		currentSort,
		isControlledSort,
		onSortChange
	]);
	const merged = [
		"wb-table",
		`wb-table--${size}`,
		striped ? "wb-table--striped" : "",
		hover ? "wb-table--hover" : "",
		bordered ? "wb-table--bordered" : "",
		loading ? "wb-table--loading" : "",
		rowSelection ? "wb-table--selectable" : "",
		scroll?.x !== void 0 ? "wb-table--scroll-x" : "",
		scroll?.y !== void 0 ? "wb-table--scroll-y" : "",
		className
	].filter(Boolean).join(" ");
	const selectionColWidth = size === "compact" ? 40 : 48;
	const fixedEnabled = scroll?.x !== void 0;
	const fixedMeta = (0, import_react$11.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		if (!fixedEnabled) return map;
		let leftOffset = rowSelection ? selectionColWidth : 0;
		for (const col of columns) if (col.fixed === "left") {
			map.set(col.key, {
				side: "left",
				offset: leftOffset
			});
			const w = widthToPx(col.width);
			leftOffset += w ?? 0;
		}
		let rightOffset = 0;
		for (let i = columns.length - 1; i >= 0; i--) {
			const col = columns[i];
			if (col.fixed === "right") {
				map.set(col.key, {
					side: "right",
					offset: rightOffset
				});
				const w = widthToPx(col.width);
				rightOffset += w ?? 0;
			}
		}
		return map;
	}, [
		columns,
		fixedEnabled,
		rowSelection,
		selectionColWidth
	]);
	/** 给某列生成 fixed 相关的 style + className（th 与 td 共用） */
	const getFixedCellAttrs = (col) => {
		const meta = fixedMeta.get(col.key);
		if (!meta) return {
			className: "",
			style: {}
		};
		const style = meta.side === "left" ? {
			left: meta.offset,
			position: "sticky",
			zIndex: 2
		} : {
			right: meta.offset,
			position: "sticky",
			zIndex: 2
		};
		return {
			className: `wb-table__cell--fixed wb-table__cell--fixed-${meta.side}`,
			style
		};
	};
	const selectionFixedAttrs = () => {
		if (!fixedEnabled || !rowSelection) return {
			className: "",
			style: {}
		};
		return {
			className: "wb-table__cell--fixed wb-table__cell--fixed-left",
			style: {
				left: 0,
				position: "sticky",
				zIndex: 2
			}
		};
	};
	const checkboxSize = size === "compact" ? "small" : "medium";
	const scrollStyle = {};
	if (scroll?.y !== void 0) {
		scrollStyle.maxHeight = scroll.y;
		scrollStyle.overflowY = "auto";
	}
	if (scroll?.x !== void 0) scrollStyle.overflowX = "auto";
	const tableStyle = {};
	if (scroll?.x !== void 0) tableStyle.minWidth = scroll.x;
	return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("div", {
		className: merged,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
			className: "wb-table__scroll",
			style: scrollStyle,
			children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("table", {
				className: "wb-table__inner",
				style: tableStyle,
				children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("tr", { children: [rowSelection && (() => {
					const sf = selectionFixedAttrs();
					return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("th", {
						className: [
							"wb-table__th",
							"wb-table__th--selection",
							sf.className
						].filter(Boolean).join(" "),
						style: sf.style,
						"aria-label": rowSelection.columnAriaLabel ?? getA11yLabel("selectRow"),
						children: !rowSelection.hideSelectAll && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Checkbox, {
							size: checkboxSize,
							checked: allSelectableSelected,
							indeterminate: !allSelectableSelected && someSelectableSelected,
							disabled: selectableRows.length === 0,
							onChange: (e) => handleSelectAllChange(e.target.checked),
							"aria-label": rowSelection.selectAllAriaLabel ?? getA11yLabel("selectAll")
						})
					});
				})(), columns.map((col) => {
					const isSorted = currentSort?.key === col.key;
					const dir = isSorted ? currentSort.direction : null;
					const ariaSort = !col.sortable ? void 0 : dir === "asc" ? "ascending" : dir === "desc" ? "descending" : "none";
					const fx = getFixedCellAttrs(col);
					return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("th", {
						style: {
							width: col.width,
							textAlign: col.align ?? "left",
							...fx.style
						},
						"aria-sort": ariaSort,
						className: [
							"wb-table__th",
							col.sortable ? "wb-table__th--sortable" : "",
							isSorted ? "wb-table__th--sorted" : "",
							fx.className
						].filter(Boolean).join(" "),
						children: col.sortable ? /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("button", {
							type: "button",
							className: "wb-table__sort-btn",
							onClick: () => handleSortClick(col),
							children: [/* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", { children: col.title }), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("span", {
								className: ["wb-table__sort-indicator", dir ? `wb-table__sort-indicator--${dir}` : ""].filter(Boolean).join(" "),
								"aria-hidden": true,
								children: dir === "asc" ? "▲" : dir === "desc" ? "▼" : "↕"
							})]
						}) : col.title
					}, col.key);
				})] }) }), /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("tbody", { children: dataSource.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("tr", {
					className: "wb-table__empty-row",
					children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("td", {
						colSpan: columns.length + (rowSelection ? 1 : 0),
						className: "wb-table__empty-cell",
						children: loading ? "Loading..." : empty
					})
				}) : dataSource.map((row, rIdx) => {
					const k = getRowKey(row, rIdx, rowKey);
					const checkboxProps = rowSelection?.getCheckboxProps?.(row) ?? {};
					const isSelected = selectedKeysSet.has(k);
					return /* @__PURE__ */ (0, import_jsx_runtime$10.jsxs)("tr", {
						className: [
							"wb-table__row",
							onRowClick ? "wb-table__row--clickable" : "",
							isSelected ? "wb-table__row--selected" : ""
						].filter(Boolean).join(" "),
						onClick: onRowClick ? () => onRowClick(row, rIdx) : void 0,
						children: [rowSelection && (() => {
							const sf = selectionFixedAttrs();
							return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("td", {
								className: [
									"wb-table__td",
									"wb-table__td--selection",
									sf.className
								].filter(Boolean).join(" "),
								style: sf.style,
								onClick: (e) => e.stopPropagation(),
								children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)(Checkbox, {
									size: checkboxSize,
									checked: isSelected,
									disabled: checkboxProps.disabled,
									onChange: (e) => handleRowSelectChange(k, e.target.checked),
									"aria-label": rowSelection.selectRowAriaLabel?.(rIdx + 1, row) ?? getA11yLabel("selectRowN", { index: rIdx + 1 })
								})
							});
						})(), columns.map((col) => {
							const fx = getFixedCellAttrs(col);
							return /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("td", {
								className: ["wb-table__td", fx.className].filter(Boolean).join(" "),
								style: {
									textAlign: col.align ?? "left",
									...fx.style
								},
								children: getCellContent(row, rIdx, col)
							}, col.key);
						})]
					}, k);
				}) })]
			})
		}), loading && dataSource.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", {
			className: "wb-table__loading-overlay",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime$10.jsx)("div", { className: "wb-table__loading-spinner" })
		})]
	});
}
var import_react$11, import_jsx_runtime$10;
var init_Table$1 = __esmMin((() => {
	init_Table$2();
	import_react$11 = /* @__PURE__ */ __toESM(require_react());
	init_a11y();
	init_Checkbox();
	import_jsx_runtime$10 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Table/index.ts
var init_Table = __esmMin((() => {
	init_Table$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Breadcrumb/Breadcrumb.scss
var init_Breadcrumb$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Breadcrumb/Breadcrumb.tsx
function Breadcrumb({ items, leadingIcon, onLeadingIconClick, leadingIconAriaLabel = "Back", separator = "/", highlightLast = false, className, ariaLabel = "Breadcrumb" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("nav", {
		className: ["wb-breadcrumb", className].filter(Boolean).join(" "),
		"aria-label": ariaLabel,
		children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)("ol", {
			className: "wb-breadcrumb__list",
			children: [leadingIcon !== void 0 && leadingIcon !== null && (typeof onLeadingIconClick === "function" ? /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("li", {
				className: "wb-breadcrumb__leading-icon wb-breadcrumb__leading-icon--clickable",
				children: /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("button", {
					type: "button",
					className: "wb-breadcrumb__leading-icon-btn",
					onClick: onLeadingIconClick,
					"aria-label": leadingIconAriaLabel,
					children: leadingIcon
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("li", {
				className: "wb-breadcrumb__leading-icon",
				"aria-hidden": true,
				children: leadingIcon
			})), items.map((item, idx) => {
				const reactKey = item.key ?? `idx-${idx}`;
				const isLast = idx === items.length - 1;
				const interactive = Boolean(item.href || item.onClick);
				const itemClass = ["wb-breadcrumb__item", isLast && highlightLast ? "wb-breadcrumb__item--current" : null].filter(Boolean).join(" ");
				return /* @__PURE__ */ (0, import_jsx_runtime$9.jsxs)(import_react$10.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("li", {
					className: itemClass,
					"aria-current": isLast ? "page" : void 0,
					children: interactive ? /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("a", {
						className: "wb-breadcrumb__link",
						href: item.href,
						onClick: item.onClick,
						children: item.label
					}) : /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("span", {
						className: "wb-breadcrumb__text",
						children: item.label
					})
				}), !isLast && /* @__PURE__ */ (0, import_jsx_runtime$9.jsx)("li", {
					className: "wb-breadcrumb__separator",
					"aria-hidden": true,
					children: separator
				})] }, reactKey);
			})]
		})
	});
}
var import_react$10, import_jsx_runtime$9;
var init_Breadcrumb$1 = __esmMin((() => {
	init_Breadcrumb$2();
	import_react$10 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$9 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Breadcrumb/index.ts
var init_Breadcrumb = __esmMin((() => {
	init_Breadcrumb$1();
})), import_jsx_runtime$8, Tooltip;
var init_Tooltip$1 = __esmMin((() => {
	init_src();
	require_react();
	import_jsx_runtime$8 = require_jsx_runtime();
	Tooltip = ({ mouseEnterDelay, delay, ...rest }) => {
		const resolvedDelay = delay !== void 0 ? delay : mouseEnterDelay;
		return /* @__PURE__ */ (0, import_jsx_runtime$8.jsx)(Tooltip$1, {
			...rest,
			delay: resolvedDelay
		});
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Tooltip/index.ts
var init_Tooltip = __esmMin((() => {
	init_Tooltip$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Progress/Progress.scss
var init_Progress$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Progress/Progress.tsx
/** 把传入的 percent clamp 到 [0, 100]；非数字按 0 处理。 */
function clampPercent(input) {
	if (typeof input !== "number" || !Number.isFinite(input)) return 0;
	if (input < 0) return 0;
	if (input > 100) return 100;
	return input;
}
function Progress({ percent, indeterminate = false, size = "sm", tone = "neutral", shape = "square", status = "normal", showInfo = false, format, strokeColor, className, ...rest }) {
	const isIndeterminate = indeterminate || percent === void 0;
	const value = clampPercent(percent);
	const merged = [
		"wb-progress",
		`wb-progress--${size}`,
		`wb-progress--${tone}`,
		`wb-progress--${shape}`,
		status !== "normal" ? `wb-progress--${status}` : "",
		isIndeterminate ? "wb-progress--indeterminate" : "",
		strokeColor ? "wb-progress--custom-stroke" : "",
		className
	].filter(Boolean).join(" ");
	/**
	* a11y：
	*   - 已知进度：role=progressbar + aria-valuenow/min/max
	*   - 未知进度：去掉 aria-valuenow，浏览器/AT 会按"indeterminate"处理
	*   外层 div 整体作为 progressbar；showInfo 仅是补充视觉，不影响 ARIA 语义
	*/
	const ariaProps = isIndeterminate ? {
		"aria-valuemin": 0,
		"aria-valuemax": 100
	} : {
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		"aria-valuenow": Math.round(value)
	};
	/**
	* strokeColor 解析：string 走 background-color；{from,to} 走 linear-gradient。
	* 用 inline style 注入到 fill 节点，CSS 端通过 .wb-progress--custom-stroke
	* 关掉 tone/status 的颜色规则，让 inline 优先生效。
	*/
	const fillBackground = (() => {
		if (!strokeColor) return;
		if (typeof strokeColor === "string") return strokeColor;
		return `linear-gradient(to right, ${strokeColor.from}, ${strokeColor.to})`;
	})();
	const fillStyle = {
		...isIndeterminate ? {} : { width: `${value}%` },
		...fillBackground ? { background: fillBackground } : {}
	};
	const renderInfo = () => {
		if (!showInfo) return null;
		if (format) return format(value);
		if (status === "success") return "✓";
		if (status === "error") return "✕";
		if (isIndeterminate) return "…";
		return `${Math.round(value)}%`;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime$7.jsxs)("div", {
		className: merged,
		role: "progressbar",
		...ariaProps,
		...rest,
		children: [/* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
			className: "wb-progress__track",
			"aria-hidden": true,
			children: /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("div", {
				className: "wb-progress__fill",
				style: fillStyle
			})
		}), showInfo && /* @__PURE__ */ (0, import_jsx_runtime$7.jsx)("span", {
			className: "wb-progress__info",
			"aria-hidden": true,
			children: renderInfo()
		})]
	});
}
var import_jsx_runtime$7;
var init_Progress$1 = __esmMin((() => {
	init_Progress$2();
	require_react();
	import_jsx_runtime$7 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Progress/index.ts
var init_Progress = __esmMin((() => {
	init_Progress$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/ScrollLoadMore/scroll-load-more.less
var init_scroll_load_more = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/ScrollLoadMore/ScrollLoadMore.tsx
var import_react$7, import_jsx_runtime$6, ScrollLoadMore;
var init_ScrollLoadMore$1 = __esmMin((() => {
	init_scroll_load_more();
	import_react$7 = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime$6 = require_jsx_runtime();
	ScrollLoadMore = (0, import_react$7.forwardRef)(({ children, onRequest, threshold = 100, className, style, loadingContent, endContent }, ref) => {
		const [isLoading, setIsLoading] = (0, import_react$7.useState)(false);
		const [hasMore, setHasMore] = (0, import_react$7.useState)(true);
		const loadingRef = (0, import_react$7.useRef)(false);
		const containerRef = (0, import_react$7.useRef)(null);
		const onRequestRef = (0, import_react$7.useRef)(onRequest);
		onRequestRef.current = onRequest;
		const hasMoreRef = (0, import_react$7.useRef)(true);
		const doRequest = (0, import_react$7.useCallback)(() => {
			if (loadingRef.current || !hasMoreRef.current) return;
			loadingRef.current = true;
			setIsLoading(true);
			onRequestRef.current().then((result) => {
				const more = Array.isArray(result) && result.length > 0;
				hasMoreRef.current = more;
				setHasMore(more);
				if (more) requestAnimationFrame(() => {
					const el = containerRef.current;
					if (el && el.scrollHeight <= el.clientHeight) {
						loadingRef.current = false;
						doRequest();
					}
				});
			}).catch(() => {}).finally(() => {
				setIsLoading(false);
				loadingRef.current = false;
			});
		}, []);
		(0, import_react$7.useEffect)(() => {
			doRequest();
		}, [doRequest]);
		(0, import_react$7.useImperativeHandle)(ref, () => ({ reset: () => {
			hasMoreRef.current = true;
			setHasMore(true);
			setIsLoading(false);
			loadingRef.current = false;
			doRequest();
		} }));
		const handleScroll = (0, import_react$7.useCallback)((e) => {
			if (!hasMoreRef.current || loadingRef.current) return;
			const el = e.currentTarget;
			if (el.scrollHeight - el.scrollTop - el.clientHeight < threshold) doRequest();
		}, [threshold, doRequest]);
		return /* @__PURE__ */ (0, import_jsx_runtime$6.jsxs)("div", {
			ref: containerRef,
			className: `wb-scroll-load-more ${className ?? ""}`,
			style,
			onScroll: handleScroll,
			children: [
				children,
				isLoading && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
					className: "wb-scroll-load-more__loading",
					children: loadingContent ?? /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", { className: "wb-scroll-load-more__spinner" })
				}),
				!hasMore && !isLoading && endContent && /* @__PURE__ */ (0, import_jsx_runtime$6.jsx)("div", {
					className: "wb-scroll-load-more__end",
					children: endContent
				})
			]
		});
	});
	ScrollLoadMore.displayName = "ScrollLoadMore";
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/ScrollLoadMore/index.ts
var init_ScrollLoadMore = __esmMin((() => {
	init_ScrollLoadMore$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Cascader/Cascader.scss
var init_Cascader$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Cascader/cascader-data-source.ts
/**
* 将一条路径（CascaderPath）转为唯一复合 key。
* key 规则：各节点 value 用 \u0001 (SOH) 拼接。
*
* 用于多选 Set 去重、搜索高亮等场景。
* ⚠️ 修改此函数时，所有消费方将自动统一 —— 不再有分散的 inline 实现。
*/
function pathKey(path) {
	return path.map((n) => n.value).join("");
}
/**
* 父子联动：判断当前 path 的某个祖先是否在已选 value 中。
* 例：multipleValue 包含 [天津市]（长度1），当前 path 是 [天津市, 河东区]（长度2）
* → [天津市] 是当前 path 的前缀 → 返回 true → 显示为选中
*/
function isAncestorSelected(path, multipleValue) {
	if (!multipleValue || multipleValue.length === 0) return false;
	return multipleValue.some((existing) => {
		if (existing.length >= path.length) return false;
		return existing.every((n, i) => n.value === path[i].value);
	});
}
/**
* 把"自带 children 的静态节点数组"包成 CascaderDataSource。
* 默认实现 search：对所有叶子节点做 label 子串匹配，返回完整路径。
*
* 用法：
*   const ds = buildStaticDataSource(myTree);
*   <Cascader dataSource={ds} />
*/
function buildStaticDataSource(nodes, options) {
	const searchable = options?.searchable !== false;
	const matchLevel = options?.searchMatchLevel ?? "leaf";
	const loadChildren = (node) => node.children ?? [];
	const search = searchable ? (keyword) => {
		if (!keyword) return [];
		const k = keyword.toLowerCase();
		const out = [];
		const walk = (path) => {
			const cur = path[path.length - 1];
			const children = cur.children ?? [];
			const isLeaf = children.length === 0;
			if (matchLevel === "leaf" && isLeaf) {
				if (cur.label.toLowerCase().includes(k)) out.push({ path: [...path] });
			} else if (matchLevel === "any") {
				if (cur.label.toLowerCase().includes(k)) out.push({ path: [...path] });
			}
			for (const child of children) walk([...path, child]);
		};
		for (const root of nodes) walk([root]);
		return out.slice(0, 200);
	} : void 0;
	return {
		loadRoot: () => nodes,
		loadChildren,
		...search ? { search } : {}
	};
}
var init_cascader_data_source = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Cascader/cascader-column.tsx
/**
* 半选态判断：当前节点不在已选 value 中，也没有被祖先覆盖，
* 但其某些后代路径在 multipleValue 中（即"部分子孙被选中"）。
*
* 例：multipleValue 包含 [山西省, 太原市]、[山西省, 大同市]，
*     当前 path 是 [山西省]（节点本身未选中）
*     → [山西省] 是这些已选路径的前缀 → 返回 true → 显示半选（indeterminate）
*/
function hasDescendantSelected(path, multipleValue) {
	if (!multipleValue || multipleValue.length === 0) return false;
	return multipleValue.some((existing) => {
		if (existing.length <= path.length) return false;
		return path.every((n, i) => n.value === existing[i].value);
	});
}
/** 多选勾选框 —— 复用 foundation Checkbox（small 尺寸），点击事件由 li 统一处理 */
function NodeCheckbox({ checked, disabled, indeterminate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(Checkbox$1, {
		size: "small",
		checked,
		disabled,
		indeterminate,
		readOnly: true,
		tabIndex: -1,
		className: "wb-cascader__leaf-check",
		onClick: (e) => e.stopPropagation(),
		onChange: () => {}
	});
}
function CascaderColumn(props) {
	const { nodes, activeValue, isMultiple, multipleAtMax, changeOnSelect, selectedPathKeys, singleSelectedPathKey, singleSelectedPrefixKeys, multipleValue, buildPath, onHover, onPickNode, chevronIcon } = props;
	return /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("ul", {
		className: "wb-cascader__column",
		role: "listbox",
		children: nodes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("li", {
			className: "wb-cascader__empty",
			children: "—"
		}) : nodes.map((node) => {
			const isLeaf = !node.children || node.children.length === 0;
			const isActive = node.value === activeValue;
			const fullPath = buildPath(node);
			const myKey = pathKey(fullPath);
			const isChecked = isMultiple ? selectedPathKeys.has(myKey) || isAncestorSelected(fullPath, multipleValue) : singleSelectedPrefixKeys ? singleSelectedPrefixKeys.has(myKey) : myKey === singleSelectedPathKey;
			const isIndeterminate = isMultiple && !isChecked && hasDescendantSelected(fullPath, multipleValue);
			const blockedByMax = isMultiple && !isChecked && !isIndeterminate && multipleAtMax;
			const itemDisabled = !!node.disabled || blockedByMax;
			const selectable = isLeaf || changeOnSelect;
			const showCheckbox = isMultiple && selectable;
			const liClass = [
				"wb-cascader__option",
				isActive ? "wb-cascader__option--active" : "",
				isChecked ? "wb-cascader__option--selected" : "",
				itemDisabled ? "wb-cascader__option--disabled" : "",
				isLeaf ? "wb-cascader__option--leaf" : "wb-cascader__option--branch"
			].filter(Boolean).join(" ");
			const handleClick = () => {
				if (itemDisabled) return;
				if (isLeaf) {
					onPickNode(fullPath);
					return;
				}
				onHover(node);
				if (selectable) onPickNode(fullPath);
			};
			const handleMouseEnter = () => {
				if (itemDisabled) return;
				if (!isLeaf) onHover(node);
			};
			return /* @__PURE__ */ (0, import_jsx_runtime$5.jsxs)("li", {
				className: liClass,
				role: "option",
				"aria-selected": isChecked,
				"aria-disabled": itemDisabled || void 0,
				tabIndex: itemDisabled ? -1 : 0,
				onClick: handleClick,
				onMouseEnter: handleMouseEnter,
				onKeyDown: (e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						handleClick();
					}
				},
				children: [
					showCheckbox && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)(NodeCheckbox, {
						checked: isChecked,
						disabled: itemDisabled,
						indeterminate: isIndeterminate
					}),
					/* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
						className: "wb-cascader__option-label",
						children: node.label
					}),
					!isLeaf && /* @__PURE__ */ (0, import_jsx_runtime$5.jsx)("span", {
						className: "wb-cascader__option-chevron",
						"aria-hidden": true,
						children: chevronIcon
					})
				]
			}, node.value);
		})
	});
}
var import_jsx_runtime$5;
var init_cascader_column = __esmMin((() => {
	require_react();
	init_Checkbox$1();
	init_cascader_data_source();
	import_jsx_runtime$5 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Cascader/cascader-search-list.tsx
function CascaderSearchList(props) {
	const { results, pathSeparator, onPick, selectedPathKeys, singleSelectedPathKey, isMultiple, multipleValue } = props;
	const t = useTranslation();
	if (results.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("div", {
		className: "wb-cascader__search-empty",
		children: t("foundation.cascader.noResults")
	});
	return /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("ul", {
		className: "wb-cascader__search-list",
		role: "listbox",
		children: results.map((r, idx) => {
			const leaf = r.path[r.path.length - 1];
			if (!leaf) return null;
			const k = pathKey(r.path);
			const isSelected = isMultiple ? selectedPathKeys.has(k) || isAncestorSelected(r.path, multipleValue) : k === singleSelectedPathKey;
			const text = r.path.map((n) => n.label).join(pathSeparator);
			return /* @__PURE__ */ (0, import_jsx_runtime$4.jsxs)("li", {
				className: ["wb-cascader__search-item", isSelected ? "wb-cascader__search-item--selected" : ""].filter(Boolean).join(" "),
				role: "option",
				"aria-selected": isSelected,
				tabIndex: 0,
				onClick: () => onPick(r.path),
				onKeyDown: (e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						onPick(r.path);
					}
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
					className: "wb-cascader__search-item-text",
					children: text
				}), isSelected && /* @__PURE__ */ (0, import_jsx_runtime$4.jsx)("span", {
					className: "wb-cascader__search-item-check",
					"aria-hidden": true,
					children: "✓"
				})]
			}, `${leaf.value}-${idx}`);
		})
	});
}
var import_jsx_runtime$4;
var init_cascader_search_list = __esmMin((() => {
	require_react();
	init_useI18n();
	init_cascader_data_source();
	import_jsx_runtime$4 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Cascader/cascader-trigger.tsx
var import_react$4, import_jsx_runtime$3, CascaderTrigger;
var init_cascader_trigger = __esmMin((() => {
	import_react$4 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_Icon();
	init_Tag();
	import_jsx_runtime$3 = require_jsx_runtime();
	CascaderTrigger = import_react$4.forwardRef(function CascaderTrigger(props, ref) {
		const t = useTranslation();
		const { size, disabled, invalid, open, fullWidth, width, className, placeholder, isMultiple, singleValue, multipleValue, pathSeparator, displayRender, showClear, clearAriaLabel, onClear, removeTagAriaLabel, onRemoveTag, maxTagCount, ...rest } = props;
		const hasValue = isMultiple ? multipleValue.length > 0 : singleValue !== null;
		const wrapperClass = [
			"wb-cascader",
			`wb-cascader--${size}`,
			isMultiple ? "wb-cascader--multiple" : "",
			invalid ? "wb-cascader--invalid" : "",
			disabled ? "wb-cascader--disabled" : "",
			open ? "wb-cascader--open" : "",
			fullWidth ? "wb-cascader--full-width" : "",
			!hasValue ? "wb-cascader--empty" : "",
			showClear ? "wb-cascader--clearable" : "",
			className
		].filter(Boolean).join(" ");
		const styleAttr = width !== void 0 ? { width: typeof width === "number" ? `${width}px` : width } : void 0;
		const renderValue = () => {
			if (displayRender) return isMultiple ? displayRender(multipleValue) : displayRender(singleValue ?? []);
			if (isMultiple) {
				if (multipleValue.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
					className: "wb-cascader__placeholder",
					children: placeholder
				});
				if (maxTagCount === 0) return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
					className: "wb-cascader__tags",
					children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
						className: "wb-cascader__tag-summary",
						children: t("foundation.cascader.selectedCount", { count: multipleValue.length })
					})
				});
				const shouldFold = maxTagCount !== void 0 && multipleValue.length > maxTagCount;
				const visiblePaths = shouldFold ? multipleValue.slice(0, maxTagCount) : multipleValue;
				const foldedCount = shouldFold ? multipleValue.length - maxTagCount : 0;
				return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("span", {
					className: "wb-cascader__tags",
					children: [visiblePaths.map((path, idx) => {
						const leaf = path[path.length - 1];
						if (!leaf) return null;
						const ariaLabel = removeTagAriaLabel ? removeTagAriaLabel(leaf) : `Remove ${leaf.label}`;
						return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(Tag, {
							size: "small",
							closable: !disabled,
							disabled,
							removeAriaLabel: ariaLabel,
							onClose: (e) => onRemoveTag(e, idx),
							className: "wb-cascader__tag",
							children: leaf.label
						}, `${leaf.value}-${idx}`);
					}), foldedCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("span", {
						className: "wb-cascader__tag-overflow",
						title: multipleValue.slice(maxTagCount).map((p) => p[p.length - 1]?.label).filter(Boolean).join(", "),
						children: ["+", foldedCount]
					})]
				});
			}
			if (singleValue) return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "wb-cascader__value",
				children: singleValue.map((n) => n.label).join(pathSeparator)
			});
			return /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: "wb-cascader__placeholder",
				children: placeholder
			});
		};
		return /* @__PURE__ */ (0, import_jsx_runtime$3.jsxs)("button", {
			ref,
			type: "button",
			className: wrapperClass,
			style: styleAttr,
			disabled,
			"aria-haspopup": "dialog",
			"aria-expanded": open,
			...rest,
			children: [renderValue(), showClear ? /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				role: "button",
				tabIndex: -1,
				"aria-label": clearAriaLabel,
				className: "wb-cascader__clear",
				onClick: onClear,
				onMouseDown: (e) => e.stopPropagation(),
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(XCloseIcon, { size: "sm" })
			}) : /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)("span", {
				className: ["wb-cascader__caret", open ? "wb-cascader__caret--open" : ""].filter(Boolean).join(" "),
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime$3.jsx)(ChevronDownIcon, { size: "sm" })
			})]
		});
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Cascader/use-cascader-state.ts
/**
* 剥离路径节点中的 children 属性，只保留 value / label / disabled。
* onChange 回调给调用方的数据不应该带整棵子树，既没用又会导致序列化爆炸。
*/
function stripChildren(path) {
	return path.map(({ value, label, disabled }) => {
		const node = {
			value,
			label
		};
		if (disabled) node.disabled = disabled;
		return node;
	});
}
/** 批量 strip 多条路径 */
function stripChildrenMultiple(paths) {
	return paths.map(stripChildren);
}
/**
* 把 dataSource.loadRoot 的同步/异步返回收敛成同步数组缓存。
* 当前阶段我们走"静态数据源"路线，loadRoot 同步返回；future 异步留位置。
*/
function useRootNodes(dataSource) {
	const [nodes, setNodes] = (0, import_react$3.useState)(() => {
		const r = dataSource.loadRoot();
		if (Array.isArray(r)) return r;
		return [];
	});
	(0, import_react$3.useMemo)(() => {
		const r = dataSource.loadRoot();
		if (Array.isArray(r)) setNodes(r);
		else r.then((arr) => setNodes(arr)).catch(() => setNodes([]));
	}, [dataSource]);
	return nodes;
}
/**
* 父子联动辅助：把一个已选祖先「展开」为排除目标节点后的兄弟路径。
*
* 例：ancestorPath = [天津市]（深度1），excludePath = [天津市, 河东区]（深度2）
* 结果 = [[天津市, 和平区], [天津市, 河西区], [天津市, 南开区], ...]
*
* 如果中间层级差 > 1（如祖先是省，取消的是区），会逐层展开：
* ancestorPath = [广东省], excludePath = [广东省, 广州市, 天河区]
* → 把广东省展开为其他市 + 广州市展开为除天河区外的其他区
* 即 [[广东省, 深圳市], [广东省, 珠海市], ..., [广东省, 广州市, 越秀区], [广东省, 广州市, 海珠区], ...]
*/
function expandAncestorExcluding(ancestorPath, excludePath, dataSource) {
	const result = [];
	const ancestorDepth = ancestorPath.length;
	const excludeDepth = excludePath.length;
	for (let depth = ancestorDepth; depth < excludeDepth; depth += 1) {
		const parentNode = excludePath[depth - 1];
		const excludeNodeValue = excludePath[depth].value;
		const children = dataSource.loadChildren ? dataSource.loadChildren(parentNode) : parentNode.children ?? [];
		if (!Array.isArray(children)) break;
		for (const sibling of children) {
			if (sibling.value === excludeNodeValue) continue;
			const siblingPath = [...excludePath.slice(0, depth), sibling];
			result.push(siblingPath);
		}
	}
	return result;
}
function useCascaderState(opts) {
	const { multiple, dataSource, isControlled, controlledSingle, controlledMultiple, defaultSingle, defaultMultiple, maxCount, onChangeSingle, onChangeMultiple } = opts;
	const rootNodes = useRootNodes(dataSource);
	const [uncontrolledSingle, setUncontrolledSingle] = (0, import_react$3.useState)(defaultSingle ?? null);
	const [uncontrolledMultiple, setUncontrolledMultiple] = (0, import_react$3.useState)(defaultMultiple ?? []);
	const singleValue = multiple ? null : isControlled ? controlledSingle ?? null : uncontrolledSingle;
	const multipleValue = multiple ? isControlled ? controlledMultiple ?? [] : uncontrolledMultiple : [];
	const [open, setOpenInner] = (0, import_react$3.useState)(false);
	const [keyword, setKeywordInner] = (0, import_react$3.useState)("");
	const [activePath, setActivePath] = (0, import_react$3.useState)([]);
	const setOpen = (0, import_react$3.useCallback)((next) => {
		setOpenInner(next);
		if (!next) {
			setKeywordInner("");
			if (multiple) setActivePath([]);
			else if (singleValue) setActivePath(singleValue.slice(0, -1));
			else setActivePath([]);
		} else if (!multiple && singleValue) setActivePath(singleValue.slice(0, -1));
	}, [multiple, singleValue]);
	const setKeyword = (0, import_react$3.useCallback)((next) => {
		setKeywordInner(next);
	}, []);
	/**
	* hover 到第 depth 列的某节点：把后续列全部清掉，从 depth 开始重画。
	* 例：activePath=[北京, 北京市]（已展开 3 列），hover 第 0 列的"上海"
	* → activePath 变成 [上海]（只展开 2 列：root + 上海的子）
	*/
	const hoverInto = (0, import_react$3.useCallback)((depth, node) => {
		setActivePath((prev) => {
			const next = prev.slice(0, depth);
			next.push(node);
			return next;
		});
	}, []);
	const pickNode = (0, import_react$3.useCallback)((path) => {
		if (multiple) {
			const keyOf = (p) => p.map((n) => n.value).join("");
			const k = keyOf(path);
			const exactIdx = multipleValue.findIndex((p) => keyOf(p) === k);
			let next;
			if (exactIdx >= 0) next = multipleValue.filter((_, i) => i !== exactIdx);
			else {
				const ancestorIdx = multipleValue.findIndex((existing) => {
					if (existing.length >= path.length) return false;
					return existing.every((n, i) => n.value === path[i].value);
				});
				if (ancestorIdx >= 0) {
					const ancestorPath = multipleValue[ancestorIdx];
					const remaining = multipleValue.filter((_, i) => i !== ancestorIdx);
					const expandedSiblings = expandAncestorExcluding(ancestorPath, path, dataSource);
					next = [...remaining, ...expandedSiblings];
				} else {
					if (typeof maxCount === "number" && multipleValue.length >= maxCount) return;
					next = [...multipleValue.filter((existing) => {
						if (existing.length <= path.length) return true;
						return !path.every((n, i) => n.value === existing[i].value);
					}), path];
				}
			}
			if (!isControlled) setUncontrolledMultiple(next);
			onChangeMultiple?.(stripChildrenMultiple(next));
		} else {
			if (!isControlled) setUncontrolledSingle(path);
			onChangeSingle?.([stripChildren(path)]);
			setOpen(false);
		}
	}, [
		multiple,
		multipleValue,
		maxCount,
		isControlled,
		onChangeMultiple,
		onChangeSingle,
		setOpen,
		dataSource
	]);
	return {
		open,
		setOpen,
		keyword,
		setKeyword,
		singleValue,
		multipleValue,
		activePath,
		hoverInto,
		pickNode,
		pickLeaf: pickNode,
		pickPath: (0, import_react$3.useCallback)((path) => {
			pickNode(path);
			setActivePath(path.slice(0, -1));
			setKeywordInner("");
		}, [pickNode]),
		removeAt: (0, import_react$3.useCallback)((index) => {
			if (!multiple) return;
			const next = multipleValue.filter((_, i) => i !== index);
			if (!isControlled) setUncontrolledMultiple(next);
			onChangeMultiple?.(stripChildrenMultiple(next));
		}, [
			multiple,
			multipleValue,
			isControlled,
			onChangeMultiple
		]),
		clear: (0, import_react$3.useCallback)(() => {
			if (multiple) {
				if (!isControlled) setUncontrolledMultiple([]);
				onChangeMultiple?.([]);
			} else {
				if (!isControlled) setUncontrolledSingle(null);
				onChangeSingle?.([]);
			}
		}, [
			multiple,
			isControlled,
			onChangeMultiple,
			onChangeSingle
		]),
		multipleAtMax: multiple && typeof maxCount === "number" && multipleValue.length >= maxCount,
		rootNodes
	};
}
var import_react$3;
var init_use_cascader_state = __esmMin((() => {
	import_react$3 = /* @__PURE__ */ __toESM(require_react());
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Cascader/Cascader.tsx
/** 实现签名 */
function Cascader(props) {
	const { dataSource, placeholder, disabled, invalid, allowClear, showSearch, changeOnSelect = true, size = "medium", className, fullWidth, width, displayRender, pathSeparator = " / ", popoverClassName, portalRoot = "inline", onOpenChange, onSearch, clearAriaLabel } = props;
	const isMultiple = props.multiple === true;
	const { open, setOpen, keyword, setKeyword, singleValue, multipleValue, activePath, hoverInto, pickNode, pickPath, removeAt, clear, multipleAtMax, rootNodes } = useCascaderState({
		multiple: isMultiple,
		dataSource,
		isControlled: isMultiple ? props.value !== void 0 : props.value !== void 0,
		controlledSingle: isMultiple ? void 0 : props.value,
		controlledMultiple: isMultiple ? props.value : void 0,
		defaultSingle: isMultiple ? void 0 : props.defaultValue,
		defaultMultiple: isMultiple ? props.defaultValue : void 0,
		maxCount: isMultiple ? props.maxCount : void 0,
		onChangeSingle: isMultiple ? void 0 : props.onChange,
		onChangeMultiple: isMultiple ? props.onChange : void 0
	});
	const handleOpenChange = (0, import_react$2.useCallback)((next) => {
		setOpen(next);
		onOpenChange?.(next);
	}, [setOpen, onOpenChange]);
	const handleKeyword = (0, import_react$2.useCallback)((next) => {
		setKeyword(next);
		onSearch?.(next);
	}, [setKeyword, onSearch]);
	const columns = (0, import_react$2.useMemo)(() => {
		const cols = [rootNodes];
		for (let i = 0; i < activePath.length; i += 1) {
			const parent = activePath[i];
			const childrenLoader = dataSource.loadChildren;
			const children = childrenLoader ? childrenLoader(parent) : parent.children;
			if (Array.isArray(children) && children.length > 0) cols.push(children);
		}
		return cols;
	}, [
		rootNodes,
		activePath,
		dataSource
	]);
	const [searchResults, setSearchResults] = (0, import_react$2.useState)([]);
	import_react$2.useEffect(() => {
		if (!showSearch || !keyword || !dataSource.search) {
			setSearchResults([]);
			return;
		}
		let cancelled = false;
		const timer = setTimeout(() => {
			const r = dataSource.search(keyword);
			if (Array.isArray(r)) {
				setSearchResults(r);
				return;
			}
			r.then((arr) => {
				if (!cancelled) setSearchResults(arr);
			}).catch(() => {
				if (!cancelled) setSearchResults([]);
			});
		}, 150);
		return () => {
			cancelled = true;
			clearTimeout(timer);
		};
	}, [
		showSearch,
		keyword,
		dataSource
	]);
	const listId = (0, import_react$2.useId)();
	const isInSearchMode = !!keyword && showSearch && !!dataSource.search;
	const hasValue = isMultiple ? multipleValue.length > 0 : singleValue !== null;
	const showClear = !!allowClear && hasValue && !disabled;
	const handleClear = (0, import_react$2.useCallback)((event) => {
		event.stopPropagation();
		if (disabled) return;
		clear();
	}, [disabled, clear]);
	const handleRemoveTag = (0, import_react$2.useCallback)((event, index) => {
		event.stopPropagation();
		if (disabled) return;
		removeAt(index);
	}, [disabled, removeAt]);
	const selectedPathKeys = (0, import_react$2.useMemo)(() => {
		if (!isMultiple) return /* @__PURE__ */ new Set();
		return new Set(multipleValue.map((p) => p.map((n) => n.value).join("")));
	}, [isMultiple, multipleValue]);
	const singleSelectedPathKey = (0, import_react$2.useMemo)(() => {
		if (isMultiple || !singleValue) return;
		return singleValue.map((n) => n.value).join("");
	}, [isMultiple, singleValue]);
	const singleSelectedPrefixKeys = (0, import_react$2.useMemo)(() => {
		if (isMultiple || !singleValue) return /* @__PURE__ */ new Set();
		const keys = /* @__PURE__ */ new Set();
		for (let i = 0; i < singleValue.length; i += 1) keys.add(singleValue.slice(0, i + 1).map((n) => n.value).join(""));
		return keys;
	}, [isMultiple, singleValue]);
	return /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Popover, {
		trigger: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(CascaderTrigger, {
			size,
			disabled: !!disabled,
			invalid: !!invalid,
			open,
			fullWidth: !!fullWidth,
			width,
			className,
			placeholder,
			isMultiple,
			singleValue,
			multipleValue,
			pathSeparator,
			displayRender,
			showClear,
			clearAriaLabel: clearAriaLabel ?? getA11yLabel("clear"),
			onClear: handleClear,
			removeTagAriaLabel: isMultiple ? props.removeTagAriaLabel : void 0,
			onRemoveTag: handleRemoveTag,
			maxTagCount: isMultiple ? props.maxTagCount : void 0
		}),
		placement: "bottom-start",
		triggerMode: "click",
		open,
		onOpenChange: handleOpenChange,
		disabled,
		role: "dialog",
		className: ["wb-cascader-popover", popoverClassName].filter(Boolean).join(" "),
		portalRoot,
		children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsxs)("div", {
			className: "wb-cascader__panel",
			id: listId,
			children: [showSearch && dataSource.search && /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "wb-cascader__search",
				children: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(Input, {
					size: "small",
					variant: "filled",
					className: "wb-cascader__search-input",
					placeholder: placeholder ?? "",
					value: keyword,
					onChange: (e) => handleKeyword(e.target.value),
					onMouseDown: (e) => e.stopPropagation(),
					allowClear: true,
					autoFocus: true
				})
			}), isInSearchMode ? /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(CascaderSearchList, {
				results: searchResults,
				pathSeparator,
				onPick: pickPath,
				selectedPathKeys,
				singleSelectedPathKey,
				isMultiple,
				multipleValue: isMultiple ? multipleValue : void 0
			}) : /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)("div", {
				className: "wb-cascader__columns",
				children: columns.map((nodes, depth) => /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(CascaderColumn, {
					depth,
					nodes,
					activeValue: activePath[depth]?.value,
					isMultiple,
					multipleAtMax,
					changeOnSelect,
					selectedPathKeys,
					singleSelectedPathKey,
					singleSelectedPrefixKeys,
					multipleValue: isMultiple ? multipleValue : void 0,
					buildPath: (node) => [...activePath.slice(0, depth), node],
					onHover: (node) => hoverInto(depth, node),
					onPickNode: (path) => pickNode(path),
					chevronIcon: /* @__PURE__ */ (0, import_jsx_runtime$2.jsx)(ChevronRightIcon, { size: "sm" })
				}, depth))
			})]
		})
	});
}
var import_react$2, import_jsx_runtime$2;
var init_Cascader$1 = __esmMin((() => {
	init_Cascader$2();
	import_react$2 = /* @__PURE__ */ __toESM(require_react());
	init_a11y();
	init_Icon();
	init_Input();
	init_Popover();
	init_cascader_column();
	init_cascader_search_list();
	init_cascader_trigger();
	init_use_cascader_state();
	import_jsx_runtime$2 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/Cascader/index.ts
var init_Cascader = __esmMin((() => {
	init_Cascader$1();
	init_cascader_data_source();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/RegionPicker/RegionPicker.scss
var init_RegionPicker$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/RegionPicker/china-region-data-source.ts
/** 获取当前应使用的 regions locale（映射到有远程文件的 key） */
function getRegionsLocale() {
	const locale = getLocale();
	return REGIONS_URL_MAP[locale] ? locale : DEFAULT_REGIONS_LOCALE;
}
/**
* 懒加载指定语言的行政区 JSON（~539KB），首次调用时从远程 COS fetch，后续直接走缓存。
* 中英文各自独立缓存，互不影响。
*/
function loadRegionData(locale) {
	const existing = _loadingPromiseMap.get(locale);
	if (existing) return existing;
	const url = REGIONS_URL_MAP[locale] ?? REGIONS_URL_MAP[DEFAULT_REGIONS_LOCALE];
	const promise = fetch(url).then((res) => {
		if (!res.ok) throw new Error(`[RegionPicker] Failed to fetch regions data (${locale}): ${res.status} ${res.statusText}`);
		return res.json();
	}).then((regionData) => regionData.data).catch((err) => {
		_loadingPromiseMap.delete(locale);
		throw err;
	});
	_loadingPromiseMap.set(locale, promise);
	return promise;
}
var REGIONS_URL_MAP, DEFAULT_REGIONS_LOCALE, _cachedDataSourceMap, _loadingPromiseMap, chinaRegionDataSource;
var init_china_region_data_source = __esmMin((() => {
	init_i18n();
	init_cascader_data_source();
	REGIONS_URL_MAP = {
		"zh-cn": "https://acc-1258344699.cos.accelerate.myqcloud.com/web/regions-cn.json",
		"en": "https://acc-1258344699.cos.accelerate.myqcloud.com/web/regions-en.json"
	};
	DEFAULT_REGIONS_LOCALE = "zh-cn";
	_cachedDataSourceMap = /* @__PURE__ */ new Map();
	_loadingPromiseMap = /* @__PURE__ */ new Map();
	chinaRegionDataSource = {
		loadRoot() {
			const locale = getRegionsLocale();
			const cached = _cachedDataSourceMap.get(locale);
			if (cached) return cached.loadRoot();
			return loadRegionData(locale).then((data) => {
				const ds = buildStaticDataSource(data, {
					searchable: true,
					searchMatchLevel: "any"
				});
				_cachedDataSourceMap.set(locale, ds);
				return ds.loadRoot();
			});
		},
		loadChildren(node) {
			const locale = getRegionsLocale();
			const cached = _cachedDataSourceMap.get(locale);
			if (cached) return cached.loadChildren?.(node) ?? node.children ?? [];
			return node.children ?? [];
		},
		search(keyword) {
			const locale = getRegionsLocale();
			const cached = _cachedDataSourceMap.get(locale);
			if (cached?.search) return cached.search(keyword);
			return [];
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/RegionPicker/RegionPicker.tsx
/** 把一条 path 转成扁平结构 */
function toFlat(path, separator) {
	const labels = path.map((n) => n.label);
	const codes = path.map((n) => n.value);
	return {
		path,
		province: labels[0],
		city: labels[1],
		district: labels[2],
		text: labels.join(separator),
		codes
	};
}
/** 实现签名 */
function RegionPicker(props) {
	const t = useTranslation();
	const { locale } = useI18n();
	const localeAwareDataSource = (0, import_react$1.useMemo)(() => ({
		loadRoot: () => chinaRegionDataSource.loadRoot(),
		loadChildren: (node) => chinaRegionDataSource.loadChildren?.(node) ?? node.children ?? [],
		search: (keyword) => chinaRegionDataSource.search?.(keyword) ?? []
	}), [locale]);
	const { dataSource = localeAwareDataSource, placeholder = props.multiple ? t("foundation.regionPicker.placeholder.multiple") : t("foundation.regionPicker.placeholder.single"), allowClear = true, showSearch = true, changeOnSelect = true, pathSeparator = " / ", ...rest } = props;
	const handleSingleChange = (0, import_react$1.useCallback)((paths) => {
		const single = props;
		single.onChange?.(paths);
		if (single.onChangeFlat) {
			const path = paths[0] ?? null;
			single.onChangeFlat(path ? toFlat(path, pathSeparator) : null);
		}
	}, [props, pathSeparator]);
	const handleMultipleChange = (0, import_react$1.useCallback)((paths) => {
		const multi = props;
		multi.onChange?.(paths);
		if (multi.onChangeFlat) multi.onChangeFlat(paths.map((p) => toFlat(p, pathSeparator)));
	}, [props, pathSeparator]);
	if (props.multiple) {
		const { maxTagCount = 5, ...multiRest } = rest;
		return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Cascader, {
			...multiRest,
			multiple: true,
			dataSource,
			placeholder,
			allowClear,
			showSearch,
			changeOnSelect,
			pathSeparator,
			onChange: handleMultipleChange,
			maxTagCount,
			popoverClassName: "wb-region-picker-popover"
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime$1.jsx)(Cascader, {
		...rest,
		dataSource,
		placeholder,
		allowClear,
		showSearch,
		changeOnSelect,
		pathSeparator,
		onChange: handleSingleChange,
		popoverClassName: "wb-region-picker-popover"
	});
}
var import_react$1, import_jsx_runtime$1;
var init_RegionPicker$1 = __esmMin((() => {
	init_RegionPicker$2();
	import_react$1 = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	init_Cascader$1();
	init_china_region_data_source();
	import_jsx_runtime$1 = require_jsx_runtime();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/RegionPicker/en-region-data-source.ts
/**
* 懒加载英文行政区 JSON，首次调用时从远程 COS fetch，后续直接走缓存。
*/
function loadEnRegionData() {
	if (_loadingPromise) return _loadingPromise;
	const promise = fetch(REGIONS_EN_URL).then((res) => {
		if (!res.ok) throw new Error(`[RegionPicker] Failed to fetch EN regions data: ${res.status} ${res.statusText}`);
		return res.json();
	}).then((regionData) => regionData.data).catch((err) => {
		_loadingPromise = null;
		throw err;
	});
	_loadingPromise = promise;
	return promise;
}
var REGIONS_EN_URL, _cachedDataSource, _loadingPromise, enRegionDataSource;
var init_en_region_data_source = __esmMin((() => {
	init_cascader_data_source();
	REGIONS_EN_URL = "https://acc-1258344699.cos.accelerate.myqcloud.com/web/regions-en.json";
	_cachedDataSource = null;
	_loadingPromise = null;
	enRegionDataSource = {
		loadRoot() {
			if (_cachedDataSource) return _cachedDataSource.loadRoot();
			return loadEnRegionData().then((data) => {
				const ds = buildStaticDataSource(data, {
					searchable: true,
					searchMatchLevel: "any"
				});
				_cachedDataSource = ds;
				return ds.loadRoot();
			});
		},
		loadChildren(node) {
			if (_cachedDataSource) return _cachedDataSource.loadChildren?.(node) ?? node.children ?? [];
			return node.children ?? [];
		},
		search(keyword) {
			if (_cachedDataSource?.search) return _cachedDataSource.search(keyword);
			return [];
		}
	};
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/RegionPicker/index.ts
var init_RegionPicker = __esmMin((() => {
	init_RegionPicker$1();
	init_china_region_data_source();
	init_en_region_data_source();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/ColorPicker/ColorPicker.scss
var init_ColorPicker$2 = __esmMin((() => {}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/ColorPicker/ColorPicker.tsx
var import_react, import_jsx_runtime, ColorPicker;
var init_ColorPicker$1 = __esmMin((() => {
	init_ColorPicker$2();
	import_react = /* @__PURE__ */ __toESM(require_react());
	import_jsx_runtime = require_jsx_runtime();
	ColorPicker = (0, import_react.forwardRef)(function ColorPicker({ colors, value, onChange, columns = 9, swatchSize = 20, disabled, className, "aria-label": ariaLabel }, ref) {
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref,
			className: [
				"wb-color-picker",
				disabled ? "wb-color-picker--disabled" : "",
				className
			].filter(Boolean).join(" "),
			role: "radiogroup",
			"aria-label": ariaLabel ?? "颜色选择",
			style: { gridTemplateColumns: `repeat(${columns}, ${swatchSize}px)` },
			children: colors.map((swatch) => {
				const selected = value !== void 0 && value === swatch.value;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					role: "radio",
					"aria-checked": selected,
					"aria-label": swatch.title,
					title: swatch.title,
					disabled,
					className: `wb-color-picker__swatch${selected ? " wb-color-picker__swatch--selected" : ""}`,
					style: {
						width: swatchSize,
						height: swatchSize,
						background: swatch.color,
						borderColor: swatch.borderColor ?? swatch.color
					},
					onClick: () => !disabled && onChange?.(swatch.value, swatch),
					children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						className: "wb-color-picker__check",
						viewBox: "0 0 16 16",
						width: "12",
						height: "12",
						"aria-hidden": true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M13.5 4.5 6.5 11.5 3 8",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							strokeLinecap: "round",
							strokeLinejoin: "round"
						})
					})
				}, String(swatch.value));
			})
		});
	});
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/ColorPicker/index.ts
var init_ColorPicker = __esmMin((() => {
	init_ColorPicker$1();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/components/index.ts
var init_components = __esmMin((() => {
	init_Avatar();
	init_Button();
	init_Icon();
	init_Input();
	init_Tag();
	init_Card();
	init_Loading();
	init_Popover();
	init_Popconfirm();
	init_Modal();
	init_Drawer();
	init_Dropdown();
	init_Notification();
	init_Select();
	init_Message();
	init_Switch();
	init_Checkbox();
	init_Tabs();
	init_Segmented();
	init_Table();
	init_Breadcrumb();
	init_Tooltip();
	init_Progress();
	init_ScrollLoadMore();
	init_Cascader();
	init_RegionPicker();
	init_ColorPicker();
}));
//#endregion
//#region ../../packages/agent-ui/src/foundation/index.ts
var init_foundation = __esmMin((() => {
	init_tokens();
	init_components();
	init_a11y();
}));
//#endregion
export { init_Tag as $, message as A, DrawerFooter as B, init_Tabs as C, init_Switch as D, init_Checkbox as E, init_Dropdown as F, init_Popconfirm as G, Modal as H, Dropdown as I, Popover as J, Popconfirm as K, init_Drawer as L, Select as M, init_Notification as N, Switch as O, Notification as P, init_Card as Q, Drawer as R, Segmented as S, Checkbox as T, ModalBody as U, init_Modal as V, ModalFooter as W, Loading as X, init_Loading as Y, Card as Z, init_Breadcrumb as _, init_RegionPicker as a, init_a11y as at, Table as b, chinaRegionDataSource as c, Button as ct, buildStaticDataSource as d, AvatarGroup as dt, Tag as et, ScrollLoadMore as f, init_tokens as ft, Tooltip as g, init_Tooltip as h, ColorPicker as i, getA11yLabel as it, init_Select as j, init_Message as k, init_Cascader as l, Avatar as lt, Progress as m, init_components as n, init_Input as nt, enRegionDataSource as o, init_Icon as ot, init_Progress as p, colorTokens as pt, init_Popover as q, init_ColorPicker as r, Search as rt, RegionPicker as s, init_Button as st, init_foundation as t, Input as tt, Cascader as u, init_Avatar as ut, Breadcrumb as v, Tabs as w, init_Segmented as x, init_Table as y, DrawerBody as z };
