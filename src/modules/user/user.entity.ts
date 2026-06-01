import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user")
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "id", type: String, required: false })
  userid: string;

  @Column({ type: "varchar" })
  @ApiProperty({ description: "名称", type: String })
  username: string;

  @Column({ type: "varchar" })
  @ApiProperty({ description: "密码", type: String })
  password: string;

  @Column({ type: "varchar" })
  @ApiPropertyOptional({ enum: ["0", "1"], description: "性别 0 ｜ 1" })
  gender: number;

  @Column({ type: "varchar" })
  @ApiPropertyOptional({ description: "邮箱", type: String })
  email?: string;

  @Column({ type: "timestamp" })
  @ApiPropertyOptional({ description: "创建时间", type: Date })
  creatTime?: Date;
}
