package com.linguacity.backend.common.exception;

import com.linguacity.backend.common.dto.ErrorResponse;
import com.linguacity.backend.identity.exception.UserProfileNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingRequestHeaderException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

/**
 * Mọi lỗi API trả về cùng một định dạng ErrorResponse (FR-SYS-06).
 */
@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponse> handleApi(ApiException exception) {
        return error(exception.getStatus(), exception.getCode(), exception.getMessage());
    }

    @ExceptionHandler(UserProfileNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserProfileNotFound(
            UserProfileNotFoundException exception
    ) {
        return error(HttpStatus.NOT_FOUND, "USER_NOT_FOUND", exception.getMessage());
    }

    @ExceptionHandler(MissingRequestHeaderException.class)
    public ResponseEntity<ErrorResponse> handleMissingHeader(
            MissingRequestHeaderException exception
    ) {
        return error(HttpStatus.BAD_REQUEST, "MISSING_HEADER", "Missing header " + exception.getHeaderName());
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ErrorResponse> handleTypeMismatch(
            MethodArgumentTypeMismatchException exception
    ) {
        return error(HttpStatus.BAD_REQUEST, "INVALID_PARAMETER", "Invalid " + exception.getName());
    }

    private ResponseEntity<ErrorResponse> error(HttpStatus status, String code, String message) {
        return ResponseEntity
                .status(status)
                .body(new ErrorResponse(code, message));
    }
}
