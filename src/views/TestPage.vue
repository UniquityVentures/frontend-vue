<template>
	<h1>
		Area for testing and fixing components
	</h1>
          <ServerAutocomplete
            v-if="batchesOrCourses === 'batches'" 
            :fetch="getBatches"
            :getInfo="getBatchInfoFromObj"
            searchField="name"
            :multiple="true"
            label="Batches"
            v-model="formData.batches"
          />
</template>

<script setup>
import { getBatchInfoFromObj, getBatches } from "@/apps/batches/api";
import ServerAutocomplete from "@/components/ServerAutocomplete.vue";
const batchesOrCourses = ref('batches');
import {ref} from "vue";


// Initialize form data with default values
const formData = ref({
	title: "",
	description: "",
	priority: "low",
	is_active: true,
	is_school_wide: false,
	signed_by: null,
	release_at: null,
	expiry_at: null,
	batches: ["2354"],
	courses: [],
	attachments: null,
});
</script>
