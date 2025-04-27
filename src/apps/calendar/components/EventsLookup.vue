<template>
	<ResponsiveDataTable :fetch="getEvents" v-model:filters="filters"
		title="Events" subtitle="Events Master List">
		<template #filters-slot>
			<v-row>
				<v-col cols="12" sm="6" md="3" lg="2">
					<v-text-field label="Search by title" v-model="filters.title" />
				</v-col>
				<v-col cols="12" sm="6" md="3" lg="2">
					<v-text-field label="Search by description" v-model="filters.description" />
				</v-col>
				<v-col cols="12" sm="6" md="3" lg="2">
					<BatchSelect v-model="filters.batch" label="Filter by batch" />
				</v-col>
				<v-col cols="12" sm="6" md="4" lg="3">
					<DateRangeSelect
						v-model:start="filters.start_date"
						v-model:end="filters.end_date"
						label="Date Range"
					/>
				</v-col>
				<v-col cols="12" sm="6" md="3" lg="2">
					<TeacherSelect v-model="filters.created_by" label="Created By" />
				</v-col> 
			</v-row>
		</template>
		<template #list-slot="{ items }">
			<v-list>
				<v-list-item v-for="item in items" :key="item.id" link :to="{ name: 'Event', params: { eventId: item.id } }" class="border">
					<v-list-item-title>{{ item.title }}</v-list-item-title>
					<v-list-item-subtitle>{{ item.description }}</v-list-item-subtitle>
					<DateChip color="blue" label="Start" :date="item.start" />
					<DateChip color="red" label="End" :date="item.end" />
				</v-list-item>
			</v-list>
		</template>
		<template #cards-slot="{ items }">
			<v-row>
				<v-col cols="12" md="4" lg="3" v-for="item in items" :key="item.id">
					<v-card link :to="{ name: 'Event', params: { eventId: item.id }}" variant="flat" class="border">
						<v-card-title class="text-subtitle-1">{{ item.title }}</v-card-title>
						<v-card-subtitle>{{ item.description.slice(0, 100) }}...</v-card-subtitle>
						<v-card-text>
							<DateChip color="blue" label="Start"  :date="item.start" />
							<DateChip color="red" label="End" :date="item.end" />
						</v-card-text>
						<v-card-text>
							<TeacherChip label="Created by" :teacher="item.created_by_details" v-if="item.created_by_details" />
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</template>
	</ResponsiveDataTable>
</template>

<script setup>
import BatchSelect from "@/apps/batches/components/BatchSelect.vue";
import TeacherSelect from "@/apps/teachers/components/TeacherSelect.vue";
import DateRangeSelect from "@/components/DateRangeSelect.vue";
import DateChip from "@/components/DateChip.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { ref } from "vue";
import { getEvents } from "../api";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";

const filters = ref({});
</script>
