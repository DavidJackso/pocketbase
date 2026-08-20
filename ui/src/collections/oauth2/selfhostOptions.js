import { i18n } from "../../i18n.js";

window.app = window.app || {};
window.app.components = window.app.components || {};

// note: data is the providerSettingsModal form store
window.app.components.oauth2EndpointFields = function(providerInfo, namePrefix, data, settingsArg = {}) {
    const uniqueId = "endpoints_" + app.utils.randomString();

    const settings = store({
        required: true,
        get title() {
            return i18n.t("oauth2.provider_endpoints");
        },
    });

    const watchers = app.utils.extendStore(settings, settingsArg);

    return t.div(
        {
            pbEvent: "oauth2Endpoints",
            className: "oauth2-endpoints",
            onunmount: () => {
                watchers.forEach((w) => w?.unwatch());
            },
        },
        t.p(
            { className: "txt-bold" },
            (el) => {
                if (typeof settings.title == "function") {
                    settings.title(el);
                }
                return settings.title;
            },
        ),
        t.div(
            { className: "grid" },
            t.div(
                { className: "col-12" },
                t.div(
                    { className: "field" },
                    t.label({ htmlFor: uniqueId + ".authURL" }, i18n.t("oauth2.auth_url")),
                    t.input({
                        id: uniqueId + ".authURL",
                        name: namePrefix + ".authURL",
                        type: "url",
                        required: () => !!settings.required,
                        value: () => data.config.authURL || "",
                        oninput: (e) => data.config.authURL = e.target.value,
                    }),
                ),
            ),
            t.div(
                { className: "col-12" },
                t.div(
                    { className: "field" },
                    t.label({ htmlFor: uniqueId + ".tokenURL" }, i18n.t("oauth2.token_url")),
                    t.input({
                        id: uniqueId + ".tokenURL",
                        name: namePrefix + ".tokenURL",
                        type: "url",
                        required: () => !!settings.required,
                        value: () => data.config.tokenURL || "",
                        oninput: (e) => data.config.tokenURL = e.target.value,
                    }),
                ),
            ),
            t.div(
                { className: "col-12" },
                t.div(
                    { className: "field" },
                    t.label({ htmlFor: uniqueId + ".userInfoURL" }, i18n.t("oauth2.user_info_url")),
                    t.input({
                        id: uniqueId + ".userInfoURL",
                        name: namePrefix + ".userInfoURL",
                        type: "url",
                        required: () => !!settings.required,
                        value: () => data.config.userInfoURL || "",
                        oninput: (e) => data.config.userInfoURL = e.target.value,
                    }),
                ),
            ),
        ),
    );
};

window.app.oauth2 = window.app.oauth2 || {};

window.app.oauth2.gitlab = function(providerInfo, namePrefix, data) {
    return app.components.oauth2EndpointFields(
        providerInfo,
        namePrefix,
        data,
        {
            required: false,
            title: i18n.t("oauth2.self_hosted_endpoints"),
        },
    );
};

window.app.oauth2.gitea = function(providerInfo, namePrefix, data) {
    return app.components.oauth2EndpointFields(
        providerInfo,
        namePrefix,
        data,
        {
            required: false,
            title: i18n.t("oauth2.self_hosted_endpoints"),
        },
    );
};

window.app.oauth2.mailcow = function(providerInfo, namePrefix, data) {
    return app.components.oauth2EndpointFields(
        providerInfo,
        namePrefix,
        data,
    );
};
