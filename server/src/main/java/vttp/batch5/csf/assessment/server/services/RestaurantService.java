package vttp.batch5.csf.assessment.server.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.json.JsonObject;
import vttp.batch5.csf.assessment.Utils;
import vttp.batch5.csf.assessment.models.MenuItem;
import vttp.batch5.csf.assessment.server.repositories.OrdersRepository;

@Service
public class RestaurantService {

  @Autowired
  private OrdersRepository ordersRepo;

  // TODO: Task 2.2
  // You may change the method's signature
  public List<JsonObject> getMenu() {
    List<MenuItem> menuData = ordersRepo.getMenu();
    List<JsonObject> menuItems = new ArrayList<>();
    menuData.forEach(item -> menuItems.add(Utils.toJson(item)));
    return menuItems;
  }
  
  // TODO: Task 4


}
