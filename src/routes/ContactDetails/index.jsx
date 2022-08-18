/** Contact details page */
import React, { useState, useEffect } from "react";
import "./styles.module.scss";
import { Link, useNavigate } from "@reach/router";
import { useSelector } from "react-redux";
import withAuthentication from "hoc/withAuthentication";
// import components and other stuffs
import Page from "components/Page";
import PageContent from "components/PageContent";
import PageDivider from "components/PageDivider";
import PageH1 from "components/PageElements/PageH1";
import PageH2 from "components/PageElements/PageH2";
import PageP from "components/PageElements/PageP";
import PageRow from "components/PageElements/PageRow";
import PageFoot from "components/PageElements/PageFoot";
import Button from "components/Button";
import OnboardProgress from "components/OnboardProgress";
import FormField from "components/FormElements/FormField";
import FormInputText from "components/FormElements/FormInputText";
import Select from "components/ReactSelect";
import LoadingSpinner from "components/LoadingSpinner";
import { BUTTON_SIZE, BUTTON_TYPE, workingHours, timeZones } from "constants";
import { getAllCountries } from "services/countries";
import {
  getContactDetails,
  createContactDetails,
  updateContactDetails,
} from "services/contactDetails";
import { getMemberData, updateMemberData } from "services/memberData";
import IconBackArrow from "../../assets/images/icon-back-arrow.svg";
import IconArrowRight from "../../assets/images/icon-arrow-right.svg";
import config from "../../../config";

import { scrollToTop, getTraits, isContactFormEmpty } from "utils/";
import _, { sortBy } from "lodash";

const ContactDetails = () => {
  const authUser = useSelector((state) => state.authUser);
  const [isLoading, setIsLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [newProfileData, setNewProfileData] = useState({
    address: {
      streetAddr1: "",
      streetAddr2: "",
      city: "",
      stateCode: "",
      zip: "",
    },
    country: "",
  });
  // form states
  const [formDate, setFormData] = useState({
    timeZone: "",
    startTime: "",
    endTime: "",
  });

  const { timeZone, startTime, endTime } = formDate;
  // countries
  const [countries, setCountries] = useState([]);
  const redirectUrl = config.TOPCODER_COMMUNITY_WEBSITE_URL + "/home";

  const handleAddressChange = (name, value) => {
    const newAddress = { ...newProfileData.address };
    newAddress[name] = value;
    setNewProfileData((data) => ({
      ...data,
      address: newAddress,
    }));
  };

  const handleInputChange = (name, value) => {
    switch (name) {
      case "country":
        const countryCode = countries.find((c) => c.country === value)
          ?.countryCode;
        setNewProfileData((data) => ({
          ...data,
          country: value,
          homeCountryCode: countryCode,
          competitionCountryCode: countryCode,
        }));
      default:
        setFormData((formDate) => ({ ...formDate, [name]: value }));
    }
  };

  // Get all live skills
  useEffect(() => {
    getAllCountries()
      .then((result) => {
        let res = result?.data?.result?.content;
        if (res) {
          // res = res.map((c) => c.country);
          setCountries(sortBy(res, "country"));
        }
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
      });

    scrollToTop();
  }, []);

  // Get Member data from redux (firstName, lastName, handle, photoURL) and store it on myProfileData
  useEffect(() => {
    if (!authUser || !authUser.handle) return;
    getMemberData(authUser.handle)
      .then((result) => setProfileData(result.data))
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(e);
      });
  }, [authUser]);

  useEffect(() => {
    if (profileData?.competitionCountryCode) {
      const country = countries.find(
        (c) => c.countryCode === profileData.competitionCountryCode
      )?.country;
      setNewProfileData((data) => ({
        ...data,
        country,
      }));
    }
    setNewProfileData((data) => ({
      ...data,
      address:
        profileData?.addresses?.length > 0
          ? profileData.addresses[0]
          : data.address,
    }));
  }, [countries, profileData]);

  useEffect(() => {
    if (!formDate.country) {
      const code =
        newProfileData.homeCountryCode || newProfileData.competitionCountryCode;
      const { country } = countries.find((c) => c.countryCode === code) || {};
      if (country) {
        setFormData({ country });
      }
    }
  }, [
    countries,
    formDate.country,
    newProfileData.competitionCountryCode,
    newProfileData.homeCountryCode,
  ]);

  // Get contact details
  useEffect(() => {
    setIsLoading(true);
    getContactDetails(authUser.handle)
      .then((result) => {
        setIsLoading(false);
        // find datas we need
        let traits = result?.data;
        let connectInfo = traits.find((t) => t.traitId === "connect_info");
        let contactDetails = connectInfo?.traits?.data[0];
        if (contactDetails) {
          // store the fetched datas in state
          const { timeZone, workingHourStart, workingHourEnd } = contactDetails;
          setFormData((formData) => ({
            ...formData,
            timeZone: timeZone,
            startTime: workingHourStart,
            endTime: workingHourEnd,
          }));
        }
      })
      .catch((e) => {
        setIsLoading(false);
        // eslint-disable-next-line no-console
        console.log(e);
      });
  }, [countries, authUser]);

  const saveContactDetails = async (contactDetailsOnServer) => {
    // saving contact details
    // map data before passing to server
    let contactDetailsMapped = {
      timeZone: timeZone || "",
      workingHourStart: startTime || "",
      workingHourEnd: endTime || "",
    };
    // check if contact details already exists. if so, update(put data). otherwise, post data.
    if (
      contactDetailsOnServer == null &&
      isContactFormEmpty(contactDetailsMapped)
    ) {
      try {
        await createContactDetails(authUser.handle, contactDetailsMapped);
      } catch (err) {
        await updateContactDetails(
          authUser.handle,
          contactDetailsOnServer,
          contactDetailsMapped
        );
      }
    } else {
      if (isContactFormEmpty(contactDetailsMapped)) {
        await updateContactDetails(
          authUser.handle,
          contactDetailsOnServer,
          contactDetailsMapped
        );
      } else {
        return Promise.resolve();
      }
    }
  };

  const saveMemberApiDetails = async () => {
    const { homeCountryCode, competitionCountryCode, address } = newProfileData;
    const initialAddress =
      profileData?.addresses?.length > 0 && profileData.addresses[0];
    const newAddress = { ...address };
    const newData = {};
    if (!_.isEqual(newAddress, initialAddress)) {
      _.mapKeys(
        newAddress,
        (value, key) => _.isEmpty(value) && delete newAddress[key]
      );
      const newAddresses = [newAddress];
      if (!_.isEmpty(profileData?.addresses)) {
        newAddresses.push(...profileData.addresses.slice(1));
      }
      newData.addresses = newAddresses;
    }
    if (homeCountryCode && competitionCountryCode) {
      newData.homeCountryCode = homeCountryCode;
      newData.competitionCountryCode = competitionCountryCode;
    }
    if (!_.isEmpty(newData)) {
      return updateMemberData(profileData.handle, newData);
    }
  };

  // reach router, navigate programmatically
  const navigate = useNavigate();
  // on submit, save form and then navigate
  const handleSubmit = async (e, exit = false) => {
    // save address (basic info) then contact details before navigate
    e.preventDefault();

    setIsLoading(true);

    const result = await getContactDetails(authUser.handle);
    const contactDetails = result?.data?.find(
      (t) => t.traitId === "connect_info"
    );
    const contactDetailsTraits = getTraits(contactDetails);

    try {
      await saveContactDetails(contactDetailsTraits);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log("Failed to save address in connect_info", err);
    }

    try {
      await saveMemberApiDetails();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log("Failed to save address and country of member", err);
    }

    setIsLoading(false);
    // toastr.success("Success", "Successfully saved contact details!");
    if (exit) {
      window.location = redirectUrl;
    } else {
      navigate("/onboard/build-my-profile");
    }
  };

  const selectedCountryObj = React.useMemo(
    () =>
      newProfileData.country != null
        ? countries.find((c) => c.country == newProfileData.country)
        : null,
    [countries, newProfileData.country]
  );

  const { address } = newProfileData;

  return (
    <>
      <LoadingSpinner show={isLoading} />
      <Page title="Contact Details" styleName="contact-details">
        <PageContent>
          <PageH2>Contact Details</PageH2>
          {`${profileData?.firstName || ""} ${profileData?.lastName || ""} | ${
            authUser?.handle
          }`}
          <PageDivider />
          <PageH1>Where can we reach you?</PageH1>
          <br />
          <PageRow half={true} styleName="form-row">
            <div>
              <PageP styleName="form-description">
                We may contact you about relevant freelance opportunities at
                Topcoder, or even surprise you with a cool T-shirt. Sharing
                contact details will never result in robocalls about insurance
                insurance plans or junk mail.
              </PageP>
            </div>
            <div>
              <FormField label={"Address Line 1"}>
                <FormInputText
                  placeholder={"Enter address line 1"}
                  value={address?.streetAddr1}
                  name="streetAddr1"
                  required
                  onChange={(e) =>
                    handleAddressChange(e.target.name, e.target.value)
                  }
                />
              </FormField>
              <FormField label={"Address Line 2"}>
                <FormInputText
                  placeholder={"Enter address line 2"}
                  value={address?.streetAddr2}
                  name="streetAddr2"
                  required
                  onChange={(e) =>
                    handleAddressChange(e.target.name, e.target.value)
                  }
                />
              </FormField>
              <FormField label={"City / District"}>
                <FormInputText
                  placeholder={"Enter City / District"}
                  value={address?.city}
                  name="city"
                  onChange={(e) =>
                    handleAddressChange(e.target.name, e.target.value)
                  }
                />
              </FormField>
              <PageRow half={true}>
                <FormField label={"State / Province"}>
                  <FormInputText
                    placeholder={"Enter State / Province"}
                    value={address?.stateCode}
                    name="stateCode"
                    onChange={(e) =>
                      handleAddressChange(e.target.name, e.target.value)
                    }
                  />
                </FormField>
                <FormField label={"Zip / Postal Code"}>
                  <FormInputText
                    placeholder={"Enter Zip / Postal Code"}
                    value={address?.zip}
                    name="zip"
                    onChange={(e) =>
                      handleAddressChange(e.target.name, e.target.value)
                    }
                  />
                </FormField>
              </PageRow>
              <PageRow half={true}>
                <FormField label={"Country"}>
                  <Select
                    value={
                      newProfileData.country &&
                      selectedCountryObj && {
                        value: selectedCountryObj.country,
                        label: selectedCountryObj.country,
                      }
                    }
                    onChange={(option) =>
                      handleInputChange("country", option.value)
                    }
                    options={countries.map((v) => ({
                      value: v.country,
                      label: v.country,
                    }))}
                    style2={true}
                    placeholder={"Select country"}
                  />
                </FormField>
                <div></div>
              </PageRow>
              <FormField label={"Time Zone"}>
                <Select
                  value={
                    timeZone && {
                      value: timeZones.find((v) => v.zoneName === timeZone)
                        ?.zoneName,
                      label: timeZones.find((v) => v.zoneName === timeZone)
                        ?.zoneName,
                    }
                  }
                  onChange={(option) =>
                    handleInputChange("timeZone", option.value)
                  }
                  options={timeZones.map((v) => ({
                    value: v.zoneName,
                    label: v.zoneName,
                  }))}
                  style2={true}
                  placeholder={"Select time zone"}
                />
              </FormField>
              <PageP styleName={"form-p"}>What are your working hours?</PageP>
              <PageRow half={true}>
                <FormField label={"Start Time"}>
                  <Select
                    value={
                      startTime && {
                        value: workingHours.find((v) => v === startTime),
                        label: workingHours.find((v) => v === startTime),
                      }
                    }
                    onChange={(option) =>
                      handleInputChange("startTime", option.value)
                    }
                    options={workingHours.map((v) => ({ value: v, label: v }))}
                    style2={true}
                    placeholder={"00:00"}
                  />
                </FormField>
                <FormField label={"End Time"}>
                  <Select
                    value={
                      endTime && {
                        value: workingHours.find((v) => v === endTime),
                        label: workingHours.find((v) => v === endTime),
                      }
                    }
                    onChange={(option) =>
                      handleInputChange("endTime", option.value)
                    }
                    options={workingHours.map((v) => ({ value: v, label: v }))}
                    style2={true}
                    placeholder={"00:00"}
                  />
                </FormField>
              </PageRow>
            </div>
          </PageRow>
          <PageDivider />
          <PageFoot></PageFoot>
          <PageFoot align="between" styleName="page-footer">
            <Link to="/onboard">
              <Button size={BUTTON_SIZE.MEDIUM} type={BUTTON_TYPE.SECONDARY}>
                <IconBackArrow />
                <span styleName="back-button-text">&nbsp;</span>
              </Button>
            </Link>
            <div styleName="right-content">
              <a
                href={redirectUrl}
                styleName="finish-later"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(e, true);
                }}
              >
                <Button size={BUTTON_SIZE.MEDIUM} type={BUTTON_TYPE.SECONDARY}>
                  <span styleName="footer-btn-lg">FINISH LATER</span>
                  <span styleName="footer-btn-sm">SAVE & EXIT</span>
                </Button>
              </a>
              <Link
                to="/onboard/build-my-profile"
                onClick={(e) => handleSubmit(e)}
              >
                <Button size={BUTTON_SIZE.MEDIUM}>
                  <span styleName="footer-btn-lg">
                    CONTINUE TO BUILD MY PROFILE
                  </span>
                  <span styleName="footer-btn-sm">
                    <IconArrowRight />
                  </span>
                </Button>
              </Link>
            </div>
          </PageFoot>
          <OnboardProgress level={2} />
        </PageContent>
      </Page>
    </>
  );
};

export default withAuthentication(ContactDetails);
