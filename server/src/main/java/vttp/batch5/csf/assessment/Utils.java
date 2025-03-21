package vttp.batch5.csf.assessment;

import org.bson.Document;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import vttp.batch5.csf.assessment.models.MenuItem;

public class Utils {
    public static MenuItem toMenuItem(Document doc) {
        MenuItem menuItem = new MenuItem();
        menuItem.setId(doc.getString("_id"));
        menuItem.setName(doc.getString("name"));
        menuItem.setDescription(doc.getString("description"));
        menuItem.setPrice(doc.getDouble("price"));
        return menuItem;
    }
    public static JsonObject toJson(MenuItem menuItem) {
        return Json.createObjectBuilder()
        .add("id", menuItem.getId())
        .add("name", menuItem.getName())
        .add("description", menuItem.getDescription())
        .add("price", menuItem.getPrice())
        .build();
    }
}
