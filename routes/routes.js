var db = require("../models");

module.exports = function (app) {

    // 
    // API Routes
    // 
    app.get("/api/foods", function (req, res) {
        db.Food.findAll({}).then(function (result) {
            return res.json(result);
        })
    });

    app.get("/api/:region", function (req, res) {
        db.Region.findAll({
            where: {
                region_name: req.params.region
            }
        }).then(function (result) {
            return res.json(result);
        })
    });

    app.get("/api/foods/id/:id", function (req, res) {
        db.Food.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            return res.json(result);
        })
    });

    app.get("/api/foods/name/:name", function (req, res) {
        db.Food.findOne({
            where: {
                food_name: req.params.name
            }
        }).then(function (result) {
            return res.json(result);
        })
    });

    app.get("/api/foods/country/:country", function (req, res) {
        db.Food.findAll({
            where: {
                country: req.params.country
            }
        }).then(function (result) {
            return res.json(result);
        })
    });

    app.get("/api/foods/upvotes/:upvotes", function (req, res) {
        db.Food.findAll({
            where: {
                upvotes: {
                    $gte: req.params.upvotes
                }
            }
        }).then(function (result) {
            return res.json(result);
        })
    });

    app.post("/api/foods", function (req, res) {
        if (req.body.length > 0) {
            db.Foods.create(req.body).then(function (result) {
                return res.json(result);
            })
        }
    });

    app.put("/api/:region", function (req, res) {
        db.Region.update({
            posts: sequelize.literal('posts + 1')
        }, {
                where: {
                    region_name: req.params.region
                }
            }
        ).then(function (result) {
            return res.json(result);
        });
    })

    app.put("/api/foods/id/:id/upvotes", function (req, res) {
        db.Food.update({
            upvotes: sequelize.literal('upvotes + 1')
        }, {
                where: {
                    id: req.params.id
                }
            }).then(function (result) {
                return res.json(result);
            })
    })

    // 
    // HTML Routes
    // 

    app.get("/", function (req, res) {
        db.Region.bulkCreate([
            { region_name: 'North America', posts: 1 },
            { region_name: 'South America', posts: 1 },
            { region_name: 'Europe', posts: 1 },
            { region_name: 'Asia', posts: 1 },
            { region_name: 'Africa', posts: 1 },
            { region_name: 'Australia', posts: 1 }
        ]).then(function () {
            db.Region.findAll({
            }).then(function (result) {
                return res.render("index", { regions: result });
            })
        })
    });

    app.get("/create", function (req, res) {
        return res.render("create");
    });

    app.get("/:region", function (req, res) {
        db.Food.findAll({
            where: {
                region_name: req.params.region
            }
        }).then(function (result) {
            return res.render("index", { foods: result });
        })
    });

    app.get("/:region/:id", function (req, res) {
        db.Food.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (result) {
            return res.render("item", { foods: result });
        })
    });
}