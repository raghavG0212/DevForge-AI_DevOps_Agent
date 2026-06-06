package com.hackathon.DevOpsAgent.service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;

import com.hackathon.DevOpsAgent.model.AnalyzeResponse;

@Service
public class CacheService {

    private final Map<String, AnalyzeResponse> cache =
            new ConcurrentHashMap<>();

    public AnalyzeResponse get(String hash) {
        return cache.get(hash);
    }

    public void save(String hash,
                     AnalyzeResponse response) {

        cache.put(hash, response);
    }

    public boolean contains(String hash) {
        return cache.containsKey(hash);
    }

    public void clear() {
        cache.clear();
    }

    public int size() {
        return cache.size();
    }
}