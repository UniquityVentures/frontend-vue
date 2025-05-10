<template>
  <v-container>
    <v-card>
      <v-card-title>Import Batches</v-card-title>
      <v-card-subtitle>Import batches from a CSV file</v-card-subtitle>
      <v-card-text>
        <ImportForm
          entityName="Batches"
          :import="importBatches"
          :templateFields="['name', 'code', 'standard', 'section', 'teachers', 'is_active']"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import ImportForm from "@/components/ImportForm.vue";
import { importBatches } from "../api";
</script>
