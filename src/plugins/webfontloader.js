/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts() {
	const webFontLoader = await import(
		/* webpackChunkName: "webfontloader" */ "webfontloader"
	);

	webFontLoader.load({
		google: {
			families: [
				"Roboto Flex:wght@100..900,GRAD@-200..150,XTRA@323..603,YOPQ@25..135&display=swap",
			],
		},
	});
}
