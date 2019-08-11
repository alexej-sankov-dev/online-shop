package de.onlineshop.service.product;

import de.onlineshop.model.product.ProductInfoDao;
import de.onlineshop.model.product.ProductWebDto;

import java.util.List;

public interface ProductService {

    ProductInfoDao getProductById(Long id);

    List<ProductInfoDao> getProductList();

    ProductInfoDao createProduct(ProductWebDto productWebDto);

    void deleteProduct(Long id);

    ProductInfoDao updateProduct(Long id, ProductWebDto productWebDto);

    String checkStock(String body);

}
