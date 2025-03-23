<template>
	<v-container>
		<FormCard
			v-if="stage===1"
			title="Teacher"
			actionName="Create"
			:formFields="userFormFields"
			:action="handleCreateUser"
		/>

		<FormCard
			v-if="stage===2"
			title="Teacher"
			actionName="Create"
			:formFields="teacherFormFields"
			:action="handleCreateTeacher"
		/>
	</v-container>
</template>

<script setup>
import FormCard from "@/components/FormCard.vue";
import { ref } from "vue";
import { createTeacher } from "../api";
import { createUser } from "@/apps/users/api";
import { FIELD_TYPES } from "@/components/FieldTypeDefinitions";
import { useRouter } from "vue-router";

const stage = ref(1);

const user = ref({});

const userFormFields = ref([
	{
		label: "First Name",
		key: "first_name",
		type: FIELD_TYPES.STRING,
	},
	{
		label: "Last Name",
		key: "last_name",
		type: FIELD_TYPES.STRING,
	},
	{
		label: "Username",
		key: "username",
		type: FIELD_TYPES.STRING,
	},
	{
		label: "E-Mail",
		key: "email",
		type: FIELD_TYPES.STRING,
	},
	{
		label: "Is Active",
		key: "is_active",
		type: FIELD_TYPES.BOOLEAN,
		defaultValue: true,
	},
	{
		label: "Is Approved",
		key: "is_approved",
		type: FIELD_TYPES.BOOLEAN,
		defaultValue: false,
	},
]);

const teacherFormFields = ref([
	{
		label: "Identifier Number",
		key: "identifier",
		type: FIELD_TYPES.INTEGER,
	},
	{
		label: "Phone",
		key: "phone",
		type: FIELD_TYPES.STRING,
	},
	{
		label: "Whatsapp",
		key: "whatsapp",
		type: FIELD_TYPES.STRING,
	},
]);

const handleCreateUser = async (userData) => {
	user.value = await createUser(userData);
	stage.value += 1;
	return user.value;
};

const router = useRouter();

const handleCreateTeacher = async (teacherData) => {
	const teacher = await createTeacher({ ...teacherData, user: user.value.id });
	console.log(teacher)
	router.push({ name: "Teacher", params: { teacherId: teacher.id } });
	return teacher;
};
</script>
