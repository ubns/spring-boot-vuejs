package spa.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import spa.mapper.PostMapper;
import spa.model.Post;
import spa.model.User;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.List;

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
        return findById(post.getId());
    }

    public Post findById(Integer id) {
        Post param = new Post();
        param.setId(id);
        Post post = postMapper.findOne(param);
        checkNotNull(post, "コンテンツが見つかりませんでした。");
        return post;
    }

    public List<Post> all() {
        return postMapper.all();
    }

    public Post update(Post post, User currentUser) {
        checkNotNull(post.getId(), "IDは必須です");
        checkOwner(post.getId(), currentUser);
        postMapper.update(post);
        return findById(post.getId());
    }

    private void checkOwner(Integer id, User currentUser) {
        Post post = findById(id);
        if (!post.getAuthorId().equals(currentUser.getId())) {
            throw new RuntimeException("他の人の記事を削除または更新できません。");
        }
    }

    public void delete(int id, User currentUser) {
        checkOwner(id, currentUser);
        postMapper.delete(id);
    }

}