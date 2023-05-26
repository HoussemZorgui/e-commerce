import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { UsersService } from 'src/users/users.service';
import * as argon2 from 'argon2'
import { CreateLoginDto } from './dto/create-login.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class AuthService {

    constructor (private usersService :UsersService,
         private configService:ConfigService,
         private jwtService:JwtService){}


         async signUp(createUserDto:CreateUserDto):Promise<any>{
            //check if user exists
           const userExists=await this.usersService.findByUsername(
            createUserDto.username
           ) 
           if (userExists){
            throw new BadRequestException("User already exists")
           }
          
           const hash= await this.hashData(createUserDto.password)

           const newUser=await this.usersService.createUser({
            ...createUserDto,
            password:hash
           })

           const tokens=await this.getTokens(newUser._id , newUser.username)
       /*     await this.refreshTokens(newUser._id,tokens.refreshToken) */
           return tokens
         }

         async signIn(data:CreateLoginDto){
            const user=await this.usersService.findByUsername(data.username)

            if(!user)throw new BadRequestException('User does not exist');
            const passwordMatches=await argon2.verify(user.password , data.password)
            if (!passwordMatches)
            throw new BadRequestException ('Password is incorrect ');
            const tokens=await this.getTokens(user._id , user.username)
            await this.updateRefreshToken(user._id,tokens.refreshToken)
           // return {tokens , user}
           return {tokens:tokens.accessToken, firstName:user.firstName,items:user.items , user}
         }

       // criptage de password et de refresh token 
         hashData(data:string){
            return argon2.hash(data)
         }
         //generate access token et refresh token
         async getTokens (userId:string , username:string){
            const [accessToken , refreshToken]=await Promise.all([
               this.jwtService.signAsync({
                  sub: userId, username 
               },
               {
                  secret:this.configService.get<string>('JWT_ACCESS_SECRET'),
                  expiresIn:'7d'
               }),
               this.jwtService.signAsync({
                  sub:userId, username 
               },
               {
                  secret:this.configService.get<string>('JWT_REFRESH_SECRET'),
                  expiresIn:'7d'
               })
            ])
            return {
               accessToken,
               refreshToken
            }
         }

         async refreshTokens(userId:string , refreshToken:string){
            const user = await this.usersService.getUser(userId)
            if(!user || !user.refreshToken)
            throw new ForbiddenException('Access Denied')

            const refreshTokenMatches=await argon2.verify(
               user.refreshToken,
               refreshToken
            )
            if (!refreshTokenMatches)
            throw new ForbiddenException('Access Denied')

            const Tokens=await this.getTokens(user._id, user.username)
            await this.updateRefreshToken(user.id,Tokens.refreshToken)


            return Tokens
         }

         async updateRefreshToken(UserId:string , refreshToken:string){
            const hashedRefreshToken=await this.hashData(refreshToken)
            await this.usersService.updateUser(UserId,{
               refreshToken:hashedRefreshToken
            })
         }

         async logout(UserId:string){
            this.usersService.updateUser(UserId,{refreshToken:null})
         }

         async updateProfil( userId:string , updateuserDto:UpdateUserDto ){
            const user=await this.usersService.updateUser(userId , updateuserDto )
          
            const tokens=await this.getTokens(user._id,user.username)
            await this.updateRefreshToken(user._id,tokens.refreshToken)
            return {tokens:tokens.accessToken, firstName:user.firstName,items:user.items , user}
    
        }
         
}
