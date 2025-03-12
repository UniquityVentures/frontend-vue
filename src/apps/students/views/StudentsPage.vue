<template>
  <v-container>
    <StudentsLookup :overrideFields="customFields" />
  </v-container>
</template>

<script setup>
import StudentsLookup from "@/apps/students/components/StudentsLookup.vue";
</script>
