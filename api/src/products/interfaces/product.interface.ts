import { Document } from "mongoose";

export interface IProduct extends Document{
    readonly name :string;
    readonly description : string ;
    readonly price:string ;
    readonly newproduct:string;
    readonly qte:string;
    readonly category:string ;
    readonly file:string ;
}