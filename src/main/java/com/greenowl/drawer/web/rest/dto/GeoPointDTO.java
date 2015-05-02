package com.greenowl.drawer.web.rest.dto;

/**
 * Created by Ahmed on 2015-04-30.
 */
public class GeoPointDTO {

    private Double lat;

    private Double lng;

    public GeoPointDTO() {
    }

    public GeoPointDTO(Double lat, Double lng) {
        this.lat = lat;
        this.lng = lng;
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

    @Override
    public boolean equals(Object o) {


        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        GeoPointDTO that = (GeoPointDTO) o;

        if (lat != null ? !lat.equals(that.lat) : that.lat != null) return false;
        return !(lng != null ? !lng.equals(that.lng) : that.lng != null);

    }

    @Override
    public int hashCode() {
        int result = lat != null ? lat.hashCode() : 0;
        result = 31 * result + (lng != null ? lng.hashCode() : 0);
        return result;
    }
}
