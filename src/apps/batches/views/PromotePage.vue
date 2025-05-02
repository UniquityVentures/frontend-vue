<template>
  <v-container>
    <v-card>
      <v-card-title>Promote Students</v-card-title>
      <v-card-subtitle>Promote Students to next batch</v-card-subtitle>
      <v-card-text>
        <ImportForm
          entityName="StudentPromotion"
          :import="promoteStudents"
          :templateFields="['student_no', 'new_batch']"
          :templateData="templateData"
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import ImportForm from "@/components/ImportForm.vue";
import { promoteStudents } from "../api";
import { onMounted, ref } from "vue";
import { getStudents } from "@/apps/students/api";

const props = defineProps({
	batchId: String,
});

const templateData = ref([]);

onMounted(async () => {
	templateData.value = (await getStudents({ batch: props.batchId, page_size: 10000 })).results.map(
		(s) => [s.student_no, ""],
	);
});
</script>
