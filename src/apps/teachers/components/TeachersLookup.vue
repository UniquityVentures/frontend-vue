<template>
	<ResponsiveDataTable :fetch="getTeachers" v-model:filters="filters"
		title="Teachers" subtitle="Teachers Master List" 
		:templates="{ desktop: 'card', mobile: 'card' }"
		page_size="50">
		<template #filters-slot>
			<v-row>
				<v-col cols="12" sm="6" md="3" lg="2">
					<v-text-field label="Search by name" v-model="filters.name" />
				</v-col>
				<v-col cols="12" sm="6" md="3" lg="2">
					<v-text-field label="Search by Identifier" v-model="filters.identifier" />
				</v-col>
				<v-col cols="12" sm="6" md="3" lg="2" v-if="role == 'Admin'">
					<BatchSelect v-model="filters.batches" label="Filter by batch" />
				</v-col>
				<v-col cols="12" sm="6" md="3" lg="2" v-if="role == 'Admin'">
					<CourseSelect v-model="filters.courses" label="Filter by course" />
				</v-col>
			</v-row>
		</template>
		<template #cards-slot="{ items }">
			<v-row>
				<v-col cols="6" md="3" lg="2" v-for="item in items" :key="item.id">
					<TeacherSmallCard :teacher="item" />
				</v-col>
			</v-row>
		</template>
	</ResponsiveDataTable>
</template>

<script setup>
import BatchSelect from "@/apps/batches/components/BatchSelect.vue";
import CourseSelect from "@/apps/courses/components/CourseSelect.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { ref } from "vue";
import { getTeachers } from "../api";
import TeacherSmallCard from "./TeacherSmallCard.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const role = authStore.getRole;

const filters = ref({sort_by: "user__first_name"});
</script>
