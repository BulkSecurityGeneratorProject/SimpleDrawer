package com.greenowl.drawer.service;

import com.greenowl.drawer.domain.Lane;
import com.greenowl.drawer.domain.Street;
import com.greenowl.drawer.repository.LaneRepository;
import com.greenowl.drawer.repository.StreetRepository;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.Set;

/**
 * Business Layer for Street entities.
 */
@Service
public class StreetService {

    private static final Logger LOG = LoggerFactory.getLogger(StreetService.class);

    @Inject private StreetRepository streetRepository;

    @Inject private LaneRepository laneRepository;

    /**
     * Persist and add a new Lane entity to a Street entity.
     * @param lane
     * @return
     */
    public Street addLane(Street street, Lane lane){
        LOG.debug("Adding a new Lane to street: [{}]", street.getName());
        Lane savedLane = laneRepository.save(lane);
        Set<Lane> lanes =
                street.getLanes();
        lanes.add(savedLane);
        return streetRepository.save(street);
    }

    public Street updateStreetName(Street street, String name){
        return updateStreetInformation(street, name, null);
    }

    public Street updateStreetDirection(Street street, String direction){
        return updateStreetInformation(street, null, direction);
    }


    public Street getStreetWithLanes(Long id){
        Street street = streetRepository.findOne(id);
        street.getLanes().size();
        return street;
    }


    /**
     * Updates the street name and or direction of a particular street.
     * If name or direction are empty, will set them to original Street entities values.
     * @param street
     * @param name
     * @param direction
     * @return
     */
    private Street updateStreetInformation(Street street, String name, String direction){
        if(StringUtils.isNotBlank(name)){
            name = street.getName();
        }
        if(StringUtils.isNotBlank(direction)){
            direction = street.getDirection();
        }
        street.setName(name);
        street.setDirection(direction);
        return streetRepository.save(street);
    }
}
