import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000, 'localhost');
}
bootstrap()
  .then(() => {
    console.log('server running');
  })
  .catch((error) => {
    console.error(`An error occurred:`, error);
  });
