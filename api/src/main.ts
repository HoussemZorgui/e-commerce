import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import * as basicAuth from'express-basic-auth';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';

var cors=require('cors')
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const corsOptions={
    origin :'http://localhost:3000',
    credentials:true,
    optionSuccessStatus:200

  }
  app.use(cors(corsOptions));

  app.use(['/boutique','/docs-json'],basicAuth({
    challenge:true,
    users:{
    ["admin"]:"admin"
    }
  }))

  const config =new DocumentBuilder()
  .setTitle('Boutique ')
  .addTag('categories')
  .addTag('products')
  .addTag('users')
  .addTag('auth')
  .addBearerAuth({
    description:`please enter token in following format : bearer<JWT>`,
    name:'Authorization',
    bearerFormat:'Bearer',
    scheme:'Bearer',
    type:'http',
    in:'Header'
  },
  'access-token')
  .addTag('orders')
  .addTag('mail')
  .addTag('orderproduct')
  .addTag('delivery')
  .addTag('Admins')
  .addTag('customers')
  .build()

  const document=SwaggerModule.createDocument(app , config)
  SwaggerModule.setup('boutique',app,document)
  await app.listen(5000);
}
bootstrap();

