// eslint.config.js
import antfu from "@antfu/eslint-config";

export default antfu({
  rules: {
    // your overrides
    "no-console": "off",
    "vue/html-indent": "off",
    "vue/first-attribute-linebreak": "off",
    "vue/html-closing-bracket-newline": "off",
    "react/no-unknown-property": "off",
    "antfu/top-level-function": "off",
    "max-statements-per-line": "off",
    curly: "off",
    "@typescript-eslint/no-namespace": "off",
  },
});
