package spa;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("spa.mapper")
public class SpaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpaApplication.class, args);
	}
}
