<template>
    <v-container>
        <ResponsiveDataTable :fetch="getAnnouncements" v-model:filters="filters" title="Announcements"
            :subtitle="`Announcements for ${account.user_details.full_name}`">
            <template #filters-slot>
                <v-row>
                    <v-col cols="12" sm="6" md="3" lg="2">
                        <v-text-field label="Search by title" v-model="filters.title" />
                    </v-col>
                    <v-col cols="12" sm="12" md="6" lg="4">
                        <v-text-field label="Search by description" v-model="filters.description" />
                    </v-col>
                </v-row>
            </template>
            <template #cards-slot="{ items }">
                <v-row>
                    <v-col cols="12" md="4" lg="3" v-for="item in items" :key="item.id">
                        <AnnouncementSmallCard :announcement="item" />
                    </v-col>
                </v-row>
            </template>
            <template #list-slot="{ items }">
                <v-list lines="three">
                    <AnnouncementListItem v-for="item in items" :key="item.id" :announcement="item" />
                </v-list>
            </template>
        </ResponsiveDataTable>
    </v-container>
</template>

<script setup>
import AnnouncementListItem from "@/apps/announcements/components/AnnouncementListItem.vue";
import AnnouncementSmallCard from "@/apps/announcements/components/AnnouncementSmallCard.vue";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { getAnnouncements } from "@/apps/announcements/api";
import { useAuthStore } from "@/stores/auth";
import { ref } from "vue";

const authStore = useAuthStore();
const account = authStore.account;

const filters = ref({});

</script>