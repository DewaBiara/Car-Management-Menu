const { Cars } = require('./models');

function handleRoot(req, res){
  Cars.findAll().then(Cars => {
    res.status(200).render("Cars/index", {
      Cars: Cars,
    });
  }).catch((err) => {
    res.status(400).json({
      status: "FAIL",
      message: err.message,
    });
  });
}

function handlePageCreateCar(req, res){
  res.render("cars/create");
}

function handleCreateCar(req, res){
    Cars.create({
        name : req.body.name,
        type : req.body.type,
        price : req.body.price,
        image : req.file.filename,
        size : req.body.size
    }).then(Cars => {
        res.redirect(201, "/cars/");     
    }).catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
}

function handleCar(req, res){
  Cars.findAll().then(Cars => {
      res.status(200).render("Cars/index", {
        Cars: Cars,
      });
  }).catch((err) => {
      res.status(400).json({
        status: "FAIL",
        message: err.message,
      });
    });
}

function handleGetCar(req, res){
    const car = req.car;
    res.render("cars/_id/index", {
      id: car.id,
      name: car.name,
      type: car.type,
      price: car.price,
      image: car.image,
      size: car.size,
      updateAt: car.updateAt
    });
}

function handlePageUpdateCar(req, res){
  const car = req.car;
  res.render("cars/_id/update", {
    id: car.id,
    name: car.name,
    type: car.type,
    price: car.price,
    image: car.image,
    size: car.size
  });
}

function handleupdateCar(req, res){
    const car = req.car;
    car.update(req.body).then(()=>{
      res.redirect(201, "/cars/"); 
    }).catch((err) => {
        res.status(400).json({
          status: "FAIL",
          message: err.message,
        });
      });
}

function handleDeleteCar(req, res){
  const car = req.car;
  car.destroy().then(()=>{
      res.redirect(204, "/cars");
  }).catch((err) => {
      res.status(400).json({
        status: "FAIL",
        message: err.message,
      });
    });
}

module.exports = {
    handleRoot,
    handleCreateCar,
    handleCar,
    handleGetCar,
    handleDeleteCar,
    handleupdateCar,
    handlePageCreateCar,
    handlePageUpdateCar
}