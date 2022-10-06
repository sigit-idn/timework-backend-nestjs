import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { TableOptions                           } from 'typeorm/schema-builder/options/TableOptions';

export class EmployeeMigration1533302442199 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const tableOptions: TableOptions = {
            name: 'employees',
            columns: [
                {
                    name              : 'id',
                    type              : 'int',
                    isPrimary         : true,
                    isGenerated       : true,
                    generationStrategy: 'increment'
                },
                {
                    name              : 'name',
                    type              : 'varchar',
                    length            : '255',
                    isNullable        : false
                },
                {
                    name              : 'phone',
                    type              : 'varchar',
                    length            : '255',
                    isNullable        : false
                },
                {
                    name              : 'email',
                    type              : 'varchar',
                    length            : '255',
                    isNullable        : false
                },
                {
                    name              : 'password',
                    type              : 'varchar',
                    length            : '255',
                    isNullable        : false
                },
                {
                    name              : 'position',
                    type              : 'varchar',
                    length            : '255',
                    isNullable        : false
                },
                {
                    name              : 'role',
                    type              : 'varchar',
                    length            : '255',
                    isNullable        : false
                },
                {
                    name              : 'companyId',
                    type              : 'int',
                    isNullable        : false
                },
                {
                    name              : 'address',
                    type              : 'varchar',
                    length            : '255',
                    isNullable        : true
                },
                {
                    name              : 'createdAt',
                    type              : 'timestamp',
                    isNullable        : false
                },
                {
                    name              : 'updatedAt',
                    type              : 'timestamp',
                    isNullable        : false
                }
            ]
        };

        await queryRunner.createTable(new Table(tableOptions));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.dropTable('employees');
    }

}
