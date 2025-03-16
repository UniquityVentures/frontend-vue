<template>
  <v-card v-if="student">
    <!-- Student Avatar/Image -->
    <v-img class="student-avatar-container" height="180" cover>
      <v-avatar size="120" color="primary" class="ma-4">
        <v-icon size="64">mdi-account-circle</v-icon>
      </v-avatar>
    </v-img>

    <!-- Student Name -->
    <v-card-title>
      {{ student.user_details.full_name }}
    </v-card-title>

    <!-- Student Info with Subtitle -->
    <v-card-subtitle>
      Student No: {{ student.student_no }}
    </v-card-subtitle>

    <v-card-text>
      <div class="text-subtitle-2">Contact Information: </div>
      
      <v-chip color="grey" prepend-icon="mdi-email" :href="`mailto:${student.user_details.email}`">
        Email: {{ student.user_details.email }}
      </v-chip>
    </v-card-text>

    <v-card-text>
      <div class="text-subtitle-2">Status: </div>
      <!-- Status Chips -->
      <v-chip :color="student.user_details.is_approved ? 'success' : 'warning'">
        {{ student.user_details.is_approved ? 'Approved' : 'Pending Approval' }}
      </v-chip>
      
      <v-chip :color="student.user_details.is_active ? 'success' : 'error'">
        {{ student.user_details.is_active ? 'Active' : 'Inactive' }}
      </v-chip>
    </v-card-text>

    <v-card-text>
      <div class="text-subtitle-2">Batch: </div>
      <v-list-item link class="border" :to="{ name: 'Batch', params: { batchId: student.batch_details?.id }}" variant="tonal">
          <v-list-item-title>{{ student.batch_details?.name }}</v-list-item-title>
          <v-list-item-subtitle>Roll Number: {{ student.roll_no }}</v-list-item-subtitle>
          <v-list-item-text>
            <TeacherChip v-if="student.batch_details?.class_teacher_details" :teacher="student.batch_details?.class_teacher_details" :label="`Teacher`"/>
          </v-list-item-text>
        </v-list-item>
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
  </v-card>
</template>

<script setup>

const props = defineProps({
	student: {
		type: Object,
		required: true,
	},
});
</script>

<style scoped>
.student-avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #69a1ff;
}
</style>
