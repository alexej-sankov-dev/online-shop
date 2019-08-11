package de.onlineshop.controller;

import de.onlineshop.model.product.ProductInfoDao;
import de.onlineshop.model.product.ProductWebDto;
import de.onlineshop.service.product.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/products/{id}")
    public ResponseEntity<ProductInfoDao> getProductById(@PathVariable(value = "id") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductById(id));
    }

    @GetMapping("/products")
    public ResponseEntity<List<ProductInfoDao>> getProductList() {
        return ResponseEntity.status(HttpStatus.OK).body(productService.getProductList());
    }

    @PostMapping("/products")
    public ResponseEntity<ProductInfoDao> createProduct(@Valid @RequestBody ProductWebDto productWebDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.createProduct(productWebDto));
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable(value = "id") Long id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/products/{id}")
    public ResponseEntity<ProductInfoDao> updateProduct(@PathVariable(value = "id") Long id,
                                                      @Valid @RequestBody ProductWebDto productWebDto) {
        return ResponseEntity.status(HttpStatus.OK).body(productService.updateProduct(id, productWebDto));
    }

    @PostMapping("/products/check-stock")
    public ResponseEntity<String> checkStock(@RequestBody String body) {
        return ResponseEntity.status(HttpStatus.OK).body(productService.checkStock(body));
    }

}
