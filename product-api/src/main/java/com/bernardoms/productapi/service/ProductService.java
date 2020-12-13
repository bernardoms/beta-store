package com.bernardoms.productapi.service;

import com.bernardoms.productapi.exception.ProductNotFoundException;
import com.bernardoms.productapi.model.Product;
import com.bernardoms.productapi.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ProductService {
    private final ProductRepository productRepository;

    public Page<Product> getProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public Product getProductBySku(String sku) throws ProductNotFoundException {
        return productRepository.findById(sku).orElseThrow(() -> new ProductNotFoundException(sku));
    }

    public String saveProduct(Product product) {
        return productRepository.save(product).getSku();
    }

    public Product updateProduct(String sku, Product newProduct) throws ProductNotFoundException {
        Product product = productRepository.findById(sku).orElseThrow(() -> new ProductNotFoundException(sku));

        product.setDescription(newProduct.getDescription());
        product.setImage(newProduct.getImage());
        product.setName(newProduct.getName());
        product.setPrice(newProduct.getPrice());
        product.setQuantity(newProduct.getQuantity());
        product.setSku(newProduct.getSku());

        return productRepository.save(product);
    }

    public void deleteProduct(String sku) {
        productRepository.deleteById(sku);
    }
}
