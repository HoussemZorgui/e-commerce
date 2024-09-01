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
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('admin')
@ApiTags('Admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  async createAdmin(@Res() response, @Body() createAdminDto: CreateAdminDto) {
    try {
      const newAdmin = await this.adminService.createAdmin(createAdminDto);
      return response.status(HttpStatus.CREATED).json({
        message: ' Admin has been created Successfully ',
        status: HttpStatus.CREATED,
        data: newAdmin,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error Admin not created ' + err,
        status: HttpStatus.BAD_REQUEST,
        data: null,
      });
    }
  }

  @Get()
  async getAllAdmins(@Res() response) {
    try {
      const AdminsData = await this.adminService.getAllAdmins();
      return response.status(HttpStatus.OK).json({
        message: 'All Admins data found successfully ',
        status: HttpStatus.OK,
        data: AdminsData,
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
  async getAdmin(@Res() response, @Param('id') AdminId: string) {
    try {
      const existingAdmin = await this.adminService.getAdmin(AdminId);
      return response.status(HttpStatus.OK).json({
        message: 'Admin found by id successfully',
        status: HttpStatus.OK,
        data: existingAdmin,
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
  async updateAdmin(
    @Res() response,
    @Param('id') AdminId: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ) {
    try {
      const existingAdmin = await this.adminService.updateAdmin(
        AdminId,
        updateAdminDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Admin has been successfully updated',
        status: HttpStatus.OK,
        data: existingAdmin,
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
  async deleteAdmin(@Res() response, @Param('id') AdminId: string) {
    try {
      const deleteAdmin = await this.adminService.deleteAdmin(AdminId);
      return response.status(HttpStatus.OK).json({
        message: 'Admin deleted successfully',
        status: HttpStatus.OK,
        data: deleteAdmin,
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
