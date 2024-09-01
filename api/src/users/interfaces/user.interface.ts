import { Document } from "mongoose";


export interface IUser extends Document{

    readonly username:string ;
    readonly firstName:string ;
    readonly lastName:string;
    readonly email:string;
    readonly phone:string;
    readonly password:string;
    readonly adress:string;
    readonly city:string;
    readonly zipCode:string;
    readonly refreshToken :string ;
    readonly items :string;
}