package com.example.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public interface IImageService {
    String uploadFile(File file, String fileName) throws IOException;
    File convertToFile(MultipartFile multipartFile, String fileName) throws IOException;
    String getExtension(String fileName);
    String upload(MultipartFile multipartFile);
    Boolean delete(String url);
}
