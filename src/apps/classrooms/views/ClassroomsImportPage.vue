<template>
  <v-container>
    <v-card class="mt-4">
      <v-card-title>Upload CSV file of classrooms here:</v-card-title>
      <v-card-text>
        <v-file-input
          v-model="file"
          label="Select CSV file"
          accept=".csv"
          :error-messages="errorMessage"
          @update:model-value="clearMessages"
        ></v-file-input>

        <div v-if="dryRunResult" class="mt-4">
          <v-alert type="info" variant="tonal">
            <strong>File Analysis:</strong>
            <p>{{ dryRunResult.message }}</p>
            <p>Number of rows: {{ dryRunResult.row_count }}</p>
            <p>Headers found: {{ dryRunResult.headers.join(', ') }}</p>
          </v-alert>
        </div>

        <div class="d-flex gap-2 mt-4">
          <v-btn
            color="primary"
            :loading="isDryRunning"
            :disabled="!file || isImporting"
            @click="handleDryRun"
            class="ma-2"
          >
            Analyze File
          </v-btn>

          <v-btn
            color="success"
            :loading="isImporting"
            :disabled="!dryRunResult || isDryRunning"
            @click="handleImport"
            class="ma-2"
          >
            Import
          </v-btn>
        </div>

        <v-alert
          v-if="successMessage"
          type="success"
          variant="tonal"
          class="mt-4"
        >
          {{ successMessage }}
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import { importClassroomsDryRun, importClassroomsFinalize } from '../api';

const file = ref(null);
const isDryRunning = ref(false);
const isImporting = ref(false);
const dryRunResult = ref(null);
const errorMessage = ref('');
const successMessage = ref('');

const clearMessages = () => {
  errorMessage.value = '';
  successMessage.value = '';
  dryRunResult.value = null;
};

const handleDryRun = async () => {
  if (!file.value) return;
  
  try {
    isDryRunning.value = true;
    errorMessage.value = '';
    dryRunResult.value = null;
    
    const result = await importClassroomsDryRun(file.value);
    dryRunResult.value = result;
  } catch (error) {
    console.error('Dry run failed:', error);
    errorMessage.value = error.response?.data?.message || 'Failed to analyze file';
  } finally {
    isDryRunning.value = false;
  }
};

const handleImport = async () => {
  if (!file.value || !dryRunResult.value) return;
  
  try {
    isImporting.value = true;
    errorMessage.value = '';
    
    await importClassroomsFinalize(file.value);
    successMessage.value = 'Classrooms imported successfully!';
    file.value = null;
    dryRunResult.value = null;
  } catch (error) {
    console.error('Import failed:', error);
    errorMessage.value = error.response?.data?.message || 'Failed to import file';
  } finally {
    isImporting.value = false;
  }
};
</script>
