<template>
    <ResponsiveDataTable 
        :title="title"
        :subtitle="subtitle"
        :fetch="getCourses" 
        v-model:filters="props.filters"
        :templates="{ desktop: 'card', mobile: 'card' }"
        forceMobile
        hideFilters>
        <template #cards-slot="{ items }">
            <v-row>
                <v-col cols="12" md="4" lg="3" v-for="item in items" :key="item.id">
                    <v-card class="border" variant="flat" :to="accountRoute( 'Course', { params: {courseId: item.id}})">
                        <v-card-title class="text-subtitle-1">
                            {{ item.name }}
                        </v-card-title>
                        <v-card-subtitle>
                            {{ item.code }}
                        </v-card-subtitle>
                    </v-card>
                </v-col>
            </v-row>
        </template>
    </ResponsiveDataTable>
</template>

<script setup>
import {accountRoute} from "@/services/api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { getCourses } from "../api";

const props = defineProps({
	filters: {
		type: Object,
		default: {},
	},
	title: {
		type: String,
		default: "Courses",
	},
	subtitle: {
		type: String,
		default: "Courses",
	},
});

</script>
