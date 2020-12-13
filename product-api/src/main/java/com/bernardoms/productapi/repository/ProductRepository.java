package com.bernardoms.productapi.repository;

import com.bernardoms.productapi.model.Product;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ProductRepository extends PagingAndSortingRepository<Product, String> {
}
