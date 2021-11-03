/** Contact details page */
import React, {useState, useEffect} from "react";
import PT from "prop-types";
import "./styles.module.scss";
import { Link, useNavigate } from "@reach/router";
import { useSelector } from "react-redux";
import withAuthentication from "hoc/withAuthentication";
import {toastr} from 'react-redux-toastr'
import { getAuthUserProfile } from "@topcoder/micro-frontends-navbar-app";
// import components and other stuffs
import Page from "components/Page";
import PageContent from "components/PageContent";
import PageDivider from "components/PageDivider";
import PageH1 from "components/PageElements/PageH1";
import PageH2 from "components/PageElements/PageH2";
import PageH3 from "components/PageElements/PageH3";
import PageP from "components/PageElements/PageP";
import PageUl from "components/PageElements/PageUl";
import PageRow from "components/PageElements/PageRow";
import PageFoot from "components/PageElements/PageFoot";
import Button from "components/Button";
import OnboardProgress from "components/OnboardProgress";
import FormField from "components/FormElements/FormField";
import FormInputText from "components/FormElements/FormInputText";
import FormInputCheckbox from "components/FormElements/FormInputCheckbox";
import Select from 'components/ReactSelect';
import DateInput from 'components/DateInput';
import LoadingSpinner from "components/LoadingSpinner";
import { BUTTON_SIZE, BUTTON_TYPE } from "constants";

import { timeZones } from "constants";
import { workingHours } from "constants";
import { getAllCountries } from "services/countries";
import { getMyBasicInfo,
         addMyAddress,
         updateMyAddress } from "services/basicInfo";
import { getContactDetails,
         createContactDetails,
         updateContactDetails } from "services/contactDetails";

const ContactDetails = () => {
  const authUser = useSelector((state) => state.authUser);
  const [isLoading, setIsLoading] = useState(false)
  const [myProfileData, setMyProfileData] = useState({});
  // form states
  const [formDate, setFormData] = useState({
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    timeZone: "",
    startTime: "",
    endTime: "",
  });
  const {addressLine1, addressLine2, city, state, zipCode,
         country, timeZone, startTime, endTime} = formDate;
  // countries
  const [countries, setCountries] = useState([]);
  // workingHours
  const handleInputChange = (name, value) => {
    setFormData(formDate => ({...formDate, [name]: value}));
  }
  
  // Get all live skills
  useEffect(() => {
    getAllCountries().then(result => {
      let res = result?.data?.result?.content;
      if(res){
        res = res.map(c => c.country);
        setCountries(res);
      }
    }).catch(e => {
      // toastr.error('Error', 'failed to get countries!');
      console.log(e);
    })
  }, [])

  // Get Member data from redux (firstName, lastName, handle, photoURL) and store it on myProfileData
  useEffect(() => {
    if(!authUser || !authUser.handle) return;
    getAuthUserProfile().then(result => {
      setMyProfileData(result);
    }).catch(e => {
      // toastr.error('Error', 'failed to get profile basic infos!');
      console.log(e);
    })
  }, [authUser])

  // Get contact details
  useEffect(() => {
    setIsLoading(true);
    getContactDetails(authUser.handle).then(result => {
      setIsLoading(false);
      // find datas we need
      let traits = result?.data;
      let basicInfo = traits.find(t => t.traitId === 'basic_info')
      let connectInfo = traits.find(t => t.traitId === 'connect_info')
      let address = basicInfo?.traits?.data[0].addresses
      if(address?.length) address = address[0]
      let contactDetails = connectInfo?.traits?.data[0];
      if(address){
        // store the fetched datas in state
        const {streetAddr1, streetAddr2} = address;
        setFormData(formDate => ({
          ...formDate,
          addressLine1: streetAddr1,
          addressLine2: streetAddr2,
        }))
      }
      if(contactDetails){
        // store the fetched datas in state
        const {zip, country, city, timeZone, state, workingHourStart, workingHourEnd} = contactDetails;
        setFormData(formDate => ({
          ...formDate,
          city: city,
          state: state,
          zipCode: zip,
          country: country,
          timeZone: timeZone,
          startTime: workingHourStart,
          endTime: workingHourEnd,
        }))
      }
    }).catch(e => {
      setIsLoading(false);
      // toastr.error('Error', 'failed to get my contact details!');
      console.log(e);
    })
  }, [])

  const saveMyAddress = () => {
    // update address
    let addressMapped = {
      streetAddr1: addressLine1,
      streetAddr2: addressLine2,
      zip: zipCode,                            
      city: city,
      stateCode: state,
      type: "HOME"
    };

    // check if basic info already exists. if so, update(put data). otherwise, post data.
    return getMyBasicInfo(authUser.handle).then(result => {
      let myBasicInfo = result?.data[0]?.traits?.data[0];
      if(myBasicInfo === undefined){
        return addMyAddress(authUser.handle, addressMapped)
      }else{
        return updateMyAddress(authUser.handle, myBasicInfo, addressMapped)
      }
    }).catch(e => {
      setIsLoading(false);
      // toastr.error('Error', 'failed to save my address!');
      console.log(e);
    })
  }

  const saveContactDetails = () => {
    // saving contact details
    // map data before passing to server
    let contactDetailsMapped = {
      city: city,
      state: state,
      zip: zipCode,                            
      country: country,
      timeZone: timeZone,
      workingHourStart: startTime,
      workingHourEnd: endTime,
    };
    // check if contact details already exists. if so, update(put data). otherwise, post data.
    return getContactDetails(authUser.handle).then(result => {
      let contactDetailsOnServer = result?.data;
      if(contactDetailsOnServer?.length)
        contactDetailsOnServer = contactDetailsOnServer.find(t => t.traitId === 'connect_info')
      if(contactDetailsOnServer === undefined){
        return createContactDetails(authUser.handle, contactDetailsMapped)
      }else{
        return updateContactDetails(authUser.handle, contactDetailsMapped)
      }
    }).catch(e => {
      setIsLoading(false);
      // toastr.error('Error', 'failed to save contact details!');
      console.log(e);
    })
  }

  // reach router, navigate programmatically
  const navigate = useNavigate()
  // on submit, save form and then navigate
  const handleSubmit = e => {
    setIsLoading(true);
    // save address (basic info) then contact details before navigate
    e.preventDefault();
    saveMyAddress().then(() => {
      return saveContactDetails()
    }).then(() => {
      setIsLoading(false);
      toastr.success('Success', 'contact details saved successfully!');
      navigate('/onboard/build-my-profile');
    })
  }

  return (
    <>
      <LoadingSpinner show={isLoading} />
      <Page title="Contact Details"  styleName="contact-details">
        <PageContent>
          <PageH2>Contact Details</PageH2>
          {`${myProfileData?.firstName || ""} ${myProfileData?.lastName || ""} | ${authUser?.handle}`}
          <PageDivider />
          <PageH1>Where can we reach you?</PageH1>
          <br />
          <PageRow half={true} styleName="form-row">
            <div>
              <PageP styleName="form-description">
                We may contact you about relevant freelance oppurtunities at Topcoder,
                or even surprise you with a cool T-shirt. Sharing your contact details will never
                result in robocalls about health insurance plans or junk mail.
              </PageP>
            </div>
            <div>
              <FormField label={"Address Line 1"}>
                <FormInputText
                  placeholder={"Enter address line 1"} value={addressLine1}
                  name="addressLine1" onChange={e => handleInputChange(e.target.name, e.target.value)}
                />
              </FormField>
              <FormField label={"Address Line 2"}>
                <FormInputText
                  placeholder={"Enter address line 2"} value={addressLine2}
                  name="addressLine2" onChange={e => handleInputChange(e.target.name, e.target.value)}
                />
              </FormField>
              <FormField label={"City / District"}>
                <FormInputText
                  placeholder={"Enter City / District"} value={city}
                  name="city" onChange={e => handleInputChange(e.target.name, e.target.value)}
                />
              </FormField>
              <PageRow half={true}>
                <FormField label={"State / Province"}>
                  <FormInputText
                    placeholder={"Enter State / Province"} value={state}
                    name="state" onChange={e => handleInputChange(e.target.name, e.target.value)}
                  />
                </FormField>
                <FormField label={"Zip / Postal Code"}>
                  <FormInputText
                    placeholder={"Enter Zip / Postal Code"} value={zipCode}
                    name="zipCode" onChange={e => handleInputChange(e.target.name, e.target.value)}
                  />
                </FormField>
              </PageRow>
              <PageRow half={true}>
                <FormField label={"Country"}>
                  <Select
                    value={country &&({
                      value: countries.find(v => v === country),
                      label: countries.find(v => v === country)
                    })}
                    onChange={option => handleInputChange("country", option.value)}
                    options={countries.map(v => ({value: v, label: v}))}
                    style2={true}
                    placeholder={"Select country"}
                  />
                </FormField>
                <div></div>
              </PageRow>
              <FormField label={"Time Zone"}>
                <Select
                  value={timeZone &&({
                    value: timeZones.find(v => v.zoneName === timeZone)?.zoneName,
                    label: timeZones.find(v => v.zoneName === timeZone)?.zoneName
                  })}
                  onChange={option => handleInputChange("timeZone", option.value)}
                  options={timeZones.map(v => ({value: v.zoneName, label: v.zoneName}))}
                  style2={true}
                  placeholder={"Select time zone"}
                />
              </FormField>
              <PageP styleName={"form-p"}>What are your working hours?</PageP>
              <PageRow half={true}>
                <FormField label={"Start Time"}>
                  <Select
                    value={startTime &&({
                      value: workingHours.find(v => v === startTime),
                      label: workingHours.find(v => v === startTime)
                    })}
                    onChange={option => handleInputChange("startTime", option.value)}
                    options={workingHours.map(v => ({value: v, label: v}))}
                    style2={true}
                    placeholder={"00:00"}
                  />
                </FormField>
                <FormField label={"End Time"}>
                  <Select
                    value={endTime && ({
                      value: workingHours.find(v => v === endTime),
                      label: workingHours.find(v => v === endTime)
                    })}
                    onChange={option => handleInputChange("endTime", option.value)}
                    options={workingHours.map(v => ({value: v, label: v}))}
                    style2={true}
                    placeholder={"00:00"}
                  />
                </FormField>
              </PageRow>
              {/*<FormField label={"Start Date"}>
                <DateInput
                  value={null}
                  onChange={e => e}
                  style2={true}
                  placeholder={"Select start date"}
                />
              </FormField>*/}
              {/*<div>
                <FormInputCheckbox label={"Graduated"} />
              </div>*/}
            </div>
          </PageRow>
          <PageDivider />
          <PageFoot>
          </PageFoot>
          <PageFoot align="between">
            <Link to="/onboard">
              <Button size={BUTTON_SIZE.MEDIUM} type={BUTTON_TYPE.SECONDARY}>{"< "}Back</Button>
            </Link>
            {/* TODO: We'll integrate payment setup after correctly implementing Tax Forms and Payment Service Provider steps.*/}
            {/* <Link to="/onboard/payment-setup" onClick={e => handleSubmit(e)}>
              <Button size={BUTTON_SIZE.MEDIUM}>CONTINUE TO PAYMENT SETUP</Button>
            </Link> */}            
            <Link to="/onboard/build-my-profile" onClick={e => handleSubmit(e)}>
              <Button size={BUTTON_SIZE.MEDIUM}>CONTINUE TO BUILD MY PROFILE</Button>
            </Link>
          </PageFoot>
          <OnboardProgress level={2} />
        </PageContent>
      </Page>
    </>
  )
};

export default withAuthentication(ContactDetails);
