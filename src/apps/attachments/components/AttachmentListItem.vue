<template>
	<v-list-item
		:to="{ name: 'Attachment', params: { attachmentId: attachment } }"
		class="rounded px-3"
	>
		<template #prepend>
			<v-icon color="primary">mdi-file</v-icon>
		</template>

		<v-list-item-title class="text-body-2">
			{{ attachmentData?.name || "Loading..." }}
		</v-list-item-title>

		<template #append>
			<v-icon small>mdi-chevron-right</v-icon>
		</template>
	</v-list-item>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getAttachment } from "../api";

const props = defineProps({
	attachment: {
		type: [Number, String],
		required: true,
	},
});

const attachmentData = ref();

onMounted(async () => {
	attachmentData.value = await getAttachment(props.attachment);
});
</script>

