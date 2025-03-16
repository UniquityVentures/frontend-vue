<template>
    <v-container>
        <BatchesLookup :overrideFields="[{label: 'Search by batch name', key: 'name', type: 'string'}]" />
    </v-container>
</template>

<script setup>
import BatchesLookup from "@/apps/batches/components/BatchesLookup.vue";
</script>
