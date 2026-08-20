package core_test

import (
	"context"
	"encoding/json"
	"fmt"
	"strings"
	"testing"

	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/tests"
	"github.com/pocketbase/pocketbase/tools/types"
)

func TestEditorFieldBaseMethods(t *testing.T) {
	testFieldBaseMethods(t, core.FieldTypeEditor)
}

func TestEditorFieldColumnType(t *testing.T) {
	app, _ := tests.NewTestApp()
	defer app.Cleanup()

	f := &core.EditorField{}

	expected := "TEXT DEFAULT '' NOT NULL"

	if v := f.ColumnType(app); v != expected {
		t.Fatalf("Expected\n%q\ngot\n%q", expected, v)
	}
}

func TestEditorFieldPrepareValue(t *testing.T) {
	app, _ := tests.NewTestApp()
	defer app.Cleanup()

	f := &core.EditorField{}
	record := core.NewRecord(core.NewBaseCollection("test"))

	scenarios := []struct {
		raw      any
		expected string
	}{
		{"", ""},
		{"test", "test"},
		{false, "false"},
		{true, "true"},
		{123.456, "123.456"},
	}

	for i, s := range scenarios {
		t.Run(fmt.Sprintf("%d_%#v", i, s.raw), func(t *testing.T) {
			v, err := f.PrepareValue(record, s.raw)
			if err != nil {
				t.Fatal(err)
			}

			vStr, ok := v.(string)
			if !ok {
				t.Fatalf("Expected string instance, got %T", v)
			}

			if vStr != s.expected {
				t.Fatalf("Expected %q, got %q", s.expected, v)
			}
		})
	}
}

func TestEditorFieldLocalizedColumnType(t *testing.T) {
	t.Parallel()

	f := &core.EditorField{Localized: true}
	if got := f.ColumnType(nil); got != "JSON DEFAULT NULL" {
		t.Fatalf("expected JSON DEFAULT NULL, got %q", got)
	}

	plain := &core.EditorField{}
	if got := plain.ColumnType(nil); got != "TEXT DEFAULT '' NOT NULL" {
		t.Fatalf("plain EditorField ColumnType regressed, got %q", got)
	}
}

func TestEditorFieldLocalizedPrepareAndValidate(t *testing.T) {
	t.Parallel()

	app, _ := tests.NewTestApp()
	defer app.Cleanup()

	collection := core.NewBaseCollection("test_localized_editor")

	scenarios := []struct {
		name      string
		field     *core.EditorField
		raw       any
		expectErr bool
	}{
		{
			name:      "plain string gets wrapped in base locale",
			field:     &core.EditorField{Name: "content", Localized: true, Required: true},
			raw:       "<p>hello</p>",
			expectErr: false,
		},
		{
			name:      "object with base locale key",
			field:     &core.EditorField{Name: "content", Localized: true, Required: true},
			raw:       `{"en":"<p>hello</p>","ru":"<p>привет</p>"}`,
			expectErr: false,
		},
		{
			name:      "required but missing base locale key",
			field:     &core.EditorField{Name: "content", Localized: true, Required: true},
			raw:       `{"ru":"<p>привет</p>"}`,
			expectErr: true,
		},
	}

	for _, s := range scenarios {
		t.Run(s.name, func(t *testing.T) {
			record := core.NewRecord(collection)
			record.SetApp(app)

			prepared, err := s.field.PrepareValue(record, s.raw)
			if err != nil {
				t.Fatalf("PrepareValue error: %v", err)
			}
			record.SetRaw(s.field.Name, prepared)

			err = s.field.ValidateValue(context.Background(), app, record)
			hasErr := err != nil
			if hasErr != s.expectErr {
				t.Fatalf("expected error=%v, got %v (%v)", s.expectErr, hasErr, err)
			}
		})
	}
}

func TestEditorFieldLocalizedRespectsConfiguredBaseLocale(t *testing.T) {
	t.Parallel()

	app, _ := tests.NewTestApp()
	defer app.Cleanup()

	app.Settings().Localization.BaseLocale = "ru"

	collection := core.NewBaseCollection("test_localized_editor_base")
	f := &core.EditorField{Name: "content", Localized: true, Required: true}

	record := core.NewRecord(collection)
	record.SetApp(app)

	prepared, err := f.PrepareValue(record, "<p>привет</p>")
	if err != nil {
		t.Fatal(err)
	}
	record.SetRaw(f.Name, prepared)

	if err := f.ValidateValue(context.Background(), app, record); err != nil {
		t.Fatalf("expected valid record with ru base locale populated, got %v", err)
	}

	raw, ok := record.GetRaw(f.Name).(types.JSONRaw)
	if !ok {
		t.Fatalf("expected types.JSONRaw stored value, got %T", record.GetRaw(f.Name))
	}

	values := map[string]string{}
	if err := json.Unmarshal(raw, &values); err != nil {
		t.Fatal(err)
	}
	if values["ru"] != "<p>привет</p>" {
		t.Fatalf(`expected the value to be keyed under "ru" as "<p>привет</p>", got %#v`, values)
	}
}

func TestEditorFieldLocalizedMaxSize(t *testing.T) {
	t.Parallel()

	app, _ := tests.NewTestApp()
	defer app.Cleanup()

	collection := core.NewBaseCollection("test_localized_editor_maxsize")
	f := &core.EditorField{Name: "content", Localized: true, MaxSize: 5}

	record := core.NewRecord(collection)
	record.SetApp(app)

	prepared, err := f.PrepareValue(record, "too long value")
	if err != nil {
		t.Fatal(err)
	}
	record.SetRaw(f.Name, prepared)

	if err := f.ValidateValue(context.Background(), app, record); err == nil {
		t.Fatal("expected max content size validation error")
	}
}

func TestEditorFieldValidateValue(t *testing.T) {
	app, _ := tests.NewTestApp()
	defer app.Cleanup()

	collection := core.NewBaseCollection("test_collection")

	scenarios := []struct {
		name        string
		field       *core.EditorField
		record      func() *core.Record
		expectError bool
	}{
		{
			"invalid raw value",
			&core.EditorField{Name: "test"},
			func() *core.Record {
				record := core.NewRecord(collection)
				record.SetRaw("test", 123)
				return record
			},
			true,
		},
		{
			"zero field value (not required)",
			&core.EditorField{Name: "test"},
			func() *core.Record {
				record := core.NewRecord(collection)
				record.SetRaw("test", "")
				return record
			},
			false,
		},
		{
			"zero field value (required)",
			&core.EditorField{Name: "test", Required: true},
			func() *core.Record {
				record := core.NewRecord(collection)
				record.SetRaw("test", "")
				return record
			},
			true,
		},
		{
			"non-zero field value (required)",
			&core.EditorField{Name: "test", Required: true},
			func() *core.Record {
				record := core.NewRecord(collection)
				record.SetRaw("test", "abc")
				return record
			},
			false,
		},
		{
			"> default MaxSize",
			&core.EditorField{Name: "test", Required: true},
			func() *core.Record {
				record := core.NewRecord(collection)
				record.SetRaw("test", strings.Repeat("a", 1+(5<<20)))
				return record
			},
			true,
		},
		{
			"> MaxSize",
			&core.EditorField{Name: "test", Required: true, MaxSize: 5},
			func() *core.Record {
				record := core.NewRecord(collection)
				record.SetRaw("test", "abcdef")
				return record
			},
			true,
		},
		{
			"<= MaxSize",
			&core.EditorField{Name: "test", Required: true, MaxSize: 5},
			func() *core.Record {
				record := core.NewRecord(collection)
				record.SetRaw("test", "abcde")
				return record
			},
			false,
		},
	}

	for _, s := range scenarios {
		t.Run(s.name, func(t *testing.T) {
			err := s.field.ValidateValue(context.Background(), app, s.record())

			hasErr := err != nil
			if hasErr != s.expectError {
				t.Fatalf("Expected hasErr %v, got %v (%v)", s.expectError, hasErr, err)
			}
		})
	}
}

func TestEditorFieldValidateSettings(t *testing.T) {
	testDefaultFieldIdValidation(t, core.FieldTypeEditor)
	testDefaultFieldNameValidation(t, core.FieldTypeEditor)
	testDefaultFieldHelpValidation[core.EditorField](t)

	app, _ := tests.NewTestApp()
	defer app.Cleanup()

	collection := core.NewBaseCollection("test_collection")

	scenarios := []struct {
		name         string
		field        func() *core.EditorField
		expectErrors []string
	}{
		{
			"< 0 MaxSize",
			func() *core.EditorField {
				return &core.EditorField{
					Id:      "test",
					Name:    "test",
					MaxSize: -1,
				}
			},
			[]string{"maxSize"},
		},
		{
			"= 0 MaxSize",
			func() *core.EditorField {
				return &core.EditorField{
					Id:   "test",
					Name: "test",
				}
			},
			[]string{},
		},
		{
			"> 0 MaxSize",
			func() *core.EditorField {
				return &core.EditorField{
					Id:      "test",
					Name:    "test",
					MaxSize: 1,
				}
			},
			[]string{},
		},
		{
			"MaxSize > safe json int",
			func() *core.EditorField {
				return &core.EditorField{
					Id:      "test",
					Name:    "test",
					MaxSize: 1 << 53,
				}
			},
			[]string{"maxSize"},
		},
	}

	for _, s := range scenarios {
		t.Run(s.name, func(t *testing.T) {
			errs := s.field().ValidateSettings(context.Background(), app, collection)

			tests.TestValidationErrors(t, errs, s.expectErrors)
		})
	}
}

func TestEditorFieldCalculateMaxBodySize(t *testing.T) {
	testApp, _ := tests.NewTestApp()
	defer testApp.Cleanup()

	scenarios := []struct {
		field    *core.EditorField
		expected int64
	}{
		{&core.EditorField{}, core.DefaultEditorFieldMaxSize},
		{&core.EditorField{MaxSize: 10}, 10},
	}

	for i, s := range scenarios {
		t.Run(fmt.Sprintf("%d_%d", i, s.field.MaxSize), func(t *testing.T) {
			result := s.field.CalculateMaxBodySize()

			if result != s.expected {
				t.Fatalf("Expected %d, got %d", s.expected, result)
			}
		})
	}
}
