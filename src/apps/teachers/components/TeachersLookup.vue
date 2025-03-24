<template>
	<ResponsiveDataTable :fetch="getTeachers" v-model:filters="filters"
		title="Teachers" subtitle="Teachers Master List">
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
		<template #list-slot="{ items }">
			<v-list lines="two">
				<v-list-item v-for="item in items" :key="item.id" link 
					:to="{ name: 'Teacher', params: { teacherId: item.id }}" class="border">
					<v-list-item-title>{{ item.user_details.full_name }}</v-list-item-title>
					<v-list-item-subtitle>{{ item.identifier }}</v-list-item-subtitle>
					<v-list-item-text>
						<v-chip color="green">{{ item.phone }}</v-chip>
						<v-chip color="blue">{{ item.user_details.email }}</v-chip>
					</v-list-item-text>
				</v-list-item>
			</v-list>
		</template>
	</ResponsiveDataTable>
</template>

<script setup>
import { ref } from "vue";
import { getTeachers } from "../api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import BatchSelect from "@/apps/batches/components/BatchSelect.vue";
import CourseSelect from "@/apps/courses/components/CourseSelect.vue";

const filters = ref({});
</script>
