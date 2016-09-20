package com.isafeway.products.service;

import com.isafeway.products.domain.Order;
import com.isafeway.products.domain.ShopCartItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
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

    public Page<Order> query(int pageNo, int pageSize) {
        Query query = new Query();
        long total = mongoTemplate.count(query, Order.class);
        PageRequest pageable = new PageRequest(pageNo - 1, pageSize);
        query.with(pageable);
        List<Order> orders = mongoTemplate.find(query, Order.class);
        Page<Order> page = new PageImpl<Order>(orders, pageable, total);
        return page;
    }
}
