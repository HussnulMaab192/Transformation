const express = require("express");
const app = express();
const port = 5000;
const jslt = require("jslt");
const cors = require("cors");

var inputObjects = [];
var targetedKey = "";

const mapKeyValues = [
  {
    bcbsma_eligibility_20230731: [
      {
        mappedGroupId: "group_id",
        mappedMemberId: "member_id",
        mappedDependentId: "dependent_id",
        mappedFirstName: "first_name",
        mappedMiddleName: "middle_name",
        mappedLastName: "last_name",
        mappedRelationship: "relationship",
        mappedEmail: "email",
        mappedDateOfBirth: "dob",
        mappedGender: "gender",
        mappedAddress: "address",
        mappedAddress2: "address_2",
        mappedCity: "city",
        mappedState: "state",
        mappedZipCode: "zip_code",
        mappedPhone: "phone",
        mappedStartDate: "start_date",
        mappedTermDate: "term_date",
        mappedT2dFlag: "t2d_flag",
        mappedFundingType: "funding_type",
        mappedGroupName: "group_name",
        mappedAccountName: "account_name",
        mappedAccountNumber: "account_number",
        mappedProduct: "product",
      },
    ],

    cofw_marketingcontact_elig_20230628180022: [
      {
        mappedRecordIndicator: "record_indicator",
        mappedPersonId: "PersonId",
        mappedSubscriberId: "SubscriberId",
        mappedEmployeeId: "EmployeeId",
        mappedSubEmployeeId: "SubEmployeeId",
        mappedMemberId: "MemberId",
        mappedSSN: "SSN",
        mappedSubSSN: "SubSSN",
        mappedRelationshipCode: "RelationshipCode",
        mappedRelationCodeDesc: "RelationCodeDesc",
        mappedNamePrefix: "NamePrefix",
        mappedFirstName: "FirstName",
        mappedMiddleName: "MiddleName",
        mappedLastName: "LastName",
        mappedNameSuffix: "NameSuffix",
        mappedGender: "Gender",
        mappedDateOfBirth: "BirthDate",
        mappedAddressline1: "Addressline1",
        mappedAddressline2: "Addressline2",
        mappedAddressline3: "Addressline3",
        mappedCity: "City",
        mappedStateProvince: "StateProvince",
        mappedPostalCode: "PostalCode",
        mappedCountryCode: "CountryCode",
        mappedHomePhone: "HomePhone",
        mappedCellPhone: "CellPhone",
        mappedWorkPhone: "WorkPhone",
        mappedEmail: "Email",
        mappedCustomer: "Customer",
        mappedPartner: "Partner",
        mappedBenStartDate: "BenStartDate",
        mappedBenEndDate: "BenEndDate",
        mappedMedicalPlanName: "MedicalPlanName",
        mappedCarrier: "Carrier",
        mappedGroupName: "GroupName",
        mappedEmployeeFlag: "EmployeeFlag",
        mappedWorkLocation: "WorkLocation",
        mappedDepartment: "Department",
        mappedDivision: "Division",
        mappedTerminationDate: "TerminationDate",
        mappedRunDate: "RunDate",
      },
    ],
    bcbsne_eligibility_20230826: [
      {
        mappedSUBGROUP_ID_NUMBER: "SUBGROUP_ID_NUMBER",
        mappedSUBGROUP_NAME: "SUBGROUP_NAME",
        mappedPRIMARY_SUBSCRIBER_ID: "PRIMARY_SUBSCRIBER_ID",
        mappedMEMBER_ID: "MEMBER_ID",
        mappedPLAN_EFFECTIVE_DATE: "PLAN_EFFECTIVE_DATE",
        mappedPLAN_END_DATE: "PLAN_END_DATE",
        mappedRELATIONSHIP: "RELATIONSHIP",
        mappedMEMBER_FIRST_NAME: "MEMBER_FIRST_NAME",
        mappedMEMBER_LAST_NAME: "MEMBER_LAST_NAME",
        mappedDateOfBirth: "MEMBER_DATE_OF_BIRTH",
        mappedMEMBER_GENDER: "MEMBER_GENDER",
        mappedSTREET_ADDRESS: "STREET_ADDRESS",
        mappedCITY: "CITY",
        mappedSTATE_CODE: "STATE_CODE",
        mappedZIP_CODE: "ZIP_CODE",
        mappedEMAIL: "EMAIL",
        mappedPHONE_NUMBER: "PHONE_NUMBER",
        mappedPLAN_TYPE: "PLAN_TYPE",
        mappedPLAN_TYPE_DETAIL: "PLAN_TYPE_DETAIL",
        mappedPLAN_NAME: "PLAN_NAME",
        mappedCOVERAGE_CODE: "COVERAGE_CODE",
        mappedFUNDING_TYPE: "FUNDING_TYPE",
        mappedEMPLOYEE_ID: "EMPLOYEE_ID",
        mappedMASTER_GROUP_ID: "MASTER_GROUP_ID",
        mappedT2D_FLAG: "T2D_FLAG",
      },
    ],

    marpai_virta_eligibility_06242023: [
      {
        mappedBlockofBusiness: "BlockofBusiness",
        mappedClientID: "ClientID",
        mappedClientName: "ClientName",
        mappedStatus: "Status",
        mappedMemberCertificateNumber: "MemberCertificateNumber",
        mappedCoverageBeginDate: "CoverageBeginDate",
        mappedCoverageEndDate: "CoverageEndDate",
        mappedRelationshipToEmployee: "RelationshipToEmployee",
        mappedRelationshipToInsured: "RelationshipToInsured",
        mappedLastName: "LastName",
        mappedFirstName: "FirstName",
        mappedMI: "MI",
        mappedSuffix: "Suffix",
        mappedPhonenumber: "Phonenumber",
        mappedEmail: "Email",
        mappedDateOfBirth: "BirthDate",
        mappedEESSN: "EESSN",
        mappedDEPSSN: "DEPSSN",
        mappedBenefitPlan: "BenefitPlan",
        mappedCoverageLevel: "CoverageLevel",
        mappedPrescriptionBenefitPlan: "PrescriptionBenefitPlan",
        mappedPrescriptionCoverageLevel: "PrescriptionCoverageLevel",
        mappedAddress1: "Address1",
        mappedAddress2: "Address2",
        mappedCity: "City",
        mappedStates: "States",
        mappedPostalCode: "PostalCode",
        mappedGender: "Gender",
        mappedLocation: "Location",
        mappedDepartment: "Department",
        mappedEmployeeCertificateNumber: "EmployeeCertificateNumber",
      },
    ],

    pdl_test_brdg_virta_elig_20230622171759: [
      {
        mappedRecordIndicator: "record_indicator",
        mappedPersonId: "PersonId",
        mappedSubscriberId: "SubscriberId",
        mappedEmployeeId: "EmployeeId",
        mappedSubEmployeeId: "SubEmployeeId",
        mappedMemberId: "MemberId",
        mappedSSN: "SSN",
        mappedSubSSN: "SubSSN",
        mappedRelationshipCode: "RelationshipCode",
        mappedRelationCodeDesc: "RelationCodeDesc",
        mappedNamePrefix: "NamePrefix",
        mappedFirstName: "FirstName",
        mappedMiddleName: "MiddleName",
        mappedLastName: "LastName",
        mappedNameSuffix: "NameSuffix",
        mappedGender: "Gender",
        mappedDateOfBirth: "BirthDate",
        mappedAddressline1: "Addressline1",
        mappedAddressline2: "Addressline2",
        mappedAddressline3: "Addressline3",
        mappedCity: "City",
        mappedStateProvince: "StateProvince",
        mappedPostalCode: "PostalCode",
        mappedCountryCode: "CountryCode",
        mappedHomePhone: "HomePhone",
        mappedCellPhone: "CellPhone",
        mappedWorkPhone: "WorkPhone",
        mappedEmail: "Email",
        mappedCustomer: "Customer",
        mappedPartner: "Partner",
        mappedBenStartDate: "BenStartDate",
        mappedBenEndDate: "BenEndDate",
        mappedMedicalPlanName: "MedicalPlanName",
        mappedCarrier: "Carrier",
        mappedGroupName: "GroupName",
        mappedEmployeeFlag: "EmployeeFlag",
        mappedWorkLocation: "WorkLocation",
        mappedDepartment: "Department",
        mappedDivision: "Division",
        mappedTerminationDate: "TerminationDate",
        mappedRunDate: "RunDate",
      },
    ],
  },
];

function mapedValues(inputObject, targetedKey) {
  for (const objectKey in mapKeyValues[0]) {
    if (objectKey == targetedKey) {
      return mapKeyValues[0][targetedKey];
    }
  }
}

const transformationTemplate = {
  bcbsma_eligibility_20230731: {
    first_name: {
      $fetch: "{{mappedFirstName}}",
      $translate: [{ from: null, to: "" }],
    },
    group_id: {
      $fetch: "{{mappedGroupId}}",
      $translate: [{ from: null, to: "" }],
    },

    last_name: {
      $fetch: "{{mappedLastName}}",
      $translate: [{ from: null, to: "" }],
    },
    middle_name: {
      $fetch: "{{mappedMiddleName}}",
      $translate: [{ from: null, to: "" }],
    },
    gender: {
      $fetch: "{{mappedGender}}",
      $translate: [
        { from: "Male", to: "M" },
        { from: "male", to: "M" },
        { from: "FeMale", to: "F" },
        { from: "female", to: "F" },
        { from: "Female", to: "F" },
      ],
    },

    member_id: {
      $fetch: "{{mappedMemberId}}",
      $translate: [{ from: null, to: "" }],
    },
    relationship: {
      $fetch: "{{mappedRelationship}}",
      $translate: [{ from: null, to: "" }],
    },
    email: {
      $fetch: "{{mappedEmail}}",
      $translate: [{ from: null, to: "" }],
    },
    date_of_birth: {
      $fetch: "{{mappedDateOfBirth}}",
    },

    street_address: {
      $fetch: "{{mappedAddress}}",
      $translate: [{ from: null, to: "" }],
    },
    street_address_2: {
      $fetch: "{{mappedAddress2}}",
      $translate: [{ from: null, to: "" }],
    },
    city: {
      $fetch: "{{mappedCity}}",
      $translate: [{ from: null, to: "" }],
    },
    state_code: {
      $fetch: "{{mappedState}}",
      $translate: [{ from: null, to: "" }],
    },
    zip_code: {
      $fetch: "{{mappedZipCode}}",
      $translate: [{ from: null, to: "" }],
    },
    phone: {
      $fetch: "{{mappedPhone}}",
      $translate: [{ from: null, to: "" }],
    },
    start_date: {
      $fetch: "{{mappedStartDate}}",
      $translate: [{ from: null, to: "" }],
    },
    term_date: {
      $fetch: "{{mappedTermDate}}",
      $translate: [{ from: null, to: "" }],
    },
    t2d_flag: {
      $fetch: "{{mappedT2dFlag}}",
      $translate: [{ from: null, to: "" }],
    },
    funding_type: {
      $fetch: "{{mappedFundingType}}",
      $translate: [{ from: null, to: "" }],
    },
    group_name: {
      $fetch: "{{mappedGroupName}}",
      $translate: [{ from: null, to: "" }],
    },
    account_name: {
      $fetch: "{{mappedAccountName}}",
      $translate: [{ from: null, to: "" }],
    },
    account_number: {
      $fetch: "{{mappedAccountNumber}}",
      $translate: [{ from: null, to: "" }],
    },
    product: {
      $fetch: "{{mappedProduct}}",
      $translate: [{ from: null, to: "" }],
    },
  },

  cofw_marketingcontact_elig_20230628180022: {
    record_indicator: {
      $fetch: "{{mappedRecordIndicator}}",
      $translate: [{ from: null, to: "" }],
    },
    person_id: {
      $fetch: "{{mappedPersonId}}",
      $translate: [{ from: null, to: "" }],
    },
    subscriber_id: {
      $fetch: "{{mappedSubscriberId}}",
      $translate: [{ from: null, to: "" }],
    },
    employee_id: {
      $fetch: "{{mappedEmployeeId}}",
      $translate: [{ from: null, to: "" }],
    },
    sub_employee_id: {
      $fetch: "{{mappedSubEmployeeId}}",
      $translate: [{ from: null, to: "" }],
    },
    member_id: {
      $fetch: "{{mappedMemberId}}",
      $translate: [{ from: null, to: "" }],
    },
    ssn: {
      $fetch: "{{mappedSSN}}",
      $translate: [{ from: null, to: "" }],
    },
    sub_ssn: {
      $fetch: "{{mappedSubSSN}}",
      $translate: [{ from: null, to: "" }],
    },
    relationship: {
      $fetch: "{{mappedRelationshipCode}}",
      $translate: [{ from: null, to: "" }],
    },
    relation_code_desc: {
      $fetch: "{{mappedRelationCodeDesc}}",
      $translate: [{ from: null, to: "" }],
    },
    name_prefix: {
      $fetch: "{{mappedNamePrefix}}",
      $translate: [{ from: null, to: "" }],
    },
    first_name: {
      $fetch: "{{mappedFirstName}}",
      $translate: [{ from: null, to: "" }],
    },
    middle_name: {
      $fetch: "{{mappedMiddleName}}",
      $translate: [{ from: null, to: "" }],
    },
    last_name: {
      $fetch: "{{mappedLastName}}",
      $translate: [{ from: null, to: "" }],
    },
    name_suffix: {
      $fetch: "{{mappedNameSuffix}}",
      $translate: [{ from: null, to: "" }],
    },
    gender: {
      $fetch: "{{mappedGender}}",
      $translate: [
        { from: "Male", to: "M" },
        { from: "male", to: "M" },
        { from: "FeMale", to: "F" },
        { from: "female", to: "F" },
        { from: "Female", to: "F" },
      ],
    },
    date_of_birth: {
      $fetch: "{{mappedDateOfBirth}}",
      $translate: [{ from: null, to: "" }],
    },
    street_address: {
      $fetch: "{{mappedAddressline1}}",
      $translate: [{ from: null, to: "" }],
    },
    street_address_2: {
      $fetch: "{{mappedAddressline2}}",
      $translate: [{ from: null, to: "" }],
    },
    street_address_3: {
      $fetch: "{{mappedAddressline3}}",
      $translate: [{ from: null, to: "" }],
    },
    city: {
      $fetch: "{{mappedCity}}",
      $translate: [{ from: null, to: "" }],
    },
    state_code: {
      $fetch: "{{mappedStateProvince}}",
      $translate: [{ from: null, to: "" }],
    },
    postal_code: {
      $fetch: "{{mappedPostalCode}}",
      $translate: [{ from: null, to: "" }],
    },
    country_code: {
      $fetch: "{{mappedCountryCode}}",
      $translate: [{ from: null, to: "" }],
    },
    home_phone: {
      $fetch: "{{mappedHomePhone}}",
      $translate: [{ from: null, to: "" }],
    },
    phone: {
      $fetch: "{{mappedCellPhone}}",
      $translate: [{ from: null, to: "" }],
    },
    work_phone: {
      $fetch: "{{mappedWorkPhone}}",
      $translate: [{ from: null, to: "" }],
    },
    email: {
      $fetch: "{{mappedEmail}}",
      $translate: [{ from: null, to: "" }],
    },
    customer: {
      $fetch: "{{mappedCustomer}}",
      $translate: [{ from: null, to: "" }],
    },
    partner: {
      $fetch: "{{mappedPartner}}",
      $translate: [{ from: null, to: "" }],
    },
    ben_start_date: {
      $fetch: "{{mappedBenStartDate}}",
      $translate: [{ from: null, to: "" }],
    },
    ben_end_date: {
      $fetch: "{{mappedBenEndDate}}",
      $translate: [{ from: null, to: "" }],
    },
    medical_plan_name: {
      $fetch: "{{mappedMedicalPlanName}}",
      $translate: [{ from: null, to: "" }],
    },
    carrier: {
      $fetch: "{{mappedCarrier}}",
      $translate: [{ from: null, to: "" }],
    },
    group_name: {
      $fetch: "{{mappedGroupName}}",
      $translate: [{ from: null, to: "" }],
    },
    employee_flag: {
      $fetch: "{{mappedEmployeeFlag}}",
      $translate: [{ from: null, to: "" }],
    },
    work_location: {
      $fetch: "{{mappedWorkLocation}}",
      $translate: [{ from: null, to: "" }],
    },
    department: {
      $fetch: "{{mappedDepartment}}",
      $translate: [{ from: null, to: "" }],
    },
    division: {
      $fetch: "{{mappedDivision}}",
      $translate: [{ from: null, to: "" }],
    },
    termination_date: {
      $fetch: "{{mappedTerminationDate}}",
      $translate: [{ from: null, to: "" }],
    },
    run_date: {
      $fetch: "{{mappedRunDate}}",
      $translate: [{ from: null, to: "" }],
    },
  },
  bcbsne_eligibility_20230826: {
    subgroup_id_number: {
      $fetch: "{{mappedSUBGROUP_ID_NUMBER}}",
      $translate: [{ from: null, to: "" }],
    },
    subgroup_name: {
      $fetch: "{{mappedSUBGROUP_NAME}}",
      $translate: [{ from: null, to: "" }],
    },
    primary_subscriber_id: {
      $fetch: "{{mappedPRIMARY_SUBSCRIBER_ID}}",
      $translate: [{ from: null, to: "" }],
    },
    member_id: {
      $fetch: "{{mappedMEMBER_ID}}",
      $translate: [{ from: null, to: "" }],
    },
    plan_effective_date: {
      $fetch: "{{mappedPLAN_EFFECTIVE_DATE}}",
      $translate: [{ from: null, to: "" }],
    },
    plan_end_date: {
      $fetch: "{{mappedPLAN_END_DATE}}",
      $translate: [{ from: null, to: "" }],
    },
    relationship: {
      $fetch: "{{mappedRELATIONSHIP}}",
      $translate: [{ from: null, to: "" }],
    },
    first_name: {
      $fetch: "{{mappedMEMBER_FIRST_NAME}}",
      $translate: [{ from: null, to: "" }],
    },
    last_name: {
      $fetch: "{{mappedMEMBER_LAST_NAME}}",
      $translate: [{ from: null, to: "" }],
    },

    date_of_birth: {
      $fetch: "{{mappedDateOfBirth}}",
    },
    gender: {
      $fetch: "{{mappedMEMBER_GENDER}}",
      $translate: [{ from: null, to: "" }],
    },
    street_address: {
      $fetch: "{{mappedSTREET_ADDRESS}}",
      $translate: [{ from: null, to: "" }],
    },
    city: {
      $fetch: "{{mappedCITY}}",
      $translate: [{ from: null, to: "" }],
    },
    state_code: {
      $fetch: "{{mappedSTATE_CODE}}",
      $translate: [{ from: null, to: "" }],
    },
    zip_code: {
      $fetch: "{{mappedZIP_CODE}}",
      $translate: [{ from: null, to: "" }],
    },
    email: {
      $fetch: "{{mappedEMAIL}}",
      $translate: [{ from: null, to: "" }],
    },
    phone: {
      $fetch: "{{mappedPHONE_NUMBER}}",
      $translate: [{ from: null, to: "" }],
    },
    plan_type: {
      $fetch: "{{mappedPLAN_TYPE}}",
      $translate: [{ from: null, to: "" }],
    },
    plan_type_detail: {
      $fetch: "{{mappedPLAN_TYPE_DETAIL}}",
      $translate: [{ from: null, to: "" }],
    },
    plan_name: {
      $fetch: "{{mappedPLAN_NAME}}",
      $translate: [{ from: null, to: "" }],
    },
    coverage_code: {
      $fetch: "{{mappedCOVERAGE_CODE}}",
      $translate: [{ from: null, to: "" }],
    },
    funding_type: {
      $fetch: "{{mappedFUNDING_TYPE}}",
      $translate: [{ from: null, to: "" }],
    },
    employee_id: {
      $fetch: "{{mappedEMPLOYEE_ID}}",
      $translate: [{ from: null, to: "" }],
    },
    master_group_id: {
      $fetch: "{{mappedMASTER_GROUP_ID}}",
      $translate: [{ from: null, to: "" }],
    },
    t2d_flag: {
      $fetch: "{{mappedT2D_FLAG}}",
      $translate: [{ from: null, to: "" }],
    },
  },
  marpai_virta_eligibility_06242023: {
    block_of_business: {
      $fetch: "{{mappedBlockofBusiness}}",
      $translate: [{ from: null, to: "" }],
    },
    client_id: {
      $fetch: "{{mappedClientID}}",
      $translate: [{ from: null, to: "" }],
    },
    client_name: {
      $fetch: "{{mappedClientName}}",
      $translate: [{ from: null, to: "" }],
    },
    status: {
      $fetch: "{{mappedStatus}}",
      $translate: [{ from: null, to: "" }],
    },
    member_certificate_number: {
      $fetch: "{{mappedMemberCertificateNumber}}",
      $translate: [{ from: null, to: "" }],
    },
    coverage_begin_date: {
      $fetch: "{{mappedCoverageBeginDate}}",
      $translate: [{ from: null, to: "" }],
    },
    coverage_end_date: {
      $fetch: "{{mappedCoverageEndDate}}",
      $translate: [{ from: null, to: "" }],
    },
    relationship_to_employee: {
      $fetch: "{{mappedRelationshipToEmployee}}",
      $translate: [{ from: null, to: "" }],
    },
    relationship_to_insured: {
      $fetch: "{{mappedRelationshipToInsured}}",
      $translate: [{ from: null, to: "" }],
    },
    last_name: {
      $fetch: "{{mappedLastName}}",
      $translate: [{ from: null, to: "" }],
    },
    first_name: {
      $fetch: "{{mappedFirstName}}",
      $translate: [{ from: null, to: "" }],
    },
    middle_name: {
      $fetch: "{{mappedMI}}",
      $translate: [{ from: null, to: "" }],
    },
    suffix: {
      $fetch: "{{mappedSuffix}}",
      $translate: [{ from: null, to: "" }],
    },
    phone: {
      $fetch: "{{mappedPhonenumber}}",
      $translate: [{ from: null, to: "" }],
    },
    email: {
      $fetch: "{{mappedEmail}}",
      $translate: [{ from: null, to: "" }],
    },
    date_of_birth: {
      $fetch: "{{mappedDateOfBirth}}",
    },
    eessn: {
      $fetch: "{{mappedEESSN}}",
      $translate: [{ from: null, to: "" }],
    },
    depssn: {
      $fetch: "{{mappedDEPSSN}}",
      $translate: [{ from: null, to: "" }],
    },
    benefit_plan: {
      $fetch: "{{mappedBenefitPlan}}",
      $translate: [{ from: null, to: "" }],
    },
    coverage_level: {
      $fetch: "{{mappedCoverageLevel}}",
      $translate: [{ from: null, to: "" }],
    },
    prescription_benefit_plan: {
      $fetch: "{{mappedPrescriptionBenefitPlan}}",
      $translate: [{ from: null, to: "" }],
    },
    prescription_coverage_level: {
      $fetch: "{{mappedPrescriptionCoverageLevel}}",
      $translate: [{ from: null, to: "" }],
    },
    address: {
      $fetch: "{{mappedAddress1}}",
      $translate: [{ from: null, to: "" }],
    },
    address_1: {
      $fetch: "{{mappedAddress2}}",
      $translate: [{ from: null, to: "" }],
    },
    city: {
      $fetch: "{{mappedCity}}",
      $translate: [{ from: null, to: "" }],
    },
    state_code: {
      $fetch: "{{mappedStates}}",
      $translate: [{ from: null, to: "" }],
    },
    postal_code: {
      $fetch: "{{mappedPostalCode}}",
      $translate: [{ from: null, to: "" }],
    },
    gender: {
      $fetch: "{{mappedGender}}",
      $translate: [{ from: null, to: "" }],
    },
    location: {
      $fetch: "{{mappedLocation}}",
      $translate: [{ from: null, to: "" }],
    },
    department: {
      $fetch: "{{mappedDepartment}}",
      $translate: [{ from: null, to: "" }],
    },
    employee_certificate_number: {
      $fetch: "{{mappedEmployeeCertificateNumber}}",
      $translate: [{ from: null, to: "" }],
    },
  },
  pdl_test_brdg_virta_elig_20230622171759: {
    record_indicator: {
      $fetch: "{{mappedRecordIndicator}}",
      $translate: [{ from: null, to: "" }],
    },
    person_id: {
      $fetch: "{{mappedPersonId}}",
      $translate: [{ from: null, to: "" }],
    },
    subscriber_id: {
      $fetch: "{{mappedSubscriberId}}",
      $translate: [{ from: null, to: "" }],
    },
    employee_id: {
      $fetch: "{{mappedEmployeeId}}",
      $translate: [{ from: null, to: "" }],
    },
    sub_employee_id: {
      $fetch: "{{mappedSubEmployeeId}}",
      $translate: [{ from: null, to: "" }],
    },
    member_id: {
      $fetch: "{{mappedMemberId}}",
      $translate: [{ from: null, to: "" }],
    },
    ssn: {
      $fetch: "{{mappedSSN}}",
      $translate: [{ from: null, to: "" }],
    },
    sub_ssn: {
      $fetch: "{{mappedSubSSN}}",
      $translate: [{ from: null, to: "" }],
    },
    relationship: {
      $fetch: "{{mappedRelationshipCode}}",
      $translate: [{ from: null, to: "" }],
    },
    relation_code_desc: {
      $fetch: "{{mappedRelationCodeDesc}}",
      $translate: [{ from: null, to: "" }],
    },
    name_prefix: {
      $fetch: "{{mappedNamePrefix}}",
      $translate: [{ from: null, to: "" }],
    },
    first_name: {
      $fetch: "{{mappedFirstName}}",
      $translate: [{ from: null, to: "" }],
    },
    middle_name: {
      $fetch: "{{mappedMiddleName}}",
      $translate: [{ from: null, to: "" }],
    },
    last_name: {
      $fetch: "{{mappedLastName}}",
      $translate: [{ from: null, to: "" }],
    },
    name_suffix: {
      $fetch: "{{mappedNameSuffix}}",
      $translate: [{ from: null, to: "" }],
    },
    gender: {
      $fetch: "{{mappedGender}}",
      $translate: [{ from: null, to: "" }],
    },
    date_of_birth: {
      $fetch: "{{mappedDateOfBirth}}",
      $translate: [{ from: null, to: "" }],
    },
    street_address: {
      $fetch: "{{mappedAddressline1}}",
      $translate: [{ from: null, to: "" }],
    },
    street_address_2: {
      $fetch: "{{mappedAddressline2}}",
      $translate: [{ from: null, to: "" }],
    },
    street_address_3: {
      $fetch: "{{mappedAddressline3}}",
      $translate: [{ from: null, to: "" }],
    },
    city: {
      $fetch: "{{mappedCity}}",
      $translate: [{ from: null, to: "" }],
    },
    state_code: {
      $fetch: "{{mappedStateProvince}}",
      $translate: [{ from: null, to: "" }],
    },
    postal_code: {
      $fetch: "{{mappedPostalCode}}",
      $translate: [{ from: null, to: "" }],
    },
    country_code: {
      $fetch: "{{mappedCountryCode}}",
      $translate: [{ from: null, to: "" }],
    },
    home_phone: {
      $fetch: "{{mappedHomePhone}}",
      $translate: [{ from: null, to: "" }],
    },
    phone: {
      $fetch: "{{mappedCellPhone}}",
      $translate: [{ from: null, to: "" }],
    },
    work_phone: {
      $fetch: "{{mappedWorkPhone}}",
      $translate: [{ from: null, to: "" }],
    },
    email: {
      $fetch: "{{mappedEmail}}",
      $translate: [{ from: null, to: "" }],
    },
    customer: {
      $fetch: "{{mappedCustomer}}",
      $translate: [{ from: null, to: "" }],
    },
    partner: {
      $fetch: "{{mappedPartner}}",
      $translate: [{ from: null, to: "" }],
    },
    ben_start_date: {
      $fetch: "{{mappedBenStartDate}}",
      $translate: [{ from: null, to: "" }],
    },
    ben_end_date: {
      $fetch: "{{mappedBenEndDate}}",
      $translate: [{ from: null, to: "" }],
    },
    medical_plan_name: {
      $fetch: "{{mappedMedicalPlanName}}",
      $translate: [{ from: null, to: "" }],
    },
    carrier: {
      $fetch: "{{mappedCarrier}}",
      $translate: [{ from: null, to: "" }],
    },
    group_name: {
      $fetch: "{{mappedGroupName}}",
      $translate: [{ from: null, to: "" }],
    },
    employee_flag: {
      $fetch: "{{mappedEmployeeFlag}}",
      $translate: [{ from: null, to: "" }],
    },
    work_location: {
      $fetch: "{{mappedWorkLocation}}",
      $translate: [{ from: null, to: "" }],
    },
    department: {
      $fetch: "{{mappedDepartment}}",
      $translate: [{ from: null, to: "" }],
    },
    division: {
      $fetch: "{{mappedDivision}}",
      $translate: [{ from: null, to: "" }],
    },
    termination_date: {
      $fetch: "{{mappedTerminationDate}}",
      $translate: [{ from: null, to: "" }],
    },
    run_date: {
      $fetch: "{{mappedRunDate}}",
      $translate: [{ from: null, to: "" }],
    },
  },
};

function createObject(keys, values) {
  if (keys.length !== values.length) {
    throw new Error("Keys and values arrays must have the same length");
  }

  const result = {};

  for (let i = 0; i < keys.length; i++) {
    result[keys[i]] = values[i];
  }

  return result;
}

var transformedObjects = [];

function processData() {
  for (const key in mapKeyValues[0]) {
    if (mapKeyValues[0].hasOwnProperty(key)) {
      if (mapKeyValues[0][key] == mapKeyValues[0][targetedKey]) {
        const transformedArray = inputObjects.map((inputObject) => {
          var mappedInputObject = mapedValues(inputObject, targetedKey);

          var dataObject = [];
          var transformationData = transformationTemplate[targetedKey];

          var keys = [];
          var values = [];
          for (const index in mappedInputObject) {
            for (const objectKey in mappedInputObject[index]) {
              var objectValue = mappedInputObject[index][objectKey];
              var userObjectValue = inputObject[objectValue];
              keys.push(objectKey);
              values.push(userObjectValue);
            }
          }
          dataObject = createObject(keys, values);

          return jslt.transform(dataObject, transformationData);
        });
        transformedObjects = transformedArray;
      }
    }
  }
}

var options = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(express.json());

app.use(cors(options));

app.post("/api/post-transform-data", (req, res) => {
  const { key, objects } = req.body;
  targetedKey = "";
  inputObjects = [];
  for (let index = 0; index < objects.length; index++) {
    const mappedDateOfBirth =
      objects[index][mapKeyValues[0][key][0]["mappedDateOfBirth"]];

    // Check if the date is in the format "DD-MM-YYYY"
    if (/^\d{2}-\d{2}-\d{4}$/.test(mappedDateOfBirth)) {
      const dateParts = mappedDateOfBirth.split("-");
      const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
      objects[index][mapKeyValues[0][key][0]["mappedDateOfBirth"]] =
        formattedDate;
    }
    // Check if the date is in the format "MM-DD-YYYY"
    else if (/^\d{2}-\d{2}-\d{4}$/.test(mappedDateOfBirth)) {
      const dateParts = mappedDateOfBirth.split("-");
      const formattedDate = `${dateParts[2]}-${dateParts[0]}-${dateParts[1]}`;
      objects[index][mapKeyValues[0][key][0]["mappedDateOfBirth"]] =
        formattedDate;
    }
    // Check if the date is in the format "YYYYMMDD"
    else if (/^\d{8}$/.test(mappedDateOfBirth)) {
      const formattedDate = `${mappedDateOfBirth.substr(
        0,
        4
      )}-${mappedDateOfBirth.substr(4, 2)}-${mappedDateOfBirth.substr(6, 2)}`;
      objects[index][mapKeyValues[0][key][0]["mappedDateOfBirth"]] =
        formattedDate;
    }
    // Check if the date is already in the format "YYYY-MM-DD"
    else if (/^\d{4}-\d{2}-\d{2}$/.test(mappedDateOfBirth)) {
      // Date is already in the desired format, no conversion needed
    }
    // Handle any other date formats as needed

    // For invalid formats, you might want to set a default value or handle the error accordingly
    else {
      objects[index][mapKeyValues[0][key][0]["mappedDateOfBirth"]] = null; // Set to null for invalid dates
    }
  }

  if (!key || !objects) {
    return res.status(400).json({
      error: "Both 'key' and 'objects' are required in the request body.",
    });
  }
  var values = [];
  const targettedUserKeys = Object.keys(mapKeyValues[0][key][0]);
  const userKeys = Object.keys(objects[0]);

  for (const mappingKey of targettedUserKeys) {
    values.push(mapKeyValues[0][key][0][mappingKey]);
  }

  for (let index = 0; index < values.length; index++) {
    if (values[index] !== userKeys[index]) {
      return res.status(400).json({
        error: "The object and its corresponding key do not match. ",
      });
    }
  }

  targetedKey = key;
  inputObjects = objects;

  processData();

  res.json(transformedObjects);
});

// Start the server
app.listen(port, () => {
  console.log(`API server is running on port ${port}`);
});