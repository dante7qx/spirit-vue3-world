-- sys_user 系统用户表
drop table if exists sys_user;
create table `sys_user`
(
    `id`          bigint       not null auto_increment comment '用户id',
    `username`    varchar(50)  not null comment '用户名',
    `password`    varchar(100) not null comment '密码（加密存储）',
    `real_name`   varchar(50)           default null comment '真实姓名',
    `email`       varchar(100)          default null comment '邮箱',
    `mobile`      varchar(20)           default null comment '手机号',
    `avatar`      varchar(255)          default null comment '头像url',
    `gender`      tinyint               default '0' comment '性别（0-未知 1-男 2-女）',
    `status`      tinyint      not null default '1' comment '状态（0-禁用 1-正常）',
    `dept_id`     bigint                default null comment '部门id',
    `create_by`   varchar(50)           default null comment '创建人',
    `create_time` datetime     not null default current_timestamp comment '创建时间',
    `update_time` datetime     null                  comment '更新时间',
    `update_by`   varchar(50)           default null comment '修改人',
    `deleted`     tinyint      not null default '0' comment '删除标志（0-未删除 1-已删除）',
    primary key (`id`),
    unique key `idx_username` (`username`),
    key           `idx_dept_id` (`dept_id`),
    key           `idx_status` (`status`)
) engine=innodb default charset=utf8mb4 collate=utf8mb4_0900_ai_ci comment='系统用户表';
