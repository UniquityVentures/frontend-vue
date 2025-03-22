import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";

import CoursePage from "./views/CoursePage.vue";
import CoursesPage from "./views/CoursesPage.vue";
import CreateCoursePage from "./views/CreateCoursePage.vue";
import EditCoursePage from "./views/EditCoursePage.vue";
import CoursesImportPage from "./views/CoursesImportPage.vue";
import CoursesExportPage from "./views/CoursesExportPage.vue";
import { getCourse } from "./api";

export default [
    {
        path: "courses/",
        component: AppSideBarBreadcrumbsLayout,
        meta: {
            getDisplayName: () => "Courses",
            defaultRoute: "Courses",
            description: "View and manage courses",
            getMenu: () => [
                {
                    title: "All Courses",
                    to: { name: "Courses" },
                },
                {
                    title: "Create Course",
                    to: { name: "CreateCourse" },
                },
                {
                    title: "Import Courses",
                    to: { name: "ImportCourses" },
                },
                {
                    title: "Export Courses",
                    to: { name: "ExportCourses" },
                },
            ],
            icon: "mdi-book-open-variant",
        },
        children: [
            {
                path: "",
                component: CoursesPage,
                name: "Courses",
            },
            {
                path: "create/",
                component: CreateCoursePage,
                name: "CreateCourse",
            },
            {
                path: "import/",
                component: CoursesImportPage,
                name: "ImportCourses",
            },
            {
                path: "export/",
                component: CoursesExportPage,
                name: "ExportCourses",
            },
            {
                path: ":courseId/",
                component: EmptyLayout,
                props: true,
                meta: {
                    defaultRoute: "Course",
                    getDisplayName: async (props) =>
                        (await getCourse(props.courseId)).name,
                    getMenu: (params) => [
                        {
                            title: "View Course",
                            to: { name: "Course", params },
                        },
                        {
                            title: "Edit Course",
                            to: { name: "EditCourse", params },
                        },
                    ],
                    icon: "mdi-book-open-variant",
                },
                children: [
                    {
                        path: "",
                        component: CoursePage,
                        name: "Course",
                        props: true,
                    },
                    {
                        path: "edit/",
                        component: EditCoursePage,
                        name: "EditCourse",
                        props: true,
                    },
                ],
            },
        ],
    },
];
