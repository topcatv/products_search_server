package com.isafeway.products.service;

import com.isafeway.products.domain.Product;
import com.isafeway.products.util.ExcelReader;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by topcat on 16/7/22.
 */
@Component
public class ProductService {

    @Autowired
    private MongoTemplate mongoTemplate;

    @PostConstruct
    public void init() {
        if (!mongoTemplate.collectionExists(Product.class)) {
            mongoTemplate.createCollection(Product.class);
        }
    }

    public void addProduct(Product product) {
        mongoTemplate.insert(product);
    }

    public Page<Product> queryProduct(String code, String name, String barCode, int pageNo, int pageSize) {

        Query query = new Query();
        List<Criteria> criterias = new ArrayList<Criteria>();
        if (StringUtils.isNotBlank(code)) {
            criterias.add(Criteria.where("code").regex(".*" + code + ".*", "i"));
        }
        if (StringUtils.isNotBlank(name)) {
            criterias.add(Criteria.where("name").regex(".*" + name + ".*", "i"));
        }
        if (StringUtils.isNotBlank(barCode)) {
            criterias.add(Criteria.where("barCode").regex(".*" + barCode + ".*", "i"));
        }
        if (criterias.size() > 0) {
            query.addCriteria(new Criteria().orOperator(criterias.toArray(new Criteria[] {})));
        }
        long total = mongoTemplate.count(query, Product.class);
        PageRequest pageable = new PageRequest(pageNo - 1, pageSize);
        query.with(pageable);
        List<Product> products = mongoTemplate.find(query, Product.class);
        Page<Product> page = new PageImpl<Product>(products, pageable, total);
        return page;
    }

    public void importProducts(InputStream is) {
        ExcelReader excelReader = new ExcelReader();
        List<Map<Integer, String>> list = excelReader.readExcelContent(is);
        List<Product> products = new ArrayList<Product>(list.size());
        for (Map<Integer, String> record : list) {
            Product product = new Product();
            product.setCode(getValueFromRecord(record, 1));
            product.setBarCode(getValueFromRecord(record, 2));
            product.setName(getValueFromRecord(record, 3));
            product.setSpecification(getValueFromRecord(record, 4));
            product.setBoxSize(getValueFromRecord(record, 5));
            product.setLife(getValueFromRecord(record, 6));
            product.setOriginCountry(getValueFromRecord(record, 7));
            product.setPrice(Double.valueOf(getValueFromRecord(record, 8)));
            products.add(product);
        }
        mongoTemplate.insertAll(products);
    }

    private String getValueFromRecord(Map<Integer, String> record, int key) {
        String value = record.get(key);
        if (StringUtils.isBlank(value)) {
            value = "";
        }
        return value;
    }
}
