package org.dante.vue3.config;

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan("org.dante.vue3.mapper")
public class MybatisPlusConfig {

    /**
     * 添加分页插件
     * 1. 如果有多数据源可以不配具体类型, 否则都建议配上具体的 DbType
     */
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        PaginationInnerInterceptor paginationInnerInterceptor = new PaginationInnerInterceptor();
        paginationInnerInterceptor.setDbType(DbType.MYSQL);
        paginationInnerInterceptor.setMaxLimit(200L); // 单页最大限制数量，默认 500，设置为 -1 表示无限制
        paginationInnerInterceptor.setOverflow(true); // 溢出总页数后是否进行处理，默认 true
        paginationInnerInterceptor.setOptimizeJoin(true); // 开启 count 的 join 优化,只针对部分 left join

//        interceptor.addInnerInterceptor(new SqlLoggerInterceptor());
        interceptor.addInnerInterceptor(paginationInnerInterceptor); // 如果配置多个插件, 切记分页最后添加
        return interceptor;
    }

}

/*
    开启 count 的 join 优化,只针对部分 left join
    1. 检查是否是 LEFT JOIN
    2. 尝试提取主表的主键或唯一字段
    3. 构造一个子查询，使用 GROUP BY 去重主表 ID，再进行 COUNT 统计
    // 原始 SQL
    select u.*, o.order_no from user u left join orders o on u.id = o.user_id where u.age > 25;
    // 开启优化后的 COUNT 查询
    select count(*) from (select u.id from user u left join orders o on u.id = o.user_id where u.age > 25 group by u.id) as tmp;
 */
