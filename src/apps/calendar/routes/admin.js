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
			defaultRoute: "AdminCalendar",
			description: "View and manage calendar",
			getMenu: () => [
				{
					title: "Calendar",
					to: { name: "AdminCalendar" },
				},
				{
					title: "Events",
					to: { name: "AdminEvents" },
				},
			],
			icon: "mdi-calendar",
		},
		children: [
			{
				path: "calendar/",
				component: CalendarPage2,
				name: "AdminCalendar",
			},
			{
				path: "events/",
				component: EmptyLayout,
				meta: {
					defaultRoute: "AdminEvents",
					getDisplayName: () => "Events",
				},
				children: [
					{
						path: "",
						component: EventsPage,
						name: "AdminEvents",
					},
					{
						path: ":eventId/",
						component: EmptyLayout,
						props: true,
						meta: {
							defaultRoute: "AdminEvent",
							getDisplayName: () => "Event",
						},
						children: [
							{
								path: "all/",
								component: EventPage,
								name: "AdminEvent",
								props: true,
							},
						],
					},
				],
			},
		],
	},
];
