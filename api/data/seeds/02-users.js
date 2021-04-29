exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          email: "g@rrick1.com",
          username: "garrick1",
          password:
            "$2b$10$dlapt8PB9kj4oCg.e3agBu7I.n5P8RYUzXGZkULLgTrxbyJjxa2Cy",
        }, // 1
        {
          email: "g@rrick2.com",
          username: "garrick2",
          password:
            "$2b$10$meXVxr/s7VkWjaNIs5b5DODi8b6nqjQA6PwoNZoQ3G5whFcdGagju",
        }, // 2
        {
          email: "g@rrick3.com",
          username: "garrick3",
          password:
            "$2b$10$.jmYh.hmj8vLaOba087N.Omy3SdLZY9cCI2WaaafF0/wuwJAHQ5Hu",
        }, // 3
      ]);
    });
};
