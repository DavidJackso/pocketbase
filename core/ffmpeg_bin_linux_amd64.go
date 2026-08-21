//go:build linux && amd64

package core

import _ "embed"

// embeddedFFmpeg is populated by scripts/fetch-ffmpeg.sh before release
// builds (see .github/workflows/release.yaml); local/dev/test builds embed
// the empty placeholder and fall back to a system-installed ffmpeg.
//
//go:embed ffmpeg_bin/ffmpeg_linux_amd64
var embeddedFFmpeg []byte
