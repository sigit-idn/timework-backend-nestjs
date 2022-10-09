import { Controller, Post, UseGuards, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { GuestGuard  } from '../common';
import { Employee    } from '../employee/model';
import { AuthService } from './auth.service';


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
	 * @returns {Promise<Response<{ access_token: string }>>}
	 */
	@UseGuards(GuestGuard)
	@Post('login')
	async login(
		@Body() { email, password }: Partial<Employee>,
		@Res() res: Response
	): Promise<Response<{ access_token: string }>> {
		const loginData = await this.authService.login({email, password});

		if (!loginData) return res.status(401).json({ message: 'Invalid credentials' });

		const [{name, role}, access_token] = loginData;

		if (!access_token) {
			return res.status(401).json({
				status: 'error',
				message: 'Invalid credentials'
			});
		}

		res.cookie('access_token', access_token, { httpOnly: true });

		return res.status(200).json({
			status: 'success',
			message: 'Login successful',
			data: {
				name,
				role
			}
		});
	}
}
