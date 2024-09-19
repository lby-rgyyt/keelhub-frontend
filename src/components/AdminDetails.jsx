import React, { useEffect, useState, useContext, useCallback } from "react";
import { UserContext } from "../context/UserContext";
import ReactFlagsSelect from "react-flags-select";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import { useNavigate } from "react-router-dom";
import { getTimezonesForCountry } from "countries-and-timezones"
import moment from "moment-timezone";

const AdminDetails = () => {
    const { currentUser } = useContext(UserContext);
    const [authToken, setAuthToken] = useState('');
    const [countryList, setCountryList] = useState([]);
    const [stateList, setStateList] = useState([]);
    const [country, setCountry] = useState('');
    const [state, setState] = useState('');
    const [timezone, setTimezone] = useState('');
    const [timezoneList, setTimezoneList] = useState([]);
    const [visaType, setVisaType] = useState('')
    const [phone, setPhone] = useState('');
    const [compulsory, setCompulsory] = useState(false);
    const navigate = useNavigate();

    const USA_Visa_List = ["F1","O1", "H1B", "L1","N/A"]

    // TO GET THE TOKEN
    // https://www.universal-tutorial.com/api/getaccesstoken
    // Headers: Accept:application/json, api-token:9UE2oIs29kHP1Otm5FRiH3d1jtJ-UG_qNuoaj3UM0FFSDrZIDrnsyRQMNQkI640i0VY, user-email:kshitij.chaudhari@keelworks.org

    // CALL TO GET ALL COUNTRIES
    // https://www.universal-tutorial.com/api/countries/
    // Headers: Authorization (Bearer "the token we get from the previous api call"), Accept:application/json

    let auth_token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJfZW1haWwiOiJrc2hpdGlqLmNoYXVkaGFyaUBrZWVsd29ya3Mub3JnIiwiYXBpX3Rva2VuIjoiOVVFMm9JczI5a0hQMU90bTVGUmlIM2QxanRKLVVHX3FOdW9hajNVTTBGRlNEclpJRHJuc3lSUU1OUWtJNjQwaTBWWSJ9LCJleHAiOjE3MjY3NzMxNjV9.DfOD16YBqTLh45FKikPsmfLWShZfTtYvEFH2JyTtrzE"

    const FetchCountries = async() => {
        const list_countries = await axios.get('https://www.universal-tutorial.com/api/countries/', {
                                headers: {
                                    'Authorization': auth_token,
                                    'Accept': 'application/json'
                                }
                                })

    const fetchAuthToken = useCallback(async () => {
      if (authToken) return; 
      try {
        const response = await axios.get('/api/api/getaccesstoken', {
          headers: {
            "Accept": "application/json",
            "api-token": "9UE2oIs29kHP1Otm5FRiH3d1jtJ-UG_qNuoaj3UM0FFSDrZIDrnsyRQMNQkI640i0VY",
            "user-email": "kshitij.chaudhari@keelworks.org"
          }
        });
        const newToken = `Bearer ${response.data.auth_token}`;
        setAuthToken(newToken);
      } catch (error) {
        console.error('Error fetching auth token:', error);
      }
    }, [authToken]);

    const FetchCountries = useCallback(async () => {
      if (!authToken || countryList.length > 0) return; 
      try {
        const list_countries = await axios.get('/api/api/countries/', {
          headers: {
            'Authorization': authToken,
            'Content-Type': 'application/json'
          }
        });
        setCountryList(list_countries.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
        if (error.response && error.response.status === 401) {
          setAuthToken(''); 
        }
      }
    }, [authToken, countryList.length]);

    const timezones = useCallback(() => {
      const x = countryList.find(c => c.country_name === country);
      const country_id = x?.country_short_name;
      const zones = getTimezonesForCountry(country_id);
      const updated_zones = zones?.map(zone => moment.tz(zone.name).format('z'));
      const setOfZones = [...new Set(updated_zones)];
      setTimezoneList(setOfZones);
    }, [country, countryList]);

    const FetchStates = useCallback(async (country) => {
      if (!authToken || !country) return;
      try {
        const list_states = await axios.get(`/api/api/states/${country}`, {
          headers: {
            'Authorization': authToken,
            'Accept': 'application/json'
          }
        });
        setStateList(list_states.data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    }, [authToken]);

    const handleSubmit = async () => {
      if (country === '' || timezone === '' || phone === '' || visaType === '' || state === '') {
        setCompulsory(true);
      } else {
        try {
          const userData = {
            country,
            state,
            timezone,
            visa_type: visaType,
            phone,
            hasLoggedIn: true,
          };
          await axios.put(`http://localhost:3001/api/users/${currentUser.id}`, userData);
          navigate('/acc-success');
        } catch (error) {
          console.error("Error updating user data:", error);
        }
      }
    };
    
    useEffect(() => {
      fetchAuthToken();
      const intervalId = setInterval(fetchAuthToken, 24 * 60 * 60 * 1000);
      return () => clearInterval(intervalId);
    }, [fetchAuthToken]);

    useEffect(() => {
      if (authToken) {
        FetchCountries();
      }
    }, [authToken, FetchCountries]);

    useEffect(() => {
      if (!currentUser) {
        navigate('/');
      }
      if (country) {
        timezones();
        FetchStates(country);
      }
    }, [country, currentUser, navigate, timezones, FetchStates]);


    return (
        <div className="flex flex-col md:flex-row mx-auto">
          {/* First Division */}
          <div className="relative w-full md:w-2/5 h-screen z-50 hidden md:block">
            <img className="absolute w-full h-full object-cover" src="src/assets/image.png" alt="Background" />
            <div className="absolute inset-0 flex justify-center bg-opacity-75 p-8 h-1/2">
              <div className="p-20 text-white mt-40">
                {/* <p className="">Never doubt that a small group of thoughtful, committed citizens can change the world; 
                  indeed, it's the only thing that ever has.
                </p>
                <p className="pt-5">- Margaret Mead</p> */}
              </div>
            </div>
          </div>
      
          {/* Second Division */}
          <div className="bg-gray-100 w-full md:w-3/5 h-screen flex flex-col items-start justify-start">
            <div className="w-full max-w-screen-sm pr-4 md:pr-15 mt-4 md:mt-[20px] pl-4 md:pl-10 ml-4 md:ml-[60px] mb-auto">
              <h3 className="text-black pl-2 pt-2 md:pl-4 md:pt-4 text-3xl md:text-5xl">Hey there {}</h3>
              <h2 className="pl-2 md:pl-5 pt-2 md:pt-3 text-gray-600 text-lg md:text-xl">Complete your information to get started</h2>
              {/* <a href="#" classNameName="text-blue-500 pl-2 md:pl-4 pt-2 md:pt-4 ml-1 hover:underline">Don't have the app?</a> */}
      
              <div className="flex items-center gap-x-4 md:gap-x-6 rounded mt-4 md:mt-[15px] ml-2 md:ml-5 bg-slate-200">
                <img className="h-12 w-12 md:h-16 md:w-16 ml-2 rounded-full p-1" src={currentUser && currentUser.profile_pic} alt="Profile" />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{currentUser && currentUser.first_name} {currentUser && currentUser.last_name}</h3>
                  <p className="text-sm font-semibold leading-6 text-gray-500">{currentUser && currentUser.role}</p>
                </div>
              </div>
      
              {/* Form Start */}
              <div className="grid grid-cols-1 gap-x-4 gap-y-4 md:gap-x-8 md:gap-y-6 ml-2 md:ml-5 sm:grid-cols-2 mt-4 md:mt-3">
                <div>
                  <label className="block text-sm font-semibold leading-1 text-gray-900">Country of Residence *</label>
                  <div className="mt-2">
                    <select onChange={(e) => {
                      setCountry(e.target.value);
                      FetchStates(e.target.value);
                    }} defaultValue='default' className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      <option value='default' disabled>Select..</option>
                      {countryList ? countryList.map((country) => (
                        <option key={country.country_name} value={country.country_name}>
                          {country.country_name}
                        </option>
                      )) : null}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold leading-1 text-gray-900">State/Province *</label>
                  <div className="mt-2">
                    <select onChange={(e) => {
                      setState(e.target.value);
                    }} defaultValue='default' className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      <option value='default' disabled>Select..</option>
                      {stateList ? stateList.map((state) => (
                        <option key={state.state_name} value={state.state_name}>
                          {state.state_name}
                        </option>
                      )) : null}
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold leading-1 text-gray-900">Timezone *</label>
                  <div className="mt-2">
                    <select onChange={(e) => {
                      setTimezone(e.target.value);
                    }} defaultValue='default' className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      <option value='default' disabled>Select..</option>
                      {timezoneList ? timezoneList.map((timezone) => (
                        <option key={timezone} value={timezone}>
                          {timezone}
                        </option>
                      )) : null}
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold leading-1 text-gray-900">USA Visa Type *</label>
                  <div className="mt-2">
                    <select onChange={(e) => {
                      setVisaType(e.target.value);
                    }} defaultValue='default' className="block w-full rounded-md border-0 px-3.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                      <option value='default' disabled>Select..</option>
                      {USA_Visa_List ? USA_Visa_List.map((visa_type) => (
                        <option key={visa_type} value={visa_type}>
                          {visa_type}
                        </option>
                      )) : null}
                    </select>
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold leading-1 text-gray-900">Phone number *</label>
                  <div className="relative mt-1">
                    <PhoneInput
                      placeholder="Enter phone number"
                      value='default'
                      onChange={(value, data, event, formattedValue	)=>{
                          setPhone(formattedValue)
                        }
                      }
                    />
                  </div>
                </div>
              </div>
              {/* Form End */}
      
              <div className='flex justify-center md:justify-end ml-0 md:ml-[400px] mt-4'>
                {/* <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" /> */}
                <button type="submit" onClick={handleSubmit} className="flex w-[200px] justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Continue</button>
              </div>
              {compulsory && compulsory ? <p className="text-red-600">All the fields are required!!</p> :null}

            </div>
          </div>
        </div>
      );

}
export default AdminDetails;
