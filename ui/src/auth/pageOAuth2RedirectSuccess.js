import { i18n } from "../i18n.js";

export function pageOAuth2RedirectSuccess(route) {
    app.store.title = i18n.t("auth.oauth2_completed_title");

    window.close();

    return t.div(
        { pbEvent: "pageOAuth2RedirectSuccess", className: "page" },
        t.div(
            { className: "page-content" },
            t.header(
                { className: "txt-center p-base" },
                t.h3({ className: "primary-heading m-b-sm" }, i18n.t("auth.auth_completed")),
                t.h6({ className: "secondary-heading" }, i18n.t("auth.close_window_go_back")),
            ),
        ),
    );
}
