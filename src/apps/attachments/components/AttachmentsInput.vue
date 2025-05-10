<template>
  <v-card variant="flat" class="border">
    <v-card-title class="text-subtitle-1">{{ title }}</v-card-title>
    <v-card-subtitle>Select files to upload</v-card-subtitle>
    <v-card-text>
      <AttachmentInput 
        :title="title" 
		v-model:file="currentFile"
        @update:attachment="attachmentAdded" 
      />
    </v-card-text>
    <v-card-text>
      <div class="text-subtitle-1">Added Attachments:</div>
      <div class="text-body-2 text-grey" v-if="attachments.length === 0">No attachments added yet.</div>
      <v-list v-else density="compact">
        <v-list-item
          v-for="item in attachments"
          :key="item.id"
          :title="item.name"
          :subtitle="item.file"
          class="border rounded-lg mb-2"
        >
          <template v-slot:append>
            <v-btn 
              icon="mdi-close" 
              size="small" 
              variant="text" 
              density="compact"
              @click="removeAttachment(item)"
              color="error"
            ></v-btn>
          </template>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script setup>
import AttachmentInput from "@/apps/attachments/components/AttachmentInput.vue";
import { watch } from "vue";

const props = defineProps({
	title: {
		type: String,
		default: "Attachments",
	},
	required: {
		type: Boolean,
		default: false,
	},
});

// Define model for attachments array
const attachments = defineModel("attachments", {
	default: [],
});

const attachmentIds = defineModel({
	default: []
})

const currentFile = ref();

watch(attachments, (v) => {
	attachmentIds.value = v.map((e) => e.id)
})

function attachmentAdded(attachment) {
	// Add to existing attachments
	console.log(attachment)
	attachments.value = [...attachments.value, attachment];
	currentFile.value = null;
	console.log(attachments.value)
}

function removeAttachment(item) {
	attachments.value = attachments.value.filter(
		(attachment) => attachment.id !== item.id,
	);
}
</script> 
