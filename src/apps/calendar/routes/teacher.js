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
			defaultRoute: "TeacherCalendar",
			description: "View and manage calendar",
			getMenu: () => [
				{
					title: "Calendar",
					to: { name: "TeacherCalendar" },
				},
				{
					title: "Events",
					to: { name: "TeacherEvents" },
				},
			],
			icon: "mdi-calendar",
		},
		children: [
			{
				path: "calendar/",
				component: CalendarPage2,
				name: "TeacherCalendar",
			},
			{
				path: "events/",
				component: EmptyLayout,
				meta: {
					defaultRoute: "TeacherEvents",
					getDisplayName: () => "Events",
				},
				children: [
					{
						path: "",
						component: EventsPage,
						name: "TeacherEvents",
					},
					{
						path: ":eventId/",
						component: EmptyLayout,
						props: true,
						meta: {
							defaultRoute: "TeacherEvent",
							getDisplayName: () => "Event",
						},
						children: [
							{
								path: "all/",
								component: EventPage,
								name: "TeacherEvent",
								props: true,
							},
						],
					},
				],
			},
		],
	},
];
