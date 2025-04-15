// eslint.config.js

import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import cypressPlugin from "eslint-plugin-cypress";

export default [
	{
		files: ["**/*.cy.ts"],
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
				project: "./tsconfig.json"
			},
			globals: {
				cy: "readonly",
				Cypress: "readonly",
				expect: "readonly",
				assert: "readonly",
				describe: "readonly",
				it: "readonly",
				before: "readonly",
				after: "readonly",
				beforeEach: "readonly",
				afterEach: "readonly"
			}
		},
		plugins: {
			"@typescript-eslint": tsPlugin,
			"cypress": cypressPlugin
		},
		rules: {
			"no-unused-expressions": "off",
			"cypress/no-unnecessary-waiting": "warn",
			"@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }]
		},
		linterOptions: {
			reportUnusedDisableDirectives: true
		}
	}
];
