import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, CreateDateColumn } from "typeorm";
import { RoleEntity } from "../role/entities/role.entity";

@Entity("user")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "id", type: String, required: false })
  id: string;

  @Column({ type: "varchar" })
  @ApiProperty({ description: "名称", type: String })
  userName: string;

  @Column({ type: "varchar" })
  @ApiProperty({ description: "密码", type: String })
  password: string;

  @Column({ type: "varchar", nullable: true })
  @ApiPropertyOptional()
  gender: number;

  @Column({ type: "varchar", nullable: true })
  @ApiPropertyOptional({ description: "邮箱", type: String })
  email?: string;

  @CreateDateColumn({ type: "timestamp" })
  @ApiPropertyOptional({ description: "创建时间", type: Date })
  creatTime?: Date;

  @ManyToMany(() => RoleEntity)
  @JoinTable({ name: "user_role_relation" })
  roles: RoleEntity[];
}
