<template>
	<v-card>
		<v-card-title v-if="title">{{ title }}</v-card-title>
		<v-card-subtitle v-if="subtitle">{{ subtitle }}</v-card-subtitle>
		<v-card-text>
			<v-card variant="flat" class="border">
				<v-card-text class="mt-2">
					<slot name="filters-slot" :filters="filters">
						<!-- filters slot -->
					</slot>
				</v-card-text>
			</v-card>
		</v-card-text>
		<v-card-text>
			<!-- List template -->
			<v-data-table-server v-if="template === 'list'" :items-length="itemsLen" :items="items"
				@update:options="fetchData" :loading="loading" 
				:items-per-page-options="itemsPerPageOptions" :hide-default-footer="hideFooter">
				<template #default>
					<slot name="list-slot" :items="items">
						<!-- list slot -->
					</slot>
				</template>
			</v-data-table-server>

			<!-- Card template -->
			<v-data-table-server v-if="template === 'card'" :items-length="itemsLen" :items="items"
				@update:options="fetchData" :loading="loading" 
				class="body-container" :items-per-page-options="itemsPerPageOptions" :hide-default-footer="hideFooter">
				<template #default>
					<slot name="cards-slot" :items="items">
						<v-row>
							<v-col cols="12" md="4" lg="3" v-for="item in items" :key="item.id">
								<slot name="card-slot" :item="item" />
							</v-col>
						</v-row>
						<!-- cards slot -->
					</slot>
				</template>
			</v-data-table-server>
			<!-- Table template -->
			<v-data-table-server v-if="template === 'table'" :items-length="itemsLen" :items="items"
				@update:options="fetchData" :loading="loading" 
				:items-per-page-options="itemsPerPageOptions" :hide-default-footer="hideFooter">
				<template #default>
					<slot name="table-slot" :items="items">
						<!-- table slot -->
					</slot>
				</template>
			</v-data-table-server>
		</v-card-text>
	</v-card>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { useDisplay } from "vuetify";

const props = defineProps({
	title: {
		type: String,
		default: "",
	},
	subtitle: {
		type: String,
		default: "",
	},
	fetch: {
		type: Function,
		required: true,
	},
	templates: {
		type: Object,
		default: () => ({
			desktop: "list",
			mobile: "list",
		}),
	},
	hideFooter: {
		type: Boolean,
		default: false,
	},	
});

//
const filters = defineModel('filters');

// Template Handling
const { mobile } = useDisplay();
const template = ref(mobile.value ? props.templates.mobile : props.templates.desktop);

// Watch for changes in mobile state and update template accordingly
watch(mobile, (newValue) => {
	template.value = newValue ? props.templates.mobile : props.templates.desktop;
});

// Removed 'all' from items per page options
const itemsPerPageOptions = [
	{ value: 10, title: "10" },
	{ value: 20, title: "20" },
	{ value: 50, title: "50" },
	{ value: 100, title: "100" },
];

const loading = ref(false);
const itemsLen = ref(10);
const items = ref([]);

// Fetch Data
const fetchData = async ({ page, itemsPerPage }) => {
	loading.value = true;
	const filterParams = {
		...filters.value,
		page_size: itemsPerPage,
		page: page,
	};
	const { results, total_records } = await props.fetch(filterParams);
	items.value = results;
	itemsLen.value = total_records;
	loading.value = false;
};

watch(filters, () => {
	fetchData({ page: 1, itemsPerPage: 10 });
}, { deep: true });

onMounted(() => {
	fetchData({ page: 1, itemsPerPage: 10 });
});
</script>
