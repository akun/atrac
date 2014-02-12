#!/usr/bin/env python


import tornado

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


def serialize_json(type_doc):
    type_doc['id'] = str(type_doc['_id'])
    del type_doc['_id']
    return type_doc
