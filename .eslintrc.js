module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/essential', '@vue/prettier'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: [1, 'never'],
    quotes: [1, 'single'],
    'no-unused-vars': [1, { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'vue/no-unused-vars': 1,
	},
	parserOptions: {
		parser: '@typescript-eslint/parser'
	}
};
