import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { SearchUsersDto } from './dto/search-users.dto';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) { }
    @Get()
    findAll(@Body() uid:string){
        return this.adminService.findAll(+uid);
    }
    
    @Post('search')
    findOne(@Body() searchUsersDto:SearchUsersDto ) {
        return this.adminService.searchUser(searchUsersDto);
    }

    @Post('user') 
    updateRole(@Body() updateUserDto: UpdateUserDto) {
        return this.adminService.updateRole(updateUserDto);
    }

    @Delete('user')
    removeUser(@Body() removeUsersDto:SearchUsersDto) {
        return this.adminService.remove(removeUsersDto);
    }
}
