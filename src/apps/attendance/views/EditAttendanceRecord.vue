<template>
    <v-container>
      <AttendanceRecordForm
        v-if="record"
        :record="record"
        :action="handleUpdate"
        actionName="Update"
        title="Edit Attendance Record"
        subtitle="Modify attendance record details"
      />
      <v-skeleton-loader v-else type="card" />
    </v-container>
  </template>
  
  <script setup>
  import { onMounted, ref } from "vue";
  import { getAttendanceRecord, updateAttendanceRecord } from "@/apps/attendance/api";
  import AttendanceRecordForm from "../components/AttendanceRecordForm.vue";
  
  const props = defineProps({
    recordId: {
      type: [Number, String],
      required: true,
    },
  });
  
  const record = ref(null);
  
  const handleUpdate = async (data) => {
    return await updateAttendanceRecord(props.recordId, data);
  };
  
  onMounted(async () => {
    try {
      record.value = await getAttendanceRecord(props.recordId);
    } catch (error) {
      console.error("Failed to load attendance record:", error);
    }
  });
  </script>