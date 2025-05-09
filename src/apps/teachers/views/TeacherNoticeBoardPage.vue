<template>
	<v-container>
		<NoticeBoard :filters="{teacher: teacherId}" />
	</v-container>
</template>

<script setup>
import NoticeBoard from "@/apps/announcements/components/NoticeBoard.vue";

const props = defineProps({
    teacherId: {
        type: [String, Number],
        required: true,
    },
});

</script>
