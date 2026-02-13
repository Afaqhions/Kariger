const Provided_services = require("../models/services")
const User = require("../models/User")


exports.getServices = async (req,res)=>{
    try {
    const services = await Provided_services.find()
    res.status(200).json({
      success: true,
      data: services
    });
  } catch (error) {
        console.error(err);
        res.status(500).json({message:"Server Error"});
  }
}

exports.createService = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      price,
      location,
      availability,
      UserId
    } = req.body;

    // Validate required fields
    if (!name || !category || !description || !price || !location || !UserId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check user exists
    const userExists = await User.exists({ _id: UserId });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User exists and going to make a service")
    // Create service
    const service = await Provided_services.create({
      name,
      category,
      description,
      price,
      location,
      availability,
      UserId
    });

    res.status(201).json({
      message: "Service created successfully",
      service
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating service" });
  }
};


exports.updateService = async (req,res)=>{
    try {
    const {
      name,
      category,
      description,
      price,
      location,
      availability,
      UserId
    } = req.body;
    // const cleanDescription = DOMPurify.sanitize(description);
    // Create a newService Object
    const newService = {};
    if (name) {
      newService.name = name;
    }
    if (category) {
      newService.category = category;
    }
    if (description) {
      newService.description = description;
    }
    if (price) {
      newService.price = price;
    }
    if (location) {
      newService.location = location;
    }
    if (availability) {
      newService.availability = availability;
    }

    const userExists = await User.exists({ _id: UserId });
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User exists and going to update a service")
    
    // Find a service and Update it.
    console.log('Before finding the service')
    let service = await Provided_services.findById(req.params.id);
    console.log('After finding the service')
    if (!service) {
      return res.status(404).send("service does not Exist");
    }
    //Alow Updation only if the user owns this service
    if (service.UserId.toString() !== UserId) {
      console.log('In the if block')
      return res.status(401).send("Not Allowed");
    }

    service = await Provided_services.findByIdAndUpdate(
      req.params.id,
      { $set: newService },
      { new: true }
    );
    res.status(201).json({message: "Service updated successfully", service });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some bbb internal server error occured");
  }
}

exports.deleteService = async (req,res)=>{
    try {
    // Find a service and Delete it.
    let service = await Provided_services.findById(req.params.id);
    if (!service) {
      return res.status(404).send("service does not Exist");
    }
    //Alow Deletion only if the user owns this service
    console.log("service.UserId.toString() = " , service.UserId.toString())
    console.log("req.UserId = ", req.body.UserId)
    if (service.UserId.toString() !== req.body.UserId) {
      return res.status(401).send("Not Allowed");
    }

    service = await Provided_services.findByIdAndDelete(req.params.id);
    res.status(201).json({message: "Service Deleted successfully", service });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("some bbb internal server error occured");
  }
}
