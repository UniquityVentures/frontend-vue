<template>
    <v-card>
        <v-card-title>
            {{ title }}
        </v-card-title>
        <v-card-subtitle>
            {{ subtitle }}
        </v-card-subtitle>
        <ResponsiveDataTable 
            :getToFunction="(item) => ({name: 'Course', params: {courseId: item.id}})" 
            :headers="courseDefaultHeaders" 
            :fetch="getCourses" 
            v-model:filters="props.filters"
            desktopTemplate="card"
            mobileTemplate="card"
            forceMobile>
            <template #card-item-slot="{ item }">
                <v-card class="border" variant="flat" :to="{name: 'Course', params: {courseId: item.id}}">
                    <v-card-title class="text-subtitle-1">
                        {{ item.name }}
                    </v-card-title>
                    <v-card-subtitle>
                        {{ item.code }}
                    </v-card-subtitle>
                </v-card>
            </template>
        </ResponsiveDataTable>
    </v-card>
</template>

<script setup>
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { getCourses } from "../api";
import { onMounted } from "vue";
import { courseDefaultHeaders } from "../config";

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

onMounted(() => {
	console.log(props.filters);
});
</script>
