<template>
    <v-card v-if="topic" class="mb-3">
        <v-card-title>
            {{ topic.order }}. {{ topic.name }}
        </v-card-title>
        
        <v-card-text>
            <p>{{ topic.description }}</p>
            
            <div class="d-flex justify-space-between align-center mt-2">
                <v-chip color="secondary" size="small">Pages: {{ topic.page_range }}</v-chip>
                
                <div>
                    <v-btn 
                        v-if="topic.chapter" 
                        variant="text" 
                        size="small" 
                        color="accent"
                        :to="{ name: 'Chapter', params: { chapterId: topic.chapter }}"
                        class="me-2"
                    >
                        View Chapter
                    </v-btn>
                </div>
            </div>
            
            <div v-if="chapterDetails" class="mt-3 pt-3 border-t">
                <span class="text-subtitle-2">From Chapter:</span>
                <div class="d-flex align-center mt-1">
                    <v-chip color="accent">{{ chapterDetails.name }}</v-chip>
                    <v-chip color="info" class="ms-2" size="small">{{ chapterDetails.book }}</v-chip>
                </div>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getChapter } from '@/apps/syllabus/api';

const props = defineProps({
    topic: {
        type: Object,
        required: true
    },
});

const chapterDetails = ref(null);

onMounted(async () => {
    chapterDetails.value = await getChapter(props.topic.chapter);
});
</script>

<style scoped>
.border-t {
    border-top: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
