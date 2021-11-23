# parcel-reporter-exec

Execute a command after a successful Parcel build. This is useful when you want to e.g. automatically start your application when `parcel watch` successfully built your application.

## Installation

Install the plugin via yarn.
```shell
yarn add --dev parcel-reporter-exec
```

Alternatively, install it with npm.
```shell
npm install --save-dev parcel-reporter-exec
```

## Usage

Create a `.parcelrc` file in your project root.
```shell
touch .parcelrc
```

Paste the following content.
```json5
{
  "extends": "@parcel/config-default",
  "reporters": ["...", "parcel-reporter-exec"]
}
```

Update your `package.json`.
```json5
{
  // ...
  "scripts": {
    "dev": "PARCEL_EXEC=\"yarn start\" parcel watch --no-hmr",
    "start": "node dist/index.js"
  }
  // ...
}
```
