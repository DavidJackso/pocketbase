import PocketBase, { getTokenPayload } from "pocketbase";
import { i18n } from "../i18n.js";

export function pageConfirmEmailChange(route) {
    const token = route.params?.token || "";
    const tokenPayload = getTokenPayload(token);

    if (!tokenPayload.newEmail || !tokenPayload.collectionId) {
        app.toasts.error(i18n.t("auth.invalid_email_change_token"));
        window.location.hash = "#/";
        return;
    }

    app.store.title = i18n.t("auth.confirm_email_change");

    const data = store({
        password: "",
        isSubmitting: false,
        isSuccess: false,
        showPassword: false,
    });

    async function submit() {
        if (data.isSubmitting) {
            return;
        }

        data.isSubmitting = true;

        // init a custom client to avoid interfering with the superuser state
        const client = new PocketBase(app.pb.baseURL);

        try {
            await client.collection(tokenPayload.collectionId).confirmEmailChange(token, data.password);
            data.isSuccess = true;
        } catch (err) {
            app.checkApiError(err);
            data.isSuccess = false;
        }

        data.isSubmitting = false;
    }

    return t.div(
        {
            pbEvent: "pageConfirmEmailChange",
            className: "wrapper sm m-auto p-b-base",
        },
        t.header(
            { className: "txt-center m-b-base" },
            t.img({ className: "main-logo", src: () => app.store.mainLogo, ariaHidden: true, alt: i18n.t("app.logo_alt") }),
            t.h5({ className: "m-t-10" }, () => app.store.title),
        ),
        () => {
            if (data.isSuccess) {
                return t.div(
                    {
                        pbEvent: "confirmEmailChangeAlert",
                        className: "alert success txt-center",
                    },
                    t.p(null, i18n.t("auth.email_changed_success")),
                    t.p(null, i18n.t("auth.go_back_sign_in_new_email")),
                );
            }

            return t.form(
                {
                    pbEvent: "confirmEmailChangeForm",
                    className: "grid confirm-email-change-form",
                    onsubmit: (e) => {
                        e.preventDefault();
                        submit();
                    },
                },
                t.div(
                    { className: "col-12" },
                    t.div(
                        { className: "content txt-center m-b-sm" },
                        i18n.t("auth.type_password_confirm_email_change") + " ",
                        t.strong(null, tokenPayload.newEmail),
                        ":",
                    ),
                    t.div(
                        { className: "fields" },
                        t.div(
                            { className: "field" },
                            t.label({ htmlFor: "password_confirm" }, i18n.t("record_upsert.password")),
                            t.input({
                                id: "password_confirm",
                                name: "password",
                                required: true,
                                autofocus: true,
                                type: () => (data.showPassword ? "text" : "password"),
                                value: () => data.password,
                                oninput: (e) => (data.password = e.target.value),
                            }),
                        ),
                        t.div(
                            { className: "field addon" },
                            t.button(
                                {
                                    type: "button",
                                    tabIndex: -1,
                                    className: "btn sm transparent secondary circle tooltip-right",
                                    ariaLabel: app.attrs.tooltip(() =>
                                        data.showPassword ? i18n.t("auth.hide_password") : i18n.t("auth.show_password")
                                    ),
                                    onclick: () => (data.showPassword = !data.showPassword),
                                },
                                t.i({
                                    className: () => (data.showPassword ? "ri-eye-off-line" : "ri-eye-line"),
                                    ariaHidden: true,
                                }),
                            ),
                        ),
                    ),
                ),
                t.div(
                    { className: "col-12" },
                    t.button(
                        {
                            className: () => `btn lg block ${data.isSubmitting ? "loading" : ""}`,
                            disabled: () => data.isSubmitting,
                        },
                        t.span({ className: "txt" }, i18n.t("auth.confirm_new_email")),
                    ),
                ),
            );
        },
    );
}
