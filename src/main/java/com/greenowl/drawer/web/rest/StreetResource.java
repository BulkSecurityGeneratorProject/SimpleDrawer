package com.greenowl.drawer.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.greenowl.drawer.domain.Street;
import com.greenowl.drawer.repository.StreetRepository;
import com.greenowl.drawer.service.StreetService;
import com.greenowl.drawer.web.rest.dto.CreateStreetDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import java.util.List;

@RestController
@RequestMapping("/api")
public class StreetResource {

    private static final Logger LOG = LoggerFactory.getLogger(StreetResource.class);

    @Inject private StreetService streetService;

    @Inject private StreetRepository streetRepository;


    /**
     * GET  /streets -> Retrieve all streets in the data store.
     */
    @RequestMapping(value = "/streets",
            method = RequestMethod.GET,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Timed
    public List<Street> findAll() {
            return streetRepository.findAll();
    }

    /**
     * POST    /street -> persist new street into data store.
     */
    @RequestMapping(value = "/street",
            method = RequestMethod.POST,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> create(@RequestBody final CreateStreetDTO dto) {

        Street street = new Street(dto.getName(), dto.getDirection(), null);
        streetRepository.save(street);
        return new ResponseEntity<Object>(HttpStatus.CREATED);
    }


    /**
     * DELETE /street -> remove street from data store.
     */
    @RequestMapping(value = "/street",
            method = RequestMethod.DELETE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> delete(@RequestBody final CreateStreetDTO dto) {
        Street street = streetRepository.findOne(dto.getId());
        streetRepository.delete(street);
        return new ResponseEntity<Object>(HttpStatus.OK);
    }



}
