package com.isafeway.products.service;

import com.isafeway.products.domain.Order;
import com.isafeway.products.domain.ShopCartItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.List;

/**
 * Created by topcat on 16/8/12.
 */
@Component
public class OrderService {

    @Autowired
    ShopCartService shopCartService;

    @Autowired
    private MongoTemplate mongoTemplate;

    @PostConstruct
    public void init() {
        if (!mongoTemplate.collectionExists(Order.class)) {
            mongoTemplate.createCollection(Order.class);
        }
    }

    public void submit(String userId, List<ShopCartItem> shopCartItems) {
        mongoTemplate.insert(new Order(userId, shopCartItems));
        shopCartService.clean(userId);
    }
}
