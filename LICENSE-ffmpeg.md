# Bundled ffmpeg

Release archives for linux/amd64 and linux/arm64 bundle a statically-built
copy of [ffmpeg](https://ffmpeg.org), embedded into the `pocketbase` binary
and used by the optional automatic video conversion feature
(`core/field_file.go`).

This build is compiled with `libx264` support and is therefore licensed
under the **GNU General Public License v3** (not ffmpeg's default LGPL),
same as any ffmpeg build with GPL-licensed components enabled. The full
GPLv3 text is available at <https://www.gnu.org/licenses/gpl-3.0.txt>.

Bundling this binary does not affect the license of PocketBase itself
(MIT, see LICENSE.md) — ffmpeg is invoked as a separate process
(`os/exec`), not linked into the Go binary.

Source code for the exact build used: the static builds published at
<https://github.com/BtbN/FFmpeg-Builds>, which builds ffmpeg from its
official upstream source (<https://github.com/FFmpeg/FFmpeg>) with the
`gpl` variant configuration.

Other platforms/architectures are not bundled and rely on a
system-installed `ffmpeg` on `PATH`.
