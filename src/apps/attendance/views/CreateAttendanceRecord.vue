<template>
  <v-container>
    <AttendanceRecordForm
      :action="createAttendanceRecord"
      actionName="Create"
      title="Create Attendance Record"
      subtitle="Record a new attendance entry"
      :hideDelete="true"
    />
  </v-container>
</template>

<script setup>
import { createAttendanceRecord } from "@/apps/attendance/api";
import AttendanceRecordForm from "../components/AttendanceRecordForm.vue";
</script>
