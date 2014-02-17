#!/usr/bin/env python


import tornado

from bson.objectid import ObjectId

import pymongo

from atrac.share import JsonHandler
from atrac.db import connection


class TypeCreateHandler(JsonHandler):

    def post(self):
        json_in = tornado.escape.json_decode(self.request.body)
        type_doc = connection.Type()
        for k, v in json_in.items():
            type_doc[k] = v
        type_doc.save()
        json_out = tornado.escape.json_encode({
            'code': 0, 'msg': 'success', 'result': {
                'type': {'id': str(type_doc['_id']), 'name': type_doc.name}
            }
        })
        self.write(json_out)


class TypeReadHandler(JsonHandler):

    def get(self):
        types = connection.Type.find().sort('_id', pymongo.DESCENDING)
        types = map(serialize_json, types)
        json_out = tornado.escape.json_encode({'types': types})
        self.write(json_out)


class TypeUpdateHandler(JsonHandler):

    def get(self, type_id):
        type_doc = connection.Type.find_one({'_id': ObjectId(type_id)})
        serialize_json(type_doc)
        json_out = tornado.escape.json_encode({
            'code': 0, 'msg': 'success', 'result': {'type': type_doc}
        })
        self.write(json_out)

    def post(self, type_id):
        json_in = tornado.escape.json_decode(self.request.body)
        type_doc = connection.Type.find_one({'_id': ObjectId(type_id)})
        for k, v in json_in.items():
            if k in ('id',):
                continue
            type_doc[k] = v
        if type_doc.default:
            connection.Type.find_and_modify({
                'default': True
            }, {'$set': {'default': False}}, multi=True)
        type_doc.save()
        json_out = tornado.escape.json_encode({
            'code': 0, 'msg': 'success', 'result': {}
        })
        self.write(json_out)


class TypeDeleteHandler(JsonHandler):

    def post(self):
        type_id = ObjectId(self.request.body)
        connection.Type.collection.remove({'_id': type_id})
        json_out = tornado.escape.json_encode({
            'code': 0, 'msg': 'success', 'result': {}
        })
        self.write(json_out)


def serialize_json(type_doc):
    type_doc['id'] = str(type_doc['_id'])
    del type_doc['_id']
    return type_doc
