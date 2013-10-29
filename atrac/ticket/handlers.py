#!/usr/bin/env python
# coding=utf-8


import time

from bson.objectid import ObjectId

import pymongo

import tornado

from atrac.share import JsonHandler
from atrac.db import connection


class TicketAddHandler(JsonHandler):

    def get(self):
        json_out = tornado.escape.json_encode({
            'code': 0, 'msg': 'success', 'result': get_ticket_item_info()
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


class TicketEditHandler(JsonHandler):

    def get(self, ticket_id):
        ticket = connection.Ticket.find_one({'_id': ObjectId(ticket_id)})
        serialize_json(ticket)
        result = get_ticket_item_info()
        result['ticket'] = ticket
        json_out = tornado.escape.json_encode({
            'code': 0, 'msg': 'success', 'result': result
        })
        self.write(json_out)

    def post(self, ticket_id):
        json_in = tornado.escape.json_decode(self.request.body)
        ticket = connection.Ticket.find_one({'_id': ObjectId(ticket_id)})
        for k, v in json_in.items():
            if k in ('id', 'created_at'):
                continue
            ticket[k] = v
        ticket.save()
        json_out = tornado.escape.json_encode({
            'code': 0, 'msg': 'success', 'result': {}
        })
        self.write(json_out)


class TicketListHandler(JsonHandler):

    def get(self, page, limit):
        page, limit = int(page), int(limit)
        count = connection.Ticket.find().count()
        bottom = (page - 1) * limit
        top = bottom + limit
        if top >= count:
            top = count

        tickets = list(connection.Ticket.find().sort(
            'created_at', pymongo.DESCENDING
        )[bottom:top])
        for ticket in tickets:
            serialize_json(ticket)
        json_out = tornado.escape.json_encode({
            'tickets': tickets, 'count': count,
        })
        self.write(json_out)


def serialize_json(ticket):
    ticket['id'] = str(ticket._id)
    ticket.created_at = time.mktime(ticket.created_at.timetuple())
    del ticket['_id']


def get_ticket_item_info():
    return {
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
