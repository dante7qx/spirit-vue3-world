package org.dante.vue3.config;

import com.baomidou.mybatisplus.core.handlers.MetaObjectHandler;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class SpiritMetaObjectHandler implements MetaObjectHandler {
    private static final String CREATE_TIME = "createTime";
    private static final String CREATE_BY = "createBy";
    private static final String UPDATE_TIME = "updateTime";
    private static final String UPDATE_BY = "updateBy";

    /**
     * 插入时自动填充创建和更新字段
     */
    @Override
    public void insertFill(MetaObject metaObject) {
        LocalDateTime now = LocalDateTime.now(); // 只调用一次
        String currentUser = getCurrentUser(); // 只调用一次

        this.strictInsertFill(metaObject, CREATE_TIME, () -> now, LocalDateTime.class);
        this.strictInsertFill(metaObject, CREATE_BY, () -> currentUser, String.class);

        // 插入时也填充更新字段，避免空值
        this.strictInsertFill(metaObject, UPDATE_TIME, () -> now, LocalDateTime.class);
        this.strictInsertFill(metaObject, UPDATE_BY, () -> currentUser, String.class);
    }

    /**
     * 更新时自动填充更新字段
     */
    @Override
    public void updateFill(MetaObject metaObject) {
        this.strictUpdateFill(metaObject, UPDATE_TIME, LocalDateTime::now, LocalDateTime.class);
        this.strictUpdateFill(metaObject, UPDATE_BY, this::getCurrentUser, String.class);
    }

    /**
     * 获取当前操作用户，默认返回 system
     * 可集成 Spring Security 或其他认证框架获取真实用户
     */
    private String getCurrentUser() {
        // 这里可以改成从上下文获取当前登录用户
        return "system";
    }
}
