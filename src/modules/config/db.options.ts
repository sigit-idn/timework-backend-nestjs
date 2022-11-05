// import { TypeOrmModuleOptions } from "@nestjs/typeorm";
// import { configProvider       } from "../common";

// const configFactory = configProvider.useFactory();

// const dbOptions: TypeOrmModuleOptions = {
// 	type            : configFactory.TYPEORM_CONNECTION,
// 	host            : configFactory.TYPEORM_HOST,
// 	port            : configFactory.TYPEORM_PORT,
// 	username        : configFactory.TYPEORM_USERNAME,
// 	password        : configFactory.TYPEORM_PASSWORD,
// 	database        : configFactory.TYPEORM_DATABASE,
// 	entities        : [configFactory.TYPEORM_ENTITIES],
// 	autoloadEntities: true,
// };


// if (process.env.NODE_ENV === 'production') {
// 	dbOptions.ssl = {
// 		rejectUnauthorized: !!configFactory.TYPEORM_SSL_REJECT_UNAUTHORIZED
// 	};
// }


// export default dbOptions;