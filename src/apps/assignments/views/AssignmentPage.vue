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
								<v-list lines="2">
									<v-list-item link
										v-if="assignment?.course_details?.batch_details?.main_teacher_details"
										:title="assignment?.course_details?.batch_details?.main_teacher_details?.user_details?.full_name"
										:subtitle="assignment?.course_details?.batch_details?.main_teacher_details?.user_details?.email"
										:to="{
											name: 'Teacher',
											params: {
												teacherId: assignment?.course_details?.batch_details?.main_teacher_details?.id
											}
										}" />
								</v-list>
							</v-card-text>

							<v-card-text>
								<h4 class="text-subtitle-1">Dates:</h4>
								<v-chip color="primary">Release: {{ formatDateTime(assignment?.release_at) }}</v-chip>
								<v-chip color="red">Due: {{ formatDateTime(assignment?.due_at) }}</v-chip>
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
import { formatDateTime } from "@/services/utils";
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref } from "vue";
import { getAssignment } from "../api";

const assignment = ref({});
const authStore = useAuthStore();

const props = defineProps({
	assignmentId: {
		type: Number,
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
