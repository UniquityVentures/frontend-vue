<template>
	<!-- List template -->
	<v-data-table-server v-if="template === 'list'" :items-length="itemsLen" :headers="[]" :items="items"
		@update:options="fetchData" :search="filters ? JSON.stringify(filters) : ''" :loading="loading" 
		:items-per-page-options="itemsPerPageOptions" :hide-default-footer="hideFooter">
		<template #headers={}></template>
		<template #default>
			<v-list density="compact" v-if="template === 'list'">
				<v-list-item v-for="item in items" :key="item.id" class="border" :to="getToFunction(item)"
					link>
					<slot name="list-item-slot" :item="item">
						<v-list-item-title>
							{{ keyHandler(item, title) }}
						</v-list-item-title>
						<v-list-item-subtitle>
							{{ `${subtitle.label}: ${keyHandler(item, subtitle)}` }}
						</v-list-item-subtitle>
						<!-- Chips -->
						<div class="d-flex flex-wrap mt-1">
							<div v-for="header in data_headers">
								<v-chip v-if="header.type === 'string'">
									{{ `${header.label}: ${item[header.key]}` }}
								</v-chip>
								<!-- Date type -->
								<v-chip v-else-if="header.type === 'date'">
									{{ `${header.label}: ${formatDate(item[header.key])}` }}
								</v-chip>
								<!-- Status type -->
								<v-chip v-else-if="header.type === 'status'" :color="getStatusColor(item[header.key])">
									{{ `${header.label}: ${keyHandler(item, header)}` }}
								</v-chip>
								<!-- Custom format function -->
								<v-chip v-else-if="header.formatFunc">
									{{ `${header.label}: ${header.formatFunc(item[header.key])}` }}
								</v-chip>
								<!-- Custom Chips -->
								<TeacherChip v-else-if="header.type === 'teacher'" :teacher="keyHandler(item, header)"/>
								<BatchChip v-else-if="header.type === 'batch'" :batch="keyHandler(item, header)"/>
								<CourseChip v-else-if="header.type === 'course'" :course="keyHandler(item, header)"/>
								<v-chip v-else>
									{{ `${header.label}: ${keyHandler(item, header)}` }}
								</v-chip>
							</div>
						</div>
					</slot>
				</v-list-item>
			</v-list>
		</template>
	</v-data-table-server>

	<!-- Card template -->
	<v-data-table-server v-if="template === 'card'" :items-length="itemsLen" :headers="[]" :items="items"
		@update:options="fetchData" :search="filters ? JSON.stringify(filters) : ''" :loading="loading" 
		class="body-container" :items-per-page-options="itemsPerPageOptions" :hide-default-footer="hideFooter">
		<template #default>
			<div class="body-grid-container">
				<v-row no-gutters class="ma-1 pa-0">
					<v-col v-for="item in items" :key="item.id" cols="6" :md="props.forceMobile ? 6 : 3" :lg="props.forceMobile ? 6 : 2" class="pa-2">
						<slot name="card-item-slot" :item="item">
							<v-card height="100%" link :to="getToFunction(item)" variant="flat" class="border">
								<v-img 
									v-for="header in headers.filter((a) => a.type === 'image')"
									:src="item[header.key]" max-height="256" max-width="256"></v-img>
								<v-card-title class="text-subtitle-1">
									{{ keyHandler(item, title) }}
								</v-card-title>
								<v-card-subtitle>
									{{ `${subtitle.label}: ${keyHandler(item, subtitle)}` }}
								</v-card-subtitle>
								<v-card-text>
									<div v-for="header in data_headers">
										<div v-if="header.type === 'longstring'" class="mb-2">
											{{ item[header.key]?.length > 100 ? item[header.key].substring(0, 50) +
												'...' :
												item[header.key] }}
										</div>
										<v-chip v-else-if="header.type === 'string'">
											{{ `${header.label}: ${item[header.key]}` }}
										</v-chip>
										<!-- Active type -->
										<v-chip v-else-if="header.type === 'is_active'"
											:color="item[header.key] ? 'success' : 'error'">
											{{ `${header.label}: ${item[header.key] ? 'Active' : 'Inactive'}` }}
										</v-chip>
										<!-- Date type -->
										<v-chip v-else-if="header.type === 'date'">
											{{ `${header.label}: ${formatDate(item[header.key])}` }}
										</v-chip>
										<!-- Custom format function -->
										<v-chip v-else-if="header.formatFunc">
											<strong class="mr-2">{{ header.label }}: </strong>
											{{ header.formatFunc(item[header.key]) }}
										</v-chip>
										<!-- Custom Chips -->
										<TeacherChip v-else-if="header.type === 'teacher'" :teacher="keyHandler(item, header)"/>
										<BatchChip v-else-if="header.type === 'batch'" :batch="keyHandler(item, header)"/>
										<CourseChip v-else-if="header.type === 'course'" :course="keyHandler(item, header)"/>
										<v-chip v-else>
											{{ `${header.label}: ${keyHandler(item, header)}` }}
										</v-chip>
									</div>
								</v-card-text>
							</v-card>
						</slot>
					</v-col>
				</v-row>
			</div>
		</template>
	</v-data-table-server>
	<!-- Table template -->
	<v-data-table-server v-if="template === 'table'" :items-length="itemsLen" :headers="table_headers" :items="items"
		@update:options="fetchData" :search="JSON.stringify(filters)" :loading="loading" 
		:items-per-page-options="itemsPerPageOptions" :hide-default-footer="hideFooter">
		<template #headers>
			<tr>
				<th v-for="header in table_headers" :key="header.key"
					class="text-subtitle-1 text-primary-darken-1 py-3">
					{{ header.label }}
				</th>
			</tr>
		</template>
		<template #item="{ item }">
			<tr>
				<td v-for="header in table_headers" :key="header.key">
					<!-- Date type -->
					<span v-if="header.type === 'date'">
						{{ formatDate(item[header.key]) }}
					</span>
					<!-- Longstring type -->
					<span v-else-if="header.type === 'longstring'">
						{{ item[header.key]?.length > 100 ? item[header.key].substring(0, 50) + '...' : item[header.key]
						}}
					</span>
					<!-- Teacher type -->
					<span v-else-if="header.type === 'teacher'" class="d-flex align-center">
						<TeacherChip :teacher="item[header.key]" />
					</span>
					<!-- Batch type -->
					<span v-else-if="header.type === 'batch'">
						<BatchChip :batch="item[header.key]" />
					</span>
					<!-- Course type -->
					<span v-else-if="header.type === 'course'">
						<CourseChip :course="item[header.key]" />
					</span>
					<!-- Status type with colored chip -->
					<span v-else-if="header.type === 'status'">
						<v-chip :color="getStatusColor(item[header.key])" size="small" variant="outlined">
							{{ keyHandler(item, header) }}
						</v-chip>
					</span>
					<!-- Custom format function (existing logic) -->
					<span v-else-if="header.formatFunc">
						{{ header.formatFunc(item[header.key]) }}
					</span>
					<span v-else-if="header.key === 'actions'">
						<v-btn icon="mdi-arrow-right" size="x-small" link :to="getToFunction(item)" />
					</span>
					<!-- Default (existing logic) -->
					<span v-else>
						{{ keyHandler(item, header) }}
					</span>
				</td>
			</tr>
		</template>
	</v-data-table-server>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useDisplay } from "vuetify";
import { formatDate, keyHandler } from "@/services/utils";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";
import BatchChip from "@/apps/batches/components/BatchChip.vue";
import CourseChip from "@/apps/courses/components/CourseChip.vue";

const props = defineProps({
	headers: {
		type: Array,
		default: () => [],
	},
	fetch: {
		type: Function,
		required: true,
	},
	getToFunction: {
		type: Function,
	},
	desktopTemplate: {
		type: String,
		default: "table",
	},
	mobileTemplate: {
		type: String,
		default: "list",
	},
	forceMobile: {
		// list is already mobile friendly, table will never be used in mobile.
		// this setting is for the card template to set up the columns properly
		type: Boolean,
		default: false,
	},
	hideFooter: {
		type: Boolean,
		default: false,
	},	
});

// Template Handling
const { mobile } = useDisplay();
const template = ref(
	mobile.value ? props.mobileTemplate : props.desktopTemplate,
);
// Watch for changes in mobile state and update template accordingly
watch(mobile, (newValue) => {
	template.value = newValue ? props.mobileTemplate : props.desktopTemplate;
});

// Header Handling
// first header is the title and the second header is the subtitle for card and list templates
const title = ref(props.headers[0]);
const subtitle = ref(props.headers[1]);
// data headers are all headers except the title and subtitle
const data_headers = computed(() =>
	props.headers.slice(2, props.headers.length),
);
// table headers are all headers + actions header
const table_headers = computed(() => [
	...props.headers,
	{ label: "Actions", key: "actions", sortable: false, type: "actions" },
]);

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

// Filters Handling
const filters = defineModel('filters');
const convertFiltersForBackend = (filters) => {
	return Object.fromEntries(
		Object.entries(filters)
			.filter(([_, value]) => (typeof value === "boolean" ? true : value))
			.map(([key, value]) => {
				if (typeof value === "boolean") {
					return [key, value ? "True" : "False"];
				}
				return [key, value];
			}),
	);
};

// Fetch Data
const fetchData = async ({ page, itemsPerPage, search }) => {
	loading.value = true;
	const filterParams = {
		...convertFiltersForBackend(
			typeof search === "string" ? JSON.parse(search) : search.value,
		),
		page_size: itemsPerPage || 10,
		page: page || 1,
	};
	const { results, total_records } = await props.fetch(filterParams);
	items.value = results;
	itemsLen.value = total_records;
};

onMounted(() => {
	fetchData({ search: filters });
});
</script>

<style scoped>
.body-grid-container {
	width: 100%;
	overflow: hidden;
}

.body-container :deep(.v-table__wrapper) {
	overflow: visible;
}
</style>
