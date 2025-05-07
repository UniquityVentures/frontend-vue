<template>
	<ResponsiveDataTable :fetch="getStudents" v-model:filters="filters"
		title="Students" subtitle="Students Master List" :templates="{ desktop: 'card', mobile: 'card' }">
		<template #filters-slot>
			<v-row>
				<v-col cols="12" sm="6" md="3" lg="2">
					<v-text-field label="Search by name" v-model="filters.name" />
				</v-col>
				<v-col cols="12" sm="6" md="3" lg="2">
					<v-text-field label="Search by Student Number" v-model="filters.student_no" />
				</v-col>
				<v-col cols="12" sm="6" md="3" lg="2">
					<BatchSelect v-model="filters.batch" label="Assigned Batch" />
				</v-col>
			</v-row>
		</template>
		<template #cards-slot="{ items }">
			<v-row>
				<v-col cols="6" md="3" lg="2" v-for="item in items" :key="item.id">
					<StudentSmallCard :student="item" />
				</v-col>
			</v-row>
		</template>
	</ResponsiveDataTable>
</template>

<script setup>
import BatchSelect from "@/apps/batches/components/BatchSelect.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { ref } from "vue";
import { getStudents } from "../api";
import StudentSmallCard from "./StudentSmallCard.vue";

const filters = ref({sort_by: "student_no"});
</script>
