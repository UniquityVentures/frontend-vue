import { api } from "@/services/api";

const images = [
    require("@/assets/classrooms/classroom1.png"),
    require("@/assets/classrooms/classroom2.png"),
    require("@/assets/classrooms/classroom3.png"),
];

const getClassroom = async (id) =>
    (await api.get(`api/allocation/classrooms/${id}`)).data;

const getClassrooms = async (filter) =>
    (
        await api.get("api/allocation/classrooms/all", {
            params: { page_size: 10000, ...filter },
        })
    ).data;

const updateClassroom = async (classroom) =>
    await api.put(`api/allocation/classrooms/${classroom.id}/`, classroom);

const getClassroomImage = () => {
    const index = Math.floor(Math.random() * images.length);
    return images[index];
};

const getClassroomInfoFromObj = (item) => ({
    title: item.name,
    subtitle: `Grade ${item.standard}`,
    value: item.id,
});

const createClassroom = async (classroom) =>
    await api.post("api/allocation/classrooms/create/", classroom);

const exportClassrooms = async (filter) => {
    const response = await api.get("api/allocation/classrooms/export/", {
        params: { ...filter },
        responseType: 'blob'  // Important for file downloads
    });
    
    // Create and trigger download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'classrooms.csv');
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
};

const importClassroomsDryRun = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post("api/allocation/classrooms/import/dry_run/", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

const importClassroomsFinalize = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post("api/allocation/classrooms/import/final/", formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export {
    getClassroom,
    getClassrooms,
    updateClassroom,
    getClassroomImage,
    getClassroomInfoFromObj,
    createClassroom,
    exportClassrooms,
    importClassroomsDryRun,
    importClassroomsFinalize,
};
