<template>
	<v-card>
		<v-card-title>
			{{ title }}
		</v-card-title>
		<v-card-subtitle>
			{{ subtitle }}
		</v-card-subtitle>

		<v-row>
			<v-col>
				<FilterCard :fields="fields" />
			</v-col>
			<v-col>
				<StatsCard :fetchStats="getAttachmentStats" title="Attachments" />
			</v-col>
		</v-row>
		<v-row>
			<ResponsiveDataTable :getToFunction="(item) => ({ name: 'Attachment', params: { attachmentId: item.id } })"
				:headers="attachmentDefaultHeaders" :fetch="getAttachments" v-model="filters" :desktopTemplate="props.overrideDesktopTemplate"
				mobileTemplate="card" />
		</v-row>
	</v-card>
</template>

<script setup>
import FilterCard from "@/components/FilterCard.vue";
import {
	attachmentDefaultFilterFields,
	attachmentDefaultHeaders,
} from "../config";
import { getAttachments, getAttachmentStats } from "../api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import StatsCard from "@/components/StatsCard.vue";

import { computed, ref } from "vue";

const props = defineProps({
	title: {
		type: String,
		default: "Media",
	},
	subtitle: {
		type: String,
		default: "Click on any tile to view or delete",
	},
	overrideFields: {
		type: Array,
	},
	overrideDesktopTemplate: {
		type: String,
		default: "card",
	},
});

const fields = ref(
	props.overrideFields ? props.overrideFields : attachmentDefaultFilterFields,
);

const filters = computed(() => {
	return fields.value.reduce((acc, field) => {
		if (Array.isArray(field.key)) {
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
