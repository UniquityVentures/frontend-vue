import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import StudentEventsPage from "../views/StudentEventsPage.vue";
import CalendarPage2 from "../views/CalendarPage2.vue";
import CalendarPage from "../views/CalendarPage.vue";
import StudentEventPage from "../views/StudentEventPage.vue";
import StudentCalendarPage2 from "../views/StudentCalendarPage2.vue";
import EventsPage from "../views/EventsPage.vue";

export default [
	{
		path: "calendar/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			getDisplayName: () => "Calendar",
			defaultRoute: "Calendar",
			description: "View calendar events",
			getMenu: () => [
				{
					title: "Calendar",
					to: { name: "Calendar" },
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
				path: "events/",
				component: EmptyLayout,
				meta: {
					defaultRoute: "Events",
					getDisplayName: () => "Events",
				},
				children: [
					{
						path: "",
						component: EventsPage,
						name: "Events",
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
							],
						},
						children: [
							{
								path: "all/",
								component: StudentEventPage,
								name: "Event",
								props: true,
							},
						],
					},
				],
			},
		],
	},
];
