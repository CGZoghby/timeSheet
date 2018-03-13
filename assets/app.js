$(document).ready(function () {
    //need a function to populate the entire <tr>, with <td> for each employee value
    var config = {
        apiKey: "AIzaSyCCCb50ebt582ShtPAmAqOpa8Ri94VyLqg",
        authDomain: "zog-bootcamp-activities.firebaseapp.com",
        databaseURL: "https://zog-bootcamp-activities.firebaseio.com",
        projectId: "zog-bootcamp-activities",
        storageBucket: "zog-bootcamp-activities.appspot.com",
        messagingSenderId: "717986679747"
    };
    firebase.initializeApp(config);

    // Create a variable to reference the database.
    var database = firebase.database();

    var employee = {
        StartDate: 0,
        Name: "",
        Role: "",
        Rate: 0,
    };

    //Need fullname, role, start date, months worked, monthly rate, and total billed
    //months worked and total billed can be calculated locally, and do not have to be stored to firebase
    function writeRow(employee) {
        var monthsWorked = (-1) * moment(employee.StartDate).diff(moment(), "months"),
            total = employee.Rate * monthsWorked,
            row = ` <tr>
                    <td>${employee.Name}</td>
                    <td>${employee.Role}</td>
                    <td>${employee.StartDate}</td>
                    <td>${monthsWorked}</td>
                    <td>${employee.Rate}</td>
                    <td>${total}</td>
                </tr>`;
        $("#employees").prepend(row);
    };

    database.ref().on("child_added", function (childSnapshot) {
        writeRow(childSnapshot.val().employee);
        //need to index through children and update them to database
    });

    $("#submit").on("click", function (event) {
        event.preventDefault();
        $.each(employee, function (index, value) {
            employee[index] = $(`#${index}`).val().trim();
        });
        database.ref().push({
            employee
        });
    });
});