<template>
	<ResponsiveDataTable :fetch="getAssignments" 
	:templates="{ desktop: 'card', mobile: 'card' }" v-model:filters="filters"
	title="Assignments"
	subtitle="View all assignments">
		<template #filters-slot>
			<v-row>
				<v-col cols="12" sm="6" md="3" lg="2">
					<v-text-field label="Search by title" v-model="filters.title" />
				</v-col>
				<v-col cols="12" sm="6" md="3" lg="2">
					<CourseSelect v-model="filters.course" label="Filter by course" />
				</v-col>
				<v-col cols="12" sm="6" md="4" lg="3">
					<DateRangeSelect
						v-model:start="filters.release_start"
						v-model:end="filters.release_end"
						label="Release Date Range"
					/>
				</v-col>
				<v-col cols="12" sm="6" md="4" lg="3">
					<DateRangeSelect
						v-model:start="filters.due_start"
						v-model:end="filters.due_end"
						label="Due Date Range"
					/>
				</v-col>
			</v-row>
		</template>
		
		<template #cards-slot="{ items }">
			<v-row>
				<v-col cols="12" md="4" lg="3" v-for="item in items" :key="item.id">
					<v-card height="100%" link :to="accountRoute( 'Assignment', { params: { assignmentId: item.id }})" variant="flat" class="border">
						<v-card-title class="text-subtitle-1">{{ item.title }}</v-card-title>
						<v-card-subtitle class="text-wrap">{{ item.description.slice(0, 100) }}...</v-card-subtitle>
						<v-card-text>
							<v-chip color="primary">Course: {{ item.course_details.name }} - {{ item.course_details.code }}</v-chip>
							<DateChip label="Release" color="green" :date="item.release_at" />
							<DateChip label="Due" color="red" :date="item.due_at" />
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</template>
	</ResponsiveDataTable>
</template>

<script setup>
import CourseSelect from "@/apps/courses/components/CourseSelect.vue";
import DateRangeSelect from "@/components/DateRangeSelect.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import DateChip from "@/components/DateChip.vue";
import {accountRoute} from "@/services/api";

import { ref } from "vue";
import { getAssignments } from "../api";

const filters = ref({});
</script>
