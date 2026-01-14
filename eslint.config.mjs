// @ts-check

import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig(
    eslint.configs.recommended,
    tseslint.configs.recommended,
    {
        rules: {
            "no-undef": "off", // Полностью отключает правило
            // или
            "no-console": "off", // Если у вас также есть правило no-console
        },
    }
);