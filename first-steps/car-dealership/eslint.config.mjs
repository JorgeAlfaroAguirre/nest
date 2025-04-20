// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      // Warns when the 'any' type is used explicitly — helps enforce stronger typing
      '@typescript-eslint/no-explicit-any': 'warn',

      // Warns when Promises are used without being awaited or properly handled (e.g., with .catch)
      '@typescript-eslint/no-floating-promises': 'warn',

      // Warns when a value of unknown or unsafe type is passed as an argument — improves type safety
      '@typescript-eslint/no-unsafe-argument': 'warn',

      // Warns when a function is declared without explicitly specifying a return type
      '@typescript-eslint/explicit-function-return-type': 'warn',

      // Warns when declared variables are not used anywhere in the code
      '@typescript-eslint/no-unused-vars': 'warn',

      // Warns when Promises are used incorrectly, such as in conditional expressions or without proper await
      '@typescript-eslint/no-misused-promises': 'warn',

      // Warns when you don’t use `import type` for importing only types — improves clarity and avoids potential issues in compilation
      '@typescript-eslint/consistent-type-imports': 'warn',

      // Warns when using TypeScript directive comments like `@ts-ignore` or `@ts-expect-error`
      // Helps prevent hiding type errors without good reason
      '@typescript-eslint/ban-ts-comment': 'warn',
    },
  },
);
