import { api } from "@/services/api";
import { createViewset } from "@/services/viewset";

const eventViewset = createViewset("api/events");

// Get base methods
const getEvents = eventViewset.list;
const getEvent = eventViewset.retrieve;
const updateEvent = eventViewset.update;
const createEvent = eventViewset.create;
const exportEvents = eventViewset.export;
const importEvents = {
	dryRun: eventViewset.import.dryRun,
	finalize: eventViewset.import.finalize,
};

// Custom method
const getCalendar = async (filter) =>
	(await api.get("api/events/calendar/", { params: { ...filter } })).data;

export {
	getEvents,
	getEvent,
	updateEvent,
	createEvent,
	exportEvents,
	importEvents,
	getCalendar,
};
