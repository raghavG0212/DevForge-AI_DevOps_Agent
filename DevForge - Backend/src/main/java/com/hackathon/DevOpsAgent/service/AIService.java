package com.hackathon.DevOpsAgent.service;

public interface AIService {

    String generateCompleteDevOpsSolution(String input);

    String explainFile(String fileName, String content);

    String analyzeError(String error, String context);
}