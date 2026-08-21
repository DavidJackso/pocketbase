#!/usr/bin/env bash
# Downloads the static ffmpeg builds embedded into linux/amd64 and
# linux/arm64 release binaries for the automatic video conversion feature
# (core/field_file.go). Run before `goreleaser build` (see
# .github/workflows/release.yaml) so release binaries carry their own
# ffmpeg; local/dev builds skip this and fall back to a system ffmpeg on
# PATH (see core/ffmpeg_bin_other.go).
#
# Builds are GPL-licensed (libx264 enabled) — see LICENSE-ffmpeg.md.
set -euo pipefail

dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)/core/ffmpeg_bin"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

fetch() {
	local asset_arch=$1 out_name=$2
	local archive="ffmpeg-master-latest-${asset_arch}-gpl.tar.xz"
	curl -fsSL "https://github.com/BtbN/FFmpeg-Builds/releases/latest/download/${archive}" -o "$tmp/ffmpeg.tar.xz"
	tar -xJf "$tmp/ffmpeg.tar.xz" -C "$tmp"
	cp "$tmp/ffmpeg-master-latest-${asset_arch}-gpl/bin/ffmpeg" "$dir/$out_name"
	rm -rf "${tmp:?}"/*
}

fetch linux64 ffmpeg_linux_amd64
fetch linuxarm64 ffmpeg_linux_arm64
