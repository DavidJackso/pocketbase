import { i18n } from "../i18n.js";

export function pageOAuth2RedirectFailure(route) {
    app.store.title = i18n.t("auth.oauth2_failed_title");

    window.close();

    return t.div(
        { pbEvent: "pageOAuth2RedirectFailure", className: "page" },
        t.div(
            { className: "page-content" },
            t.header(
                { className: "txt-center p-base" },
                t.h3({ className: "primary-heading m-b-sm" }, i18n.t("auth.auth_failed")),
                t.h6(
                    { className: "secondary-heading" },
                    i18n.t("auth.close_window_try_again"),
                ),
            ),
        ),
    );
}
