<template>
	<v-container>
		<FormCard
			title=""
			actionName=""
			:model="model"
			variant="flat"
		/>
	</v-container>
</template>

<script setup>
import FormCard from "@/components/FormCard.vue";
import { ref } from "vue";

const model = ref([
	{
		label: "Attachment",
		key: "is_active",
		type: "attachment",
	},
]);
</script>

