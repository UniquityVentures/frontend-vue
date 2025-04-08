<template> 
	<v-chip :color="color">{{label}}: {{displayDateTime(date)}}</v-chip>
</template>

<script setup>
const props = defineProps({
	label: {
		type: String,
		default: "",
	},
	color: {
		type: String,
		default: "blue",
	},
	date: {
		required: true,
	},
});

const formatter = Intl.DateTimeFormat("en-US", {
	year: "numeric",
	month: "short",
	day: "numeric",
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
});

const displayDateTime = (date) => formatter.format(new Date(date));
</script>
