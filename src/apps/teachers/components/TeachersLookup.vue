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
					<v-card height="100%" link :to="{ name: 'Teacher', params: { teacherId: item.id }}" variant="flat" class="border">
						<v-card-title class="text-subtitle-1">{{ item.user_details.full_name }}</v-card-title>
						<v-card-subtitle>{{ item.identifier }}</v-card-subtitle>
						<v-card-text>
							<v-chip prepend-icon="mdi-email" color="primary">
								{{ item.user_details.email }}
							</v-chip><br>
							<v-chip prepend-icon="mdi-whatsapp" color="green">
								{{ item.whatsapp }}
							</v-chip>
						</v-card-text>
					</v-card>
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
const filters = ref({});
</script>
