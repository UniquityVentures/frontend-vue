<template>
	<FormCard
		:title="title"
		actionName="Add"
		:formFields="model"
		:action="handleCreateAttachment"
		class="border mb-4"
		variant="flat"
	/>
</template>

<script setup>
import { createAttachment } from "@/apps/attachments/api";
import FormCard from "@/components/FormCard.vue";
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

const model = ref([
	{
		label: "Name",
		key: "name",
		type: "string",
		value: "",
	},
	{
		label: "File",
		key: "file",
		type: "file",
		required: props.required,
		value: null,
	},
]);
</script>
