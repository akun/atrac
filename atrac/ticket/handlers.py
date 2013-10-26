#!/usr/bin/env python
# coding=utf-8


import time

import pymongo

import tornado

from atrac.share import JsonHandler
from atrac.db import connection


class TicketAddHandler(JsonHandler):

    def get(self):
        json_out = tornado.escape.json_encode({
            'code': 0, 'msg': 'success', 'result': {
                'types': list(connection.Type.find(fields={
                    'name': 1, 'default': 1, '_id': 0,
                })),
                'milestones': list(connection.Milestone.find(fields={
                    'name': 1, 'default': 1, '_id': 0,
                })),
                'versions': list(connection.Version.find(fields={
                    'name': 1, 'default': 1, '_id': 0,
                })),
                'categorys': list(connection.Category.find(fields={
                    'name': 1, 'default': 1, '_id': 0,
                })),
                'assigneds': [u'<<我>>', 'dev', 'test', 'ops'],
                'ccs': ['dev', 'test', 'ops'],
            }
        })
        self.write(json_out)

    def post(self):
        json_in = tornado.escape.json_decode(self.request.body)
        ticket = connection.Ticket()
        for k, v in json_in.items():
            ticket[k] = v
        ticket.save()
        json_out = tornado.escape.json_encode({
            'code': 0, 'msg': 'success', 'result': {}
        })
        self.write(json_out)


class TicketListHandler(JsonHandler):

    def get(self):
        ticket_list = list(connection.Ticket.find().sort(
            'created_at', pymongo.DESCENDING
        ))  # TOOD pagination
        for ticket in ticket_list:
            ticket['id'] = str(ticket._id)
            ticket.created_at = time.mktime(ticket.created_at.timetuple())
            del ticket['_id']
        json_out = tornado.escape.json_encode(ticket_list)
        self.write(json_out)
