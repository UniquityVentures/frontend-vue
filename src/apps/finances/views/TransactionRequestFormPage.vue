<template>
	<!--- Probably need to rename from request to something else -->
	

</template>

<script setup>
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
