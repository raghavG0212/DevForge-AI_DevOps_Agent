package com.hackathon.DevOpsAgent.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.hackathon.DevOpsAgent.model.AnalyzeResponse;
import com.hackathon.DevOpsAgent.model.GeneratedFile;

@Service
public class ValidationService {

    public void validate(AnalyzeResponse response) {

        if (response == null ||
            response.getGeneratedFiles() == null) {
            return;
        }

        List<GeneratedFile> files =
                response.getGeneratedFiles();

        for (GeneratedFile file : files) {

            String fileName = file.getFileName();
            String content = file.getContent();

            if (fileName == null || content == null) {
                continue;
            }

            switch (fileName.toLowerCase()) {

                case "dockerfile":
                    validateDockerfile(content);
                    break;

                case "docker-compose.yml":
                    validateCompose(content);
                    break;

                case ".env":
                    validateEnv(content);
                    break;

                case "ci-cd.yml":
                case "github-actions.yml":
                    validateCiCd(content);
                    break;
            }
        }
    }

    private void validateDockerfile(String content) {

        if (!content.contains("FROM")) {
            throw new RuntimeException(
                    "Invalid Dockerfile: missing FROM"
            );
        }

        if (!content.contains("CMD")
                && !content.contains("ENTRYPOINT")) {

            System.out.println(
                    "Warning: Dockerfile has no CMD/ENTRYPOINT"
            );
        }
    }

    private void validateCompose(String content) {

        if (!content.contains("services:")) {
            throw new RuntimeException(
                    "Invalid docker-compose.yml"
            );
        }
    }

    private void validateEnv(String content) {

        if (content.isBlank()) {
            throw new RuntimeException(
                    ".env file is empty"
            );
        }
    }

    private void validateCiCd(String content) {

        if (!content.contains("jobs:")) {
            throw new RuntimeException(
                    "Invalid CI/CD file"
            );
        }
    }
}