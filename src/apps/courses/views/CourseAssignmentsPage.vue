<template>
    <v-container v-if="course">
        <v-btn prepend-icon="mdi-plus" color="accent" :to="{ name: 'CreateAssignment', query: {course: course.id} }">
            Create New Assignment</v-btn>
        <v-btn prepend-icon="mdi-view-list" color="grey-darken-2" :to="{ name: 'Assignments', query: {course: course.id} }">
            View All Assignments</v-btn>
        <v-divider/>
        <ResponsiveDataTable :fetch="getAssignments" v-model:filters="filters" title="Assignments"
        :subtitle="`Assignments for course: ${course.name} (${course.code})`">
            <template #filters-slot>
                <v-row>
                    <v-col cols="12" sm="6" md="3" lg="2">
                        <v-text-field label="Search by title" v-model="filters.title" />
                    </v-col>
                    <v-col cols="12" sm="6" md="4" lg="3">
                        <DateRangeSelect
                            v-model:start="filters.due_start"
                            v-model:end="filters.due_end"
                            label="Due Date Range"
                        />
                    </v-col>
                </v-row>
            </template>
            <template #cards-slot="{ items }">
                <v-row>
                    <v-col cols="12" md="4" lg="3" v-for="item in items" :key="item.id">
                        <v-card height="100%" link :to="{ name: 'Assignment', params: { assignmentId: item.id }}" variant="flat" class="border">
                            <v-card-title class="text-subtitle-1">{{ item.title }}</v-card-title>
                            <v-card-subtitle class="text-wrap">{{ item.description?.slice(0, 100) }}...</v-card-subtitle>
                            <v-card-text>
                                <v-chip color="green">Release: {{ formatDateTime(item.release_at) }}</v-chip>
                                <v-chip color="red">Due: {{ formatDateTime(item.due_at) }}</v-chip>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </template>
            <template #list-slot="{ items }">
                <v-list lines="three">
                    <v-list-item link :to="{ name: 'Assignment', params: { assignmentId: item.id }}" v-for="item in items" :key="item.id" class="border">
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                        <v-list-item-subtitle class="text-wrap">{{ item.description }}</v-list-item-subtitle>
                        <v-list-item-subtitle>
                            <v-chip color="green" size="small">Release: {{ formatDateTime(item.release_at) }}</v-chip>
                            <v-chip color="red" size="small">Due: {{ formatDateTime(item.due_at) }}</v-chip>
                        </v-list-item-subtitle>
                    </v-list-item>
                </v-list>
            </template>
        </ResponsiveDataTable>
    </v-container>
</template>

<script setup>
import { getAssignments } from "@/apps/assignments/api";
import { getCourse } from "@/apps/courses/api";
import DateRangeSelect from "@/components/DateRangeSelect.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { formatDateTime } from "@/services/utils";
import { onMounted, ref } from "vue";

const props = defineProps({
	courseId: {
		type: [String, Number],
		required: true,
	},
});

const course = ref(null);
const filters = ref({ course: props.courseId });

onMounted(async () => {
	course.value = await getCourse(props.courseId);
});
</script>
