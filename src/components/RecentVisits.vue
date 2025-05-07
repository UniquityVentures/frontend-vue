<template>
    <v-card>
        <v-card-title>
            Recently Visited
        </v-card-title>

        <v-card-subtitle>
            {{ visitStore.getVisits.length }} visits
        </v-card-subtitle>

        <v-card-text>
            <v-timeline dense>
                <v-timeline-item v-for="(visit, index) in visitStore.getVisits" :key="visit.path" color="primary"
                    style="cursor: pointer" @click="navigate(visit.path)">
                    <template #opposite>
                        {{ new Date(visit.timestamp).toLocaleTimeString() }}
                    </template>
                    <v-card elevation="2" class="pa-2">
                        <div class="font-weight-bold">{{ visit.name }}</div>
                        <div class="text--secondary text-caption">{{ visit.path }}</div>
                    </v-card>
                </v-timeline-item>
            </v-timeline>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { useRecentVisitStore } from "@/stores/recentVisits";
import { useRouter } from "vue-router";

const visitStore = useRecentVisitStore();
const router = useRouter();

function navigate(path) {
    router.push(path);
}
</script>