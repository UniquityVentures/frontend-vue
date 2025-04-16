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
            <div>
                <div class="text-subtitle-1 mb-2">
                    Chapters ({{ syllabus.chapter_count }})
                </div>
                <v-expansion-panels variant="accordion" elevation="0" class="border">
                    <v-expansion-panel v-for="chapter in syllabus.chapters" :key="chapter.id">
                        <v-expansion-panel-title style="background-color: #f8f8f8;">
                            Chapter {{ chapter.order }}: {{ chapter.name }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-card variant="flat">
                                <v-card-text>
                                    <strong>Book:</strong> {{ chapter.book }}
                                    <span class="ms-4"><strong>Pages:</strong> {{ chapter.page_range }}</span>
                                </v-card-text>
                                
                                <v-card-text>
                                    <v-list lines="two">
                                        <v-list-item v-for="topic in chapter.topics" :key="topic.id" class="border rounded">
                                            <v-list-item-title>
                                                {{ topic.name }}
                                            </v-list-item-title>
                                            <v-list-item-subtitle>
                                                {{ topic.description }}
                                            </v-list-item-subtitle>
                                            <template v-slot:append>
                                                <v-chip size="small" color="secondary">Pages: {{ topic.page_range }}</v-chip>
                                            </template>
                                        </v-list-item>
                                    </v-list>
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

