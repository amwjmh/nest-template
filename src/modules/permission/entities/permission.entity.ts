import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("permission")
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: "id", type: String, required: false })
  id: string;

  @Column({ type: "varchar" })
  @ApiProperty({ description: "权限编码", type: String })
  permissionCode: string;

  @Column({ type: "varchar" })
  @ApiProperty({ description: "权限名称", type: String })
  permissionName: string;

  @Column({ type: "varchar" })
  @ApiProperty({ description: "描述", type: String })
  desc: string;

  @CreateDateColumn({ type: "timestamp" })
  @ApiProperty({ description: "创建时间", type: Date })
  createTime: Date;

  @CreateDateColumn({ type: "timestamp" })
  @ApiProperty({ description: "更新时间", type: Date })
  updateTime: Date;
}
