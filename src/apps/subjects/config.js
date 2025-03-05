import { formatDate } from "@/services/utils";
import { getClassroomInfoFromObj, getClassrooms } from "@/apps/classrooms/api";
import { getTeacherInfoFromObj, getTeachers } from "@/apps/teachers/api";

export const subjectListConfig = {
    primaryField: { key: 'name' },
    secondaryField: { key: 'teacher_details.user_details.full_name', default: 'No teacher assigned' },
    density: 'compact',
    detailRoute: 'Subject',
    detailParamKey: 'subjectId',
    viewAllRoute: 'Subjects',
    limit: 10,
    emptyMessage: 'No subjects available'
};

export const subjectDefaultFormFields = [
    {
        label: "Name",
        key: "name",
        type: "string",
    },
    {
        label: "Classroom",
        key: "classroom",
        type: "classroom",
    },
    {
        label: "Description",
        key: "description",
        type: "longstring",
    },
    {
        label: "Teacher",
        key: "teacher",
        type: "teacher",
    },
    {
        label: "Is Active",
        key: "is_active",
        type: "boolean",
    },
];
