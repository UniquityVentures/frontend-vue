<template>
    <ResponsiveDataTable :fetch="getTransactions" v-model:filters="filters"
        title="Transactions" subtitle="Financial Transactions List">
        <template #filters-slot>
            <v-row>
                <v-col cols="12" sm="6" md="3" lg="2">
                    <StudentSelect v-model="filters.student" label="Filter by student" />
                </v-col>
                <v-col cols="12" sm="6" md="3" lg="2">
                    <v-text-field label="Min amount" type="number" v-model="filters.amount_start" />
                </v-col>
                <v-col cols="12" sm="6" md="3" lg="2">
                    <v-text-field label="Max amount" type="number" v-model="filters.amount_end" />
                </v-col>
                <v-col cols="12" sm="6" md="4" lg="3">
                    <DateRangeSelect
                        :filters="filters"
                        start-key="datetime_start"
                        end-key="datetime_end"
                        label="Transaction Date Range"
                    />
                </v-col>
                <v-col cols="12" sm="6" md="3" lg="2">
                    <v-select
                        label="Transaction Type"
                        :items="transactionTypes"
                        v-model="filters.transaction_type"
                        clearable
                    />
                </v-col>
            </v-row>
        </template>
        <template #list-item-slot="{ item }">
            <v-list-item-title>
                <v-icon :color="getStatusColor(item.transaction_status)">
                    {{ getStatusIcon(item.transaction_status) }}
                </v-icon>
                {{ item.student_details?.user_details?.full_name || "Unknown Student" }}
            </v-list-item-title>
            <v-list-item-subtitle>
                Amount: ₹{{ item.amount / 100 }} - {{ formatDate(item.datetime) }}
            </v-list-item-subtitle>
            <div class="d-flex flex-wrap mt-1">
                <v-chip color="success">
                    {{ item.transaction_type }}
                </v-chip>
                <v-chip color="primary">
                    {{ item.payee_details?.email || "Unknown Payee" }}
                </v-chip>
                <v-chip :color="getStatusColor(item.transaction_status)">
                    {{ getStatusText(item.transaction_status) }}
                </v-chip>
                <v-chip v-if="item.order_id" color="grey">
                    ID: {{ item.order_id }}
                </v-chip>
            </div>
        </template>
    </ResponsiveDataTable>
</template>

<script setup>
import StudentSelect from "@/apps/students/components/StudentSelect.vue";
import DateRangeSelect from "@/components/DateRangeSelect.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { formatDate } from "@/services/utils";
import { ref } from "vue";
import { getTransactions } from "../api";

const filters = ref({});
const transactionTypes = [
	{ title: "UPI", value: "upi" },
	{ title: "Netbanking", value: "netbanking" },
	{ title: "Credit/Debit Card", value: "card" },
	{ title: "Digital Wallet", value: "wallet" },
];

// Helper functions for transaction status display
const getStatusColor = (status) => {
	switch (status) {
		case "S":
			return "success";
		case "P":
			return "warning";
		case "F":
			return "error";
		default:
			return "grey";
	}
};

const getStatusText = (status) => {
	switch (status) {
		case "S":
			return "Success";
		case "P":
			return "Pending";
		case "F":
			return "Failed";
		default:
			return "Unknown";
	}
};

const getStatusIcon = (status) => {
	switch (status) {
		case "S":
			return "mdi-check-circle";
		case "P":
			return "mdi-clock-outline";
		case "F":
			return "mdi-alert-circle";
		default:
			return "mdi-help-circle";
	}
};
</script>
