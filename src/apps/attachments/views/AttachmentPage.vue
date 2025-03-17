<template>
	<v-container>
		<v-row>
			<v-col>
				<v-row class="ma-2 flex justify-center">
					<v-col lg="8">
						<v-card variant="flat">
							<v-img :src="attachment?.file" max-width="512" max-height="512"></v-img>
							<v-card-title>{{ attachment?.name }}</v-card-title>
							<v-card-text>{{ attachment?.file }}</v-card-text>
							<DeleteButton :action="() => deleteAttachment(attachment?.id)" :name="'attachment ' + attachment?.name" />
						</v-card>
					</v-col>
					<v-col lg="4">
						<v-card variant="flat">
							<v-card-text>
								<v-card-title>Additional Info:</v-card-title>
								<v-card-text>{{attachment?.additional_info}}</v-card-text>
							</v-card-text>
						</v-card>
						<v-card variant="flat">
							<v-card-text>
								<v-card-title>Dates:</v-card-title>
								<v-chip color="primary">Release: {{ formatDateTime(attachment.created_at) }}</v-chip>
								<v-chip color="red">Expiry: {{ formatDateTime(attachment.updated_at) }}</v-chip>
							</v-card-text>
						</v-card>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getAttachment } from "../api";
import { formatDateTime } from "@/services/utils";
import { deleteAttachment } from "@/apps/attachments/api";
import DeleteButton from "@/components/DeleteButton.vue";
const attachment = ref({});

const props = defineProps({
	attachmentId: Number,
});

onMounted(async () => {
	attachment.value = await getAttachment(props.attachmentId);
});
</script>
