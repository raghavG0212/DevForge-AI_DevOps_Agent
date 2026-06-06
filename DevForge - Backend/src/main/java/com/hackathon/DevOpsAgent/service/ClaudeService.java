package com.hackathon.DevOpsAgent.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.Map;

@Service
public class ClaudeService implements AIService {

    @Value("${claude.api.key}")
    private String apiKey;

    private final WebClient webClient = WebClient.create(
            "https://api.anthropic.com/v1/messages"
    );

    private final ObjectMapper mapper = new ObjectMapper();

    private String callClaude(String prompt) {

        Map<String, Object> body = Map.of(
                "model", "claude-3-sonnet-20240229",
                "max_tokens", 4000,
                "messages", new Object[]{
                        Map.of(
                                "role", "user",
                                "content", prompt
                        )
                }
        );

        int retries = 3;

        while (retries > 0) {

            try {

                String response = webClient.post()
                        .header("x-api-key", apiKey)
                        .header("anthropic-version", "2023-06-01")
                        .bodyValue(body)
                        .retrieve()
                        .bodyToMono(String.class)
                        .block();

                JsonNode root = mapper.readTree(response);

                return root
                        .path("content")
                        .get(0)
                        .path("text")
                        .asText();

            } catch (Exception e) {

                retries--;

                if (retries == 0) {
                    e.printStackTrace();
                    return null;
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

                """.formatted(input);

        return callClaude(prompt);
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

        return callClaude(prompt);
    }

    @Override
    public String analyzeError(String error, String context) {

        String prompt = """
                
You are a DevOps expert.

Analyze this deployment error.

Provide:

1. Error Meaning
2. Possible Causes
3. Step-by-step Fix
4. Extra Tips

STRICT RULES:

- Return ONLY valid JSON
- No markdown code fences
- No explanation outside JSON
- readmeAnalysis MUST contain formatted sections
- Use \\n for line breaks inside JSON
- Use headings like Backend:, Frontend:, DevOps:
- Use bullet points with "-"
- Do NOT return one large paragraph

Project Context:
%s

Error:
%s

                """.formatted(
                context != null ? context : "No context provided",
                error
        );

        return callClaude(prompt);
    }
}