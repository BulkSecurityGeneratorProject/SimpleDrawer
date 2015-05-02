package com.greenowl.drawer.web.rest.dto;

import com.greenowl.drawer.domain.GeoPoint;

import java.util.List;

public class CreateLaneDTO
{

    private String streetName;

    private String direction;

    private List<GeoPointDTO> points;

    public CreateLaneDTO(String streetName, String direction, List<GeoPointDTO> points) {
        this.streetName = streetName;
        this.direction = direction;
        this.points = points;
    }

    public CreateLaneDTO() {
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public List<GeoPointDTO> getPoints() {
        return points;
    }

    public void setPoints(List<GeoPointDTO> points) {
        this.points = points;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    @Override
    public String toString() {
        return "CreateLaneDTO{" +
                "streetName='" + streetName + '\'' +
                ", direction='" + direction + '\'' +
                ", points=" + points +
                '}';
    }
}
