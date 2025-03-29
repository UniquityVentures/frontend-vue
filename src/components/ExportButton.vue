<template>
  <div>
    <v-btn color="success" :loading="isExporting" @click="showExportDialog">
      {{ title }}
    </v-btn>

    <!-- Export confirmation dialog -->
    <v-dialog v-model="showDialog" max-width="400">
      <v-card>
        <v-card-title>Confirm Export</v-card-title>
        <v-card-text>
          Are you sure you want to export this data?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey-darken-1" variant="text" @click="showDialog = false">
            Cancel
          </v-btn>
          <v-btn color="success" variant="text" :loading="isExporting" @click="handleExport">
            Confirm Export
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  exportFunction: {
    type: Function,
    required: true,
  },
  title: {
    type: String,
    default: "Export",
  }
});

// Use defineModel to access filters from parent
const filters = defineModel('filters', { required: true });

// Exporting Logic
const isExporting = ref(false);
const showDialog = ref(false);

const showExportDialog = () => {
  showDialog.value = true;
};

const handleExport = async () => {
  try {
    isExporting.value = true;
    await props.exportFunction(filters.value);
    showDialog.value = false;
  } catch (error) {
    console.error("Export failed:", error);
  } finally {
    isExporting.value = false;
  }
};
</script> 