/**
 * @ngdoc overview
 * @name rohanadminApp
 * @description
 * # rohanadminApp
 *
 * Main module of the application.
 */

 /*global angular*/
(function () {
    "use strict";

    var app = angular.module('rohanadminApp', [
      'ngResource',
      'ngRoute',
      'ng-admin'
    ]);

    app.controller('main', function ($scope, $rootScope, $location) {
        $rootScope.$on('$stateChangeSuccess', function () {
            $scope.displayBanner = $location.$$path === '/dashboard';
        });
    });

    app.directive('customPostLink', ['$location', function ($location) {
        return {
            restrict: 'E',
            template: '<a ng-click="displayPost(entry)">View&nbsp;list</a>',
            link: function ($scope) {
                $scope.displayPost = function (entry) {
                    var listId = entry.values.list_id;

                    $location.path('/edit/lists/' + listId);
                };
            }
        };
    }]);

    app.config(function (NgAdminConfigurationProvider, Application, Entity, Field, Reference, ReferencedList, ReferenceMany) {

        function truncate(value) {
            if (!value) {
                return '';
            }

            return value.length > 50 ? value.substr(0, 50) + '...' : value;
        }

        function pagination(page, maxPerPage) {
            return {
                _start: (page - 1) * maxPerPage,
                _end: page * maxPerPage
            };
        }

        var app = new Application('ng-admin backend demo') // application main title
            .baseApiUrl('http://localhost:3000/api/'); // main API endpoint

        // define all entities at the top to allow references between them
        var list = new Entity('Lists')
            .label('To-Do Lists') // the API endpoint for lists will be http://localhost:3000/lists/:id
            .identifier(new Field('id'));

        var task = new Entity('Tasks')
            .label('Tasks')
            .identifier(new Field('id')); // you can optionally customize the identifier used in the api ('id' by default)

        // set the application entities
        app
            .addEntity(list)
            .addEntity(task);

        // customize entities and views

        // list.menuView()
        //     .order(1); // list should be the first item in the sidebar menu

        list.dashboardView()
            .title('Recent lists')
            .order(1) // display the list panel first in the dashboard
            .limit(5) // limit the panel to the 5 latest lists
            .pagination(pagination) // use the custom pagination function to format the API request correctly
            .addField(new Field('name').isDetailLink(true).map(truncate));

        list.listView()
            .title('All lists') // default title is "List of [entity_name]s"
            .pagination(pagination)
            .addField(new Field('id').label('ID'))
            .addField(new Field('name')) // the default list field type is "string", and displays as a string
            .addField(new ReferenceMany('tasks') // a Reference is a particular type of field that references another entity
                .targetEntity(task) // the user entity is defined later in this file
                .targetField(new Field('name')) // the field to be displayed in this list
            )
            .listActions(['show', 'edit', 'delete']);

        list.showView() // a showView displays one entry in full page - allows to display more data than in a a list
            .addField(new Field('id'))
            .addField(new Field('name'))
            .addField(new ReferencedList('tasks')
                .targetEntity(task)
                .targetReferenceField('list')
                .targetFields([
                    new Field('id'),
                    new Field('name'),
                    new Field('description').label('description'),
                    new Field('status'),
                    new Field('points')
                ])
        );

        list.creationView()
            .addField(new Field('name')); // the default edit field type is "string", and displays as a text input

        list.editionView()
            .title('Edit list "{{ entry.values.name }}"') // title() accepts a template string, which has access to the entry
            .actions(['list', 'show', 'delete']) // choose which buttons appear in the action bar
            .addField(new Field('name'))
            .addField(new ReferencedList('tasks')
                .targetEntity(task)
                .targetReferenceField('list')
                .targetFields([
                    new Field('id'),
                    new Field('name'),
                    new Field('description').label('description'),
                    new Field('status'),
                    new Field('points')
                ])
        );

        // task.menuView()
        //     .order(2); // task should be the second item in the sidebar menu

        task.dashboardView()
            .title('Recent tasks')
            .order(2) // display the task panel second in the dashboard
            .limit(5)
            .pagination(pagination)
            .addField(new Field('name'))
            .addField(new Field('description').map(truncate))
            .addField(new Field('status'))
            .addField(new Field('points'))
            .addField(new Field() // template fields don't need a name
                .type('template') // a field which uses a custom template
                .label('Actions')
                .template(function () { // template() can take a function or a string
                    return '<custom-list-link></custom-list-link>'; // you can use custom directives, too
                })
        );

        task.listView()
            .title('Tasks')
            .pagination(pagination)
            .addField(new Field('id').label('ID'))
            .addField(new Reference('list')
                .label('List name')
                .map(truncate)
                .targetEntity(list)
                .targetField(new Field('name'))
            )
            .addField(new Field('description').map(truncate))
            .addField(new Field('status'))
            .addField(new Field('points'))
            .addField(new Field('creationDate').label('Creation date').type('date'))
            .addQuickFilter('Today', function () { // a quick filter displays a button to filter the list based on a set of query parameters passed to the API
                var now = new Date(),
                    year = now.getFullYear(),
                    month = now.getMonth() + 1,
                    day = now.getDate();
                month = month < 10 ? '0' + month : month;
                day = day < 10 ? '0' + day : day;
                return {
                    created_at: [year, month, day].join('-') // ?created_at=... will be appended to the API call
                };
            })
            .listActions(['show', 'edit', 'delete']);

        // task.showView()
        //     .title('Tasks')
        //     .actions(['show', 'edit', 'delete'])
        //     .pagination(pagination)
        //     .addField(new Field('id').label('ID'))
        //     .addField(new Reference('list')
        //         .label('List name')
        //         .map(truncate)
        //         .targetEntity(list)
        //         .targetField(new Field('name'))
        //     )
        //     .addField(new Field('description').map(truncate))
        //     .addField(new Field('status'))
        //     .addField(new Field('points'))
        //     .addField(new Field('creationDate').label('Creation date').type('date'))
        //     .addQuickFilter('Today', function () { // a quick filter displays a button to filter the list based on a set of query parameters passed to the API
        //         var now = new Date(),
        //             year = now.getFullYear(),
        //             month = now.getMonth() + 1,
        //             day = now.getDate();
        //         month = month < 10 ? '0' + month : month;
        //         day = day < 10 ? '0' + day : day;
        //         return {
        //             created_at: [year, month, day].join('-') // ?created_at=... will be appended to the API call
        //         };
        //     });

        task.creationView()
            .addField(new Reference('list_id')
                .label('Post name')
                .map(truncate)
                .targetEntity(list)
                .targetField(new Field('name'))
        )
            .addField(new Field('description').type('wysiwyg'))
            .addField(new Field('created_at')
                .label('Creation date')
                .type('date') // to edit a date type field, ng-admin offers a datepicker
                .defaultValue(new Date()) // preset fields in creation view with defaultValue
        );

        task.editionView()
            .addField(new Reference('list_id')
                .label('Post name')
                .map(truncate)
                .targetEntity(list)
                .targetField(new Field('name'))
        )
            .addField(new Field('description').type('wysiwyg'))
            .addField(new Field('created_at').label('Creation date').type('date'))
            .addField(new Field()
                .type('template')
                .label('Actions')
                .template('<custom-list-link></custom-list-link>') // template() can take a function or a string
        );

        task.deletionView()
            .title('Deletion confirmation'); // customize the deletion confirmation message

        // user.menuView()
        //     .order(3);

        // user.dashboardView()
        //     .title('Recent users')
        //     .order(3)
        //     .limit(10)
        //     .pagination(pagination)
        //     .addField(new Field('id').label('ID'))
        //     .addField(new Field('name'))
        //     .addField(new Field('published').label('Is published ?').type('boolean'));

        // user.listView()
        //     .title('List of all users')
        //     .infinitePagination(false) // by default, the list view uses infinite pagination. Set to false to use regulat pagination
        //     .pagination(pagination)
        //     .addField(new Field('id').label('ID'))
        //     .addField(new Field('name'))
        //     .addField(new Field('published').type('boolean'))
        //     .addField(new Field('custom')
        //         .type('template')
        //         .label('Upper name')
        //         .template(function () {
        //             return '{{ entry.values.name.toUpperCase() }}';
        //         })
        // )
        //     .listActions(['show']);

        // user.showView()
        //     .addField(new Field('name'))
        //     .addField(new Field('published').type('boolean'));

        NgAdminConfigurationProvider.configure(app);
    });
}());
