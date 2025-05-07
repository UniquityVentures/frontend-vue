<template>
	<NoticeBoard :filters="{is_active: true, page_size: 100, is_school_wide: true}" title="Notice Board" subtitle="School-Wide Announcements" />
</template>

<script setup>
import NoticeBoard from "@/apps/announcements/components/NoticeBoard.vue";


</script>
