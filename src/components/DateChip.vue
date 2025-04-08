<template> 
	<v-chip :color="color">{{label ? `${label}: ` : ''}}{{displayDate(date)}}</v-chip>
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
	date: { required: true },
});

const formatter = Intl.DateTimeFormat("en-US", {
	year: "numeric",
	month: "short",
	day: "numeric",
});

const displayDate = (date) => formatter.format(new Date(date));
</script>
