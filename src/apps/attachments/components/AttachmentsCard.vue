<template>
	<v-card variant='flat' class="border">
			<v-list>
				<AttachmentListItem v-for="attachment in attachments" :key="attachment.id" :attachment="attachment" />
			</v-list>
	</v-card>
</template>

<script setup>
import AttachmentListItem from "./AttachmentListItem.vue";
const attachments = defineModel();
</script>
