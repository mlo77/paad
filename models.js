module.exports = exports = {
    /* Generic types */
    Status: {
        id: 'Status',
        description: 'Status response with error message in case of failure',
        type: 'Status',
        properties: {
            status: { type: 'string', enum: [ 'ok', 'error' ], required: true },
            error: { type: 'string' }
        }
    },
//     /* Widgets */
//     WidgetID: {
//         name: 'widgetId',
//         description: 'Widget ID',
//         dataType: 'string',
//         paramType: 'path',
//         required: true
//     },
//     Widget: {
//         id: 'Widget',
//         description: 'Data object representing an container',
//         type: 'Widget',
//         paramType: 'body',
//         properties: {
//             _id: { type: 'string' },
//             name: { type: 'string', required: true },
//             path: { type: 'string', required: true },
//             sizes: { type: 'array', items: { '$ref': 'Size' }, required: true },
//             icon: { type: 'string' },
//             stationary: { type: 'boolean', defaultValue: false },
//             homebound: { type: 'boolean', defaultValue: false },
//             fullscreen: { type: 'boolean', defaultValue: false },
//             linear: { type: 'boolean', defaultValue: false },
//             background: { type: 'boolean', defaultValue: false },
//             priority: { type: 'integer'}
//         }
//     },
//     WidgetList: {
//         id: 'WidgetList',
//         description: 'Widget list',
//         type: 'WidgetList',
//         paramType: 'body',
//         properties: {
//             count: { type: 'integer', required: true },
//             items: { type: 'array', items: { '$ref': 'Widget' }, required: true }
//         }
//     },
//     /* Households */
//     HouseholdID: {
//         name: 'hhId',
//         description: 'Household ID',
//         dataType: 'string',
//         paramType: 'path',
//         required: true
//     },
//     Household: {
//         description: 'Data object representing a household',
//         type: 'Household',
//         paramType: 'body',
//         properties: {
//             _id: { type: 'string' },
//             name: { type: 'string', required: true }
//         }
//     },
//     HouseholdList: {
//         description: 'Household list',
//         properties: {
//             count: { type: 'integer', required: true },
//             items: { type: 'array', items: { '$ref': 'Household' }, required: true }
//         }
//     },
//     /* Rooms */
//     RoomID: {
//         name: 'roomId',
//         description: 'Room ID',
//         dataType: 'string',
//         paramType: 'path',
//         required: true
//     },
//     Room: {
//         id: 'Room',
//         description: 'Data object representing a room',
//         type: 'Room',
//         paramType: 'body',
//         properties: {
//             _id: { type: 'string' },
//             hhId: { type: 'string' },
//             name: { type: 'string', required: true }
//         }
//     },
//     RoomList: {
//         id: 'RoomList',
//         description: 'Room list',
//         properties: {
//             count: { type: 'integer', required: true },
//             items: { type: 'array', items: { '$ref': 'Room' }, required: true }
//         }
//     },
//     /* Surfaces */
//     SurfaceID: {
//         name: 'surfaceId',
//         description: 'Surface ID',
//         dataType: 'string',
//         paramType: 'path',
//         required: true
//     },
//     Surface: {
//         id: 'Surface',
//         description: 'Data object representing a surface',
//         type: 'Surface',
//         paramType: 'body',
//         properties: {
//             _id: { type: 'string' },
//             hhId: { type: 'string' },
//             name: { type: 'string', required: true },
//             preferences: { '$ref': 'SurfacePreferences' },
//             rooms: { type: 'array', items: { '$ref': 'RoomRef'}},
//             dim: { '$ref': 'Dimension' }

//         }
//     },
//     RoomRef: {
//         id: 'RoomRef',
//         description: 'Room reference',
//         properties: {
//             roomId: { type: 'string' },
//             pos: { '$ref': 'Position' }
//         }
//     },
//     SurfacePreferences: {
//         id: 'SurfacePreferences',
//         description: 'Surface preferences',
//         properties: {
//             background: { '$ref': 'Background' }
//         }
//     },
//     SurfaceList: {
//         id: 'SurfaceList',
//         description: 'Surface list',
//         properties: {
//             count: { type: 'integer', required: true },
//             items: { type: 'array', items: { '$ref': 'Surface' }, required: true }
//         }
//     },
//     /* Widget instances */
//     WidgetInstanceID: {
//         name: 'widgetInstanceId',
//         description: 'Widget instance ID',
//         dataType: 'string',
//         paramType: 'path',
//         required: true
//     },
//     WidgetInstance: {
//         id: 'WidgetInstance',
//         description: 'Data object representing a widget instance',
//         type: 'WidgetInstance',
//         paramType: 'body',
//         properties: {
//             _id: { type: 'string' },
//             surfaceId: { type: 'string', required: true },
//             widgetId: { type: 'string', required: true },
//             name: { type: 'string' }, // ?
//             pos: { '$ref': 'Position' },
//             dim: { '$ref': 'Dimension' },
//             private: { '$ref': 'Private' }
//         }
//     },
//     WidgetInstanceList: {
//         id: 'WidgetInstanceList',
//         description: 'Widget instance list',
//         properties: {
//             data: { type: 'array', items: { '$ref': 'WidgetInstance' } }
//         }
//     },
//     SfChangeRoom: {
//         id: 'SfChangeRoom',
//         description: 'Data object representing a surface changing room instruction',
//         type: 'SfChangeRoom',
//         paramType: 'body',
//         properties: {
//             surfaceId: { type: 'string' },
//             roomIdEntered: { type: 'array', items : { type: 'string' }, required: false },
//             roomIdExited: { type: 'array', items : { type: 'string' }, required: false },
//             save: { type: 'boolean', defaultValue: false }
//         }
//     },
//     RoomIOEvent: {
//         id: 'RoomIOEvent',
//         description: 'Data object representing a room in/out event',
//         type: 'RoomIOEvent',
//         paramType: 'body',
//         properties: {
//             roomId: { type: 'string' },
//             surfaceIdEntered: { type: 'array', items : { type: 'string' }, required: false },
//             surfaceIdExited: { type: 'array', items : { type: 'string' }, required: false },
//             save: { type: 'boolean', defaultValue: false }
//         }
//     },
};
