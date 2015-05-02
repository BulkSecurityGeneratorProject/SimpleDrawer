package com.greenowl.drawer.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

/**
 * Street Lane
 */
@Entity
@Table(name = "T_LANE")
public class Lane {

    public Lane(){}

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(min = 1, max = 45)
    @Column(length = 45)
    private String streetName; //The street this Lane belongs to

    @Size(min = 0, max = 10)
    @Column
    private String direction;

    @OneToMany(mappedBy = "associatedLane", targetEntity = GeoPoint.class, fetch = FetchType.LAZY)
    private List<GeoPoint> points; //The points this Lane is composed of

    public Lane(String streetName, String direction, List<GeoPoint> points) {
        this.streetName = streetName;
        this.direction = direction;
        this.points = points;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<GeoPoint> getPoints() {
        return points;
    }

    public void setPoints(List<GeoPoint> points) {
        this.points = points;
    }

    public String getStreetName() {
        return streetName;
    }

    public void setStreetName(String streetName) {
        this.streetName = streetName;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }


    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Lane lane = (Lane) o;

        if (id != null ? !id.equals(lane.id) : lane.id != null) return false;
        if (streetName != null ? !streetName.equals(lane.streetName) : lane.streetName != null) return false;
        if (direction != null ? !direction.equals(lane.direction) : lane.direction != null) return false;
        return !(points != null ? !points.equals(lane.points) : lane.points != null);

    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (streetName != null ? streetName.hashCode() : 0);
        result = 31 * result + (direction != null ? direction.hashCode() : 0);
        result = 31 * result + (points != null ? points.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Lane{" +
                "id=" + id +
                ", streetName='" + streetName + '\'' +
                ", direction='" + direction + '\'' +
                '}';
    }
}
