package spa.api;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import spa.model.User;
import spa.service.UserService;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserApi {

    private UserService userService;

    @Autowired
    public UserApi(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("")
    public Object add(@RequestBody User user) {
        if (userService.findByName(user.getName()) != null) {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("message", "ユーザ名は既に使用されています。");
            return jsonObject;
        }
        return userService.add(user);
    }

    @GetMapping("{id}")
    public Object findById(@PathVariable int id) {
        return userService.findById(id);
    }

    @GetMapping("/list")
    public List<User> findAll() {
        return userService.findAll();
    }
}
