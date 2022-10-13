import { Controller, Body, Post, Get, Patch, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/auth/public.decorator';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { isAdmin } from 'src/common/decorators/isAdmin.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserRole } from './dto/update-user-role.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserWithoutPassword } from './entities/without-password.entity';
import { UserService } from './user.service';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /** Create New User  */
  @ApiOperation({summary: 'Create New User'})
  @Public()
  @Post()
  create(@Body() CreateUser: CreateUserDto) {
    return this.userService.createUser(CreateUser)
  }

  /** Return User Profile Information But Without Password */

  @ApiOperation({summary: 'Get User Profile'})
  @ApiBearerAuth()
  @Get()
  @ApiOkResponse({
    type: UserWithoutPassword
  })
  findById(@CurrentUser() userId: User['id']): Promise<UserWithoutPassword> {
    return this.userService.findById(userId)
  }
  /** Update User Informations */

  @ApiOperation({summary: 'Update User'})
  @ApiBearerAuth()
  @Patch()
  @ApiOkResponse({
    type: UserWithoutPassword
  })
  update(@CurrentUser('id') userId: User['id'], @Body() updateUser: UpdateUserDto): Promise<UserWithoutPassword> {
    return this.userService.update(userId, updateUser)
  }

  /**Update User Role, Only For Admin */

  @ApiOperation({summary: 'Admin Update User Role'})
  @isAdmin()
  @Patch('role')
  @ApiOkResponse({
    type: UserWithoutPassword
  })
  updateRole(@Body() updateRole: UpdateUserRole): Promise<UserWithoutPassword> {
    return this.userService.updateRole(updateRole)
  }

  /**Delete User */
  @ApiOperation({summary: 'Delete User'})
  @ApiBearerAuth()
  @Delete()
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@CurrentUser() userId: User['id'], @Body() deleteUser: DeleteUserDto) {
    return this.userService.deleteUser(userId, deleteUser)
  }
}
