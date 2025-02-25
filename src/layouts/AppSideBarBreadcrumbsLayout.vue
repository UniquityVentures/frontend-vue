<template>
	<AppSideBarLayout>
		<BreadcrumbsLayout>
			<router-view></router-view>
		</BreadcrumbsLayout>
	</AppSideBarLayout>
</template>

<script setup>
import AppSideBarLayout from "@/layouts/AppSideBarLayout.vue";
import BreadcrumbsLayout from "@/layouts/BreadcrumbsLayout.vue";
</script>
