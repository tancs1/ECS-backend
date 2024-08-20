const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();;
const {
  Signup,
  BookingRecord,
  VehicleType,
  goodsTypes,
  helper,
  pickupTime,
  orderCancelReason,
  adminDetails,
  AgencySignUp,
  OrderAccepByAgency,
  OrderAssignToDriver,
  DriverRecords,
  CargoTracking,
  cancelOrder,
} = require("./schema");


// Initialize express app
const app = express();

// Use environment variables
// Use environment variables
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200', // Allow requests from your local Angular app
  methods: 'GET,POST,PUT,DELETE',
  credentials: true
}));

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Create a new signup
app.post("/signup", async (req, res) => {
  try {
    const newSignup = await Signup.create(req.body);
    res.status(201).json(newSignup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all signups
app.get("/signup/:id?", async (req, res) => {
  try {
    if (req.params.id) {
      // If id parameter is present, fetch signup record by id
      const signupId = req.params.id;
      const signupRecordById = await Signup.findById(signupId);
      if (!signupRecordById) {
        return res.status(404).json({ message: 'Signup record not found' });
      }
      res.json(signupRecordById);
    } else {
      // If id parameter is not present, fetch all signup records
      const allSignupRecords = await Signup.find();
      res.json(allSignupRecords);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Update a signup
app.put("/signup/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedSignup = await Signup.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedSignup);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a signup
app.delete("/signup/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Signup.findByIdAndDelete(id);
    res.json({ message: "Signup deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.post("/AgencySignUp", async (req, res) => {
  try {
    const newAgencySignUp = await AgencySignUp.create(req.body);
    res.status(201).json(newAgencySignUp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all signups
app.get('/AgencySignUp/:id?', async (req, res) => {
  try {
    if (req.params.id) {
      // If id parameter is present, fetch booking record by id
      const userId = req.params.id;
      const userAgencySignUpById = await AgencySignUp.findById(userId);
      if (!userAgencySignUpById) {
        return res.status(404).json({ message: 'Booking record not found' });
      }
      res.json(userAgencySignUpById);
    }  else  {
      // If neither id nor userId is provided, fetch all booking records
      const allAgencySignUps = await AgencySignUp.find();
      res.json(allAgencySignUps);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a signup
app.put("/AgencySignUp/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedAgencySignUp = await AgencySignUp.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedAgencySignUp);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a signup
app.delete("/AgencySignUp/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await AgencySignUp.findByIdAndDelete(id);
    res.json({ message: "AgencySignUp deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// cancelOrder
app.post("/usersBookingRecord", async (req, res) => {
  try {
    const newUsersBookingRecord = await BookingRecord.create(req.body);
    res.status(201).json(newUsersBookingRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all signups
app.get('/usersBookingRecord/:id?', async (req, res) => {
  try {
    if (req.params.id) {
      // If id parameter is present, fetch booking record by id
      const Id = req.params.id;
      const userBookingRecordById = await BookingRecord.findById(Id);
      if (!userBookingRecordById) {
        return res.status(404).json({ message: 'Booking record not found' });
      }
      res.json(userBookingRecordById);
    } else if (req.query.userId) {
      // If userId is provided in query parameters, fetch booking records by userId
      const userId = req.query.userId;
      const userBookingRecordsByUserId = await BookingRecord.find({ userId: userId });
      res.json(userBookingRecordsByUserId);
    } else {
      // If neither id nor userId is provided, fetch all booking records
      const allBookingRecords = await BookingRecord.find();
      res.json(allBookingRecords);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



app.put("/usersBookingRecord/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedUsersBookingRecord = await BookingRecord.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedUsersBookingRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/usersBookingRecord/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await BookingRecord.findByIdAndDelete(id);
    res.json({ message: "usersBookingRecord deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// usersBookingRecord
app.post("/cancelOrder", async (req, res) => {
  console.log(req.body);
  try {
    const newcancelOrder = await cancelOrder.create(req.body);
    res.status(201).json(newcancelOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all signups
app.get('/cancelOrder/:id?', async (req, res) => {
  try {
    if (req.params.id) {
      // If id parameter is present, fetch booking record by id
      const Id = req.params.id;
      const usercancelOrderById = await cancelOrder.findById(Id);
      if (!usercancelOrderById) {
        return res.status(404).json({ message: 'Booking record not found' });
      }
      res.json(usercancelOrderById);
    } else if (req.query.userId) {
      // If userId is provided in query parameters, fetch booking records by userId
      const userId = req.query.userId;
      const usercancelOrderUserId = await cancelOrder.find({ userId: userId });
      res.json(usercancelOrderUserId);
    } else  {
      // If neither id nor userId is provided, fetch all booking records
      const allcancelOrders = await cancelOrder.find();
      res.json(allcancelOrders);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.delete("/cancelOrder/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await cancelOrder.findByIdAndDelete(id);
    res.json({ message: "cancelOrder deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.post("/OrderAccepByAgency", async (req, res) => {
  try {
    const newOrderAccepByAgency = await OrderAccepByAgency.create(req.body);
    res.status(201).json(newOrderAccepByAgency);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all signups
app.get('/OrderAccepByAgency/:id?', async (req, res) => {
  try {
    if (req.params.id) {
      // If id parameter is present, fetch booking record by id
      const Id = req.params.id;
      const userOrderAccepByAgencyById = await OrderAccepByAgency.findById(Id);
      if (!userOrderAccepByAgencyById) {
        return res.status(404).json({ message: 'Booking record not found' });
      }
      res.json(userOrderAccepByAgencyById);
    } else if (req.query.agencyid) {
      // If userId is provided in query parameters, fetch booking records by userId
      const agencyid = req.query.agencyid;
      const userOrderAccepByAgencyagencyid = await OrderAccepByAgency.find({ agencyid: agencyid });
      res.json(userOrderAccepByAgencyagencyid);
    }
    else if (req.query.jobid) {
      // If jobid is provided in query parameters, fetch booking records by jobid
      const jobid = req.query.jobid;
      const userOrderAccepByAgencyjobid = await OrderAccepByAgency.find({ jobid: jobid });
      res.json(userOrderAccepByAgencyjobid);
    } else  {
      // If neither id nor userId is provided, fetch all booking records
      const allOrderAccepByAgencys = await OrderAccepByAgency.find();
      res.json(allOrderAccepByAgencys);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/OrderAccepByAgency/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedOrderAccepByAgency =
      await OrderAccepByAgency.findByIdAndUpdate(id, req.body, {
        new: true,
      });
    res.json(updatedOrderAccepByAgency);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/OrderAccepByAgency/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await OrderAccepByAgency.findByIdAndDelete(id);
    res.json({ message: "OrderAccepByAgency deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.post("/OrderAssignToDriver", async (req, res) => {
  try {
    const newOrderAssignToDriver = await OrderAssignToDriver.create(req.body);
    res.status(201).json(newOrderAssignToDriver);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all signups
app.get('/OrderAssignToDriver/:id?', async (req, res) => {
  console.log("req.params.id ", req.query)
  try {
    if (req.params.id) {
      // If id parameter is present, fetch booking record by id
      const Id = req.params.id;
      const userOrderAssignToDriverById = await OrderAssignToDriver.findById(Id);
      if (!userOrderAssignToDriverById) {
        return res.status(404).json({ message: 'Booking record not found' });
      }
      res.json(userOrderAssignToDriverById);
    } else if (req.query.driverId) {
      // If userId is provided in query parameters, fetch booking records by userId
      const driverId = req.query.driverId;
      const userOrderAssignToDriverdriverId = await OrderAssignToDriver.find({ driverId: driverId });
      res.json(userOrderAssignToDriverdriverId);
    } else if (req.query.jobid) {
      // If jobid is provided in query parameters, fetch booking records by jobid
      const jobid = req.query.jobid;
      const userOrderAssignToDriverjobid = await OrderAssignToDriver.find({ jobid: jobid });
      res.json(userOrderAssignToDriverjobid);
    } else  {
      // If neither id nor userId is provided, fetch all booking records
      const allOrderAssignToDrivers = await OrderAssignToDriver.find();
      res.json(allOrderAssignToDrivers);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/OrderAssignToDriver/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedOrderAssignToDriver =
      await OrderAssignToDriver.findByIdAndUpdate(id, req.body, {
        new: true,
      });
    res.json(updatedOrderAssignToDriver);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/OrderAssignToDriver/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await OrderAssignToDriver.findByIdAndDelete(id);
    res.json({ message: "OrderAssignToDriver deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.post("/adminDetails", async (req, res) => {
  try {
    const adminDetailes = await adminDetails.create(req.body);
    res.status(201).json(adminDetailes);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all signups

app.get('/adminDetails/:id?', async (req, res) => {
  try {
    if (req.params.id) {
      // If id parameter is present, fetch booking record by id
      const userId = req.params.id;
      const useradminDetailsById = await adminDetails.findById(userId);
      if (!useradminDetailsById) {
        return res.status(404).json({ message: 'Booking record not found' });
      }
      res.json(useradminDetailsById);
    } else   {
      // If neither id nor userId is provided, fetch all booking records
      const alladminDetailss = await adminDetails.find();
      res.json(alladminDetailss);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.put("/adminDetails/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedadminDetails = await adminDetails.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedadminDetails);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/adminDetails/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await adminDetails.findByIdAndDelete(id);
    res.json({ message: "cancelOrder deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.post("/DriverRecords", async (req, res) => {
  try {
    const DriverRecord = await DriverRecords.create(req.body);
    res.status(201).json(DriverRecord);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all signups
app.get('/DriverRecords/:id?', async (req, res) => {
  try {
    if (req.params.id) {
      // If id parameter is present, fetch booking record by id
      const Id = req.params.id;
      const userDriverRecordsById = await DriverRecords.findById(Id);
      if (!userDriverRecordsById) {
        return res.status(404).json({ message: 'Booking record not found' });
      }
      res.json(userDriverRecordsById);
    } else if (req.query.AgencyId) {
      // If AgencyId is provided in query parameters, fetch booking records by AgencyId
      const AgencyId = req.query.AgencyId;
      const userDriverRecordsAgencyId= await DriverRecords.find({ AgencyId: AgencyId });
      res.json(userDriverRecordsAgencyId);
    } else  {
      // If neither id nor AgencyIdis provided, fetch all booking records
      const allDriverRecordss = await DriverRecords.find();
      res.json(allDriverRecordss);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/DriverRecords/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedDriverRecords = await DriverRecords.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedDriverRecords);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/DriverRecords/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await DriverRecords.findByIdAndDelete(id);
    res.json({ message: "DriverRecords deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
app.post("/CargoTracking", async (req, res) => {
  try {
    const CargoTrackings = await CargoTracking.create(req.body);
    res.status(201).json(CargoTrackings);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all signups
app.get('/CargoTracking/:id?', async (req, res) => {
  console.log('trakid',req.query.trackingId);
  try {
    if (req.params.id) {

      // If id parameter is present, fetch booking record by id
      const userId = req.params.id;
      const userCargoTrackingById = await CargoTracking.findById(userId);
      if (!userCargoTrackingById) {
        return res.status(404).json({ message: 'Booking record not found' });
      }
      res.json(userCargoTrackingById);
    } else if (req.query.trackingId) {
      // If trackingId is provided in query parameters, fetch booking records by trackingId
      const trackingId = req.query.trackingId;
      const userCargoTrackingtrackingId = await CargoTracking.find({ trackingId: trackingId });
      console.log(userCargoTrackingtrackingId);
      res.json(userCargoTrackingtrackingId);
    } else  {
      // If neither id nor userId is provided, fetch all booking records
      const allCargoTrackings = await CargoTracking.find();
      res.json(allCargoTrackings);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.put("/CargoTracking/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedCargoTracking = await CargoTracking.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedCargoTracking);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/CargoTracking/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await CargoTracking.findByIdAndDelete(id);
    res.json({ message: "CargoTracking deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
// VehicleType
app.get("/vehicletype", async (req, res) => {
  try {
    const VehicleTypes = await VehicleType.find();
    console.log(VehicleTypes);
    res.json(VehicleTypes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get("/goodsTypes", async (req, res) => {
  try {
    const goodsType = await goodsTypes.find();
    console.log(goodsType);
    res.json(goodsType);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get("/helper", async (req, res) => {
  try {
    const helpers = await helper.find();
    console.log(helpers);
    res.json(helpers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get("/pickupTime", async (req, res) => {
  try {
    const pickupTimes = await pickupTime.find();
    console.log(pickupTimes);
    res.json(pickupTimes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
app.get("/orderCancelReason", async (req, res) => {
  try {
    const orderCancelReasons = await orderCancelReason.find();
    console.log(orderCancelReasons);
    res.json(orderCancelReasons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
