<template>
	<ResponsiveDataTable :fetch="getTeachers" v-model:filters="filters"
		title="Teachers" subtitle="Teachers Master List" :templates="{ desktop: 'card', mobile: 'card' }">
		<template #filters-slot>
			<v-row>
				<v-col cols="12" sm="6" md="3" lg="2">
					<v-text-field label="Search by name" v-model="filters.name" />
				</v-col>
				<v-col cols="12" sm="6" md="3" lg="2">
					<BatchSelect v-model="filters.batches" label="Filter by batch" />
				</v-col>
				<v-col cols="12" sm="6" md="3" lg="2">
					<CourseSelect v-model="filters.courses" label="Filter by course" />
				</v-col>
			</v-row>
		</template>
		<template #cards-slot="{ items }">
			<v-row>
				<v-col cols="12" md="4" lg="3" v-for="item in items" :key="item.id">
					<TeacherSmallCard :teacher="item" />
				</v-col>
			</v-row>
		</template>
	</ResponsiveDataTable>
</template>

<script setup>
import { ref } from "vue";
import { getTeachers } from "../api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import BatchSelect from "@/apps/batches/components/BatchSelect.vue";
import CourseSelect from "@/apps/courses/components/CourseSelect.vue";
import TeacherSmallCard from "./TeacherSmallCard.vue";
const filters = ref({});
</script>
