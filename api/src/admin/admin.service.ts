import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAdmin } from './interfaces/admin.interface';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Admin')
    private adminModel: Model<IAdmin>,
  ) {}
  async createAdmin(createAdminDto: CreateAdminDto): Promise<IAdmin> {
    const newAdmin = new this.adminModel(createAdminDto);
    return newAdmin.save();
  }

  async getAllAdmins(): Promise<IAdmin[]> {
    const AdminsData = await this.adminModel.find();

    if (!AdminsData || AdminsData.length == 0) {
      throw new NotFoundException('Admins data not found ');
    }
    return AdminsData;
  }

  async getAdmin(AdminId: string): Promise<IAdmin> {
    const existingAdmin = await this.adminModel.findById(AdminId).exec();
    if (!existingAdmin) {
      throw new NotFoundException(`Admin with id ${AdminId} not found `);
    }
    return existingAdmin;
  }

  async updateAdmin(AdminId: string, updateAdminDto: UpdateAdminDto) {
    const existingAdmin = await this.adminModel
      .findByIdAndUpdate(AdminId, updateAdminDto, { new: true })
      .exec();
    if (!existingAdmin) {
      throw new NotFoundException(`Admin with id ${AdminId} not found `);
    }
    return existingAdmin;
  }

  async deleteAdmin(AdminId: string): Promise<IAdmin> {
    const deleteAdmin = await this.adminModel.findByIdAndDelete(AdminId);
    if (!deleteAdmin) {
      throw new NotFoundException(`Admin with id ${AdminId} not found `);
    }
    return deleteAdmin;
  }
}
