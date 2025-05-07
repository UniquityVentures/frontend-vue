<template>
	<v-container>
		<v-row v-if="assignment">
			<v-col>
				<v-row class="ma-2 flex justify-center">
					<v-col lg="8">
						<v-card>
							<v-card-title>{{ assignment?.title }}</v-card-title>

							<v-card-text>
								<p>{{ assignment?.description }}</p>
							</v-card-text>

							<v-card-text>
								<h4 class="text-subtitle-1">Attachments:</h4>
								<div v-if="assignment?.attachments?.length > 0">
									<v-list>
										<v-list-item v-for="attachment in assignment.attachments" :key="attachment.id"
											:title="attachment.name" :subtitle="attachment.file_type"
											prepend-icon="mdi-file-document-outline" :href="attachment.file"
											target="_blank" link />
									</v-list>
								</div>
								<div v-else>
									<v-chip color="info">No attachments</v-chip>
								</div>
							</v-card-text>

							<v-card-text>
								<h4 class="text-subtitle-1">Course Teacher:</h4>
								<TeacherListItem :teacher="assignment?.course_details?.main_teacher_details" />
							</v-card-text>

							<v-card-text v-if="assignment.is_active == null">
								<h4 class="text-subtitle-1">Dates:</h4>
								<DateChip v-if="assignment.release_at" color="accent" label="Release" :date="assignment?.release_at" />
								<DateChip v-if="assignment.due_at" color="red" label="Due" :date="assignment?.due_at" />
							</v-card-text>

							<v-card-text v-else>
								<h4 class="text-subtitle-1">Status:</h4>
								<v-chip v-if="assignment.is_active" color="success">Active</v-chip>
								<v-chip v-else color="error">Inactive</v-chip>
							</v-card-text>


							<v-card-text>
								<h4 class="text-subtitle-1">Submissions:</h4>
								<div v-if="assignment?.submissions?.length > 0">
									<v-list>
										<v-list-item v-for="submission in assignment.submissions" :key="submission.id"
											:title="submission.student_details?.user_details?.full_name"
											:subtitle="`Submitted: ${formatDateTime(submission.submitted_at)}`"
											prepend-icon="mdi-file-check-outline"
											:to="{ name: 'SubmissionDetails', params: { submissionId: submission.id } }"
											link />
									</v-list>
								</div>
								<div v-else>
									<v-chip color="warning">No submissions yet</v-chip>
								</div>
							</v-card-text>

							<v-card-actions>
								<v-btn :to="{ name: 'EditAssignment', params: { assignmentId: assignment.id } }"
									variant="outlined" prepend-icon="mdi-pencil"
									v-if="authStore.hasPermission('change_assignment')">
									Edit
								</v-btn>
								<v-btn variant="outlined" prepend-icon="mdi-delete" color="error"
									v-if="authStore.hasPermission('delete_assignment')">
									Delete
								</v-btn>
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
import DateChip from "@/components/DateChip.vue";
import TeacherListItem from "@/apps/teachers/components/TeacherListItem.vue";
import { useAuthStore } from "@/stores/auth";
import { formatDateTime } from "@/services/utils";
import { onMounted, ref } from "vue";
import { getAssignment } from "../api";

const assignment = ref({});
const authStore = useAuthStore();

const props = defineProps({
	assignmentId: {
		type: [Number, String],
		required: true,
	},
});

onMounted(async () => {
	try {
		assignment.value = await getAssignment(props.assignmentId);
	} catch (error) {
		console.error("Failed to load assignment:", error);
	}
});
</script>
