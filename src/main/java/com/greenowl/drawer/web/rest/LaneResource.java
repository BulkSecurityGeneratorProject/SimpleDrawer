package com.greenowl.drawer.web.rest;

import com.greenowl.drawer.domain.GeoPoint;
import com.greenowl.drawer.domain.Lane;
import com.greenowl.drawer.repository.GeoPointRepository;
import com.greenowl.drawer.repository.LaneRepository;
import com.greenowl.drawer.web.rest.dto.CreateLaneDTO;
import com.greenowl.drawer.web.rest.dto.GeoPointDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api")
public class LaneResource {

    private static final Logger LOG = LoggerFactory.getLogger(LaneResource.class);

    @Inject
    private LaneRepository laneRepository;

    @Inject
    private GeoPointRepository pointRepository;

    /**
     * POST    /street -> persist new lane into data store.
     */
    @RequestMapping(value = "/lane",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> create(@RequestBody final CreateLaneDTO dto) {
        Lane lane = new Lane(dto.getStreetName(), dto.getDirection(), null);

        List<GeoPointDTO> points = dto.getPoints();
        ArrayList<GeoPoint> geoPoints = new ArrayList<>();
        for(GeoPointDTO p : points){
            geoPoints.add(new GeoPoint(p.getLat(), p.getLng(),lane));
        }
        lane.setPoints(geoPoints);
        laneRepository.save(lane); //Save the Lane.

        return new ResponseEntity<Object>(HttpStatus.OK); //All is well
    }


    /**
     * DELETE /street -> remove street from data store.
     */
    @RequestMapping(value = "/lane/{id}",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> delete(@PathVariable("id") final Long id) {
        Lane lane = laneRepository.findOne(id);
        if (lane == null) {
            return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
        }
        laneRepository.delete(lane);
        return new ResponseEntity<Object>(HttpStatus.OK);
    }


    /**
     * DELETE /street -> remove street from data store.
     */
    @RequestMapping(value = "/lanes",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Lane> findAll() {
        return laneRepository.findAll();
    }




}
