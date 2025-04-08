<template>
  <v-container>
    <v-row v-if="event">
      <v-col>
        <v-row class="ma-2 flex justify-center">
          <v-col lg="8">
            <v-card>
              <v-card-title>{{ event?.title }}</v-card-title>
              
              <v-card-text>
                <p>{{ event?.description }}</p>
              </v-card-text>
              
              <v-card-text>
                <h4 class="text-subtitle-1">Created by:</h4>
                <v-list lines="2">
                  <v-list-item 
                    :title="event?.created_by_details?.user_details?.full_name"
                    :subtitle="event?.created_by_details?.user_details?.email"
                    :to="'#'"
                  />
                </v-list>
              </v-card-text>

              <v-card-text>
                <h4 class="text-subtitle-1">Event Time:</h4>
                <DateChip label="Start" color="primary" date="event?.start" />
                <DateChip label="End" color="red" date="event?.end" />
              </v-card-text>

              <v-card-text>
                <h4 class="text-subtitle-1">Assigned to:</h4>
                <div v-if="event?.is_school_wide">
                  <v-chip color="success">The whole school</v-chip>
                </div>
                <div v-else>
                  <div v-if="event?.batches?.length > 0">
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
                  <div v-if="event?.courses?.length > 0">
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
              
              <v-card-actions>
                <v-btn 
                  to="#"
                  variant="outlined"
                  prepend-icon="mdi-pencil"
                >Edit</v-btn>
                <v-btn 
                  variant="outlined" 
                  prepend-icon="mdi-delete" 
                  color="error"
                >Delete</v-btn>
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
import { getBatch } from "@/apps/batches/api";
import { getCourse } from "@/apps/courses/api";
import { onMounted, ref } from "vue";
import { getEvent } from "../api";

const event = ref({});
const batchDetails = ref([]);
const courseDetails = ref([]);

const props = defineProps({
	eventId: Number,
});

const formatDate = (dateString) => {
	return new Date(dateString).toLocaleString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

const fetchDetails = async () => {
	event.value = await getEvent(props.eventId);

	// Fetch batch details
	if (event.value.batches?.length > 0) {
		batchDetails.value = await Promise.all(
			event.value.batches.map((id) => getBatch(id)),
		);
	}

	// Fetch course details
	if (event.value.courses?.length > 0) {
		courseDetails.value = await Promise.all(
			event.value.courses.map((id) => getCourse(id)),
		);
	}
};

onMounted(fetchDetails);
</script>
