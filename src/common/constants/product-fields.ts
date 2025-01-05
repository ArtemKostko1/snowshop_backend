const PRODUCT_FIELDS = {
	id: true,
	name: true,
	price: true,
	categoryId: true,
	brandId: true,
	size: true,
	article: true,
	inStock: true,
	description: true,
	internalCode: true,
	createdAt: true,
	updatedAt: true,
};

export const CLIENT_PRODUCT_FIELDS = {
	...PRODUCT_FIELDS,
};

export const APP_PRODUCT_FIELDS = {
	...PRODUCT_FIELDS,
};
