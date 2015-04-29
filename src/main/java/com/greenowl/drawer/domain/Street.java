package com.greenowl.drawer.domain;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.util.Set;

/**
 * A user.
 */
@Entity
@Table(name = "T_STREET")
public class Street extends AbstractAuditingEntity implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Size(min = 1, max = 50)
    @Column(length = 50, unique = true, nullable = false)
    private String name;

    @Size(min = 0, max = 10)
    @Column(length = 10, nullable = false)
    private String direction;

    @OneToMany(mappedBy = "associatedStreet", targetEntity = Lane.class)
    private Set<Lane> lanes; //The lanes that belong to this street

    public Street(){}


    public Street(String name, String direction, Set<Lane> lanes) {
        this.name = name;
        this.direction = direction;
        this.lanes = lanes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDirection() {
        return direction;
    }

    public void setDirection(String direction) {
        this.direction = direction;
    }

    public Set<Lane> getLanes() {
        return lanes;
    }

    public void setLanes(Set<Lane> lanes) {
        this.lanes = lanes;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Street street = (Street) o;

        if (id != null ? !id.equals(street.id) : street.id != null) return false;
        if (name != null ? !name.equals(street.name) : street.name != null) return false;
        if (direction != null ? !direction.equals(street.direction) : street.direction != null) return false;
        return !(lanes != null ? !lanes.equals(street.lanes) : street.lanes != null);

    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (name != null ? name.hashCode() : 0);
        result = 31 * result + (direction != null ? direction.hashCode() : 0);
        result = 31 * result + (lanes != null ? lanes.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Street{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", direction='" + direction + '\'' +
                ", lanes=" + lanes +
                '}';
    }
}
