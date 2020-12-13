package com.bernardoms.productapi.controller;

import com.bernardoms.productapi.exception.ProductNotFoundException;
import com.bernardoms.productapi.model.Product;
import com.bernardoms.productapi.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RequiredArgsConstructor
@RequestMapping("/v1/products")
@RestController
public class ProductController {
    private final ProductService productService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @CrossOrigin(origins = "*")
    public ResponseEntity<String> saveProduct(@RequestBody Product product, UriComponentsBuilder uriComponentsBuilder) {
        var savedProduct = productService.saveProduct(product);
        var uriComponent = uriComponentsBuilder.path("/v1/products/{sku}").buildAndExpand(savedProduct);
        return ResponseEntity.created(uriComponent.toUri()).build();
    }

    @GetMapping
    @ResponseStatus(HttpStatus.OK)
    @CrossOrigin(origins = "*")
    public Page<Product> getProducts(Pageable pageable) {
        return productService.getProducts(pageable);
    }

    @GetMapping("/{sku}")
    @ResponseStatus(HttpStatus.OK)
    public Product getProduct(@PathVariable String sku) throws ProductNotFoundException {
        return productService.getProductBySku(sku);
    }

    @PutMapping("/{sku}")
    @ResponseStatus(HttpStatus.OK)
    public Product updateProduct(@PathVariable String sku, @RequestBody Product product) throws ProductNotFoundException {
        return productService.updateProduct(sku, product);
    }

    @DeleteMapping("/{sku}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteProduct(@PathVariable String sku) {
        productService.deleteProduct(sku);
    }
}
