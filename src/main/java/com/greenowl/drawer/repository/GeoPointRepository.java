package com.greenowl.drawer.repository;

import com.greenowl.drawer.domain.GeoPoint;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Ahmed on 2015-04-20.
 */
public interface GeoPointRepository extends JpaRepository<GeoPoint, Long> {
}
