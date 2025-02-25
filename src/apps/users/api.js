import { createViewset } from "@/services/viewset";

const userViewset = createViewset("api/users");

// Get base methods
const getUser = userViewset.retrieve;
const updateUser = userViewset.update;

export { getUser, updateUser };
