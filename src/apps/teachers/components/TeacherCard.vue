<template>
  <v-card v-if="teacher">
    <!-- Teacher Avatar/Image -->
    <v-img class="teacher-avatar-container" height="180" cover>
      <v-avatar size="120" color="primary" class="ma-4">
        <v-img :src="getPortraitImage()" />
      </v-avatar>
    </v-img>

    <!-- Teacher Name -->
    <v-card-title>
      {{ teacher.user_details.full_name }}
    </v-card-title>

    <!-- Teacher Info with Chips -->
    <v-card-text>
      <v-chip size="small" color="primary" prepend-icon="mdi-identifier">
        ID: {{ teacher.identifier }}
      </v-chip>
      
      <v-chip size="small" color="primary" prepend-icon="mdi-phone">
        Phone Number: {{ teacher.phone }}
      </v-chip>
      
      <v-chip size="small" color="primary" prepend-icon="mdi-whatsapp">
        Whatsapp Number: {{ teacher.whatsapp }}
      </v-chip>
      
      <v-chip size="small" color="primary" prepend-icon="mdi-email">
        Email: {{ teacher.user_details.email }}
      </v-chip>
    </v-card-text>

    <v-card-text>
      <!-- Status Chips -->
      <v-chip
        :color="teacher.user_details.is_approved ? 'success' : 'warning'"
        size="small"
        label
        class="mr-2"
      >
        {{ teacher.user_details.is_approved ? 'Approved' : 'Pending Approval' }}
      </v-chip>
      
      <v-chip
        :color="teacher.user_details.is_active ? 'success' : 'error'"
        size="small"
        label
      >
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

