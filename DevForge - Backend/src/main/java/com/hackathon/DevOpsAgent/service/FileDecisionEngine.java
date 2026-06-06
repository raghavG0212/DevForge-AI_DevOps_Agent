package com.hackathon.DevOpsAgent.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class FileDecisionEngine {

    public List<String> decideFiles(
            Map<String, String> stack) {

        List<String> files = new ArrayList<>();

        String backend = stack.get("backend");
        String frontend = stack.get("frontend");

        // Spring Boot
        if ("Spring Boot".equalsIgnoreCase(backend)) {

            files.add("Dockerfile");
            files.add("docker-compose.yml");
            files.add(".env");
            files.add("ci-cd.yml");
        }

        // Java
        if ("Java".equalsIgnoreCase(backend)) {

            addIfMissing(files, "Dockerfile");
            addIfMissing(files, "docker-compose.yml");
            addIfMissing(files, "ci-cd.yml");
        }

        // React
        if ("React".equalsIgnoreCase(frontend)) {

            addIfMissing(files, "Dockerfile");
            addIfMissing(files, "docker-compose.yml");
            addIfMissing(files, ".env");
            addIfMissing(files, "ci-cd.yml");
        }

        // Python
        if ("Python".equalsIgnoreCase(backend)) {

            addIfMissing(files, "Dockerfile");
            addIfMissing(files, "docker-compose.yml");
            addIfMissing(files, ".env");
            addIfMissing(files, "ci-cd.yml");
        }

        // Existing Kubernetes Project
        if ("true".equalsIgnoreCase(stack.get("kubernetes"))) {

            addIfMissing(files, "deployment.yaml");
            addIfMissing(files, "service.yaml");
        }

        return files;
    }

    private void addIfMissing(
            List<String> files,
            String file) {

        if (!files.contains(file)) {
            files.add(file);
        }
    }
}