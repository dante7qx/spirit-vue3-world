package org.dante.vue3.mapper;

import cn.hutool.core.lang.Console;
import org.dante.vue3.SpiritVu3EluiApplicationTests;
import org.dante.vue3.entity.SysUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class SysUserMapperTest extends SpiritVu3EluiApplicationTests {

    @Autowired
    private SysUserMapper sysUserMapper;

    @Test
    void testInsert() {
        SysUser sysUser = new SysUser();
        sysUser.setUsername("testUser");
        sysUser.setPassword("testPassword123");
        sysUser.setRealName("测试用户");
        sysUser.setEmail("test@example.com");
        sysUser.setMobile("13800138000");
        sysUser.setAvatar("http://example.com/avatar.jpg");
        sysUser.setGender(1); // 假设 1 表示男性
        sysUser.setStatus(1); // 假设 1 表示启用状态
        sysUser.setDeptId(1L);
        sysUser.setDeleted(0); // 假设 0 表示未删除
        sysUserMapper.insert(sysUser);
        assert sysUser.getId() != null;
    }

    @Test
    void testSelectById() {
        Console.log(sysUserMapper.selectById(1L));
    }
}
