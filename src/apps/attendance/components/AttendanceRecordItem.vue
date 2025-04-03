<template>
    <v-card variant="flat" class="border" height="100%" v-if="type === 'card'">
        <v-card-title class="text-subtitle-1">
            {{ item.student_details?.user_details?.full_name || 'Unknown Student' }}
        </v-card-title>
        <v-card-subtitle>
            Student No: {{ item.student_details?.student_no }}
        </v-card-subtitle>
        <v-card-text>
            <v-chip :color="getStatusColor(item.status)" class="ml-auto">
            {{ item.status }}
            </v-chip>
        </v-card-text>
    </v-card>
    <v-list-item v-else-if="type === 'list'" class="border">
        <v-list-item-title>
            {{ item.student_details?.user_details?.full_name || 'Unknown Student' }}
          </v-list-item-title>
          <v-list-item-subtitle>
            Roll No: {{ item.student_details?.roll_no }}
          </v-list-item-subtitle>
          <template #append>
            <v-chip
                :color="getStatusColor(item.status)"
            >
                {{ item.status }}
            </v-chip>
        </template>
    </v-list-item>
</template>

<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
    type: {
        type: String,
        default: 'card',
    },
});

const getStatusColor = (status) => {
    if (status === "Present") return "green";
    if (status === "Absent") return "red";
    return "gray";
};

</script>