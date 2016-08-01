package com.isafeway.products;

import org.elasticsearch.client.Client;
import org.elasticsearch.client.transport.TransportClient;
import org.elasticsearch.common.settings.ImmutableSettings;
import org.elasticsearch.common.settings.Settings;
import org.elasticsearch.common.transport.InetSocketTransportAddress;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

import java.net.InetSocketAddress;

/**
 * Created by topcat on 16/7/22.
 */
@SpringBootApplication
public class Application extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(Application.class).sources("classpath*:spring-*.xml");
    }

//    @Bean
//    public Client esClient(EsProperties esProperties) {
//        Settings settings = ImmutableSettings.settingsBuilder().put("cluster.name", esProperties.getCluster()).build();
//        TransportClient client = new TransportClient(settings);
//        for (String host : esProperties.getHosts()) {
//            String[] parts = host.split(":");
//            client.addTransportAddress(new InetSocketTransportAddress(new InetSocketAddress(parts[0], Integer.parseInt(parts[1]))));
//        }
//        return client;
//    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(new Object[]{"classpath*:spring-*.xml", Application.class}, args);
    }

}
