<template>
  <v-container>
    <v-row v-if="record">
      <v-col>
        <v-row class="ma-2 flex justify-center">
          <v-col lg="8">
            <v-card>
              <v-card-title>Attendance Record</v-card-title>

              <v-card-text>
                <h4 class="text-subtitle-1">Student:</h4>
                <v-list lines="2">
                  <v-list-item
                    v-if="record.student_details?.id"
                    :title="record.student_details?.user_details?.full_name || 'Unknown Student'"
                    :subtitle="`Student No: ${record.student_details?.student_no || 'N/A'}`"
                    :to="accountRoute( 'Student', { params: { studentId: record.student_details.id } })"
                    class="border"
                    link
                  />
                </v-list>
              </v-card-text>

              <v-card-text>
                <h4 class="text-subtitle-1">Date:</h4>
                {{ record.date }}
              </v-card-text>

              <v-card-text>
                <h4 class="text-subtitle-1">Status:</h4>
                <v-chip :color="getStatusColor(record.status)" class="mb-4">
                  {{ record.status }}
                </v-chip>

                <h4 class="text-subtitle-1 mt-4">Reason:</h4>
                <p>{{ record.reason || 'No reason provided' }}</p>
              </v-card-text>
              <v-card-actions>
                <v-btn 
                  :to="accountRoute( 'EditAttendanceRecord', { params: { recordId: record.id } })"
                  variant="outlined" 
                  prepend-icon="mdi-pencil"
                >
                  Edit
                </v-btn>
                <v-btn variant="outlined" prepend-icon="mdi-delete" color="error">
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
            <v-card variant="flat">
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
import { onMounted, ref } from "vue";
import { getAttendanceRecord } from "../api";
import { getCourse } from "@/apps/courses/api";

const record = ref({});
const courseDetails = ref(null);

const props = defineProps({
  recordId: {
    type: [Number, String],
    required: true,
  },
});

const getStatusColor = (status) => {
  if (status === "Present") return "green";
  if (status === "Absent") return "red";
  if (status === "Late") return "orange";
  return "gray";
};

onMounted(async () => {
  try {
    record.value = await getAttendanceRecord(props.recordId);
    
    // Fetch course details if course is available
    if (record.value.course) {
      courseDetails.value = await getCourse(record.value.course);
    }
  } catch (error) {
    console.error("Failed to load attendance record:", error);
  }
});
</script>
