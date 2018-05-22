package spa.mapper;

import org.springframework.stereotype.Component;
import spa.model.Post;

import java.util.List;

@Component
public interface PostMapper {
    int add(Post post);

    Post findOne(Post post);

    List<Post> all();
}
