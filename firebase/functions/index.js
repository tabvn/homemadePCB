const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
var CronJob = require('cron').CronJob;

var timezone = "Asia/Ho_Chi_Minh";
var tasks = [];

var tasksRef = admin.database().ref('/app/tasks');

tasksRef.on('value', function (snapshot) {

    removeAllTasks();

    snapshot.forEach(function (childSnapshot) {
        console.log("Task " + childSnapshot.key + " has value " + childSnapshot.val());

        const data = childSnapshot.val();
        const key = childSnapshot.key;

        if (typeof data.value !== "undefined" && data.value != null && typeof data.devices !== "undefined" && data.devices !== null && data.devices.length) {


            const job = new CronJob(data.value, function () {

                    /// do when job start

                    for (var i = 0; i < data.devices.length; i++) {

                        const deviceKey = data.devices[i].id;
                        const deviceState = data.devices[i].state;

                        const deviceRef = admin.database().ref('/app/devices').child(deviceKey);

                        deviceRef.once('value').then(function (snap) {

                            if (snap.val()) {
                                deviceRef.child('state').set(deviceState);
                                console.log("Automation: ", snap.val().title + ":" + deviceState);
                            }


                        });


                    }


                }, function () {
                    /* This function is executed when the job stops */
                },
                true, /* Start the job right now */
                timezone /* Time zone of this job. */
            );

            job.start();

            const task = {key: key, job: job};

            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i].key === key) {
                    var currentJob = tasks[i].job;

                    currentJob.stop();

                    tasks.splice(i, 1);

                }
            }
            tasks.push(task);

        }


    });


});


function removeAllTasks() {
    for (var i = 0; i < tasks.length; i++) {
        var currentJob = tasks[i].job;
        currentJob.stop();
        tasks.splice(i, 1);
    }
}


/**
 *
 * We do add devices items when the micro controllers at first install.
 */

exports.registerMicrocontroller = functions.database.ref('/microcontroller/{chip}/{pin}').onWrite(function (event) {


    const state = event.data.val();
    const chip = event.params.chip;
    const pin = event.params.pin;
    const key = chip + '-' + pin;

    const data = {pin: pin, chip: chip, state: state, title: "Device " + chip + ":" + pin};

    if (!event.data.previous.exists()) {
        return admin.database().ref('/app/devices').child(key).set(data);
    }
    if (!event.data.exists()) {
        // if delete at micro controller we also delete items from app/devices
        return admin.database().ref('/app/devices').child(key).remove();
    }
    

});

/**
 *
 * Listen state from the web app, or mobile app then change state of micro controller pin
 */

exports.changeMicrocontrollerPinState = functions.database.ref('/app/devices/{deviceId}').onWrite(function (event) {


    const data = event.data.val();

    var eventSnapshot = event.data;

    var deviceStateSnapshot = eventSnapshot.child('state');

    if (deviceStateSnapshot.changed()) {
        return admin.database().ref('/microcontroller').child(data.chip).child(data.pin).set(data.state);
    }


});


/**
 * listen state of microcontroller pin and set back to the app/devices/
 */


exports.AppDevicesState = functions.database.ref('/microcontroller/{chip}/{pin}').onWrite(function (event) {


    const state = event.data.val();

    const chip = event.params.chip;
    const pin = event.params.pin;
    const key = chip + '-' + pin;
    if (event.data.changed()) {
        return admin.database().ref('/app/devices').child(key).child('state').set(state);
    }

});