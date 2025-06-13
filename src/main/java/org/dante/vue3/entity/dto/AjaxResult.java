package org.dante.vue3.entity.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AjaxResult<T> {

    private int code;
    private String message;
    private T data;

    public static <T> AjaxResult<T> success(T data) {
        return new AjaxResult<>(200, "操作成功", data);
    }

    public static <T> AjaxResult<T> success() {
        return new AjaxResult<>(200, "操作成功", null);
    }

    public static <T> AjaxResult<T> error(int code, String message) {
        return new AjaxResult<>(code, message, null);
    }

}
