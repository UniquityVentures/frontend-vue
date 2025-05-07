<template>
		<v-row v-if="announcement">
			<v-col>
				<v-row class="flex justify-center ma-4">
					<v-col lg="8">
						<v-card>
							<v-card-title>{{ announcement?.title }}</v-card-title>

							<v-card-text>
								<h4 class="text-subtitle-1">Signed by:</h4>
								<TeacherChip v-if="announcement?.signed_by_details" :teacher="announcement?.signed_by_details" />
							</v-card-text>

							<v-card-text>
								<h4 class="text-subtitle-1">Content:</h4>
								<HyperlinkedSpan :content="announcement?.description ? announcement.description : ''" />
							</v-card-text>

							<v-card-text v-if="announcement.is_active == null">
								<h4 class="text-subtitle-1">Dates:</h4>
								<DateChip v-if="announcement.release_at" color="accent" label="Release" :date="announcement.release_at" />
								<DateChip v-if="announcement.expiry_at" color="red" label="Expiry" :date="announcement.expiry_at" />
							</v-card-text>

							<v-card-text v-else>
								<h4 class="text-subtitle-1">Status:</h4>
								<v-chip v-if="announcement.is_active" color="success">Active</v-chip>
								<v-chip v-else color="error">Inactive</v-chip>
							</v-card-text>

							<v-card-text v-if="role === 'Admin' || role === 'Teacher'">
								<h4 class="text-subtitle-1">Assigned to:</h4>
								<div v-if="announcement?.is_school_wide">
									<v-chip color="success">The whole school</v-chip>
								</div>
								<div v-else>
									<div v-if="announcement?.batches?.length > 0">
										<h5 class="text-subtitle-2 mt-2">Batches:</h5>
										<v-chip-group column>
											<BatchChip v-for="batch in batchDetails" :key="batch.id" :batch="batch" />
										</v-chip-group>
									</div>
									<div v-if="announcement?.courses?.length > 0">
										<h5 class="text-subtitle-2 mt-2">Courses:</h5>
										<v-chip-group column>
											<CourseChip v-for="course in courseDetails" :key="course.id" :course="course" />
										</v-chip-group>
									</div>
								</div>
							</v-card-text>

							<v-card-actions>
								<ShareButton 
									:title="'Announcement Object'"
									:url="currentUrl"
									:text="`Check out this announcement: ${announcement?.title}`"
								/>
							</v-card-actions>
						</v-card>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
		<v-skeleton-loader v-else type="card, card-heading, card-text" />
		
		<!-- Snackbar for share notifications -->
		<v-snackbar v-model="snackbar.show" :color="snackbar.color">
			{{ snackbar.text }}
			<template v-slot:actions>
				<v-btn variant="text" @click="snackbar.show = false">Close</v-btn>
			</template>
		</v-snackbar>
</template>

<script setup>
import { getBatch } from "@/apps/batches/api";
import { getCourse } from "@/apps/courses/api";
import TeacherListItem from "@/apps/teachers/components/TeacherListItem.vue";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";
import DateChip from "@/components/DateChip.vue";
import BatchChip from "@/apps/batches/components/BatchChip.vue";
import CourseChip from "@/apps/courses/components/CourseChip.vue";
import ShareButton from "@/components/ShareButton.vue";
import HyperlinkedSpan from "@/components/HyperlinkedSpan.vue";
import { useAuthStore } from "@/stores/auth";

import { onMounted, ref } from "vue";
import { getAnnouncement } from "../api";

const authStore = useAuthStore();
const role = authStore.role;

const announcement = ref({});
const batchDetails = ref([]);
const courseDetails = ref([]);
const props = defineProps({
	announcementId: Number,
});
const currentUrl = ref();

const snackbar = ref({
	show: false,
	text: '',
	color: 'success'
});

const fetchDetails = async () => {
	announcement.value = await getAnnouncement(props.announcementId);
	// Fetch batch details
	if (announcement.value.batches?.length > 0) {
		batchDetails.value = await Promise.all(
			announcement.value.batches.map((id) => getBatch(id)),
		);
	}
	// Fetch course details
	if (announcement.value.courses?.length > 0) {
		courseDetails.value = await Promise.all(
			announcement.value.courses.map((id) => getCourse(id)),
		);
	}
};

onMounted(async () => {
	await fetchDetails();
	currentUrl.value = window.location.href;
});
</script>
