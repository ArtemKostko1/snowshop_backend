import {
	getApiGlobalPrefix,
	getApiPort,
	getCorsOrigins,
	getDatabaseUrl,
	getJWTExpire,
	getJWTSecret,
} from 'src/common/utils/env/env.config';

export default () => ({
	port: getApiPort(),
	global_prefix: getApiGlobalPrefix(),
	database_url: getDatabaseUrl(),
	jwtSecret: getJWTSecret(),
	jwtExpire: getJWTExpire(),
	cors_origins: getCorsOrigins(),
});
