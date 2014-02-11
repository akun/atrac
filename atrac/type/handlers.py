#!/usr/bin/env python


import tornado

from atrac.share import JsonHandler
from atrac.db import connection


class TypeReadHandler(JsonHandler):

    def get(self):
        types = connection.Type.find()
        types = map(serialize_json, types)
        json_out = tornado.escape.json_encode({'types': types})
        self.write(json_out)


def serialize_json(type_item):
    type_item['id'] = str(type_item._id)
    del type_item['_id']
    return type_item
