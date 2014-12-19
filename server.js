var server = require('json-server');

server({
    'emails_to_users': {
        'diamant,alon@gmail,com': 'alon',
        'jskrzypek@yoobic,com': 'joshua',
        'werner,avi81@gmail,com': 'avi',
        'gmistick@gmail,com': 'yechiel',
        'refaelozeri@gmail,com': 'refael',
        'erez@erezhod,com': 'erez'
    },
    'users': {
        'alon': {
            'id': 'alon',
            'firstName': 'Alon',
            'lastName': 'Diamant',
            'email': 'diamant.alon@gmail.com'
        },
        'joshua': {
            'id': 'joshua',
            'firstName': 'Joshua',
            'lastName': 'Skrzypek',
            'email': 'jskrzypek@yoobic.com'
        },
        'avi': {
            'id': 'avi',
            'firstName': 'Avi',
            'lastName': 'Werner',
            'email': 'werner.avi81@gmail.com'
        },
        'yechiel': {
            'id': 'yechiel',
            'firstName': 'Yechiel',
            'lastName': 'Levi',
            'email': 'gmistick@gmail.com'
        },
        'refael': {
            'id': 'refael',
            'firstName': 'Refael',
            'lastName': 'Ozeri',
            'email': 'refaelozeri@gmail.com'
        },
        'erez': {
            'id': 'erez',
            'firstName': 'Erez',
            'lastName': 'Hod',
            'email': 'erez@erezhod.com'
        }
    },
    'lists': {
        'b4ck3ndT4bl3': {
            'id': 'b4ck3ndT4bl3',
            'name': 'Backend Table',
            'admins': [
                'alon',
                'joshua',
                'avi'
            ],
            'users': [
                'yechiel',
                'refael',
                'erez'
            ],
            'public': false,
            'scores': {
                'alon': 1500,
                'joshua': 1900,
                'avi': 10000
            }
        },
        'fr0nt3ndT4ble': {
            'id': 'fr0nt3ndT4ble',
            'name': 'Frontend Table',
            'admins': [
                'yechiel',
                'refael',
                'erez'
            ],
            'users': [
                'alon',
                'joshua',
                'avi'
            ],
            'public': false,
            'scores': {
                'refael': 1800,
                'yechiel': 14000,
                'erez': 10000
            }
        },
        '3ntr4nc3': {
            'id': '3ntr4nc3',
            'name': 'Entrance',
            'admins': [
                'alon',
                'yechiel'
            ],
            'users': null,
            'public': true,
            'scores': {
                'alon': 1500,
                'joshua': 0,
                'avi': 0,
                'refael': 0,
                'yechiel': 0,
                'erez': 0
            }
        }
    },
    'tasks': {
        'someTask': {
            'id': 'someTask',
            'name': 'Create the database',
            'description': 'We really need it',
            'points': 600,
            'status': 'open',
            'list': 'b4ck3ndT4bl3',
            'creationTime': '2014-12-18 21:58:43T+02:00'
        },
        'otherTask': {
            'id': 'otherTask',
            'name': 'Create the Android app',
            'description': 'We need to show something!',
            'points': 300,
            'status': 'open',
            'list': 'fr0nt3ndT4ble',
            'creationTime': '2014-12-18 21:59:14T+02:00'
        },
        'publicTask': {
            'id': 'publicTask',
            'name': 'Close the door',
            'description': 'It is really cold',
            'points': 1000,
            'status': 'open',
            'list': '3ntr4nc3',
            'creationTime': '2014-12-18 21:59:33T+02:00'
        },
        'acceptedTask': {
            'id': 'acceptedTask',
            'name': 'Create the RESTful API',
            'description': 'Otherwise we cannot connect anything to anything',
            'points': 200,
            'status': 'accepted',
            'user': 'alon',
            'list': 'b4ck3ndT4bl3',
            'creationTime': '2014-12-18 21:58:43T+02:00',
            'acceptedTime': '2014-12-18 22:08:43T+02:00'
        },
        'previouslyAcceptedTask': {
            'id': 'previouslyAcceptedTask',
            'name': 'Create a $1 billion startup',
            'description': 'So the VCs get their money back',
            'points': 500,
            'status': 'open',
            'user': null,
            'list': '3ntr4nc3',
            'creationTime': '2014-12-18 22:04:43T+02:00',
            'acceptedTime': null
        },
        'finishedTask': {
            'id': 'finishedTask',
            'name': 'Go home',
            'description': 'We so tired',
            'points': 500,
            'status': 'done',
            'user': 'yechiel',
            'list': '3ntr4nc3',
            'creationTime': '2014-12-18 22:04:43T+02:00',
            'acceptedTime': '2014-12-18 22:28:43T+02:00',
            'finishedTime': '2014-12-18 23:08:43T+02:00',
            'imageUrl': 'http://www.xqa.com.ar/visualmanagement/wp-content/uploads/done_tag.jpg'
        },
        'verifiedTask': {
            'id': 'verifiedTask',
            'name': 'You really did it!',
            'description': 'We so tired',
            'points': 500,
            'status': 'verified',
            'user': 'joshua',
            'list': '3ntr4nc3',
            'creationTime': '2014-12-18 22:04:43T+02:00',
            'acceptedTime': '2014-12-18 22:28:43T+02:00',
            'finishedTime': '2014-12-18 23:08:43T+02:00',
            'imageUrl': 'http://timemanagementninja.com/wp-content/uploads/2011/12/Finished.jpg'
        }
    }
}).listen(3000);
