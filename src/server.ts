import { INestApplication               } from '@nestjs/common';       // an interface which is used to define the application
import { NestFactory                    } from '@nestjs/core';         // used to create the NestJS application
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';      // used to create the swagger module
import { json                           } from 'express';              // used to parse the request body
import * as helmet                        from 'helmet';               // used to secure the application
import { ApplicationModule              } from './modules/app.module'; // used to import the application module
import { CommonModule, LogInterceptor   } from './modules/common';     // used to import the common module

/**
 * These are API defaults that can be changed using environment variables,
 * it is not required to change them (see the `.env.example` file)
 */
const API_DEFAULT_PORT   = 3000;
const API_DEFAULT_PREFIX = '/api/v1/';

/**
 * The defaults below are dedicated to Swagger configuration, change them
 * following your needs (change at least the title & description).
 * 
 */
const SWAGGER_TITLE       = 'Timework API';
const SWAGGER_DESCRIPTION = 'Timework API is a RESTful API that allows you to manage your employees and their time tracking.';
const SWAGGER_PREFIX      = '/docs';

/**
 * Register a Swagger module in the NestJS application.
 * This method mutates the given `app` to register a new module dedicated to
 * Swagger API documentation. Any request performed on `SWAGGER_PREFIX` will
 * receive a documentation page as response.
 *
 */
function createSwagger(app: INestApplication) {

    const version = require('../package.json').version || '';

    const options = new DocumentBuilder()
        .setTitle(SWAGGER_TITLE)
        .setDescription(SWAGGER_DESCRIPTION)
        .setVersion(version)
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup(SWAGGER_PREFIX, app, document);
}

/**
 * Build & bootstrap the NestJS API.
 * This method is the starting point of the API; it registers the application
 * module and registers essential components such as the logger and request
 * parsing middleware.
 */
async function bootstrap(): Promise<void> {

    const app = await NestFactory.create(ApplicationModule, { 
        cors: {
            origin: true,
            credentials: true,
            exposedHeaders: ['Set-Cookie']
        }
    });

    app.setGlobalPrefix(process.env.API_PREFIX || API_DEFAULT_PREFIX);

    if (!process.env.SWAGGER_ENABLE || process.env.SWAGGER_ENABLE === '1') {
        createSwagger(app);
    }

    app.use(json());
    app.use(helmet());

    const logInterceptor = app.select(CommonModule).get(LogInterceptor);
    app.useGlobalInterceptors(logInterceptor);

    await app.listen(process.env.API_PORT || API_DEFAULT_PORT);
}

/**
 * It is now time to turn the lights on!
 * Any major error that can not be handled by NestJS will be caught in the code
 * below. The default behavior is to display the error on stdout and quit.
 *
 * @todo It is often advised to enhance the code below with an exception-catching
 *       service for better error handling in production environments.
 */
bootstrap().catch(err => {
    // tslint:disable-next-line:no-console
    console.error(err);
    process.exit(1);
});
