package com.greenowl.drawer.web.rest.dto;

import com.greenowl.drawer.domain.GeoPoint;

import java.util.List;

/**
 * Created by Ahmed on 2015-04-28.
 */
public class CreateLaneDTO
{

    private Long id;

    private Long streetId;

    private String streetName;

    private List<GeoPoint> points;

    public CreateLaneDTO(Long id, Long streetId, String streetName, List<GeoPoint> points) {
        this.id = id;
        this.streetId = streetId;
        this.streetName = streetName;
        this.points = points;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getStreetId() {
        return streetId;
    }

    public void setStreetId(Long streetId) {
        this.streetId = streetId;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public List<GeoPoint> getPoints() {
        return points;
    }

    public void setPoints(List<GeoPoint> points) {
        this.points = points;
    }

    @Override
    public String toString() {
        return "CreateLaneDTO{" +
                "streetName='" + streetName + '\'' +
                ", streetId=" + streetId +
                ", id=" + id +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        CreateLaneDTO that = (CreateLaneDTO) o;

        if (id != null ? !id.equals(that.id) : that.id != null) return false;
        if (streetId != null ? !streetId.equals(that.streetId) : that.streetId != null) return false;
        return !(streetName != null ? !streetName.equals(that.streetName) : that.streetName != null);

    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (streetId != null ? streetId.hashCode() : 0);
        result = 31 * result + (streetName != null ? streetName.hashCode() : 0);
        return result;
    }
}
