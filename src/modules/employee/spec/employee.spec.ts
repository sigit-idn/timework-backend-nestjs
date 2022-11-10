import * as request from 'supertest';
import * as jwt     from 'jsonwebtoken';

import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test                         } from '@nestjs/testing';
import { ApplicationModule            } from '../../app.module';

/**
 * Employee API end-to-end tests
 *
 * This test suite performs end-to-end tests on the employee API endpoints,
 * allowing us to test the behavior of the API and making sure that it fits
 * the requirements.
 */
describe('Employee API', () => {

    let app: INestApplication;

    beforeAll(async () => {

        const module = await Test.createTestingModule({
            imports: [ApplicationModule],
        })
        .compile();

        app = module.createNestApplication();
        await app.init();
    });

    afterAll(async () =>
        app.close()
    );

    it('Should return empty employee list', () =>

        request(app.getHttpServer())
            .get('/employees')
            .expect(HttpStatus.OK)
            .then(response => {
                expect(response.body).toBeInstanceOf(Array);
                expect(response.body.length).toEqual(0);
            })
    );

    it('Should insert new employee in the API', () => {

        const token = jwt.sign({ role: 'restricted' }, `${process.env.JWT_SECRET}`, {
            algorithm: 'HS256',
            issuer: 'DEFAULT_ISSUER'
        });

        return request(app.getHttpServer())
            .post('/employees')
            .set('Authorization', `Bearer ${token}`)
            .send({
                firstName: 'John',
                lastName: 'Doe'
            })
            .expect(HttpStatus.CREATED)
            .then(response => {
                expect(response.body.firstName).toEqual('John');
                expect(response.body.lastName).toEqual('Doe');
            })
    });

});
