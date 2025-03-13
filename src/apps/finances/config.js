import { formatDate } from "@/services/utils";

export const transactionDefaultHeaders = [
	{ label: "Student", key: "student_details.user_details.full_name" },
	{ label: "Amount", key: "amount", formatFunc: (a) => a / 100 },
	{ label: "Date", key: "datetime", formatFunc: formatDate },
	{ label: "Transaction Type", key: "transaction_type" },
	{ label: "Transaction Status", key: "transaction_status" },
	{ label: "Payee", key: "payee_details", formatFunc: (payee) => payee.email },
];

export const transactionDefaultFilterFields = [
	{ label: "Filter by student", type: "student", key: "student" },
	{ label: "Filter by minimum amount", type: "integer", key: "amount_start" },
	{ label: "Filter by maximum amount", type: "integer", key: "amount_end" },
	{ label: "Filter by Date", type: "dates", key: ["datetime_start", "datetime_end"] },
	{ label: "Filter by transaction type", type: "n_nary", key: "transaction_type", 
        fetchOptions: () => [
			{ title: "Select", value: null },
			{ title: "UPI", value: "upi" },
			{ title: "Netbanking", value: "netbanking" },
			{ title: "Credit/Debit Card", value: "card" },
			{ title: "Digital Wallet", value: "wallet" },
		],
	},
	{ label: "Filter by order ID", type: "string", key: "order_id" },
	{ label: "Filter by transaction status", type: "n_nary", key: "transaction_status",
		fetchOptions: () => [
			{ title: "Select", value: null },
			{ title: "Success", value: "S" },
			{ title: "Pending", value: "P" },
			{ title: "Failed", value: "F" },
		],
	},
	{ label: "Filter by purpose", type: "transaction_purpose", key: "purpose" },
	{ label: "Filter by payee", type: "payee", key: "payee" },
];