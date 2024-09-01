import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config/dist';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { OrdersModule } from './orders/orders.module';
import { CustomersModule } from './customers/customers.module';
import { OrderproductModule } from './orderproduct/orderproduct.module';

import { DeliveryModule } from './delivery/delivery.module';
import { AdminModule } from './admin/admin.module';


@Module({
  imports: [MongooseModule.forRoot("mongodb://127.0.0.1:27017",{dbName:"BoutiquePFE"}), 
  CategoriesModule, ProductsModule, UsersModule, AuthModule,ConfigModule.forRoot({isGlobal:true}),OrdersModule,CustomersModule,OrderproductModule,
  MailerModule.forRoot({
    transport:{
      host:"sandbox.smtp.mailtrap.io",
      port:2525,
      auth:{
        user: "b18c42381b987c",
        pass: "d90af4d2cab7fa"
      }
    },
    defaults:{
      from:'"No Replay"<noreply@example.com>'
    },
    template:{
      dir:join(__dirname,'templates'),
      adapter: new HandlebarsAdapter(),
      options:{
        strict:true
      }
    }
  }),

  DeliveryModule,
  AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
