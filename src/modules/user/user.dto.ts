import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class UserDto extends BaseEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "id", type: String, required: false })
  userid: string;

  @Column({ type: "varchar" })
  @ApiProperty({ description: "名称", type: String })
  username: string;

  @Column({ type: "varchar" })
  @ApiPropertyOptional({ enum: ["0", "1"], description: "性别 0 ｜ 1" })
  gender: number;

  @Column({ type: "varchar" })
  @ApiPropertyOptional()
  email?: string;
}
