package spa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import spa.mapper.PostMapper;
import spa.model.Post;

import java.util.List;

import static com.google.common.base.Preconditions.checkNotNull;

@Service
public class PostService {
    private PostMapper postMapper;

    @Autowired
    public PostService(PostMapper postMapper) {
        this.postMapper = postMapper;
    }

    @Transactional
    public Post add(Post post) {
        postMapper.add(post);
        return post;
    }

    public Post findById(Integer id) {
        Post param = new Post();
        param.setId(id);
        Post post = postMapper.findOne(param);
        checkNotNull(post, "ユーザが存在しません");
        return post;
    }

    public List<Post> all() {
        return postMapper.all();
    }
}
