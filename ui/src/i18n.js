import { locales } from "./locales/index.js";

const dictionaries = { ...locales };

const FALLBACK_LOCALE = "en";
const STORAGE_KEY = "pb_admin_locale";

function detectInitialLocale() {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && dictionaries[stored]) {
        return stored;
    }
    for (const lang of window.navigator?.languages || [window.navigator?.language]) {
        const code = lang?.slice(0, 2).toLowerCase();
        if (code && dictionaries[code]) {
            return code;
        }
    }
    return FALLBACK_LOCALE;
}

let activeLocale = detectInitialLocale();

function interpolate(str, vars) {
    return str.replace(/\{(\w+)\}/g, (match, name) => {
        return Object.prototype.hasOwnProperty.call(vars, name) ? String(vars[name]) : match;
    });
}

export const i18n = {
    get locale() {
        return activeLocale;
    },
    get available() {
        return Object.keys(dictionaries);
    },
    setLocale(code) {
        if (!dictionaries[code]) {
            throw new Error(`Unknown locale "${code}"`);
        }
        activeLocale = code;
        window.localStorage.setItem(STORAGE_KEY, code);
        if (window.app?.store) {
            window.app.store.locale = code;
        }
    },
    t(key, vars = {}) {
        const dict = dictionaries[activeLocale] || dictionaries[FALLBACK_LOCALE];
        const value = dict[key] ?? dictionaries[FALLBACK_LOCALE][key] ?? key;
        return interpolate(value, vars);
    },
    // locale-aware plural form lookup, eg. plural("records_list.record", 3)
    // resolves to "records_list.record_" + Intl.PluralRules category ("one"/"few"/"many"/"other"),
    // falling back to the "_other" form if the resolved category isn't translated.
    plural(base, count, vars = {}) {
        const category = new Intl.PluralRules(activeLocale).select(count);
        const dict = dictionaries[activeLocale] || dictionaries[FALLBACK_LOCALE];
        const key = `${base}_${category}` in dict ? `${base}_${category}` : `${base}_other`;
        return this.t(key, { count, ...vars });
    },
};
