module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  plugins: ["@typescript-eslint", "jest", "prettier"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "plugin:jest/recommended",
    // This must be always last
    "plugin:prettier/recommended",
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts"],
    },
    "import/resolver": {
      typescript: {},
    },
  },
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  rules: {
    "prettier/prettier": "error",
    "no-template-curly-in-string": "warn",
    "prefer-template": "error",
    "@typescript-eslint/naming-convention": [
      "error",
      { selector: "variableLike", format: ["camelCase"] },
      { selector: "typeLike", format: ["PascalCase"] },
      {
        selector: "parameter",
        format: ["camelCase"],
        leadingUnderscore: "allow",
      },
      {
        selector: "variable",
        format: ["camelCase", "UPPER_CASE", "PascalCase"],
      },
    ],
    "dot-notation": "error",
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/no-var-requires": 0,
  },
  overrides: [
    {
      files: ["*.ts"],
      rules: {
        "@typescript-eslint/explicit-module-boundary-types": ["warn"],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unnecessary-type-assertion": "warn",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/no-unsafe-argument": "warn",
        "@typescript-eslint/no-unsafe-member-access": "warn",
        "@typescript-eslint/no-unsafe-return": "warn",
      },
    },
    {
      files: ["*.test.ts", "*.mock.ts"],
      rules: {
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unsafe-assignment": "off",
        "@typescript-eslint/no-unnecessary-type-assertion": "warn",
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/no-unsafe-argument": "warn",
        "@typescript-eslint/no-unsafe-member-access": "warn",
      },
    },
  ],
  ignorePatterns: ["*.js"],
};
