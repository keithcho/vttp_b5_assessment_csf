package vttp.batch5.csf.assessment.server.repositories;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Repository;

// Use the following class for MySQL database
@Repository
public class RestaurantRepository {

    @Autowired
    private JdbcTemplate template;

    public String retrievePasswordByUsername(String username) {
        SqlRowSet rs = template.queryForRowSet(
            "SELECT * FROM CUSTOMERS WHERE username LIKE ?", username);
        return rs.getString("username");
    }

}
