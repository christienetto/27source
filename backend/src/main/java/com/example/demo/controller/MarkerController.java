package com.example.demo.controller;

import com.example.demo.entity.Marker;
import com.example.demo.model.requests.MarkerRequest;
import com.example.demo.model.responses.MarkerRequestResponse;
import com.example.demo.repository.MarkerRepository;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Marker added successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid marker location")
    })
    @PostMapping
    public ResponseEntity<MarkerRequestResponse> postMarker( @RequestBody MarkerRequest body ) {
        System.out.println(body.name);
        if (body.name.equals("Helsinki")) {
            return new ResponseEntity<>(new MarkerRequestResponse("Added shit"), HttpStatus.OK);
        }
        return new ResponseEntity<>(new MarkerRequestResponse("Shit not added"), HttpStatus.BAD_REQUEST);
    }
}

