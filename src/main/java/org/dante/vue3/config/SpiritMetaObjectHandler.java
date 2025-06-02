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

    @Override
    public void insertFill(MetaObject metaObject) {
        this.strictInsertFill(metaObject, CREATE_TIME, LocalDateTime::now, LocalDateTime.class);
        this.strictInsertFill(metaObject, CREATE_BY, () -> "system", String.class);
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        this.strictUpdateFill(metaObject, UPDATE_TIME, LocalDateTime::now, LocalDateTime.class);
        this.strictUpdateFill(metaObject, UPDATE_BY, () -> "system", String.class);
    }
}
