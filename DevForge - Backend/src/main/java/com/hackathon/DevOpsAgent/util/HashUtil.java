package com.hackathon.DevOpsAgent.util;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

public class HashUtil {

    public static String generateHash(String content) {

        try {

            MessageDigest md =
                    MessageDigest.getInstance("SHA-256");

            byte[] hash =
                    md.digest(content.getBytes(
                            StandardCharsets.UTF_8));

            StringBuilder sb = new StringBuilder();

            for (byte b : hash) {
                sb.append(
                        String.format("%02x", b)
                );
            }

            return sb.toString();

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to generate hash",
                    e
            );
        }
    }
}