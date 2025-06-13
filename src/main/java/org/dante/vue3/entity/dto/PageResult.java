package org.dante.vue3.entity.dto;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class PageResult<T> {

    private int code;
    private String message;

    private List<T> records; // 数据列表
    private long total;      // 总记录数
    private long size;       // 每页显示条数
    private long pages;      // 总页数
    private long current;    // 当前页

    public static <T> PageResult<T> success(Page<T> page) {
        return new PageResult<>(200, "操作成功", page.getRecords(), page.getTotal(), page.getSize(), page.getPages(), page.getCurrent());
    }

}
