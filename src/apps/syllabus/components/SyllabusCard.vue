<template>
    <v-card v-if="syllabus" class="mb-4">
        <v-card-title>
            {{ syllabus.name }}
        </v-card-title>
        <v-card-subtitle class="py-1">
            <CourseChip :courseId="syllabus.course" v-if="syllabus.course" />
        </v-card-subtitle>

        <v-card-text>
            {{ syllabus.overview }}
        </v-card-text>
        <v-card-text>
            <p class="text-subtitle-1">Main Teacher:</p>
            <TeacherChip 
                v-if="syllabus.course_details?.main_teacher" 
                    :teacherId="syllabus.course_details.main_teacher" 
                />
        </v-card-text>
        
        <v-card-text>
            <div class="mt-4">
                <div class="text-subtitle-1 mb-2">
                    Chapters ({{ syllabus.chapter_count }})
                </div>
                
                <v-expansion-panels>
                    <v-expansion-panel v-for="chapter in syllabus.chapters" :key="chapter.id">
                        <v-expansion-panel-title>
                            <div class="d-flex align-center">
                                <span class="me-auto">{{ chapter.order }}. {{ chapter.name }}</span>
                                <v-chip size="small" color="info" class="ms-2">{{ chapter.topics.length }} topics</v-chip>
                            </div>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <div class="text-subtitle-2 mb-2">
                                <strong>Book:</strong> {{ chapter.book }}
                                <span class="ms-4"><strong>Pages:</strong> {{ chapter.page_range }}</span>
                            </div>
                            
                            <v-list lines="two" class="bg-grey-lighten-4 rounded">
                                <v-list-item v-for="topic in chapter.topics" :key="topic.id" class="mb-1 rounded">
                                    <v-list-item-title>
                                        {{ topic.order }}. {{ topic.name }}
                                    </v-list-item-title>
                                    <v-list-item-subtitle>
                                        {{ topic.description }}
                                    </v-list-item-subtitle>
                                    <template v-slot:append>
                                        <v-chip size="small" color="secondary">Pages: {{ topic.page_range }}</v-chip>
                                    </template>
                                </v-list-item>
                            </v-list>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
        </v-card-text>
    </v-card>
</template>

<script setup>
import TeacherChip from "@/apps/teachers/components/TeacherChip.vue";
import CourseChip from "@/apps/courses/components/CourseChip.vue";

const props = defineProps({
    syllabus: {
        type: Object,
        required: true
    }
});

const syllabus = props.syllabus;
</script>

