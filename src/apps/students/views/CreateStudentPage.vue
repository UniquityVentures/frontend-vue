<template>
	<v-container>
		<FormCard
			v-if="stage===1"
			title="Student"
			actionName="Create"
			:formFields="userFormFields"
			:action="handleCreateUser"
		/>

		<FormCard
			v-if="stage===2"
			title="Student"
			actionName="Create"
			:formFields="studentFormFields"
			:action="handleCreateStudent"
		/>
	</v-container>
</template>

<script setup>
import FormCard from "@/components/FormCard.vue";
import { ref } from "vue";
import { createStudent } from "../api";
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

const studentFormFields = ref([
	{
		label: "Student Number",
		key: "student_no",
		type: FIELD_TYPES.STRING,
	},
	{
		label: "Batch",
		key: "batch",
		type: FIELD_TYPES.BATCH,
	},
	{
		label: "roll_no",
		key: "roll_no",
		type: FIELD_TYPES.STRING,
	},
	{
		label: "First Guardian's Name",
		key: "guardian1_name",
		type: FIELD_TYPES.STRING,
	},
	{
		label: "First Guardian's Email",
		key: "guardian1_email",
		type: FIELD_TYPES.STRING,
	},
	{
		label: "First Guardian's Phone",
		key: "guardian1_phone",
		type: FIELD_TYPES.STRING,
	},
	{
		label: "First Guardian's Whatsapp",
		key: "guardian1_whatsapp",
		type: FIELD_TYPES.STRING,
	},
	{
		label: "Second Guardian's Name",
		key: "guardian2_name",
		type: FIELD_TYPES.STRING,
	},
	{
		label: "Second Guardian's Email",
		key: "guardian2_email",
		type: FIELD_TYPES.STRING,
	},
	{
		label: "Second Guardian's Phone",
		key: "guardian2_phone",
		type: FIELD_TYPES.STRING,
	},
	{
		label: "Second Guardian's Whatsapp",
		key: "guardian2_whatsapp",
		type: FIELD_TYPES.STRING,
	},
]);

const handleCreateUser = async (userData) => {
	user.value = await createUser(userData);
	stage.value += 1;
	return user.value;
};

const router = useRouter();

const handleCreateStudent = async (studentData) => {
	const student = await createStudent({ ...studentData, user: user.value.id });
	console.log(student)
	router.push({ name: "Student", params: { studentId: student.id } });
	return student;
};
</script>
