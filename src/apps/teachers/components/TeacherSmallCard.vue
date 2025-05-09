<script setup>
import { onMounted, ref } from "vue";
import { getTeacher} from "../api";
import { getPortraitImage } from "../api";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const role = authStore.getRole;

const props = defineProps({
	teacher: {
		type: Object,
	},
	teacherId: {
		type: [Number, String],
	},
});

const teacher = ref(null);

onMounted(async () => {
	if (props.teacherId) {
		teacher.value = await getTeacher(props.teacherId);
	} else {
		teacher.value = props.teacher;
	}
});
</script>

<template>
    <v-card v-if="teacher"
    height="100%" link :to="{ name: 'Teacher', params: { teacherId: teacher.id }}" variant="flat" class="border">
		<template #prepend>
			<v-avatar size="48">
				<v-img :src="getPortraitImage()" />
			</v-avatar>
		</template>
        <v-card-title class="text-subtitle-1">{{ teacher.user_details.full_name }}</v-card-title>
        <v-card-subtitle>{{ teacher.identifier }}</v-card-subtitle>
		<v-card-text v-if="role == 'Admin'">
			<v-chip label :color="teacher.user_details.is_active ? 'success' : 'error'">{{ teacher.user_details.is_active ? 'Active' : 'Inactive' }}</v-chip>
			<v-chip label :color="teacher.user_details.is_approved ? 'success' : 'error'">{{ teacher.user_details.is_approved ? 'Approved' : 'Not Approved' }}</v-chip>
		</v-card-text>
	</v-card>
</template>
