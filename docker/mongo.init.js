try {
  db.createUser({
    user: "bcgdv",
    pwd: "secret",
    roles: [
      {
        role: "readWrite",
        db: "bcgdv"
      }
    ]
  });

  db.products.insertMany([
    {
      _id: ObjectId("5ca96984fb672d3cb0e95e74"),
      sku: "120P90",
      name: "Google Home",
      price: 4999
    },
    {
      _id: ObjectId("5caa125efb672d3cb0e96f0e"),
      sku: "43N23P",
      name: "MacBook Pro",
      price: 539999
    },
    {
      _id: ObjectId("5caa1286fb672d3cb0e96f1c"),
      sku: "A304SD",
      name: "Alexa Speaker",
      price: 10950
    },
    {
      _id: ObjectId("5caa12a8fb672d3cb0e96f29"),
      sku: "234234",
      name: "Raspberry Pi B",
      price: 3000
    }
  ]);

  db.inventories.insertMany([
    {
      _id: ObjectId("5caa7627fb672d3cb0e985b5"),
      _productId: ObjectId("5ca96984fb672d3cb0e95e74"),
      qty: 10
    },
    {
      _id: ObjectId("5caa9d66fb672d3cb0e98c83"),
      _productId: ObjectId("5caa125efb672d3cb0e96f0e"),
      qty: 5
    },
    {
      _id: ObjectId("5caa9debfb672d3cb0e98cb0"),
      _productId: ObjectId("5caa1286fb672d3cb0e96f1c"),
      qty: 10
    },
    {
      _id: ObjectId("5caa9e06fb672d3cb0e98cb7"),
      _productId: ObjectId("5caa12a8fb672d3cb0e96f29"),
      qty: 2
    }
  ]);

  db.promotions.insertMany([
    {
      _id: ObjectId("5caaa348fb672d3cb0e98e54"),
      amount: 1,
      comparison: "gte",
      value: [ObjectId("5caa12a8fb672d3cb0e96f29")],
      _promotionTypeId: ObjectId("5caaa2bcfb672d3cb0e98e13"),
      _productId: ObjectId("5caa125efb672d3cb0e96f0e")
    },
    {
      _id: ObjectId("5caaa388fb672d3cb0e98e76"),
      amount: 3,
      comparison: "gte",
      value: 2,
      _promotionTypeId: ObjectId("5caaa427fb672d3cb0e98ebc"),
      _productId: ObjectId("5ca96984fb672d3cb0e95e74")
    },
    {
      _id: ObjectId("5caaa3a1fb672d3cb0e98e7d"),
      amount: 3,
      comparison: "gt",
      value: 10,
      _promotionTypeId: ObjectId("5caaa3c2fb672d3cb0e98e94"),
      _productId: ObjectId("5caa1286fb672d3cb0e96f1c")
    }
  ]);

  db.promotionTypes.insertMany([
    {
      _id: ObjectId("5caaa2bcfb672d3cb0e98e13"),
      name: "product"
    },
    {
      _id: ObjectId("5caaa3c2fb672d3cb0e98e94"),
      name: "discount"
    },
    {
      _id: ObjectId("5caaa427fb672d3cb0e98ebc"),
      name: "price"
    }
  ]);
} catch (err) {
  print(e);
}
