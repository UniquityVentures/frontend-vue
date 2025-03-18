import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import AttendanceMaster from './views/AttendanceMaster.vue';
// Import other attendance-related views as needed

export default [
  {
    path: "attendance/",
    component: AppSideBarBreadcrumbsLayout,
    meta: {
      requiresAuth: true,
      getDisplayName: () => "Attendance",
      defaultRoute: "AttendanceRecords",
      description: "Manage student attendance",
      icon: "mdi-calendar-check",
      getMenu: (props) => [
        {
          title: "Attendance Records",
          to: { name: "AttendanceRecords", params: props },
        },
        {
          title: "Mark Attendance",
          to: { name: "AttendanceMaster", params: props },
        },
        // Add more menu items as needed
      ],
    },
    children: [
      {
        path: "",
        component: EmptyLayout, // Replace with an attendance list view when available
        name: "AttendanceRecords",
      },
      {
        path: "master/",
        component: AttendanceMaster,
        name: "AttendanceMaster",
      },
      // Add more routes as needed (e.g., attendance details, reports, etc.)
    ],
  },
];
