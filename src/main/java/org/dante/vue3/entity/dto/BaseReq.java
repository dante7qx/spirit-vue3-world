package org.dante.vue3.entity.dto;

import lombok.Data;

import java.util.Map;

@Data
public class BaseReq {

    private long current = 1;
    private long pageSize = 10;

    private Map<String, Object> params;


}
