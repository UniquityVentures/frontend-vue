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
			defaultRoute: "StudentTransactions",
			description: "View and manage finances",
			getMenu: (props) => [
				{
					title: "All Transactions",
					to: { name: "StudentTransactions", params: props },
				},
				{
					title: "Request Transactions",
					to: { name: "StudentTransactionRequest", params: props },
				},
			],
			icon: "mdi-credit-card-outline",
		},
		children: [
			{
				path: "all/",
				component: TransactionsPage,
				name: "StudentTransactions",
			},
			{
				path: "request/",
				component: TransactionRequestFormPage,
				name: "StudentTransactionRequest",
			},
			{
				path: ":transactionId",
				props: true,
				component: EmptyLayout,
				meta: {
					defaultRoute: "StudentTransaction",
					getDisplayName: async (params) =>
						(await api.get(`api/finances/transaction/${params.transactionId}/`))
							.data.order_id,
					getMenu: (props) => [
						{
							title: "View Transaction",
							to: { name: "StudentTransaction", params: props },
						},
					],
					icon: "mdi-account-card-outline",
				},
				children: [
					{
						path: "",
						component: TransactionPage,
						name: "StudentTransaction",
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
