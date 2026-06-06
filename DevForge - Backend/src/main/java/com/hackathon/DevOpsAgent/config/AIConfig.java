package com.hackathon.DevOpsAgent.config;

import com.hackathon.DevOpsAgent.service.*;
import org.springframework.context.annotation.*;
import org.springframework.beans.factory.annotation.Value;

@Configuration
public class AIConfig {

    @Value("${ai.provider}")
    private String provider;

    @Bean
    public AIService aiService(GeminiService gemini, ClaudeService claude) {
        return "claude".equalsIgnoreCase(provider) ? claude : gemini;
    }
}