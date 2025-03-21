package vttp.batch5.csf.assessment.server.services;

import java.io.StringReader;
import java.net.URI;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import jakarta.json.JsonReader;
import jakarta.json.JsonValue;
import vttp.batch5.csf.assessment.Utils;
import vttp.batch5.csf.assessment.models.MenuItem;
import vttp.batch5.csf.assessment.server.repositories.OrdersRepository;
import vttp.batch5.csf.assessment.server.repositories.RestaurantRepository;

@Service
public class RestaurantService {

  @Autowired
  private OrdersRepository ordersRepo;

  @Autowired
  private RestaurantRepository restaurantRepo;

  RestTemplate restTemplate = new RestTemplate();

  // TODO: Task 2.2
  // You may change the method's signature
  public List<JsonObject> getMenu() {
    List<MenuItem> menuData = ordersRepo.getMenu();
    List<JsonObject> menuItems = new ArrayList<>();
    menuData.forEach(item -> menuItems.add(Utils.toJson(item)));
    return menuItems;
  }
  
  // TODO: Task 4
  public boolean validatePassword(String username, String password) throws NoSuchAlgorithmException {
    String hashedPassword = Utils.hashPassword(password);
    String retrievedPassword = restaurantRepo.retrievePasswordByUsername(username);

    return hashedPassword.equals(retrievedPassword);
  }

  public String buildPaymentPayload(String ngPayload) {
    JsonReader jsonReader = Json.createReader(new StringReader(ngPayload));
    JsonObject jsonObject = jsonReader.readObject();

    JsonArray orderItems = jsonObject.getJsonArray("items");

    double totalPaid = 0;
    for (JsonValue item : orderItems) {
      JsonObject jo = item.asJsonObject();
        totalPaid += Double.parseDouble(jo.get("price").toString()) * jo.getInt("quantity");
    }

    JsonObjectBuilder jsonObjectBuilder = Json.createObjectBuilder();

    String orderID = Utils.generateUUID();

    jsonObjectBuilder.add("order_id", orderID);
    jsonObjectBuilder.add("payer", jsonObject.getString("username"));
    jsonObjectBuilder.add("payee", "Keith");
    jsonObjectBuilder.add("payment", totalPaid);

    return jsonObjectBuilder.build().toString();
  }

  public String invokePayment(String payload) {
    RequestEntity<String> request = RequestEntity
      .post(URI.create("https://payment-service-production-a75a.up.railway.app/api/payment"))
      .header("X-Authenticate", "fred")
      .contentType(MediaType.APPLICATION_JSON)
      .accept(MediaType.APPLICATION_JSON)
      .body(payload);
    
    ResponseEntity<String> response = restTemplate.exchange(request, String.class);

    return response.getBody();
  }


}
