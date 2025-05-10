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
            <p class="text-subtitle-1">Teachers:</p>
            <TeacherChip 
                v-if="syllabus.course_details?.teachers" 
                :teacher="syllabus.course_details.teachers" 
            />
        </v-card-text>
        <v-card-text>
            <div>
                <div class="text-subtitle-1 mb-2">
                    Chapters ({{ syllabus.chapter_count }})
                </div>
                <v-expansion-panels variant="accordion" elevation="0" class="border">
                    <v-expansion-panel v-for="chapter in syllabus.chapters" :key="chapter.id">
                        <v-expansion-panel-title>
                            Chapter {{ chapter.order }}: {{ chapter.name }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-card variant="flat">
                                <v-card-title>
                                    Chapter {{ chapter.order }}: {{ chapter.name }}
                                </v-card-title>
                                <v-card-text>
                                    <strong>Book:</strong> {{ chapter.book }}
                                    <span class="ms-4"><strong>Pages:</strong> {{ chapter.page_range }}</span>
                                </v-card-text>
                                
                                <v-card-text>
                                    <v-expansion-panels variant="accordion" elevation="0" class="mt-2">
                                        <v-expansion-panel v-for="topic in chapter.topics" :key="topic.id">
                                            <v-expansion-panel-title>
                                                {{ topic.name }}
                                            </v-expansion-panel-title>
                                            <v-expansion-panel-text>
                                                <v-card variant="flat">
                                                    <v-card-title>
                                                        {{ topic.name }}
                                                    </v-card-title>
                                                    
                                                    <v-card-subtitle>
                                                        Pages: {{ topic.page_range }}
                                                    </v-card-subtitle>
                                                    
                                                    <v-divider class="mx-4"></v-divider>
                                                    
                                                    <v-card-text>
                                                        <p class="text-subtitle-1">Description:</p>
                                                        <p>{{ topic.description }}</p>
                                                    </v-card-text>
                                                </v-card>
                                            </v-expansion-panel-text>
                                        </v-expansion-panel>
                                    </v-expansion-panels>
                                </v-card-text>
                            </v-card>
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

