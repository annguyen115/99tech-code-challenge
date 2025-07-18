const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
	addWebpackAlias({
		['@']: path.resolve(__dirname, 'src'),
		['@utils']: path.resolve(__dirname, 'src/utils'),
		['@api']: path.resolve(__dirname, 'src/api'),
		['@auth']: path.resolve(__dirname, 'src/auth'),
		['@config']: path.resolve(__dirname, 'src/config'),
		['@page']: path.resolve(__dirname, 'src/page'),
		['@appTypes']: path.resolve(__dirname, 'src/types'),
	})
);