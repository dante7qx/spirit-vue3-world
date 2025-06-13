package org.dante.vue3.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.RequiredArgsConstructor;
import org.dante.vue3.entity.SysUser;
import org.dante.vue3.entity.dto.AjaxResult;
import org.dante.vue3.entity.dto.BaseReq;
import org.dante.vue3.entity.dto.PageResult;
import org.dante.vue3.mapper.SysUserMapper;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class SysUserController {

    private final SysUserMapper sysUserMapper;

    @PostMapping("/page")
    public PageResult<SysUser> page(@RequestBody BaseReq req) {
        // 创建分页对象
        Page<SysUser> page = new Page<>(req.getCurrent(), req.getPageSize());
        // 查询条件构造器
        QueryWrapper<SysUser> wrapper = new QueryWrapper<>();
        return PageResult.success(sysUserMapper.selectPage(page, wrapper));
    }

    @PostMapping("/list")
    public AjaxResult<List<SysUser>> list() {
        return AjaxResult.success(sysUserMapper.selectList(null)) ;
    }

    @PostMapping("/{id}")
    public AjaxResult<SysUser> info(@PathVariable("id") Long id) {
        return AjaxResult.success(sysUserMapper.selectById(id));
    }

    @PostMapping("/add")
    public AjaxResult<Integer> add(@RequestBody SysUser sysUser) {
        return AjaxResult.success(sysUserMapper.insert(sysUser));
    }

    @PostMapping("/edit")
    public AjaxResult<Integer> edit(@RequestBody SysUser sysUser) {
        return AjaxResult.success(sysUserMapper.update(sysUser, null));
    }

    @PostMapping("/del/{id}")
    public AjaxResult<Integer> delete(@PathVariable("id") Long id) {
        return AjaxResult.success(sysUserMapper.deleteById(id));
    }



}
