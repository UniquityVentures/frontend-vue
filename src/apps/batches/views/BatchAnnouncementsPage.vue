<template>
    <v-container v-if="batch">
		<v-btn prepend-icon="mdi-plus" color="primary" :to="{ name: 'CreateAnnouncement', query: {batches: [batch.id]} }">
            Create New Announcement</v-btn>
        <v-btn prepend-icon="mdi-view-list" color="grey-darken-2" :to="{ name: 'Announcements', query: {batch: batch.id} }">
            View All Announcements</v-btn>
        <v-divider/>
        <ResponsiveDataTable :fetch="getAnnouncements" v-model:filters="filters" title="Announcements"
            :subtitle="`Announcements for ${batch.name}`">
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
import { getAnnouncements } from "@/apps/announcements/api";
import AnnouncementListItem from "@/apps/announcements/components/AnnouncementListItem.vue";
import AnnouncementSmallCard from "@/apps/announcements/components/AnnouncementSmallCard.vue";
import { getBatch } from "@/apps/batches/api";
import ResponsiveDataTable from "@/components/ResponsiveDataTable.vue";
import { onMounted, ref } from "vue";

const props = defineProps({
	batchId: {
		type: String,
		required: true,
	},
});

const batch = ref(null);
const filters = ref({ batch: props.batchId });

onMounted(async () => {
	batch.value = await getBatch(props.batchId);
});
</script>
