package com.hackathon.DevOpsAgent.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hackathon.DevOpsAgent.model.AnalyzeResponse;
import com.hackathon.DevOpsAgent.util.FileScannerUtil;
import com.hackathon.DevOpsAgent.util.GitUtil;
import com.hackathon.DevOpsAgent.util.HashUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;


@Service
public class AnalyzeService {

    @Autowired
    private AIService aiService;
    
    @Autowired
    private CacheService cacheService;

    @Autowired
    private ValidationService validationService;

    @Autowired
    private FileDecisionEngine fileDecisionEngine;

    private final ObjectMapper mapper = new ObjectMapper();

    public AnalyzeResponse analyze(String input) {

        try {

            String path;

            if (input.startsWith("http")) {

                path = GitUtil.cloneRepo(input);
                
                System.out.println("Repository Path = " + path);

                if (path == null) {
                    return new AnalyzeResponse(
                            false,
                            null,
                            null,
                            null,
                            null,
                            "Repository clone failed"
                    );
                }
                
            } else {
                path = input;
            }

            Map<String, String> detected = FileScannerUtil.detectStack(path);

            String summary = FileScannerUtil.getSummary(path)
                    + "\nDetected Stack: " + detected;

            String hash = HashUtil.generateHash(summary);

            if (cacheService.contains(hash)) {

                System.out.println("===== CACHE HIT =====");

                return cacheService.get(hash);
            }
            
            System.out.println("===== DETECTED STACK =====");
            System.out.println(detected);
            System.out.println("==========================");

            String aiResponse = aiService.generateCompleteDevOpsSolution(summary);

            System.out.println("===== AI RESPONSE =====");
            System.out.println(aiResponse);
            System.out.println("=======================");

            if (aiResponse == null ||
                aiResponse.isBlank() ||
                aiResponse.equals("AI_ERROR")) {

                return new AnalyzeResponse(
                        false,
                        null,
                        null,
                        null,
                        null,
                        "AI returned empty response"
                );
            }

            aiResponse = aiResponse
                    .replace("```json", "")
                    .replace("```", "")
                    .trim();

            AnalyzeResponse response = mapper.readValue(
                    aiResponse,
                    AnalyzeResponse.class
            );

            // validate generated files
            validationService.validate(response);

            // deterministic file selection
            response.setRequiredFiles(
                    fileDecisionEngine.decideFiles(detected)
            );
            
            response.setSuccess(true);

         // save successful result in cache
         cacheService.save(hash, response);

         System.out.println(aiResponse);

         return response;

        } catch (Exception e) {

            e.printStackTrace();

            return new AnalyzeResponse(
                    false,
                    null,
                    null,
                    null,
                    null,
                    e.getMessage()
            );
        }
    }
}