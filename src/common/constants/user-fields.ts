const USER_FIELDS = {
	id: true,
	email: true,
	password: true,
	name: true,
	roleId: true,
	sexId: true,
	age: true,
	phoneNumber: true,
	createdAt: true,
	updatedAt: true,
};

export const CLIENT_USER_FIELDS = {
	...USER_FIELDS,
	password: false,
};

export const APP_USER_FIELDS = {
	...USER_FIELDS,
};
