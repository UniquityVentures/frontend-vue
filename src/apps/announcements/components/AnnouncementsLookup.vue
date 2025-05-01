<template>
    <ResponsiveDataTable :fetch="getAnnouncements" v-model:filters="filters"
    title="Announcements" subtitle="Announcements Master List">
        <template #filters-slot>
            <v-row >
                <v-col cols="12" sm="6" md="3" lg="2">
                    <v-text-field label="Search by title" v-model="filters.title" />
                </v-col>
                <v-col cols="12" sm="12" md="6" lg="4">
                    <v-text-field label="Search by description" v-model="filters.description" />
                </v-col>
                <v-col cols="12" sm="6" md="3" lg="2">
                    <TeacherSelect v-model="filters.signed_by" label="Signed by" />
                </v-col>
                <v-col cols="12" sm="6" md="3" lg="2">
                    <BatchSelect v-model="filters.batch" label="Batch" />
                </v-col>
                <v-col cols="12" sm="6" md="3" lg="2">
                    <CourseSelect v-model="filters.course" label="Course" />
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="3">
                    <DateRangeSelect 
                        v-model:start="filters.released_start"
                        v-model:end="filters.released_end"
                        label="Release Date Range" 
                    />
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="3">
                    <DateRangeSelect 
                        v-model:start="filters.expired_start"
                        v-model:end="filters.expired_end"
                        label="Expiry Date Range" 
                    />
                </v-col>
                <v-col cols="12" sm="6" md="3" lg="2">
                    <CheckBox v-model="filters.is_school_wide" label="Is School Wide" />
                </v-col>
            </v-row>
        </template>
        <template #cards-slot="{ items }">
            <v-row>
                <v-col cols="12" md="4" lg="3" v-for="item in items" :key="item.id">
                    <v-card height="100%" link :to="{ name: 'Announcement', params: { announcementId: item.id }}" variant="flat" class="border">
                        <v-card-title class="text-subtitle-1">{{ item.title }}</v-card-title>
                        <v-card-subtitle class="text-wrap">{{ item.description.slice(0, 100) }}...</v-card-subtitle>
                        <v-card-text>
                            <TeacherChip label="Signed by" :teacher="item.signed_by_details" v-if="item.signed_by_details" />
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </template>
        <template #list-slot="{ items }">
            <v-list lines="three">
                <v-list-item link :to="{ name: 'Announcement', params: { announcementId: item.id }}" v-for="item in items" :key="item.id" class="border">
                    <v-list-item-title>{{ item.title }}</v-list-item-title>
                    <v-list-item-subtitle class="text-wrap">{{ item.description }}</v-list-item-subtitle>
					<TeacherChip label="Signed by" :teacher="item.signed_by_details" v-if="item.signed_by_details" />
                </v-list-item>
            </v-list>
        </template>
        <template #actions-slot>
            <ExportButton :exportFunction="exportAnnouncements" title="Export Data in this Table" v-model:filters="filters" />
            <v-btn variant="text" color="accent" :to="{ name: 'CreateAnnouncement' }">Create New Announcement</v-btn>
        </template>
    </ResponsiveDataTable>
</template>

<script setup>
import BatchSelect from "@/apps/batches/components/BatchSelect.vue";
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";
import TeacherSelect from "@/apps/teachers/components/TeacherSelect.vue";
import ExportButton from "@/components/ExportButton.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { ref, computed, onMounted } from "vue";
import DateRangeSelect from "../../../components/DateRangeSelect.vue";
import { exportAnnouncements, getAnnouncements } from "../api";
import CourseSelect from "@/apps/courses/components/CourseSelect.vue";
import CheckBox from "@/components/CheckBox.vue";

const props = defineProps({
	defaultFilters: {
		type: Object,
		required: false,
	},
});

const filters = ref({
	sort_by: "release_at",
});

onMounted(() => {
	if (props.defaultFilters) {
		filters.value = { ...filters.value, ...props.defaultFilters };
		console.log(filters.value);
	}
})
</script>
