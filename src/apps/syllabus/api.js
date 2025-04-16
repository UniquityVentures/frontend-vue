import { createViewset } from "@/services/viewset";

// Create viewsets for syllabus, chapters, and topics
const syllabusViewset = createViewset("api/syllabus", "syllabi");
const chapterViewset = createViewset("api/syllabus/chapters", "chapters");
const topicViewset = createViewset("api/syllabus/topics", "topics");

// Syllabus methods
const getSyllabi = (filter = {}) => 
    syllabusViewset.list({
        page_size: 100,
        ...filter
    });
const getSyllabus = syllabusViewset.retrieve;
const updateSyllabus = syllabusViewset.update;
const createSyllabus = syllabusViewset.create;
const exportSyllabi = syllabusViewset.export;
const importSyllabi = {
    dryRun: syllabusViewset.import.dryRun,
    finalize: syllabusViewset.import.finalize,
};

// Chapter methods
const getChapters = (filter = {}) => 
    chapterViewset.list({
        page_size: 100,
        ...filter
    });
const getChapter = chapterViewset.retrieve;
const updateChapter = chapterViewset.update;
const createChapter = chapterViewset.create;
const exportChapters = chapterViewset.export;
const importChapters = {
    dryRun: chapterViewset.import.dryRun,
    finalize: chapterViewset.import.finalize,
};

// Topic methods
const getTopics = (filter = {}) => 
    topicViewset.list({
        page_size: 100,
        ...filter
    });
const getTopic = topicViewset.retrieve;
const updateTopic = topicViewset.update;
const createTopic = topicViewset.create;
const exportTopics = topicViewset.export;
const importTopics = {
    dryRun: topicViewset.import.dryRun,
    finalize: topicViewset.import.finalize,
};

// Helper methods
const getSyllabusInfoFromObj = (item) => ({
    title: item.name,
    subtitle: `${item.description || 'Course Syllabus'}`,
    value: item.id,
});

const getChapterInfoFromObj = (item) => ({
    title: item.name,
    subtitle: item.book ? `Book: ${item.book}` : 'Chapter',
    value: item.id,
});

const getTopicInfoFromObj = (item) => ({
    title: item.name,
    subtitle: item.description || 'Topic',
    value: item.id,
});

export {
    // Syllabus exports
    getSyllabi,
    getSyllabus,
    updateSyllabus,
    createSyllabus,
    exportSyllabi,
    importSyllabi,
    getSyllabusInfoFromObj,
    
    // Chapter exports
    getChapters,
    getChapter,
    updateChapter,
    createChapter,
    exportChapters,
    importChapters,
    getChapterInfoFromObj,
    
    // Topic exports
    getTopics,
    getTopic,
    updateTopic,
    createTopic,
    exportTopics,
    importTopics,
    getTopicInfoFromObj,
};
