import { n as __esmMin, s as __toESM } from "./chunk-BRZcfu7K.js";
import { t as require_react } from "./react-ierAfTWN.js";
import { r as useTranslation, t as init_useI18n } from "./useI18n-DDytAo7_.js";
//#region ../../packages/agent-ui/src/components/knowledge-base-panel/tencent-lexiang/hooks/use-describe-upload-error.ts
var import_react, appendBizMessage, useDescribeUploadError;
var init_use_describe_upload_error = __esmMin((() => {
	import_react = /* @__PURE__ */ __toESM(require_react());
	init_useI18n();
	appendBizMessage = (base, bizMessage) => {
		const trimmed = bizMessage?.trim();
		if (!trimmed || trimmed === base) return base;
		return `${base}：${trimmed}`;
	};
	useDescribeUploadError = () => {
		const t = useTranslation();
		return (0, import_react.useCallback)((detail) => {
			switch (detail.kind) {
				case "forbidden": return appendBizMessage(t("tencentLexiang.upload.failed.forbidden"), detail.bizMessage);
				case "rateLimit": return appendBizMessage(t("tencentLexiang.upload.failed.rateLimit"), detail.bizMessage);
				case "network": return appendBizMessage(t("tencentLexiang.upload.failed.network"), detail.bizMessage);
				case "fileTooLarge": return appendBizMessage(t("tencentLexiang.upload.fileTooLarge"), detail.bizMessage);
				case "server": return appendBizMessage(t("tencentLexiang.upload.failed.server", { bizCode: detail.bizCode ?? "" }), detail.bizMessage);
				default: return detail.bizMessage ? t("tencentLexiang.upload.failed.generic", { reason: detail.bizMessage }) : t("tencentLexiang.upload.failed");
			}
		}, [t]);
	};
}));
//#endregion
export { useDescribeUploadError as n, init_use_describe_upload_error as t };
