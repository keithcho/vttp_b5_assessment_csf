package vttp.batch5.csf.assessment.server.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import vttp.batch5.csf.assessment.server.services.RestaurantService;


@RestController
@RequestMapping(path="/api", produces=MediaType.APPLICATION_JSON_VALUE)
public class RestaurantController {

  @Autowired
  private RestaurantService restaurantSvc;

  // TODO: Task 2.2
  // You may change the method's signature
  @GetMapping("/menu")
  public ResponseEntity<String> getMenus() {
    JsonArrayBuilder arrayBuilder = Json.createArrayBuilder(restaurantSvc.getMenu());
    return ResponseEntity.ok().body(arrayBuilder.build().toString());
  }

  // TODO: Task 4
  // Do not change the method's signature
  @PostMapping("/food_order")
  public ResponseEntity<String> postFoodOrder(@RequestBody String payload) {
    System.out.println("--- Order Received ---");
    System.out.println(payload);

    String paymentPayload = restaurantSvc.buildPaymentPayload(payload);

    System.out.println("Payload sent: " + paymentPayload);

    String response = restaurantSvc.invokePayment(paymentPayload);
    System.out.println(response);
    return ResponseEntity.ok(response);
  }
}
