import { before } from 'node:test';
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { AuthService } from '../src/auth/auth.service';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';
import { ValidationPipe } from '@nestjs/common';
import { UserService } from '../src/user/user.service';
import { UserController } from '../src/user/user.controller';
import * as pactum from 'pactum';

describe('unit_UsersController ', () => {
  let usersController: UserController;
  let usersService: UserService;

  beforeEach(async () => {
    usersService = new UserService();
    usersController = new UserController(usersService);
  });
  // the way to create a user with faker based on a model of prisma would be:
  //
  // const user = {
  //   email: faker.internet.email(),
  //   password: faker.internet.password(),
  //   username: faker.name.firstName(),
  // };
  //

  describe('getMe', () => {
    // let service : UserService;
    it('should return the logged user', async () => {
      const user = {
        id: 1,
        email: faker.internet.email(),
        password: faker.internet.password(),
        username: faker.name.firstName(),
        verified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(usersService, 'getMe').mockImplementation(() => user);
      // jest spyOn is used to mock the method getMe from the usersService. This is done to avoid calling the real method.
      expect(usersController.getMe(user)).toBe(user);
    });
  });

  it('should be defined', () => {
    expect(true).toBe(true);
  });
});

// describe('Auth', () => {
//   let app: INestApplication;
//   beforeAll(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [AuthModule],
//     }).compile();

//     app = module.createNestApplication();
//   });

//   it('POST /auth/signup', async () => {
//     const response = await request(app.getHttpServer())
//       .post('/auth/signup')
//       .send({
//         email: '',
//         password: 'password',
//       })
//       .expect(201);
//   });
//   afterAll(async () => {
//     await app.close();
//   });
// });

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    // useGlobalPipes is a method that allows you to apply a pipe to all the endpoints of the application.
    // In this case, the ValidationPipe is applied to all the endpoints of the application.
    await app.init();
  });

  // The quantity of tests is recommended to write per endpoint is 3. One for the happy path, one for the unhappy path, and one for the edge case. // Edge means the limit of something. In this case, the limit of the input. like a username with 1 character, or a password with 1 character.
  it('should return an error if the body is empty', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({})
      .expect(400)
      .expect(({ body }) => {
        expect(body).toHaveProperty('message');
      });
  });

  it('should create a new user', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: faker.internet.email(),
        password: faker.internet.password(),
        username: faker.internet.userName(),
      })
      .expect(200)
      .expect(({ body }) => {
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('email');
        expect(body).toHaveProperty('username');
      });
  });

 // the difference between supertest and jest is that supertest is used to test the endpoints of the application. Jest is used to test the logic of the application.

});
