package spa.api;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;

import spa.annotation.CurrentUser;
import spa.annotation.LoginRequired;
import spa.model.Post;
import spa.model.User;
import spa.service.PostService;

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
        post.setCreateTime(new Date());
        post = postService.add(post);
        return post;
    }

    @GetMapping("/{id}")
    public Post findById(@PathVariable int id) {
        return postService.findById(id);
    }

    @GetMapping("")
    public List<Post> all() {
        return postService.all();
    }

    @LoginRequired
    @PutMapping("/{id}")
    public Post update(@RequestBody Post post, @PathVariable int id, @CurrentUser User currentUser) {
        post.setId(id);
        return postService.update(post, currentUser);
    }

    @LoginRequired
    @DeleteMapping("/{id}")
    public Object delete(@PathVariable int id, @CurrentUser User currentUser) {
        postService.delete(id, currentUser);
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("message", "正常に削除されました");
        return jsonObject;
    }
}