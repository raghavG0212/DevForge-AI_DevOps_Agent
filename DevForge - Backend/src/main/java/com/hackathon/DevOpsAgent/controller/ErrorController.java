package com.hackathon.DevOpsAgent.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.hackathon.DevOpsAgent.model.ErrorRequest;
import com.hackathon.DevOpsAgent.service.AIService;

@RestController
@RequestMapping("/api")
public class ErrorController {

    @Autowired
    private AIService aiService;

    @PostMapping("/error")
    public String analyzeError(@RequestBody ErrorRequest request) {

        if (request.getError() == null || request.getError().isEmpty()) {
            return "Error log is required";
        }

        return aiService.analyzeError(request.getError(), request.getContext());
    }
}