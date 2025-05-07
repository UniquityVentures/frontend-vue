<template>
	<NoticeBoard :filters="$route.query" title="Notice Board" subtitle="School-Wide Announcements" />
</template>

<script setup>
import NoticeBoard from "@/apps/announcements/components/NoticeBoard.vue";
</script>
