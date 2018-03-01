package spa.mapper;

import org.springframework.stereotype.Component;
import spa.model.User;

import java.util.List;

@Component
public interface UserMapper {
    int add(User user);
    User findOne(User user);
    List<User> findAll();
}
