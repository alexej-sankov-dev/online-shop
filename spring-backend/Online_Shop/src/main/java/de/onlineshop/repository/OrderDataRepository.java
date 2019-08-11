package de.onlineshop.repository;

import de.onlineshop.model.order.OrderData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderDataRepository extends JpaRepository<OrderData, Long> {
}
