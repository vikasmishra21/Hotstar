let phoneValidCheck = true
let ageValidCheck = true
let nccsValidCheck = true
let pinValidCheck = true
let locationValidCheck = true
let latitude;
let longitude;
const PathURL = "https://rchotstar.azurewebsites.net/Root"

function parseQueryJSON(queryJSON) {
    queryJSON = queryJSON.split('&');
    let queryObject = {}
    queryJSON.map(data => {
        const _keyValue = data.split('=')
        const key = _keyValue[0]
        const value = _keyValue[1]

        if (key === 'Items_Owned') queryObject[key] ? ++queryObject[key] : queryObject[key] = 1
        else queryObject[key] = value
    })

    return queryObject
}

function validations() {
    $('#age').on('blur', function (event) {
        const Age = $(this).val()
        if (Age < 18 || Age > 64) {
            $('#age-error').html('You are not eligible.')
            ageValidCheck = false
        } else {
            $('#age-error').html('')
            ageValidCheck = true
        }
    })

    $('#inputZip').on('blur', function (event) {
        const pinCode = $(this).val()
        if (pinCode.length < 6 || pinCode.length > 6) {
            $('#pin-error').html('Enter valid pincode.')
            pinValidCheck = false
        } else {
            $('#pin-error').html('')
            fetchGeoLocaation()
            pinValidCheck = true
        }
    })

    $('#phoneNumber').on('blur', function (event) {
        const phone = $(this).val()
        if (phone.length < 10 || phone.length > 10) {
            $('#phone-error').html('Number must be of 10 digits')
            phoneValidCheck = false
        } else if (phone.startsWith(0)) {
            $('#phone-error').html('Number cannot start with zero.')
            phoneValidCheck = false
        } else {
            $('#phone-error').html('')
            phoneValidCheck = true
        }
    })


    $('#inputAddress1').on('blur', function (event) {
        const addressLine1 = $(this).val()
        if (addressLine1.length > 200) {
            $('#addressLine1-error').html('maximum limit 200 words')
        }
    })

    $('#inputAddress2').on('blur', function (event) {
        const addressLine2 = $(this).val()
        if (addressLine2.length > 200) {
            $('#addressLine2-error').html('maximum limit 200 words')
        }
    })

    $('#inputCity').on('change', function (event) {
        const value = $(this).val()
        const index = regions.findIndex(_obj => _obj.cityCode == value)
        $('#inputState').val(regions[index].state)
        $('#stateCode').val(regions[index].stateCode)
    })

    $("input[name='Education']").on('change', function (event) {
        var queryJSON = parseQueryJSON($('#hotstarRecruitmentForm').serialize());
        if (queryJSON.Items_Owned === undefined) {
            queryJSON.Items_Owned = 0
        }
        $('#nccs-error').html('')
        nccsValidCheck = true
        let code = nccsLogic(queryJSON.Items_Owned, queryJSON.Education)
        $('#nccs').val(code || 0);
    })

    // $("input[name='Owned_TvType']").on('click', function (event) {
    //     var queryJSON = parseQueryJSON($('#hotstarRecruitmentForm').serialize());
    //     // const value = $(this).val()

    //     $.each($("input[name='Owned_TvType']:checked"), function(){
    //         if (selectedTV.indexOf($(this).val()) === -1) {
    //             selectedTV.push($(this).val());
    //         }
    //     });
    //     selectedTV.map((data) => {
    //         s += data + ',';
    //     }
    //     )
    //     console.log(s.substring(0, s.length - 1));

    //     // k = new Set(selectedTV)


    // })



}

function fetchGeoLocaation() {
    if (navigator.geolocation) {

        navigator.geolocation.watchPosition(function (position) {
            navigator.geolocation.getCurrentPosition(function (position) {
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
            });
            locationValidCheck = true
        },
            function (error) {
                if (error.code == error.PERMISSION_DENIED) {
                    alert("You denied Location. Please enable your location to proceed.");
                    locationValidCheck = false
                }
            });

    } else {
        alert("Geolocation is not supported by this browser.")
        locationValidCheck = false
    }
}

function nccsLogic(Items_Owned, Education) {
    const NCCS_code = nccs_code[Items_Owned][parseInt(Education)]
    let NCCS;
    if (NCCS_code.startsWith('A') || NCCS_code.startsWith('B')) {
        if (NCCS_code === 'A1') {
            NCCS = 1
        } else if (NCCS_code === 'A2') {
            NCCS = 2
        } else if (NCCS_code === 'A3') {
            NCCS = 3
        } else if (NCCS_code === 'B1') {
            NCCS = 4
        } else if (NCCS_code === 'B2') {
            NCCS = 5
        }
    } else {
        $('#nccs-error').html('You are not eligible.')
        nccsValidCheck = false
    }
    return NCCS
}

function ageLogic(queryJSON) {
    if (queryJSON.Age >= 18 && queryJSON.Age <= 24) {
        queryJSON.Age_Band = '1'
    } else if (queryJSON.Age >= 25 && queryJSON.Age <= 34) {
        queryJSON.Age_Band = '2'
    } else if (queryJSON.Age >= 35 && queryJSON.Age <= 44) {
        queryJSON.Age_Band = '3'
    } else if (queryJSON.Age >= 45 && queryJSON.Age <= 54) {
        queryJSON.Age_Band = '4'
    } else if (queryJSON.Age >= 55 && queryJSON.Age <= 64) {
        queryJSON.Age_Band = '5'
    }
}


function parseValue(queryJSON) {
    queryJSON.First_Name = decodeURIComponent(queryJSON.First_Name)
    queryJSON.Last_Name = decodeURIComponent(queryJSON.Last_Name)
    queryJSON.Address_Line1 = decodeURIComponent(queryJSON.Address_Line1)
    queryJSON.Address_Line2 = decodeURIComponent(queryJSON.Address_Line2)
    queryJSON.Mobile_Number = parseInt(queryJSON.Mobile_Number)
    queryJSON.Age = parseInt(queryJSON.Age)
    queryJSON.Age_Band = parseInt(queryJSON.Age_Band)
    queryJSON.Gender = parseInt(queryJSON.Gender)
    queryJSON.City = parseInt(queryJSON.City)
    queryJSON.State = parseInt(queryJSON.State)
    queryJSON.Education = parseInt(queryJSON.Education)
    queryJSON.NCCS = parseInt(queryJSON.NCCS)
}

function pageRedirect() {
    window.location.href = "./otpVarification.html";
}

if (document.location.pathname == "/") {
    sessionStorage.clear()
}

function backendErrorMessages(msg, code) {
    if (msg.includes(401)) {
        msg = "Wrong OTP."
    } else if (msg.includes(429) && code == 1) {
        msg = "OTP Verification Limit Exceeded."
        sessionStorage.clear()
    } else if (msg.includes(429) && code == 2) {
        msg = "You can only request for upto 3 OTP's."
        sessionStorage.clear()
    } else if (msg.includes(400)) {
        msg = "Exception Occured."
    }
    alert(msg)
}

function onSubmitFormErrorMessages(genderCheck) {
    let msg = '';
    if (phoneValidCheck === false) {
        msg = "Mobile Number Field is missing."
    } else if (ageValidCheck === false) {
        msg = "Age Field is missing."
    } else if (pinValidCheck === false) {
        msg = "Pincode Field is missing."
    } else if (locationValidCheck === false) {
        msg = "Location required."
    } else if (genderCheck === undefined) {
        msg = "Gender Field is missing."
    } else {
        msg = "Some Fields are missing or incorrect."
    }
    alert(msg)
}

$(document).ready(function () {
    $('#hotstarRecruitmentForm').submit(function (event) {
        event.preventDefault();
        var queryJSON = parseQueryJSON($(this).serialize());
        ageLogic(queryJSON)

        // 12th question - OwnedTVType
        var selectedTV = [];
        $('input[name="Owned_TvType"]:checked').each(function () {
            selectedTV.push(this.value);
        });

        if (nccsValidCheck === true && phoneValidCheck === true
            && ageValidCheck === true && pinValidCheck === true && locationValidCheck === true
            && queryJSON.Gender !== undefined) {
            parseValue(queryJSON)
            queryJSON.Latitude = latitude;
            queryJSON.Longitude = longitude;
            queryJSON.Owned_TvType = selectedTV.join(',');
            console.log(queryJSON);

            axios.request({
                url: `${PathURL}/Panelist`,
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                data: queryJSON
            }).then(function (response) {
                sessionStorage.setItem('pannelListId', response.data);
                alert("Data Saved Successfully! Please check your phone for OTP")
                $("#hotstarRecruitmentForm")[0].reset()
                pageRedirect()
            }).catch(function (error) {
                [
                    backendErrorMessages(error.message)
                ]
            })
        } else {
            onSubmitFormErrorMessages(queryJSON.Gender)
        }
        queryJSON = []
    })

    validations()
});


$('#resendOTP').on('click', function (event) {
    let pannellistID = sessionStorage.getItem('pannelListId')
    axios.get(`${PathURL}/Panelist/${pannellistID}/OTP`)
        .then(function (response) {
            alert(response.data)
            $("#OTPVerify")[0].reset()
        })
        .catch(function (error) {
            backendErrorMessages(error.message, 2)
            $("#OTPVerify")[0].reset()
        })
})

$('#OTPVerify').submit(function (event) {
    event.preventDefault();
    var otp = parseQueryJSON($(this).serialize())
    let FOtp = parseInt(otp.OTP)
    let pannellistID = sessionStorage.getItem('pannelListId')
    axios.request({
        url: `${PathURL}/Panelist/${pannellistID}/OTP`,
        method: "PATCH",
        headers: {
            'Entered_OTP': FOtp
        }
    })
        .then(function (response) {
            alert("Congratulations, you are successfully registered as a Panel member. You will receive an SMS with the App link shortly. Please download and install the app. You will get surveys on the app from time to time", response.data)
            $("#OTPVerify")[0].reset()
            sessionStorage.clear()
        })
        .catch(function (error) {
            backendErrorMessages(error.message, 1)
            $("#OTPVerify")[0].reset()
        })
})