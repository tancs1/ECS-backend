// todoModel.js

const mongoose = require("mongoose");
const signupSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: Number, required: true },
  password: { type: String, required: true },
});
const bookingRecordSchema = new mongoose.Schema({
  distance: { type: Number },
  selectedVehicle: { type: String },
  selectedVehicleImg: { type: String },
  estimatedWeight: { type: String },
  selectedGoodsType: { type: String },
  selectedHelper: { type: String },
  totalVechialPrice: { type: Number },
  pickupLocation: { type: String },
  dropoffLocation: { type: String },
  pickupTime: { type: String },
  fullName: { type: String },
  phoneNumber: { type: Number },
  receiverName: { type: String },
  receiverPhoneNumber: { type: Number },
  senderAddress: { type: String },
  receiverAddress: { type: String },
  itemDetails: { type: String },
  date: { type: String },
  jobBookedDate: { type: String },
  jobBookedTime: { type: String },
  userId:{type: String},
  status:{type: String}
});

const vehicleTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  src: { type: String, required: true },
});
const goodsTypesSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const helperSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const pickupTimeSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const orderCancelReasonSchema = new mongoose.Schema({
  name: { type: String, required: true },
});
const adminDetailsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
const AgencySignUpSchema = new mongoose.Schema({
  fullname:  String,
  email:  String,
  mobile:  String,
  address:  String,
  businessName:  String ,
  ntn:  Number ,
  password:  String,
  confirmPassword:  String,
});
const orderSchema = new mongoose.Schema({
  distance: Number,
    selectedVehicleImg: String,
    estimatedWeight: String,
    selectedGoodsType: String,
    selectedHelper: String,
    totalVechialPrice: Number,
    pickupLocation: String,
    dropoffLocation: String,
    pickupTime: String,
    fullName: String,
    phoneNumber: Number,
    receiverName: String,
    receiverPhoneNumber: Number,
    senderAddress: String,
    receiverAddress: String,
    itemDetails: String,
    date: String,
    userId: String,
    status: String,
    agencyid: String,
    jobid: String
});

// Create a model based on the schema

const orderAsignetodriverSchema = new mongoose.Schema({

  distance: Number,
  selectedVehicleImg: String,
  estimatedWeight: String,
  selectedGoodsType: String,
  selectedHelper: String,
  totalVechialPrice: Number,
  pickupLocation: String,
  dropoffLocation: String,
  pickupTime: String,
  fullName: String,
  phoneNumber: Number,
  receiverName: String,
  receiverPhoneNumber: Number,
  senderAddress: String,
  receiverAddress: String,
  itemDetails: String,
  date: String,
  userId: String,
  status: String,
  agencyid: String,
  jobid: String,
  driverId: String,
  driverName: String
});
const driverSchema = new mongoose.Schema({

  status: { type: String, required: true },
  AgencyId: { type: String, required: true },
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  cnic: { type: Number, required: true },
  vehicleNumber: { type: String, required: true },
  driverPassword: { type: String, required: true }
});

const cargoTrackingSchema = new mongoose.Schema({
  trackingId: { type: String, required: true },
  cargoStatus: { type: String, required: true },
  cargoLocation: { type: String },
  driverName: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  driverContact: { type: String, required: true },
  currentDate: { type: Date },
  pickuptime: { type: Date },
  deliveryProof: { type: String },
  reciverSignature: { type: String },
 
  driverLocation: {
    latitude: { type: Number },
    longitude: { type: Number }
  }
});
const CancelOrrderSchema = new mongoose.Schema({
  distance: Number,
    selectedVehicleImg: String,
    estimatedWeight: String,
    selectedGoodsType: String,
    selectedHelper: String,
    totalVechialPrice: Number,
    pickupLocation: String,
    dropoffLocation: String,
    pickupTime: String,
    fullName: String,
    phoneNumber: Number,
    receiverName: String,
    receiverPhoneNumber: Number,
    senderAddress: String,
    receiverAddress: String,
    itemDetails: String,
    date: String,
    userId: String,
    status: String,
    reason: String

});

// Create a model


 
// Create a model for vehicle types

module.exports = {
  Signup: mongoose.model("Signup", signupSchema),
  BookingRecord: mongoose.model("BookingRecord", bookingRecordSchema),
  VehicleType: mongoose.model("VehicleType", vehicleTypeSchema),
  goodsTypes: mongoose.model("goodsTypes", goodsTypesSchema),
  helper: mongoose.model("helper", helperSchema),
  pickupTime: mongoose.model("pickupTime", pickupTimeSchema),
  orderCancelReason: mongoose.model( "orderCancelReason",orderCancelReasonSchema),
  adminDetails: mongoose.model("adminDetails", adminDetailsSchema),
  AgencySignUp: mongoose.model("AgencySignUp", AgencySignUpSchema),
   OrderAccepByAgency : mongoose.model("OrderAccepByAgency", orderSchema),
OrderAssignToDriver : mongoose.model('OrderAssignToDriver', orderAsignetodriverSchema),
DriverRecords: mongoose.model('DriverRecords', driverSchema),
CargoTracking : mongoose.model('CargoTracking', cargoTrackingSchema),
cancelOrder : mongoose.model('cancelOrder', CancelOrrderSchema)
};
