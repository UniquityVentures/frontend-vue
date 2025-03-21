import { createViewset } from "@/services/viewset";

const transactionViewset = createViewset("api/finances/transaction");
const purposeViewset = createViewset("api/finances/purpose");
const payeeViewset = createViewset("api/finances/payee");

// Get base methods
const getTransactions = transactionViewset.list;
const getTransaction = transactionViewset.retrieve;
const getTransactionPurposes = purposeViewset.list;
const getPayees = payeeViewset.list;
const createTransaction = transactionViewset.create;

const exportTransactions = transactionViewset.export;

// Info formatters
const getTransactionInfoFromObj = (item) => ({
	title: item.amount,
	subtitle: item.student_details.user_details.full_name,
	value: item.id,
});

const getTransactionPurposeInfoFromObj = (item) => ({
	title: item.name,
	subtitle: item.description,
	value: item.id,
});

const getPayeeInfoFromObj = (item) => ({
	title: item.email,
	subtitle: item.phone,
	value: item.id,
});


export {
	getTransactions,
	getTransactionPurposes,
	getTransaction,
	getTransactionPurposeInfoFromObj,
	getTransactionInfoFromObj,
	getPayees,
	getPayeeInfoFromObj,
	createTransaction,
	exportTransactions,
};
