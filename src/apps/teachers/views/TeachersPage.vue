<template>
    <v-container>
        <TeachersLookup title="Teachers" subtitle="All Teachers" v-model:filters="filters" :hideFilters="true" />
    </v-container>
</template>

<script setup>
import TeachersLookup from "@/apps/teachers/components/TeachersLookup.vue";
import { ref } from "vue";

const filters = ref({ is_active: true, is_approved: true, sort_by: "user__first_name" });
</script>