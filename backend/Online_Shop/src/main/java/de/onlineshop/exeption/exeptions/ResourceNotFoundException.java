package de.onlineshop.exeption.exeptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {

    private String resourceName;
    private Long resourceId;
    private String resourceValue;

    public ResourceNotFoundException() {
    }

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String message, String resourceName, Long id) {
        super(message);
        this.resourceName = resourceName;
        this.resourceId = id;
    }

    public ResourceNotFoundException(String message, String resourceName, String resourceValue) {
        super(message);
        this.resourceName = resourceName;
        this.resourceValue = resourceValue;
    }

    @Override
    public String getMessage() {
        return super.getMessage()+ " "+resourceName + " " + resourceId;
    }

}
