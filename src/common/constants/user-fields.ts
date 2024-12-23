const USER_FIELDS = {
  id: true,
  username: true,
  email: true,
  division_id: true,
  role_id: true,
  status: true,
  uuid: true,
  password: true,
  inserted_at: true,
  updated_at: true,
};

export const CLIENT_USER_FIELDS = {
  ...USER_FIELDS,
  uuid: false,
  password: false,
};

export const APP_USER_FIELDS = {
  ...USER_FIELDS,
};
