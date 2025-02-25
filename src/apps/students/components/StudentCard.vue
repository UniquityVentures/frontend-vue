<template>
  <v-card class="pa-4" variant="flat">
    <v-row>
      <v-col cols="auto">
        <v-avatar size="120" color="grey-lighten-2">
          <v-icon size="64">mdi-account-circle</v-icon>
        </v-avatar>
      </v-col>
      
      <v-col>
        <v-card-title class="text-h5 pa-0 mb-4">
          {{ student.user_details.full_name }}
        </v-card-title>
        
        <v-card-text class="pa-0">
          <v-list density="compact">
            <v-list-item>
              <template v-slot:prepend>
                <v-icon>mdi-identifier</v-icon>
              </template>
              <v-list-item-title>Student No: {{ student.student_no }}</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon>mdi-format-list-numbered</v-icon>
              </template>
              <v-list-item-title>Roll No: {{ student.roll_no }}</v-list-item-title>
            </v-list-item>

            <v-list-item>
              <template v-slot:prepend>
                <v-icon>mdi-email</v-icon>
              </template>
              <v-list-item-title>{{ student.user_details.email }}</v-list-item-title>
            </v-list-item>
          </v-list>

          <div class="mt-4">
            <v-chip
              :color="student.user_details.is_approved ? 'success' : 'warning'"
              class="mr-2"
            >
              {{ student.user_details.is_approved ? 'Approved' : 'Pending Approval' }}
            </v-chip>
            <v-chip
              :color="student.user_details.is_active ? 'success' : 'error'"
            >
              {{ student.user_details.is_active ? 'Active' : 'Inactive' }}
            </v-chip>
          </div>

          <h4 class="text-subtitle-1 mt-4">Guardians:</h4>
          <div class="d-flex flex-wrap">
            <v-card
              v-if="student.guardian1_name"
              variant="flat"
              class="ma-2 flex-grow-1 border"
              min-width="300"
            >
              <v-card-item>
                <template v-slot:prepend>
                  <v-avatar color="primary" variant="tonal">
                    <v-icon>mdi-account-child</v-icon>
                  </v-avatar>
                </template>
                <v-card-title>{{ student.guardian1_name }}</v-card-title>
                <v-card-subtitle>
                  <v-icon size="small" class="me-1">mdi-email</v-icon>
                  {{ student.guardian1_email }}
                </v-card-subtitle>
              </v-card-item>
              
              <v-card-text class="d-flex gap-2">
                <v-chip size="small" color="primary">
                  <v-icon start size="small">mdi-phone</v-icon>
                  {{ student.guardian1_phone }}
                </v-chip>
                <v-chip size="small" color="success">
                  <v-icon start size="small">mdi-whatsapp</v-icon>
                  {{ student.guardian1_whatsapp }}
                </v-chip>
              </v-card-text>
            </v-card>

            <v-card
              v-if="student.guardian2_name"
              variant="flat"
              class="ma-2 flex-grow-1 border"
              min-width="300"
            >
              <v-card-item>
                <template v-slot:prepend>
                  <v-avatar color="primary" variant="tonal">
                    <v-icon>mdi-account-child</v-icon>
                  </v-avatar>
                </template>
                <v-card-title>{{ student.guardian2_name }}</v-card-title>
                <v-card-subtitle>
                  <v-icon size="small" class="me-1">mdi-email</v-icon>
                  {{ student.guardian2_email }}
                </v-card-subtitle>
              </v-card-item>
              
              <v-card-text class="d-flex gap-2">
                <v-chip size="small" color="primary">
                  <v-icon start size="small">mdi-phone</v-icon>
                  {{ student.guardian2_phone }}
                </v-chip>
                <v-chip size="small" color="success">
                  <v-icon start size="small">mdi-whatsapp</v-icon>
                  {{ student.guardian2_whatsapp }}
                </v-chip>
              </v-card-text>
            </v-card>
          </div>
        </v-card-text>
        <v-card-actions>
            <v-btn
            v-if="!student.user_details.is_approved"
            color="warning"
            :to="{ name: 'EditStudent', params: { studentId: student.id }}"
            prepend-icon="mdi-check-circle"
            variant="outlined"
            >
            Approve Student
          </v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
	student: {
		type: Object,
		required: true,
	},
});
</script>
