import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { AccessTokenGuard } from 'src/common/guards/accessToken.guard';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Res() response, @Body() createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersService.createUser(createUserDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'User has been created Successfully',
        status: HttpStatus.CREATED,
        data: newUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error User not created ' + err,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Get('items')
  async findAllUserByitems(@Query('items') items: string, @Res() response) {
    try {
      const existingUser = await this.usersService.findAllUserByitems(items);
      return response.status(HttpStatus.OK).json({
        message: 'User found Successfully',
        status: HttpStatus.OK,
        data: existingUser,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  //configuration de route proteger
  @ApiBearerAuth('access-token')
  @UseGuards(AccessTokenGuard)
  @Get()
  async getAllUsers(@Res() response) {
    try {
      const usersData = await this.usersService.getAllUsers();
      return response.status(HttpStatus.OK).json({
        message: 'All Users data found successfully',
        status: HttpStatus.OK,
        data: usersData,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'should be an id of users that existing in the database',
    type: String,
  })
  async getUser(@Res() response, @Param('id') UserId: string) {
    try {
      const existingUser = await this.usersService.getUser(UserId);
      return response.status(HttpStatus.OK).json({
        message: 'User found by id successfully',
        status: HttpStatus.OK,
        data: existingUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'should be an id of users that existing in the database',
    type: String,
  })
  async updateUser(
    @Res() response,
    @Param('id') UserId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const existingUser = await this.usersService.updateUser(
        UserId,
        updateUserDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'User has been successfully updated ',
        status: HttpStatus.OK,
        data: existingUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    required: true,
    description: 'should be an id of users that existing in the database',
    type: String,
  })
  async deleteUser(@Res() response, @Param('id') UserId: string) {
    try {
      const deleteUser = await this.usersService.deleteUser(UserId);
      return response.status(HttpStatus.OK).json({
        message: 'User deleted successfully',
        status: HttpStatus.OK,
        data: deleteUser,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: err.message,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }
}
