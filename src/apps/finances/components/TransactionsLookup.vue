<template>
    <v-card variant="flat">
        <v-card-title>
            <FilterCard :fields="fields" :exportFunction="exportTransactions" />
        </v-card-title>
        <v-card-text>
            <ResponsiveDataTable :getToFunction="(item) => ({ name: 'Transaction', params: { transactionId: item.id } })"
                :headers="transactionDefaultHeaders" :fetch="getTransactions" v-model="filters">
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
import { transactionDefaultFilterFields, transactionDefaultHeaders } from "@/apps/finances/config";
import FilterCard from "@/components/FilterCard.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { computed, ref } from "vue";
import { formatDate } from "@/services/utils";

const props = defineProps({
    overrideFields: {
        type: Array,
        default: () => [],
    },
});

// Initialize fields with any overrides from props
const fields = ref(
    transactionDefaultFilterFields.map((defaultField) => {
        const override = props.overrideFields.find(
            (f) => f.key === defaultField.key,
        );
        return override ? { ...defaultField, ...override } : defaultField;
    }),
);

const filters = computed(() => {
    return fields.value.reduce((acc, field) => {
        if (Array.isArray(field.key)) {
            field.key.forEach((k, i) => {
                acc[k] = field.value?.[i] ?? null;
            });
        } else {
            acc[field.key] = field.value;
        }
        return acc;
    }, {});
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
