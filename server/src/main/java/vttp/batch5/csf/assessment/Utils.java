package vttp.batch5.csf.assessment;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.UUID;

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
    public static String generateUUID() {
        String randomString = UUID.randomUUID().toString().replace("-", "");
        return randomString.substring(0, Math.min(randomString.length(), 8));
    }
    public static String hashPassword(String password) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        return new String(digest.digest(password.getBytes(StandardCharsets.UTF_8)), StandardCharsets.UTF_8);
    }
}
