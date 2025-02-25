import { createViewset } from "@/services/viewset";

const recordViewset = createViewset("api/finances/record");
const purposeViewset = createViewset("api/finances/purpose");
const payeeViewset = createViewset("api/finances/payee");

// Get base methods
const getRecords = recordViewset.list;
const getPaymentPurposes = purposeViewset.list;
const getPayees = payeeViewset.list;

// Info formatters
const getRecordInfoFromObj = (item) => ({
	title: item.amount,
	subtitle: item.student_details.user_details.full_name,
	value: item.id,
});

const getPaymentPurposeInfoFromObj = (item) => ({
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
	getRecords,
	getPaymentPurposes,
	getPaymentPurposeInfoFromObj,
	getRecordInfoFromObj,
	getPayees,
	getPayeeInfoFromObj,
};
