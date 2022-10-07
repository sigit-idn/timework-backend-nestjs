import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { GuestGuard                        } from '../common';
import { Employee                          } from '../employee/model';
import { AuthService                       } from './auth.service';


/**
 * @class AuthController
 * @description Auth controller is used to handle all the requests related to authentication
 */
@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}
	
	/**
	 * @method login
	 * @description Login employee
	 * @param {string} email
	 * @param {string} password
	 * @returns {Promise<{access_token: string}|null>}
	 */
	@UseGuards(GuestGuard)
	@Post('login')
	async login(@Body() { email, password }: Partial<Employee>): Promise<{access_token: string}|null> {
		return this.authService.login({ email, password }!);
	}
}
