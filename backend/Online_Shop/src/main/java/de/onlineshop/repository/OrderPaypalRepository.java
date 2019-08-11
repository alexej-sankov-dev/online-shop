package de.onlineshop.repository;

import de.onlineshop.model.order.OrderPaypal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderPaypalRepository extends JpaRepository<OrderPaypal, Long> {

    //@Query("SELECT * FROM PRODUCT p WHERE p.id = :id")
    List<OrderPaypal> findById(String id);
}
