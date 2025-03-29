<template>
  <v-card variant="flat" class="border">
    <v-card-title class="text-subtitle-2">{{ title }}</v-card-title>
    <v-card-text>
      <v-file-input 
        v-model="fileInput" 
        :label="label" 
        :required="required" 
        show-size 
        counter
        :rules="[v => !required || !!v || `${label} is required`]"
      ></v-file-input>
      
      <SubmitButton 
        v-if="fileInput"
        submitText="Add" 
        :onSubmit="handleFileUpload" 
      />
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { createAttachment } from "@/apps/attachments/api";
import SubmitButton from "@/components/SubmitButton.vue";

const props = defineProps({ 
  title: {
    type: String,
    default: "Add an Attachment",
  },
  label: {
    type: String,
    default: "Select file",
  },
  required: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:attachment"]);
const fileInput = ref(null);

async function handleFileUpload() {
  if (!fileInput.value) {
    return { success: false, error: "No file selected" };
  }
  
  try {
    const uploadedAttachment = await createAttachment({ file: fileInput.value });
    emit("update:attachment", uploadedAttachment);
    fileInput.value = null; 
    return { success: true };
  } catch (error) {
    console.error("Failed to upload attachment:", error);
    return { success: false, error: error?.message || "Failed to upload attachment" };
  }
}
</script> 