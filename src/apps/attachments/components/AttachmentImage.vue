<template>
	<v-img :src="url" />
</template>

<script setup>
import { getAttachment } from "../api";
import { watch, ref } from "vue";
const props = defineProps({
	id: {
		type: [Number, String],
		required: true,
	},
});

const url = ref();
watch(props, async () => {
	if (props.id) {
		url.value = (await getAttachment(props.id))?.file;
	}
}, {deep: true, immediate: true});
</script>
