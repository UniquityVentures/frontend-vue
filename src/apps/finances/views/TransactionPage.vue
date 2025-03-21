<template>
	<v-container>
		<v-row>
			<v-col lg="8">
				<v-card variant="flat">
					<v-card-title>{{ transaction?.purpose_details?.name }}</v-card-title>
					<v-card-subtitle>{{ transaction?.purpose_details?.description }}</v-card-subtitle>
					<v-card-text>
						<h4 class="text-subtitle-1 mt-4">
							Amount: ₹{{ transaction?.amount / 100 }} 
						</h4>
						{{ formatDate(transaction?.datetime) }}
					</v-card-text>
				</v-card>
			</v-col>
			<v-col lg="8">
				<v-card variant="flat">
					<v-card-title>Payee Details</v-card-title>
					<v-card-subtitle>{{transaction?.payee_details?.name}}</v-card-subtitle>
					<v-card-text>{{transaction?.payee_details?.email}}
					</v-card-text>
				</v-card>
			</v-col>
			<v-col lg="8">
				<v-card variant="flat">
					<v-card-title>Student Details</v-card-title>
					<v-card-subtitle>{{transaction?.payee_details?.name}}</v-card-subtitle>
					<v-card-text>{{transaction?.payee_details?.email}}
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getTransaction } from "../api";
import { formatDate } from "@/services/utils";

const transaction = ref({});

const props = defineProps({
	transactionId: {
		type: Number,
		required: true,
	},
});

onMounted(async () => {
	transaction.value = await getTransaction(props.transactionId);
	console.log(transaction.value);
});
</script>
