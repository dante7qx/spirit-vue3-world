package org.dante.vue3.mapper;

import cn.hutool.core.lang.Console;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.dante.vue3.SpiritVu3WorldApplicationTests;
import org.dante.vue3.entity.SysUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

class SysUserMapperTest extends SpiritVu3WorldApplicationTests {

    @Autowired
    private SysUserMapper sysUserMapper;

    @Test
    void testInsert() {
        int count = 0;
        for (int i = 1; i <= 50; i++) {
            SysUser sysUser = new SysUser();
            sysUser.setUsername("testUser" + i);
            sysUser.setPassword("123@qwe");
            sysUser.setRealName("测试用户" + i);
            sysUser.setEmail("test@example.com");
            sysUser.setMobile("1380013800" + (i - 1));
            sysUser.setAvatar("http://example.com/avatar.jpg");
            sysUser.setGender(1); // 假设 1 表示男性
            sysUser.setStatus(1); // 假设 1 表示启用状态
            sysUser.setDeptId(1L);
            sysUser.setDeleted(0); // 假设 0 表示未删除
            sysUserMapper.insert(sysUser);
            count++;
        }

        assert count == 50;
    }

    @Test
    void testSelectById() {
        Console.log(sysUserMapper.selectById(1L));
    }

    @Test
    void testSelectPage() {
        // 创建分页对象
        Page<SysUser> page = new Page<>(1, 10);
        // 查询条件构造器
        QueryWrapper<SysUser> wrapper = new QueryWrapper<>();
        wrapper.like("username", "%testUser%");

        Page<SysUser> result = sysUserMapper.selectPage(page, wrapper);
        Console.log("总记录数：{}，共 {} 页，当前第 {} 页，每页显示 {} 条数据",
                result.getTotal(), result.getPages(), result.getCurrent(), result.getSize());
        assert result.getTotal() > 0;
    }
}
