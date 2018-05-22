package spa.model;

import lombok.Data;

import java.util.Date;

@Data
public class Post {
    private Integer id;
    private User author;
    private Integer authorId;
    private String title;
    private String content;
    private Date createTime;
    private Date updateTime;
}
