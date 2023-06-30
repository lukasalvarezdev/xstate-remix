/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
	cacheDirectory: './node_modules/.cache/remix',
	ignoredRouteFiles: ['**/.*', '**/*.css', '**/*.test.{js,jsx,ts,tsx}'],
	serverModuleFormat: 'cjs',
	tailwind: true,
	future: { unstable_dev: true },
};
