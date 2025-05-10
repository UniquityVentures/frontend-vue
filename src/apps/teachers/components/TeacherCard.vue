<template>
  <v-card v-if="teacher">
    <!-- Teacher Avatar/Image -->
    <AttachmentImage :id="teacher?.profile_photo" class="student-avatar-container" height="180" cover />

    <!-- Teacher Name -->
    <v-card-title>
      {{ teacher.user_details.full_name }}
    </v-card-title>

    <!-- Teacher Info with Chips -->
    <v-card-subtitle>
      ID: {{ teacher.identifier }}
    </v-card-subtitle>

    <v-card-text>
      <div class="text-subtitle-2 mb-1">Contact Information: </div>

      <v-chip color="blue" prepend-icon="mdi-phone" :href="`tel:${teacher.phone}`">
        Phone Number: {{ teacher.phone }}
      </v-chip>
      
      <v-chip color="green" prepend-icon="mdi-whatsapp" :href="`https://wa.me/${teacher.whatsapp}`">
        Whatsapp Number: {{ teacher.whatsapp }}
      </v-chip>
      
      <v-chip color="grey" prepend-icon="mdi-email" :href="`mailto:${teacher.user_details.email}`">
        Email: {{ teacher.user_details.email }}
      </v-chip>
    </v-card-text>

    <v-card-text>
      <!-- Status Chips -->
      <v-chip :color="teacher.user_details.is_approved ? 'success' : 'error'">
        {{ teacher.user_details.is_approved ? 'Approved' : 'Not Approved' }}
      </v-chip>
      
      <v-chip :color="teacher.user_details.is_active ? 'success' : 'error'">
        {{ teacher.user_details.is_active ? 'Active' : 'Inactive' }}
      </v-chip>
    </v-card-text>
    
    <v-card-actions>
      <v-btn
        v-if="!teacher.user_details.is_approved"
        color="warning"
        :to="{ name: 'EditTeacher', params: { teacherId: teacher.id }}"
        prepend-icon="mdi-check-circle"
        variant="outlined"
      >
        Approve Teacher
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import AttachmentImage from "@/apps/attachments/components/AttachmentImage.vue";
import { getPortraitImage } from "@/apps/teachers/api";

const props = defineProps({
	teacher: {
		type: Object,
		required: true,
	},
});
</script>

<style scoped>
.teacher-avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff6969;
}
</style>

