<template>
	<ResponsiveDataTable 
		:getToFunction="(item) => ({ name: 'Attachment', params: { attachmentId: item.id } })"
		:headers="attachmentDefaultHeaders" 
		:fetch="getAttachments" 
		v-model:filters="filters" 
		:templates="{ desktop: 'card', mobile: 'card' }"
		:title="title"
		:subtitle="subtitle">
		
		<template #filters-slot>
			<v-row>
				<v-col cols="12" sm="6" md="3" lg="2">
					<v-text-field label="Search by name" v-model="filters.name" />
				</v-col>
				<v-col cols="12" sm="6" md="3" lg="2">
					<v-text-field label="Search by file type" v-model="filters.file_type" />
				</v-col>
				<v-col cols="12" sm="6" md="4" lg="3">
					<DateRangeSelect
						:filters="filters"
						start-key="created_start"
						end-key="created_end"
						label="Created Date Range"
					/>
				</v-col>
			</v-row>
		</template>
		
		<template #cards-slot="{ items }">
			<v-row>
				<v-col cols="12" md="4" lg="3" v-for="item in items" :key="item.id">
					<v-card height="100%" link 
						:to="{ name: 'Attachment', params: { attachmentId: item.id } }" 
						variant="flat" class="border">
						<v-img :src="item.file" max-height="200" contain></v-img>
						<v-card-title class="text-subtitle-1">{{ item.name }}</v-card-title>
						<v-card-subtitle>{{ item.file_type }}</v-card-subtitle>
						<v-card-text>
							<v-chip color="primary">{{ formatDateTime(item.created_at) }}</v-chip>
						</v-card-text>
					</v-card>
				</v-col>
			</v-row>
		</template>
	</ResponsiveDataTable>
</template>

<script setup>
import DateRangeSelect from "@/components/DateRangeSelect.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { formatDateTime } from "@/services/utils";
import { ref } from "vue";
import { getAttachments } from "../api";
import { attachmentDefaultHeaders } from "../config";

const props = defineProps({
	title: {
		type: String,
		default: "Media",
	},
	subtitle: {
		type: String,
		default: "Click on any tile to view or delete",
	},
});

// Use a simple ref for filters like other components
const filters = ref({});
</script>
