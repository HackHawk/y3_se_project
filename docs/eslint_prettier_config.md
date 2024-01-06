# Steps to configure ESLint and Prettier for this project

Since most of the configuration files are shared with the repo, there isn't much you have to do to configure ESLint and Prettier. Here is a list of the config files for reference:

- `package.json` - for defining custom scripts
- `.eslintrc.json` - eslint's config file
- `.prettierrc.json` - prettier's config file

You are going to follow the steps for **_BOTH_** `./src/admin` and `./src/client`.
**Here are the steps:**

1. Install the following extensions for VSCode.
   - Install 'ESLint'
   - Install 'Prettier - Code formatter'
2. Run `npm install` in `./src/admin` and `./src/client` to install the node dependencies for Prettier and ESLint.

   - This works because the `package.json` is shared through the GitHub repo.
   - Alternatively, you can use the following command to install instead.
     - `npm i -D eslint prettier eslint-config-airbnb eslint-plugin-prettier eslint-config-next eslint-config-prettier eslint-plugin-import prettier-plugin-tailwindcss`

3. Go to your VSCode settings, then type "code actions" in the search bar then choose the option that says "Code actions on save" then press "Edit in `settings.json`". Set the following properties as follows:

```json
    "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll": true
    },
    "eslint.validate": ["javascript", "typescript"],
    "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[jsx-tags]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
```

**_Continue if you're starting from scratch - you aren't if you have cloned this repo from GitHub:_**

4. Go to your `package.json` file and replace the `scripts` property as follows:

```json
"scripts": {
   "dev": "next dev",
   "build": "next build",
   "start": "next start",
   "lint": "eslint ./",
   "lint-fix": "eslint ./ --fix",
   "format": "prettier --check --ignore-path .gitignore .",
   "format-fix": "prettier --write --list-different . --ignore-path .gitignore ."
 }
```

5. Create a `.prettierrc.json` file and paste the following contents:

```json
{
  "trailingComma": "es5",
  "semi": true,
  "tabWidth": 2,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

6. Create an `.eslintrc.json` file and paste the following contents:

```json
{
  "extends": [
    "airbnb",
    "prettier",
    "next",
    "next/core-web-vitals",
    "plugin:import/recommended"
  ],
  "plugins": ["prettier"],
  "rules": {
    "prettier/prettier": "error",
    "no-unused-vars": "warn",
    "no-console": "off",
    "func-names": "off",
    "no-process-exit": "off",
    "object-shorthand": "off",
    "class-methods-use-this": "off"
  }
}
```

# Describing ESLint and Prettier

- A formatter is a tool that reads in your source code, ignores your formatting, and rewrites it.

- A Linter is a tool that runs a set of checks on your source code. Each of those checks is called a "rule". It checks the relationships between files and specific lines in it as well as between different files and different rules.

ESLint is a linter that can do some formatting.
Prettier is a very very fast formatter.

Here is a table that summarizes their differences:

| Formatters             | Linters                       |
| ---------------------- | ----------------------------- |
| Reformats in one pass  | Runs a set of discrete rules  |
| Faster                 | Slower                        |
| Can't find or fix bugs | Explicit logic for edge cases |

To prevent formatting conflicts between the two, install the plugin `eslint-config-prettier` to turn off all ESLint stuff that conflicts with Prettier. You use Prettier first to format your code then use ESLint to lint your JS - it is faster this way.

> ##### Tip
>
> If you can't understand the error:
>
> 1. check the rules that caused the error and copy them
> 2. go the the eslint (eslint.org) website and paste them into the search bar
> 3. the website will tell you all about the rule and show you some examples.

# Further reading

- Decomposing the command: `npm i -D eslint prettier eslint-plugin-prettier eslint-config-next eslint-config-prettier prettier-plugin-tailwindcss`

  - `-D`: installs as a dev depencency
  - `eslint prettier`: installs eslint and prettier
  - `eslint-plugin-prettier`: runs Prettier as an ESLint rule and reports differences as individual ESLint issues.
  - `eslint-config-next`: configures ESLint with preconfigured NextJS rules
  - `eslint-config-prettier`: turns off all rules that are unnecessary or might conflict with Prettier.
  - `prettier-plugin-tailwindcss`: a Prettier v3+ plugin for Tailwind CSS v3.0+ that automatically sorts classes based on our recommended class order.
  - `eslint-plugin-import`: This plugin intends to support linting of ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names.

- Go visit the package pages on https://www.npmjs.com/ for more info on the plugins.

## References

- https://www.youtube.com/watch?v=S76clGeK1uA
- https://www.youtube.com/watch?v=Cd-gBxzcsdA
- https://www.youtube.com/watch?v=sSJBeWPIipQ&t=0s
- https://paulintrognon.fr/blog/typescript-prettier-eslint-next-js - Incredibly helpful
- https://medium.com/@cameronadams1225/setting-up-a-next-js-13-project-with-eslint-and-prettier-735c3ccfd26c
- https://medium.com/@Pavan_/nextjs-set-up-with-typescript-eslint-and-prettier-26eddd964adf
