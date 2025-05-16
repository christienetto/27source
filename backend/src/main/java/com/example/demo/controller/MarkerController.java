package com.example.demo.controller;

import com.example.demo.entity.Marker;
import com.example.demo.repository.MarkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/markers")
public class MarkerController {
    @Autowired
    private MarkerRepository markerRepository;

    @GetMapping
    public List<Marker> getMarkers() {
        return markerRepository.findAll();
    }
}

