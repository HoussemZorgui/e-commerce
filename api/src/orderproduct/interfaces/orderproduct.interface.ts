import { Document } from "mongoose";

export interface IOrderproduct extends Document{


    readonly order:string ;
    readonly product : string ;
}