import { uk } from "date-fns/locale";

const Host = (window.location.hostname == 'localhost') ?  'http://api.desisexichat.com/public/' : 'http://api.desisexichat.com/public/';
const Enviornment =  (window.location.hostname == 'localhost') ?  'local' : 'production';

const Constants = {
    
    appEnviornment: Enviornment,
    apiHost: Host,
    apiEndPoint: `${Host}api/`,
    galleryUrl: `${Host}storage/galleries/`,
    videosUrl: `${Host}storage/`,
    maxFileSizeToUpload: '2097152', // 2 MB in bytes
    adultAge:18,
    adultAgeDate: () => {
        let dateNow = new Date();
        return new Date(dateNow.setFullYear(dateNow.getFullYear() - 18));
    },
    minPasswordLength:3,

    body: [
            {value: '', displayValue: 'Select Body' },
            {value: 'Petite', displayValue: 'Petite' },
            { value: 'Normal', displayValue: 'Normal'}, 
            { value: 'Athletic', displayValue: 'Athletic'},
            { value: 'Thick', displayValue: 'Thick'}
    ],
    
    hairLength: [
        {value: '', displayValue: 'Select Hair Length' },
        {value: 'Bald', displayValue: 'Bald' },
        { value: 'Short', displayValue: 'Short'}, 
        { value: 'ShoulderLength', displayValue: 'Shoulder Length'},
        { value: 'Long', displayValue: 'Long'},
        { value: 'VeryLong', displayValue: 'Very Long'}
    ],
    
    hairColor: [
        {value: '', displayValue: 'Select Hair Color' },
        {value: 'Blonde', displayValue: 'Blonde' },
        { value: 'Honey Blonde', displayValue: 'Honey Blonde'}, 
        { value: 'Brown', displayValue: 'Brown'},
        { value: 'Highlights', displayValue: 'Highlights'},
        { value: 'Black', displayValue: 'Black'},
        { value: 'Dyec', displayValue: 'Dyed'}
    ],

    eyeColor: [
        {value: '', displayValue: 'Select Eye Color' },
        {value: 'Hazel', displayValue: 'Hazel' },
        { value: 'Blue', displayValue: 'Blue'}, 
        { value: 'Green', displayValue: 'Green'},
        { value: 'Brown', displayValue: 'Brown'},
        { value: 'Grey', displayValue: 'Grey'}
    ],
    
    orientation: [
        {value: '', displayValue: 'Select Orientation' },
        {value: 'Straight', displayValue: 'Straight' },
        { value: 'Gay', displayValue: 'Gay'}, 
        { value: 'Lesbian', displayValue: 'Lesbian'},
        { value: 'Bisexual', displayValue: 'Bisexual'},
        { value: 'Transsexual', displayValue: 'Transsexual'}
    ],
    
    height: () => {
        let heightOptions = [{value: '', displayValue: 'Select Height' }];
        
        for(let i=150; i<=220;i++){
            let heightValue = {value: i, displayValue: `${i}cm` };
            heightOptions.push(heightValue);
        }

        return heightOptions;
    },

    weight: () => {
        let weightOptions = [{value: '', displayValue: 'Select Weight' }];
        let weightInLbs = 84;

        for(let i=38; i<=150;i++){
            let weightValue = {value: i, displayValue: `${i}KG (${weightInLbs}lbs)` };
            weightOptions.push(weightValue);
            weightInLbs = weightInLbs+2
        }

        return weightOptions;
    },
    
    tags: [
        {value: '', displayValue: 'Tags' },
        {value: 'Fashion', displayValue: 'Fashion' },
        { value: 'Studio', displayValue: 'Studio'}, 
        { value: 'Session', displayValue: 'Session'},
        { value: 'Top', displayValue: 'Top'},
    ],

    countries: [
        {value: 'India', displayValue: 'India' },
        { value: 'Pakistan', displayValue: 'Pakistan'}, 
        { value: 'USA', displayValue: 'USA'},
        { value: 'Russia', displayValue: 'Russia'},
    ],

    countriesFlags: {
        India:'indian.png',
        Pakisatan: 'indian.png',
        USA:'uk.png',
        Russia: 'uk.png'
    },
    
    roles: {
        'model':1,
        'user': 0
    },
    gender:{
        'female':0,
        'male':1
    },
    genderText:{
        0: 'Female',
        1: 'Male'
    },
    pagination: {
        recordPerPage : 10,
        pageRangeDisplayed: 5
    },
    defaultAddress: {
        address: '125, Barra-II Main Rd, Sector 4',
        city: 'Kanpur',
        state: 'Uttar Pradesh',
        zipcode: '208027',
        country: 'US'
    },
    OpenTokKeys: {
        TOKBOX_API_KEY:'46920604',
        TOKBOX_APP_SECRET: 'e7f50b92486ddc0f293cb785c9e7c714228fa246'
    },
    AgoraKeys: {
        APPID: '21d00563319d453682d9b93e2acde5d9',
        APPSECRET: '7ab63c892e3542858ae5c0a4a454303b',
        TEMPTOKEN: '00621d00563319d453682d9b93e2acde5d9IAC+D86lE6ztj9ReDuUJD9O7KK6sf6kmRRCxzHi2sYYanY9VQLUAAAAAEAANYBkGB3p7XwEAAQAHentf'
    },
    monthNames : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

}    


export default Constants;