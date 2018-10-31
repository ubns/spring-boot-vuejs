package spa.api;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import spa.model.User;
import spa.service.AuthenticationService;
import spa.service.UserService;

@RestController
@RequestMapping("/api/authentication")
public class AuthenticationApi {
    private AuthenticationService authenticationService;
    private UserService userService;

    @Autowired
    public AuthenticationApi(AuthenticationService authenticationService, UserService userService) {
        this.authenticationService = authenticationService;
        this.userService = userService;
    }

    @PostMapping("")
    public Object login(@RequestBody User user) {
        User userInDatabase = userService.findByName(user.getName());
        JSONObject jsonObject = new JSONObject();
        if (userInDatabase == null) {
            jsonObject.put("error", "ユーザは存在しません。");
        } else if (!userService.comparePassword(user, userInDatabase)) {
            jsonObject.put("error", "パスワードが間違っています。");
        } else {
            String token = authenticationService.getToken(userInDatabase);
            jsonObject.put("token", token);
            jsonObject.put("user", userInDatabase);
        }
        return jsonObject;
    }
}