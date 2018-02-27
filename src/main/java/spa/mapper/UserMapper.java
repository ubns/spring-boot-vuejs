package spa.mapper;

import org.springframework.stereotype.Component;
import spa.model.User;

@Component
public interface UserMapper {
    int add(User user);
    User findOne(User user);
}
