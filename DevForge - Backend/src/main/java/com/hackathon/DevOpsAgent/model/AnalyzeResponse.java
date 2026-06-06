package com.hackathon.DevOpsAgent.model;

import java.util.List;

public class AnalyzeResponse {

    private boolean success;

    private String confidence;

    private String readmeAnalysis;

    private List<String> requiredFiles;

    private List<GeneratedFile> generatedFiles;

    private String error;

    public AnalyzeResponse() {
    }

    public AnalyzeResponse(boolean success,
                           String confidence,
                           String readmeAnalysis,
                           List<String> requiredFiles,
                           List<GeneratedFile> generatedFiles,
                           String error) {

        this.success = success;
        this.confidence = confidence;
        this.readmeAnalysis = readmeAnalysis;
        this.requiredFiles = requiredFiles;
        this.generatedFiles = generatedFiles;
        this.error = error;
    }
    
    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getConfidence() {
        return confidence;
    }

    public void setConfidence(String confidence) {
        this.confidence = confidence;
    }

    public String getReadmeAnalysis() {
        return readmeAnalysis;
    }

    public void setReadmeAnalysis(String readmeAnalysis) {
        this.readmeAnalysis = readmeAnalysis;
    }

    public List<String> getRequiredFiles() {
        return requiredFiles;
    }

    public void setRequiredFiles(List<String> requiredFiles) {
        this.requiredFiles = requiredFiles;
    }

    public List<GeneratedFile> getGeneratedFiles() {
        return generatedFiles;
    }

    public void setGeneratedFiles(List<GeneratedFile> generatedFiles) {
        this.generatedFiles = generatedFiles;
    }
    
    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}