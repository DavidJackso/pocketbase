<p align="center">
    <a href="https://pocketbase.io" target="_blank" rel="noopener">
        <img src="https://i.imgur.com/aCBbjKx.png" alt="PocketBase - open source backend in 1 file" />
    </a>
</p>

<p align="center"><a href="#readme-en">English</a> | <a href="#readme-ru">Русский</a></p>

<p align="center">
    <a href="https://github.com/pocketbase/pocketbase/actions/workflows/release.yaml" target="_blank" rel="noopener"><img src="https://github.com/pocketbase/pocketbase/actions/workflows/release.yaml/badge.svg" alt="build" /></a>
    <a href="https://github.com/pocketbase/pocketbase/releases" target="_blank" rel="noopener"><img src="https://img.shields.io/github/release/pocketbase/pocketbase.svg" alt="Latest releases" /></a>
    <a href="https://pkg.go.dev/github.com/pocketbase/pocketbase" target="_blank" rel="noopener"><img src="https://godoc.org/github.com/pocketbase/pocketbase?status.svg" alt="Go package documentation" /></a>
</p>

[PocketBase](https://pocketbase.io) is an open source Go backend that includes:

- embedded database (_SQLite_) with **realtime subscriptions**
- built-in **files and users management**
- convenient **Admin dashboard UI**
- and simple **REST-ish API**

**For documentation and examples, please visit https://pocketbase.io/docs.**

> [!WARNING]
> Please keep in mind that PocketBase is still under active development
> and therefore full backward compatibility is not guaranteed before reaching v1.0.0.

<a id="readme-en"></a>
## How this fork differs from upstream PocketBase

This is a fork of [pocketbase/pocketbase](https://github.com/pocketbase/pocketbase) focused on **admin UI localization** (server behavior, API contract and data model are untouched, aside from the one column noted below):

- **Admin UI language switcher** — the dashboard interface can be displayed in English or Russian, selectable from the header. The choice is saved to `localStorage`, falling back to the browser's language and then to English.
- **Full i18n coverage of the admin UI** — nearly all hardcoded strings across settings, records, collections, auth, API preview, and logs were extracted into locale dictionaries (`ui/src/locales/en.json`, `ui/src/locales/ru.json`) behind an `i18n.t()` / `i18n.plural()` helper (`ui/src/i18n.js`), so a new language can be added by dropping in one more JSON file.
- **Optional collection "label"** — collections gained a separate, editable `label` field (up to 200 chars) alongside the immutable `name`, so the admin UI can show a friendlier or localized display name for a collection without changing its API name. Ships with a DB migration, validation, and DB export support.
- **Reverted experiment:** an earlier iteration also added per-record content localization (a `Localized` flag on Text/Editor fields, app-wide base/supported locale settings, `?locale=` query resolution). It was rolled back after review — the real need was UI/label localization, not translating record content field-by-field.

## API SDK clients

The easiest way to interact with the PocketBase Web APIs is to use one of the official SDK clients:

- **JavaScript - [pocketbase/js-sdk](https://github.com/pocketbase/js-sdk)** (_Browser, Node.js, React Native_)
- **Dart - [pocketbase/dart-sdk](https://github.com/pocketbase/dart-sdk)** (_Web, Mobile, Desktop, CLI_)

You could also check the recommendations in https://pocketbase.io/docs/how-to-use/.


## Overview

### Use as standalone app

You could download the prebuilt executable for your platform from the [Releases page](https://github.com/pocketbase/pocketbase/releases).
Once downloaded, extract the archive and run `./pocketbase serve` in the extracted directory.

The prebuilt executables are based on the [`examples/base/main.go` file](https://github.com/pocketbase/pocketbase/blob/master/examples/base/main.go) and comes with the JS VM plugin enabled by default which allows to extend PocketBase with JavaScript (_for more details please refer to [Extend with JavaScript](https://pocketbase.io/docs/js-overview/)_).

### Use as a Go framework/toolkit

PocketBase is distributed as a regular Go library package which allows you to build
your own custom app specific business logic and still have a single portable executable at the end.

Here is a minimal example:

0. [Install Go 1.25+](https://go.dev/doc/install) (_if you haven't already_)

1. Create a new project directory with the following `main.go` file inside it:
    ```go
    package main

    import (
        "log"

        "github.com/pocketbase/pocketbase"
        "github.com/pocketbase/pocketbase/core"
    )

    func main() {
        app := pocketbase.New()

        app.OnServe().BindFunc(func(se *core.ServeEvent) error {
            // registers new "GET /hello" route
            se.Router.GET("/hello", func(re *core.RequestEvent) error {
                return re.String(200, "Hello world!")
            })

            return se.Next()
        })

        if err := app.Start(); err != nil {
            log.Fatal(err)
        }
    }
    ```

2. To init the dependencies, run `go mod init myapp && go mod tidy`.

3. To start the application, run `go run main.go serve`.

4. To build a statically linked executable, you can run `CGO_ENABLED=0 go build` and then start the created executable with `./myapp serve`.

_For more details please refer to [Extend with Go](https://pocketbase.io/docs/go-overview/)._

### Building and running the repo main.go example

To build the minimal standalone executable, like the prebuilt ones in the releases page, you can simply run `go build` inside the `examples/base` directory:

0. [Install Go 1.25+](https://go.dev/doc/install) (_if you haven't already_)
1. Clone/download the repo
2. Navigate to `examples/base`
3. Run `GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build`
   (_https://go.dev/doc/install/source#environment_)
4. Start the created executable by running `./base serve`.

Note that the supported build targets by the pure Go SQLite driver at the moment are:

```
darwin  amd64
darwin  arm64
freebsd amd64
freebsd arm64
linux   386
linux   amd64
linux   arm
linux   arm64
linux   loong64
linux   ppc64le
linux   riscv64
linux   s390x
windows 386
windows amd64
windows arm64
```

### Testing

PocketBase comes with mixed bag of unit and integration tests.
To run them, use the standard `go test` command:

```sh
go test ./...
```

Check also the [Testing guide](http://pocketbase.io/docs/testing) to learn how to write your own custom application tests.

## Security

If you discover a security vulnerability within PocketBase, please send an e-mail to **support at pocketbase.io**.

All reports will be promptly addressed and you'll be credited in the fix release notes.

## Contributing

PocketBase is free and open source project licensed under the [MIT License](LICENSE.md).
You are free to do whatever you want with it, even offering it as a paid service.

You could help continuing its development by:

- [Contribute to the source code](CONTRIBUTING.md)
- [Suggest new features and report issues](https://github.com/pocketbase/pocketbase/issues)

Please refrain creating PRs for _new features_ without previously discussing the implementation details.
PocketBase has a [roadmap](https://github.com/orgs/pocketbase/projects/2) and I try to work on issues in specific order and such PRs often come in out of nowhere and skew all initial planning with tedious back-and-forth communication.

Don't get upset if I close your PR, even if it is well executed and tested. This doesn't mean that it will never be merged.
Later we can always refer to it and/or take pieces of your implementation when the time comes to work on the issue (don't worry you'll be credited in the release notes).

> [!IMPORTANT]
> Due to recent LLM spam, PRs are temporary disabled and only existing collaborators can open a PR.
> If you stumble on a problem that you want to fix, please consider instead opening an issue or discussion with link to your fork _(if not obvious - LLM contributions are not welcome)_.
> This status may change in the future in case GitHub finally decide to do something about the constant spam, or when I find time to move the project somewhere else.

---

<a id="readme-ru"></a>
# Русская версия

<p align="center">
    <a href="https://pocketbase.io" target="_blank" rel="noopener">
        <img src="https://i.imgur.com/aCBbjKx.png" alt="PocketBase — open source backend в 1 файле" />
    </a>
</p>

[PocketBase](https://pocketbase.io) — это бэкенд с открытым исходным кодом на Go, включающий:

- встроенную БД (_SQLite_) с **realtime-подписками**
- встроенное **управление файлами и пользователями**
- удобный **UI админ-панели**
- простой **REST-подобный API**

**Документация и примеры: https://pocketbase.io/docs.**

> [!WARNING]
> PocketBase всё ещё находится в активной разработке, поэтому полная обратная совместимость не гарантируется до выхода v1.0.0.

## Чем этот форк отличается от оригинального PocketBase

Это форк [pocketbase/pocketbase](https://github.com/pocketbase/pocketbase), сфокусированный на **локализации админ-панели** (поведение сервера, API и модель данных не изменены, за исключением одного поля, описанного ниже):

- **Переключатель языка в админ-панели** — интерфейс дашборда можно отобразить на английском или русском, переключение доступно в шапке. Выбор сохраняется в `localStorage`, при отсутствии выбора используется язык браузера, а затем английский по умолчанию.
- **Полное покрытие i18n в админ-панели** — почти все захардкоженные строки в настройках, записях, коллекциях, авторизации, предпросмотре API и логах вынесены в словари локалей (`ui/src/locales/en.json`, `ui/src/locales/ru.json`) через хелпер `i18n.t()` / `i18n.plural()` (`ui/src/i18n.js`), поэтому новый язык можно добавить, просто подложив ещё один JSON-файл.
- **Опциональное поле "label" у коллекций** — у коллекций появилось отдельное редактируемое поле `label` (до 200 символов) в дополнение к неизменяемому `name`, чтобы админ-панель могла показывать более понятное или локализованное отображаемое имя коллекции, не трогая её имя в API. Добавлены миграция БД, валидация и поддержка экспорта БД.
- **Откаченный эксперимент:** ранее в этом форке также добавлялась локализация содержимого записей (флаг `Localized` у полей Text/Editor, настройки базовой/поддерживаемых локалей на уровне приложения, разрешение `?locale=` в запросах). Эта реализация была **откачена** после ревью — реальная потребность была в локализации UI и подписей, а не в постатейном переводе содержимого записей.

## SDK-клиенты для API

Проще всего работать с Web API PocketBase через один из официальных SDK:

- **JavaScript — [pocketbase/js-sdk](https://github.com/pocketbase/js-sdk)** (_браузер, Node.js, React Native_)
- **Dart — [pocketbase/dart-sdk](https://github.com/pocketbase/dart-sdk)** (_Web, Mobile, Desktop, CLI_)

Также см. рекомендации в https://pocketbase.io/docs/how-to-use/.

## Обзор

### Использование как готовое приложение

Скачайте собранный исполняемый файл для своей платформы со страницы [Releases](https://github.com/pocketbase/pocketbase/releases). После распаковки архива запустите `./pocketbase serve` в распакованной директории.

Готовые исполняемые файлы собраны из [`examples/base/main.go`](https://github.com/pocketbase/pocketbase/blob/master/examples/base/main.go) и по умолчанию включают плагин JS VM, позволяющий расширять PocketBase на JavaScript (_подробнее: [Extend with JavaScript](https://pocketbase.io/docs/js-overview/)_).

### Использование как Go-фреймворк/тулкит

PocketBase распространяется как обычный Go-пакет, что позволяет собрать собственную бизнес-логику и получить на выходе один портативный исполняемый файл.

Минимальный пример:

0. [Установите Go 1.25+](https://go.dev/doc/install) (_если ещё не установлен_)

1. Создайте новую директорию проекта с файлом `main.go`:
    ```go
    package main

    import (
        "log"

        "github.com/pocketbase/pocketbase"
        "github.com/pocketbase/pocketbase/core"
    )

    func main() {
        app := pocketbase.New()

        app.OnServe().BindFunc(func(se *core.ServeEvent) error {
            // регистрирует новый маршрут "GET /hello"
            se.Router.GET("/hello", func(re *core.RequestEvent) error {
                return re.String(200, "Hello world!")
            })

            return se.Next()
        })

        if err := app.Start(); err != nil {
            log.Fatal(err)
        }
    }
    ```

2. Для инициализации зависимостей выполните `go mod init myapp && go mod tidy`.

3. Для запуска приложения выполните `go run main.go serve`.

4. Для сборки статически слинкованного исполняемого файла выполните `CGO_ENABLED=0 go build`, а затем запустите `./myapp serve`.

_Подробнее: [Extend with Go](https://pocketbase.io/docs/go-overview/)._

### Сборка и запуск main.go из репозитория

Чтобы собрать минимальный standalone-executable, как готовые сборки на странице релизов, можно просто выполнить `go build` внутри директории `examples/base`:

0. [Установите Go 1.25+](https://go.dev/doc/install) (_если ещё не установлен_)
1. Склонируйте/скачайте репозиторий
2. Перейдите в `examples/base`
3. Выполните `GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build`
   (_https://go.dev/doc/install/source#environment_)
4. Запустите собранный исполняемый файл: `./base serve`.

Поддерживаемые платформы сборки для чистого Go-драйвера SQLite на данный момент:

```
darwin  amd64
darwin  arm64
freebsd amd64
freebsd arm64
linux   386
linux   amd64
linux   arm
linux   arm64
linux   loong64
linux   ppc64le
linux   riscv64
linux   s390x
windows 386
windows amd64
windows arm64
```

### Тестирование

PocketBase поставляется со смешанным набором unit- и интеграционных тестов. Для запуска используйте стандартную команду `go test`:

```sh
go test ./...
```

См. также [руководство по тестированию](http://pocketbase.io/docs/testing), чтобы узнать, как писать собственные тесты приложения.

## Безопасность

Если вы обнаружили уязвимость в PocketBase, напишите на **support at pocketbase.io**.

Все обращения будут рассмотрены, а вы будете упомянуты в release notes с исправлением.

## Участие в разработке

PocketBase — свободный проект с открытым исходным кодом под лицензией [MIT](LICENSE.md). Вы можете делать с ним что угодно, включая предложение его в качестве платного сервиса.

Вы можете помочь развитию проекта:

- [Внести вклад в исходный код](CONTRIBUTING.md)
- [Предложить новые функции и сообщить о проблемах](https://github.com/pocketbase/pocketbase/issues)

Пожалуйста, воздержитесь от создания PR с _новыми функциями_ без предварительного обсуждения деталей реализации.
У PocketBase есть [roadmap](https://github.com/orgs/pocketbase/projects/2), и автор старается работать над задачами в определённом порядке — такие PR часто приходят неожиданно и сбивают изначальное планирование лишней перепиской.

Не расстраивайтесь, если ваш PR закроют, даже если он хорошо реализован и протестирован. Это не значит, что он никогда не будет смёржен.
Позже на него всегда можно сослаться и/или взять часть реализации, когда придёт время работать над этой задачей (не переживайте, вас укажут в release notes).

> [!IMPORTANT]
> Из-за недавнего спама от LLM, приём PR временно отключён — открывать PR могут только существующие коллабораторы.
> Если вы столкнулись с проблемой, которую хотите исправить, пожалуйста, откройте issue или discussion со ссылкой на свой форк _(если не очевидно — вклад от LLM не приветствуется)_.
> Этот статус может измениться в будущем, если GitHub наконец что-то сделает с постоянным спамом, или когда у автора найдётся время перенести проект в другое место.
