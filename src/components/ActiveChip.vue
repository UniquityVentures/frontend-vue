<template>
    <span v-if="isActive !== null">
        <v-chip v-if="isActive" color="success">Active</v-chip>
        <v-chip v-else color="error">Inactive</v-chip>
    </span>
    <span v-else>
        <v-chip color="black">Dates</v-chip>
    </span>
</template>

<script setup>
const props = defineProps({
    isActive: {
        type: Boolean,
        required: true
    }
})
</script>