package com.greenowl.drawer.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.greenowl.drawer.domain.Lane;
import com.greenowl.drawer.domain.Street;
import com.greenowl.drawer.repository.LaneRepository;
import com.greenowl.drawer.service.StreetService;
import com.greenowl.drawer.web.rest.dto.CreateLaneDTO;
import com.greenowl.drawer.web.rest.dto.CreateStreetDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api")
public class LaneResource {

    @Inject
    private StreetService streetService;

    @Inject
    private LaneRepository laneRepository;

    /**
     * GET  /lanes/:streetId -> Retrieve all .
     */
    @RequestMapping(value = "/streets/{streetId}",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Lane> getLanesForStreet(@PathVariable("streetId") final Long id) {

        Street street = streetService.getStreetWithLanes(id);
        Set<Lane> setOfLanes = street.getLanes();
        List<Lane> lanes = new ArrayList<>();

        for (Lane lane : setOfLanes) {
            lanes.add(lane);
        }

        return lanes;
    }

    /**
     * POST    /street -> persist new lane into data store.
     */
    @RequestMapping(value = "/lane",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> create(@RequestBody final CreateLaneDTO dto) {

        //find street
        Street street = streetService.getStreetWithLanes(dto.getStreetId());

        if (street == null) {
            return new ResponseEntity<Object>(HttpStatus.NOT_FOUND);
        }

        Lane laneObj = new Lane(street, dto.getPoints());
        laneRepository.save(laneObj);
        return new ResponseEntity<Object>(HttpStatus.OK);

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

}
