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
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;

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
    public ResponseEntity<MarkerRequestResponse> postMarker(@RequestBody MarkerRequest body) {
        // Create Marker entity
        Marker marker = new Marker();
        marker.setName(body.name);
        marker.setLatitude(body.latitude);
        marker.setLongitude(body.longitude);

        // Create geometry point from lat/lng
        GeometryFactory geometryFactory = new GeometryFactory();
        Point point = geometryFactory.createPoint(new Coordinate(body.longitude, body.latitude));
        point.setSRID(4326); // Set correct spatial reference system
        marker.setLocation(point);

        System.out.println("Created point: " + point.toText());


        // Save to database
        markerRepository.save(marker);

        return new ResponseEntity<>(new MarkerRequestResponse("Added"), HttpStatus.OK);
    }

}

