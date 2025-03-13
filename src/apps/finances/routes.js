import AppSideBarBreadcrumbsLayout from "@/layouts/AppSideBarBreadcrumbsLayout.vue";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import { api } from "@/services/api";
import TransactionPage from "./views/TransactionPage.vue";
import TransactionsPage from "./views/TransactionsPage.vue";

export default [
	{
		path: "finances/",
		component: AppSideBarBreadcrumbsLayout,
		meta: {
			requiresAuth: true,
			getDisplayName: () => "Finances",
			defaultRoute: "Transactions",
			description: "View and manage finances",
			getMenu: (props) => [
				{
					title: "All Transactions",
					to: { name: "Transactions", params: props },
				},
			],
			icon: "mdi-credit-card-outline",
		},
		children: [
			{
				path: "all/",
				component: TransactionsPage,
				name: "Transactions",
			},
			{
				path: ":transactionId",
				props: true,
				component: EmptyLayout,
				meta: {
					defaultRoute: "Transaction",
					getDisplayName: async (params) =>
						(await api.get(`api/finances/transaction/${params.transactionId}/`)).data.id,
					getMenu: (props) => [
						{
							title: "View Transaction",
							to: { name: "Transaction", params: props },
						},
					],
					icon: "mdi-account-card-outline",
				},
				children: [
					{
						path: "",
						component: TransactionPage,
						name: "Transaction",
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
