//go:build !((linux && amd64) || (linux && arm64))

package core

// embeddedFFmpeg is only bundled for linux/amd64 and linux/arm64 (the
// common container/server targets); other platforms rely on a
// system-installed ffmpeg on PATH.
var embeddedFFmpeg []byte
