package de.onlineshop.service.product.impl;

import de.onlineshop.exeption.exeptions.ResourceNotFoundException;
import de.onlineshop.model.product.Product;
import de.onlineshop.model.product.ProductInfoDao;
import de.onlineshop.model.product.ProductWebDto;
import de.onlineshop.repository.ProductRepository;
import de.onlineshop.service.product.ProductService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;

    @Override
    public ProductInfoDao getProductById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found", "product", id));
        return parseProductToProductInfoDao(product);
    }

    @Override
    public List<ProductInfoDao> getProductList() {
        List<Product> productList = productRepository.findAll();
        List<ProductInfoDao> productInfoDaoList = productList.stream()
                .map(product -> parseProductToProductInfoDao(product))
                .collect(Collectors.toList());
        return productInfoDaoList;
    }

    @Override
    public ProductInfoDao createProduct(ProductWebDto productWebDto) {
        Product product = parseProductWebDtoToProduct(productWebDto);
        productRepository.save(product);
        return getProductById(product.getId());
    }

    @Override
    public void deleteProduct(Long id) {
        if(productRepository.existsById(id)) {
            productRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("Not found and couldn't delete", "product", id);
        }
    }

    @Override
    public ProductInfoDao updateProduct(Long id, ProductWebDto productWebDto) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Not found", "product", id));
        updateNotEmptyFields(productWebDto, product);
        productRepository.save(product);
        return getProductById(product.getId());

    }

    @Override
    public String checkStock(String body) {
        JSONObject object = new JSONObject(body);
        JSONObject cart = object.getJSONObject("cart");
        Iterator<String> keysItr = cart.keys();
        while (keysItr.hasNext()) {
            String key = keysItr.next();
            Integer value = (Integer) cart.get(key);
            Product product = productRepository.getOne(Long.parseLong(key));
            if(product.getStock()-value < 0) {
                return "UNAVAILABLE";
            }
        }
        return "AVAILABLE";
    }

    private ProductInfoDao parseProductToProductInfoDao(Product product) {
        ProductInfoDao productInfoDao = new ProductInfoDao(
                product.getId(),
                product.getTitle(),
                product.getDescription(),
                product.getPrice(),
                product.getStock()
        );
        return productInfoDao;
    }

    private Product parseProductWebDtoToProduct(ProductWebDto productWebDto) {
        Product product = new Product();
        product.setTitle(productWebDto.getTitle());
        product.setDescription(productWebDto.getDescription());
        product.setPrice(productWebDto.getPrice());
        product.setStock(productWebDto.getStock());
        return product;
    }

    private void updateNotEmptyFields(ProductWebDto productWebDto, Product product) {
        if (productWebDto.getTitle() != null) {
            product.setTitle(productWebDto.getTitle());
        }
        if (productWebDto.getDescription() != null) {
            product.setDescription(productWebDto.getDescription());
        }
        if (productWebDto.getPrice() > 0) {
            product.setPrice(productWebDto.getPrice());
        }
        if (productWebDto.getStock() >= 0) {
            product.setStock(productWebDto.getStock());
        }
    }
}
