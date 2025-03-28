<template>
    <v-container v-if="batch" class="columns-container">
        <ResponsiveDataTable :fetch="getCourses" v-model:filters="filters"
        title="Courses" :subtitle="`Courses for ${batch.name}`" class="column-item" 
        :templates="{ desktop: 'list', mobile: 'list' }" hideFilters >
            <template #filters-slot>
                <v-text-field label="Search" v-model="filters.name" />
            </template>
            <template #cards-slot="{ items }">
                <v-row>
                    <v-col cols="12" v-for="item in items" :key="item.id">
                        <v-card link :to="{ name: 'Course', params: { courseId: item.id }}" variant="flat" class="border">
                            <v-card-title class="text-subtitle-1">{{ item.name }}</v-card-title>
                            <v-card-subtitle>{{ item.code }}</v-card-subtitle>
                            <v-card-text>
                                <TeacherChip :teacherId="item.main_teacher" />
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </template>
            <template #list-slot="{ items }">
                <v-list lines="three">
                    <v-list-item v-for="item in items" :key="item.id" class="border">
                        <v-list-item-title>{{ item.name }}</v-list-item-title>
                        <v-list-item-subtitle class="text-wrap">{{ item.code }}</v-list-item-subtitle>
                        <v-list-item-text>
                            <TeacherChip label="Main Teacher" :teacher="item.main_teacher_details" v-if="item.main_teacher_details" />
                        </v-list-item-text>
                    </v-list-item>
                </v-list>
            </template>
        </ResponsiveDataTable>
        <v-card class="column-item">
            <v-card-title>Add Courses to Batch</v-card-title>
            <v-card-subtitle color="error">Select courses to add to this batch</v-card-subtitle>
            <v-card-text>
                <CourseSelect multiple />
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary">Add Selected Courses to Batch</v-btn>
            </v-card-actions>
        </v-card>
        <v-card class="column-item">
            <v-card-title>Remove Courses from Batch</v-card-title>
            <v-card-subtitle color="error">Select courses to remove from this batch</v-card-subtitle>
            <v-card-text>
                <CourseSelect multiple :filters="{ batches: props.batchId }"/>
            </v-card-text>
            <v-card-actions>
                <v-btn color="error">Remove Selected Courses from Batch</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCourses } from "@/apps/courses/api";
import { getBatch } from "@/apps/batches/api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";
import CourseSelect from "@/apps/courses/components/CourseSelect.vue";

const props = defineProps({
    batchId: {
        type: String,
        required: true,
    },
});

const batch = ref(null);
const filters = ref({ batches: props.batchId });

onMounted(async () => {
    batch.value = await getBatch(props.batchId);
});
</script>