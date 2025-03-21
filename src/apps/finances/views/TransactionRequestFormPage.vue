<template>
	<!--- Probably need to rename from request to something else -->
	<FormCard title="Transaction" actionName="Request" :formFields="formFields" :action= "createTransaction" :preprocess="preprocessRequest"/>
	

</template>

<script setup>
import { FIELD_TYPES } from "@/components/FieldTypeDefinitions";
import FormCard from "@/components/FormCard.vue";
import { createTransaction } from "../api";
import { ref } from "vue";

const preprocessRequest = (data) => {
	data.amount *= -100;
	return data;
};

const formFields = ref([
	{
		label: "Student",
		type: FIELD_TYPES.STUDENT,
		key: "student",
		required: true,
	},
	{ label: "Amount (INR)", type: FIELD_TYPES.INTEGER, key: "amount" },
	{ label: "Purpose", type: FIELD_TYPES.PAYMENT_PURPOSE, key: "purpose" },
]);
</script>
