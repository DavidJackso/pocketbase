import PocketBase, { getTokenPayload } from "pocketbase";
import { i18n } from "../i18n.js";

export function pageConfirmPasswordReset(route) {
    const token = route.params?.token || "";
    const tokenPayload = getTokenPayload(token);

    if (!tokenPayload.email || !tokenPayload.collectionId) {
        app.toasts.error(i18n.t("auth.invalid_password_reset_token"));
        window.location.hash = "#/";
        return;
    }

    app.store.title = i18n.t("auth.confirm_password_reset");

    const data = store({
        newPassword: "",
        newPasswordConfirm: "",
        showNewPassword: false,
        showNewPasswordConfirm: false,
        isSubmitting: false,
        isSuccess: false,
    });

    async function submit() {
        if (data.isSubmitting) {
            return;
        }

        data.isSubmitting = true;

        // init a custom client to avoid interfering with the superuser state
        const client = new PocketBase(app.pb.baseURL);

        try {
            await client
                .collection(tokenPayload.collectionId)
                .confirmPasswordReset(token, data.newPassword, data.newPasswordConfirm);

            data.isSuccess = true;
        } catch (err) {
            app.checkApiError(err);
        }

        data.isSubmitting = false;
    }

    return t.div(
        {
            pbEvent: "pageConfirmPasswordReset",
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
                    { pbEvent: "confirmPasswordResetAlert", className: "alert success txt-center" },
                    t.p(null, i18n.t("auth.password_changed_success")),
                    t.p(null, i18n.t("auth.go_back_sign_in_new_password")),
                );
            }

            return t.form(
                {
                    pbEvent: "confirmPasswordResetForm",
                    className: "grid confirm-password-reset-form",
                    onsubmit: (e) => {
                        e.preventDefault();
                        submit();
                    },
                },
                t.div(
                    { className: "col-12" },
                    t.div(
                        { className: "content txt-center m-b-sm" },
                        i18n.t("auth.type_new_password_for") + " ",
                        t.strong(null, tokenPayload.email),
                        ":",
                    ),
                    t.div(
                        { className: "fields" },
                        t.div(
                            { className: "field" },
                            t.label({ htmlFor: "newPassword" }, i18n.t("auth.new_password")),
                            t.input({
                                id: "newPassword",
                                name: "password",
                                required: true,
                                autofocus: true,
                                autocomplete: "new-password",
                                type: () => (data.showNewPassword ? "text" : "password"),
                                value: () => data.newPassword,
                                oninput: (e) => (data.newPassword = e.target.value),
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
                                        data.showNewPassword ? i18n.t("auth.hide_password") : i18n.t("auth.show_password")
                                    ),
                                    onclick: () => (data.showNewPassword = !data.showNewPassword),
                                },
                                t.i({
                                    className: () => (data.showNewPassword ? "ri-eye-off-line" : "ri-eye-line"),
                                    ariaHidden: true,
                                }),
                            ),
                        ),
                    ),
                ),
                t.div(
                    { className: "col-12" },
                    t.div(
                        { className: "fields" },
                        t.div(
                            { className: "field" },
                            t.label({ htmlFor: "newPasswordConfirm" }, i18n.t("auth.new_password_confirm")),
                            t.input({
                                id: "newPasswordConfirm",
                                name: "passwordConfirm",
                                required: true,
                                autocomplete: "new-password",
                                type: () => (data.showNewPasswordConfirm ? "text" : "password"),
                                value: () => data.newPasswordConfirm,
                                oninput: (e) => (data.newPasswordConfirm = e.target.value),
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
                                        data.showNewPasswordConfirm ? i18n.t("auth.hide_password") : i18n.t("auth.show_password")
                                    ),
                                    onclick: () => (data.showNewPasswordConfirm = !data.showNewPasswordConfirm),
                                },
                                t.i({
                                    className: () => (data.showNewPasswordConfirm ? "ri-eye-off-line" : "ri-eye-line"),
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
                        t.span({ className: "txt" }, i18n.t("auth.set_new_password")),
                    ),
                ),
            );
        },
    );
}
