<template>
    <v-card>
        <v-card-title v-if="title">
            {{ title }}
        </v-card-title>
        <v-card-subtitle v-if="subtitle">
            {{ subtitle }}
        </v-card-subtitle>
        <v-card-text>
            <FilterCard :fields="fields" :exportFunction="exportTransactions" v-model:filters="filters" />
        </v-card-text>
        <v-card-text>
            <ResponsiveDataTable :getToFunction="(item) => ({ name: 'Transaction', params: { transactionId: item.id } })"
                :headers="defaultHeaders" :fetch="getTransactions" v-model:filters="filters">
                <template #list-item-slot="{ item }">
                    <v-list-item-title>
                        <v-icon :color="getStatusColor(item.transaction_status)">
                            {{ getStatusIcon(item.transaction_status) }}
                        </v-icon>
                        {{ item.student_details?.name || "Unknown Student" }}
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
        </v-card-text>
    </v-card>
</template>

<script setup>
import { getTransactions, exportTransactions } from "@/apps/finances/api";
import FilterCard from "@/components/FilterCard.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { ref, onMounted } from "vue";
import { formatDate } from "@/services/utils";
import { FIELD_TYPES } from "@/components/FieldTypeDefinitions";

const props = defineProps({
    title: {
        type: String,
        default: null,
    },
    subtitle: {
        type: String,
        default: null,
    },
    overrideFields: {
        type: Array,
        default: null,
    },
});

// Define default headers inline instead of importing from config
const defaultHeaders = [
    { label: "Student", key: "student_details.user_details.full_name" },
    { label: "Amount", key: "amount", formatFunc: (a) => a / 100 },
    { label: "Date", key: "datetime", formatFunc: formatDate },
    { label: "Transaction Type", key: "transaction_type" },
    { label: "Transaction Status", key: "transaction_status" },
    { label: "Payee", key: "payee_details", formatFunc: (payee) => payee.email },
];

// Define default filter fields inline instead of importing from config
const defaultFilterFields = [
    { label: "Filter by student", type: FIELD_TYPES.STUDENT, key: "student" },
    { label: "Filter by minimum amount", type: FIELD_TYPES.INTEGER, key: "amount_start" },
    { label: "Filter by maximum amount", type: FIELD_TYPES.INTEGER, key: "amount_end" },
    { label: "Filter by Date", type: FIELD_TYPES.DATE_RANGE, key: ["datetime_start", "datetime_end"] },
    { label: "Filter by transaction type", type: FIELD_TYPES.N_NARY, key: "transaction_type", 
        fetchOptions: () => [
            { title: "Select", value: null },
            { title: "UPI", value: "upi" },
            { title: "Netbanking", value: "netbanking" },
            { title: "Credit/Debit Card", value: "card" },
            { title: "Digital Wallet", value: "wallet" },
        ],
    },
    { label: "Filter by order ID", type: FIELD_TYPES.STRING, key: "order_id" },
    { label: "Filter by transaction status", type: FIELD_TYPES.N_NARY, key: "transaction_status",
        fetchOptions: () => [
            { title: "Select", value: null },
            { title: "Success", value: "S" },
            { title: "Pending", value: "P" },
            { title: "Failed", value: "F" },
        ],
    },
    { label: "Filter by purpose", type: FIELD_TYPES.TRANSACTION_PURPOSE, key: "purpose" },
    { label: "Filter by payee", type: FIELD_TYPES.PAYEE, key: "payee" },
];

// Initialize fields with proper reactivity handling
const fields = ref(props.overrideFields || defaultFilterFields);
const filters = ref({});

// Make sure to update fields when overrideFields changes
onMounted(() => {
    // Force reactivity update for fields if coming from props
    if (props.overrideFields) {
        fields.value = JSON.parse(JSON.stringify(props.overrideFields));
    }
});

// Helper functions for transaction status display
const getStatusColor = (status) => {
    switch (status) {
        case 'S': return 'success';
        case 'P': return 'warning';
        case 'F': return 'error';
        default: return 'grey';
    }
};

const getStatusText = (status) => {
    switch (status) {
        case 'S': return 'Success';
        case 'P': return 'Pending';
        case 'F': return 'Failed';
        default: return 'Unknown';
    }
};

const getStatusIcon = (status) => {
    switch (status) {
        case 'S': return 'mdi-check-circle';
        case 'P': return 'mdi-clock-outline';
        case 'F': return 'mdi-alert-circle';
        default: return 'mdi-help-circle';
    }
};
</script>
