package com.greenowl.drawer.domain;

import javax.persistence.*;

@Entity
@Table(name = "T_GEOPOINT")
public class GeoPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "latitude")
    private Double lat; //Stored as a double, will lose some precision

    @Column(name = "longitude")
    private Double lng; //Stored as a double, will lose some precision

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "associated_lane", referencedColumnName = "id")
    private Lane associatedLane;

    public GeoPoint(){}

    public GeoPoint(Double lat, Double lng, Lane associatedLane) {
        this.lat = lat;
        this.lng = lng;
        this.associatedLane = associatedLane;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getLat() {
        return lat;
    }

    public void setLat(Double lat) {
        this.lat = lat;
    }

    public Double getLng() {
        return lng;
    }

    public void setLng(Double lng) {
        this.lng = lng;
    }

    public Lane getAssociatedLane() {
        return associatedLane;
    }

    public void setAssociatedLane(Lane associatedLane) {
        this.associatedLane = associatedLane;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        GeoPoint geoPoint = (GeoPoint) o;

        if (id != null ? !id.equals(geoPoint.id) : geoPoint.id != null) return false;
        if (lat != null ? !lat.equals(geoPoint.lat) : geoPoint.lat != null) return false;
        if (lng != null ? !lng.equals(geoPoint.lng) : geoPoint.lng != null) return false;
        return !(associatedLane != null ? !associatedLane.equals(geoPoint.associatedLane) : geoPoint.associatedLane != null);
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (lat != null ? lat.hashCode() : 0);
        result = 31 * result + (lng != null ? lng.hashCode() : 0);
        result = 31 * result + (associatedLane != null ? associatedLane.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "GeoPoint{" +
                "id=" + id +
                ", lat=" + lat +
                ", lng=" + lng +
                ", associatedLane=" + associatedLane +
                '}';
    }
}
