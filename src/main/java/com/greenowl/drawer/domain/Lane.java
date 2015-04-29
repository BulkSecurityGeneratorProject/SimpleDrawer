package com.greenowl.drawer.domain;

import javax.persistence.*;
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

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "associated_street", referencedColumnName = "id")
    private Street associatedStreet; //The street this Lane belongs to

    @OneToMany(mappedBy = "associatedLane", targetEntity = GeoPoint.class)
    private List<GeoPoint> points; //The points this Lane is composed of

    public Lane(Street associatedStreet, List<GeoPoint> points) {
        this.associatedStreet = associatedStreet;
        this.points = points;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Street getAssociatedStreet() {
        return associatedStreet;
    }

    public void setAssociatedStreet(Street associatedStreet) {
        this.associatedStreet = associatedStreet;
    }

    public List<GeoPoint> getPoints() {
        return points;
    }

    public void setPoints(List<GeoPoint> points) {
        this.points = points;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Lane lane = (Lane) o;

        if (id != null ? !id.equals(lane.id) : lane.id != null) return false;
        if (associatedStreet != null ? !associatedStreet.equals(lane.associatedStreet) : lane.associatedStreet != null)
            return false;
        return !(points != null ? !points.equals(lane.points) : lane.points != null);

    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (associatedStreet != null ? associatedStreet.hashCode() : 0);
        result = 31 * result + (points != null ? points.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Lane{" +
                "id=" + id +
                ", associatedStreet=" + associatedStreet +
                ", points=" + points +
                '}';
    }
}
