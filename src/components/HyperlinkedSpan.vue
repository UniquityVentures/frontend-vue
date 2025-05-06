<template>
	<p v-html="linkified"></p>
</template>

<script setup>
import { computed } from "vue";
import sanitizeHtml from "sanitize-html";
const props = defineProps({
	content: {
		type: String,
		required: true,
	},
});

const linkified = computed(() =>
	sanitizeHtml(props.content)
		.split(" ")
		.map((v) => {
			try {
				const url = new URL(v);
				return `<a href="${url}" target="_blank"> ${url}</a>`;
			} catch {
				return v;
			}
		})
		.join(" "),
);
</script>
