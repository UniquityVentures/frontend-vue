<template>
    <v-card v-if="chapter" class="mb-3">
        <v-card-title>
            {{ chapter.order }}. {{ chapter.name }}
        </v-card-title>
        <v-card-subtitle>
            <v-chip color="primary" size="small">Book: {{ chapter.book }}</v-chip>
            <v-chip color="secondary" size="small" class="ms-2">Pages: {{ chapter.page_range }}</v-chip>
        </v-card-subtitle>
        
        <v-card-text>
            <div class="d-flex justify-space-between align-center mb-3">
                <span class="text-subtitle-2">Topics ({{ chapter.topics?.length || 0 }})</span>
                <v-btn 
                    v-if="chapter.syllabus" 
                    variant="text" 
                    size="small" 
                    color="primary"
                    :to="accountRoute( 'Syllabus', { params: { syllabusId: chapter.syllabus }})"
                >
                    View Syllabus
                </v-btn>
            </div>
            
            <v-list v-if="chapter.topics?.length" lines="two" class="bg-grey-lighten-4 rounded pa-0">
                <v-list-item v-for="topic in chapter.topics" :key="topic.id" class="rounded mb-1">
                    <v-list-item-title>
                        {{ topic.order }}. {{ topic.name }}
                    </v-list-item-title>
                    <template v-slot:append>
                        <v-chip size="small" color="info">Pages: {{ topic.page_range }}</v-chip>
                    </template>
                </v-list-item>
            </v-list>
        </v-card-text>
    </v-card>
</template>

<script setup>
import {accountRoute} from "@/services/api";
const props = defineProps({
    chapter: {
        type: Object,
        required: true
    }
});
</script>
