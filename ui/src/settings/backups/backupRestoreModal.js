import { i18n } from "../../i18n.js";

export function openBackupRestoreModal(key) {
    const modal = backupRestoreModal(key);

    document.body.appendChild(modal);

    app.modals.open(modal);
}

function backupRestoreModal(key) {
    const uniqueId = "backup_restore_" + app.utils.randomString();

    const data = store({
        key: key,
        keyConfirm: "",
        isSubmitting: false,
        get canSubmit() {
            return data.key && data.key == data.keyConfirm;
        },
    });

    let reloadTimeoutId;

    async function submit() {
        if (data.isSubmitting || !data.canSubmit) {
            return;
        }

        clearTimeout(reloadTimeoutId);

        data.isSubmitting = true;

        try {
            await app.pb.backups.restore(data.keyConfirm);

            // optimistic restore page reload
            reloadTimeoutId = setTimeout(() => {
                window.location.reload();
                data.isSubmitting = false;
            }, 2000);
        } catch (err) {
            clearTimeout(reloadTimeoutId);

            if (!err?.isAbort) {
                data.isSubmitting = false;
                app.checkApiError(err);
            }
        }
    }

    return t.div(
        {
            pbEvent: "backupRestoreModal",
            className: "modal popup backup-restore-modal",
            onbeforeclose: () => {
                return !data.isSubmitting;
            },
            onafterclose: (el) => {
                el?.remove();
            },
            onunmount: () => {
                clearTimeout(reloadTimeoutId);
            },
        },
        t.header(
            { className: "modal-header" },
            t.h5(
                { className: "m-auto txt-center" },
                () => i18n.t("backups.restore") + " ",
                t.strong(null, () => data.key),
            ),
        ),
        t.form(
            {
                id: uniqueId,
                className: "modal-content backup-restore-form",
                autocomplete: "off",
                onsubmit: (e) => {
                    e.preventDefault();
                    submit();
                },
            },
            t.div(
                { className: "grid" },
                t.div(
                    { className: "col-lg-12" },
                    t.div(
                        { className: "alert danger" },
                        t.div(
                            { className: "content" },
                            t.p(
                                { className: "txt-bold" },
                                i18n.t("backups.restore_caution"),
                            ),
                            t.p(null, i18n.t("backups.restore_unix_only")),
                            t.p(
                                null,
                                () => i18n.t("backups.restore_explain1_a") + " ",
                                t.code(null, "pb_data"),
                                () => " " + i18n.t("backups.restore_explain1_b"),
                            ),
                            t.p(
                                null,
                                i18n.t("backups.restore_explain2"),
                            ),
                            t.p(
                                null,
                                () => i18n.t("backups.restore_explain3_a") + " ",
                                t.code(null, "data.db"),
                                () => " " + i18n.t("backups.restore_explain3_b"),
                            ),
                            t.p(null, i18n.t("backups.restore_flow_intro")),
                            t.ol(
                                null,
                                t.li(
                                    null,
                                    () => i18n.t("backups.restore_step1_a") + " ",
                                    t.code(null, "pb_data"),
                                    () => " " + i18n.t("backups.restore_step1_b"),
                                ),
                                t.li(null, i18n.t("backups.restore_step2")),
                                t.li(
                                    null,
                                    () => i18n.t("backups.restore_step3_a") + " ",
                                    t.code(null, "pb_data"),
                                    ".",
                                ),
                                t.li(null, i18n.t("backups.restore_step4")),
                            ),
                        ),
                    ),
                ),
                t.div(
                    { className: "col-lg-12" },
                    t.div(
                        { className: "confirm-key-label m-b-sm" },
                        () => i18n.t("backups.type_name_prefix") + " ",
                        t.div(
                            { className: "label" },
                            () => data.key,
                            app.components.copyButton(() => data.key),
                        ),
                        () => " " + i18n.t("collection_upsert.type_name_suffix"),
                    ),
                    t.div(
                        { className: "field" },
                        t.label({ htmlFor: uniqueId + "_key" }, i18n.t("backups.backup_name")),
                        t.input({
                            id: uniqueId + "_key",
                            name: "key",
                            type: "text",
                            required: true,
                            value: () => data.keyConfirm,
                            oninput: (e) => (data.keyConfirm = e.target.value),
                        }),
                    ),
                ),
            ),
        ),
        t.footer(
            { className: "modal-footer" },
            t.button(
                {
                    type: "button",
                    className: "btn transparent m-r-auto",
                    onclick: () => app.modals.close(),
                    disabled: () => data.isSubmitting,
                },
                t.span({ className: "txt" }, i18n.t("common.cancel")),
            ),
            t.button(
                {
                    "html-form": uniqueId,
                    type: "submit",
                    className: () => `btn ${data.isSubmitting ? "loading" : ""}`,
                    disabled: () => data.isSubmitting || !data.canSubmit,
                },
                t.span({ className: "txt" }, i18n.t("backups.restore_backup")),
            ),
        ),
    );
}
