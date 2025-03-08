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
			variant: 'outlined',
		},
		VChip: {
			variant: 'outlined',
			color: 'grey-darken-1',
			size: 'small',
			label: true,
		},
		VTextField: { density: 'comfortable' },
		VSelect: { density: 'comfortable' },
		VCombobox: { density: 'comfortable' },
		VAutocomplete: { density: 'comfortable' },
		VCheckbox: { density: 'comfortable' },
		VRadio: { density: 'comfortable' },
		VSwitch: { density: 'comfortable' },
		VTextarea: { density: 'comfortable' },
		VFileInput: { density: 'comfortable' },
		VOtpInput: { density: 'comfortable' },
		VSlider: { density: 'comfortable' },
		VRangeSlider: { density: 'comfortable' },
		VRating: { density: 'comfortable' },
		VColorPicker: { density: 'comfortable' },
		VDatePicker: { density: 'comfortable' },
		VTimePicker: { density: 'comfortable' },
		VList: { density: 'comfortable' },
		VListItem: { density: 'comfortable' },
	}
});

export default vuetify;
