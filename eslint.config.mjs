import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    linterOptions: {
      reportUnusedInlineConfigs: "error"
    },
    rules: {
      indent: "off",
      "indent-legacy": "error, 2",

      eqeqeq: "off",
      "no-unused-vars": "error",
      "prefer-const": ["error", { "ignoreReadBeforeAssign": true }],

      semi: ["error", "always"],
      '@typescript-eslint/no-empty-interface': "off",

    },
  }
];
