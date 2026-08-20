package core_test

import (
	"testing"

	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tools/types"
)

func TestResolveLocalizedExport(t *testing.T) {
	t.Parallel()

	collection := core.NewBaseCollection("articles")
	collection.Fields.Add(&core.TextField{Id: "f1", Name: "title", Localized: true})
	collection.Fields.Add(&core.TextField{Id: "f2", Name: "slug"}) // not localized, must pass through untouched

	newExport := func() map[string]any {
		return map[string]any{
			"title": types.JSONRaw(`{"en":"Hello","ru":"Привет"}`),
			"slug":  "hello-world",
		}
	}

	t.Run("requested locale present", func(t *testing.T) {
		got := core.ResolveLocalizedExport(collection, newExport(), "en", "ru")
		if got["title"] != "Привет" {
			t.Fatalf("expected ru value, got %v", got["title"])
		}
		if got["slug"] != "hello-world" {
			t.Fatalf("non-localized field must pass through unchanged, got %v", got["slug"])
		}
	})

	t.Run("missing locale falls back to base", func(t *testing.T) {
		got := core.ResolveLocalizedExport(collection, newExport(), "en", "fr")
		if got["title"] != "Hello" {
			t.Fatalf("expected fallback to base locale, got %v", got["title"])
		}
	})

	t.Run("missing both locale and base falls back to empty string", func(t *testing.T) {
		export := map[string]any{"title": types.JSONRaw(`{"de":"Hallo"}`)}
		got := core.ResolveLocalizedExport(collection, export, "en", "fr")
		if got["title"] != "" {
			t.Fatalf("expected empty string fallback, got %v", got["title"])
		}
	})

	t.Run("also accepts a native map[string]any value", func(t *testing.T) {
		export := map[string]any{"title": map[string]any{"en": "Hello", "ru": "Привет"}}
		got := core.ResolveLocalizedExport(collection, export, "en", "ru")
		if got["title"] != "Привет" {
			t.Fatalf("expected ru value, got %v", got["title"])
		}
	})

	t.Run("nil collection or export is a noop", func(t *testing.T) {
		if got := core.ResolveLocalizedExport(nil, newExport(), "en", "ru"); got["title"] == "Привет" {
			t.Fatalf("expected nil collection to be a noop, got %v", got["title"])
		}
		if got := core.ResolveLocalizedExport(collection, nil, "en", "ru"); got != nil {
			t.Fatalf("expected nil export to be returned as-is, got %v", got)
		}
	})
}
