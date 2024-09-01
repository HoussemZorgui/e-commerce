import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes, Types } from "mongoose";


@Schema({timestamps:true})
export class Order extends Document {
    @Prop({required:true})
    firstName :string ;
    @Prop({required:true})
     lastName:string ;
     @Prop({required:true})
       email:string;
       @Prop({required:true})
         address:string;
         @Prop({required:true})
         city:string;
         @Prop({required:true})
            country:string;
            @Prop({required:true})
          zipCode:number ;
          @Prop({required:true})
          phone:number ;

@Prop({required:true})
totalPrice :number ;
@Prop({required:false})  
numberOforder :number ;
@Prop({required:false}) 
dateCommande : string ;
@Prop({required:false}) 
facture:string ;
@Prop([{type:SchemaTypes.ObjectId,ref:'orderproduct'}])
orderproduct:Types.ObjectId[];
@Prop([{type:SchemaTypes.ObjectId,ref:'delivery'}])
delivery:Types.ObjectId[];
}
export const OrderSchema=SchemaFactory.createForClass(Order)
