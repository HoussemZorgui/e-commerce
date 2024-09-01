import { Controller, Get, Param, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}


@Get("file/:folder/:img")
getFile(@Param('img')img , @Param('folder')folder):StreamableFile{
  const file= createReadStream(join(process.cwd(),'./upload/'+folder+'/'+img))
return new StreamableFile(file)
}


@Get("mail")
@ApiTags("mail")
async signup(){
  // generer token statique 
  const token=Math.floor(1000 +Math.random()*9000).toString()

  const user={name:"Anouaar", email:"ounianouaar6@gmail.com"}
  await this.appService.sendUserConfirmation(user , token)
}
}
