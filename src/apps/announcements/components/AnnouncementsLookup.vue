<template>
  <v-card variant="flat">
    <v-card-title>
      <FilterCard 
        :fields="fields"
        :exportFunction="exportAnnouncements"
      /> 
    </v-card-title>
    <ResponsiveDataTable 
      :getToFunction="(item) => ({name: 'Announcement', params: {announcementId: item.id}})" 
      :headers="announcementHeaders" 
      :fetch="getAnnouncements" 
      v-model="filters"
    />
  </v-card>
</template>

<script setup> 
import { ref, computed } from "vue";
import { getAnnouncements, exportAnnouncements, announcementHeaders } from "../api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import FilterCard from "@/components/FilterCard.vue";

const defaultFields = [
	{
		label: "Search by title",
		type: "string",
		key: "title",
		value: "",
		defaultValue: "",
	},
	{
		label: "Filter by classroom",
		type: "classroom",
		key: "classroom",
		value: null,
	},
	{
		label: "Filter by subject",
		type: "subject",
		key: "subject",
		value: null,
	},
	{
		label: "Filter by signer",
		type: "teacher",
		key: "signed_by",
		value: null,
	},
	{
		label: "Is School Wide",
		type: "n_nary",
		key: "is_school_wide",
		value: null,
		fetchOptions: () => [
			{ title: "All Announcements", value: null },
			{ title: "School Wide Only", value: "True" },
			{ title: "Non-School Wide Only", value: "False" },
		],
	},
	{
		label: "Is Released",
		type: "boolean",
		key: "is_released",
		value: null,
	},
	{
		label: "Is Expired",
		type: "boolean",
		key: "is_expired",
		value: null,
	},
	{
		label: "Release Date Range",
		type: "dates",
		key: ["released_start", "released_end"],
		value: null,
	},
	{
		label: "Expiry Date Range",
		type: "dates",
		key: ["expired_start", "expired_end"],
		value: null,
	},
];

const props = defineProps({
	initialFields: {
		type: Array,
		default: () => ([]),
	},
});

// Initialize fields with any overrides from props
const fields = ref(defaultFields.map(defaultField => {
	const override = props.initialFields.find(f => f.key === defaultField.key);
	return override ? { ...defaultField, ...override } : defaultField;
}));

const filters = computed(() => {
	return fields.value.reduce((acc, field) => {
		if (Array.isArray(field.key)) {
			// Handle date ranges
			field.key.forEach((k, i) => {
				acc[k] = field.value?.[i] ?? null;
			});
		} else {
			acc[field.key] = field.value;
		}
		return acc;
	}, {});
});
</script>
