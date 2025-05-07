<template>
	<NoticeBoard :filters="$route.query" />
</template>

<script setup>
import NoticeBoard from "@/apps/announcements/components/NoticeBoard.vue";
</script>
