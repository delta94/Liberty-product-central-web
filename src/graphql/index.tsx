/* eslint-disable import/first */
// tslint:disable
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;


/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any,
};

export type AddTruckItemsArgs = {
  searchText: Scalars['String'],
  transferLocation: Scalars['String'],
  locationCode: Scalars['String'],
};

export type CategoryItemClass = {
   __typename?: 'CategoryItemClass',
  itemClass?: Maybe<Scalars['String']>,
  itemClassDescription?: Maybe<Scalars['String']>,
  category: Scalars['String'],
};

export type CategoryItemClassGroup = {
   __typename?: 'CategoryItemClassGroup',
  category: Scalars['String'],
  itemClasses?: Maybe<Array<CategoryItemClass>>,
};

export type CategoryItemClassGrouped = {
   __typename?: 'CategoryItemClassGrouped',
  groups?: Maybe<Array<CategoryItemClassGroup>>,
};

export type ChangePasswordInput = {
  Password: Scalars['String'],
  token: Scalars['String'],
};

export type CustomerData = {
   __typename?: 'CustomerData',
  Customer_Number: Scalars['String'],
  Customer_Name: Scalars['String'],
  Customer_Class: Scalars['String'],
  Salesperson: Scalars['String'],
  Customer_Service: Scalars['String'],
  Bank_Account: Scalars['String'],
  Freight_Percent: Scalars['String'],
  Delivery_Instructions: Scalars['String'],
  Special_Instructions: Scalars['String'],
  Price_Level: Scalars['String'],
  Payment_Terms: Scalars['String'],
  Bill_To_Address: Scalars['String'],
  Ship_To_Address: Scalars['String'],
  Shipping_Method: Scalars['String'],
  PHONE_1: Scalars['String'],
  PHONE_2: Scalars['String'],
  PHONE_3: Scalars['String'],
  SHIPCOMPLETE: Scalars['Int'],
  INACTIVE: Scalars['Int'],
  Key_Account: Scalars['String'],
  Freight_Minimum: Scalars['Float'],
  Pallets_Required: Scalars['String'],
  Barcodes_Required: Scalars['String'],
  Custom_Shipping_Documents: Scalars['String'],
  Status_Level: Scalars['String'],
  Delivery_Notice_Hours: Scalars['String'],
  EDI_Setup: Scalars['String'],
  Alternative_Warehouse_Shipment: Scalars['String'],
  Ship_Incomplete_Collections: Scalars['String'],
  Truckload_Only: Scalars['String'],
  TruckloadPercent: Scalars['Float'],
  HalfTruckloadPercent: Scalars['Float'],
  LTLPercent: Scalars['Float'],
  Website_User: Scalars['String'],
  Domain_Name_1: Scalars['String'],
  Domain_Name_2: Scalars['String'],
  Domain_Name_3: Scalars['String'],
  Domain_Name_4: Scalars['String'],
  Domain_Name_5: Scalars['String'],
  iPad_PRCLEVEL: Scalars['String'],
  Report_ID: Scalars['String'],
  LFI_Username: Scalars['String'],
  LFI_Password: Scalars['String'],
  Web_Email: Scalars['String'],
  FTP_Site: Scalars['String'],
  Phone4: Scalars['String'],
  Phone5: Scalars['String'],
  Phone6: Scalars['String'],
  Phone7: Scalars['String'],
  Phone8: Scalars['String'],
  Phone9: Scalars['String'],
  Phone10: Scalars['String'],
  Phone11: Scalars['String'],
  Phone12: Scalars['String'],
  Phone13: Scalars['String'],
  Phone14: Scalars['String'],
  Phone15: Scalars['String'],
  Phone16: Scalars['String'],
  Phone17: Scalars['String'],
  Phone18: Scalars['String'],
  Phone19: Scalars['String'],
  Phone20: Scalars['String'],
  Phone21: Scalars['String'],
  Phone22: Scalars['String'],
  Phone23: Scalars['String'],
  Phone24: Scalars['String'],
  Phone26: Scalars['String'],
  Phone27: Scalars['String'],
  Phone28: Scalars['String'],
  Phone29: Scalars['String'],
  Phone30: Scalars['String'],
  Return_Allowance: Scalars['Float'],
  Return_Apply_Method: Scalars['String'],
  Advertising_Allowance: Scalars['Float'],
  Advertising_Apply_Method: Scalars['String'],
  Credits_Not_Authorized: Scalars['String'],
  Floor_Sample_Discount: Scalars['Float'],
  SOP_Document: Scalars['String'],
  Notes: Scalars['String'],
  LFI_Financing: Scalars['String'],
  Credit_Limit: Scalars['Float'],
  Credit_Application: Scalars['String'],
  CITY: Scalars['String'],
  STATE: Scalars['String'],
  ZIP: Scalars['String'],
  HOLD: Scalars['Int'],
  AltPaymentTerms: Scalars['String'],
  Visitor_Group: Scalars['String'],
  Buying_Group: Scalars['String'],
  CRLMTPER: Scalars['Int'],
  Trade_Discount: Scalars['Int'],
};


export type FindCustomerTableResult = {
   __typename?: 'FindCustomerTableResult',
  customers: Array<CustomerData>,
  totalRows: Scalars['Float'],
};

export type FindItemClassTableResult = {
   __typename?: 'FindItemClassTableResult',
  itemClasses: Array<ItemDataReporting>,
  totalRows: Scalars['Float'],
};

export type FindKitItemResult = {
   __typename?: 'FindKitItemResult',
  kitItems: Array<ItemKitDetail>,
  totalRows: Scalars['Float'],
};

export type FindTruckItemsArgs = {
  searchText: Scalars['String'],
  transferLocation: Scalars['String'],
  locationCode: Scalars['String'],
  searchWhere: Scalars['String'],
};

export type GetUserWithRoles = {
   __typename?: 'GetUserWithRoles',
  id: Scalars['Int'],
  vendorId?: Maybe<Scalars['Int']>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String'],
  active: Scalars['Boolean'],
  alertProductAdded?: Maybe<Scalars['Boolean']>,
  alertProductDiscontinued?: Maybe<Scalars['Boolean']>,
  alertProductUpdated?: Maybe<Scalars['Boolean']>,
  alertEmail?: Maybe<Scalars['String']>,
  created?: Maybe<Scalars['DateTime']>,
  modified?: Maybe<Scalars['DateTime']>,
  vendor?: Maybe<Vendor>,
  userRoles: Array<Scalars['String']>,
};

export type InTransitWithCubes = {
   __typename?: 'InTransitWithCubes',
  OrderDocumentId: Scalars['String'],
  ItemNumber: Scalars['String'],
  Status: Scalars['Int'],
  OrderDate: Scalars['DateTime'],
  CustomerName: Scalars['String'],
  Address1: Scalars['String'],
  Address2: Scalars['String'],
  City: Scalars['String'],
  State: Scalars['String'],
  ZipCode: Scalars['String'],
  ShipMethod: Scalars['String'],
  TransferLocation: Scalars['String'],
  ItemLocation: Scalars['String'],
  LocationCode: Scalars['String'],
  Description: Scalars['String'],
  UOFM: Scalars['String'],
  TransferQuantity: Scalars['Float'],
  QuantityFulfilled: Scalars['Float'],
  QuantityShipped: Scalars['Float'],
  QuantityToReceive: Scalars['Float'],
  QuantityReceived: Scalars['Float'],
  Cartons?: Maybe<Scalars['Float']>,
  EpCubes?: Maybe<Scalars['Float']>,
  CubesExtended?: Maybe<Scalars['Float']>,
  SopNumber: Scalars['String'],
  SopDocDate?: Maybe<Scalars['DateTime']>,
  LNITMSEQ: Scalars['Int'],
};

export type ItemClassData = {
   __typename?: 'ItemClassData',
  itemClass: Scalars['String'],
  itemClassDescription?: Maybe<Scalars['String']>,
  category?: Maybe<Scalars['String']>,
  Feature_1?: Maybe<Scalars['String']>,
  Feature_2?: Maybe<Scalars['String']>,
  Feature_3?: Maybe<Scalars['String']>,
  Feature_4?: Maybe<Scalars['String']>,
  Feature_5?: Maybe<Scalars['String']>,
  Feature_6?: Maybe<Scalars['String']>,
  Feature_7?: Maybe<Scalars['String']>,
  Feature_8?: Maybe<Scalars['String']>,
  Feature_9?: Maybe<Scalars['String']>,
  Feature_10?: Maybe<Scalars['String']>,
  Feature_11?: Maybe<Scalars['String']>,
  Feature_12?: Maybe<Scalars['String']>,
  Feature_13?: Maybe<Scalars['String']>,
  Feature_14?: Maybe<Scalars['String']>,
  Feature_15?: Maybe<Scalars['String']>,
};

export type ItemClassWithDescription = {
   __typename?: 'ItemClassWithDescription',
  id: Scalars['Int'],
  itemClass: Scalars['String'],
  itemClassDescription: Scalars['String'],
};

export type ItemClassWithDescriptionInput = {
  id: Scalars['Int'],
  itemClass: Scalars['String'],
  itemClassDescription: Scalars['String'],
};

export type ItemDataReporting = {
   __typename?: 'ItemDataReporting',
  itemNumber: Scalars['String'],
  itemClass: Scalars['String'],
  itemClassDescription: Scalars['String'],
  itemDescription: Scalars['String'],
  ITMSHNAM: Scalars['String'],
  EPCUBES: Scalars['Float'],
  BoxW: Scalars['Float'],
  BoxD: Scalars['Float'],
  BoxH: Scalars['Float'],
  W: Scalars['Float'],
  D: Scalars['Float'],
  H: Scalars['Float'],
  Cartons: Scalars['Float'],
  Weight: Scalars['String'],
  DROPSHIP?: Maybe<Scalars['Float']>,
  DROPSHIP_M?: Maybe<Scalars['Float']>,
  FOB?: Maybe<Scalars['Float']>,
  LEVEL1?: Maybe<Scalars['Float']>,
  LEVEL0?: Maybe<Scalars['Float']>,
  FOB_M?: Maybe<Scalars['Float']>,
  LEVEL2?: Maybe<Scalars['Float']>,
  LEVEL3?: Maybe<Scalars['Float']>,
  DISC?: Maybe<Scalars['Float']>,
  Factory: Scalars['String'],
  Origin: Scalars['String'],
  Status: Scalars['String'],
  Category: Scalars['String'],
  ITEMTYPE: Scalars['Int'],
  Web_Exclude: Scalars['String'],
  Wood: Scalars['String'],
  Finish: Scalars['String'],
  Item_Style: Scalars['String'],
  Publish_to_Web: Scalars['String'],
  F1: Scalars['String'],
  F2: Scalars['String'],
  F3: Scalars['String'],
  F4: Scalars['String'],
  F5: Scalars['String'],
  F6: Scalars['String'],
  F7: Scalars['String'],
  F8: Scalars['String'],
  F9: Scalars['String'],
  F10: Scalars['String'],
  F11: Scalars['String'],
  F12: Scalars['String'],
  F13: Scalars['String'],
  F14: Scalars['String'],
  F15: Scalars['String'],
  Feature_1: Scalars['String'],
  Feature_2: Scalars['String'],
  Feature_3: Scalars['String'],
  Feature_4: Scalars['String'],
  Feature_5: Scalars['String'],
  Feature_6: Scalars['String'],
  Feature_7: Scalars['String'],
  Feature_8: Scalars['String'],
  Sort_ID: Scalars['String'],
  Sales_Image_1: Scalars['String'],
  Sales_Image_2: Scalars['String'],
  Sales_Image_4: Scalars['String'],
  Sales_Image_5: Scalars['String'],
  Sales_Image_6: Scalars['String'],
  Sales_Feature_2: Scalars['String'],
  Sales_Feature_4: Scalars['String'],
  Sales_Feature_3: Scalars['String'],
  Sales_Feature_5: Scalars['String'],
  Sales_Feature_6: Scalars['String'],
  ITEM_CLASS_STATUS: Scalars['String'],
  Full_Item_Class_Name: Scalars['String'],
  dimensions: Scalars['String'],
  Item_Image_1: Scalars['String'],
  Item_Image_2: Scalars['String'],
  Item_Image_3: Scalars['String'],
  EPKDCUBES: Scalars['Float'],
  Freight_Class: Scalars['Int'],
  Group_Path: Scalars['String'],
  Factory_Assembled: Scalars['String'],
  Product_Path: Scalars['String'],
  Short_Group_Path: Scalars['String'],
  Assembly_Cost: Scalars['Float'],
  QC_Cost: Scalars['Float'],
  Designer_Commission: Scalars['Float'],
  UPC_Code: Scalars['String'],
  Agent: Scalars['String'],
  Finish_Category: Scalars['String'],
  SmallParcel: Scalars['String'],
  Item_Cost_DC: Scalars['Float'],
  Item_Cost_WHSE: Scalars['Float'],
  Direct_Container: Scalars['String'],
  cubes: Scalars['Float'],
  Sales_Image_3: Scalars['String'],
  Ipad_Sort_ID: Scalars['String'],
  ABCCODE: Scalars['Int'],
  iPad_Best_Seller: Scalars['String'],
  Web_Image: Scalars['String'],
  Intro_Market: Scalars['DateTime'],
  Market_Write_Up: Scalars['String'],
  Best_Seller: Scalars['String'],
  US_Tariff_Code: Scalars['String'],
  STNDCOST: Scalars['Float'],
  Sales_Feature_1: Scalars['String'],
  SPECIAL: Scalars['Float'],
  Key_Item: Scalars['String'],
  Box_Dimension_Combined: Scalars['String'],
  DROPSHIP_X: Scalars['Float'],
  MIX_FULL: Scalars['Float'],
  MIX_HALF: Scalars['Float'],
  MIX_QTR: Scalars['Float'],
  Story: Scalars['String'],
  ALWBKORD: Scalars['String'],
  CSNS01: Scalars['Float'],
  FOB_IOR: Scalars['Float'],
  FOB_M_IOR: Scalars['Float'],
  Related_Items: Scalars['String'],
};

export type ItemDataTableResult = {
   __typename?: 'ItemDataTableResult',
  items: Array<ItemDataReporting>,
  totalRows: Scalars['Float'],
};

export type ItemKitDetail = {
   __typename?: 'ItemKitDetail',
  kitItem: Scalars['String'],
  itemNumber: Scalars['String'],
  itemDescription: Scalars['String'],
  kitQuantity: Scalars['Float'],
  kitName?: Maybe<Scalars['String']>,
  cubes?: Maybe<Scalars['Float']>,
  DROPSHIP_M?: Maybe<Scalars['Float']>,
  DROPSHIP?: Maybe<Scalars['Float']>,
  FOB?: Maybe<Scalars['Float']>,
  FOB_M?: Maybe<Scalars['Float']>,
  LEVEL0?: Maybe<Scalars['Float']>,
  LEVEL1?: Maybe<Scalars['Float']>,
  LEVEL2?: Maybe<Scalars['Float']>,
  LEVEL3?: Maybe<Scalars['Float']>,
  itemClass: Scalars['String'],
  FEATURE_1?: Maybe<Scalars['String']>,
  FEATURE_2?: Maybe<Scalars['String']>,
  FEATURE_3?: Maybe<Scalars['String']>,
  FEATURE_4?: Maybe<Scalars['String']>,
  FEATURE_5?: Maybe<Scalars['String']>,
  FEATURE_6?: Maybe<Scalars['String']>,
  FEATURE_7?: Maybe<Scalars['String']>,
  FEATURE_8?: Maybe<Scalars['String']>,
  dimensions?: Maybe<Scalars['String']>,
  MIX_QTR?: Maybe<Scalars['Float']>,
  MIX_HALF?: Maybe<Scalars['Float']>,
  MIX_FULL?: Maybe<Scalars['Float']>,
  DROPSHIP_X?: Maybe<Scalars['Float']>,
};

export type ItemKitGrouping = {
   __typename?: 'ItemKitGrouping',
  kitItem: Scalars['String'],
  kitDescription: Scalars['String'],
  kitQuantity: Scalars['Float'],
  cubes?: Maybe<Scalars['Float']>,
  DROPSHIP_M?: Maybe<Scalars['Float']>,
  DROPSHIP?: Maybe<Scalars['Float']>,
  FOB?: Maybe<Scalars['Float']>,
  FOB_M?: Maybe<Scalars['Float']>,
  LEVEL0?: Maybe<Scalars['Float']>,
  LEVEL1?: Maybe<Scalars['Float']>,
  LEVEL2?: Maybe<Scalars['Float']>,
  LEVEL3?: Maybe<Scalars['Float']>,
  ITMCLSCD: Scalars['String'],
  MIX_QTR?: Maybe<Scalars['Float']>,
  MIX_HALF?: Maybe<Scalars['Float']>,
  MIX_FULL?: Maybe<Scalars['Float']>,
  DROPSHIP_X?: Maybe<Scalars['Float']>,
};

export type ItemPriceListDataGroupingsWithKings = {
   __typename?: 'ItemPriceListDataGroupingsWithKings',
  ITEMNMBR?: Maybe<Scalars['String']>,
  ITMCLSCD?: Maybe<Scalars['String']>,
  ITMCLSDC?: Maybe<Scalars['String']>,
  ITEMDESC?: Maybe<Scalars['String']>,
  Cubes: Scalars['Float'],
  EPCUBES: Scalars['Float'],
  EPKDCUBES: Scalars['Float'],
  W: Scalars['Float'],
  D: Scalars['Float'],
  H: Scalars['Float'],
  Cartons: Scalars['Float'],
  Weight: Scalars['Int'],
  DROPSHIP?: Maybe<Scalars['String']>,
  DROPSHIP_M?: Maybe<Scalars['String']>,
  FOB?: Maybe<Scalars['String']>,
  FOB_M?: Maybe<Scalars['String']>,
  LEVEL1?: Maybe<Scalars['String']>,
  LEVEL0?: Maybe<Scalars['String']>,
  LEVEL2?: Maybe<Scalars['String']>,
  LEVEL3?: Maybe<Scalars['String']>,
  DISC?: Maybe<Scalars['String']>,
  Category?: Maybe<Scalars['String']>,
  ITEMTYPE: Scalars['Int'],
  Ipad_Sort_ID?: Maybe<Scalars['String']>,
  Item_Cost_WHSE?: Maybe<Scalars['String']>,
  Item_Cost_DC?: Maybe<Scalars['String']>,
  Sort_Key?: Maybe<Scalars['String']>,
  Sort_ID?: Maybe<Scalars['String']>,
  DROPSHIP_X?: Maybe<Scalars['Float']>,
  CSNS01?: Maybe<Scalars['Float']>,
};

export type KitItemDetailsResult = {
   __typename?: 'KitItemDetailsResult',
  kitItem: Scalars['String'],
  kitItems: Array<ItemKitDetail>,
};

export type KitItemInput = {
  id?: Maybe<Scalars['Int']>,
  kitName?: Maybe<Scalars['String']>,
  kitItem: Scalars['String'],
  kitQuantity: Scalars['Int'],
  itemNumber: Scalars['String'],
  itemDescription?: Maybe<Scalars['String']>,
  cubes: Scalars['Float'],
  dimensions?: Maybe<Scalars['String']>,
  DROPSHIP?: Maybe<Scalars['Float']>,
  DROPSHIP_Original?: Maybe<Scalars['Float']>,
  DROPSHIP_CustomPricing?: Maybe<Scalars['Int']>,
  DROPSHIP_M?: Maybe<Scalars['Float']>,
  DROPSHIP_M_Original?: Maybe<Scalars['Float']>,
  DROPSHIP_M_CustomPricing?: Maybe<Scalars['Int']>,
  DROPSHIP_X?: Maybe<Scalars['Float']>,
  DROPSHIP_X_Original?: Maybe<Scalars['Float']>,
  DROPSHIP_X_CustomPricing?: Maybe<Scalars['Int']>,
  FOB?: Maybe<Scalars['Float']>,
  FOB_Original?: Maybe<Scalars['Float']>,
  FOB_CustomPricing?: Maybe<Scalars['Int']>,
  FOB_M?: Maybe<Scalars['Float']>,
  FOB_M_Original?: Maybe<Scalars['Float']>,
  FOB_M_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL0?: Maybe<Scalars['Float']>,
  LEVEL0_Original?: Maybe<Scalars['Float']>,
  LEVEL0_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL1?: Maybe<Scalars['Float']>,
  LEVEL1_Original?: Maybe<Scalars['Float']>,
  LEVEL1_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL2?: Maybe<Scalars['Float']>,
  LEVEL2_Original?: Maybe<Scalars['Float']>,
  LEVEL2_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL3?: Maybe<Scalars['Float']>,
  LEVEL3_Original?: Maybe<Scalars['Float']>,
  LEVEL3_CustomPricing?: Maybe<Scalars['Int']>,
  MIX_FULL?: Maybe<Scalars['Float']>,
  MIX_FULL_Original?: Maybe<Scalars['Float']>,
  MIX_FULL_CustomPricing?: Maybe<Scalars['Int']>,
  MIX_HALF?: Maybe<Scalars['Float']>,
  MIX_HALF_Original?: Maybe<Scalars['Float']>,
  MIX_HALF_CustomPricing?: Maybe<Scalars['Int']>,
  MIX_QTR?: Maybe<Scalars['Float']>,
  MIX_QTR_Original?: Maybe<Scalars['Float']>,
  MIX_QTR_CustomPricing?: Maybe<Scalars['Int']>,
};

export type KitItemsResult = {
   __typename?: 'KitItemsResult',
  kitItem: Scalars['String'],
  displayOrder: Scalars['Int'],
  kitItems: Array<SalesPresentationItemClassKit>,
};

export type KitsInput = {
  kitItem: Scalars['String'],
  displayOrder: Scalars['Int'],
  kitItems: Array<KitItemInput>,
};

export type LoginResponse = {
   __typename?: 'LoginResponse',
  user: LoginResponseUser,
  token: Scalars['String'],
};

export type LoginResponseUser = {
   __typename?: 'LoginResponseUser',
  id: Scalars['Int'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  userRoles: Array<Scalars['String']>,
};

export type MasterGroupInput = {
  displayOrder: Scalars['Int'],
  kitItem: Scalars['String'],
  kitDescription?: Maybe<Scalars['String']>,
  cubes: Scalars['Float'],
  DROPSHIP?: Maybe<Scalars['Float']>,
  DROPSHIP_Original?: Maybe<Scalars['Float']>,
  DROPSHIP_CustomPricing?: Maybe<Scalars['Int']>,
  DROPSHIP_M?: Maybe<Scalars['Float']>,
  DROPSHIP_M_Original?: Maybe<Scalars['Float']>,
  DROPSHIP_M_CustomPricing?: Maybe<Scalars['Int']>,
  DROPSHIP_X?: Maybe<Scalars['Float']>,
  DROPSHIP_X_Original?: Maybe<Scalars['Float']>,
  DROPSHIP_X_CustomPricing?: Maybe<Scalars['Int']>,
  FOB?: Maybe<Scalars['Float']>,
  FOB_Original?: Maybe<Scalars['Float']>,
  FOB_CustomPricing?: Maybe<Scalars['Int']>,
  FOB_M?: Maybe<Scalars['Float']>,
  FOB_M_Original?: Maybe<Scalars['Float']>,
  FOB_M_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL0?: Maybe<Scalars['Float']>,
  LEVEL0_Original?: Maybe<Scalars['Float']>,
  LEVEL0_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL1?: Maybe<Scalars['Float']>,
  LEVEL1_Original?: Maybe<Scalars['Float']>,
  LEVEL1_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL2?: Maybe<Scalars['Float']>,
  LEVEL2_Original?: Maybe<Scalars['Float']>,
  LEVEL2_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL3?: Maybe<Scalars['Float']>,
  LEVEL3_Original?: Maybe<Scalars['Float']>,
  LEVEL3_CustomPricing?: Maybe<Scalars['Int']>,
  MIX_FULL?: Maybe<Scalars['Float']>,
  MIX_FULL_Original?: Maybe<Scalars['Float']>,
  MIX_FULL_CustomPricing?: Maybe<Scalars['Int']>,
  MIX_HALF?: Maybe<Scalars['Float']>,
  MIX_HALF_Original?: Maybe<Scalars['Float']>,
  MIX_HALF_CustomPricing?: Maybe<Scalars['Int']>,
  MIX_QTR?: Maybe<Scalars['Float']>,
  MIX_QTR_Original?: Maybe<Scalars['Float']>,
  MIX_QTR_CustomPricing?: Maybe<Scalars['Int']>,
};

export type MeUser = {
   __typename?: 'MeUser',
  id: Scalars['Int'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  userRoles: Array<Scalars['String']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  changePassword?: Maybe<User>,
  confirmUser: Scalars['Boolean'],
  saveUser: User,
  forgotPassword: Scalars['Boolean'],
  login?: Maybe<LoginResponse>,
  saveUserJob: UserJob,
  deleteUserJob: Scalars['Boolean'],
  getProductDataByCategoryFileUrl: UrlResponse,
  getProductDataZipUrl: UrlResponse,
  saveUserJobDownloadLink: UserJobDownloadLink,
  deleteUserJobDownloadLinkByUserJobId: Scalars['Boolean'],
  logout: Scalars['Boolean'],
  register: User,
  saveVendor: Vendor,
  deleteVendor: Scalars['Boolean'],
  deleteUser: Scalars['Boolean'],
  deleteVendorCategory: Scalars['Boolean'],
  deleteVendorCategoryItemClass: Scalars['Boolean'],
  reprintLabels: SuccessMessageResponse,
  cancelShipment: SuccessMessageResponse,
  transferShipmentLocation: SuccessMessageResponse,
  saveSalesPresentation: SalesPresentation,
  saveItemNumbers: SalesPresentation,
  saveItemClassImages: PresentationSaveImagesResponse,
  saveStep2: SalesPresentation,
  deletePresentation: SuccessMessageResponse,
  findKitItems: Array<ItemKitDetail>,
  findCustomer: FindCustomerTableResult,
  findItemClass: ItemClassWithDescription,
  findItemNumber: ItemDataReporting,
  findGroupItem: SalesPresentationItemClassGroup,
  findTruckItems: TruckItems,
  addTruckItems: TruckItems,
  updateQuantityStockItemsTruck: UpdateQuantityResponse,
  transferItems: Scalars['Boolean'],
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput
};


export type MutationConfirmUserArgs = {
  token: Scalars['String']
};


export type MutationSaveUserArgs = {
  data: UserInput
};


export type MutationForgotPasswordArgs = {
  Email: Scalars['String']
};


export type MutationLoginArgs = {
  password: Scalars['String'],
  email: Scalars['String']
};


export type MutationSaveUserJobArgs = {
  data: UserJobInput
};


export type MutationDeleteUserJobArgs = {
  id: Scalars['Int']
};


export type MutationGetProductDataByCategoryFileUrlArgs = {
  category: Scalars['String']
};


export type MutationSaveUserJobDownloadLinkArgs = {
  data: UserJobDownloadLinkInput
};


export type MutationDeleteUserJobDownloadLinkByUserJobIdArgs = {
  id: Scalars['Int']
};


export type MutationRegisterArgs = {
  data: UserInput
};


export type MutationSaveVendorArgs = {
  data: VendorInput
};


export type MutationDeleteVendorArgs = {
  id: Scalars['Int']
};


export type MutationDeleteUserArgs = {
  Id: Scalars['Int']
};


export type MutationDeleteVendorCategoryArgs = {
  id: Scalars['Int']
};


export type MutationDeleteVendorCategoryItemClassArgs = {
  id: Scalars['Int']
};


export type MutationReprintLabelsArgs = {
  sopNumber: Scalars['String']
};


export type MutationCancelShipmentArgs = {
  sopNumber: Scalars['String']
};


export type MutationTransferShipmentLocationArgs = {
  SopNumber: Scalars['String'],
  NewLocation: Scalars['String'],
  ForceUpdate?: Maybe<Scalars['Boolean']>,
  UpdateReadyDate?: Maybe<Scalars['Boolean']>
};


export type MutationSaveSalesPresentationArgs = {
  data: SalesPresentationInput
};


export type MutationSaveItemNumbersArgs = {
  data: SaveItemNumbersInput
};


export type MutationSaveItemClassImagesArgs = {
  data: SalesPresentationItemClassImageInput
};


export type MutationSaveStep2Args = {
  data: SalesPresentationStep2Input
};


export type MutationDeletePresentationArgs = {
  id: Scalars['Int']
};


export type MutationFindKitItemsArgs = {
  itemClass: Scalars['String'],
  searchText: Scalars['String']
};


export type MutationFindCustomerArgs = {
  searchText: Scalars['String']
};


export type MutationFindItemClassArgs = {
  searchText: Scalars['String']
};


export type MutationFindItemNumberArgs = {
  itemClass: Scalars['String'],
  searchText: Scalars['String']
};


export type MutationFindGroupItemArgs = {
  itemClass: Scalars['String'],
  searchText: Scalars['String']
};


export type MutationFindTruckItemsArgs = {
  data: FindTruckItemsArgs
};


export type MutationAddTruckItemsArgs = {
  data: AddTruckItemsArgs
};


export type MutationUpdateQuantityStockItemsTruckArgs = {
  args: UpdateQuantityArgs
};


export type MutationTransferItemsArgs = {
  args: TransferFromArgs
};

export type OpenOrderData = {
   __typename?: 'OpenOrderData',
  SOPTYPE?: Maybe<Scalars['Float']>,
  SOPNUMBE?: Maybe<Scalars['String']>,
  CUSTCLAS?: Maybe<Scalars['String']>,
  CUSTNMBR?: Maybe<Scalars['String']>,
  CUSTNAME?: Maybe<Scalars['String']>,
  DOCDATE?: Maybe<Scalars['DateTime']>,
  ORIGNUMB?: Maybe<Scalars['String']>,
  CSTPONBR?: Maybe<Scalars['String']>,
  ADD_PO?: Maybe<Scalars['String']>,
  DOCID?: Maybe<Scalars['String']>,
  CRD?: Maybe<Scalars['DateTime']>,
  ESD?: Maybe<Scalars['DateTime']>,
  Org_Date?: Maybe<Scalars['DateTime']>,
  Terms?: Maybe<Scalars['String']>,
  PRCLEVEL?: Maybe<Scalars['String']>,
  LOCNCODE?: Maybe<Scalars['String']>,
  Order_LOCNCODE?: Maybe<Scalars['String']>,
  BILLTO_ID?: Maybe<Scalars['String']>,
  SHIPTO_ID?: Maybe<Scalars['String']>,
  ShipToName?: Maybe<Scalars['String']>,
  ADDRESS1?: Maybe<Scalars['String']>,
  ADDRESS2?: Maybe<Scalars['String']>,
  CITY?: Maybe<Scalars['String']>,
  STATE?: Maybe<Scalars['String']>,
  ZIPCODE?: Maybe<Scalars['String']>,
  ADDRESS3?: Maybe<Scalars['String']>,
  CNTCPRSN?: Maybe<Scalars['String']>,
  PHNUMBR1?: Maybe<Scalars['String']>,
  Fax?: Maybe<Scalars['String']>,
  COUNTRY?: Maybe<Scalars['String']>,
  Shipping_Method?: Maybe<Scalars['String']>,
  TRDISAMT?: Maybe<Scalars['Float']>,
  SUBTOTAL?: Maybe<Scalars['Float']>,
  REMSUBTO?: Maybe<Scalars['Float']>,
  FRTAMNT?: Maybe<Scalars['Float']>,
  MISCAMNT?: Maybe<Scalars['Float']>,
  DOCAMNT?: Maybe<Scalars['Float']>,
  SLPRSNID?: Maybe<Scalars['String']>,
  Bank_Trans_Date?: Maybe<Scalars['String']>,
  Bank_Approval_Date?: Maybe<Scalars['String']>,
  Ack_Status?: Maybe<Scalars['String']>,
  Freight_Percent?: Maybe<Scalars['String']>,
  Freight_Method?: Maybe<Scalars['String']>,
  Bank_Ref?: Maybe<Scalars['String']>,
  Approval_Status?: Maybe<Scalars['String']>,
  PO_Number?: Maybe<Scalars['String']>,
  Customer_Tag?: Maybe<Scalars['String']>,
  Container_ID?: Maybe<Scalars['String']>,
  Order_Status?: Maybe<Scalars['String']>,
  COMMENT_2?: Maybe<Scalars['String']>,
  COMMENT_3?: Maybe<Scalars['String']>,
  COMMENT_4?: Maybe<Scalars['String']>,
  CMMTTEXT?: Maybe<Scalars['String']>,
  BACHNUMB?: Maybe<Scalars['String']>,
  COMMNTID?: Maybe<Scalars['String']>,
  LNITMSEQ?: Maybe<Scalars['Float']>,
  CMPNTSEQ?: Maybe<Scalars['Float']>,
  ITMCLSCD?: Maybe<Scalars['String']>,
  ITEMNMBR?: Maybe<Scalars['String']>,
  ITEMDESC?: Maybe<Scalars['String']>,
  UNITPRCE?: Maybe<Scalars['Float']>,
  XTNDPRCE?: Maybe<Scalars['Float']>,
  QTY?: Maybe<Scalars['Float']>,
  QTY_ALLOCATED?: Maybe<Scalars['Float']>,
  QTY_BO?: Maybe<Scalars['Float']>,
  Cubes?: Maybe<Scalars['Float']>,
  EP_Carton?: Maybe<Scalars['Float']>,
  EP_FREIGHTCLASS?: Maybe<Scalars['Float']>,
  Ext_Carton?: Maybe<Scalars['Float']>,
  Ext_Cubes?: Maybe<Scalars['Float']>,
  Ext_Weight?: Maybe<Scalars['Float']>,
  TIMESPRT?: Maybe<Scalars['Float']>,
  RETUDATE?: Maybe<Scalars['String']>,
  ORDRDATE?: Maybe<Scalars['String']>,
  USER2ENT?: Maybe<Scalars['String']>,
  USERDEF2?: Maybe<Scalars['String']>,
  USERDEF1?: Maybe<Scalars['String']>,
  COMMENT1?: Maybe<Scalars['String']>,
  COMMENT2?: Maybe<Scalars['String']>,
  DATE1?: Maybe<Scalars['String']>,
  TIME1?: Maybe<Scalars['String']>,
  Line_Item_Comment?: Maybe<Scalars['String']>,
  MSTRNUMB?: Maybe<Scalars['Float']>,
  ITEMTYPE?: Maybe<Scalars['Float']>,
  Customer_Comments?: Maybe<Scalars['String']>,
  QTYTOINV?: Maybe<Scalars['Float']>,
  PHONE1?: Maybe<Scalars['String']>,
  EXT_CARTON_wo_KITS?: Maybe<Scalars['Float']>,
  EXT_CUBES_wo_KITS?: Maybe<Scalars['Float']>,
  EXT_WEIGHT_wo_KITS?: Maybe<Scalars['Float']>,
  Freight_Class?: Maybe<Scalars['Float']>,
  Status?: Maybe<Scalars['String']>,
  Category?: Maybe<Scalars['String']>,
  Tracking_Number?: Maybe<Scalars['String']>,
  VOIDSTTS?: Maybe<Scalars['Float']>,
  Web_Order_Number?: Maybe<Scalars['String']>,
  Service_Level_Code?: Maybe<Scalars['String']>,
  EPBOXWIDTH?: Maybe<Scalars['Float']>,
  EPBOXHEIGHT?: Maybe<Scalars['Float']>,
  EPBOXDEPTH?: Maybe<Scalars['Float']>,
  Weight?: Maybe<Scalars['Int']>,
};

export type PasswordInput = {
  Password: Scalars['String'],
};

export type PresentationAndProductData = {
   __typename?: 'PresentationAndProductData',
  presentation: SalesPresentation,
  itemClass: SalesPresentationItemClass,
  itemClassIndex: Scalars['Int'],
  productData: Array<ProductData>,
  presentationImages: Array<SalesPresentationItemClassImageItem>,
};

export type PresentationPdfItemClass = {
   __typename?: 'PresentationPdfItemClass',
  itemClass: SalesPresentationItemClass,
  itemClassFeatures: ItemClassData,
  itemClassKits?: Maybe<Array<SalesPresentationPdfKitRows>>,
  itemClassItemNumbers?: Maybe<Array<SalesPresentationPdfRows>>,
  itemClassGroups?: Maybe<Array<SalesPresentationPdfRows>>,
  itemClassImages?: Maybe<Array<SalesPresentationItemClassImageItem>>,
};

export type PresentationSaveImagesResponse = {
   __typename?: 'PresentationSaveImagesResponse',
  presentation: SalesPresentation,
  itemClass?: Maybe<SalesPresentationItemClass>,
  itemClassIndex: Scalars['Int'],
};

export type ProductData = {
   __typename?: 'ProductData',
  Item_Number?: Maybe<Scalars['String']>,
  Item_Class?: Maybe<Scalars['String']>,
  Item_Class_Description?: Maybe<Scalars['String']>,
  Item_Description?: Maybe<Scalars['String']>,
  Box_Width: Scalars['Float'],
  Box_Depth: Scalars['Float'],
  Box_Height: Scalars['Float'],
  Width: Scalars['Float'],
  Depth: Scalars['Float'],
  Height: Scalars['Float'],
  Cartons: Scalars['Float'],
  Weight?: Maybe<Scalars['Float']>,
  Origin?: Maybe<Scalars['String']>,
  Status?: Maybe<Scalars['String']>,
  Category?: Maybe<Scalars['String']>,
  Web_Exclude?: Maybe<Scalars['String']>,
  Wood?: Maybe<Scalars['String']>,
  Finish?: Maybe<Scalars['String']>,
  Item_Style?: Maybe<Scalars['String']>,
  Publish_To_Web?: Maybe<Scalars['String']>,
  F1?: Maybe<Scalars['String']>,
  F2?: Maybe<Scalars['String']>,
  F3?: Maybe<Scalars['String']>,
  F4?: Maybe<Scalars['String']>,
  F5?: Maybe<Scalars['String']>,
  F6?: Maybe<Scalars['String']>,
  F7?: Maybe<Scalars['String']>,
  F8?: Maybe<Scalars['String']>,
  F9?: Maybe<Scalars['String']>,
  F10?: Maybe<Scalars['String']>,
  F11?: Maybe<Scalars['String']>,
  F12?: Maybe<Scalars['String']>,
  F13?: Maybe<Scalars['String']>,
  F14?: Maybe<Scalars['String']>,
  F15?: Maybe<Scalars['String']>,
  Feature_1?: Maybe<Scalars['String']>,
  Feature_2?: Maybe<Scalars['String']>,
  Feature_3?: Maybe<Scalars['String']>,
  Feature_4?: Maybe<Scalars['String']>,
  Feature_5?: Maybe<Scalars['String']>,
  Feature_6?: Maybe<Scalars['String']>,
  Feature_7?: Maybe<Scalars['String']>,
  Feature_8?: Maybe<Scalars['String']>,
  Item_Class_Status?: Maybe<Scalars['String']>,
  Full_Item_Class_Name?: Maybe<Scalars['String']>,
  Combined_Dimensions?: Maybe<Scalars['String']>,
  UPC_Code?: Maybe<Scalars['String']>,
  Finish_Category?: Maybe<Scalars['String']>,
  Small_Parcel?: Maybe<Scalars['String']>,
  Box_Dimension_Combined?: Maybe<Scalars['String']>,
  Story?: Maybe<Scalars['String']>,
  Image_1?: Maybe<Scalars['String']>,
  Image_2?: Maybe<Scalars['String']>,
  Image_3?: Maybe<Scalars['String']>,
  Image_4?: Maybe<Scalars['String']>,
  Image_5?: Maybe<Scalars['String']>,
  Image_6?: Maybe<Scalars['String']>,
  Image_7?: Maybe<Scalars['String']>,
  Image_8?: Maybe<Scalars['String']>,
  Image_9?: Maybe<Scalars['String']>,
  Image_10?: Maybe<Scalars['String']>,
  Image_11?: Maybe<Scalars['String']>,
  Image_12?: Maybe<Scalars['String']>,
  Image_13?: Maybe<Scalars['String']>,
  Image_14?: Maybe<Scalars['String']>,
  Image_15?: Maybe<Scalars['String']>,
  Image_16?: Maybe<Scalars['String']>,
  Image_17?: Maybe<Scalars['String']>,
  Image_18?: Maybe<Scalars['String']>,
  Image_19?: Maybe<Scalars['String']>,
  Image_20?: Maybe<Scalars['String']>,
  lastModified: Scalars['DateTime'],
};

export type ProductViewData = {
   __typename?: 'ProductViewData',
  ITEMNMBR?: Maybe<Scalars['String']>,
  ITMCLSCD?: Maybe<Scalars['String']>,
  ITMCLSDC?: Maybe<Scalars['String']>,
  ITEMDESC?: Maybe<Scalars['String']>,
  ITMSHNAM?: Maybe<Scalars['String']>,
  EPCUBES: Scalars['Float'],
  boxWidth: Scalars['Float'],
  boxDepth: Scalars['Float'],
  boxHeight: Scalars['Float'],
  width: Scalars['Float'],
  depth: Scalars['Float'],
  height: Scalars['Float'],
  cartons: Scalars['Float'],
  Weight?: Maybe<Scalars['String']>,
  DROPSHIP?: Maybe<Scalars['String']>,
  DROPSHIP_M?: Maybe<Scalars['String']>,
  FOB?: Maybe<Scalars['String']>,
  LEVEL1?: Maybe<Scalars['String']>,
  LEVEL0?: Maybe<Scalars['String']>,
  FOB_M?: Maybe<Scalars['String']>,
  LEVEL2?: Maybe<Scalars['String']>,
  LEVEL3?: Maybe<Scalars['String']>,
  DISC?: Maybe<Scalars['String']>,
  Factory?: Maybe<Scalars['String']>,
  Origin?: Maybe<Scalars['String']>,
  Status?: Maybe<Scalars['String']>,
  Category?: Maybe<Scalars['String']>,
  ITEMTYPE?: Maybe<Scalars['String']>,
  Web_Exclude?: Maybe<Scalars['String']>,
  Wood?: Maybe<Scalars['String']>,
  Finish?: Maybe<Scalars['String']>,
  Item_Style?: Maybe<Scalars['String']>,
  Publish_to_Web?: Maybe<Scalars['String']>,
  F1?: Maybe<Scalars['String']>,
  F2?: Maybe<Scalars['String']>,
  F3?: Maybe<Scalars['String']>,
  F4?: Maybe<Scalars['String']>,
  F5?: Maybe<Scalars['String']>,
  F6?: Maybe<Scalars['String']>,
  F7?: Maybe<Scalars['String']>,
  F8?: Maybe<Scalars['String']>,
  F9?: Maybe<Scalars['String']>,
  F10?: Maybe<Scalars['String']>,
  F11?: Maybe<Scalars['String']>,
  F12?: Maybe<Scalars['String']>,
  F13?: Maybe<Scalars['String']>,
  F14?: Maybe<Scalars['String']>,
  F15?: Maybe<Scalars['String']>,
  Feature_1?: Maybe<Scalars['String']>,
  Feature_2?: Maybe<Scalars['String']>,
  Feature_3?: Maybe<Scalars['String']>,
  Feature_4?: Maybe<Scalars['String']>,
  Feature_5?: Maybe<Scalars['String']>,
  Feature_6?: Maybe<Scalars['String']>,
  Feature_7?: Maybe<Scalars['String']>,
  Feature_8?: Maybe<Scalars['String']>,
  Sort_ID?: Maybe<Scalars['String']>,
  Sales_Image_1?: Maybe<Scalars['String']>,
  Sales_Image_2?: Maybe<Scalars['String']>,
  Sales_Image_4?: Maybe<Scalars['String']>,
  Sales_Image_5?: Maybe<Scalars['String']>,
  Sales_Image_6?: Maybe<Scalars['String']>,
  Sales_Feature_2?: Maybe<Scalars['String']>,
  Sales_Feature_4?: Maybe<Scalars['String']>,
  Sales_Feature_3?: Maybe<Scalars['String']>,
  Sales_Feature_5?: Maybe<Scalars['String']>,
  Sales_Feature_6?: Maybe<Scalars['String']>,
  ITEM_CLASS_STATUS?: Maybe<Scalars['String']>,
  Full_Item_Class_Name?: Maybe<Scalars['String']>,
  Combined_Dimensions?: Maybe<Scalars['String']>,
  Item_Image_1?: Maybe<Scalars['String']>,
  Item_Image_2?: Maybe<Scalars['String']>,
  Item_Image_3?: Maybe<Scalars['String']>,
  EPKDCUBES?: Maybe<Scalars['String']>,
  Freight_Class?: Maybe<Scalars['String']>,
  Group_Path?: Maybe<Scalars['String']>,
  Factory_Assembled?: Maybe<Scalars['String']>,
  Product_Path?: Maybe<Scalars['String']>,
  Short_Group_Path?: Maybe<Scalars['String']>,
  Assembly_Cost?: Maybe<Scalars['String']>,
  QC_Cost?: Maybe<Scalars['String']>,
  Designer_Commission?: Maybe<Scalars['String']>,
  UPC_Code?: Maybe<Scalars['String']>,
  Agent?: Maybe<Scalars['String']>,
  Finish_Category?: Maybe<Scalars['String']>,
  SmallParcel?: Maybe<Scalars['String']>,
  Item_Cost_DC?: Maybe<Scalars['String']>,
  Item_Cost_WHSE?: Maybe<Scalars['String']>,
  Direct_Container?: Maybe<Scalars['String']>,
  Cubes?: Maybe<Scalars['String']>,
  Sales_Image_3?: Maybe<Scalars['String']>,
  Ipad_Sort_ID?: Maybe<Scalars['String']>,
  ABCCODE?: Maybe<Scalars['String']>,
  iPad_Best_Seller?: Maybe<Scalars['String']>,
  Web_Image?: Maybe<Scalars['String']>,
  Intro_Market?: Maybe<Scalars['String']>,
  Market_Write_Up?: Maybe<Scalars['String']>,
  Best_Seller?: Maybe<Scalars['String']>,
  US_Tariff_Code?: Maybe<Scalars['String']>,
  STNDCOST?: Maybe<Scalars['String']>,
  Sales_Feature_1?: Maybe<Scalars['String']>,
  SPECIAL?: Maybe<Scalars['String']>,
  Key_Item?: Maybe<Scalars['String']>,
  Box_Dimension_Combined?: Maybe<Scalars['String']>,
  DROPSHIP_X?: Maybe<Scalars['String']>,
  MIX_FULL?: Maybe<Scalars['String']>,
  MIX_HALF?: Maybe<Scalars['String']>,
  MIX_QTR?: Maybe<Scalars['String']>,
  Story?: Maybe<Scalars['String']>,
  ALWBKORD?: Maybe<Scalars['String']>,
  CSNS01?: Maybe<Scalars['String']>,
  FOB_IOR?: Maybe<Scalars['String']>,
  FOB_M_IOR?: Maybe<Scalars['String']>,
  Related_Items?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  UserJobs: Array<UserJob>,
  getUserJob: UserJob,
  getUserJobsForUser: Array<UserJob>,
  getUserJobForUserInProgress: UserJob,
  getUserJobForUserWizardCompleted: UserJob,
  productDataByCategoryForUserJob: Array<ProductData>,
  getProductDataFileUrl: UrlResponse,
  me?: Maybe<MeUser>,
  getMe?: Maybe<User>,
  hello: Scalars['String'],
  vendors: VendorsResponse,
  vendorById: Vendor,
  users: UsersResponse,
  vendorCategories: Array<VendorCategory>,
  vendorCategoriesForUser?: Maybe<Array<VendorCategory>>,
  vendorCategoryItemClasses: Array<VendorCategoryItemClass>,
  productData: Array<ProductData>,
  productDataByCategory: Array<ProductData>,
  productDataByItemNumber: Array<ProductData>,
  allInView: Array<ProductViewData>,
  allInOpenOrderDataView: Array<OpenOrderData>,
  getItemClassesForCategories: CategoryItemClassGrouped,
  getItemClassesForCategoriesForUser: CategoryItemClassGrouped,
  userById: GetUserWithRoles,
  xpoRowsBySopNumber: Array<Xpo>,
  salesPresentations: SalesPresentationTableResult,
  companies: Array<CustomerData>,
  presentationById: SalesPresentation,
  presentationByIdAndRelated: SalesPresentationAndRelated,
  presentationByIdAndPhotos: PresentationAndProductData,
  presentationPdfData: SalesPresentationPdfData,
  kitItemsByItemClass: Array<KitItemDetailsResult>,
  kitGroupsByItemClass: Array<ItemKitDetail>,
};


export type QueryGetUserJobArgs = {
  UserJobId: Scalars['Int']
};


export type QueryProductDataByCategoryForUserJobArgs = {
  category: Scalars['String']
};


export type QueryVendorsArgs = {
  searchText?: Maybe<Scalars['String']>,
  pageSize: Scalars['Int'],
  skip: Scalars['Int']
};


export type QueryVendorByIdArgs = {
  id: Scalars['Int']
};


export type QueryUsersArgs = {
  searchText?: Maybe<Scalars['String']>,
  pageSize: Scalars['Int'],
  skip: Scalars['Int']
};


export type QueryProductDataByCategoryArgs = {
  category: Scalars['String']
};


export type QueryProductDataByItemNumberArgs = {
  itemNumber: Scalars['String']
};


export type QueryGetItemClassesForCategoriesArgs = {
  categories: Array<Scalars['String']>
};


export type QueryUserByIdArgs = {
  id: Scalars['Int']
};


export type QueryXpoRowsBySopNumberArgs = {
  sopNumber: Scalars['String']
};


export type QuerySalesPresentationsArgs = {
  searchText?: Maybe<Scalars['String']>
};


export type QueryCompaniesArgs = {
  searchText: Scalars['String']
};


export type QueryPresentationByIdArgs = {
  id: Scalars['Int']
};


export type QueryPresentationByIdAndRelatedArgs = {
  itemClassIndex: Scalars['Int'],
  id: Scalars['Int']
};


export type QueryPresentationByIdAndPhotosArgs = {
  itemClassIndex: Scalars['Int'],
  id: Scalars['Int']
};


export type QueryPresentationPdfDataArgs = {
  id: Scalars['Int']
};


export type QueryKitItemsByItemClassArgs = {
  itemClass: Scalars['String']
};


export type QueryKitGroupsByItemClassArgs = {
  itemClass: Scalars['String']
};

export type SalesPresentation = {
   __typename?: 'SalesPresentation',
  id: Scalars['Int'],
  userId: Scalars['Int'],
  name: Scalars['String'],
  customerName: Scalars['String'],
  customerNumber: Scalars['String'],
  priceLevels: Array<SalesPresentationPriceLevel>,
  itemClasses: Array<SalesPresentationItemClass>,
};

export type SalesPresentationAndRelated = {
   __typename?: 'SalesPresentationAndRelated',
  presentation: SalesPresentation,
  itemClassIndex: Scalars['Int'],
  anyUnsavedItemClasses: Scalars['Boolean'],
  presentationItemClass: SalesPresentationItemClass,
  presentationItemClassKits?: Maybe<Array<KitItemsResult>>,
  presentationItemClassItemNumbers?: Maybe<Array<SalesPresentationItemClassItemNumber>>,
  presentationItemClassGroups?: Maybe<Array<SalesPresentationItemClassGroup>>,
  kits?: Maybe<Array<KitItemsResult>>,
  itemNumbers?: Maybe<Array<SalesPresentationItemClassItemNumber>>,
  groups?: Maybe<Array<SalesPresentationItemClassGroup>>,
};

export type SalesPresentationInput = {
  id?: Maybe<Scalars['Int']>,
  name: Scalars['String'],
  customerNumber: Scalars['String'],
  customerName: Scalars['String'],
  priceLevels: Array<SalesPresentationPriceLevelInput>,
  itemClasses: Array<ItemClassWithDescriptionInput>,
};

export type SalesPresentationItemClass = {
   __typename?: 'SalesPresentationItemClass',
  id: Scalars['Int'],
  salesPresentationId: Scalars['Int'],
  itemClass: Scalars['String'],
  itemClassDescription: Scalars['String'],
  priceAdjustment: Scalars['Int'],
  priceAdjustmentTo: Scalars['String'],
  cubeAdjustment: Scalars['Float'],
  cubeAdjustmentTo: Scalars['String'],
  hasBeenSaved: Scalars['Int'],
  DROPSHIP?: Maybe<Scalars['String']>,
  DROPSHIP_M?: Maybe<Scalars['String']>,
  DROPSHIP_X?: Maybe<Scalars['String']>,
  FOB?: Maybe<Scalars['String']>,
  FOB_M?: Maybe<Scalars['String']>,
  LEVEL0?: Maybe<Scalars['String']>,
  LEVEL1?: Maybe<Scalars['String']>,
  LEVEL2?: Maybe<Scalars['String']>,
  LEVEL3?: Maybe<Scalars['String']>,
  MIX_FULL?: Maybe<Scalars['String']>,
  MIX_HALF?: Maybe<Scalars['String']>,
  MIX_QTR?: Maybe<Scalars['String']>,
  salesPresentation: SalesPresentation,
  itemNumbers?: Maybe<Array<SalesPresentationItemClassItemNumber>>,
  kits?: Maybe<Array<SalesPresentationItemClassKit>>,
  groups?: Maybe<Array<SalesPresentationItemClassGroup>>,
};

export type SalesPresentationItemClassGroup = {
   __typename?: 'SalesPresentationItemClassGroup',
  id: Scalars['Int'],
  salesPresentationId: Scalars['Int'],
  salesPresentationItemClassId: Scalars['Int'],
  displayOrder: Scalars['Int'],
  kitItem: Scalars['String'],
  kitDescription?: Maybe<Scalars['String']>,
  cubes: Scalars['Float'],
  DROPSHIP?: Maybe<Scalars['Float']>,
  DROPSHIP_Original?: Maybe<Scalars['Float']>,
  DROPSHIP_CustomPricing?: Maybe<Scalars['Int']>,
  DROPSHIP_M?: Maybe<Scalars['Float']>,
  DROPSHIP_M_Original?: Maybe<Scalars['Float']>,
  DROPSHIP_M_CustomPricing?: Maybe<Scalars['Int']>,
  DROPSHIP_X?: Maybe<Scalars['Float']>,
  DROPSHIP_X_Original?: Maybe<Scalars['Float']>,
  DROPSHIP_X_CustomPricing?: Maybe<Scalars['Int']>,
  FOB?: Maybe<Scalars['Float']>,
  FOB_Original?: Maybe<Scalars['Float']>,
  FOB_CustomPricing?: Maybe<Scalars['Int']>,
  FOB_M?: Maybe<Scalars['Float']>,
  FOB_M_Original?: Maybe<Scalars['Float']>,
  FOB_M_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL0?: Maybe<Scalars['Float']>,
  LEVEL0_Original?: Maybe<Scalars['Float']>,
  LEVEL0_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL1?: Maybe<Scalars['Float']>,
  LEVEL1_Original?: Maybe<Scalars['Float']>,
  LEVEL1_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL2?: Maybe<Scalars['Float']>,
  LEVEL2_Original?: Maybe<Scalars['Float']>,
  LEVEL2_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL3?: Maybe<Scalars['Float']>,
  LEVEL3_Original?: Maybe<Scalars['Float']>,
  LEVEL3_CustomPricing?: Maybe<Scalars['Int']>,
  MIX_FULL?: Maybe<Scalars['Float']>,
  MIX_FULL_Original?: Maybe<Scalars['Float']>,
  MIX_FULL_CustomPricing?: Maybe<Scalars['Int']>,
  MIX_HALF?: Maybe<Scalars['Float']>,
  MIX_HALF_Original?: Maybe<Scalars['Float']>,
  MIX_HALF_CustomPricing?: Maybe<Scalars['Int']>,
  MIX_QTR?: Maybe<Scalars['Float']>,
  MIX_QTR_Original?: Maybe<Scalars['Float']>,
  MIX_QTR_CustomPricing?: Maybe<Scalars['Int']>,
  salesPresentation: SalesPresentation,
  salesPresentationItemClass: SalesPresentationItemClass,
};

export type SalesPresentationItemClassImage = {
   __typename?: 'SalesPresentationItemClassImage',
  id: Scalars['Int'],
  salesPresentationId: Scalars['Int'],
  salesPresentationItemClassId: Scalars['Int'],
  itemNumber: Scalars['String'],
  itemClass: Scalars['String'],
  imageUrl: Scalars['String'],
  imageIndex: Scalars['Int'],
  salesPresentation: SalesPresentation,
  salesPresentationItemClass: SalesPresentationItemClass,
};

export type SalesPresentationItemClassImageInput = {
  salesPresentationId: Scalars['Int'],
  salesPresentationItemClassId: Scalars['Int'],
  itemClass: Scalars['String'],
  itemClassIndex: Scalars['Int'],
  images: Array<SalesPresentationItemClassImagesInput>,
};

export type SalesPresentationItemClassImageItem = {
   __typename?: 'SalesPresentationItemClassImageItem',
  itemNumber: Scalars['String'],
  imageUrl: Scalars['String'],
  imageIndex: Scalars['Int'],
};

export type SalesPresentationItemClassImagesInput = {
  itemNumber: Scalars['String'],
  imageUrl: Scalars['String'],
  imageIndex: Scalars['Int'],
};

export type SalesPresentationItemClassItemNumber = {
   __typename?: 'SalesPresentationItemClassItemNumber',
  id: Scalars['Int'],
  salesPresentationId: Scalars['Int'],
  salesPresentationItemClassId: Scalars['Int'],
  displayOrder: Scalars['Int'],
  itemNumber: Scalars['String'],
  itemDescription?: Maybe<Scalars['String']>,
  cubes: Scalars['Float'],
  dimensions?: Maybe<Scalars['String']>,
  DROPSHIP?: Maybe<Scalars['Float']>,
  DROPSHIP_Original?: Maybe<Scalars['Float']>,
  DROPSHIP_CustomPricing?: Maybe<Scalars['Int']>,
  DROPSHIP_M?: Maybe<Scalars['Float']>,
  DROPSHIP_M_Original?: Maybe<Scalars['Float']>,
  DROPSHIP_M_CustomPricing?: Maybe<Scalars['Int']>,
  DROPSHIP_X?: Maybe<Scalars['Float']>,
  DROPSHIP_X_Original?: Maybe<Scalars['Float']>,
  DROPSHIP_X_CustomPricing?: Maybe<Scalars['Int']>,
  FOB?: Maybe<Scalars['Float']>,
  FOB_Original?: Maybe<Scalars['Float']>,
  FOB_CustomPricing?: Maybe<Scalars['Int']>,
  FOB_M?: Maybe<Scalars['Float']>,
  FOB_M_Original?: Maybe<Scalars['Float']>,
  FOB_M_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL0?: Maybe<Scalars['Float']>,
  LEVEL0_Original?: Maybe<Scalars['Float']>,
  LEVEL0_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL1?: Maybe<Scalars['Float']>,
  LEVEL1_Original?: Maybe<Scalars['Float']>,
  LEVEL1_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL2?: Maybe<Scalars['Float']>,
  LEVEL2_Original?: Maybe<Scalars['Float']>,
  LEVEL2_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL3?: Maybe<Scalars['Float']>,
  LEVEL3_Original?: Maybe<Scalars['Float']>,
  LEVEL3_CustomPricing?: Maybe<Scalars['Int']>,
  MIX_FULL?: Maybe<Scalars['Float']>,
  MIX_FULL_Original?: Maybe<Scalars['Float']>,
  MIX_FULL_CustomPricing?: Maybe<Scalars['Int']>,
  MIX_HALF?: Maybe<Scalars['Float']>,
  MIX_HALF_Original?: Maybe<Scalars['Float']>,
  MIX_HALF_CustomPricing?: Maybe<Scalars['Int']>,
  MIX_QTR?: Maybe<Scalars['Float']>,
  MIX_QTR_Original?: Maybe<Scalars['Float']>,
  MIX_QTR_CustomPricing?: Maybe<Scalars['Int']>,
  salesPresentation: SalesPresentation,
  salesPresentationItemClass: SalesPresentationItemClass,
};

export type SalesPresentationItemClassItemNumberInput = {
  displayOrder: Scalars['Int'],
  itemNumber: Scalars['String'],
  itemClass?: Maybe<Scalars['String']>,
  itemDescription: Scalars['String'],
  cubes: Scalars['Float'],
  dimensions?: Maybe<Scalars['String']>,
  DROPSHIP?: Maybe<Scalars['Float']>,
  DROPSHIP_Original?: Maybe<Scalars['Float']>,
  DROPSHIP_CustomPricing?: Maybe<Scalars['Int']>,
  DROPSHIP_M?: Maybe<Scalars['Float']>,
  DROPSHIP_M_Original?: Maybe<Scalars['Float']>,
  DROPSHIP_M_CustomPricing?: Maybe<Scalars['Int']>,
  DROPSHIP_X?: Maybe<Scalars['Float']>,
  DROPSHIP_X_Original?: Maybe<Scalars['Float']>,
  DROPSHIP_X_CustomPricing?: Maybe<Scalars['Int']>,
  FOB?: Maybe<Scalars['Float']>,
  FOB_Original?: Maybe<Scalars['Float']>,
  FOB_CustomPricing?: Maybe<Scalars['Int']>,
  FOB_M?: Maybe<Scalars['Float']>,
  FOB_M_Original?: Maybe<Scalars['Float']>,
  FOB_M_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL0?: Maybe<Scalars['Float']>,
  LEVEL0_Original?: Maybe<Scalars['Float']>,
  LEVEL0_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL1?: Maybe<Scalars['Float']>,
  LEVEL1_Original?: Maybe<Scalars['Float']>,
  LEVEL1_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL2?: Maybe<Scalars['Float']>,
  LEVEL2_Original?: Maybe<Scalars['Float']>,
  LEVEL2_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL3?: Maybe<Scalars['Float']>,
  LEVEL3_Original?: Maybe<Scalars['Float']>,
  LEVEL3_CustomPricing?: Maybe<Scalars['Int']>,
  MIX_FULL?: Maybe<Scalars['Float']>,
  MIX_FULL_Original?: Maybe<Scalars['Float']>,
  MIX_FULL_CustomPricing?: Maybe<Scalars['Int']>,
  MIX_HALF?: Maybe<Scalars['Float']>,
  MIX_HALF_Original?: Maybe<Scalars['Float']>,
  MIX_HALF_CustomPricing?: Maybe<Scalars['Int']>,
  MIX_QTR?: Maybe<Scalars['Float']>,
  MIX_QTR_Original?: Maybe<Scalars['Float']>,
  MIX_QTR_CustomPricing?: Maybe<Scalars['Int']>,
};

export type SalesPresentationItemClassKit = {
   __typename?: 'SalesPresentationItemClassKit',
  id?: Maybe<Scalars['Int']>,
  salesPresentationId: Scalars['Int'],
  salesPresentationItemClassId: Scalars['Int'],
  displayOrder: Scalars['Int'],
  itemNumber: Scalars['String'],
  itemDescription?: Maybe<Scalars['String']>,
  kitName?: Maybe<Scalars['String']>,
  kitItem: Scalars['String'],
  kitQuantity: Scalars['Int'],
  cubes: Scalars['Float'],
  dimensions?: Maybe<Scalars['String']>,
  DROPSHIP?: Maybe<Scalars['Float']>,
  DROPSHIP_Original?: Maybe<Scalars['Float']>,
  DROPSHIP_CustomPricing?: Maybe<Scalars['Int']>,
  DROPSHIP_M?: Maybe<Scalars['Float']>,
  DROPSHIP_M_Original?: Maybe<Scalars['Float']>,
  DROPSHIP_M_CustomPricing?: Maybe<Scalars['Int']>,
  DROPSHIP_X?: Maybe<Scalars['Float']>,
  DROPSHIP_X_Original?: Maybe<Scalars['Float']>,
  DROPSHIP_X_CustomPricing?: Maybe<Scalars['Int']>,
  FOB?: Maybe<Scalars['Float']>,
  FOB_Original?: Maybe<Scalars['Float']>,
  FOB_CustomPricing?: Maybe<Scalars['Int']>,
  FOB_M?: Maybe<Scalars['Float']>,
  FOB_M_Original?: Maybe<Scalars['Float']>,
  FOB_M_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL0?: Maybe<Scalars['Float']>,
  LEVEL0_Original?: Maybe<Scalars['Float']>,
  LEVEL0_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL1?: Maybe<Scalars['Float']>,
  LEVEL1_Original?: Maybe<Scalars['Float']>,
  LEVEL1_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL2?: Maybe<Scalars['Float']>,
  LEVEL2_Original?: Maybe<Scalars['Float']>,
  LEVEL2_CustomPricing?: Maybe<Scalars['Int']>,
  LEVEL3?: Maybe<Scalars['Float']>,
  LEVEL3_Original?: Maybe<Scalars['Float']>,
  LEVEL3_CustomPricing?: Maybe<Scalars['Int']>,
  MIX_FULL?: Maybe<Scalars['Float']>,
  MIX_FULL_Original?: Maybe<Scalars['Float']>,
  MIX_FULL_CustomPricing?: Maybe<Scalars['Int']>,
  MIX_HALF?: Maybe<Scalars['Float']>,
  MIX_HALF_Original?: Maybe<Scalars['Float']>,
  MIX_HALF_CustomPricing?: Maybe<Scalars['Int']>,
  MIX_QTR?: Maybe<Scalars['Float']>,
  MIX_QTR_Original?: Maybe<Scalars['Float']>,
  MIX_QTR_CustomPricing?: Maybe<Scalars['Int']>,
  salesPresentation?: Maybe<SalesPresentation>,
  salesPresentationItemClass?: Maybe<SalesPresentationItemClass>,
};

export type SalesPresentationPdfData = {
   __typename?: 'SalesPresentationPdfData',
  presentation: SalesPresentation,
  items?: Maybe<Array<PresentationPdfItemClass>>,
};

export type SalesPresentationPdfGroupRows = {
   __typename?: 'SalesPresentationPdfGroupRows',
  itemNumber?: Maybe<Scalars['String']>,
  itemDescription?: Maybe<Scalars['String']>,
  items?: Maybe<Array<SalesPresentationPdfRows>>,
};

export type SalesPresentationPdfItemNumberRows = {
   __typename?: 'SalesPresentationPdfItemNumberRows',
  itemNumber?: Maybe<Scalars['String']>,
  itemDescription?: Maybe<Scalars['String']>,
  items?: Maybe<Array<SalesPresentationPdfRows>>,
};

export type SalesPresentationPdfKitRows = {
   __typename?: 'SalesPresentationPdfKitRows',
  itemNumber?: Maybe<Scalars['String']>,
  itemDescription?: Maybe<Scalars['String']>,
  items?: Maybe<Array<SalesPresentationPdfRows>>,
};

export type SalesPresentationPdfRows = {
   __typename?: 'SalesPresentationPdfRows',
  itemNumber?: Maybe<Scalars['String']>,
  itemDescription?: Maybe<Scalars['String']>,
  dimensions?: Maybe<Scalars['String']>,
  cubes: Scalars['Float'],
  kitQuantity: Scalars['Float'],
  DROPSHIP?: Maybe<Scalars['String']>,
  DROPSHIP_M?: Maybe<Scalars['String']>,
  DROPSHIP_X?: Maybe<Scalars['String']>,
  FOB?: Maybe<Scalars['String']>,
  FOB_M?: Maybe<Scalars['String']>,
  LEVEL0?: Maybe<Scalars['String']>,
  LEVEL1?: Maybe<Scalars['String']>,
  LEVEL2?: Maybe<Scalars['String']>,
  LEVEL3?: Maybe<Scalars['String']>,
  MIX_FULL?: Maybe<Scalars['String']>,
  MIX_HALF?: Maybe<Scalars['String']>,
  MIX_QTR?: Maybe<Scalars['String']>,
};

export type SalesPresentationPriceLevel = {
   __typename?: 'SalesPresentationPriceLevel',
  id: Scalars['Int'],
  salesPresentationId: Scalars['Int'],
  priceLevel: Scalars['String'],
  displayName: Scalars['String'],
  salesPresentation: SalesPresentation,
};

export type SalesPresentationPriceLevelInput = {
  key: Scalars['String'],
  label: Scalars['String'],
};

export type SalesPresentationStep2Input = {
  salesPresentationId: Scalars['Int'],
  itemClass: Scalars['String'],
  itemClassId: Scalars['Int'],
  priceAdjustment?: Maybe<Scalars['Int']>,
  priceAdjustmentTo?: Maybe<Scalars['String']>,
  cubeAdjustment?: Maybe<Scalars['Float']>,
  cubeAdjustmentTo?: Maybe<Scalars['String']>,
  DROPSHIP?: Maybe<Scalars['String']>,
  DROPSHIP_M?: Maybe<Scalars['String']>,
  DROPSHIP_X?: Maybe<Scalars['String']>,
  FOB?: Maybe<Scalars['String']>,
  FOB_M?: Maybe<Scalars['String']>,
  LEVEL0?: Maybe<Scalars['String']>,
  LEVEL1?: Maybe<Scalars['String']>,
  LEVEL2?: Maybe<Scalars['String']>,
  LEVEL3?: Maybe<Scalars['String']>,
  MIX_FULL?: Maybe<Scalars['String']>,
  MIX_HALF?: Maybe<Scalars['String']>,
  MIX_QTR?: Maybe<Scalars['String']>,
  kits?: Maybe<Array<KitsInput>>,
  groups?: Maybe<Array<MasterGroupInput>>,
  items?: Maybe<Array<SalesPresentationItemClassItemNumberInput>>,
};

export type SalesPresentationTableResult = {
   __typename?: 'SalesPresentationTableResult',
  presentations: Array<SalesPresentation>,
  totalRows: Scalars['Float'],
};

export type SaveItemNumbersInput = {
  salesPresentationId: Scalars['Int'],
  itemClassId: Scalars['Int'],
  itemClass: Scalars['String'],
  itemNumbers: Array<SalesPresentationItemClassItemNumberInput>,
};

export type Sop10100 = {
   __typename?: 'Sop10100',
  SOPTYPE: Scalars['String'],
  SopNumber: Scalars['String'],
  ORIGTYPE: Scalars['String'],
  ORIGNUMB: Scalars['String'],
  DOCID: Scalars['String'],
  DOCDATE: Scalars['String'],
  GLPOSTDT: Scalars['String'],
  QUOTEDAT: Scalars['String'],
  QUOEXPDA: Scalars['String'],
  ORDRDATE: Scalars['String'],
  INVODATE: Scalars['String'],
  BACKDATE: Scalars['String'],
  RETUDATE: Scalars['String'],
  ReqShipDate: Scalars['String'],
  FUFILDAT: Scalars['String'],
  ACTLSHIP: Scalars['String'],
  DISCDATE: Scalars['String'],
  DUEDATE: Scalars['String'],
  REPTING: Scalars['String'],
  TRXFREQU: Scalars['String'],
  TIMEREPD: Scalars['String'],
  TIMETREP: Scalars['String'],
  DYSTINCR: Scalars['String'],
  DTLSTREP: Scalars['String'],
  DSTBTCH1: Scalars['String'],
  DSTBTCH2: Scalars['String'],
  USDOCID1: Scalars['String'],
  USDOCID2: Scalars['String'],
  DISCFRGT: Scalars['String'],
  ORDAVFRT: Scalars['String'],
  DISCMISC: Scalars['String'],
  ORDAVMSC: Scalars['String'],
  DISAVAMT: Scalars['String'],
  ORDAVAMT: Scalars['String'],
  DISCRTND: Scalars['String'],
  ORDISRTD: Scalars['String'],
  DISTKNAM: Scalars['String'],
  ORDISTKN: Scalars['String'],
  DSCPCTAM: Scalars['String'],
  DSCDLRAM: Scalars['String'],
  ORDDLRAT: Scalars['String'],
  DISAVTKN: Scalars['String'],
  ORDATKN: Scalars['String'],
  PYMTRMID: Scalars['String'],
  PRCLEVEL: Scalars['String'],
  LocationCode: Scalars['String'],
  BCHSOURC: Scalars['String'],
  BACHNUMB: Scalars['String'],
  CUSTNMBR: Scalars['String'],
  CUSTNAME: Scalars['String'],
  CSTPONBR: Scalars['String'],
  PROSPECT: Scalars['String'],
  MSTRNUMB: Scalars['String'],
  PCKSLPNO: Scalars['String'],
  PICTICNU: Scalars['String'],
  MRKDNAMT: Scalars['String'],
  ORMRKDAM: Scalars['String'],
  PRBTADCD: Scalars['String'],
  PRSTADCD: Scalars['String'],
  CNTCPRSN: Scalars['String'],
  ShipToName: Scalars['String'],
  ADDRESS1: Scalars['String'],
  ADDRESS2: Scalars['String'],
  ADDRESS3: Scalars['String'],
  CITY: Scalars['String'],
  STATE: Scalars['String'],
  ZIPCODE: Scalars['String'],
  CCode: Scalars['String'],
  COUNTRY: Scalars['String'],
  PHNUMBR1: Scalars['String'],
  PHNUMBR2: Scalars['String'],
  PHONE3: Scalars['String'],
  FAXNUMBR: Scalars['String'],
  COMAPPTO: Scalars['String'],
  COMMAMNT: Scalars['String'],
  OCOMMAMT: Scalars['String'],
  CMMSLAMT: Scalars['String'],
  ORCOSAMT: Scalars['String'],
  NCOMAMNT: Scalars['String'],
  ORNCMAMT: Scalars['String'],
  SHIPMTHD: Scalars['String'],
  TRDISAMT: Scalars['String'],
  ORTDISAM: Scalars['String'],
  TRDISPCT: Scalars['String'],
  SUBTOTAL: Scalars['String'],
  ORSUBTOT: Scalars['String'],
  REMSUBTO: Scalars['String'],
  OREMSUBT: Scalars['String'],
  EXTDCOST: Scalars['String'],
  OREXTCST: Scalars['String'],
  FRTAMNT: Scalars['String'],
  ORFRTAMT: Scalars['String'],
  MISCAMNT: Scalars['String'],
  ORMISCAMT: Scalars['String'],
  TXENGCLD: Scalars['String'],
  TAXEXMT1: Scalars['String'],
  TAXEXMT2: Scalars['String'],
  TXRGNNUM: Scalars['String'],
  TAXSCHID: Scalars['String'],
  TXSCHSRC: Scalars['String'],
  BSIVCTTL: Scalars['String'],
  FRTSCHID: Scalars['String'],
  FRTTXAMT: Scalars['String'],
  ORFRTTAX: Scalars['String'],
  FRGTTXBL: Scalars['String'],
  MSCSCHID: Scalars['String'],
  MSCTXAMT: Scalars['String'],
  ORMSCTAX: Scalars['String'],
  MISCTXBL: Scalars['String'],
  BKTFRTAM: Scalars['String'],
  ORBKTFRT: Scalars['String'],
  BKTMSCAM: Scalars['String'],
  ORBKTMSC: Scalars['String'],
  BCKTXAMT: Scalars['String'],
  OBTAXAMT: Scalars['String'],
  TXBTXAMT: Scalars['String'],
  OTAXTAMT: Scalars['String'],
  TAXAMNT: Scalars['String'],
  ORTAXAMT: Scalars['String'],
  ECTRX: Scalars['String'],
  DOCAMNT: Scalars['String'],
  ORDOCAMT: Scalars['String'],
  PYMTRCVD: Scalars['String'],
  ORPMTRVD: Scalars['String'],
  DEPRECVD: Scalars['String'],
  ORDEPRVD: Scalars['String'],
  CODAMNT: Scalars['String'],
  ORCODAMT: Scalars['String'],
  ACCTAMNT: Scalars['String'],
  ORACTAMT: Scalars['String'],
  SALSTERR: Scalars['String'],
  SLPRSNID: Scalars['String'],
  UPSZONE: Scalars['String'],
  TIMESPRT: Scalars['String'],
  PSTGSTUS: Scalars['String'],
  VOIDSTTS: Scalars['String'],
  ALLOCABY: Scalars['String'],
  NOTEINDX: Scalars['String'],
  CURNCYID: Scalars['String'],
  CURRNIDX: Scalars['String'],
  RATETPID: Scalars['String'],
  EXGTBLID: Scalars['String'],
  XCHGRATE: Scalars['String'],
  DENXRATE: Scalars['String'],
  EXCHDATE: Scalars['String'],
  TIME1: Scalars['String'],
  RTCLCMTD: Scalars['String'],
  MCTRXSTT: Scalars['String'],
  TRXSORCE: Scalars['String'],
  SOPHDRE1: Scalars['String'],
  SOPHDRE2: Scalars['String'],
  SOPLNERR: Scalars['String'],
  SOPHDRFL: Scalars['String'],
  SOPMCERR: Scalars['String'],
  COMMNTID: Scalars['String'],
  REFRENCE: Scalars['String'],
  POSTEDDT: Scalars['String'],
  PTDUSRID: Scalars['String'],
  USER2ENT: Scalars['String'],
  CREATDDT: Scalars['String'],
  MODIFDT: Scalars['String'],
  Tax_Date: Scalars['String'],
  APLYWITH: Scalars['String'],
  WITHHAMT: Scalars['String'],
  SHPPGDOC: Scalars['String'],
  CORRCTN: Scalars['String'],
  SIMPLIFD: Scalars['String'],
  CORRNXST: Scalars['String'],
  DOCNCORR: Scalars['String'],
  SEQNCORR: Scalars['String'],
  SALEDATE: Scalars['String'],
  SOPHDRE3: Scalars['String'],
  EXCEPTIONALDEMAND: Scalars['String'],
  Flags: Scalars['String'],
  BackoutTradeDisc: Scalars['String'],
  OrigBackoutTradeDisc: Scalars['String'],
  GPSFOINTEGRATIONID: Scalars['String'],
  INTEGRATIONSOURCE: Scalars['String'],
  INTEGRATIONID: Scalars['String'],
  SOPSTATUS: Scalars['String'],
  SHIPCOMPLETE: Scalars['String'],
  DIRECTDEBIT: Scalars['String'],
  WorkflowApprStatCreditLm: Scalars['String'],
  WorkflowPriorityCreditLm: Scalars['String'],
  WorkflowApprStatusQuote: Scalars['String'],
  WorkflowPriorityQuote: Scalars['String'],
  Workflow_Status: Scalars['String'],
  ContractExchangeRateStat: Scalars['String'],
  Print_Phone_NumberGB: Scalars['String'],
  DEX_ROW_TS: Scalars['String'],
  DEX_ROW_ID: Scalars['String'],
};

export type Sop10107 = {
   __typename?: 'Sop10107',
  DexRowId: Scalars['String'],
  SopNumber: Scalars['String'],
  SopType: Scalars['Float'],
  TrackingNumber: Scalars['String'],
};

export type Sop10200 = {
   __typename?: 'Sop10200',
  SOPTYPE: Scalars['String'],
  SopNumber: Scalars['String'],
  LNITMSEQ: Scalars['String'],
  CMPNTSEQ: Scalars['String'],
  ITEMNMBR: Scalars['String'],
  ITEMDESC: Scalars['String'],
  NONINVEN: Scalars['String'],
  DROPSHIP: Scalars['String'],
  UOFM: Scalars['String'],
  LocationCode: Scalars['String'],
  UNITCOST: Scalars['String'],
  ORUNTCST: Scalars['String'],
  UNITPRCE: Scalars['String'],
  ORUNTPRC: Scalars['String'],
  XTNDPRCE: Scalars['String'],
  OXTNDPRC: Scalars['String'],
  REMPRICE: Scalars['String'],
  OREPRICE: Scalars['String'],
  EXTDCOST: Scalars['String'],
  OREXTCST: Scalars['String'],
  MRKDNAMT: Scalars['String'],
  ORMRKDAM: Scalars['String'],
  MRKDNPCT: Scalars['String'],
  MRKDNTYP: Scalars['String'],
  INVINDX: Scalars['String'],
  CSLSINDX: Scalars['String'],
  SLSINDX: Scalars['String'],
  MKDNINDX: Scalars['String'],
  RTNSINDX: Scalars['String'],
  INUSINDX: Scalars['String'],
  INSRINDX: Scalars['String'],
  DMGDINDX: Scalars['String'],
  ITMTSHID: Scalars['String'],
  IVITMTXB: Scalars['String'],
  BKTSLSAM: Scalars['String'],
  ORBKTSLS: Scalars['String'],
  TAXAMNT: Scalars['String'],
  ORTAXAMT: Scalars['String'],
  TXBTXAMT: Scalars['String'],
  OTAXTAMT: Scalars['String'],
  BSIVCTTL: Scalars['String'],
  TRDISAMT: Scalars['String'],
  ORTDISAM: Scalars['String'],
  DISCSALE: Scalars['String'],
  ORDAVSLS: Scalars['String'],
  QUANTITY: Scalars['String'],
  ATYALLOC: Scalars['String'],
  QTYINSVC: Scalars['String'],
  QTYINUSE: Scalars['String'],
  QTYDMGED: Scalars['String'],
  QTYRTRND: Scalars['String'],
  QTYONHND: Scalars['String'],
  QTYCANCE: Scalars['String'],
  QTYCANOT: Scalars['String'],
  QTYONPO: Scalars['String'],
  QTYORDER: Scalars['String'],
  QTYPRBAC: Scalars['String'],
  QTYPRBOO: Scalars['String'],
  QTYPRINV: Scalars['String'],
  QTYPRORD: Scalars['String'],
  QTYPRVRECVD: Scalars['String'],
  QTYRECVD: Scalars['String'],
  QTYREMAI: Scalars['String'],
  QTYREMBO: Scalars['String'],
  QTYTBAOR: Scalars['String'],
  QTYTOINV: Scalars['String'],
  QTYTORDR: Scalars['String'],
  QTYFULFI: Scalars['String'],
  QTYSLCTD: Scalars['String'],
  QTYBSUOM: Scalars['String'],
  EXTQTYAL: Scalars['String'],
  EXTQTYSEL: Scalars['String'],
  ReqShipDate: Scalars['String'],
  FUFILDAT: Scalars['String'],
  ACTLSHIP: Scalars['String'],
  SHIPMTHD: Scalars['String'],
  SALSTERR: Scalars['String'],
  SLPRSNID: Scalars['String'],
  PRCLEVEL: Scalars['String'],
  COMMNTID: Scalars['String'],
  BRKFLD1: Scalars['String'],
  BRKFLD2: Scalars['String'],
  BRKFLD3: Scalars['String'],
  CURRNIDX: Scalars['String'],
  TRXSORCE: Scalars['String'],
  SOPLNERR: Scalars['String'],
  ORGSEQNM: Scalars['String'],
  ITEMCODE: Scalars['String'],
  PURCHSTAT: Scalars['String'],
  DECPLQTY: Scalars['String'],
  DECPLCUR: Scalars['String'],
  ODECPLCU: Scalars['String'],
  QTYTOSHP: Scalars['String'],
  XFRSHDOC: Scalars['String'],
  EXCEPTIONALDEMAND: Scalars['String'],
  TAXSCHID: Scalars['String'],
  TXSCHSRC: Scalars['String'],
  PRSTADCD: Scalars['String'],
  ShipToName: Scalars['String'],
  CNTCPRSN: Scalars['String'],
  ADDRESS1: Scalars['String'],
  ADDRESS2: Scalars['String'],
  ADDRESS3: Scalars['String'],
  CITY: Scalars['String'],
  STATE: Scalars['String'],
  ZIPCODE: Scalars['String'],
  CCode: Scalars['String'],
  COUNTRY: Scalars['String'],
  PHONE1: Scalars['String'],
  PHONE2: Scalars['String'],
  PHONE3: Scalars['String'],
  FAXNUMBR: Scalars['String'],
  Flags: Scalars['String'],
  BackoutTradeDisc: Scalars['String'],
  OrigBackoutTradeDisc: Scalars['String'],
  GPSFOINTEGRATIONID: Scalars['String'],
  INTEGRATIONSOURCE: Scalars['String'],
  INTEGRATIONID: Scalars['String'],
  CONTNBR: Scalars['String'],
  CONTLNSEQNBR: Scalars['String'],
  CONTSTARTDTE: Scalars['String'],
  CONTENDDTE: Scalars['String'],
  CONTITEMNBR: Scalars['String'],
  CONTSERIALNBR: Scalars['String'],
  BULKPICKPRNT: Scalars['String'],
  INDPICKPRNT: Scalars['String'],
  ISLINEINTRA: Scalars['String'],
  SOFULFILLMENTBIN: Scalars['String'],
  MULTIPLEBINS: Scalars['String'],
  Print_Phone_NumberGB: Scalars['String'],
  DEX_ROW_TS: Scalars['String'],
  DEX_ROW_ID: Scalars['String'],
};

export type SuccessMessageResponse = {
   __typename?: 'SuccessMessageResponse',
  success: Scalars['Boolean'],
  message: Scalars['String'],
};

export type Svc00700 = {
   __typename?: 'Svc00700',
  OrderDocumentId: Scalars['String'],
  RFRNCDOC: Scalars['String'],
  TECHID: Scalars['String'],
  OffId: Scalars['String'],
  Status: Scalars['Int'],
  OrdDate: Scalars['DateTime'],
  EtaDate: Scalars['DateTime'],
  CustName: Scalars['String'],
  Address1: Scalars['String'],
  Address: Scalars['Float'],
  City: Scalars['String'],
  State: Scalars['String'],
  ZipCode: Scalars['String'],
  ShipMthd: Scalars['String'],
  TransferLocation: Scalars['String'],
  ITLOCN: Scalars['String'],
  LocationCode: Scalars['String'],
  NoteIndex: Scalars['Float'],
  SvcAddressOption: Scalars['Int'],
  SvcMiscAddressCode: Scalars['String'],
  Address3: Scalars['String'],
  Country: Scalars['String'],
  UserId: Scalars['String'],
};

export type Svc00701 = {
   __typename?: 'Svc00701',
  OrderDocumentId: Scalars['String'],
  LNITMSEQ: Scalars['Int'],
  Status: Scalars['Int'],
  ItemNumber: Scalars['String'],
  Description: Scalars['String'],
  UnitOfMeasure: Scalars['String'],
  TransferQuantity: Scalars['Float'],
  QuantityFulfilled: Scalars['Float'],
  QuantityShipped: Scalars['Float'],
  QuantityToReceive: Scalars['Float'],
  QuantityReceived: Scalars['Float'],
  CALLNBR: Scalars['String'],
  SRVRECTYPE: Scalars['Int'],
  SERVLITEMSEQ: Scalars['Int'],
  EQPLINE: Scalars['Int'],
  LINITMTYP: Scalars['String'],
  RETDOCID: Scalars['String'],
  LNSEQNBR: Scalars['Float'],
  RtvNumber: Scalars['String'],
  WORECTYPE: Scalars['Int'],
  WORKORDNUM: Scalars['String'],
  QTYBSUOM: Scalars['Float'],
  TransferLocation: Scalars['String'],
  ItemLocation: Scalars['String'],
  LocationCode: Scalars['String'],
  TRFQTYTY: Scalars['Int'],
  TRTQTYTY: Scalars['Int'],
  DECPLCUR: Scalars['Int'],
  DECPLQTY: Scalars['Int'],
  Landed_Cost_Group_ID: Scalars['String'],
  Reason_Code: Scalars['String'],
};

export type Svc00712 = {
   __typename?: 'Svc00712',
  OrderDocumentId: Scalars['String'],
  LNITMSEQ: Scalars['Int'],
  SEQNUMBR: Scalars['Int'],
  ItemNumber: Scalars['String'],
  TransferLocation: Scalars['String'],
  LocationCode: Scalars['String'],
  BIN: Scalars['String'],
  TOBIN: Scalars['String'],
  QuantityType: Scalars['Int'],
  Quantity: Scalars['Float'],
  Posted: Scalars['Int'],
};

export type Svc00731 = {
   __typename?: 'Svc00731',
  OrderDocumentId: Scalars['String'],
  LNITMSEQ: Scalars['Int'],
  SEQNUMBR: Scalars['Int'],
  SvcDistrType: Scalars['Int'],
  DistRef: Scalars['String'],
  ActIndex: Scalars['Int'],
  DEBITAMT: Scalars['Float'],
  ORDBTAMT: Scalars['Float'],
  CRDTAMNT: Scalars['Float'],
  ORCRDAMT: Scalars['Float'],
  CurrentIndex: Scalars['Int'],
  TRXSORCE: Scalars['String'],
  Posted: Scalars['Int'],
  PostedDateTime: Scalars['DateTime'],
};

export type TransferFromArgs = {
  toTruckItem: Scalars['String'],
  stockItems: Array<TransferItemArgs>,
  orderItems: Array<TransferOrderItemArgs>,
};

export type TransferItemArgs = {
  OrderDocumentId: Scalars['String'],
  ItemNumber: Scalars['String'],
  TransferQuantity: Scalars['Float'],
  LNITMSEQ: Scalars['Int'],
};

export type TransferOrderItemArgs = {
  sopNumber: Scalars['String'],
  orderItems: Array<TransferItemArgs>,
};

export type TruckItemOrderItem = {
   __typename?: 'TruckItemOrderItem',
  SopNumber: Scalars['String'],
  SopDocDate?: Maybe<Scalars['DateTime']>,
  orderItems: Array<InTransitWithCubes>,
};

export type TruckItems = {
   __typename?: 'TruckItems',
  status: Scalars['Int'],
  stockItems: Array<InTransitWithCubes>,
  orderItems: Array<TruckItemOrderItem>,
  transferLocation: Scalars['String'],
  locationCode: Scalars['String'],
};

export type UpdateQuantityArgs = {
  data: Array<UpdateQuantityArgsData>,
};

export type UpdateQuantityArgsData = {
  orderDocumentId: Scalars['String'],
  itemNumber: Scalars['String'],
  quantity: Scalars['Float'],
};

export type UpdateQuantityItem = {
   __typename?: 'UpdateQuantityItem',
  svc00701: Svc00701,
  svc00712: Svc00712,
  svc00731: Svc00731,
};

export type UpdateQuantityResponse = {
   __typename?: 'UpdateQuantityResponse',
  data: Array<UpdateQuantityItem>,
};

export type UrlResponse = {
   __typename?: 'UrlResponse',
  url: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['Int'],
  vendorId?: Maybe<Scalars['Int']>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  fullName: Scalars['String'],
  password: Scalars['String'],
  active: Scalars['Boolean'],
  role?: Maybe<Scalars['String']>,
  alertProductAdded?: Maybe<Scalars['Boolean']>,
  alertProductDiscontinued?: Maybe<Scalars['Boolean']>,
  alertProductUpdated?: Maybe<Scalars['Boolean']>,
  alertEmail?: Maybe<Scalars['String']>,
  created?: Maybe<Scalars['DateTime']>,
  modified?: Maybe<Scalars['DateTime']>,
  vendor?: Maybe<Vendor>,
  userRoles?: Maybe<Array<UserRole>>,
};

export type UserInput = {
  id?: Maybe<Scalars['Int']>,
  vendorId?: Maybe<Scalars['Int']>,
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  password?: Maybe<Scalars['String']>,
  active: Scalars['Boolean'],
  alertProductAdded: Scalars['Boolean'],
  alertProductDiscontinued: Scalars['Boolean'],
  alertProductUpdated: Scalars['Boolean'],
  alertEmail: Scalars['String'],
  roles: Array<Scalars['String']>,
};

export type UserJob = {
   __typename?: 'UserJob',
  id: Scalars['Int'],
  userId: Scalars['Float'],
  vendorId: Scalars['Float'],
  uuid: Scalars['String'],
  fileType: Scalars['String'],
  inProgress: Scalars['Boolean'],
  status: UserJobStatusEnum,
  zipUrl?: Maybe<Scalars['String']>,
  zipFileSize?: Maybe<Scalars['Int']>,
  created?: Maybe<Scalars['DateTime']>,
  userJobCategories?: Maybe<Array<UserJobCategory>>,
};

export type UserJobCategory = {
   __typename?: 'UserJobCategory',
  id?: Maybe<Scalars['Int']>,
  userJobId: Scalars['Int'],
  category: Scalars['String'],
  filePath?: Maybe<Scalars['String']>,
  downloaded: Scalars['Boolean'],
  available?: Maybe<Scalars['DateTime']>,
  created?: Maybe<Scalars['DateTime']>,
  userJob: Array<UserJob>,
  userJobCategoryItemClasses?: Maybe<Array<UserJobCategoryItemClass>>,
};

export type UserJobCategoryInput = {
  id?: Maybe<Scalars['Int']>,
  userJobId: Scalars['Float'],
  category: Scalars['String'],
  filePath?: Maybe<Scalars['String']>,
  downloaded?: Maybe<Scalars['Boolean']>,
  available?: Maybe<Scalars['DateTime']>,
  created?: Maybe<Scalars['DateTime']>,
  userJobCategoryItemClasses?: Maybe<Array<UserJobCategoryItemClassInput>>,
};

export type UserJobCategoryItemClass = {
   __typename?: 'UserJobCategoryItemClass',
  id?: Maybe<Scalars['Int']>,
  userJobId: Scalars['Float'],
  userJobCategoryId: Scalars['Float'],
  itemClass: Scalars['String'],
  itemClassDescription: Scalars['String'],
  userJobCategory?: Maybe<Array<UserJobCategory>>,
};

export type UserJobCategoryItemClassInput = {
  id?: Maybe<Scalars['Int']>,
  userJobId?: Maybe<Scalars['Float']>,
  userJobCategoryId?: Maybe<Scalars['Float']>,
  itemClass: Scalars['String'],
  itemClassDescription: Scalars['String'],
  userJobCategory?: Maybe<Array<UserJobCategoryInput>>,
};

export type UserJobDownloadLink = {
   __typename?: 'UserJobDownloadLink',
  id?: Maybe<Scalars['Int']>,
  userJobId: Scalars['Int'],
  category: Scalars['String'],
  categoryDisplayText: Scalars['String'],
  downloadUrl: Scalars['String'],
  fileSize: Scalars['String'],
  notifyEmail: Scalars['String'],
  created?: Maybe<Scalars['DateTime']>,
  userJob?: Maybe<Array<UserJob>>,
};

export type UserJobDownloadLinkInput = {
  id?: Maybe<Scalars['Int']>,
  userJobId: Scalars['Int'],
  category: Scalars['String'],
  categoryDisplayText: Scalars['String'],
  downloadUrl: Scalars['String'],
  fileSize: Scalars['String'],
  notifyEmail: Scalars['String'],
};

export type UserJobInput = {
  id?: Maybe<Scalars['Int']>,
  userId?: Maybe<Scalars['Float']>,
  vendorId?: Maybe<Scalars['Float']>,
  uuid?: Maybe<Scalars['String']>,
  fileType: Scalars['String'],
  inProgress?: Maybe<Scalars['Boolean']>,
  status: UserJobStatusEnum,
  userJobCategories?: Maybe<Array<UserJobCategoryInput>>,
};

/** All Statuses for a UserJob */
export enum UserJobStatusEnum {
  InProgress = 'InProgress',
  ReadyForDownload = 'ReadyForDownload',
  WizardCompleted = 'WizardCompleted'
}

export type UserRole = {
   __typename?: 'UserRole',
  id: Scalars['Int'],
  userId?: Maybe<Scalars['Int']>,
  role: Scalars['String'],
  user: User,
};

export type UsersResponse = {
   __typename?: 'UsersResponse',
  users: Array<User>,
  totalRows: Scalars['Int'],
};

export type Vendor = {
   __typename?: 'Vendor',
  id: Scalars['ID'],
  name: Scalars['String'],
  logo?: Maybe<Scalars['String']>,
  created?: Maybe<Scalars['DateTime']>,
  modified?: Maybe<Scalars['DateTime']>,
  vendorCategories?: Maybe<Array<VendorCategory>>,
};

export type VendorCategory = {
   __typename?: 'VendorCategory',
  id: Scalars['ID'],
  vendorId: Scalars['Int'],
  category: Scalars['String'],
  vendor?: Maybe<Vendor>,
  itemClasses?: Maybe<Array<VendorCategoryItemClass>>,
};

export type VendorCategoryInput = {
  category: Scalars['String'],
  itemClasses?: Maybe<Array<Scalars['String']>>,
};

export type VendorCategoryItemClass = {
   __typename?: 'VendorCategoryItemClass',
  id: Scalars['ID'],
  vendorId: Scalars['Int'],
  vendorCategoryId: Scalars['Int'],
  itemClass: Scalars['String'],
  vendor: Vendor,
  vendorCategory?: Maybe<VendorCategory>,
};

export type VendorInput = {
  id?: Maybe<Scalars['Int']>,
  name: Scalars['String'],
  logo?: Maybe<Scalars['String']>,
  vendorCategories?: Maybe<Array<VendorCategoryInput>>,
};

export type VendorsResponse = {
   __typename?: 'VendorsResponse',
  vendors: Array<Vendor>,
  totalRows: Scalars['Int'],
};

export type Xpo = {
   __typename?: 'Xpo',
  ID?: Maybe<Scalars['String']>,
  SOPTYPE?: Maybe<Scalars['Float']>,
  SopNumber?: Maybe<Scalars['String']>,
  CUSTCLAS?: Maybe<Scalars['String']>,
  CUSTNMBR?: Maybe<Scalars['String']>,
  CUSTNAME?: Maybe<Scalars['String']>,
  DOCDATE?: Maybe<Scalars['DateTime']>,
  ORIGNUMB?: Maybe<Scalars['String']>,
  CSTPONBR?: Maybe<Scalars['String']>,
  AdditionalPO?: Maybe<Scalars['String']>,
  DOCID?: Maybe<Scalars['String']>,
  CRD?: Maybe<Scalars['DateTime']>,
  ESD?: Maybe<Scalars['DateTime']>,
  Org_Date?: Maybe<Scalars['DateTime']>,
  Terms?: Maybe<Scalars['String']>,
  PRCLEVEL?: Maybe<Scalars['String']>,
  LocationCode?: Maybe<Scalars['String']>,
  OrderLocationCode?: Maybe<Scalars['String']>,
  BILLTO_ID?: Maybe<Scalars['String']>,
  SHIPTO_ID?: Maybe<Scalars['String']>,
  ShipToName?: Maybe<Scalars['String']>,
  Address1?: Maybe<Scalars['String']>,
  Address2?: Maybe<Scalars['String']>,
  City?: Maybe<Scalars['String']>,
  State?: Maybe<Scalars['String']>,
  ZipCode?: Maybe<Scalars['String']>,
  Address3?: Maybe<Scalars['String']>,
  CNTCPRSN?: Maybe<Scalars['String']>,
  PHNUMBR1?: Maybe<Scalars['String']>,
  Fax?: Maybe<Scalars['String']>,
  COUNTRY?: Maybe<Scalars['String']>,
  Shipping_Method?: Maybe<Scalars['String']>,
  TRDISAMT?: Maybe<Scalars['Float']>,
  SUBTOTAL?: Maybe<Scalars['Float']>,
  REMSUBTO?: Maybe<Scalars['Float']>,
  FRTAMNT?: Maybe<Scalars['Float']>,
  MISCAMNT?: Maybe<Scalars['Float']>,
  DOCAMNT?: Maybe<Scalars['Float']>,
  SLPRSNID?: Maybe<Scalars['String']>,
  Bank_Trans_Date?: Maybe<Scalars['String']>,
  Bank_Approval_Date?: Maybe<Scalars['String']>,
  Ack_Status?: Maybe<Scalars['String']>,
  Freight_Percent?: Maybe<Scalars['String']>,
  Freight_Method?: Maybe<Scalars['String']>,
  Bank_Ref?: Maybe<Scalars['String']>,
  Approval_Status?: Maybe<Scalars['String']>,
  PO_Number?: Maybe<Scalars['String']>,
  Customer_Tag?: Maybe<Scalars['String']>,
  Container_ID?: Maybe<Scalars['String']>,
  Order_Status?: Maybe<Scalars['String']>,
  COMMENT_2?: Maybe<Scalars['String']>,
  COMMENT_3?: Maybe<Scalars['String']>,
  COMMENT_4?: Maybe<Scalars['String']>,
  CMMTTEXT?: Maybe<Scalars['String']>,
  BACHNUMB?: Maybe<Scalars['String']>,
  COMMNTID?: Maybe<Scalars['String']>,
  LNITMSEQ?: Maybe<Scalars['Float']>,
  CMPNTSEQ?: Maybe<Scalars['Float']>,
  ITMCLSCD?: Maybe<Scalars['String']>,
  ITEMNMBR?: Maybe<Scalars['String']>,
  ITEMDESC?: Maybe<Scalars['String']>,
  UNITPRCE?: Maybe<Scalars['Float']>,
  XTNDPRCE?: Maybe<Scalars['Float']>,
  QTY?: Maybe<Scalars['Float']>,
  QTY_ALLOCATED?: Maybe<Scalars['Float']>,
  QTY_BO?: Maybe<Scalars['Float']>,
  Cubes?: Maybe<Scalars['Float']>,
  EP_Carton?: Maybe<Scalars['Float']>,
  EP_FREIGHTCLASS?: Maybe<Scalars['Float']>,
  Ext_Carton?: Maybe<Scalars['Float']>,
  Ext_Cubes?: Maybe<Scalars['Float']>,
  Ext_Weight?: Maybe<Scalars['Float']>,
  TIMESPRT?: Maybe<Scalars['Float']>,
  RETUDATE?: Maybe<Scalars['String']>,
  ORDRDATE?: Maybe<Scalars['String']>,
  USER2ENT?: Maybe<Scalars['String']>,
  USERDEF2?: Maybe<Scalars['String']>,
  USERDEF1?: Maybe<Scalars['String']>,
  COMMENT1?: Maybe<Scalars['String']>,
  COMMENT2?: Maybe<Scalars['String']>,
  DATE1?: Maybe<Scalars['String']>,
  TIME1?: Maybe<Scalars['String']>,
  Line_Item_Comment?: Maybe<Scalars['String']>,
  MSTRNUMB?: Maybe<Scalars['Float']>,
  ITEMTYPE?: Maybe<Scalars['Float']>,
  Customer_Comments?: Maybe<Scalars['String']>,
  QTYTOINV?: Maybe<Scalars['Float']>,
  PHONE1?: Maybe<Scalars['String']>,
  EXT_CARTON_wo_KITS?: Maybe<Scalars['Float']>,
  EXT_CUBES_wo_KITS?: Maybe<Scalars['Float']>,
  EXT_WEIGHT_wo_KITS?: Maybe<Scalars['Float']>,
  Freight_Class?: Maybe<Scalars['Float']>,
  Status?: Maybe<Scalars['String']>,
  Category?: Maybe<Scalars['String']>,
  Tracking_Number?: Maybe<Scalars['String']>,
  VOIDSTTS?: Maybe<Scalars['Float']>,
  Web_Order_Number?: Maybe<Scalars['String']>,
  ServiceLevelCode?: Maybe<Scalars['String']>,
  EPBOXWIDTH?: Maybe<Scalars['Float']>,
  EPBOXHEIGHT?: Maybe<Scalars['Float']>,
  EPBOXDEPTH?: Maybe<Scalars['Float']>,
  Weight?: Maybe<Scalars['Int']>,
  Inserted_Date?: Maybe<Scalars['DateTime']>,
  Processed_Date?: Maybe<Scalars['DateTime']>,
  Label_Received_Date?: Maybe<Scalars['DateTime']>,
};

export type XpoLabel = {
   __typename?: 'XpoLabel',
  ID?: Maybe<Scalars['String']>,
  SopNumber: Scalars['String'],
  LabelId: Scalars['String'],
  Folder: Scalars['String'],
  LabelData: Scalars['String'],
  BookingId?: Maybe<Scalars['String']>,
};

export type FindCustomerMutationVariables = {
  searchText: Scalars['String']
};


export type FindCustomerMutation = (
  { __typename?: 'Mutation' }
  & { findCustomer: (
    { __typename?: 'FindCustomerTableResult' }
    & Pick<FindCustomerTableResult, 'totalRows'>
    & { customers: Array<(
      { __typename?: 'CustomerData' }
      & Pick<CustomerData, 'Customer_Name' | 'Customer_Number'>
    )> }
  ) }
);

export type GetProductDataByCategoryFileUrlMutationVariables = {
  category: Scalars['String']
};


export type GetProductDataByCategoryFileUrlMutation = (
  { __typename?: 'Mutation' }
  & { getProductDataByCategoryFileUrl: (
    { __typename?: 'UrlResponse' }
    & Pick<UrlResponse, 'url'>
  ) }
);

export type GetProductDataZipUrlMutationVariables = {};


export type GetProductDataZipUrlMutation = (
  { __typename?: 'Mutation' }
  & { getProductDataZipUrl: (
    { __typename?: 'UrlResponse' }
    & Pick<UrlResponse, 'url'>
  ) }
);

export type DeletePresentationMutationVariables = {
  id: Scalars['Int']
};


export type DeletePresentationMutation = (
  { __typename?: 'Mutation' }
  & { deletePresentation: (
    { __typename?: 'SuccessMessageResponse' }
    & Pick<SuccessMessageResponse, 'success' | 'message'>
  ) }
);

export type FindGroupItemMutationVariables = {
  searchText: Scalars['String'],
  itemClass: Scalars['String']
};


export type FindGroupItemMutation = (
  { __typename?: 'Mutation' }
  & { findGroupItem: (
    { __typename?: 'SalesPresentationItemClassGroup' }
    & Pick<SalesPresentationItemClassGroup, 'kitItem' | 'kitDescription' | 'cubes' | 'DROPSHIP' | 'DROPSHIP_Original' | 'DROPSHIP_CustomPricing' | 'DROPSHIP_M' | 'DROPSHIP_M_Original' | 'DROPSHIP_M_CustomPricing' | 'DROPSHIP_X' | 'DROPSHIP_X_Original' | 'DROPSHIP_X_CustomPricing' | 'FOB' | 'FOB_Original' | 'FOB_CustomPricing' | 'FOB_M' | 'FOB_M_Original' | 'FOB_M_CustomPricing' | 'LEVEL0' | 'LEVEL0_Original' | 'LEVEL0_CustomPricing' | 'LEVEL1' | 'LEVEL1_Original' | 'LEVEL1_CustomPricing' | 'LEVEL2' | 'LEVEL2_Original' | 'LEVEL2_CustomPricing' | 'LEVEL3' | 'LEVEL3_Original' | 'LEVEL3_CustomPricing' | 'MIX_FULL' | 'MIX_FULL_Original' | 'MIX_FULL_CustomPricing' | 'MIX_HALF' | 'MIX_HALF_Original' | 'MIX_HALF_CustomPricing' | 'MIX_QTR' | 'MIX_QTR_Original' | 'MIX_QTR_CustomPricing'>
  ) }
);

export type FindItemClassMutationVariables = {
  searchText: Scalars['String']
};


export type FindItemClassMutation = (
  { __typename?: 'Mutation' }
  & { findItemClass: (
    { __typename?: 'ItemClassWithDescription' }
    & Pick<ItemClassWithDescription, 'itemClass' | 'itemClassDescription' | 'id'>
  ) }
);

export type FindItemNumberMutationVariables = {
  searchText: Scalars['String'],
  itemClass: Scalars['String']
};


export type FindItemNumberMutation = (
  { __typename?: 'Mutation' }
  & { findItemNumber: (
    { __typename?: 'ItemDataReporting' }
    & Pick<ItemDataReporting, 'itemClass' | 'itemNumber' | 'itemDescription' | 'cubes' | 'dimensions' | 'FOB' | 'FOB_M' | 'DROPSHIP' | 'DROPSHIP_M' | 'DROPSHIP_X' | 'LEVEL0' | 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'MIX_FULL' | 'MIX_HALF' | 'MIX_QTR'>
  ) }
);

export type FindKitItemsMutationVariables = {
  searchText: Scalars['String'],
  itemClass: Scalars['String']
};


export type FindKitItemsMutation = (
  { __typename?: 'Mutation' }
  & { findKitItems: Array<(
    { __typename?: 'ItemKitDetail' }
    & Pick<ItemKitDetail, 'kitItem' | 'kitQuantity' | 'kitName' | 'itemNumber' | 'itemDescription' | 'cubes' | 'dimensions' | 'FOB' | 'FOB_M' | 'DROPSHIP' | 'DROPSHIP_M' | 'DROPSHIP_X' | 'LEVEL0' | 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'MIX_FULL' | 'MIX_HALF' | 'MIX_QTR'>
  )> }
);

export type SaveItemClassImagesMutationVariables = {
  data: SalesPresentationItemClassImageInput
};


export type SaveItemClassImagesMutation = (
  { __typename?: 'Mutation' }
  & { saveItemClassImages: (
    { __typename?: 'PresentationSaveImagesResponse' }
    & Pick<PresentationSaveImagesResponse, 'itemClassIndex'>
    & { presentation: (
      { __typename?: 'SalesPresentation' }
      & Pick<SalesPresentation, 'id' | 'userId' | 'name' | 'customerName' | 'customerNumber'>
      & { priceLevels: Array<(
        { __typename?: 'SalesPresentationPriceLevel' }
        & Pick<SalesPresentationPriceLevel, 'id' | 'priceLevel' | 'displayName'>
      )>, itemClasses: Array<(
        { __typename?: 'SalesPresentationItemClass' }
        & Pick<SalesPresentationItemClass, 'id' | 'itemClass' | 'priceAdjustment' | 'cubeAdjustment'>
        & { itemNumbers: Maybe<Array<(
          { __typename?: 'SalesPresentationItemClassItemNumber' }
          & Pick<SalesPresentationItemClassItemNumber, 'itemNumber' | 'itemDescription'>
        )>> }
      )> }
    ), itemClass: Maybe<(
      { __typename?: 'SalesPresentationItemClass' }
      & Pick<SalesPresentationItemClass, 'id' | 'itemClass'>
    )> }
  ) }
);

export type SaveItemNumbersMutationVariables = {
  data: SaveItemNumbersInput
};


export type SaveItemNumbersMutation = (
  { __typename?: 'Mutation' }
  & { saveItemNumbers: (
    { __typename?: 'SalesPresentation' }
    & Pick<SalesPresentation, 'id' | 'userId' | 'name' | 'customerName' | 'customerNumber'>
    & { priceLevels: Array<(
      { __typename?: 'SalesPresentationPriceLevel' }
      & Pick<SalesPresentationPriceLevel, 'id' | 'priceLevel' | 'displayName'>
    )>, itemClasses: Array<(
      { __typename?: 'SalesPresentationItemClass' }
      & Pick<SalesPresentationItemClass, 'id' | 'itemClass' | 'priceAdjustment' | 'cubeAdjustment'>
      & { itemNumbers: Maybe<Array<(
        { __typename?: 'SalesPresentationItemClassItemNumber' }
        & Pick<SalesPresentationItemClassItemNumber, 'itemNumber' | 'itemDescription'>
      )>> }
    )> }
  ) }
);

export type SaveSalesPresentationMutationVariables = {
  data: SalesPresentationInput
};


export type SaveSalesPresentationMutation = (
  { __typename?: 'Mutation' }
  & { saveSalesPresentation: (
    { __typename?: 'SalesPresentation' }
    & Pick<SalesPresentation, 'id' | 'userId' | 'name' | 'customerName' | 'customerNumber'>
    & { priceLevels: Array<(
      { __typename?: 'SalesPresentationPriceLevel' }
      & Pick<SalesPresentationPriceLevel, 'id' | 'priceLevel' | 'displayName'>
    )>, itemClasses: Array<(
      { __typename?: 'SalesPresentationItemClass' }
      & Pick<SalesPresentationItemClass, 'id' | 'itemClass' | 'priceAdjustment' | 'cubeAdjustment'>
      & { itemNumbers: Maybe<Array<(
        { __typename?: 'SalesPresentationItemClassItemNumber' }
        & Pick<SalesPresentationItemClassItemNumber, 'itemNumber' | 'itemDescription'>
      )>> }
    )> }
  ) }
);

export type SaveStep2MutationVariables = {
  data: SalesPresentationStep2Input
};


export type SaveStep2Mutation = (
  { __typename?: 'Mutation' }
  & { saveStep2: (
    { __typename?: 'SalesPresentation' }
    & Pick<SalesPresentation, 'id' | 'userId' | 'name' | 'customerName' | 'customerNumber'>
    & { priceLevels: Array<(
      { __typename?: 'SalesPresentationPriceLevel' }
      & Pick<SalesPresentationPriceLevel, 'id' | 'priceLevel' | 'displayName'>
    )>, itemClasses: Array<(
      { __typename?: 'SalesPresentationItemClass' }
      & Pick<SalesPresentationItemClass, 'id' | 'itemClass' | 'priceAdjustment' | 'cubeAdjustment'>
      & { itemNumbers: Maybe<Array<(
        { __typename?: 'SalesPresentationItemClassItemNumber' }
        & Pick<SalesPresentationItemClassItemNumber, 'itemNumber' | 'itemDescription'>
      )>> }
    )> }
  ) }
);

export type AddTruckItemsMutationVariables = {
  data: AddTruckItemsArgs
};


export type AddTruckItemsMutation = (
  { __typename?: 'Mutation' }
  & { addTruckItems: (
    { __typename?: 'TruckItems' }
    & Pick<TruckItems, 'status'>
    & { stockItems: Array<(
      { __typename?: 'InTransitWithCubes' }
      & Pick<InTransitWithCubes, 'OrderDocumentId' | 'ItemNumber' | 'Status' | 'OrderDate' | 'LocationCode' | 'TransferLocation' | 'TransferQuantity' | 'EpCubes' | 'CubesExtended'>
    )>, orderItems: Array<(
      { __typename?: 'TruckItemOrderItem' }
      & Pick<TruckItemOrderItem, 'SopNumber'>
      & { orderItems: Array<(
        { __typename?: 'InTransitWithCubes' }
        & Pick<InTransitWithCubes, 'OrderDocumentId' | 'ItemNumber' | 'Status' | 'OrderDate' | 'LocationCode' | 'TransferLocation' | 'TransferQuantity' | 'EpCubes' | 'CubesExtended' | 'SopDocDate' | 'SopNumber'>
      )> }
    )> }
  ) }
);

export type FindTruckItemsMutationVariables = {
  data: FindTruckItemsArgs
};


export type FindTruckItemsMutation = (
  { __typename?: 'Mutation' }
  & { findTruckItems: (
    { __typename?: 'TruckItems' }
    & Pick<TruckItems, 'status' | 'transferLocation' | 'locationCode'>
    & { stockItems: Array<(
      { __typename?: 'InTransitWithCubes' }
      & Pick<InTransitWithCubes, 'OrderDocumentId' | 'ItemNumber' | 'Status' | 'OrderDate' | 'LocationCode' | 'TransferLocation' | 'TransferQuantity' | 'EpCubes' | 'CubesExtended' | 'LNITMSEQ'>
    )>, orderItems: Array<(
      { __typename?: 'TruckItemOrderItem' }
      & Pick<TruckItemOrderItem, 'SopNumber'>
      & { orderItems: Array<(
        { __typename?: 'InTransitWithCubes' }
        & Pick<InTransitWithCubes, 'OrderDocumentId' | 'ItemNumber' | 'Status' | 'OrderDate' | 'LocationCode' | 'TransferLocation' | 'TransferQuantity' | 'EpCubes' | 'CubesExtended' | 'SopDocDate' | 'SopNumber' | 'LNITMSEQ'>
      )> }
    )> }
  ) }
);

export type TransferItemsMutationVariables = {
  args: TransferFromArgs
};


export type TransferItemsMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'transferItems'>
);

export type UpdateQuantityStockItemsTruckMutationVariables = {
  args: UpdateQuantityArgs
};


export type UpdateQuantityStockItemsTruckMutation = (
  { __typename?: 'Mutation' }
  & { updateQuantityStockItemsTruck: (
    { __typename?: 'UpdateQuantityResponse' }
    & { data: Array<(
      { __typename?: 'UpdateQuantityItem' }
      & { svc00701: (
        { __typename?: 'Svc00701' }
        & Pick<Svc00701, 'TransferQuantity' | 'QuantityFulfilled'>
      ), svc00712: (
        { __typename?: 'Svc00712' }
        & Pick<Svc00712, 'Quantity'>
      ), svc00731: (
        { __typename?: 'Svc00731' }
        & Pick<Svc00731, 'DEBITAMT' | 'CRDTAMNT' | 'ORDBTAMT' | 'ORCRDAMT'>
      ) }
    )> }
  ) }
);

export type SaveUserJobMutationVariables = {
  data: UserJobInput
};


export type SaveUserJobMutation = (
  { __typename?: 'Mutation' }
  & { saveUserJob: (
    { __typename?: 'UserJob' }
    & Pick<UserJob, 'id' | 'userId' | 'vendorId' | 'fileType' | 'inProgress' | 'status'>
    & { userJobCategories: Maybe<Array<(
      { __typename?: 'UserJobCategory' }
      & Pick<UserJobCategory, 'id' | 'userJobId' | 'category' | 'filePath' | 'downloaded' | 'available' | 'created'>
      & { userJobCategoryItemClasses: Maybe<Array<(
        { __typename?: 'UserJobCategoryItemClass' }
        & Pick<UserJobCategoryItemClass, 'id' | 'userJobCategoryId' | 'itemClass'>
      )>> }
    )>> }
  ) }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type SaveUserMutationVariables = {
  data: UserInput
};


export type SaveUserMutation = (
  { __typename?: 'Mutation' }
  & { saveUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'fullName' | 'email' | 'active' | 'role'>
    & { vendor: Maybe<(
      { __typename?: 'Vendor' }
      & Pick<Vendor, 'id' | 'name' | 'logo'>
    )> }
  ) }
);

export type SaveVendorMutationVariables = {
  data: VendorInput
};


export type SaveVendorMutation = (
  { __typename?: 'Mutation' }
  & { saveVendor: (
    { __typename?: 'Vendor' }
    & Pick<Vendor, 'id' | 'name' | 'logo'>
    & { vendorCategories: Maybe<Array<(
      { __typename?: 'VendorCategory' }
      & Pick<VendorCategory, 'id' | 'vendorId' | 'category'>
      & { itemClasses: Maybe<Array<(
        { __typename?: 'VendorCategoryItemClass' }
        & Pick<VendorCategoryItemClass, 'id' | 'vendorId' | 'vendorCategoryId' | 'itemClass'>
      )>> }
    )>> }
  ) }
);

export type CancelShipmentMutationVariables = {
  sopNumber: Scalars['String']
};


export type CancelShipmentMutation = (
  { __typename?: 'Mutation' }
  & { cancelShipment: (
    { __typename?: 'SuccessMessageResponse' }
    & Pick<SuccessMessageResponse, 'success' | 'message'>
  ) }
);

export type ReprintLabelsMutationVariables = {
  sopNumber: Scalars['String']
};


export type ReprintLabelsMutation = (
  { __typename?: 'Mutation' }
  & { reprintLabels: (
    { __typename?: 'SuccessMessageResponse' }
    & Pick<SuccessMessageResponse, 'success' | 'message'>
  ) }
);

export type TransferShipmentLocationMutationVariables = {
  SopNumber: Scalars['String'],
  NewLocation: Scalars['String'],
  ForceUpdate?: Maybe<Scalars['Boolean']>,
  UpdateReadyDate?: Maybe<Scalars['Boolean']>
};


export type TransferShipmentLocationMutation = (
  { __typename?: 'Mutation' }
  & { transferShipmentLocation: (
    { __typename?: 'SuccessMessageResponse' }
    & Pick<SuccessMessageResponse, 'success' | 'message'>
  ) }
);

export type GetItemClassesForCategoriesQueryVariables = {
  categories: Array<Scalars['String']>
};


export type GetItemClassesForCategoriesQuery = (
  { __typename?: 'Query' }
  & { getItemClassesForCategories: (
    { __typename?: 'CategoryItemClassGrouped' }
    & { groups: Maybe<Array<(
      { __typename?: 'CategoryItemClassGroup' }
      & Pick<CategoryItemClassGroup, 'category'>
      & { itemClasses: Maybe<Array<(
        { __typename?: 'CategoryItemClass' }
        & Pick<CategoryItemClass, 'category' | 'itemClass' | 'itemClassDescription'>
      )>> }
    )>> }
  ) }
);

export type Unnamed_1_QueryVariables = {};


export type Unnamed_1_Query = (
  { __typename?: 'Query' }
  & { getItemClassesForCategoriesForUser: (
    { __typename?: 'CategoryItemClassGrouped' }
    & { groups: Maybe<Array<(
      { __typename?: 'CategoryItemClassGroup' }
      & Pick<CategoryItemClassGroup, 'category'>
      & { itemClasses: Maybe<Array<(
        { __typename?: 'CategoryItemClass' }
        & Pick<CategoryItemClass, 'itemClass' | 'itemClassDescription' | 'category'>
      )>> }
    )>> }
  ) }
);

export type GetProductDataFileUrlQueryVariables = {};


export type GetProductDataFileUrlQuery = (
  { __typename?: 'Query' }
  & { getProductDataFileUrl: (
    { __typename?: 'UrlResponse' }
    & Pick<UrlResponse, 'url'>
  ) }
);

export type ProductDataByCategoryQueryVariables = {
  category: Scalars['String']
};


export type ProductDataByCategoryQuery = (
  { __typename?: 'Query' }
  & { productDataByCategory: Array<(
    { __typename?: 'ProductData' }
    & Pick<ProductData, 'Item_Number' | 'Item_Class' | 'Item_Class_Description' | 'Item_Description' | 'Box_Width' | 'Box_Depth' | 'Box_Height' | 'Width' | 'Depth' | 'Height' | 'Cartons' | 'Weight' | 'Origin' | 'Status' | 'Category' | 'Web_Exclude' | 'Wood' | 'Finish' | 'Item_Style' | 'Publish_To_Web' | 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12' | 'F13' | 'F14' | 'F15' | 'Feature_1' | 'Feature_2' | 'Feature_3' | 'Feature_4' | 'Feature_5' | 'Feature_6' | 'Feature_7' | 'Feature_8' | 'Item_Class_Status' | 'Full_Item_Class_Name' | 'Combined_Dimensions' | 'UPC_Code' | 'Finish_Category' | 'Small_Parcel' | 'Box_Dimension_Combined' | 'Story' | 'Image_1' | 'Image_2' | 'Image_3' | 'Image_4' | 'Image_6' | 'Image_7' | 'Image_8' | 'Image_9' | 'Image_10'>
  )> }
);

export type ProductDataByCategoryForUserJobQueryVariables = {
  category: Scalars['String']
};


export type ProductDataByCategoryForUserJobQuery = (
  { __typename?: 'Query' }
  & { productDataByCategoryForUserJob: Array<(
    { __typename?: 'ProductData' }
    & Pick<ProductData, 'Item_Number' | 'Item_Class' | 'Item_Class_Description' | 'Item_Description' | 'Box_Width' | 'Box_Depth' | 'Box_Height' | 'Width' | 'Depth' | 'Height' | 'Cartons' | 'Weight' | 'Origin' | 'Status' | 'Category' | 'Web_Exclude' | 'Wood' | 'Finish' | 'Item_Style' | 'Publish_To_Web' | 'F1' | 'F2' | 'F3' | 'F4' | 'F5' | 'F6' | 'F7' | 'F8' | 'F9' | 'F10' | 'F11' | 'F12' | 'F13' | 'F14' | 'F15' | 'Feature_1' | 'Feature_2' | 'Feature_3' | 'Feature_4' | 'Feature_5' | 'Feature_6' | 'Feature_7' | 'Feature_8' | 'Item_Class_Status' | 'Full_Item_Class_Name' | 'Combined_Dimensions' | 'UPC_Code' | 'Finish_Category' | 'Small_Parcel' | 'Box_Dimension_Combined' | 'Story' | 'Image_1' | 'Image_2' | 'Image_3' | 'Image_4' | 'Image_6' | 'Image_7' | 'Image_8' | 'Image_9' | 'Image_10'>
  )> }
);

export type PresentationByIdQueryVariables = {
  id: Scalars['Int']
};


export type PresentationByIdQuery = (
  { __typename?: 'Query' }
  & { presentationById: (
    { __typename?: 'SalesPresentation' }
    & Pick<SalesPresentation, 'id' | 'userId' | 'name' | 'customerName' | 'customerNumber'>
    & { priceLevels: Array<(
      { __typename?: 'SalesPresentationPriceLevel' }
      & Pick<SalesPresentationPriceLevel, 'id' | 'priceLevel' | 'displayName'>
    )>, itemClasses: Array<(
      { __typename?: 'SalesPresentationItemClass' }
      & Pick<SalesPresentationItemClass, 'id' | 'itemClass' | 'itemClassDescription'>
      & { itemNumbers: Maybe<Array<(
        { __typename?: 'SalesPresentationItemClassItemNumber' }
        & Pick<SalesPresentationItemClassItemNumber, 'id' | 'salesPresentationId' | 'itemNumber' | 'FOB' | 'FOB_M' | 'DROPSHIP' | 'DROPSHIP_M' | 'DROPSHIP_X' | 'LEVEL0' | 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'MIX_FULL' | 'MIX_HALF' | 'MIX_QTR'>
      )>> }
    )> }
  ) }
);

export type PresentationByIdAndRelatedQueryVariables = {
  id: Scalars['Int'],
  itemClassIndex: Scalars['Int']
};


export type PresentationByIdAndRelatedQuery = (
  { __typename?: 'Query' }
  & { presentationByIdAndRelated: (
    { __typename?: 'SalesPresentationAndRelated' }
    & Pick<SalesPresentationAndRelated, 'anyUnsavedItemClasses' | 'itemClassIndex'>
    & { presentation: (
      { __typename?: 'SalesPresentation' }
      & Pick<SalesPresentation, 'id' | 'userId' | 'name' | 'customerName' | 'customerNumber'>
      & { priceLevels: Array<(
        { __typename?: 'SalesPresentationPriceLevel' }
        & Pick<SalesPresentationPriceLevel, 'id' | 'salesPresentationId' | 'priceLevel' | 'displayName'>
      )>, itemClasses: Array<(
        { __typename?: 'SalesPresentationItemClass' }
        & Pick<SalesPresentationItemClass, 'id' | 'itemClass' | 'itemClassDescription'>
      )> }
    ), presentationItemClass: (
      { __typename?: 'SalesPresentationItemClass' }
      & Pick<SalesPresentationItemClass, 'id' | 'salesPresentationId' | 'itemClass' | 'itemClassDescription' | 'priceAdjustment' | 'priceAdjustmentTo' | 'cubeAdjustment' | 'cubeAdjustmentTo' | 'hasBeenSaved' | 'DROPSHIP' | 'DROPSHIP_M' | 'DROPSHIP_X' | 'FOB' | 'FOB_M' | 'LEVEL0' | 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'MIX_FULL' | 'MIX_HALF' | 'MIX_QTR'>
    ), presentationItemClassItemNumbers: Maybe<Array<(
      { __typename?: 'SalesPresentationItemClassItemNumber' }
      & Pick<SalesPresentationItemClassItemNumber, 'id' | 'salesPresentationId' | 'salesPresentationItemClassId' | 'displayOrder' | 'itemNumber' | 'itemDescription' | 'cubes' | 'dimensions' | 'DROPSHIP' | 'DROPSHIP_Original' | 'DROPSHIP_CustomPricing' | 'DROPSHIP_M' | 'DROPSHIP_M_Original' | 'DROPSHIP_M_CustomPricing' | 'DROPSHIP_X' | 'DROPSHIP_X_Original' | 'DROPSHIP_X_CustomPricing' | 'FOB' | 'FOB_Original' | 'FOB_CustomPricing' | 'FOB_M' | 'FOB_M_Original' | 'FOB_M_CustomPricing' | 'LEVEL0' | 'LEVEL0_Original' | 'LEVEL0_CustomPricing' | 'LEVEL1' | 'LEVEL1_Original' | 'LEVEL1_CustomPricing' | 'LEVEL2' | 'LEVEL2_Original' | 'LEVEL2_CustomPricing' | 'LEVEL3' | 'LEVEL3_Original' | 'LEVEL3_CustomPricing' | 'MIX_FULL' | 'MIX_FULL_Original' | 'MIX_FULL_CustomPricing' | 'MIX_HALF' | 'MIX_HALF_Original' | 'MIX_HALF_CustomPricing' | 'MIX_QTR' | 'MIX_QTR_Original' | 'MIX_QTR_CustomPricing'>
    )>>, presentationItemClassKits: Maybe<Array<(
      { __typename?: 'KitItemsResult' }
      & Pick<KitItemsResult, 'kitItem' | 'displayOrder'>
      & { kitItems: Array<(
        { __typename?: 'SalesPresentationItemClassKit' }
        & Pick<SalesPresentationItemClassKit, 'id' | 'salesPresentationId' | 'salesPresentationItemClassId' | 'itemNumber' | 'itemDescription' | 'kitName' | 'kitItem' | 'kitQuantity' | 'cubes' | 'dimensions' | 'DROPSHIP' | 'DROPSHIP_Original' | 'DROPSHIP_CustomPricing' | 'DROPSHIP_M' | 'DROPSHIP_M_Original' | 'DROPSHIP_M_CustomPricing' | 'DROPSHIP_X' | 'DROPSHIP_X_Original' | 'DROPSHIP_X_CustomPricing' | 'FOB' | 'FOB_Original' | 'FOB_CustomPricing' | 'FOB_M' | 'FOB_M_Original' | 'FOB_M_CustomPricing' | 'LEVEL0' | 'LEVEL0_Original' | 'LEVEL0_CustomPricing' | 'LEVEL1' | 'LEVEL1_Original' | 'LEVEL1_CustomPricing' | 'LEVEL2' | 'LEVEL2_Original' | 'LEVEL2_CustomPricing' | 'LEVEL3' | 'LEVEL3_Original' | 'LEVEL3_CustomPricing' | 'MIX_FULL' | 'MIX_FULL_Original' | 'MIX_FULL_CustomPricing' | 'MIX_HALF' | 'MIX_HALF_Original' | 'MIX_HALF_CustomPricing' | 'MIX_QTR' | 'MIX_QTR_Original' | 'MIX_QTR_CustomPricing'>
      )> }
    )>>, presentationItemClassGroups: Maybe<Array<(
      { __typename?: 'SalesPresentationItemClassGroup' }
      & Pick<SalesPresentationItemClassGroup, 'id' | 'salesPresentationId' | 'salesPresentationItemClassId' | 'displayOrder' | 'kitItem' | 'kitDescription' | 'cubes' | 'DROPSHIP' | 'DROPSHIP_Original' | 'DROPSHIP_CustomPricing' | 'DROPSHIP_M' | 'DROPSHIP_M_Original' | 'DROPSHIP_M_CustomPricing' | 'DROPSHIP_X' | 'DROPSHIP_X_Original' | 'DROPSHIP_X_CustomPricing' | 'FOB' | 'FOB_Original' | 'FOB_CustomPricing' | 'FOB_M' | 'FOB_M_Original' | 'FOB_M_CustomPricing' | 'LEVEL0' | 'LEVEL0_Original' | 'LEVEL0_CustomPricing' | 'LEVEL1' | 'LEVEL1_Original' | 'LEVEL1_CustomPricing' | 'LEVEL2' | 'LEVEL2_Original' | 'LEVEL2_CustomPricing' | 'LEVEL3' | 'LEVEL3_Original' | 'LEVEL3_CustomPricing' | 'MIX_FULL' | 'MIX_FULL_Original' | 'MIX_FULL_CustomPricing' | 'MIX_HALF' | 'MIX_HALF_Original' | 'MIX_HALF_CustomPricing' | 'MIX_QTR' | 'MIX_QTR_Original' | 'MIX_QTR_CustomPricing'>
    )>> }
  ) }
);

export type PresentationByIdAndPhotosQueryVariables = {
  id: Scalars['Int'],
  itemClassIndex: Scalars['Int']
};


export type PresentationByIdAndPhotosQuery = (
  { __typename?: 'Query' }
  & { presentationByIdAndPhotos: (
    { __typename?: 'PresentationAndProductData' }
    & Pick<PresentationAndProductData, 'itemClassIndex'>
    & { productData: Array<(
      { __typename?: 'ProductData' }
      & Pick<ProductData, 'Item_Class' | 'Item_Number' | 'Item_Description' | 'Image_1' | 'Image_2' | 'Image_3' | 'Image_4' | 'Image_5' | 'Image_6' | 'Image_7' | 'Image_8' | 'Image_9' | 'Image_10' | 'Image_11' | 'Image_12' | 'Image_13' | 'Image_14' | 'Image_15' | 'Image_16' | 'Image_17' | 'Image_18' | 'Image_19' | 'Image_20'>
    )>, presentation: (
      { __typename?: 'SalesPresentation' }
      & Pick<SalesPresentation, 'id' | 'name' | 'customerName'>
      & { itemClasses: Array<(
        { __typename?: 'SalesPresentationItemClass' }
        & Pick<SalesPresentationItemClass, 'id' | 'itemClass' | 'itemClassDescription' | 'hasBeenSaved'>
      )> }
    ), itemClass: (
      { __typename?: 'SalesPresentationItemClass' }
      & Pick<SalesPresentationItemClass, 'id' | 'itemClass' | 'itemClassDescription'>
    ), presentationImages: Array<(
      { __typename?: 'SalesPresentationItemClassImageItem' }
      & Pick<SalesPresentationItemClassImageItem, 'itemNumber' | 'imageUrl' | 'imageIndex'>
    )> }
  ) }
);

export type PresentationPdfDataQueryVariables = {
  id: Scalars['Int']
};


export type PresentationPdfDataQuery = (
  { __typename?: 'Query' }
  & { presentationPdfData: (
    { __typename?: 'SalesPresentationPdfData' }
    & { presentation: (
      { __typename?: 'SalesPresentation' }
      & Pick<SalesPresentation, 'id' | 'name' | 'customerName'>
      & { priceLevels: Array<(
        { __typename?: 'SalesPresentationPriceLevel' }
        & Pick<SalesPresentationPriceLevel, 'id' | 'priceLevel' | 'displayName'>
      )>, itemClasses: Array<(
        { __typename?: 'SalesPresentationItemClass' }
        & Pick<SalesPresentationItemClass, 'id' | 'itemClass' | 'itemClassDescription' | 'DROPSHIP' | 'DROPSHIP_M' | 'DROPSHIP_X' | 'FOB' | 'FOB_M' | 'LEVEL0' | 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'MIX_FULL' | 'MIX_HALF' | 'MIX_QTR'>
      )> }
    ), items: Maybe<Array<(
      { __typename?: 'PresentationPdfItemClass' }
      & { itemClass: (
        { __typename?: 'SalesPresentationItemClass' }
        & Pick<SalesPresentationItemClass, 'id' | 'itemClass' | 'itemClassDescription' | 'DROPSHIP' | 'DROPSHIP_M' | 'DROPSHIP_X' | 'FOB' | 'FOB_M' | 'LEVEL0' | 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'MIX_FULL' | 'MIX_HALF' | 'MIX_QTR'>
      ), itemClassFeatures: (
        { __typename?: 'ItemClassData' }
        & Pick<ItemClassData, 'itemClass' | 'itemClassDescription' | 'category' | 'Feature_1' | 'Feature_2' | 'Feature_3' | 'Feature_4' | 'Feature_5' | 'Feature_6' | 'Feature_7' | 'Feature_8' | 'Feature_9' | 'Feature_10' | 'Feature_11' | 'Feature_12' | 'Feature_13' | 'Feature_14' | 'Feature_15'>
      ), itemClassKits: Maybe<Array<(
        { __typename?: 'SalesPresentationPdfKitRows' }
        & Pick<SalesPresentationPdfKitRows, 'itemNumber' | 'itemDescription'>
        & { items: Maybe<Array<(
          { __typename?: 'SalesPresentationPdfRows' }
          & Pick<SalesPresentationPdfRows, 'itemNumber' | 'itemDescription' | 'cubes' | 'kitQuantity' | 'dimensions' | 'DROPSHIP' | 'DROPSHIP_M' | 'DROPSHIP_X' | 'FOB' | 'FOB_M' | 'LEVEL0' | 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'MIX_FULL' | 'MIX_HALF' | 'MIX_QTR'>
        )>> }
      )>>, itemClassItemNumbers: Maybe<Array<(
        { __typename?: 'SalesPresentationPdfRows' }
        & Pick<SalesPresentationPdfRows, 'itemNumber' | 'itemDescription' | 'cubes' | 'dimensions' | 'DROPSHIP' | 'DROPSHIP_M' | 'DROPSHIP_X' | 'FOB' | 'FOB_M' | 'LEVEL0' | 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'MIX_FULL' | 'MIX_HALF' | 'MIX_QTR'>
      )>>, itemClassGroups: Maybe<Array<(
        { __typename?: 'SalesPresentationPdfRows' }
        & Pick<SalesPresentationPdfRows, 'itemNumber' | 'itemDescription' | 'cubes' | 'DROPSHIP' | 'DROPSHIP_M' | 'DROPSHIP_X' | 'FOB' | 'FOB_M' | 'LEVEL0' | 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'MIX_FULL' | 'MIX_HALF' | 'MIX_QTR'>
      )>>, itemClassImages: Maybe<Array<(
        { __typename?: 'SalesPresentationItemClassImageItem' }
        & Pick<SalesPresentationItemClassImageItem, 'itemNumber' | 'imageUrl' | 'imageIndex'>
      )>> }
    )>> }
  ) }
);

export type SalesPresentationsQueryVariables = {
  searchText?: Maybe<Scalars['String']>
};


export type SalesPresentationsQuery = (
  { __typename?: 'Query' }
  & { salesPresentations: (
    { __typename?: 'SalesPresentationTableResult' }
    & Pick<SalesPresentationTableResult, 'totalRows'>
    & { presentations: Array<(
      { __typename?: 'SalesPresentation' }
      & Pick<SalesPresentation, 'id' | 'name' | 'customerName'>
    )> }
  ) }
);

export type GetUserJobAndFileUrlQueryVariables = {};


export type GetUserJobAndFileUrlQuery = (
  { __typename?: 'Query' }
  & { getUserJobForUserWizardCompleted: (
    { __typename?: 'UserJob' }
    & Pick<UserJob, 'id' | 'userId' | 'vendorId' | 'uuid' | 'fileType' | 'inProgress' | 'status' | 'created'>
    & { userJobCategories: Maybe<Array<(
      { __typename?: 'UserJobCategory' }
      & Pick<UserJobCategory, 'id' | 'userJobId' | 'category' | 'filePath' | 'downloaded' | 'available'>
      & { userJobCategoryItemClasses: Maybe<Array<(
        { __typename?: 'UserJobCategoryItemClass' }
        & Pick<UserJobCategoryItemClass, 'id' | 'userJobCategoryId' | 'itemClass' | 'itemClassDescription'>
      )>> }
    )>> }
  ), getProductDataFileUrl: (
    { __typename?: 'UrlResponse' }
    & Pick<UrlResponse, 'url'>
  ) }
);

export type GetUserJobAndItemClassesQueryVariables = {};


export type GetUserJobAndItemClassesQuery = (
  { __typename?: 'Query' }
  & { getUserJobForUserInProgress: (
    { __typename?: 'UserJob' }
    & Pick<UserJob, 'id' | 'userId' | 'vendorId' | 'uuid' | 'fileType' | 'inProgress' | 'status' | 'created'>
    & { userJobCategories: Maybe<Array<(
      { __typename?: 'UserJobCategory' }
      & Pick<UserJobCategory, 'id' | 'userJobId' | 'category' | 'filePath' | 'downloaded' | 'available'>
      & { userJobCategoryItemClasses: Maybe<Array<(
        { __typename?: 'UserJobCategoryItemClass' }
        & Pick<UserJobCategoryItemClass, 'id' | 'userJobCategoryId' | 'itemClass' | 'itemClassDescription'>
      )>> }
    )>> }
  ), getItemClassesForCategoriesForUser: (
    { __typename?: 'CategoryItemClassGrouped' }
    & { groups: Maybe<Array<(
      { __typename?: 'CategoryItemClassGroup' }
      & Pick<CategoryItemClassGroup, 'category'>
      & { itemClasses: Maybe<Array<(
        { __typename?: 'CategoryItemClass' }
        & Pick<CategoryItemClass, 'itemClass' | 'itemClassDescription' | 'category'>
      )>> }
    )>> }
  ) }
);

export type GetUserJobAndVendorCategoriesQueryVariables = {};


export type GetUserJobAndVendorCategoriesQuery = (
  { __typename?: 'Query' }
  & { getUserJobForUserInProgress: (
    { __typename?: 'UserJob' }
    & Pick<UserJob, 'id' | 'userId' | 'vendorId' | 'uuid' | 'fileType' | 'inProgress' | 'status' | 'created'>
    & { userJobCategories: Maybe<Array<(
      { __typename?: 'UserJobCategory' }
      & Pick<UserJobCategory, 'userJobId' | 'category' | 'filePath' | 'downloaded' | 'available'>
      & { userJobCategoryItemClasses: Maybe<Array<(
        { __typename?: 'UserJobCategoryItemClass' }
        & Pick<UserJobCategoryItemClass, 'id' | 'userJobCategoryId' | 'itemClass' | 'itemClassDescription'>
      )>> }
    )>> }
  ), vendorCategoriesForUser: Maybe<Array<(
    { __typename?: 'VendorCategory' }
    & Pick<VendorCategory, 'category'>
  )>> }
);

export type GetUserJobsForUserQueryVariables = {};


export type GetUserJobsForUserQuery = (
  { __typename?: 'Query' }
  & { getUserJobsForUser: Array<(
    { __typename?: 'UserJob' }
    & Pick<UserJob, 'id' | 'userId' | 'vendorId' | 'uuid' | 'fileType' | 'inProgress' | 'status' | 'created'>
    & { userJobCategories: Maybe<Array<(
      { __typename?: 'UserJobCategory' }
      & Pick<UserJobCategory, 'id' | 'userJobId' | 'category' | 'filePath' | 'downloaded' | 'available'>
      & { userJobCategoryItemClasses: Maybe<Array<(
        { __typename?: 'UserJobCategoryItemClass' }
        & Pick<UserJobCategoryItemClass, 'id' | 'userJobCategoryId' | 'itemClass' | 'itemClassDescription'>
      )>> }
    )>> }
  )> }
);

export type GetUserJobForUserInProgressQueryVariables = {};


export type GetUserJobForUserInProgressQuery = (
  { __typename?: 'Query' }
  & { getUserJobForUserInProgress: (
    { __typename?: 'UserJob' }
    & Pick<UserJob, 'id' | 'userId' | 'vendorId' | 'uuid' | 'fileType' | 'inProgress' | 'status' | 'created'>
    & { userJobCategories: Maybe<Array<(
      { __typename?: 'UserJobCategory' }
      & Pick<UserJobCategory, 'id' | 'userJobId' | 'category' | 'filePath' | 'downloaded' | 'available'>
      & { userJobCategoryItemClasses: Maybe<Array<(
        { __typename?: 'UserJobCategoryItemClass' }
        & Pick<UserJobCategoryItemClass, 'id' | 'userJobCategoryId' | 'itemClass' | 'itemClassDescription'>
      )>> }
    )>> }
  ) }
);

export type MeAndVendorsForSelectionQueryVariables = {};


export type MeAndVendorsForSelectionQuery = (
  { __typename?: 'Query' }
  & { getMe: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'firstName' | 'lastName' | 'fullName' | 'email' | 'active' | 'alertProductAdded' | 'alertProductDiscontinued' | 'alertProductUpdated' | 'alertEmail' | 'vendorId'>
    & { vendor: Maybe<(
      { __typename?: 'Vendor' }
      & Pick<Vendor, 'id' | 'name' | 'logo'>
    )>, userRoles: Maybe<Array<(
      { __typename?: 'UserRole' }
      & Pick<UserRole, 'id' | 'role'>
    )>> }
  )>, vendors: (
    { __typename?: 'VendorsResponse' }
    & { vendors: Array<(
      { __typename?: 'Vendor' }
      & Pick<Vendor, 'id' | 'name'>
    )> }
  ) }
);

export type UserByIdAndVendorsForSelectionQueryVariables = {
  id: Scalars['Int']
};


export type UserByIdAndVendorsForSelectionQuery = (
  { __typename?: 'Query' }
  & { userById: (
    { __typename?: 'GetUserWithRoles' }
    & Pick<GetUserWithRoles, 'id' | 'firstName' | 'lastName' | 'email' | 'active' | 'alertProductAdded' | 'alertProductDiscontinued' | 'alertProductUpdated' | 'alertEmail' | 'userRoles'>
    & { vendor: Maybe<(
      { __typename?: 'Vendor' }
      & Pick<Vendor, 'id' | 'name' | 'logo'>
    )> }
  ), vendors: (
    { __typename?: 'VendorsResponse' }
    & { vendors: Array<(
      { __typename?: 'Vendor' }
      & Pick<Vendor, 'id' | 'name'>
    )> }
  ) }
);

export type VendorByIdQueryVariables = {
  id: Scalars['Int']
};


export type VendorByIdQuery = (
  { __typename?: 'Query' }
  & { vendorById: (
    { __typename?: 'Vendor' }
    & Pick<Vendor, 'id' | 'name' | 'logo'>
    & { vendorCategories: Maybe<Array<(
      { __typename?: 'VendorCategory' }
      & Pick<VendorCategory, 'id' | 'category'>
      & { itemClasses: Maybe<Array<(
        { __typename?: 'VendorCategoryItemClass' }
        & Pick<VendorCategoryItemClass, 'id' | 'itemClass'>
      )>> }
    )>> }
  ) }
);

export type VendorByIdAndItemClassesQueryVariables = {
  id: Scalars['Int'],
  categories: Array<Scalars['String']>
};


export type VendorByIdAndItemClassesQuery = (
  { __typename?: 'Query' }
  & { vendorById: (
    { __typename?: 'Vendor' }
    & Pick<Vendor, 'id' | 'name' | 'logo'>
    & { vendorCategories: Maybe<Array<(
      { __typename?: 'VendorCategory' }
      & Pick<VendorCategory, 'id' | 'vendorId' | 'category'>
      & { itemClasses: Maybe<Array<(
        { __typename?: 'VendorCategoryItemClass' }
        & Pick<VendorCategoryItemClass, 'id' | 'vendorId' | 'vendorCategoryId' | 'itemClass'>
      )>> }
    )>> }
  ), getItemClassesForCategories: (
    { __typename?: 'CategoryItemClassGrouped' }
    & { groups: Maybe<Array<(
      { __typename?: 'CategoryItemClassGroup' }
      & Pick<CategoryItemClassGroup, 'category'>
      & { itemClasses: Maybe<Array<(
        { __typename?: 'CategoryItemClass' }
        & Pick<CategoryItemClass, 'category' | 'itemClass' | 'itemClassDescription'>
      )>> }
    )>> }
  ) }
);

export type VendorCategoriesForUserQueryVariables = {};


export type VendorCategoriesForUserQuery = (
  { __typename?: 'Query' }
  & { vendorCategoriesForUser: Maybe<Array<(
    { __typename?: 'VendorCategory' }
    & Pick<VendorCategory, 'category'>
  )>> }
);

export type XpoRowsBySopNumberQueryVariables = {
  sopNumber: Scalars['String']
};


export type XpoRowsBySopNumberQuery = (
  { __typename?: 'Query' }
  & { xpoRowsBySopNumber: Array<(
    { __typename?: 'Xpo' }
    & Pick<Xpo, 'SopNumber' | 'AdditionalPO' | 'ServiceLevelCode' | 'OrderLocationCode' | 'ShipToName' | 'Address1' | 'Address2' | 'Address3' | 'City' | 'State' | 'ZipCode'>
  )> }
);


export const FindCustomerDocument = gql`
    mutation findCustomer($searchText: String!) {
  findCustomer(searchText: $searchText) {
    customers {
      Customer_Name
      Customer_Number
    }
    totalRows
  }
}
    `;
export type FindCustomerMutationFn = ApolloReactCommon.MutationFunction<FindCustomerMutation, FindCustomerMutationVariables>;

/**
 * __useFindCustomerMutation__
 *
 * To run a mutation, you first call `useFindCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFindCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [findCustomerMutation, { data, loading, error }] = useFindCustomerMutation({
 *   variables: {
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useFindCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FindCustomerMutation, FindCustomerMutationVariables>) {
        return ApolloReactHooks.useMutation<FindCustomerMutation, FindCustomerMutationVariables>(FindCustomerDocument, baseOptions);
      }
export type FindCustomerMutationHookResult = ReturnType<typeof useFindCustomerMutation>;
export type FindCustomerMutationResult = ApolloReactCommon.MutationResult<FindCustomerMutation>;
export type FindCustomerMutationOptions = ApolloReactCommon.BaseMutationOptions<FindCustomerMutation, FindCustomerMutationVariables>;
export const GetProductDataByCategoryFileUrlDocument = gql`
    mutation getProductDataByCategoryFileUrl($category: String!) {
  getProductDataByCategoryFileUrl(category: $category) {
    url
  }
}
    `;
export type GetProductDataByCategoryFileUrlMutationFn = ApolloReactCommon.MutationFunction<GetProductDataByCategoryFileUrlMutation, GetProductDataByCategoryFileUrlMutationVariables>;

/**
 * __useGetProductDataByCategoryFileUrlMutation__
 *
 * To run a mutation, you first call `useGetProductDataByCategoryFileUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetProductDataByCategoryFileUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getProductDataByCategoryFileUrlMutation, { data, loading, error }] = useGetProductDataByCategoryFileUrlMutation({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useGetProductDataByCategoryFileUrlMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetProductDataByCategoryFileUrlMutation, GetProductDataByCategoryFileUrlMutationVariables>) {
        return ApolloReactHooks.useMutation<GetProductDataByCategoryFileUrlMutation, GetProductDataByCategoryFileUrlMutationVariables>(GetProductDataByCategoryFileUrlDocument, baseOptions);
      }
export type GetProductDataByCategoryFileUrlMutationHookResult = ReturnType<typeof useGetProductDataByCategoryFileUrlMutation>;
export type GetProductDataByCategoryFileUrlMutationResult = ApolloReactCommon.MutationResult<GetProductDataByCategoryFileUrlMutation>;
export type GetProductDataByCategoryFileUrlMutationOptions = ApolloReactCommon.BaseMutationOptions<GetProductDataByCategoryFileUrlMutation, GetProductDataByCategoryFileUrlMutationVariables>;
export const GetProductDataZipUrlDocument = gql`
    mutation getProductDataZipUrl {
  getProductDataZipUrl {
    url
  }
}
    `;
export type GetProductDataZipUrlMutationFn = ApolloReactCommon.MutationFunction<GetProductDataZipUrlMutation, GetProductDataZipUrlMutationVariables>;

/**
 * __useGetProductDataZipUrlMutation__
 *
 * To run a mutation, you first call `useGetProductDataZipUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetProductDataZipUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getProductDataZipUrlMutation, { data, loading, error }] = useGetProductDataZipUrlMutation({
 *   variables: {
 *   },
 * });
 */
export function useGetProductDataZipUrlMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GetProductDataZipUrlMutation, GetProductDataZipUrlMutationVariables>) {
        return ApolloReactHooks.useMutation<GetProductDataZipUrlMutation, GetProductDataZipUrlMutationVariables>(GetProductDataZipUrlDocument, baseOptions);
      }
export type GetProductDataZipUrlMutationHookResult = ReturnType<typeof useGetProductDataZipUrlMutation>;
export type GetProductDataZipUrlMutationResult = ApolloReactCommon.MutationResult<GetProductDataZipUrlMutation>;
export type GetProductDataZipUrlMutationOptions = ApolloReactCommon.BaseMutationOptions<GetProductDataZipUrlMutation, GetProductDataZipUrlMutationVariables>;
export const DeletePresentationDocument = gql`
    mutation deletePresentation($id: Int!) {
  deletePresentation(id: $id) {
    success
    message
  }
}
    `;
export type DeletePresentationMutationFn = ApolloReactCommon.MutationFunction<DeletePresentationMutation, DeletePresentationMutationVariables>;

/**
 * __useDeletePresentationMutation__
 *
 * To run a mutation, you first call `useDeletePresentationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePresentationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePresentationMutation, { data, loading, error }] = useDeletePresentationMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePresentationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeletePresentationMutation, DeletePresentationMutationVariables>) {
        return ApolloReactHooks.useMutation<DeletePresentationMutation, DeletePresentationMutationVariables>(DeletePresentationDocument, baseOptions);
      }
export type DeletePresentationMutationHookResult = ReturnType<typeof useDeletePresentationMutation>;
export type DeletePresentationMutationResult = ApolloReactCommon.MutationResult<DeletePresentationMutation>;
export type DeletePresentationMutationOptions = ApolloReactCommon.BaseMutationOptions<DeletePresentationMutation, DeletePresentationMutationVariables>;
export const FindGroupItemDocument = gql`
    mutation findGroupItem($searchText: String!, $itemClass: String!) {
  findGroupItem(searchText: $searchText, itemClass: $itemClass) {
    kitItem
    kitDescription
    cubes
    DROPSHIP
    DROPSHIP_Original
    DROPSHIP_CustomPricing
    DROPSHIP_M
    DROPSHIP_M_Original
    DROPSHIP_M_CustomPricing
    DROPSHIP_X
    DROPSHIP_X_Original
    DROPSHIP_X_CustomPricing
    FOB
    FOB_Original
    FOB_CustomPricing
    FOB_M
    FOB_M_Original
    FOB_M_CustomPricing
    LEVEL0
    LEVEL0_Original
    LEVEL0_CustomPricing
    LEVEL1
    LEVEL1_Original
    LEVEL1_CustomPricing
    LEVEL2
    LEVEL2_Original
    LEVEL2_CustomPricing
    LEVEL3
    LEVEL3_Original
    LEVEL3_CustomPricing
    MIX_FULL
    MIX_FULL_Original
    MIX_FULL_CustomPricing
    MIX_HALF
    MIX_HALF_Original
    MIX_HALF_CustomPricing
    MIX_QTR
    MIX_QTR_Original
    MIX_QTR_CustomPricing
  }
}
    `;
export type FindGroupItemMutationFn = ApolloReactCommon.MutationFunction<FindGroupItemMutation, FindGroupItemMutationVariables>;

/**
 * __useFindGroupItemMutation__
 *
 * To run a mutation, you first call `useFindGroupItemMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFindGroupItemMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [findGroupItemMutation, { data, loading, error }] = useFindGroupItemMutation({
 *   variables: {
 *      searchText: // value for 'searchText'
 *      itemClass: // value for 'itemClass'
 *   },
 * });
 */
export function useFindGroupItemMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FindGroupItemMutation, FindGroupItemMutationVariables>) {
        return ApolloReactHooks.useMutation<FindGroupItemMutation, FindGroupItemMutationVariables>(FindGroupItemDocument, baseOptions);
      }
export type FindGroupItemMutationHookResult = ReturnType<typeof useFindGroupItemMutation>;
export type FindGroupItemMutationResult = ApolloReactCommon.MutationResult<FindGroupItemMutation>;
export type FindGroupItemMutationOptions = ApolloReactCommon.BaseMutationOptions<FindGroupItemMutation, FindGroupItemMutationVariables>;
export const FindItemClassDocument = gql`
    mutation findItemClass($searchText: String!) {
  findItemClass(searchText: $searchText) {
    itemClass
    itemClassDescription
    id
  }
}
    `;
export type FindItemClassMutationFn = ApolloReactCommon.MutationFunction<FindItemClassMutation, FindItemClassMutationVariables>;

/**
 * __useFindItemClassMutation__
 *
 * To run a mutation, you first call `useFindItemClassMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFindItemClassMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [findItemClassMutation, { data, loading, error }] = useFindItemClassMutation({
 *   variables: {
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useFindItemClassMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FindItemClassMutation, FindItemClassMutationVariables>) {
        return ApolloReactHooks.useMutation<FindItemClassMutation, FindItemClassMutationVariables>(FindItemClassDocument, baseOptions);
      }
export type FindItemClassMutationHookResult = ReturnType<typeof useFindItemClassMutation>;
export type FindItemClassMutationResult = ApolloReactCommon.MutationResult<FindItemClassMutation>;
export type FindItemClassMutationOptions = ApolloReactCommon.BaseMutationOptions<FindItemClassMutation, FindItemClassMutationVariables>;
export const FindItemNumberDocument = gql`
    mutation findItemNumber($searchText: String!, $itemClass: String!) {
  findItemNumber(searchText: $searchText, itemClass: $itemClass) {
    itemClass
    itemNumber
    itemDescription
    cubes
    dimensions
    FOB
    FOB_M
    DROPSHIP
    DROPSHIP_M
    DROPSHIP_X
    LEVEL0
    LEVEL1
    LEVEL2
    LEVEL3
    MIX_FULL
    MIX_HALF
    MIX_QTR
  }
}
    `;
export type FindItemNumberMutationFn = ApolloReactCommon.MutationFunction<FindItemNumberMutation, FindItemNumberMutationVariables>;

/**
 * __useFindItemNumberMutation__
 *
 * To run a mutation, you first call `useFindItemNumberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFindItemNumberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [findItemNumberMutation, { data, loading, error }] = useFindItemNumberMutation({
 *   variables: {
 *      searchText: // value for 'searchText'
 *      itemClass: // value for 'itemClass'
 *   },
 * });
 */
export function useFindItemNumberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FindItemNumberMutation, FindItemNumberMutationVariables>) {
        return ApolloReactHooks.useMutation<FindItemNumberMutation, FindItemNumberMutationVariables>(FindItemNumberDocument, baseOptions);
      }
export type FindItemNumberMutationHookResult = ReturnType<typeof useFindItemNumberMutation>;
export type FindItemNumberMutationResult = ApolloReactCommon.MutationResult<FindItemNumberMutation>;
export type FindItemNumberMutationOptions = ApolloReactCommon.BaseMutationOptions<FindItemNumberMutation, FindItemNumberMutationVariables>;
export const FindKitItemsDocument = gql`
    mutation findKitItems($searchText: String!, $itemClass: String!) {
  findKitItems(searchText: $searchText, itemClass: $itemClass) {
    kitItem
    kitQuantity
    kitName
    itemNumber
    itemDescription
    cubes
    dimensions
    FOB
    FOB_M
    DROPSHIP
    DROPSHIP_M
    DROPSHIP_X
    LEVEL0
    LEVEL1
    LEVEL2
    LEVEL3
    MIX_FULL
    MIX_HALF
    MIX_QTR
  }
}
    `;
export type FindKitItemsMutationFn = ApolloReactCommon.MutationFunction<FindKitItemsMutation, FindKitItemsMutationVariables>;

/**
 * __useFindKitItemsMutation__
 *
 * To run a mutation, you first call `useFindKitItemsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFindKitItemsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [findKitItemsMutation, { data, loading, error }] = useFindKitItemsMutation({
 *   variables: {
 *      searchText: // value for 'searchText'
 *      itemClass: // value for 'itemClass'
 *   },
 * });
 */
export function useFindKitItemsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FindKitItemsMutation, FindKitItemsMutationVariables>) {
        return ApolloReactHooks.useMutation<FindKitItemsMutation, FindKitItemsMutationVariables>(FindKitItemsDocument, baseOptions);
      }
export type FindKitItemsMutationHookResult = ReturnType<typeof useFindKitItemsMutation>;
export type FindKitItemsMutationResult = ApolloReactCommon.MutationResult<FindKitItemsMutation>;
export type FindKitItemsMutationOptions = ApolloReactCommon.BaseMutationOptions<FindKitItemsMutation, FindKitItemsMutationVariables>;
export const SaveItemClassImagesDocument = gql`
    mutation saveItemClassImages($data: SalesPresentationItemClassImageInput!) {
  saveItemClassImages(data: $data) {
    presentation {
      id
      userId
      name
      customerName
      customerNumber
      priceLevels {
        id
        priceLevel
        displayName
      }
      itemClasses {
        id
        itemClass
        priceAdjustment
        cubeAdjustment
        itemNumbers {
          itemNumber
          itemDescription
        }
      }
    }
    itemClassIndex
    itemClass {
      id
      itemClass
    }
  }
}
    `;
export type SaveItemClassImagesMutationFn = ApolloReactCommon.MutationFunction<SaveItemClassImagesMutation, SaveItemClassImagesMutationVariables>;

/**
 * __useSaveItemClassImagesMutation__
 *
 * To run a mutation, you first call `useSaveItemClassImagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveItemClassImagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveItemClassImagesMutation, { data, loading, error }] = useSaveItemClassImagesMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveItemClassImagesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveItemClassImagesMutation, SaveItemClassImagesMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveItemClassImagesMutation, SaveItemClassImagesMutationVariables>(SaveItemClassImagesDocument, baseOptions);
      }
export type SaveItemClassImagesMutationHookResult = ReturnType<typeof useSaveItemClassImagesMutation>;
export type SaveItemClassImagesMutationResult = ApolloReactCommon.MutationResult<SaveItemClassImagesMutation>;
export type SaveItemClassImagesMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveItemClassImagesMutation, SaveItemClassImagesMutationVariables>;
export const SaveItemNumbersDocument = gql`
    mutation saveItemNumbers($data: SaveItemNumbersInput!) {
  saveItemNumbers(data: $data) {
    id
    userId
    name
    customerName
    customerNumber
    priceLevels {
      id
      priceLevel
      displayName
    }
    itemClasses {
      id
      itemClass
      priceAdjustment
      cubeAdjustment
      itemNumbers {
        itemNumber
        itemDescription
      }
    }
  }
}
    `;
export type SaveItemNumbersMutationFn = ApolloReactCommon.MutationFunction<SaveItemNumbersMutation, SaveItemNumbersMutationVariables>;

/**
 * __useSaveItemNumbersMutation__
 *
 * To run a mutation, you first call `useSaveItemNumbersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveItemNumbersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveItemNumbersMutation, { data, loading, error }] = useSaveItemNumbersMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveItemNumbersMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveItemNumbersMutation, SaveItemNumbersMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveItemNumbersMutation, SaveItemNumbersMutationVariables>(SaveItemNumbersDocument, baseOptions);
      }
export type SaveItemNumbersMutationHookResult = ReturnType<typeof useSaveItemNumbersMutation>;
export type SaveItemNumbersMutationResult = ApolloReactCommon.MutationResult<SaveItemNumbersMutation>;
export type SaveItemNumbersMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveItemNumbersMutation, SaveItemNumbersMutationVariables>;
export const SaveSalesPresentationDocument = gql`
    mutation saveSalesPresentation($data: SalesPresentationInput!) {
  saveSalesPresentation(data: $data) {
    id
    userId
    name
    customerName
    customerNumber
    priceLevels {
      id
      priceLevel
      displayName
    }
    itemClasses {
      id
      itemClass
      priceAdjustment
      cubeAdjustment
      itemNumbers {
        itemNumber
        itemDescription
      }
    }
  }
}
    `;
export type SaveSalesPresentationMutationFn = ApolloReactCommon.MutationFunction<SaveSalesPresentationMutation, SaveSalesPresentationMutationVariables>;

/**
 * __useSaveSalesPresentationMutation__
 *
 * To run a mutation, you first call `useSaveSalesPresentationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveSalesPresentationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveSalesPresentationMutation, { data, loading, error }] = useSaveSalesPresentationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveSalesPresentationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveSalesPresentationMutation, SaveSalesPresentationMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveSalesPresentationMutation, SaveSalesPresentationMutationVariables>(SaveSalesPresentationDocument, baseOptions);
      }
export type SaveSalesPresentationMutationHookResult = ReturnType<typeof useSaveSalesPresentationMutation>;
export type SaveSalesPresentationMutationResult = ApolloReactCommon.MutationResult<SaveSalesPresentationMutation>;
export type SaveSalesPresentationMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveSalesPresentationMutation, SaveSalesPresentationMutationVariables>;
export const SaveStep2Document = gql`
    mutation saveStep2($data: SalesPresentationStep2Input!) {
  saveStep2(data: $data) {
    id
    userId
    name
    customerName
    customerNumber
    priceLevels {
      id
      priceLevel
      displayName
    }
    itemClasses {
      id
      itemClass
      priceAdjustment
      cubeAdjustment
      itemNumbers {
        itemNumber
        itemDescription
      }
    }
  }
}
    `;
export type SaveStep2MutationFn = ApolloReactCommon.MutationFunction<SaveStep2Mutation, SaveStep2MutationVariables>;

/**
 * __useSaveStep2Mutation__
 *
 * To run a mutation, you first call `useSaveStep2Mutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveStep2Mutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveStep2Mutation, { data, loading, error }] = useSaveStep2Mutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveStep2Mutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveStep2Mutation, SaveStep2MutationVariables>) {
        return ApolloReactHooks.useMutation<SaveStep2Mutation, SaveStep2MutationVariables>(SaveStep2Document, baseOptions);
      }
export type SaveStep2MutationHookResult = ReturnType<typeof useSaveStep2Mutation>;
export type SaveStep2MutationResult = ApolloReactCommon.MutationResult<SaveStep2Mutation>;
export type SaveStep2MutationOptions = ApolloReactCommon.BaseMutationOptions<SaveStep2Mutation, SaveStep2MutationVariables>;
export const AddTruckItemsDocument = gql`
    mutation addTruckItems($data: AddTruckItemsArgs!) {
  addTruckItems(data: $data) {
    status
    stockItems {
      OrderDocumentId
      ItemNumber
      Status
      OrderDate
      LocationCode
      TransferLocation
      TransferQuantity
      EpCubes
      CubesExtended
    }
    orderItems {
      SopNumber
      orderItems {
        OrderDocumentId
        ItemNumber
        Status
        OrderDate
        LocationCode
        TransferLocation
        TransferQuantity
        EpCubes
        CubesExtended
        SopDocDate
        SopNumber
      }
    }
  }
}
    `;
export type AddTruckItemsMutationFn = ApolloReactCommon.MutationFunction<AddTruckItemsMutation, AddTruckItemsMutationVariables>;

/**
 * __useAddTruckItemsMutation__
 *
 * To run a mutation, you first call `useAddTruckItemsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTruckItemsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTruckItemsMutation, { data, loading, error }] = useAddTruckItemsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddTruckItemsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddTruckItemsMutation, AddTruckItemsMutationVariables>) {
        return ApolloReactHooks.useMutation<AddTruckItemsMutation, AddTruckItemsMutationVariables>(AddTruckItemsDocument, baseOptions);
      }
export type AddTruckItemsMutationHookResult = ReturnType<typeof useAddTruckItemsMutation>;
export type AddTruckItemsMutationResult = ApolloReactCommon.MutationResult<AddTruckItemsMutation>;
export type AddTruckItemsMutationOptions = ApolloReactCommon.BaseMutationOptions<AddTruckItemsMutation, AddTruckItemsMutationVariables>;
export const FindTruckItemsDocument = gql`
    mutation findTruckItems($data: FindTruckItemsArgs!) {
  findTruckItems(data: $data) {
    status
    transferLocation
    locationCode
    stockItems {
      OrderDocumentId
      ItemNumber
      Status
      OrderDate
      LocationCode
      TransferLocation
      TransferQuantity
      EpCubes
      CubesExtended
      LNITMSEQ
    }
    orderItems {
      SopNumber
      orderItems {
        OrderDocumentId
        ItemNumber
        Status
        OrderDate
        LocationCode
        TransferLocation
        TransferQuantity
        EpCubes
        CubesExtended
        SopDocDate
        SopNumber
        LNITMSEQ
      }
    }
  }
}
    `;
export type FindTruckItemsMutationFn = ApolloReactCommon.MutationFunction<FindTruckItemsMutation, FindTruckItemsMutationVariables>;

/**
 * __useFindTruckItemsMutation__
 *
 * To run a mutation, you first call `useFindTruckItemsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFindTruckItemsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [findTruckItemsMutation, { data, loading, error }] = useFindTruckItemsMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useFindTruckItemsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<FindTruckItemsMutation, FindTruckItemsMutationVariables>) {
        return ApolloReactHooks.useMutation<FindTruckItemsMutation, FindTruckItemsMutationVariables>(FindTruckItemsDocument, baseOptions);
      }
export type FindTruckItemsMutationHookResult = ReturnType<typeof useFindTruckItemsMutation>;
export type FindTruckItemsMutationResult = ApolloReactCommon.MutationResult<FindTruckItemsMutation>;
export type FindTruckItemsMutationOptions = ApolloReactCommon.BaseMutationOptions<FindTruckItemsMutation, FindTruckItemsMutationVariables>;
export const TransferItemsDocument = gql`
    mutation transferItems($args: TransferFromArgs!) {
  transferItems(args: $args)
}
    `;
export type TransferItemsMutationFn = ApolloReactCommon.MutationFunction<TransferItemsMutation, TransferItemsMutationVariables>;

/**
 * __useTransferItemsMutation__
 *
 * To run a mutation, you first call `useTransferItemsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransferItemsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transferItemsMutation, { data, loading, error }] = useTransferItemsMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useTransferItemsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TransferItemsMutation, TransferItemsMutationVariables>) {
        return ApolloReactHooks.useMutation<TransferItemsMutation, TransferItemsMutationVariables>(TransferItemsDocument, baseOptions);
      }
export type TransferItemsMutationHookResult = ReturnType<typeof useTransferItemsMutation>;
export type TransferItemsMutationResult = ApolloReactCommon.MutationResult<TransferItemsMutation>;
export type TransferItemsMutationOptions = ApolloReactCommon.BaseMutationOptions<TransferItemsMutation, TransferItemsMutationVariables>;
export const UpdateQuantityStockItemsTruckDocument = gql`
    mutation updateQuantityStockItemsTruck($args: UpdateQuantityArgs!) {
  updateQuantityStockItemsTruck(args: $args) {
    data {
      svc00701 {
        TransferQuantity
        QuantityFulfilled
      }
      svc00712 {
        Quantity
      }
      svc00731 {
        DEBITAMT
        CRDTAMNT
        ORDBTAMT
        ORCRDAMT
      }
    }
  }
}
    `;
export type UpdateQuantityStockItemsTruckMutationFn = ApolloReactCommon.MutationFunction<UpdateQuantityStockItemsTruckMutation, UpdateQuantityStockItemsTruckMutationVariables>;

/**
 * __useUpdateQuantityStockItemsTruckMutation__
 *
 * To run a mutation, you first call `useUpdateQuantityStockItemsTruckMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuantityStockItemsTruckMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuantityStockItemsTruckMutation, { data, loading, error }] = useUpdateQuantityStockItemsTruckMutation({
 *   variables: {
 *      args: // value for 'args'
 *   },
 * });
 */
export function useUpdateQuantityStockItemsTruckMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateQuantityStockItemsTruckMutation, UpdateQuantityStockItemsTruckMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateQuantityStockItemsTruckMutation, UpdateQuantityStockItemsTruckMutationVariables>(UpdateQuantityStockItemsTruckDocument, baseOptions);
      }
export type UpdateQuantityStockItemsTruckMutationHookResult = ReturnType<typeof useUpdateQuantityStockItemsTruckMutation>;
export type UpdateQuantityStockItemsTruckMutationResult = ApolloReactCommon.MutationResult<UpdateQuantityStockItemsTruckMutation>;
export type UpdateQuantityStockItemsTruckMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateQuantityStockItemsTruckMutation, UpdateQuantityStockItemsTruckMutationVariables>;
export const SaveUserJobDocument = gql`
    mutation saveUserJob($data: UserJobInput!) {
  saveUserJob(data: $data) {
    id
    userId
    vendorId
    fileType
    inProgress
    status
    userJobCategories {
      id
      userJobId
      category
      filePath
      downloaded
      available
      created
      userJobCategoryItemClasses {
        id
        userJobCategoryId
        itemClass
      }
    }
  }
}
    `;
export type SaveUserJobMutationFn = ApolloReactCommon.MutationFunction<SaveUserJobMutation, SaveUserJobMutationVariables>;

/**
 * __useSaveUserJobMutation__
 *
 * To run a mutation, you first call `useSaveUserJobMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveUserJobMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveUserJobMutation, { data, loading, error }] = useSaveUserJobMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveUserJobMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveUserJobMutation, SaveUserJobMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveUserJobMutation, SaveUserJobMutationVariables>(SaveUserJobDocument, baseOptions);
      }
export type SaveUserJobMutationHookResult = ReturnType<typeof useSaveUserJobMutation>;
export type SaveUserJobMutationResult = ApolloReactCommon.MutationResult<SaveUserJobMutation>;
export type SaveUserJobMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveUserJobMutation, SaveUserJobMutationVariables>;
export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const SaveUserDocument = gql`
    mutation saveUser($data: UserInput!) {
  saveUser(data: $data) {
    id
    firstName
    lastName
    fullName
    email
    active
    role
    vendor {
      id
      name
      logo
    }
  }
}
    `;
export type SaveUserMutationFn = ApolloReactCommon.MutationFunction<SaveUserMutation, SaveUserMutationVariables>;

/**
 * __useSaveUserMutation__
 *
 * To run a mutation, you first call `useSaveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveUserMutation, { data, loading, error }] = useSaveUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveUserMutation, SaveUserMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveUserMutation, SaveUserMutationVariables>(SaveUserDocument, baseOptions);
      }
export type SaveUserMutationHookResult = ReturnType<typeof useSaveUserMutation>;
export type SaveUserMutationResult = ApolloReactCommon.MutationResult<SaveUserMutation>;
export type SaveUserMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveUserMutation, SaveUserMutationVariables>;
export const SaveVendorDocument = gql`
    mutation saveVendor($data: VendorInput!) {
  saveVendor(data: $data) {
    id
    name
    logo
    vendorCategories {
      id
      vendorId
      category
      itemClasses {
        id
        vendorId
        vendorCategoryId
        itemClass
      }
    }
  }
}
    `;
export type SaveVendorMutationFn = ApolloReactCommon.MutationFunction<SaveVendorMutation, SaveVendorMutationVariables>;

/**
 * __useSaveVendorMutation__
 *
 * To run a mutation, you first call `useSaveVendorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveVendorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveVendorMutation, { data, loading, error }] = useSaveVendorMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSaveVendorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SaveVendorMutation, SaveVendorMutationVariables>) {
        return ApolloReactHooks.useMutation<SaveVendorMutation, SaveVendorMutationVariables>(SaveVendorDocument, baseOptions);
      }
export type SaveVendorMutationHookResult = ReturnType<typeof useSaveVendorMutation>;
export type SaveVendorMutationResult = ApolloReactCommon.MutationResult<SaveVendorMutation>;
export type SaveVendorMutationOptions = ApolloReactCommon.BaseMutationOptions<SaveVendorMutation, SaveVendorMutationVariables>;
export const CancelShipmentDocument = gql`
    mutation cancelShipment($sopNumber: String!) {
  cancelShipment(sopNumber: $sopNumber) {
    success
    message
  }
}
    `;
export type CancelShipmentMutationFn = ApolloReactCommon.MutationFunction<CancelShipmentMutation, CancelShipmentMutationVariables>;

/**
 * __useCancelShipmentMutation__
 *
 * To run a mutation, you first call `useCancelShipmentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelShipmentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelShipmentMutation, { data, loading, error }] = useCancelShipmentMutation({
 *   variables: {
 *      sopNumber: // value for 'sopNumber'
 *   },
 * });
 */
export function useCancelShipmentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CancelShipmentMutation, CancelShipmentMutationVariables>) {
        return ApolloReactHooks.useMutation<CancelShipmentMutation, CancelShipmentMutationVariables>(CancelShipmentDocument, baseOptions);
      }
export type CancelShipmentMutationHookResult = ReturnType<typeof useCancelShipmentMutation>;
export type CancelShipmentMutationResult = ApolloReactCommon.MutationResult<CancelShipmentMutation>;
export type CancelShipmentMutationOptions = ApolloReactCommon.BaseMutationOptions<CancelShipmentMutation, CancelShipmentMutationVariables>;
export const ReprintLabelsDocument = gql`
    mutation reprintLabels($sopNumber: String!) {
  reprintLabels(sopNumber: $sopNumber) {
    success
    message
  }
}
    `;
export type ReprintLabelsMutationFn = ApolloReactCommon.MutationFunction<ReprintLabelsMutation, ReprintLabelsMutationVariables>;

/**
 * __useReprintLabelsMutation__
 *
 * To run a mutation, you first call `useReprintLabelsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReprintLabelsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reprintLabelsMutation, { data, loading, error }] = useReprintLabelsMutation({
 *   variables: {
 *      sopNumber: // value for 'sopNumber'
 *   },
 * });
 */
export function useReprintLabelsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ReprintLabelsMutation, ReprintLabelsMutationVariables>) {
        return ApolloReactHooks.useMutation<ReprintLabelsMutation, ReprintLabelsMutationVariables>(ReprintLabelsDocument, baseOptions);
      }
export type ReprintLabelsMutationHookResult = ReturnType<typeof useReprintLabelsMutation>;
export type ReprintLabelsMutationResult = ApolloReactCommon.MutationResult<ReprintLabelsMutation>;
export type ReprintLabelsMutationOptions = ApolloReactCommon.BaseMutationOptions<ReprintLabelsMutation, ReprintLabelsMutationVariables>;
export const TransferShipmentLocationDocument = gql`
    mutation transferShipmentLocation($SopNumber: String!, $NewLocation: String!, $ForceUpdate: Boolean, $UpdateReadyDate: Boolean) {
  transferShipmentLocation(SopNumber: $SopNumber, NewLocation: $NewLocation, ForceUpdate: $ForceUpdate, UpdateReadyDate: $UpdateReadyDate) {
    success
    message
  }
}
    `;
export type TransferShipmentLocationMutationFn = ApolloReactCommon.MutationFunction<TransferShipmentLocationMutation, TransferShipmentLocationMutationVariables>;

/**
 * __useTransferShipmentLocationMutation__
 *
 * To run a mutation, you first call `useTransferShipmentLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTransferShipmentLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [transferShipmentLocationMutation, { data, loading, error }] = useTransferShipmentLocationMutation({
 *   variables: {
 *      SopNumber: // value for 'SopNumber'
 *      NewLocation: // value for 'NewLocation'
 *      ForceUpdate: // value for 'ForceUpdate'
 *      UpdateReadyDate: // value for 'UpdateReadyDate'
 *   },
 * });
 */
export function useTransferShipmentLocationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TransferShipmentLocationMutation, TransferShipmentLocationMutationVariables>) {
        return ApolloReactHooks.useMutation<TransferShipmentLocationMutation, TransferShipmentLocationMutationVariables>(TransferShipmentLocationDocument, baseOptions);
      }
export type TransferShipmentLocationMutationHookResult = ReturnType<typeof useTransferShipmentLocationMutation>;
export type TransferShipmentLocationMutationResult = ApolloReactCommon.MutationResult<TransferShipmentLocationMutation>;
export type TransferShipmentLocationMutationOptions = ApolloReactCommon.BaseMutationOptions<TransferShipmentLocationMutation, TransferShipmentLocationMutationVariables>;
export const GetItemClassesForCategoriesDocument = gql`
    query getItemClassesForCategories($categories: [String!]!) {
  getItemClassesForCategories(categories: $categories) {
    groups {
      category
      itemClasses {
        category
        itemClass
        itemClassDescription
      }
    }
  }
}
    `;

/**
 * __useGetItemClassesForCategoriesQuery__
 *
 * To run a query within a React component, call `useGetItemClassesForCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemClassesForCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetItemClassesForCategoriesQuery({
 *   variables: {
 *      categories: // value for 'categories'
 *   },
 * });
 */
export function useGetItemClassesForCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetItemClassesForCategoriesQuery, GetItemClassesForCategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetItemClassesForCategoriesQuery, GetItemClassesForCategoriesQueryVariables>(GetItemClassesForCategoriesDocument, baseOptions);
      }
export function useGetItemClassesForCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetItemClassesForCategoriesQuery, GetItemClassesForCategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetItemClassesForCategoriesQuery, GetItemClassesForCategoriesQueryVariables>(GetItemClassesForCategoriesDocument, baseOptions);
        }
export type GetItemClassesForCategoriesQueryHookResult = ReturnType<typeof useGetItemClassesForCategoriesQuery>;
export type GetItemClassesForCategoriesLazyQueryHookResult = ReturnType<typeof useGetItemClassesForCategoriesLazyQuery>;
export type GetItemClassesForCategoriesQueryResult = ApolloReactCommon.QueryResult<GetItemClassesForCategoriesQuery, GetItemClassesForCategoriesQueryVariables>;
export const GetProductDataFileUrlDocument = gql`
    query getProductDataFileUrl {
  getProductDataFileUrl {
    url
  }
}
    `;

/**
 * __useGetProductDataFileUrlQuery__
 *
 * To run a query within a React component, call `useGetProductDataFileUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductDataFileUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductDataFileUrlQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetProductDataFileUrlQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetProductDataFileUrlQuery, GetProductDataFileUrlQueryVariables>) {
        return ApolloReactHooks.useQuery<GetProductDataFileUrlQuery, GetProductDataFileUrlQueryVariables>(GetProductDataFileUrlDocument, baseOptions);
      }
export function useGetProductDataFileUrlLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetProductDataFileUrlQuery, GetProductDataFileUrlQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetProductDataFileUrlQuery, GetProductDataFileUrlQueryVariables>(GetProductDataFileUrlDocument, baseOptions);
        }
export type GetProductDataFileUrlQueryHookResult = ReturnType<typeof useGetProductDataFileUrlQuery>;
export type GetProductDataFileUrlLazyQueryHookResult = ReturnType<typeof useGetProductDataFileUrlLazyQuery>;
export type GetProductDataFileUrlQueryResult = ApolloReactCommon.QueryResult<GetProductDataFileUrlQuery, GetProductDataFileUrlQueryVariables>;
export const ProductDataByCategoryDocument = gql`
    query productDataByCategory($category: String!) {
  productDataByCategory(category: $category) {
    Item_Number
    Item_Class
    Item_Class_Description
    Item_Description
    Box_Width
    Box_Depth
    Box_Height
    Width
    Depth
    Height
    Cartons
    Weight
    Origin
    Status
    Category
    Web_Exclude
    Wood
    Finish
    Item_Style
    Publish_To_Web
    F1
    F2
    F3
    F4
    F5
    F6
    F7
    F8
    F9
    F10
    F11
    F12
    F13
    F14
    F15
    Feature_1
    Feature_2
    Feature_3
    Feature_4
    Feature_5
    Feature_6
    Feature_7
    Feature_8
    Item_Class_Status
    Full_Item_Class_Name
    Combined_Dimensions
    UPC_Code
    Finish_Category
    Small_Parcel
    Box_Dimension_Combined
    Story
    Image_1
    Image_2
    Image_3
    Image_4
    Image_6
    Image_7
    Image_8
    Image_9
    Image_10
  }
}
    `;

/**
 * __useProductDataByCategoryQuery__
 *
 * To run a query within a React component, call `useProductDataByCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductDataByCategoryQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductDataByCategoryQuery({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useProductDataByCategoryQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductDataByCategoryQuery, ProductDataByCategoryQueryVariables>) {
        return ApolloReactHooks.useQuery<ProductDataByCategoryQuery, ProductDataByCategoryQueryVariables>(ProductDataByCategoryDocument, baseOptions);
      }
export function useProductDataByCategoryLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductDataByCategoryQuery, ProductDataByCategoryQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProductDataByCategoryQuery, ProductDataByCategoryQueryVariables>(ProductDataByCategoryDocument, baseOptions);
        }
export type ProductDataByCategoryQueryHookResult = ReturnType<typeof useProductDataByCategoryQuery>;
export type ProductDataByCategoryLazyQueryHookResult = ReturnType<typeof useProductDataByCategoryLazyQuery>;
export type ProductDataByCategoryQueryResult = ApolloReactCommon.QueryResult<ProductDataByCategoryQuery, ProductDataByCategoryQueryVariables>;
export const ProductDataByCategoryForUserJobDocument = gql`
    query productDataByCategoryForUserJob($category: String!) {
  productDataByCategoryForUserJob(category: $category) {
    Item_Number
    Item_Class
    Item_Class_Description
    Item_Description
    Box_Width
    Box_Depth
    Box_Height
    Width
    Depth
    Height
    Cartons
    Weight
    Origin
    Status
    Category
    Web_Exclude
    Wood
    Finish
    Item_Style
    Publish_To_Web
    F1
    F2
    F3
    F4
    F5
    F6
    F7
    F8
    F9
    F10
    F11
    F12
    F13
    F14
    F15
    Feature_1
    Feature_2
    Feature_3
    Feature_4
    Feature_5
    Feature_6
    Feature_7
    Feature_8
    Item_Class_Status
    Full_Item_Class_Name
    Combined_Dimensions
    UPC_Code
    Finish_Category
    Small_Parcel
    Box_Dimension_Combined
    Story
    Image_1
    Image_2
    Image_3
    Image_4
    Image_6
    Image_7
    Image_8
    Image_9
    Image_10
  }
}
    `;

/**
 * __useProductDataByCategoryForUserJobQuery__
 *
 * To run a query within a React component, call `useProductDataByCategoryForUserJobQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductDataByCategoryForUserJobQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductDataByCategoryForUserJobQuery({
 *   variables: {
 *      category: // value for 'category'
 *   },
 * });
 */
export function useProductDataByCategoryForUserJobQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ProductDataByCategoryForUserJobQuery, ProductDataByCategoryForUserJobQueryVariables>) {
        return ApolloReactHooks.useQuery<ProductDataByCategoryForUserJobQuery, ProductDataByCategoryForUserJobQueryVariables>(ProductDataByCategoryForUserJobDocument, baseOptions);
      }
export function useProductDataByCategoryForUserJobLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductDataByCategoryForUserJobQuery, ProductDataByCategoryForUserJobQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ProductDataByCategoryForUserJobQuery, ProductDataByCategoryForUserJobQueryVariables>(ProductDataByCategoryForUserJobDocument, baseOptions);
        }
export type ProductDataByCategoryForUserJobQueryHookResult = ReturnType<typeof useProductDataByCategoryForUserJobQuery>;
export type ProductDataByCategoryForUserJobLazyQueryHookResult = ReturnType<typeof useProductDataByCategoryForUserJobLazyQuery>;
export type ProductDataByCategoryForUserJobQueryResult = ApolloReactCommon.QueryResult<ProductDataByCategoryForUserJobQuery, ProductDataByCategoryForUserJobQueryVariables>;
export const PresentationByIdDocument = gql`
    query presentationById($id: Int!) {
  presentationById(id: $id) {
    id
    userId
    name
    customerName
    customerNumber
    priceLevels {
      id
      priceLevel
      displayName
    }
    itemClasses {
      id
      itemClass
      itemClassDescription
      itemNumbers {
        id
        salesPresentationId
        itemNumber
        FOB
        FOB_M
        DROPSHIP
        DROPSHIP_M
        DROPSHIP_X
        LEVEL0
        LEVEL1
        LEVEL2
        LEVEL3
        MIX_FULL
        MIX_HALF
        MIX_QTR
      }
    }
  }
}
    `;

/**
 * __usePresentationByIdQuery__
 *
 * To run a query within a React component, call `usePresentationByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `usePresentationByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePresentationByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePresentationByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PresentationByIdQuery, PresentationByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<PresentationByIdQuery, PresentationByIdQueryVariables>(PresentationByIdDocument, baseOptions);
      }
export function usePresentationByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PresentationByIdQuery, PresentationByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PresentationByIdQuery, PresentationByIdQueryVariables>(PresentationByIdDocument, baseOptions);
        }
export type PresentationByIdQueryHookResult = ReturnType<typeof usePresentationByIdQuery>;
export type PresentationByIdLazyQueryHookResult = ReturnType<typeof usePresentationByIdLazyQuery>;
export type PresentationByIdQueryResult = ApolloReactCommon.QueryResult<PresentationByIdQuery, PresentationByIdQueryVariables>;
export const PresentationByIdAndRelatedDocument = gql`
    query presentationByIdAndRelated($id: Int!, $itemClassIndex: Int!) {
  presentationByIdAndRelated(id: $id, itemClassIndex: $itemClassIndex) {
    presentation {
      id
      userId
      name
      customerName
      customerNumber
      priceLevels {
        id
        salesPresentationId
        priceLevel
        displayName
      }
      itemClasses {
        id
        itemClass
        itemClassDescription
      }
    }
    anyUnsavedItemClasses
    presentationItemClass {
      id
      salesPresentationId
      itemClass
      itemClassDescription
      priceAdjustment
      priceAdjustmentTo
      cubeAdjustment
      cubeAdjustmentTo
      hasBeenSaved
      DROPSHIP
      DROPSHIP_M
      DROPSHIP_X
      FOB
      FOB_M
      LEVEL0
      LEVEL1
      LEVEL2
      LEVEL3
      MIX_FULL
      MIX_HALF
      MIX_QTR
    }
    presentationItemClassItemNumbers {
      id
      salesPresentationId
      salesPresentationItemClassId
      displayOrder
      itemNumber
      itemDescription
      cubes
      dimensions
      DROPSHIP
      DROPSHIP_Original
      DROPSHIP_CustomPricing
      DROPSHIP_M
      DROPSHIP_M_Original
      DROPSHIP_M_CustomPricing
      DROPSHIP_X
      DROPSHIP_X_Original
      DROPSHIP_X_CustomPricing
      FOB
      FOB_Original
      FOB_CustomPricing
      FOB_M
      FOB_M_Original
      FOB_M_CustomPricing
      LEVEL0
      LEVEL0_Original
      LEVEL0_CustomPricing
      LEVEL1
      LEVEL1_Original
      LEVEL1_CustomPricing
      LEVEL2
      LEVEL2_Original
      LEVEL2_CustomPricing
      LEVEL3
      LEVEL3_Original
      LEVEL3_CustomPricing
      MIX_FULL
      MIX_FULL_Original
      MIX_FULL_CustomPricing
      MIX_HALF
      MIX_HALF_Original
      MIX_HALF_CustomPricing
      MIX_QTR
      MIX_QTR_Original
      MIX_QTR_CustomPricing
    }
    presentationItemClassKits {
      kitItem
      displayOrder
      kitItems {
        id
        salesPresentationId
        salesPresentationItemClassId
        itemNumber
        itemDescription
        kitName
        kitItem
        kitQuantity
        cubes
        dimensions
        DROPSHIP
        DROPSHIP_Original
        DROPSHIP_CustomPricing
        DROPSHIP_M
        DROPSHIP_M_Original
        DROPSHIP_M_CustomPricing
        DROPSHIP_X
        DROPSHIP_X_Original
        DROPSHIP_X_CustomPricing
        FOB
        FOB_Original
        FOB_CustomPricing
        FOB_M
        FOB_M_Original
        FOB_M_CustomPricing
        LEVEL0
        LEVEL0_Original
        LEVEL0_CustomPricing
        LEVEL1
        LEVEL1_Original
        LEVEL1_CustomPricing
        LEVEL2
        LEVEL2_Original
        LEVEL2_CustomPricing
        LEVEL3
        LEVEL3_Original
        LEVEL3_CustomPricing
        MIX_FULL
        MIX_FULL_Original
        MIX_FULL_CustomPricing
        MIX_HALF
        MIX_HALF_Original
        MIX_HALF_CustomPricing
        MIX_QTR
        MIX_QTR_Original
        MIX_QTR_CustomPricing
      }
    }
    presentationItemClassGroups {
      id
      salesPresentationId
      salesPresentationItemClassId
      displayOrder
      kitItem
      kitDescription
      cubes
      DROPSHIP
      DROPSHIP_Original
      DROPSHIP_CustomPricing
      DROPSHIP_M
      DROPSHIP_M_Original
      DROPSHIP_M_CustomPricing
      DROPSHIP_X
      DROPSHIP_X_Original
      DROPSHIP_X_CustomPricing
      FOB
      FOB_Original
      FOB_CustomPricing
      FOB_M
      FOB_M_Original
      FOB_M_CustomPricing
      LEVEL0
      LEVEL0_Original
      LEVEL0_CustomPricing
      LEVEL1
      LEVEL1_Original
      LEVEL1_CustomPricing
      LEVEL2
      LEVEL2_Original
      LEVEL2_CustomPricing
      LEVEL3
      LEVEL3_Original
      LEVEL3_CustomPricing
      MIX_FULL
      MIX_FULL_Original
      MIX_FULL_CustomPricing
      MIX_HALF
      MIX_HALF_Original
      MIX_HALF_CustomPricing
      MIX_QTR
      MIX_QTR_Original
      MIX_QTR_CustomPricing
    }
    itemClassIndex
  }
}
    `;

/**
 * __usePresentationByIdAndRelatedQuery__
 *
 * To run a query within a React component, call `usePresentationByIdAndRelatedQuery` and pass it any options that fit your needs.
 * When your component renders, `usePresentationByIdAndRelatedQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePresentationByIdAndRelatedQuery({
 *   variables: {
 *      id: // value for 'id'
 *      itemClassIndex: // value for 'itemClassIndex'
 *   },
 * });
 */
export function usePresentationByIdAndRelatedQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PresentationByIdAndRelatedQuery, PresentationByIdAndRelatedQueryVariables>) {
        return ApolloReactHooks.useQuery<PresentationByIdAndRelatedQuery, PresentationByIdAndRelatedQueryVariables>(PresentationByIdAndRelatedDocument, baseOptions);
      }
export function usePresentationByIdAndRelatedLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PresentationByIdAndRelatedQuery, PresentationByIdAndRelatedQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PresentationByIdAndRelatedQuery, PresentationByIdAndRelatedQueryVariables>(PresentationByIdAndRelatedDocument, baseOptions);
        }
export type PresentationByIdAndRelatedQueryHookResult = ReturnType<typeof usePresentationByIdAndRelatedQuery>;
export type PresentationByIdAndRelatedLazyQueryHookResult = ReturnType<typeof usePresentationByIdAndRelatedLazyQuery>;
export type PresentationByIdAndRelatedQueryResult = ApolloReactCommon.QueryResult<PresentationByIdAndRelatedQuery, PresentationByIdAndRelatedQueryVariables>;
export const PresentationByIdAndPhotosDocument = gql`
    query presentationByIdAndPhotos($id: Int!, $itemClassIndex: Int!) {
  presentationByIdAndPhotos(id: $id, itemClassIndex: $itemClassIndex) {
    productData {
      Item_Class
      Item_Number
      Item_Description
      Image_1
      Image_2
      Image_3
      Image_4
      Image_5
      Image_6
      Image_7
      Image_8
      Image_9
      Image_10
      Image_11
      Image_12
      Image_13
      Image_14
      Image_15
      Image_16
      Image_17
      Image_18
      Image_19
      Image_20
    }
    presentation {
      id
      name
      customerName
      itemClasses {
        id
        itemClass
        itemClassDescription
        hasBeenSaved
      }
    }
    itemClass {
      id
      itemClass
      itemClassDescription
    }
    itemClassIndex
    presentationImages {
      itemNumber
      imageUrl
      imageIndex
    }
  }
}
    `;

/**
 * __usePresentationByIdAndPhotosQuery__
 *
 * To run a query within a React component, call `usePresentationByIdAndPhotosQuery` and pass it any options that fit your needs.
 * When your component renders, `usePresentationByIdAndPhotosQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePresentationByIdAndPhotosQuery({
 *   variables: {
 *      id: // value for 'id'
 *      itemClassIndex: // value for 'itemClassIndex'
 *   },
 * });
 */
export function usePresentationByIdAndPhotosQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PresentationByIdAndPhotosQuery, PresentationByIdAndPhotosQueryVariables>) {
        return ApolloReactHooks.useQuery<PresentationByIdAndPhotosQuery, PresentationByIdAndPhotosQueryVariables>(PresentationByIdAndPhotosDocument, baseOptions);
      }
export function usePresentationByIdAndPhotosLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PresentationByIdAndPhotosQuery, PresentationByIdAndPhotosQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PresentationByIdAndPhotosQuery, PresentationByIdAndPhotosQueryVariables>(PresentationByIdAndPhotosDocument, baseOptions);
        }
export type PresentationByIdAndPhotosQueryHookResult = ReturnType<typeof usePresentationByIdAndPhotosQuery>;
export type PresentationByIdAndPhotosLazyQueryHookResult = ReturnType<typeof usePresentationByIdAndPhotosLazyQuery>;
export type PresentationByIdAndPhotosQueryResult = ApolloReactCommon.QueryResult<PresentationByIdAndPhotosQuery, PresentationByIdAndPhotosQueryVariables>;
export const PresentationPdfDataDocument = gql`
    query presentationPdfData($id: Int!) {
  presentationPdfData(id: $id) {
    presentation {
      id
      name
      customerName
      priceLevels {
        id
        priceLevel
        displayName
      }
      itemClasses {
        id
        itemClass
        itemClassDescription
        DROPSHIP
        DROPSHIP_M
        DROPSHIP_X
        FOB
        FOB_M
        LEVEL0
        LEVEL1
        LEVEL2
        LEVEL3
        MIX_FULL
        MIX_HALF
        MIX_QTR
      }
    }
    items {
      itemClass {
        id
        itemClass
        itemClassDescription
        DROPSHIP
        DROPSHIP_M
        DROPSHIP_X
        FOB
        FOB_M
        LEVEL0
        LEVEL1
        LEVEL2
        LEVEL3
        MIX_FULL
        MIX_HALF
        MIX_QTR
      }
      itemClassFeatures {
        itemClass
        itemClassDescription
        category
        Feature_1
        Feature_2
        Feature_3
        Feature_4
        Feature_5
        Feature_6
        Feature_7
        Feature_8
        Feature_9
        Feature_10
        Feature_11
        Feature_12
        Feature_13
        Feature_14
        Feature_15
      }
      itemClassKits {
        itemNumber
        itemDescription
        items {
          itemNumber
          itemDescription
          cubes
          kitQuantity
          dimensions
          DROPSHIP
          DROPSHIP_M
          DROPSHIP_X
          FOB
          FOB_M
          LEVEL0
          LEVEL1
          LEVEL2
          LEVEL3
          MIX_FULL
          MIX_HALF
          MIX_QTR
        }
      }
      itemClassItemNumbers {
        itemNumber
        itemDescription
        cubes
        dimensions
        DROPSHIP
        DROPSHIP_M
        DROPSHIP_X
        FOB
        FOB_M
        LEVEL0
        LEVEL1
        LEVEL2
        LEVEL3
        MIX_FULL
        MIX_HALF
        MIX_QTR
      }
      itemClassGroups {
        itemNumber
        itemDescription
        cubes
        DROPSHIP
        DROPSHIP_M
        DROPSHIP_X
        FOB
        FOB_M
        LEVEL0
        LEVEL1
        LEVEL2
        LEVEL3
        MIX_FULL
        MIX_HALF
        MIX_QTR
      }
      itemClassImages {
        itemNumber
        imageUrl
        imageIndex
      }
    }
  }
}
    `;

/**
 * __usePresentationPdfDataQuery__
 *
 * To run a query within a React component, call `usePresentationPdfDataQuery` and pass it any options that fit your needs.
 * When your component renders, `usePresentationPdfDataQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePresentationPdfDataQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePresentationPdfDataQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PresentationPdfDataQuery, PresentationPdfDataQueryVariables>) {
        return ApolloReactHooks.useQuery<PresentationPdfDataQuery, PresentationPdfDataQueryVariables>(PresentationPdfDataDocument, baseOptions);
      }
export function usePresentationPdfDataLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PresentationPdfDataQuery, PresentationPdfDataQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<PresentationPdfDataQuery, PresentationPdfDataQueryVariables>(PresentationPdfDataDocument, baseOptions);
        }
export type PresentationPdfDataQueryHookResult = ReturnType<typeof usePresentationPdfDataQuery>;
export type PresentationPdfDataLazyQueryHookResult = ReturnType<typeof usePresentationPdfDataLazyQuery>;
export type PresentationPdfDataQueryResult = ApolloReactCommon.QueryResult<PresentationPdfDataQuery, PresentationPdfDataQueryVariables>;
export const SalesPresentationsDocument = gql`
    query salesPresentations($searchText: String) {
  salesPresentations(searchText: $searchText) {
    presentations {
      id
      name
      customerName
    }
    totalRows
  }
}
    `;

/**
 * __useSalesPresentationsQuery__
 *
 * To run a query within a React component, call `useSalesPresentationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSalesPresentationsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSalesPresentationsQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useSalesPresentationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SalesPresentationsQuery, SalesPresentationsQueryVariables>) {
        return ApolloReactHooks.useQuery<SalesPresentationsQuery, SalesPresentationsQueryVariables>(SalesPresentationsDocument, baseOptions);
      }
export function useSalesPresentationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SalesPresentationsQuery, SalesPresentationsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SalesPresentationsQuery, SalesPresentationsQueryVariables>(SalesPresentationsDocument, baseOptions);
        }
export type SalesPresentationsQueryHookResult = ReturnType<typeof useSalesPresentationsQuery>;
export type SalesPresentationsLazyQueryHookResult = ReturnType<typeof useSalesPresentationsLazyQuery>;
export type SalesPresentationsQueryResult = ApolloReactCommon.QueryResult<SalesPresentationsQuery, SalesPresentationsQueryVariables>;
export const GetUserJobAndFileUrlDocument = gql`
    query getUserJobAndFileUrl {
  getUserJobForUserWizardCompleted {
    id
    userId
    vendorId
    uuid
    fileType
    inProgress
    status
    created
    userJobCategories {
      id
      userJobId
      category
      filePath
      downloaded
      available
      userJobCategoryItemClasses {
        id
        userJobCategoryId
        itemClass
        itemClassDescription
      }
    }
  }
  getProductDataFileUrl {
    url
  }
}
    `;

/**
 * __useGetUserJobAndFileUrlQuery__
 *
 * To run a query within a React component, call `useGetUserJobAndFileUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserJobAndFileUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserJobAndFileUrlQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserJobAndFileUrlQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserJobAndFileUrlQuery, GetUserJobAndFileUrlQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserJobAndFileUrlQuery, GetUserJobAndFileUrlQueryVariables>(GetUserJobAndFileUrlDocument, baseOptions);
      }
export function useGetUserJobAndFileUrlLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserJobAndFileUrlQuery, GetUserJobAndFileUrlQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserJobAndFileUrlQuery, GetUserJobAndFileUrlQueryVariables>(GetUserJobAndFileUrlDocument, baseOptions);
        }
export type GetUserJobAndFileUrlQueryHookResult = ReturnType<typeof useGetUserJobAndFileUrlQuery>;
export type GetUserJobAndFileUrlLazyQueryHookResult = ReturnType<typeof useGetUserJobAndFileUrlLazyQuery>;
export type GetUserJobAndFileUrlQueryResult = ApolloReactCommon.QueryResult<GetUserJobAndFileUrlQuery, GetUserJobAndFileUrlQueryVariables>;
export const GetUserJobAndItemClassesDocument = gql`
    query getUserJobAndItemClasses {
  getUserJobForUserInProgress {
    id
    userId
    vendorId
    uuid
    fileType
    inProgress
    status
    created
    userJobCategories {
      id
      userJobId
      category
      filePath
      downloaded
      available
      userJobCategoryItemClasses {
        id
        userJobCategoryId
        itemClass
        itemClassDescription
      }
    }
  }
  getItemClassesForCategoriesForUser {
    groups {
      category
      itemClasses {
        itemClass
        itemClassDescription
        category
      }
    }
  }
}
    `;

/**
 * __useGetUserJobAndItemClassesQuery__
 *
 * To run a query within a React component, call `useGetUserJobAndItemClassesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserJobAndItemClassesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserJobAndItemClassesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserJobAndItemClassesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserJobAndItemClassesQuery, GetUserJobAndItemClassesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserJobAndItemClassesQuery, GetUserJobAndItemClassesQueryVariables>(GetUserJobAndItemClassesDocument, baseOptions);
      }
export function useGetUserJobAndItemClassesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserJobAndItemClassesQuery, GetUserJobAndItemClassesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserJobAndItemClassesQuery, GetUserJobAndItemClassesQueryVariables>(GetUserJobAndItemClassesDocument, baseOptions);
        }
export type GetUserJobAndItemClassesQueryHookResult = ReturnType<typeof useGetUserJobAndItemClassesQuery>;
export type GetUserJobAndItemClassesLazyQueryHookResult = ReturnType<typeof useGetUserJobAndItemClassesLazyQuery>;
export type GetUserJobAndItemClassesQueryResult = ApolloReactCommon.QueryResult<GetUserJobAndItemClassesQuery, GetUserJobAndItemClassesQueryVariables>;
export const GetUserJobAndVendorCategoriesDocument = gql`
    query getUserJobAndVendorCategories {
  getUserJobForUserInProgress {
    id
    userId
    vendorId
    uuid
    fileType
    inProgress
    status
    created
    userJobCategories {
      userJobId
      category
      filePath
      downloaded
      available
      userJobCategoryItemClasses {
        id
        userJobCategoryId
        itemClass
        itemClassDescription
      }
    }
  }
  vendorCategoriesForUser {
    category
  }
}
    `;

/**
 * __useGetUserJobAndVendorCategoriesQuery__
 *
 * To run a query within a React component, call `useGetUserJobAndVendorCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserJobAndVendorCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserJobAndVendorCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserJobAndVendorCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserJobAndVendorCategoriesQuery, GetUserJobAndVendorCategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserJobAndVendorCategoriesQuery, GetUserJobAndVendorCategoriesQueryVariables>(GetUserJobAndVendorCategoriesDocument, baseOptions);
      }
export function useGetUserJobAndVendorCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserJobAndVendorCategoriesQuery, GetUserJobAndVendorCategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserJobAndVendorCategoriesQuery, GetUserJobAndVendorCategoriesQueryVariables>(GetUserJobAndVendorCategoriesDocument, baseOptions);
        }
export type GetUserJobAndVendorCategoriesQueryHookResult = ReturnType<typeof useGetUserJobAndVendorCategoriesQuery>;
export type GetUserJobAndVendorCategoriesLazyQueryHookResult = ReturnType<typeof useGetUserJobAndVendorCategoriesLazyQuery>;
export type GetUserJobAndVendorCategoriesQueryResult = ApolloReactCommon.QueryResult<GetUserJobAndVendorCategoriesQuery, GetUserJobAndVendorCategoriesQueryVariables>;
export const GetUserJobsForUserDocument = gql`
    query getUserJobsForUser {
  getUserJobsForUser {
    id
    userId
    vendorId
    uuid
    fileType
    inProgress
    status
    created
    userJobCategories {
      id
      userJobId
      category
      filePath
      downloaded
      available
      userJobCategoryItemClasses {
        id
        userJobCategoryId
        itemClass
        itemClassDescription
      }
    }
  }
}
    `;

/**
 * __useGetUserJobsForUserQuery__
 *
 * To run a query within a React component, call `useGetUserJobsForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserJobsForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserJobsForUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserJobsForUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserJobsForUserQuery, GetUserJobsForUserQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserJobsForUserQuery, GetUserJobsForUserQueryVariables>(GetUserJobsForUserDocument, baseOptions);
      }
export function useGetUserJobsForUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserJobsForUserQuery, GetUserJobsForUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserJobsForUserQuery, GetUserJobsForUserQueryVariables>(GetUserJobsForUserDocument, baseOptions);
        }
export type GetUserJobsForUserQueryHookResult = ReturnType<typeof useGetUserJobsForUserQuery>;
export type GetUserJobsForUserLazyQueryHookResult = ReturnType<typeof useGetUserJobsForUserLazyQuery>;
export type GetUserJobsForUserQueryResult = ApolloReactCommon.QueryResult<GetUserJobsForUserQuery, GetUserJobsForUserQueryVariables>;
export const GetUserJobForUserInProgressDocument = gql`
    query getUserJobForUserInProgress {
  getUserJobForUserInProgress {
    id
    userId
    vendorId
    uuid
    fileType
    inProgress
    status
    created
    userJobCategories {
      id
      userJobId
      category
      filePath
      downloaded
      available
      userJobCategoryItemClasses {
        id
        userJobCategoryId
        itemClass
        itemClassDescription
      }
    }
  }
}
    `;

/**
 * __useGetUserJobForUserInProgressQuery__
 *
 * To run a query within a React component, call `useGetUserJobForUserInProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserJobForUserInProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserJobForUserInProgressQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserJobForUserInProgressQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetUserJobForUserInProgressQuery, GetUserJobForUserInProgressQueryVariables>) {
        return ApolloReactHooks.useQuery<GetUserJobForUserInProgressQuery, GetUserJobForUserInProgressQueryVariables>(GetUserJobForUserInProgressDocument, baseOptions);
      }
export function useGetUserJobForUserInProgressLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserJobForUserInProgressQuery, GetUserJobForUserInProgressQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetUserJobForUserInProgressQuery, GetUserJobForUserInProgressQueryVariables>(GetUserJobForUserInProgressDocument, baseOptions);
        }
export type GetUserJobForUserInProgressQueryHookResult = ReturnType<typeof useGetUserJobForUserInProgressQuery>;
export type GetUserJobForUserInProgressLazyQueryHookResult = ReturnType<typeof useGetUserJobForUserInProgressLazyQuery>;
export type GetUserJobForUserInProgressQueryResult = ApolloReactCommon.QueryResult<GetUserJobForUserInProgressQuery, GetUserJobForUserInProgressQueryVariables>;
export const MeAndVendorsForSelectionDocument = gql`
    query meAndVendorsForSelection {
  getMe {
    id
    firstName
    lastName
    fullName
    email
    active
    alertProductAdded
    alertProductDiscontinued
    alertProductUpdated
    alertEmail
    vendorId
    vendor {
      id
      name
      logo
    }
    userRoles {
      id
      role
    }
  }
  vendors(skip: 0, pageSize: 100, searchText: "") {
    vendors {
      id
      name
    }
  }
}
    `;

/**
 * __useMeAndVendorsForSelectionQuery__
 *
 * To run a query within a React component, call `useMeAndVendorsForSelectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeAndVendorsForSelectionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeAndVendorsForSelectionQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeAndVendorsForSelectionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeAndVendorsForSelectionQuery, MeAndVendorsForSelectionQueryVariables>) {
        return ApolloReactHooks.useQuery<MeAndVendorsForSelectionQuery, MeAndVendorsForSelectionQueryVariables>(MeAndVendorsForSelectionDocument, baseOptions);
      }
export function useMeAndVendorsForSelectionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeAndVendorsForSelectionQuery, MeAndVendorsForSelectionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeAndVendorsForSelectionQuery, MeAndVendorsForSelectionQueryVariables>(MeAndVendorsForSelectionDocument, baseOptions);
        }
export type MeAndVendorsForSelectionQueryHookResult = ReturnType<typeof useMeAndVendorsForSelectionQuery>;
export type MeAndVendorsForSelectionLazyQueryHookResult = ReturnType<typeof useMeAndVendorsForSelectionLazyQuery>;
export type MeAndVendorsForSelectionQueryResult = ApolloReactCommon.QueryResult<MeAndVendorsForSelectionQuery, MeAndVendorsForSelectionQueryVariables>;
export const UserByIdAndVendorsForSelectionDocument = gql`
    query userByIdAndVendorsForSelection($id: Int!) {
  userById(id: $id) {
    id
    firstName
    lastName
    email
    active
    alertProductAdded
    alertProductDiscontinued
    alertProductUpdated
    alertEmail
    vendor {
      id
      name
      logo
    }
    userRoles
  }
  vendors(skip: 0, pageSize: 100, searchText: "") {
    vendors {
      id
      name
    }
  }
}
    `;

/**
 * __useUserByIdAndVendorsForSelectionQuery__
 *
 * To run a query within a React component, call `useUserByIdAndVendorsForSelectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserByIdAndVendorsForSelectionQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserByIdAndVendorsForSelectionQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserByIdAndVendorsForSelectionQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserByIdAndVendorsForSelectionQuery, UserByIdAndVendorsForSelectionQueryVariables>) {
        return ApolloReactHooks.useQuery<UserByIdAndVendorsForSelectionQuery, UserByIdAndVendorsForSelectionQueryVariables>(UserByIdAndVendorsForSelectionDocument, baseOptions);
      }
export function useUserByIdAndVendorsForSelectionLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserByIdAndVendorsForSelectionQuery, UserByIdAndVendorsForSelectionQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserByIdAndVendorsForSelectionQuery, UserByIdAndVendorsForSelectionQueryVariables>(UserByIdAndVendorsForSelectionDocument, baseOptions);
        }
export type UserByIdAndVendorsForSelectionQueryHookResult = ReturnType<typeof useUserByIdAndVendorsForSelectionQuery>;
export type UserByIdAndVendorsForSelectionLazyQueryHookResult = ReturnType<typeof useUserByIdAndVendorsForSelectionLazyQuery>;
export type UserByIdAndVendorsForSelectionQueryResult = ApolloReactCommon.QueryResult<UserByIdAndVendorsForSelectionQuery, UserByIdAndVendorsForSelectionQueryVariables>;
export const VendorByIdDocument = gql`
    query vendorById($id: Int!) {
  vendorById(id: $id) {
    id
    name
    logo
    vendorCategories {
      id
      category
      itemClasses {
        id
        itemClass
      }
    }
  }
}
    `;

/**
 * __useVendorByIdQuery__
 *
 * To run a query within a React component, call `useVendorByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useVendorByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVendorByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useVendorByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<VendorByIdQuery, VendorByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<VendorByIdQuery, VendorByIdQueryVariables>(VendorByIdDocument, baseOptions);
      }
export function useVendorByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<VendorByIdQuery, VendorByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<VendorByIdQuery, VendorByIdQueryVariables>(VendorByIdDocument, baseOptions);
        }
export type VendorByIdQueryHookResult = ReturnType<typeof useVendorByIdQuery>;
export type VendorByIdLazyQueryHookResult = ReturnType<typeof useVendorByIdLazyQuery>;
export type VendorByIdQueryResult = ApolloReactCommon.QueryResult<VendorByIdQuery, VendorByIdQueryVariables>;
export const VendorByIdAndItemClassesDocument = gql`
    query vendorByIdAndItemClasses($id: Int!, $categories: [String!]!) {
  vendorById(id: $id) {
    id
    name
    logo
    vendorCategories {
      id
      vendorId
      category
      itemClasses {
        id
        vendorId
        vendorCategoryId
        itemClass
      }
    }
  }
  getItemClassesForCategories(categories: $categories) {
    groups {
      category
      itemClasses {
        category
        itemClass
        itemClassDescription
      }
    }
  }
}
    `;

/**
 * __useVendorByIdAndItemClassesQuery__
 *
 * To run a query within a React component, call `useVendorByIdAndItemClassesQuery` and pass it any options that fit your needs.
 * When your component renders, `useVendorByIdAndItemClassesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVendorByIdAndItemClassesQuery({
 *   variables: {
 *      id: // value for 'id'
 *      categories: // value for 'categories'
 *   },
 * });
 */
export function useVendorByIdAndItemClassesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<VendorByIdAndItemClassesQuery, VendorByIdAndItemClassesQueryVariables>) {
        return ApolloReactHooks.useQuery<VendorByIdAndItemClassesQuery, VendorByIdAndItemClassesQueryVariables>(VendorByIdAndItemClassesDocument, baseOptions);
      }
export function useVendorByIdAndItemClassesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<VendorByIdAndItemClassesQuery, VendorByIdAndItemClassesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<VendorByIdAndItemClassesQuery, VendorByIdAndItemClassesQueryVariables>(VendorByIdAndItemClassesDocument, baseOptions);
        }
export type VendorByIdAndItemClassesQueryHookResult = ReturnType<typeof useVendorByIdAndItemClassesQuery>;
export type VendorByIdAndItemClassesLazyQueryHookResult = ReturnType<typeof useVendorByIdAndItemClassesLazyQuery>;
export type VendorByIdAndItemClassesQueryResult = ApolloReactCommon.QueryResult<VendorByIdAndItemClassesQuery, VendorByIdAndItemClassesQueryVariables>;
export const VendorCategoriesForUserDocument = gql`
    query vendorCategoriesForUser {
  vendorCategoriesForUser {
    category
  }
}
    `;

/**
 * __useVendorCategoriesForUserQuery__
 *
 * To run a query within a React component, call `useVendorCategoriesForUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useVendorCategoriesForUserQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVendorCategoriesForUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useVendorCategoriesForUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<VendorCategoriesForUserQuery, VendorCategoriesForUserQueryVariables>) {
        return ApolloReactHooks.useQuery<VendorCategoriesForUserQuery, VendorCategoriesForUserQueryVariables>(VendorCategoriesForUserDocument, baseOptions);
      }
export function useVendorCategoriesForUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<VendorCategoriesForUserQuery, VendorCategoriesForUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<VendorCategoriesForUserQuery, VendorCategoriesForUserQueryVariables>(VendorCategoriesForUserDocument, baseOptions);
        }
export type VendorCategoriesForUserQueryHookResult = ReturnType<typeof useVendorCategoriesForUserQuery>;
export type VendorCategoriesForUserLazyQueryHookResult = ReturnType<typeof useVendorCategoriesForUserLazyQuery>;
export type VendorCategoriesForUserQueryResult = ApolloReactCommon.QueryResult<VendorCategoriesForUserQuery, VendorCategoriesForUserQueryVariables>;
export const XpoRowsBySopNumberDocument = gql`
    query xpoRowsBySopNumber($sopNumber: String!) {
  xpoRowsBySopNumber(sopNumber: $sopNumber) {
    SopNumber
    AdditionalPO
    ServiceLevelCode
    OrderLocationCode
    ShipToName
    Address1
    Address2
    Address3
    City
    State
    ZipCode
  }
}
    `;

/**
 * __useXpoRowsBySopNumberQuery__
 *
 * To run a query within a React component, call `useXpoRowsBySopNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useXpoRowsBySopNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useXpoRowsBySopNumberQuery({
 *   variables: {
 *      sopNumber: // value for 'sopNumber'
 *   },
 * });
 */
export function useXpoRowsBySopNumberQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<XpoRowsBySopNumberQuery, XpoRowsBySopNumberQueryVariables>) {
        return ApolloReactHooks.useQuery<XpoRowsBySopNumberQuery, XpoRowsBySopNumberQueryVariables>(XpoRowsBySopNumberDocument, baseOptions);
      }
export function useXpoRowsBySopNumberLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<XpoRowsBySopNumberQuery, XpoRowsBySopNumberQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<XpoRowsBySopNumberQuery, XpoRowsBySopNumberQueryVariables>(XpoRowsBySopNumberDocument, baseOptions);
        }
export type XpoRowsBySopNumberQueryHookResult = ReturnType<typeof useXpoRowsBySopNumberQuery>;
export type XpoRowsBySopNumberLazyQueryHookResult = ReturnType<typeof useXpoRowsBySopNumberLazyQuery>;
export type XpoRowsBySopNumberQueryResult = ApolloReactCommon.QueryResult<XpoRowsBySopNumberQuery, XpoRowsBySopNumberQueryVariables>;