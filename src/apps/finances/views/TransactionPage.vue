<template>
	<v-container>
		<v-row>
			<v-col>
				<StudentCard class="column-item" :student="transaction?.student_details"  />
			</v-col>
			<v-col>
				<v-card variant="flat">
					<v-card-title>{{ transaction?.purpose_details?.name }}</v-card-title>
					<v-card-subtitle>{{ transaction?.purpose_details?.description }}</v-card-subtitle>
					<v-card-text>
						<v-row>
							<v-col>
								Order ID: {{ transaction?.order_id }}
							</v-col>
						</v-row>
						<v-row>
							<v-chip color="primary">
								Amount: ₹{{ transaction?.amount / 100 }} 
							</v-chip>
						</v-row>
						<v-row>
							<v-chip color="info">
								Transaction Date: {{ transaction?.datetime ? formatDate(transaction?.datetime) : "Loading" }}
							</v-chip>
						</v-row>

					</v-card-text>
				</v-card>
			</v-col>
			<v-col>
				<v-card variant="flat">
					<v-card-title>Payee Details</v-card-title>
					<v-card-subtitle>{{transaction?.payee_details?.name}}</v-card-subtitle>
					<v-card-text>{{transaction?.payee_details?.email}}
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script setup>
import StudentCard from "@/apps/students/components/StudentCard.vue";
import { formatDate } from "@/services/utils";
import { onMounted, ref } from "vue";
import { getTransaction } from "../api";

const transaction = ref({});

const props = defineProps({
	transactionId: {
		type: Number,
		required: true,
	},
});

onMounted(async () => {
	transaction.value = await getTransaction(props.transactionId);
});
</script>
