import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import CalendarPage from "../views/CalendarPage.vue";
import EventPage from "../views/EventPage.vue";
import EventsPage from "../views/EventsPage.vue";
import CalendarPage2 from "../views/CalendarPage2.vue";

export default [
	{
		path: "calendar/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			getDisplayName: () => "Calendar",
			defaultRoute: "StudentCalendar",
			description: "View and manage calendar",
			getMenu: () => [
				{
					title: "Calendar",
					to: { name: "StudentCalendar" },
				},
				{
					title: "Events",
					to: { name: "StudentEvents" },
				},
			],
			icon: "mdi-calendar",
		},
		children: [
			{
				path: "calendar/",
				component: CalendarPage2,
				name: "StudentCalendar",
			},
			{
				path: "events/",
				component: EmptyLayout,
				meta: {
					defaultRoute: "StudentEvents",
					getDisplayName: () => "Events",
				},
				children: [
					{
						path: "",
						component: EventsPage,
						name: "StudentEvents",
					},
					{
						path: ":eventId/",
						component: EmptyLayout,
						props: true,
						meta: {
							defaultRoute: "StudentEvent",
							getDisplayName: () => "Event",
						},
						children: [
							{
								path: "all/",
								component: EventPage,
								name: "StudentEvent",
								props: true,
							},
						],
					},
				],
			},
		],
	},
];
