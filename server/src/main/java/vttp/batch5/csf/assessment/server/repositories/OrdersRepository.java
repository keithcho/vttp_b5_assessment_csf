package vttp.batch5.csf.assessment.server.repositories;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import vttp.batch5.csf.assessment.Utils;
import vttp.batch5.csf.assessment.models.MenuItem;


@Repository
public class OrdersRepository {

  @Autowired
  private MongoTemplate mongoTemplate;

  private static final String MONGO_SERIES = "menus";

  // TODO: Task 2.2
  // You may change the method's signature
  // Write the native MongoDB query in the comment below
  //
  //  db.menus.find().sort({ name: 1 })
  //
  public List<MenuItem> getMenu() {

    Criteria criteria = Criteria.where("");
    
    Query query = Query.query(criteria)
      .with(Sort.by(Direction.ASC, "name"));

    return mongoTemplate.find(query, Document.class, MONGO_SERIES)
      .stream()
      .map(Utils::toMenuItem)
      .toList();
  }

  // TODO: Task 4
  // Write the native MongoDB query for your access methods in the comment below
  //
  //  Native MongoDB query here
  public void insertOrder(Document order) {
    mongoTemplate.insert(order, "orders");
  }
  
}
