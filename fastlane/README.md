fastlane documentation
----

# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```sh
xcode-select --install
```

For _fastlane_ installation instructions, see [Installing _fastlane_](https://docs.fastlane.tools/#installing-fastlane)

# Available Actions

## Android

### android build

```sh
[bundle exec] fastlane android build
```



### android bundle

```sh
[bundle exec] fastlane android bundle
```



### android upload_firebase

```sh
[bundle exec] fastlane android upload_firebase
```

upload to firebase distribute

### android prod

```sh
[bundle exec] fastlane android prod
```

Build and upload to App Center.

### android dev

```sh
[bundle exec] fastlane android dev
```

Build and upload to App Center.

### android upload_appcenter

```sh
[bundle exec] fastlane android upload_appcenter
```

upload to appcenter

### android upload_internal

```sh
[bundle exec] fastlane android upload_internal
```

Build and upload to Google Play for Internal Testing.

### android codepush

```sh
[bundle exec] fastlane android codepush
```

Build and upload to App Center.

### android codepush_production

```sh
[bundle exec] fastlane android codepush_production
```

Build and upload to App Center.

### android codepush_testing_production

```sh
[bundle exec] fastlane android codepush_testing_production
```

Build and upload to App Center.

----

This README.md is auto-generated and will be re-generated every time [_fastlane_](https://fastlane.tools) is run.

More information about _fastlane_ can be found on [fastlane.tools](https://fastlane.tools).

The documentation of _fastlane_ can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
