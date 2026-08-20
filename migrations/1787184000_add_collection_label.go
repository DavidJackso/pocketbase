package migrations

import (
	"slices"

	"github.com/pocketbase/pocketbase/core"
)

// adds the "label" column used to store an optional, human-friendly
// display name for a collection (the technical "name" stays as the
// API/URL identifier and is left untouched).
//
// note: fresh installs already have the column from 1640988000_init.go,
// so this only applies to databases created before this migration existed.
func init() {
	core.SystemMigrations.Register(func(txApp core.App) error {
		columns, err := txApp.TableColumns("_collections")
		if err != nil {
			return err
		}
		if slices.Contains(columns, "label") {
			return nil
		}

		_, err = txApp.DB().AddColumn("_collections", "label", "TEXT DEFAULT '' NOT NULL").Execute()
		return err
	}, func(txApp core.App) error {
		_, err := txApp.DB().DropColumn("_collections", "label").Execute()
		return err
	})
}
