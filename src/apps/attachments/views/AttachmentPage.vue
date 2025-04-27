<template>
	<v-container>
		<v-row v-if="attachment">
			<v-col>
				<v-row class="ma-2 flex justify-center">
					<v-col lg="8">
						<v-card>
							<v-img :src="attachment?.file" max-width="512" max-height="512"></v-img>
							<v-card-title>{{ attachment?.name }}</v-card-title>
							
							<v-card-text>
								<h4 class="text-subtitle-1">Additional Info:</h4>
								<p>{{attachment?.additional_info}}</p>
							</v-card-text>
							
							<v-card-text>
								<h4 class="text-subtitle-1">Dates:</h4>
								<DateChip color="accent" label="Release" :date="attachment.created_at" />
								<DateChip color="red" label="Expiry" :date="attachment.updated_at" />
							</v-card-text>
							
							<v-card-actions>
								<v-btn :href="attachment?.file" color="success">
									Download
								</v-btn>
								<DeleteButton :action="() => deleteAttachment(attachment?.id)" :name="'attachment ' + attachment?.name" />
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<v-skeleton-loader v-else type="card, card-heading, card-text" />
	</v-container>
</template>

<script setup>
import { deleteAttachment } from "@/apps/attachments/api";
import DeleteButton from "@/components/DeleteButton.vue";
import DateChip from "@/components/DateChip.vue";
import { onMounted, ref } from "vue";
import { getAttachment } from "../api";
const attachment = ref({});

const props = defineProps({
	attachmentId: Number,
});

onMounted(async () => {
	attachment.value = await getAttachment(props.attachmentId);
});
</script>
