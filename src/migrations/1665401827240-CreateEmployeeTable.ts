import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEmployeeTable1665401827240 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "employees",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    isPrimary: true,
                    isNullable: false,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "name",
                    type: "varchar",
                    length: "50",
                    isNullable: false,
                },
                {
                    name: "phone",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "email",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "position",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "role",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "companyId",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "address",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "createdAt",
                    type: "varchar",
                    default: "now()",
                    isNullable: false,
                },
                {
                    name: "updatedAt",
                    type: "varchar",
                    default: "now()",
                    isNullable: false,
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("employees");
    }

}
