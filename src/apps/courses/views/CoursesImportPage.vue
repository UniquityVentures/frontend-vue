<template>
  <v-container>
    <v-card>
      <v-card-title>Import Courses</v-card-title>
      <v-card-text>
        <ImportForm
          entityName="Courses"
          :import="importCourses"
          :templateFields="['name', 'subject', 'description', 'main_teacher', 'batches', 'is_active']"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import ImportForm from "@/components/ImportForm.vue";
import { importCourses } from "../api";
</script> 
