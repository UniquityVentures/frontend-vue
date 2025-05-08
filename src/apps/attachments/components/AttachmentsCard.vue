<template>
	<v-card>
		<v-card-title>
			Attachments
		</v-card-title>
		<v-card-text>
			<v-list>
				<AttachmentListItem v-for="attachment in attachments" :key="attachment.id" :attachment="attachment" />
			</v-list>
		</v-card-text>
	</v-card>
</template>

<script setup>
import AttachmentListItem from "./AttachmentListItem.vue";
const attachments = defineModel();
</script>
