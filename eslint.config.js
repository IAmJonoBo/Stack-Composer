// Minimal ESLint flat config for v9+ using ESM
import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';

export default [
  // Top-level ignore for all non-source/generated files
  {
    ignores: [
      'book/**',
      'docs/book/**',
      'node_modules/**',
      'dist/**',
      'target/**',
      '.git/**',
      '.husky/**',
      '.vscode/**',
      '.idea/**',
      '.trunk/**',
      '**/*.min.js',
      // Ignore config and build output
      'stack-ui/shadcn.config.js',
      'vite.config.*',
      'stack-ui/vite.config.*',
      'eslint.config.js',
      'package-lock.json',
      'pnpm-lock.yaml',
      'yarn.lock',
    ],
  },
  js.configs.recommended,
  // Only lint source files in src/ and stack-ui/src/
  {
    files: ['src/**/*.{js,ts,tsx}', 'stack-ui/src/**/*.{js,ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json', './stack-ui/tsconfig.json'],
      },
      globals: {
        document: 'readonly',
        window: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react,
    },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      // Add your custom rules here
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  // Node config files (CommonJS, not TypeScript)
  {
    files: [
      'tailwind.config.js',
      'stack-ui/tailwind.config.js',
      'vite.config.js',
      'vite.config.ts',
      'stack-ui/vite.config.js',
      'stack-ui/vite.config.ts',
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'script',
      globals: { module: 'readonly', require: 'readonly' },
    },
    rules: {},
  },
];
