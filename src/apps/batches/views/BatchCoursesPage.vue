<template>
    <v-container v-if="batch">
        <ResponsiveDataTable :fetch="getCourses" v-model:filters="filters"
        title="Courses" :subtitle="`Courses for ${batch.name}`">
            <template #filters-slot>
                <v-row>
                    <v-col cols="12" sm="6" md="3" lg="2">
                        <v-text-field label="Search by name" v-model="filters.name" />
                    </v-col>
                    <v-col cols="12" sm="6" md="3" lg="2">
                        <v-text-field label="Search by code" v-model="filters.code" />
                    </v-col>
                </v-row>
            </template>
            <template #cards-slot="{ items }">
                <v-row>
                    <v-col cols="12" md="3" lg="2" v-for="item in items" :key="item.id">
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
                            <v-chip prepend-icon="mdi-account-group" color="primary">
                                Students: {{ item.students?.length || 0 }}
                            </v-chip>
                        </v-list-item-text>
                    </v-list-item>
                </v-list>
            </template>
        </ResponsiveDataTable>
    </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getCourses } from "@/apps/courses/api";
import { getBatch } from "@/apps/batches/api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";

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