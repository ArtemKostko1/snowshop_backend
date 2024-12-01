export const getApiPort = () => {
  const DEFAULT_API_PORT = '8082';
  const envPort = process.env.PORT;

  if (envPort) return envPort;
  else
    console.warn(
      `Неверный PORT сервера: ${envPort}. PORT установлен по умолчанию`,
    );

  return DEFAULT_API_PORT;
};

export const getApiGlobalPrefix = () => {
  const DEFAULT_API_GLOBAL_PREFIX = 'api';
  const envGlobalPrefix = process.env.GLOBAL_PREFIX;

  if (envGlobalPrefix) return envGlobalPrefix;
  else
    console.warn(
      `Неверный глобальный префикс сервера: ${envGlobalPrefix}. Глобальный префикс установлен по умолчанию`,
    );

  return DEFAULT_API_GLOBAL_PREFIX;
};

export const getDatabaseUrl = () => {
  const DEFAULT_DATABASE_URL = 'mysql://root:root@localhost:3306/snowShop';
  const envDatabaseUrl = process.env.DATABASE_URL;

  if (envDatabaseUrl) return envDatabaseUrl;
  else
    console.warn(
      `Неверный URL базы данных: ${envDatabaseUrl}. URL базы данных установлен по умолчанию`,
    );

  return DEFAULT_DATABASE_URL;
};

export const getJWTSecret = () => {
  const DEFAULT_JWT_SECRET = 'snowShopJWTSecret';
  const envJWTSecret = process.env.JWT_SECRET;

  if (envJWTSecret) return envJWTSecret;
  else
    console.warn(
      `Неверный JWT ключ: ${envJWTSecret}. JWT ключ установлен по умолчанию`,
    );

  return DEFAULT_JWT_SECRET;
};

export const getJWTExpire = () => {
  const DEFAULT_JWT_EXPIRE = '15m';
  const envJWTExpire = process.env.JWT_EXPIRE;

  if (envJWTExpire) return envJWTExpire;
  else
    console.warn(
      `Неверная продолжительность токена: ${envJWTExpire}. Продолжительность токена установлена по умолчанию`,
    );

  return DEFAULT_JWT_EXPIRE;
};

export const getCorsOrigins = () => {
  const DEFAULT_CORS_ORIGINS = 'http://localhost:3000';
  const envCorsOrigins = process.env.CORS_ORIGINS;

  if (envCorsOrigins) return envCorsOrigins;
  else
    console.warn(
      `Неверный список разрешенных адресов клиентской части: ${envCorsOrigins}. Разрешенный адрес клиентской части установлен по умолчанию`,
    );

  return DEFAULT_CORS_ORIGINS;
};
