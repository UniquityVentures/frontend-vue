<template>
    <v-card>
        <!-- Title and Subtitle (Conditional Rendering) -->
        <v-card-title v-if="title">{{ title }}</v-card-title>
        <v-card-subtitle v-if="subtitle">{{ subtitle }}</v-card-subtitle>

        <v-card-text>
            <!-- Announcements List or Loading Skeleton -->
            <v-list lines="two" density="default" v-if="!loading && limitedAnnouncements.length">
                <v-list-item 
                    v-for="announcement in limitedAnnouncements" 
                    :key="announcement.id"
                    class="ma-1 pa-2 border"
                >
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ announcement?.title || 'Untitled' }}
                        </v-list-item-title>
                        <v-list-item-subtitle class="mb-2">
                            {{ announcement?.description || 'No description available' }}
                        </v-list-item-subtitle>
                        <v-list-item-text class="text-end">
                            <v-chip size="small" color="primary">
                                Signed by: 
                                {{ announcement?.signed_by_details?.user_details?.full_name || 'Unknown' }}
                            </v-chip>
                        </v-list-item-text>
                    </v-list-item-content>

                    <template v-slot:append>
                        <v-btn 
                            icon="mdi-arrow-right"
                            variant="flat"
                            border
                            density="comfortable"
                            :to="{ name: 'Announcement', params: { announcementId: announcement.id } }"
                            aria-label="View Announcement"
                        ></v-btn>
                    </template>
                </v-list-item>
            </v-list>

            <!-- Loading Skeleton -->
            <v-skeleton-loader 
                v-if="loading" 
                type="list-item" 
                :loading="loading" 
                class="ma-2"
            />

            <!-- No Announcements Message -->
            <div 
                v-if="!loading && !AnnouncementsData.length" 
                class="text-center pa-4"
            >
                No announcements available
            </div>
        </v-card-text>

        <!-- 'View All' Button -->
        <v-card-actions class="justify-center">
            <v-btn 
                :to="{ name: to || 'Announcements' }"
                variant="outlined"
                aria-label="View All Announcements"
            >
                View All
                <v-icon end icon="mdi-chevron-right"></v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script setup>
import { getAnnouncements } from "@/apps/announcements/api";
import { onMounted, ref, computed } from "vue";

const props = defineProps({
    filter: { type: Object, default: () => ({}) },
    title: String,
    subtitle: String,
    to: String,
});

const AnnouncementsData = ref([]);
const loading = ref(true);

// Limit announcements to 3 using a computed property
const limitedAnnouncements = computed(() => AnnouncementsData.value.slice(0, 3));

onMounted(async () => {
    try {
        loading.value = true;
        const response = await getAnnouncements(props.filter);
        AnnouncementsData.value = response?.results || [];
    } catch (error) {
        console.error("Failed to fetch announcements:", error);
    } finally {
        loading.value = false;
    }
});
</script>
