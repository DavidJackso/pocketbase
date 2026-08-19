import { locales } from "./locales/index.js";

const dictionaries = { ...locales };

const FALLBACK_LOCALE = "en";
const STORAGE_KEY = "pb_admin_locale";

function detectInitialLocale() {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && dictionaries[stored]) {
        return stored;
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
    // used by locale-pack registration (see ui/src/locales/index.js)
    _register(code, dict) {
        dictionaries[code] = dict;
    },
};
