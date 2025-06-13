package org.dante.vue3.entity;

import com.baomidou.mybatisplus.annotation.*;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@TableName("sys_user")
public class SysUser {

    @TableId(type = IdType.AUTO)
    private Long id;

    @TableField("username")
    private String username;

    @TableField("password")
    private String password;

    @TableField("real_name")
    private String realName;

    @TableField("email")
    private String email;

    @TableField("mobile")
    private String mobile;

    @TableField("avatar")
    private String avatar;

    /**
     * 性别（0-未知 1-男 2-女）
     */
    @TableField("gender")
    private Integer gender;

    /**
     * 状态（0-禁用 1-正常）
     */
    @TableField("status")
    private Integer status;

    @TableField("dept_id")
    private Long deptId;

    @TableField(value = "create_by", fill = FieldFill.INSERT)
    private String createBy;

    @TableField(value = "create_time", fill = FieldFill.INSERT)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime createTime;

    @TableField(value = "update_by", fill = FieldFill.UPDATE)
    private String updateBy;

    @TableField(value = "update_time", fill = FieldFill.UPDATE)
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "GMT+8")
    private LocalDateTime updateTime;

    /**
     * 逻辑删除标志（0-未删除 1-已删除）
     */
    @TableLogic
    @TableField("deleted")
    private Integer deleted;


}
