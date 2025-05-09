<template>
	<v-container>
		<NoticeBoard :filters="{student: studentId}" />
	</v-container>
</template>

<script setup>
import NoticeBoard from "@/apps/announcements/components/NoticeBoard.vue";

const props = defineProps({
    studentId: {
        type: [String, Number],
        required: true,
    },
});

</script>
