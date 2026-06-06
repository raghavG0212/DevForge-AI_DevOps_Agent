package com.hackathon.DevOpsAgent.model;

public class ErrorRequest {

    private String error;
    private String context;

    public String getError() { return error; }
    public void setError(String error) { this.error = error; }

    public String getContext() { return context; }
    public void setContext(String context) { this.context = context; }
}