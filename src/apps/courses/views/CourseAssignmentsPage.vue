<template>
    <v-container>
        <v-card variant="flat">
            <v-card-title>
                Assignments for {{ course?.name }}
            </v-card-title>
            <v-card-text>
                <FilterCard :fields="fields" />
                <ResponsiveDataTable
                    :getToFunction="(item) => ({ name: 'Assignment', params: { assignmentId: item.id } })"
                    :headers="assignmentDefaultHeaders"
                    :fetch="getAssignments"
                    v-model="filters"
                />
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { getCourse } from "@/apps/courses/api";
import { getAssignments } from "@/apps/assignments/api";
import { assignmentDefaultHeaders, assignmentDefaultFilterFields } from "@/apps/assignments/config";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import FilterCard from "@/components/FilterCard.vue";

const props = defineProps({
	courseId: {
		type: String,
		required: true,
	},
});

const course = ref(null);

const fields = ref(assignmentDefaultFilterFields.map(field => ({
	...field,
	disabled: field.key === 'course',
	hidden: field.key === 'course',
	value: field.key === 'course' ? Number(props.courseId) : field.value,
})));

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

onMounted(async () => {
	course.value = await getCourse(props.courseId);
});
</script>
