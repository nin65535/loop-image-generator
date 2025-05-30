import js from '@eslint/js'
import tseslint from '@typescript-eslint/eslint-plugin'
import tsparser from '@typescript-eslint/parser'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-config-prettier'
import globals from 'globals'

export default [
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
                project: './tsconfig.json'
            },
            globals: {
                ...globals.browser
            }
        },
        plugins: {
            '@typescript-eslint': tseslint,
            react,
            'react-hooks': reactHooks,
            'jsx-a11y': jsxA11y,
            import: importPlugin,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...tseslint.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...reactHooks.configs.recommended.rules,
            ...jsxA11y.configs.recommended.rules,
            'import/no-unresolved': 'error',
            'react/react-in-jsx-scope': 'off', // React 17+ では不要,
            'react/prop-types': 'off',
            'jsx-a11y/click-events-have-key-events': 'off',
            'jsx-a11y/no-static-element-interactions': 'off',
            'jsx-a11y/interactive-supports-focus': 'off',
            '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
        },
        settings: {
            react: {
                version: 'detect', // React のバージョンを自動検出
            },
            'import/resolver': {
                typescript: {
                    project: './tsconfig.json'
                }
            }
        },

    },
    prettier
]
export const ignores = [
    "node_modules",
    "dist"
]