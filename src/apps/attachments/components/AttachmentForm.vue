<template>
	<v-file-input v-model="attachment" :label="title" :required="required" show-size counter
		:rules="[v => !required || !!v || `${title} is required`]"></v-file-input>
</template>

<script setup>
// This component takes a file, uploads it to the server and
// emits the attachment object.

import { createAttachment } from "@/apps/attachments/api";
import { ref } from "vue";

const props = defineProps({
	title: {
		type: String,
		default: "Attachment",
	},
	required: {
		type: Boolean,
	},
});

const attachment = ref(null);
const emit = defineEmits(["update:attachment"]);

async function handleCreateAttachment(data) {
	attachment.value = await createAttachment(data);
	emit("update:attachment", attachment?.value);
	attachment.value = null; // Reset the attachment after emitting
}
</script>
