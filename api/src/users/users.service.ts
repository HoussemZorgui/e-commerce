import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IProduct } from 'src/products/interfaces/product.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('users')
    private userModel: Model<IUser>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async findByUsername(username: string): Promise<IUser> {
    return this.userModel.findOne({ username }).exec();
  }
  //get user by items
  async findAllUserByitems(items: string): Promise<IUser[]> {
    return this.userModel.find({ items }).exec();
  }
  async getAllUsers(): Promise<IUser[]> {
    const usersData = await this.userModel.find();
    if (!usersData || usersData.length == 0) {
      throw new NotFoundException('Users data not found');
    }
    return usersData;
  }

  async getUser(UserId: string): Promise<IUser> {
    const existingUser = await this.userModel.findById(UserId).exec();
    if (!existingUser) {
      throw new NotFoundException(`User with id ${UserId} not found `);
    }
    return existingUser;
  }

  async updateUser(UserId: string, updateUserDto: UpdateUserDto) {
    const existingUser = await this.userModel
      .findByIdAndUpdate(UserId, updateUserDto, { new: true })
      .exec();
    if (!existingUser) {
      throw new NotFoundException(`User with id ${UserId} not found `);
    }
    return existingUser;
  }

  async deleteUser(UserId: string): Promise<IUser> {
    const deleteUser = await this.userModel.findByIdAndDelete(UserId);
    if (!deleteUser) {
      throw new NotFoundException(`User with id ${UserId} not found `);
    }
    return deleteUser;
  }
}
