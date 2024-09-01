import { Document } from "mongoose";

export interface IDelivery extends Document{

   readonly deliveryDate :string;
   readonly deliveryDescription:string ;
    readonly deliveryMethod:string ;
    readonly order:string ;
}