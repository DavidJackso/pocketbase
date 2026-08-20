import { i18n } from "../../i18n.js";

export function localizationAccordion(pageData) {
    return t.details(
        {
            pbEvent: "localizationAccordion",
            className: "accordion localization-accordion",
            name: "settingsAccordion",
        },
        t.summary(
            null,
            t.i({ className: "ri-translate-2", ariaHidden: true }),
            t.span({ className: "txt" }, i18n.t("app_settings.localization")),
            t.div({ className: "flex-fill" }),
            () => {
                if (!app.utils.isEmpty(app.store.errors?.localization)) {
                    return t.i({
                        className: "ri-error-warning-fill txt-danger",
                        ariaDescription: app.attrs.tooltip(i18n.t("common.has_errors"), "left"),
                    });
                }
            },
        ),
        t.p(
            { className: "m-t-0" },
            i18n.t("app_settings.localization_intro"),
        ),
        t.div(
            { className: "grid sm" },
            t.div(
                { className: "col-lg-4" },
                t.div(
                    { className: "field" },
                    t.label(
                        { htmlFor: "localization.baseLocale" },
                        t.span({ className: "txt" }, i18n.t("app_settings.base_locale_label")),
                        t.i({
                            className: "ri-information-line link-faded",
                            ariaDescription: app.attrs.tooltip(i18n.t("app_settings.base_locale_help"), "right"),
                        }),
                    ),
                    t.input({
                        type: "text",
                        id: "localization.baseLocale",
                        name: "localization.baseLocale",
                        required: true,
                        placeholder: "en",
                        value: () => pageData.formSettings.localization.baseLocale || "",
                        oninput: (e) => (pageData.formSettings.localization.baseLocale = e.target.value),
                    }),
                ),
            ),
            t.div(
                { className: "col-lg-8" },
                t.div(
                    { className: "field" },
                    t.label(
                        { htmlFor: "localization.supportedLocales" },
                        t.span({ className: "txt" }, i18n.t("app_settings.supported_locales")),
                        t.i({
                            className: "ri-information-line link-faded",
                            ariaDescription: app.attrs.tooltip(i18n.t("app_settings.supported_locales_help"), "right"),
                        }),
                    ),
                    t.input({
                        type: "text",
                        id: "localization.supportedLocales",
                        name: "localization.supportedLocales",
                        placeholder: "en, ru",
                        value: () => app.utils.joinNonEmpty(pageData.formSettings.localization.supportedLocales),
                        oninput: (e) => {
                            pageData.formSettings.localization.supportedLocales = app.utils.splitNonEmpty(
                                e.target.value,
                                ",",
                            );
                        },
                    }),
                ),
                t.div(
                    { className: "field-help" },
                    i18n.t("app_settings.supported_locales_example"),
                ),
            ),
        ),
    );
}
