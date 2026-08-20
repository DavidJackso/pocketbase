package core

import (
	"encoding/json"

	"github.com/pocketbase/pocketbase/tools/types"
)

// ResolveLocalizedExport rewrites every Localized field value in export
// (as produced by [Record.PublicExport]) from its {"locale":"value", ...}
// map form down to a single string for the requested locale, falling back
// to baseLocale, then to an empty string if neither is present.
//
// Non-Localized fields are passed through unchanged. export is mutated in
// place and also returned for convenience.
//
// This is a pure, app-agnostic helper deliberately kept outside of
// Record/PublicExport itself since core.Record has no access to the
// current HTTP request (and therefore no knowledge of the requested
// display locale) - see the HTTP-layer callers in apis/record_crud.go.
func ResolveLocalizedExport(collection *Collection, export map[string]any, baseLocale string, locale string) map[string]any {
	if collection == nil || export == nil {
		return export
	}

	for _, f := range collection.Fields {
		lf, ok := f.(localizedField)
		if !ok || !lf.IsLocalized() {
			continue
		}

		name := f.GetName()
		raw, ok := export[name]
		if !ok {
			continue
		}

		values := map[string]any{}

		switch v := raw.(type) {
		case types.JSONRaw:
			if len(v) > 0 {
				_ = json.Unmarshal(v, &values)
			}
		case map[string]any:
			values = v
		case map[string]string:
			for k, s := range v {
				values[k] = s
			}
		default:
			// unexpected shape (eg. still a plain string from a
			// not-yet-normalized value) - leave the export value as-is
			continue
		}

		if v, ok := values[locale]; ok {
			export[name] = v
		} else if v, ok := values[baseLocale]; ok {
			export[name] = v
		} else {
			export[name] = ""
		}
	}

	return export
}
