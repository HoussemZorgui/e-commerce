import { Document } from "mongoose";

export interface IOrder extends Document{
    readonly firstName : string;
    readonly lastName : string;
    readonly email : string;
    readonly address : string;
    readonly city : string;
    readonly country : string;
    readonly zipCode : number;
    readonly phone : number;
    readonly totalprice :number ;
    readonly numberoforder :number ;
}