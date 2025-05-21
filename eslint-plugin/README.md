# Creedengo-JS

An ESLint plugin which provides JavaScript and TypeScript rules of the Creedengo project.

👉 See [creedengo-javascript README](../README.md) to have more information.

## 🚀 Getting started

### Installation

You'll need to install [ESLint](https://eslint.org/) (v7+) and this plugin:

```sh
# yarn
yarn add -D eslint @creedengo/eslint-plugin
# npm
npm install -D eslint @creedengo/eslint-plugin
```

> You are using TypeScript? You will also need to install [typescript-eslint](https://typescript-eslint.io/) to enable
> our rules.\
> Follow [this official guide](https://typescript-eslint.io/getting-started) to install it in a few steps.

#### Are you working with a GitHub Packages registry?

The plugin is also available from GitHub npm registry under "green-code-initiative" scope:

```sh
# yarn
yarn add -D eslint @green-code-initiative/creedengo-eslint-plugin
# npm
npm install -D eslint @green-code-initiative/creedengo-eslint-plugin
```

### Enable plugin with recommended configuration

#### ESLint Flat Configuration (`eslint.config.js`)

Add `@creedengo` **"flat/recommended"** configuration to your `eslint.config.js`:

```js
import creedengo from "@creedengo/eslint-plugin";

export default [
  /* other eslint configurations */
  creedengo.configs["flat/recommended"],
];
```

#### ESLint deprecated legacy configuration (`.eslintrc`)

For legacy ESLint versions using the deprecated `.eslintrc` file, add the `@creedengo` **"recommended"** configuration to the `extends` array :

```json
{
  "extends": ["plugin:@creedengo/recommended"]
}
```

### Enable specific rules

#### ESLint Flat configuration (`eslint.config.js`)

Add the `creedengo` plugin configuration to your `eslint.config.js` and select the rules to activate:

```js
import creedengo from "@creedengo/eslint-plugin";

export default [
  /* other eslint configurations */
  {
    plugins: { "@creedengo": creedengo },
    rules: {
      "@creedengo/no-multiple-access-dom-element": "error",
    },
  },
];
```

#### ESLint deprecated legacy configuration (`.eslintrc`)

If your project uses a legacy ESLint version, it may use as well the now deprecated `.eslintrc` file. In such case, add `@creedengo` to the `plugins` array, potentially followed by rules specific configurations:

```jsonc
{
  "plugins": ["@creedengo"],
  "rules": {
    "@creedengo/no-multiple-access-dom-element": "error",
  },
}
```

## ⚙ Configs

<!-- begin auto-generated configs list -->

|    | Name               |
| :- | :----------------- |
| ✅  | `flat/recommended` |
| ✅  | `recommended`      |

<!-- end auto-generated configs list -->

## 🔨 Rules

<!-- begin auto-generated rules list -->

⚠️ Configurations set to warn in.\
✅ Set in the `flat/recommended` configuration.\
✅ Set in the `recommended` configuration.

| Name                                                                                           | Description                                                                                                               | ⚠️  |
| :--------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ | :-- |
| [avoid-autoplay](docs/rules/avoid-autoplay.md)                                                 | Avoid autoplay for videos and audio content                                                                               | ✅ |
| [avoid-brightness-override](docs/rules/avoid-brightness-override.md)                           | Should avoid to override brightness                                                                                       | ✅ |
| [avoid-css-animations](docs/rules/avoid-css-animations.md)                                     | Avoid usage of CSS animations                                                                                             | ✅ |
| [avoid-getting-size-collection-in-loop](docs/rules/avoid-getting-size-collection-in-loop.md)   | Avoid getting the size/length of the collection in loops and callbacks. Assign it to a variable before the loop/callback. | ✅ |
| [avoid-high-accuracy-geolocation](docs/rules/avoid-high-accuracy-geolocation.md)               | Avoid using high accuracy geolocation in web applications                                                                 | ✅ |
| [avoid-keep-awake](docs/rules/avoid-keep-awake.md)                                             | Avoid screen keep awake                                                                                                   | ✅ |
| [limit-db-query-results](docs/rules/limit-db-query-results.md)                                 | Should limit the number of returns for a SQL query                                                                        | ✅ |
| [no-empty-image-src-attribute](docs/rules/no-empty-image-src-attribute.md)                     | Disallow usage of image with empty source attribute                                                                       | ✅ |
| [no-import-all-from-library](docs/rules/no-import-all-from-library.md)                         | Should not import all from library                                                                                        | ✅ |
| [no-multiple-access-dom-element](docs/rules/no-multiple-access-dom-element.md)                 | Disallow multiple access of same DOM element                                                                              | ✅ |
| [no-multiple-style-changes](docs/rules/no-multiple-style-changes.md)                           | Disallow multiple style changes at once                                                                                   | ✅ |
| [no-torch](docs/rules/no-torch.md)                                                             | Should not programmatically enable torch mode                                                                             | ✅ |
| [prefer-collections-with-pagination](docs/rules/prefer-collections-with-pagination.md)         | Prefer API collections with pagination                                                                                    | ✅ |
| [prefer-lighter-formats-for-image-files](docs/rules/prefer-lighter-formats-for-image-files.md) | Prefer lighter formats for image files                                                                                    | ✅ |
| [prefer-shorthand-css-notations](docs/rules/prefer-shorthand-css-notations.md)                 | Encourage usage of shorthand CSS notations                                                                                | ✅ |
| [provide-print-css](docs/rules/provide-print-css.md)                                           | Enforce providing a print stylesheet                                                                                      | ✅ |

<!-- end auto-generated rules list -->

## 🛒 Distribution

You can follow changelog on [GitHub Releases page](https://github.com/green-code-initiative/creedengo-javascript/releases).
