<template>
    <v-list-item 
        class="border"
        rounded="lg"
        v-if="teacher?.user_details"
        :title="teacher?.user_details?.full_name"
        :subtitle="`ID: ${teacher?.identifier}`"
        :to="{ name: 'Teacher', params: { teacherId: teacher?.user_details?.id } }">
        <v-chip v-for="(chip, index) in chips" :key="index" :label="chip.label" :color="chip.color || 'primary'">
            {{ chip.value }}
        </v-chip>
    </v-list-item>
</template>

<script setup>
const props = defineProps({
    teacher: Object,
    chips: Array,
});
</script>