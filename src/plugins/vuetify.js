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
		defaultTheme: "dark",
		themes: {
			light: {
				colors: {
					primary: "#9C27B0", // Purple currently
					secondary: "#E1E1E1", // Medium-dark white
					tertiary: "#F6F6F6", // Light-medium white
					quaternary: "#F9F9F9", // Lightest white (almost pure white)
					accent: "#9C27B0", // Purple currently
					background: "#F3F3F3", // Very Light Gray
					surface: "#FFFFFF", // Pure White
					error: "#E53935", // Red
					info: "#1E88E5", // Blue
					success: "#43A047", // Green
					warning: "#FB8C00", // Orange
				},
			},
			dark: {
				colors: {
					primary: "#8E24AA", 
					secondary: "#1A1A1A", 
					tertiary: "#212121", 
					quaternary: "#2D2D2D", 
					accent: "#CE93D8", 
					background: "#222222", 
					surface: "#313131", 
					error: "#FF5252", // Brighter red for dark theme
					info: "#64B5F6", // Brighter blue for dark theme
					success: "#81C784", // Brighter green for dark theme
					warning: "#FFB74D", 
				},
			},
		},
	},
	defaults: {
		VChip: {
			variant: "outlined",
			color: "grey-darken-1",
			size: "small",
			label: true,
		},
		VTextField: { density: "compact", variant: "outlined" },
		VNumberInput: {
			density: "compact",
			variant: "outlined",
			controlVariant: "hidden",
		},
		VSelect: { density: "compact", variant: "outlined" },
		VCombobox: { density: "compact", variant: "outlined" },
		VAutocomplete: { density: "compact", variant: "outlined" },
		VCheckbox: {
			density: "compact",
			color: "primary",
			hideDetails: true,
		},
		VRadio: { density: "compact", variant: "outlined" },
		VSwitch: { density: "compact", variant: "outlined" },
		VTextarea: { density: "compact", variant: "outlined" },
		VFileInput: { density: "compact", variant: "outlined" },
		VOtpInput: { density: "compact", variant: "outlined" },
		VSlider: { density: "compact", variant: "outlined" },
		VRangeSlider: { density: "compact", variant: "outlined" },
		VRating: { density: "compact", variant: "outlined" },
		VColorPicker: { density: "compact", variant: "outlined" },
		VDateInput: { density: "compact", variant: "outlined", prependIcon: "" },
		VTimePicker: { density: "compact", variant: "outlined" },
		VList: { density: "default" },
		VListItem: { density: "default" },
		VRow: { dense: true },
		VCol: { dense: true },
		VBtn: { variant: "tonal" },
	},
});

export default vuetify;
