package spa.mapper;

import java.util.List;

import org.springframework.stereotype.Component;
import spa.model.Post;

@Component
public interface PostMapper {

    // 追加
    int add(Post post);

    // 指定検索
    Post findOne(Post param);

    // 全件検索
    List<Post> all();

    // 更新
    void update(Post post);

    // 削除
    void delete(int id);
}
