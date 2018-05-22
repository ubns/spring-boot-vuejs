package spa.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import spa.annotation.CurrentUser;
import spa.annotation.LoginRequired;
import spa.model.Post;
import spa.model.User;
import spa.service.PostService;

import java.util.List;

@RestController
@RequestMapping("/api/post")
public class PostApi {
    private PostService postService;

    @Autowired
    public PostApi(PostService postService) {
        this.postService = postService;
    }

    @PostMapping("")
    @LoginRequired
    public Post add(@RequestBody Post post, @CurrentUser User user) {
        post.setAuthorId(user.getId());
        post = postService.add(post);
        return post;
    }

    @GetMapping("{/id")
    public Object findById(@PathVariable int id) {
        Post post = postService.findById(id);
        return postService.findById(id);
    }

    @GetMapping("")
    public List<Post> all() {
        return postService.all();
    }
}
