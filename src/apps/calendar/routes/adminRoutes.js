import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import CalendarPage from "../views/CalendarPage.vue";
import EventPage from "../views/EventPage.vue";
import EventsPage from "../views/EventsPage.vue";
import EditEventPage from "../views/EditEventPage.vue";
import CreateEventPage from "../views/CreateEventPage.vue";
import DailySchedulePage from "../views/DailySchedulePage.vue";

export default [
	{
		path: "calendar/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			getDisplayName: () => "Calendar",
			defaultRoute: "Calendar",
			description: "View and manage calendar",
			getMenu: () => [
				{
					title: "Calendar",
					to: { name: "Calendar" },
				},
				{
					title: "Daily Schedule",
					to: { name: "DailySchedule" },
				},
				{
					title: "Events",
					to: { name: "Events" },
				},
			],
			icon: "mdi-calendar",
		},
		children: [
			{
				path: "calendar/",
				component: CalendarPage,
				name: "Calendar",
			},
			{
				path: "daily-schedule/",
				component: DailySchedulePage,
				name: "DailySchedule",
			},
			{
				path: "events/",
				component: EmptyLayout,
				meta: {
					defaultRoute: "Events",
					getDisplayName: () => "Events",
					getMenu: () => [
						{
							title: "Events",
							to: { name: "Events" },
						},
						{
							title: "Create New Event",
							to: { name: "CreateEvent" },
						},
					],
				},
				children: [
					{
						path: "",
						component: EventsPage,
						name: "Events",
					},
					{
						path: "create/",
						component: CreateEventPage,
						name: "CreateEvent",
					},
					{
						path: ":eventId/",
						component: EmptyLayout,
						props: true,
						meta: {
							defaultRoute: "Event",
							getDisplayName: () => "Event",
							getMenu: (params) => [
								{
									title: "View Event",
									to: { name: "Event", params },
								},
								{
									title: "Edit Event",
									to: { name: "EditEvent", params },
								},
							],
						},
						children: [
							{
								path: "all/",
								component: EventPage,
								name: "Event",
								props: true,
							},
							{
								path: "edit/",
								component: EditEventPage,
								name: "EditEvent",
								props: true,
							},
						],
					},
				],
			},
		],
	},
];
