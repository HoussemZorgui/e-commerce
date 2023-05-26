import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";
import { Admin } from "src/admin/entities/admin.entity";
import { Customer } from "src/customers/entities/customer.entity";
import* as argon2 from 'argon2'
export type UserDocument=HydratedDocument<User>;
@Schema({timestamps:true,discriminatorKey:'items' })
export class User extends Document {

    @Prop({type:String,required:true , enum:[Customer.name , Admin.name ]})
    items:string ;
    @Prop({required:true,unique:true})
    username:string ;
    @Prop({required:true})
    firstName:string ;
    @Prop({required:true})
    lastName:string;
    @Prop({required:true,unique:true})
    email:string;
    @Prop({required:true})
    password:string;
    @Prop({required:true})
    city:string;
    @Prop({required:true})
    zipCode:string;
    @Prop()
    refreshToken:string;
    @Prop({required:true})
phone:number ;

@Prop({required:true})
address:string ;

}
export const UserSchema=SchemaFactory.createForClass(User).pre("save",
async function () {
    this.password=await argon2.hash(this.password)
}
)
