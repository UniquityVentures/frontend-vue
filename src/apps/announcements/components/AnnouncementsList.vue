<template>
    <v-card>
        <v-card-title v-if="title">{{ title }}</v-card-title>
        <v-card-subtitle v-if="subtitle">{{ subtitle }}</v-card-subtitle>
        <v-card-text>
            <v-list v-if="!loading && limitedItems.length" lines="two" density="compact">
                <AnnouncementListItem v-for="item in limitedItems" :key="item.id" :announcement="item" />
            </v-list>
            <v-skeleton-loader v-if="loading" type="list-item-three-line" v-for="i in limit" :key="i" />
        </v-card-text>
        <v-card-actions v-if="viewAll" class="justify-center">
            <v-btn :to="viewAll.route">{{ viewAll.label }}</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { getAnnouncements } from "@/apps/announcements/api";
import AnnouncementListItem from "./AnnouncementListItem.vue";

const props = defineProps({
    title: String,
    subtitle: String,
    filter: { type: Object, default: () => ({}) },
    viewAll: { type: Object, default: () => ({ route: { name: 'Announcements' }, label: 'View All' }) },
    limit: { type: Number, default: 5 },
});

const items = ref([]);
const loading = ref(true);
const limitedItems = computed(() => items.value.slice(0, props.limit));

onMounted(async () => {
    try {
        loading.value = true;
        const response = await getAnnouncements(props.filter);
        items.value = response?.results || [];
    } catch (error) {
        console.error("AnnouncementsList failed to fetch announcements:", error);
    } finally {
        loading.value = false;
    }
});
</script>
