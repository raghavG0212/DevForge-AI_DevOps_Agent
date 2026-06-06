package com.hackathon.DevOpsAgent.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

@Service
public class GeminiService implements AIService {

   
	private String apiKey = "";
	

    private final WebClient webClient = WebClient.create(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent"
    );

    private final ObjectMapper mapper = new ObjectMapper();

    private String callGemini(String prompt) {

    	Map<String, Object> body = Map.of(
    	        "contents",
    	        new Object[]{
    	                Map.of(
    	                        "role", "user",
    	                        "parts", new Object[]{
    	                                Map.of(
    	                                        "text", prompt
    	                                )
    	                        }
    	                )
    	        },
    	        "generationConfig",
    	        Map.of(
    	                "temperature", 0,
    	                "topP", 0.1,
    	                "topK", 1,
    	                "maxOutputTokens", 8192
    	        )
    	);

        int retries = 3;

        while (retries > 0) {

            try {

            	String response = webClient
            	        .post()
            	        .uri(uriBuilder ->
            	                uriBuilder.queryParam("key", apiKey).build()
            	        )
            	        .bodyValue(body)
            	        .retrieve()
            	        .onStatus(
            	                status -> status.isError(),
            	                clientResponse ->
            	                        clientResponse.bodyToMono(String.class)
            	                                .map(errorBody -> {
            	                                    System.out.println("===== GEMINI ERROR =====");
            	                                    System.out.println(errorBody);
            	                                    System.out.println("========================");
            	                                    return new RuntimeException(errorBody);
            	                                })
            	        )
            	        .bodyToMono(String.class)
            	        .block();

                JsonNode root = mapper.readTree(response);
                
                System.out.println("===== RAW GEMINI RESPONSE =====");
                System.out.println(response);
                System.out.println("===============================");
                
                JsonNode candidates = root.path("candidates");

                if (candidates.isMissingNode()
                        || candidates.isEmpty()) {

                    return "AI_ERROR";
                }

                return root
                        .path("candidates")
                        .get(0)
                        .path("content")
                        .path("parts")
                        .get(0)
                        .path("text")
                        .asText();

            } catch (Exception e) {

                retries--;

                if (retries == 0) {

                    System.out.println("===== GEMINI FAILURE =====");
                    System.out.println(e.getMessage());
                    e.printStackTrace();
                    System.out.println("==========================");

                    return "AI_ERROR";
                }

                try {
                    Thread.sleep(2000);
                } catch (InterruptedException ignored) {
                }
            }
        }

        return null;
    }

    @Override
    public String generateCompleteDevOpsSolution(String input) {

        String prompt = """
                
You are an expert DevOps engineer.

Analyze the following project.

Generate:

1. Project analysis
2. Required DevOps files
3. Production-ready content for each file

STRICT RULES:

- Return ONLY valid JSON
- No markdown
- No explanation outside JSON
- No code fences
- Do not invent technologies
- Only use technologies explicitly detected in the project context
- Return the same file recommendations for identical project contexts
- Do not suggest Kubernetes unless Kubernetes files already exist or deployment complexity requires it

Required JSON Structure:

{
  "confidence": "High",
  "readmeAnalysis": "Overview:\n- point\n\nBackend:\n- point\n\nFrontend:\n- point\n\nDevOps:\n- point",
  "requiredFiles": [
    "Dockerfile",
    "docker-compose.yml"
  ],
  "generatedFiles": [
    {
      "fileName": "Dockerfile",
      "content": "FROM node:18"
    }
  ]
}

Project Context:
%s

IMPORTANT:
Base every recommendation strictly on the provided project context.
Do not assume missing technologies.

                """.formatted(input);

        return callGemini(prompt);
    }

    @Override
    public String explainFile(String fileName, String content) {

        String prompt = """
                
Explain the following DevOps file.

File Name:
%s

Rules:
- Simple explanation
- Why it is needed
- Brief explanation of important parts
- No markdown

File Content:
%s

                """.formatted(fileName, content);

        return callGemini(prompt);
    }

   
    @Override
public String analyzeError(String error, String context) {

    String prompt = """
            
You are a senior DevOps engineer.

Analyze the following deployment error.

Return ONLY valid JSON.

Required JSON Structure:

{
  "errorMeaning": "",
  "possibleCauses": [],
  "stepByStepFix": [],
  "extraTips": []
}

Rules:

- Return ONLY valid JSON
- No markdown
- No code fences
- No explanation outside JSON
- Keep explanations concise
- possibleCauses must be an array of strings
- stepByStepFix must be an array of strings
- extraTips must be an array of strings
- stepByStepFix must contain actionable steps

Project Context:
%s

Error:
%s

            """.formatted(
            context != null ? context : "No context provided",
            error
    );

    return callGemini(prompt);
}
}