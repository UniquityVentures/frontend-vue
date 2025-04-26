<template>
  <v-container>
    <v-row v-if="announcement">
      <v-col>
        <v-row class="ma-2 flex justify-center">
          <v-col lg="8">
            <v-card>
              <v-card-title>{{ announcement?.title }}</v-card-title>

              <v-card-text>
                <p>{{ announcement?.description }}</p>
              </v-card-text>

              <v-card-text>
                <h4 class="text-subtitle-1">Signed by:</h4>
                <TeacherListItem :teacher="announcement?.signed_by_details" />
              </v-card-text>

              <v-card-text>
                <h4 class="text-subtitle-1">Dates:</h4>
                <DateChip color="primary" label="Release" :date="announcement.release_at" />
                <DateChip color="red" label="Expiry" :date="announcement.expriy_at" />
              </v-card-text>

              <v-card-text>
                <h4 class="text-subtitle-1">Assigned to:</h4>
                <div v-if="announcement?.is_school_wide">
                  <v-chip color="success">The whole school</v-chip>
                </div>
                <div v-else>
                  <div v-if="announcement?.batches?.length > 0">
                    <h5 class="text-subtitle-2 mt-2">Batches:</h5>
                    <v-chip-group column>
                      <v-chip v-for="batch in batchDetails" :key="batch.id" color="primary" variant="outlined"
                        :to="accountRoute( 'Batch', { params: { batchId: batch.id } })" link>
                        {{ batch.name }}
                      </v-chip>
                    </v-chip-group>
                  </div>
                  <div v-if="announcement?.courses?.length > 0">
                    <h5 class="text-subtitle-2 mt-2">Courses:</h5>
                    <v-chip-group column>
                      <v-chip v-for="course in courseDetails" :key="course.id" color="secondary" variant="outlined"
                        :to="accountRoute( 'Course', { params: { courseId: course.id } })" link>
                        {{ course.name }} ({{ course.code }})
                      </v-chip>
                    </v-chip-group>
                  </div>
                </div>
              </v-card-text>

              <v-card-actions>
                <v-btn :to="accountRoute( 'EditAnnouncement', { params: { announcementId: announcement.id } })"
                  variant="outlined" prepend-icon="mdi-pencil">
                  Edit
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
import {accountRoute} from "@/services/api";
import { getBatch } from "@/apps/batches/api";
import { getCourse } from "@/apps/courses/api";
import TeacherListItem from "@/apps/teachers/components/TeacherListItem.vue";
import DateChip from "@/components/DateChip.vue";
import { onMounted, ref } from "vue";
import { getAnnouncement } from "../api";

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
