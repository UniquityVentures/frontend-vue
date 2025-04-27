<template> 
	<v-chip :to=" {name: 'Calendar', query: {'date': date}}" :color="color" v-if="isValidDate(date)">
		{{label ? `${label}: ` : ''}}{{displayDate(date)}}
	</v-chip>
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

const isValidDate = (date) => {
	const d = new Date(date);
	return d instanceof Date && !isNaN(d);
};

const displayDate = (date) => {
	if (!isValidDate(date)) return "Invalid date";
	return formatter.format(new Date(date));
};
</script>
