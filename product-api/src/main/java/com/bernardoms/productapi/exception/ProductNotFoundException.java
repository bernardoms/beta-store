package com.bernardoms.productapi.exception;

public class ProductNotFoundException extends Exception {
    public ProductNotFoundException (String sku) {
        super("product with sku " + sku + " not found!");
    }
}
