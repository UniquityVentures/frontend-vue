// src/plugins/vuetify.js

// Import global styles and icon font
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Import Vuetify core, standard components, and directives
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as labs from "vuetify/labs/components";

const vuetify = createVuetify({
	components: {
		...components,
		...labs,
	},
	directives,
	theme: {
		defaultTheme: "light",
		themes: {
			light: {
				colors: {
					primary: "#6A1B9A", // Deep Purple
					secondary: "#7B1FA2", // Purple
					accent: "#D500F9", // Neon Purple
					background: "#FAFAFA", // Very Light Gray
					surface: "#FFFFFF", // Pure White
					error: "#E53935", // Red
					info: "#1E88E5", // Blue
					success: "#43A047", // Green
					warning: "#FB8C00", // Orange
				},
			},
		},
	},
	defaults: {
		VBtn: {
			variant: 'tonal',
		},
		VChip: {
			variant: 'outlined',
			color: 'grey-darken-1',
			size: 'small',
			label: true,
		},
		VTextField: { density: 'default' },
		VSelect: { density: 'default' },
		VCombobox: { density: 'default' },
		VAutocomplete: { density: 'default' },
		VCheckbox: { density: 'default' },
		VRadio: { density: 'default' },
		VSwitch: { density: 'default' },
		VTextarea: { density: 'default' },
		VFileInput: { density: 'default' },
		VOtpInput: { density: 'default' },
		VSlider: { density: 'default' },
		VRangeSlider: { density: 'default' },
		VRating: { density: 'default' },
		VColorPicker: { density: 'default' },
		VDatePicker: { density: 'default' },
		VTimePicker: { density: 'default' },
		VList: { density: 'default' },
		VListItem: { density: 'default' },
	}
});

export default vuetify;
