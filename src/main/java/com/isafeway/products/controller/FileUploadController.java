package com.isafeway.products.controller;

import com.isafeway.products.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
public class FileUploadController {
    @Autowired
    private ProductService productService;

    @RequestMapping(value = "/file/upload")
    void upload(@RequestParam("file") MultipartFile file) {
        try {
            productService.importProducts(file.getInputStream());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}