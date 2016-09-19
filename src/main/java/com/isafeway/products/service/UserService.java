package com.isafeway.products.service;

import com.isafeway.products.domain.User;
import org.apache.shiro.authc.UnknownAccountException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

/**
 * Created by topcat on 16/7/29.
 */
@Component
public class UserService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @PostConstruct
    public void init() {
        if (!mongoTemplate.collectionExists(User.class)) {
            mongoTemplate.createCollection(User.class);
        }
    }

    public User login(String username, String password) {
        if(!mongoTemplate.exists(Query.query(Criteria.where("userName").is(username)), User.class)){
            throw new UnknownAccountException(username);
        }
        Query query = Query.query(Criteria.where("userName").is(username).and("password").is(password));
        return mongoTemplate.findOne(query, User.class);
    }
}
