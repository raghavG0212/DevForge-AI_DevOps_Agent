package com.hackathon.DevOpsAgent.model;


public class AnalyzeRequest {
    private String input; // can be repo URL OR local path

    public String getInput() {
        return input;
    }

    public void setInput(String input) {
        this.input = input;
    }
}
