<template>
  <v-container>
    <v-row>
      <v-col>
        <v-row class="ma-2 flex justify-center">
          <v-col lg="8">
            <v-card variant="flat">
              <v-card-title>{{ announcement?.title }}</v-card-title>
              <v-card-text>{{ announcement?.description }}</v-card-text>
              <v-card-actions>
                <v-btn :to="{ name: 'EditAnnouncement', params: { announcementId: announcement.id } }"
                variant="outlined"
                prepend-icon="mdi-pencil"
                >Edit</v-btn>
                <v-btn variant="outlined" prepend-icon="mdi-delete" color="error">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col lg="4">
            <v-card variant="flat">
              <v-card-text>
                <h4 class="text-subtitle-1">Signed by:</h4>
                  <v-list lines="2">
                    <v-list-item 
                      :title="announcement?.signed_by_details?.user_details?.full_name"
                      :subtitle="announcement?.signed_by_details?.user_details?.email"
                      :variant="'flat'"
                      rounded="lg"
                      :to="'#'"
                    />
                  </v-list>
                  <h4 class="text-subtitle-1 mt-4">Dates:</h4>
                  <v-chip color="primary">Release: {{ formatDateTime(announcement.release_at) }}</v-chip>
                  <v-chip color="red">Expiry: {{ formatDateTime(announcement.expiry_at) }}</v-chip>

                  <h4 class="text-subtitle-1 mt-4">Assigned to:</h4>
                  <div v-if="announcement?.is_school_wide">
                    <v-chip color="success">The whole school</v-chip>
                  </div>
                  <div v-else>
                    <div v-if="announcement?.batches?.length > 0">
                      <h5 class="text-subtitle-2 mt-2">Batches:</h5>
                      <v-chip-group column>
                        <v-chip
                          v-for="batch in batchDetails"
                          :key="batch.id"
                          color="primary"
                          variant="outlined"
                          :to="{ name: 'Batch', params: { batchId: batch.id }}"
                          link
                        >
                          {{ batch.name }}
                        </v-chip>
                      </v-chip-group>
                    </div>
                    <div v-if="announcement?.courses?.length > 0">
                      <h5 class="text-subtitle-2 mt-2">Courses:</h5>
                      <v-chip-group column>
                        <v-chip
                          v-for="course in courseDetails"
                          :key="course.id"
                          color="secondary"
                          variant="outlined"
                          :to="{ name: 'Course', params: { courseId: course.id }}"
                          link
                        >
                          {{ course.name }} ({{ course.batch_details?.name }})
                        </v-chip>
                      </v-chip-group>
                    </div>
                  </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { getBatch } from "@/apps/batches/api";
import { getCourse } from "@/apps/courses/api";
import { onMounted, ref } from "vue";
import { getAnnouncement } from "../api";
import { formatDateTime } from "@/services/utils";

const announcement = ref({});
const batchDetails = ref([]);
const courseDetails = ref([]);
const props = defineProps({
	announcementId: Number,
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

onMounted(fetchDetails);
</script>
