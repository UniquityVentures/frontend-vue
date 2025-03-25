<template>
	<ResponsiveDataTable :fetch="getAssignments" 
	:templates="{ desktop: 'card', mobile: 'card' }" v-model:filters="filters">
		<template #cards-slot="{ items }">
			<v-row>
				<v-col cols="12" md="4" lg="3" v-for="item in items" :key="item.id">
					<v-card height="100%" link :to="{ name: 'Assignment', params: { assignmentId: item.id }}" variant="flat" class="border">
						<v-card-title class="text-subtitle-1">{{ item.title }}</v-card-title>
						<v-card-subtitle class="text-wrap">{{ item.description.slice(0, 100) }}...</v-card-subtitle>
						<v-card-text>
							<v-chip color="primary">Course: {{ item.course_details.name }} - {{ item.course_details.code }}</v-chip>
							<v-chip color="green">Release: {{ formatDateTime(item.release_at) }}</v-chip>
							<v-chip color="red">Due: {{ formatDateTime(item.due_at) }}</v-chip>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</template>
	</ResponsiveDataTable>
</template>

<script setup>
import { ref } from "vue";
import { getAssignments } from "../api";
import { formatDateTime } from "@/services/utils";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";

const filters = ref({});

</script>
