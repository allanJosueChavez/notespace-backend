import { before } from "node:test";
import * as request from 'supertest';
import { AuthModule } from '../src/auth/auth.module';
import { AuthService } from '../src/auth/auth.service';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
 
describe('App e2e', () => {
  before(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [AppModule],
    // }).compile();
    // app = module.createNestApplication();
    // await app.init();
  }
  );
  it('should be defined', () => {
    expect(true).toBe(true);
  });
})


describe('Auth', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    app = module.createNestApplication();
  });

  it('POST /auth/signup', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        email: '',
        password: 'password',
      })
      .expect(201);
  });
  afterAll(async () => {
    await app.close();
  });
});