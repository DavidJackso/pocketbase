import { i18n } from "../../i18n.js";

export function batchAccordion(pageData) {
    return t.details(
        {
            pbEvent: "batchApiAccordion",
            className: "accordion batch-api-accordion",
            name: "settingsAccordion",
        },
        t.summary(
            null,
            t.i({ className: "ri-archive-stack-line", ariaHidden: true }),
            t.span({ className: "txt" }, i18n.t("app_settings.batch_web_api")),
            t.div({ className: "flex-fill" }),
            () => {
                if (pageData.formSettings.batch.enabled) {
                    return t.span({ className: "label success" }, i18n.t("common.enabled"));
                }
                return t.span({ className: "label" }, i18n.t("common.disabled"));
            },
            () => {
                if (!app.utils.isEmpty(app.store.errors?.batch)) {
                    return t.i({
                        className: "ri-error-warning-fill txt-danger",
                        ariaDescription: app.attrs.tooltip(i18n.t("common.has_errors"), "left"),
                    });
                }
            },
        ),
        t.div(
            { className: "grid sm" },
            t.div(
                { className: "col-lg-12" },
                t.div(
                    { className: "field" },
                    t.input({
                        id: "batch.enabled",
                        name: "batch.enabled",
                        type: "checkbox",
                        className: "switch",
                        checked: () => pageData.formSettings.batch.enabled || false,
                        onchange: (e) => (pageData.formSettings.batch.enabled = e.target.checked),
                    }),
                    t.label(
                        { htmlFor: "batch.enabled" },
                        t.span({ className: "txt" }, i18n.t("common.enable")),
                        t.small({ className: "txt-hint" }, " (experimental)"),
                    ),
                ),
            ),
            t.div(
                { className: "col-lg-4" },
                t.div(
                    { className: "field" },
                    t.label(
                        { htmlFor: "batch.maxRequests" },
                        t.span({ className: "txt" }, i18n.t("app_settings.max_batch_requests")),
                        t.i({
                            className: "ri-information-line link-faded",
                            ariaDescription: app.attrs.tooltip(i18n.t("app_settings.max_batch_requests_help"), "right"),
                        }),
                    ),
                    t.input({
                        id: "batch.maxRequests",
                        name: "batch.maxRequests",
                        type: "number",
                        min: 1,
                        step: 1,
                        required: () => pageData.formSettings.batch.enabled,
                        disabled: () => !pageData.formSettings.batch.enabled,
                        value: () => pageData.formSettings.batch.maxRequests,
                        oninput: (e) => (pageData.formSettings.batch.maxRequests = e.target.value << 0),
                    }),
                ),
            ),
            t.div(
                { className: "col-lg-4" },
                t.div(
                    { className: "field" },
                    t.label(
                        { htmlFor: "batch.timeout" },
                        t.span({ className: "txt" }, i18n.t("app_settings.max_processing_time")),
                    ),
                    t.input({
                        id: "batch.timeout",
                        name: "batch.timeout",
                        type: "number",
                        min: 1,
                        step: 1,
                        required: () => pageData.formSettings.batch.enabled,
                        disabled: () => !pageData.formSettings.batch.enabled,
                        value: () => pageData.formSettings.batch.timeout,
                        oninput: (e) => pageData.formSettings.batch.timeout = parseInt(e.target.value, 10),
                    }),
                ),
            ),
            t.div(
                { className: "col-lg-4" },
                t.div(
                    { className: "field" },
                    t.label(
                        { htmlFor: "batch.maxBodySize" },
                        t.span({ className: "txt" }, i18n.t("app_settings.max_body_size")),
                    ),
                    t.input({
                        id: "batch.maxBodySize",
                        name: "batch.maxBodySize",
                        type: "number",
                        min: 0,
                        step: 1,
                        placeholder: i18n.t("app_settings.default_128mb"),
                        disabled: () => !pageData.formSettings.batch.enabled,
                        value: () => pageData.formSettings.batch.maxBodySize || "",
                        oninput: (e) => pageData.formSettings.batch.maxBodySize = parseInt(e.target.value, 10),
                    }),
                ),
            ),
        ),
    );
}
