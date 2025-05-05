<template>
	<v-container>
		<v-card class="mb-2">
			<v-card-title>
				Teacher
			</v-card-title>
			<v-card-subtitle>
				Update User Info
			</v-card-subtitle>
			<v-card-text>
				<UserForm
					:action="handleUpdateUser"
					v-model="user"
					actionName="Update User"
					title="Teacher User"
					subtitle="Update the user account for the teacher"
				/>
			</v-card-text>
		</v-card>
		<v-card>
			<v-card-title>
				Teacher
			</v-card-title>
			<v-card-subtitle>
				Update Other Details
			</v-card-subtitle>
			<v-card-text>
				<TeacherForm
					v-if="teacher && user"
					:teacher="teacher"
					:user="user"
					:action="handleUpdateTeacher"
					actionName="Update"
					title="Teacher"
					subtitle="Edit teacher details"
				/>
			</v-card-text>
		</v-card>
	</v-container>
</template>

<script setup>
import { getUser, updateUser } from "@/apps/users/api";
import { onMounted, ref } from "vue";
import { getTeacher, updateTeacher } from "../api";
import TeacherForm from "../components/TeacherForm.vue";
import UserForm from "@/apps/users/components/UserForm.vue";

const props = defineProps({
	teacherId: {
		type: Number,
		required: true,
	},
});

const teacher = ref(null);
const user = ref(null);

const handleUpdateTeacher = async (formData) => {
	try {
		await updateTeacher(formData);
		return { success: true };
	} catch (error) {
		console.error("Failed to update teacher:", error);
		return { success: false, error };
	}
};

onMounted(async () => {
	teacher.value = await getTeacher(props.teacherId);
	user.value = await getUser(teacher.value.user);
	console.log(teacher.value);
	console.log(user.value);
});

const handleUpdateUser = async (userData) => {
	try {
		user.value = await updateUser(userData);
		return { success: true };
	} catch (error) {
		console.error("Failed to create user:", error);
		return { success: false, error };
	}
};
</script>
