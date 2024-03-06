import { Injectable, NotFoundException } from '@nestjs/common';
import { Admin } from './entities/admin.entity';
import { SearchUsersDto } from './dto/search-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';



@Injectable()
export class AdminService {
    private admins: Array<Admin> = [
        {
            uid: 1,
            level: 1,
            name: 'MJ',
            email: 'mj@example.com', // 이메일은 문자열로 표현
            role: ['1', '2', 'admin'],
            period: 1,
            phone: '01021077455'
    // sid: number;
        }
    ]; //admins = user database
    private readonly adminUID = 1;

    findAll(uid: number) {
        // this.isAdmin(uid); jwt 인증 방식을 써야 될 듯
        return [...this.admins];
    }

    // findOne(searchUsersDto:SearchUsersDto) {
    //     this.isAdmin(searchUsersDto.auid);
    //     if(!searchUsersDto.name){

    //     }
    //     const found = this.admins.find((u) => u.name === searchUsersDto.name);
    //     if (!found) throw new NotFoundException();
    //     return found;
    // }

    updateRole(updateUserDto: UpdateUserDto) {
        if (!updateUserDto.name) {
            const found = this.searchUser(updateUserDto);
            this.remove(updateUserDto);
            this.admins.push({ ...found, ...updateUserDto.role });
        }
    }

    remove(removeUsersDto: SearchUsersDto ) {
        this.isAdmin(removeUsersDto.uid);
        // this.searchUser(removeUsersDto);
        this.admins = this.admins.filter((u) => u.uid !== removeUsersDto.sid);
    }

    isAdmin(uid: number) {
        if (uid !== this.adminUID) {
            throw new NotFoundException("Access Denied");
        }
    }

    searchUser(searchUsersDto: SearchUsersDto) {
        // const {auid, name, uid} = searchUsersDto;
        this.isAdmin(searchUsersDto.uid);

        const found = this.admins.find((u) => {
            if (searchUsersDto.name && searchUsersDto.sid) {
                return u.name === searchUsersDto.name && u.uid === searchUsersDto.sid;
            }
            // 검색 조건이 name만 제공될 경우
            else if (searchUsersDto.name) {
                return u.name === searchUsersDto.name;
            }
            // 검색 조건이 uid 제공될 경우
            else if (searchUsersDto.sid) {
                return u.uid === searchUsersDto.sid;
            }
            // 검색 조건이 없을 경우 모든 사용자 반환 (이 부분은 요구사항에 따라 조정할 수 있음)
            else return [];
        });
        if (!found) throw new NotFoundException();
        return found;
    }
}
