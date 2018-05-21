package spa.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.stereotype.Service;
import spa.model.User;

import java.io.UnsupportedEncodingException;

/**
 * Token生成クラス
 */
@Service
public class AuthenticationService {
    public String getToken(User user) {
        String token = "";
        try {
            token = JWT.create()
                    .withAudience(user.getId().toString())
                    .sign(Algorithm.HMAC256(user.getPassword()));
        } catch (UnsupportedEncodingException ignore) {
            // 処理なし
        }
        return token;
    }
}
