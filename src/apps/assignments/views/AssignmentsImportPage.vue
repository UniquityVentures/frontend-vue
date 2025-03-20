<template>
  <v-container>
    <v-card>
      <v-card-title>Import Assignments</v-card-title>
      <v-card-text>
        <ImportForm
          entityName="Assignments"
          :dryRunFunction="importAssignments.dryRun"
          :finalizeFunction="importAssignments.finalize"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import ImportForm from "@/components/ImportForm.vue";
import { importAssignments } from "../api";
</script> 