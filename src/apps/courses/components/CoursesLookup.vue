<template>
    <ResponsiveDataTable :fetch="getCourses" v-model:filters="filters"
        :title="title" :subtitle="subtitle" :templates="{ desktop: 'card', mobile: 'card' }">
        <template #filters-slot>
            <v-row>
                <v-col cols="12" sm="6" md="3" lg="2">
                    <v-text-field label="Search by name" v-model="filters.name" />
                </v-col>
                <v-col cols="12" sm="6" md="3" lg="2">
                    <TeacherSelect v-model="filters.main_teacher" label="Main Teacher" />
                </v-col>
                <v-col cols="12" sm="6" md="3" lg="2">
                    <BatchSelect v-model="filters.batches" label="Batch" />
                </v-col>
                <v-col cols="12" sm="6" md="3" lg="2">
					<SortingInput v-model:order="filters.ordering" v-model:field="filters.sort_by" :get-sortable-fields="courseFields" />
                </v-col>
            </v-row>
        </template>
        <template #cards-slot="{ items }">
            <v-row>
                <v-col cols="6" md="3" lg="2" v-for="item in items" :key="item.id">
                    <v-card link :to="{ name: 'Course', params: { courseId: item.id }}" variant="flat" class="border">
                        <v-card-title class="text-subtitle-1">{{ item.name }}</v-card-title>
                        <v-card-subtitle>{{ item.code }}</v-card-subtitle>
						<v-card-text>
							<template v-if="authStore.getRole !== 'Student'" >
								<BatchChip v-for="batchId in item.batches" v-bind:key="batchId" :batchId="batchId" />
							</template>
                            <TeacherChip :teacherId="item.main_teacher" />
                        </v-card-text>
					</v-card>
                </v-col>
            </v-row>
        </template>
    </ResponsiveDataTable>
</template>

<script setup>
import BatchChip from "@/apps/batches/components/BatchChip.vue";
import BatchSelect from "@/apps/batches/components/BatchSelect.vue";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";
import TeacherSelect from "@/apps/teachers/components/TeacherSelect.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { ref } from "vue";
import { getCourses, courseFields } from "../api";
import { useAuthStore } from "@/stores/auth";
import SortingInput from "@/components/SortingInput.vue";

const authStore = useAuthStore();
const filters = defineModel('filters', { required: false, default: () => ({}) });

const props = defineProps({
    title: {
        type: String,
        required: false,
        default: "Courses",
    },
    subtitle: {
        type: String,
        required: false,
        default: "Courses",
    },
});
</script>
