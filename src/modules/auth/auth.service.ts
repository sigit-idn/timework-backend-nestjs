import { Injectable      } from '@nestjs/common';
import { EmployeeService } from '../employee/service';
import { JwtService      } from '@nestjs/jwt';
import { Employee        } from '../employee/model';
import { compare         } from 'bcrypt';

/**
 * @class AuthService
 * @description Authentication service
 */
@Injectable()
export class AuthService {
	constructor(
		private employeeService: EmployeeService,
		private jwtService: JwtService,
	) {}

	/**
	 * @method validateUser
	 * @description Validate user
	 * @param {string} email
	 * @param {string} password
	 * @returns {Promise<Employee|null>}
	 */
	public async validateUser(email: string, password: string): Promise<Employee|null> {
		const user = await this.employeeService.findOne({ email });
		
		if (!user) return null;

		const isPasswordMatching = await compare(password, user.password);

		if (!isPasswordMatching) return null;

		return user;
	}

	/**
	 * @method generateToken
	 * @description Generate access token
	 * @param {Employee} user
	 * @returns {Promise<{access_token: string}>}
	 */
	public async generateToken({email, id, role}: Employee): Promise<string> {
		const payload = { email, id, role };
		
		return this.jwtService.sign(payload);
	}

	/**
	 * @method login
	 * @description Login employee
	 * @param {Partial<Employee>} { email, password }
	 * @returns {Promise<{access_token: string}>}
	 */
	public async login({ email, password }: Partial<Employee>): Promise<[Employee, string]|null> {
		const user = await this.validateUser(email!, password!);

		if (!user) return null;

		return [user, await this.generateToken(user)];
	}
}