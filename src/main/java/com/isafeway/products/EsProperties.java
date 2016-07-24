package com.isafeway.products;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2016/7/5.
 */
@Component
@ConfigurationProperties(prefix = "es")
public class EsProperties {

    private List<String> hosts = new ArrayList<String>();

    private String cluster;

    private String alias;

    private int shards;

    private int replicas;

    public String getCluster() {
        return cluster;
    }

    public void setCluster(String cluster) {
        this.cluster = cluster;
    }

    public List<String> getHosts() {
        return hosts;
    }

    public String getAlias() {
        return alias;
    }

    public void setAlias(String index) {
        this.alias = index;
    }

    public int getShards() {
        return shards;
    }

    public void setShards(int shards) {
        this.shards = shards;
    }

    public int getReplicas() {
        return replicas;
    }

    public void setReplicas(int replicas) {
        this.replicas = replicas;
    }
}
