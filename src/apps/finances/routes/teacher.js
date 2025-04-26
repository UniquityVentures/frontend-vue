import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { api } from "@/services/api";
import TransactionPage from "../views/TransactionPage.vue";
import TransactionRequestFormPage from "../views/TransactionRequestFormPage.vue";
import TransactionsPage from "../views/TransactionsPage.vue";

export default [
	{
		path: "finances/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			requiresAuth: true,
			getDisplayName: () => "Finances",
			defaultRoute: "TeacherTransactions",
			description: "View and manage finances",
			getMenu: (props) => [
				{
					title: "All Transactions",
					to: { name: "TeacherTransactions", params: props },
				},
				{
					title: "Request Transactions",
					to: { name: "TeacherTransactionRequest", params: props },
				},
			],
			icon: "mdi-credit-card-outline",
		},
		children: [
			{
				path: "all/",
				component: TransactionsPage,
				name: "TeacherTransactions",
			},
			{
				path: "request/",
				component: TransactionRequestFormPage,
				name: "TeacherTransactionRequest",
			},
			{
				path: ":transactionId",
				props: true,
				component: EmptyLayout,
				meta: {
					defaultRoute: "TeacherTransaction",
					getDisplayName: async (params) =>
						(await api.get(`api/finances/transaction/${params.transactionId}/`))
							.data.order_id,
					getMenu: (props) => [
						{
							title: "View Transaction",
							to: { name: "TeacherTransaction", params: props },
						},
					],
					icon: "mdi-account-card-outline",
				},
				children: [
					{
						path: "",
						component: TransactionPage,
						name: "TeacherTransaction",
						props: true,
					},
					/*
                    {
                        path: "edit/",
                        component: EmptyLayout,
                        name: "EditTeacher",
                        props: true,
                    },
                    */
				],
			},
		],
	},
];
