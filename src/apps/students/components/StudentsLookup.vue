<template>
	<ResponsiveDataTable :fetch="getStudents" v-model:filters="filters"
		title="Students" subtitle="Students Master List" :templates="{ desktop: 'card', mobile: 'card' }">
		<template #filters-slot>
			<v-row>
				<v-col cols="12" sm="6" md="3" lg="2">
					<v-text-field label="Search by name" v-model="filters.name" />
				</v-col>
				<v-col cols="12" sm="6" md="3" lg="2">
					<BatchSelect v-model="filters.batch" label="Assigned Batch" />
				</v-col>
			</v-row>
		</template>
		<template #cards-slot="{ items }">
			<v-row>
				<v-col cols="6" md="3" lg="2" v-for="item in items" :key="item.id">
					<v-card link :to="{ name: 'Student', params: { studentId: item.id }}" variant="flat" class="border">
						<v-card-title class="text-subtitle-1">{{ item.user_details.full_name }}</v-card-title>
						<v-card-subtitle>{{ item.student_no }}</v-card-subtitle>
						<v-card-text>
							<BatchChip :batchId="item.batch" /><br>
							<v-chip>Roll No: {{ item.roll_no }}</v-chip>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</template>
	</ResponsiveDataTable>
</template>

<script setup>
import { ref } from "vue";
import { getStudents } from "../api";
import BatchSelect from "@/apps/batches/components/BatchSelect.vue";
import BatchChip from "@/apps/batches/components/BatchChip.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";

const filters = ref({});
</script>
