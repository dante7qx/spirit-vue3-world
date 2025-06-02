package org.dante.vue3;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("org.dante.vue3.mapper")
public class SpiritVu3EluiApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpiritVu3EluiApplication.class, args);
	}

}
